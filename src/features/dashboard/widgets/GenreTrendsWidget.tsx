import { Card } from '../../../components/Card'
import { PillBadge } from '../../../components/PillBadge'
import { WidgetHeader } from '../../../components/WidgetHeader'
import { mockTrendingMovies } from '../../../constants/mockContent'
import type { BrandProfile } from '../../../types/brand'
import { getGenreTrendData } from '../../../utils/getGenreTrendData'
import { getGenreTrendInsight } from '../../../utils/getGenreTrendInsight'

type GenreTrendsWidgetProps = {
  activeBrandProfile: BrandProfile
}

export function GenreTrendsWidget({
  activeBrandProfile,
}: GenreTrendsWidgetProps) {
  const trendItems = getGenreTrendData(mockTrendingMovies, activeBrandProfile)
  const insight = getGenreTrendInsight(activeBrandProfile)

  return (
    <Card className="col-span-12 p-8 lg:col-span-8">
      <WidgetHeader
        title="Tendencias por Género"
        action={<PillBadge>Live Signals</PillBadge>}
      />

      <div className="flex h-56 items-end justify-between gap-4">
        {trendItems.map((item) => (
          <div
            key={item.genreId}
            className="flex flex-1 flex-col items-center gap-4"
          >
            <div
              className={
                item.isHighlighted
                  ? 'w-full rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20'
                  : 'w-full rounded-2xl bg-slate-800'
              }
              style={{ height: `${Math.max(item.affinityPercentage, 20)}%` }}
              title={`${item.label}: ${item.affinityPercentage}%`}
            />

            <span className="text-[10px] font-bold uppercase text-slate-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4 text-sm italic text-indigo-300">
        <strong>Insight:</strong> {insight}
      </div>
    </Card>
  )
}
