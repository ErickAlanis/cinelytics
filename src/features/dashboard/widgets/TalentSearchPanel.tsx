import { useMemo, useState } from 'react'
import { Card } from '../../../components/Card'
import { mockActors } from '../../../constants/mockContent'
import type { BrandProfile } from '../../../types/brand'
import { getActorSearchResult } from '../../../utils/getActorSearchResult'

type TalentSearchPanelProps = {
  activeBrandProfile: BrandProfile
}

export function TalentSearchPanel({
  activeBrandProfile,
}: TalentSearchPanelProps) {
  const [searchValue, setSearchValue] = useState('Ryan Gosling')
  const [selectedActorName, setSelectedActorName] = useState('Ryan Gosling')

  const selectedActor = useMemo(() => {
    return (
      mockActors.find(
        (actor) =>
          actor.name.toLowerCase() === selectedActorName.toLowerCase(),
      ) ?? mockActors[0]
    )
  }, [selectedActorName])

  const searchResult = useMemo(() => {
    return getActorSearchResult(selectedActor, activeBrandProfile)
  }, [selectedActor, activeBrandProfile])

  function handleSearch() {
    const matchedActor = mockActors.find((actor) =>
      actor.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
    )

    if (matchedActor) {
      setSelectedActorName(matchedActor.name)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleSearch()
  }

  return (
    <Card className="border-slate-800/60 bg-slate-900/30 p-5">
      <form onSubmit={handleSubmit}>
        <label className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Buscar actor
        </label>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Ej. Ryan Gosling"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
          />

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
