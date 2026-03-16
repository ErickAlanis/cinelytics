import { DashboardContent } from '../features/dashboard/components/DashboardContent'
import { DashboardShell } from '../features/dashboard/components/DashboardShell'
import { DashboardSidebar } from '../features/dashboard/components/DashboardSidebar'
import { MobileTopbar } from '../features/dashboard/components/MobileTopbar'

export function DashboardPage() {
  return (
    <DashboardShell
      sidebar={<DashboardSidebar />}
      mobileTopbar={<MobileTopbar />}
    >
      <DashboardContent />
    </DashboardShell>
  )
}
