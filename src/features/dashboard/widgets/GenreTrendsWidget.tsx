import { Card } from '../../../components/Card'
import { PillBadge } from '../../../components/PillBadge'
import { WidgetHeader } from '../../../components/WidgetHeader'

const genreTrendItems = [
  { label: 'Romance', height: '78%', highlighted: true },
  { label: 'Drama', height: '70%', highlighted: false },
  { label: 'Comedy', height: '58%', highlighted: false },
  { label: 'Sci-Fi', height: '46%', highlighted: false },
  { label: 'Adventure', height: '34%', highlighted: false },
]

export function GenreTrendsWidget() {
  return (
    <Card className="col-span-12 p-8 lg:col-span-8">
      <WidgetHeader
        title="Tendencias por Género"
        action={<PillBadge>Live Signals</PillBadge>}
      />

      <div className="flex h-56 items-end justify-between gap-4">
        {genreTrendItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-4"
          >
            <div
              className={
                item.highlighted
                  ? 'w-full rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20'
                  : 'w-full rounded-2xl bg-slate-800'
              }
              style={{ height: item.height }}
            />

            <span className="text-[10px] font-bold uppercase text-slate-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4 text-sm italic text-indigo-300">
        <strong>Insight:</strong> Para Starbucks, romance y drama concentran la
        mayor afinidad narrativa.
      </div>
    </Card>
  )
}
