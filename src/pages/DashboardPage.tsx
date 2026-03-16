import { DashboardShell } from '../features/dashboard/components/DashboardShell'
import { DashboardSidebar } from '../features/dashboard/components/DashboardSidebar'
import { MobileTopbar } from '../features/dashboard/components/MobileTopbar'

export function DashboardPage() {
  return (
    <DashboardShell
      sidebar={<DashboardSidebar />}
      mobileTopbar={<MobileTopbar />}
    >
      <div className="rounded-3xl border border-slate-800 bg-slate-950/30 p-8 text-slate-400">
        Dashboard content placeholder
      </div>
    </DashboardShell>
  )
}
