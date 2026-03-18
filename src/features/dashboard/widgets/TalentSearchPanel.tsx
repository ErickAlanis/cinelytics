import { useEffect, useMemo, useRef, useState } from 'react';
import { Card } from '../../../components/Card';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import type { TmdbPerson } from '../../../types/tmdb';
import { getActorSearchResultFromTmdb } from '../../../utils/getActorSearchResultFromTmdb';
import { getTmdbImageUrl } from '../../../utils/getTmdbImageUrl';
import { useActorMovieCredits } from '../hooks/useActorMovieCredits';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useSearchActors } from '../hooks/useSearchActors';

type TalentSearchPanelProps = {
  activeBrandProfile: BrandProfile;
};

export function TalentSearchPanel({
  activeBrandProfile,
}: TalentSearchPanelProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedActor, setSelectedActor] = useState<TmdbPerson | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedSearchValue = useDebouncedValue(searchValue, 300);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { actors, isLoading, errorMessage } =
    useSearchActors(debouncedSearchValue);
  const {
    credits,
    isLoading: isLoadingCredits,
    errorMessage: creditsErrorMessage,
  } = useActorMovieCredits(selectedActor?.id ?? 0);

  const searchResult = useMemo(() => {
    if (!selectedActor || credits.length === 0) {
      return null;
    }

    return getActorSearchResultFromTmdb(
      selectedActor,
      credits,
      activeBrandProfile,
    );
  }, [selectedActor, credits, activeBrandProfile]);

  const shouldShowDropdown =
    isDropdownOpen &&
    debouncedSearchValue.trim().length >= 2 &&
    (actors.length > 0 || isLoading || Boolean(errorMessage));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function selectActor(actor: TmdbPerson) {
    setSelectedActor(actor);
    setSearchValue(actor.name);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

function handleSearch() {
  const matchedActor =
    highlightedIndex >= 0 ? actors[highlightedIndex] : actors[0];

  if (matchedActor) {
    selectActor(matchedActor);
  }
}

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearch();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!shouldShowDropdown || actors.length === 0) {
      if (event.key === 'ArrowDown' && actors.length > 0) {
        setIsDropdownOpen(true);
        setHighlightedIndex(0);
      }

      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((current) =>
        current < actors.length - 1 ? current + 1 : 0,
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : actors.length - 1,
      );
    }

    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      selectActor(actors[highlightedIndex]);
    }

    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
      setHighlightedIndex(-1);
    }
  }

  return (
    <Card className="border-slate-800/60 bg-slate-900/30 p-5">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="actor-search"
          className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-slate-500"
        >
          Buscar actor
        </label>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div ref={containerRef} className="relative flex-1">
            <input
              id="actor-search"
              ref={inputRef}
              type="search"
              placeholder="Ej. Ryan Gosling"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setIsDropdownOpen(true);
                setHighlightedIndex(-1);
              }}
              onFocus={(event) => {
                setIsDropdownOpen(true);
                event.currentTarget.select();
              }}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={shouldShowDropdown}
              aria-controls="actor-search-results"
              aria-activedescendant={
                highlightedIndex >= 0
                  ? `actor-option-${actors[highlightedIndex]?.id}`
                  : undefined
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            />

            {shouldShowDropdown ? (
              <div
                id="actor-search-results"
                role="listbox"
                className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 shadow-xl"
              >
                {isLoading ? (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    Buscando actores...
                  </div>
                ) : errorMessage ? (
                  <div className="px-4 py-3 text-sm text-rose-400">
                    {errorMessage}
                  </div>
                ) : actors.length > 0 ? (
                  actors.map((actor, index) => (
                    <button
                      key={actor.id}
                      id={`actor-option-${actor.id}`}
                      type="button"
                      role="option"
                      aria-selected={highlightedIndex === index}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectActor(actor)}
                      className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                        highlightedIndex === index
                          ? 'bg-slate-800 text-slate-100'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {actor.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    No se encontraron actores.
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Buscar
          </button>
        </div>
      </form>

      {isLoadingCredits ? (
        <WidgetStateMessage
          title="Cargando filmografía..."
          description="Estamos calculando los géneros dominantes del actor."
        />
      ) : creditsErrorMessage ? (
        <WidgetStateMessage
          title="No se pudo cargar la filmografía"
          description={creditsErrorMessage}
        />
      ) : !searchResult ? (
        <WidgetStateMessage
          title="Selecciona un actor"
          description="Busca un actor para calcular su afinidad con la marca."
        />
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              {selectedActor?.profile_path ? (
                <img
                  src={getTmdbImageUrl(selectedActor.profile_path, 'w185') ?? ''}
                  alt={selectedActor.name}
                  loading="lazy"
                  className="h-14 w-14 rounded-xl object-cover border border-slate-800 bg-slate-900"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-500">
                  N/A
                </div>
              )}

              <div>
                <div className="text-sm font-black text-slate-50">
                  {searchResult.name}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">
                  Match destacado
                </div>
              </div>
            </div>

            <div className="mt-4 inline-flex flex-col rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">
              <span className="text-3xl font-black text-indigo-400">
                {searchResult.affinityPercentage}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Afinidad
              </span>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {searchResult.strongGenres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-sm italic leading-relaxed text-indigo-300">
              Insight: {searchResult.insight}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
