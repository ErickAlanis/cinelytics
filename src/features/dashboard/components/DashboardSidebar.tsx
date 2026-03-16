import { BrandConfigurationSection } from './BrandConfigurationSection'
import { BrandSelectorSection } from './BrandSelectorSection'
import { SidebarBrand } from './SidebarBrand'
import { SidebarNavigation } from './SidebarNavigation'

export function DashboardSidebar() {
  return (
    <aside className="w-80 overflow-y-auto border-r border-slate-800/50 bg-[#030712]/80 p-6">
      <SidebarBrand />

      <div className="space-y-8">
        <BrandSelectorSection />
        <BrandConfigurationSection />
        <SidebarNavigation />
      </div>
    </aside>
  )
}
