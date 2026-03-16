import { Card } from '../../../components/Card'
import { SectionHeading } from '../../../components/SectionHeading'
import { TalentMatchesTable } from './TalentMatchesTable'
import { TalentSearchPanel } from './TalentSearchPanel'

export function TalentCompatibilityWidget() {
  return (
    <Card className="mt-10 p-8 lg:p-10">
      <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-7">
          <SectionHeading
            title="Embajadores y talento compatible"
            subtitle="Búsqueda de actores con mejor afinidad al perfil narrativo de la marca según géneros y popularidad."
            className="mb-6"
          />

          <TalentSearchPanel />
        </div>

        <div className="xl:col-span-5">
          <Card className="h-full border-slate-800/60 bg-slate-900/25 p-6">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Cómo leer este módulo
            </p>

            <div className="space-y-4 text-sm leading-relaxed text-slate-400">
              <p>
                La tabla prioriza actores por popularidad y afinidad con la
                marca seleccionada.
              </p>
              <p>
                La búsqueda permite revisar un talento específico y entender qué
                géneros dominan su filmografía.
              </p>
              <p>
                Los insights traducen esos géneros a posibles territorios
                creativos para campañas.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <TalentMatchesTable />
    </Card>
  )
}
