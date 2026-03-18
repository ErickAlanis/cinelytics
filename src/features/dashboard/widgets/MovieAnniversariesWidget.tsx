import { Card } from '../../../components/Card'
import { WidgetHeader } from '../../../components/WidgetHeader'
import { WidgetStateMessage } from '../../../components/WidgetStateMessage'
import { mockAnniversaries } from '../../../constants/mockContent'
import type { BrandProfile } from '../../../types/brand'
import { getAnniversaryRows } from '../../../utils/getAnniversaryRows'

type MovieAnniversariesWidgetProps = {
  activeBrandProfile: BrandProfile
}

export function MovieAnniversariesWidget({
  activeBrandProfile,
}: MovieAnniversariesWidgetProps) {
  const anniversaryRows = getAnniversaryRows(
    mockAnniversaries,
    activeBrandProfile,
    1,
  )

  return (
    <Card id="movie-anniversaries" className="col-span-12 p-8 lg:col-span-5">
      <WidgetHeader title="Aniversarios Clave" />

      {anniversaryRows.length === 0 ? (
        <WidgetStateMessage
          title="No hay aniversarios relevantes"
          description="No encontramos aniversarios alineados con la marca actual."
        />
      ) : (
        <div className="space-y-6">
          {anniversaryRows.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex gap-4 pl-6 ${
                index === 0
                  ? 'border-l-2 border-indigo-500/30'
                  : 'border-l-2 border-slate-800'
              }`}
            >
              {index === 0 ? (
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-[#070b14] bg-gradient-to-br from-indigo-500 to-purple-500" />
              ) : null}

              <div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    index === 0 ? 'text-indigo-400' : 'text-slate-500'
                  }`}
                >
                  {index === 0 ? 'Prioritario' : 'Secundario'} · {item.years} años
                </span>

                <h4
                  className={`mt-1 text-base font-bold ${
                    index === 0 ? 'text-slate-50' : 'text-slate-300'
                  }`}
                >
                  {item.title}
                </h4>

                <p className="mt-1 text-xs italic text-slate-400">
                  Estrategia: {item.campaignIdea}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
