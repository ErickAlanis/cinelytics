import type { BrandId, BrandProfile } from '../../../types/brand'
import { BrandConfigurationSection } from './BrandConfigurationSection'
import { BrandSelectorSection } from './BrandSelectorSection'
import { SidebarBrand } from './SidebarBrand'
import { SidebarNavigation } from './SidebarNavigation'

type DashboardSidebarProps = {
  activeBrandId: BrandId
  activeBrandProfile: BrandProfile
  onBrandChange: (brandId: BrandId) => void
  onNavigate?: () => void
}

export function DashboardSidebar({
  activeBrandId,
  activeBrandProfile,
  onBrandChange,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <div className="w-80 overflow-y-auto">
      <SidebarBrand />

      <div className="space-y-8">
        <BrandSelectorSection
          activeBrandId={activeBrandId}
          onBrandChange={onBrandChange}
        />
        <BrandConfigurationSection brandProfile={activeBrandProfile} />
        <SidebarNavigation onNavigate={onNavigate} />
      </div>
    </div>
  )
}
