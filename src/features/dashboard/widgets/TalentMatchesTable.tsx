const actorRows = [
  {
    actor: 'Ryan Gosling',
    popularity: 'Alta',
    strongGenres: 'Drama / Romance',
    affinity: 76,
    tone: 'success',
  },
  {
    actor: 'Zendaya',
    popularity: 'Alta',
    strongGenres: 'Drama / Sci-Fi',
    affinity: 71,
    tone: 'indigo',
  },
  {
    actor: 'Chris Hemsworth',
    popularity: 'Alta',
    strongGenres: 'Action / Adventure',
    affinity: 52,
    tone: 'amber',
  },
  {
    actor: 'Emma Stone',
    popularity: 'Media',
    strongGenres: 'Comedy / Drama',
    affinity: 74,
    tone: 'success',
  },
]

function getBadgeClass(tone: string) {
  switch (tone) {
    case 'success':
      return 'bg-emerald-500/20 text-emerald-400'
    case 'amber':
      return 'bg-amber-500/20 text-amber-400'
    default:
      return 'bg-indigo-500/20 text-indigo-400'
  }
}

export function TalentMatchesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[760px] w-full text-left text-sm">
        <thead className="border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <tr>
            <th className="pb-4">Actor</th>
            <th className="pb-4">Popularidad</th>
            <th className="pb-4">Géneros fuertes</th>
            <th className="pb-4">Afinidad con la marca</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/50">
          {actorRows.map((row) => (
            <tr key={row.actor}>
              <td className="py-4 font-bold text-slate-50">{row.actor}</td>
              <td className="py-4 text-xs text-slate-400">{row.popularity}</td>
              <td className="py-4 text-xs text-slate-400">
                {row.strongGenres}
              </td>
              <td className="py-4">
                <span
                  className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase ${getBadgeClass(
                    row.tone,
                  )}`}
                >
                  {row.affinity}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
