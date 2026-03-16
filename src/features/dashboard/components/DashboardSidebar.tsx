import type { BrandId, BrandProfile } from '../../../types/brand'
import { BrandConfigurationSection } from './BrandConfigurationSection'
import { BrandSelectorSection } from './BrandSelectorSection'
import { SidebarBrand } from './SidebarBrand'
import { SidebarNavigation } from './SidebarNavigation'

type DashboardSidebarProps = {
  activeBrandId: BrandId
  activeBrandProfile: BrandProfile
  onBrandChange: (brandId: BrandId) => void
}

export function DashboardSidebar({
  activeBrandId,
  activeBrandProfile,
  onBrandChange,
}: DashboardSidebarProps) {
  return (
    <aside className="w-80 overflow-y-auto border-r border-slate-800/50 bg-[#030712]/80 p-6">
      <SidebarBrand />

      <div className="space-y-8">
        <BrandSelectorSection
          activeBrandId={activeBrandId}
          onBrandChange={onBrandChange}
        />
        <BrandConfigurationSection brandProfile={activeBrandProfile} />
        <SidebarNavigation />
      </div>
    </aside>
  )
}
