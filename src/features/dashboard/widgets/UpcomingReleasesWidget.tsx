import { Card } from '../../../components/Card'
import { WidgetHeader } from '../../../components/WidgetHeader'

const releases = [
  {
    title: 'Love in Orbit',
    genre: 'Romance / Sci-Fi',
    score: 89,
  },
  {
    title: 'Midnight Letters',
    genre: 'Drama',
    score: 84,
  },
  {
    title: 'Summer Bloom',
    genre: 'Comedy',
    score: 78,
  },
]

export function UpcomingReleasesWidget() {
  return (
    <Card className="col-span-12 p-8 lg:col-span-7">
      <WidgetHeader title="Próximos Estrenos" />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <tr>
              <th className="pb-4">Título</th>
              <th className="pb-4">Género</th>
              <th className="pb-4">Fit Score</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {releases.map((movie) => (
              <tr key={movie.title}>
                <td className="py-4 font-bold text-slate-50">
                  {movie.title}
                </td>

                <td className="py-4 text-xs text-slate-400">
                  {movie.genre}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase
                    ${
                      movie.score >= 85
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}
                  >
                    {movie.score}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
