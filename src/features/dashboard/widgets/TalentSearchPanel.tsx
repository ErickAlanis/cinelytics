import { useEffect, useMemo, useRef, useState } from 'react'
import { Card } from '../../../components/Card'
import type { BrandProfile } from '../../../types/brand'
import { getActorSearchResult } from '../../../utils/getActorSearchResult'
import { mockActors } from '../../../constants/mockContent'
import { useSearchActors } from '../hooks/useSearchActors'

type TalentSearchPanelProps = {
  activeBrandProfile: BrandProfile
}

export function TalentSearchPanel({
  activeBrandProfile,
}: TalentSearchPanelProps) {
  const [searchValue, setSearchValue] = useState('Ryan Gosling')
  const [selectedActorName, setSelectedActorName] = useState('Ryan Gosling')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const { actors, isLoading, errorMessage } = useSearchActors(searchValue)

  const selectedActor = useMemo(() => {
    return (
      mockActors.find(
        (actor) => actor.name.toLowerCase() === selectedActorName.toLowerCase(),
      ) ?? mockActors[0]
    )
  }, [selectedActorName])

  const searchResult = useMemo(() => {
    return getActorSearchResult(selectedActor, activeBrandProfile)
  }, [selectedActor, activeBrandProfile])

  const shouldShowDropdown =
    isDropdownOpen &&
    searchValue.trim().length > 0 &&
    (actors.length > 0 || isLoading || Boolean(errorMessage))

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [searchValue])

  function selectActor(actorName: string) {
    setSelectedActorName(actorName)
    setSearchValue(actorName)
    setIsDropdownOpen(false)
    setHighlightedIndex(-1)
  }

  function handleSearch() {
    const matchedActor = actors[0]

    if (matchedActor) {
      selectActor(matchedActor.name)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleSearch()
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!shouldShowDropdown || actors.length === 0) {
      if (event.key === 'ArrowDown' && actors.length > 0) {
        setIsDropdownOpen(true)
        setHighlightedIndex(0)
      }

      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((current) =>
        current < actors.length - 1 ? current + 1 : 0,
      )
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : actors.length - 1,
      )
    }

    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      selectActor(actors[highlightedIndex].name)
    }

    if (event.key === 'Escape') {
      setIsDropdownOpen(false)
      setHighlightedIndex(-1)
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
              type="search"
              placeholder="Ej. Ryan Gosling"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value)
                setIsDropdownOpen(true)
              }}
              onFocus={() => setIsDropdownOpen(true)}
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
                      onClick={() => selectActor(actor.name)}
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

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="text-sm font-black text-slate-50">
            {searchResult.name}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">
            Match destacado
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
    </Card>
  )
}
