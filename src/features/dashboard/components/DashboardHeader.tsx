import { SectionHeading } from '../../../components/SectionHeading'
import { StatusBadge } from '../../../components/StatusBadge'

export function DashboardHeader() {
  return (
    <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <SectionHeading
        title="Dashboard de Afinidad"
        subtitle="Análisis de inteligencia cultural para marketing basado en tendencias cinematográficas y afinidad narrativa de marca."
        className="max-w-xl"
      />

      <StatusBadge className="self-start">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>Demo Review Ready</span>
      </StatusBadge>
    </header>
  )
}
