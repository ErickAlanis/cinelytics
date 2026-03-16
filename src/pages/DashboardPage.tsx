import { useMemo, useState } from 'react'
import { DEFAULT_BRAND_ID } from '../constants/defaults'
import { DashboardContent } from '../features/dashboard/components/DashboardContent'
import { DashboardShell } from '../features/dashboard/components/DashboardShell'
import { DashboardSidebar } from '../features/dashboard/components/DashboardSidebar'
import { MobileTopbar } from '../features/dashboard/components/MobileTopbar'
import type { BrandId } from '../types/brand'
import { getBrandProfileById } from '../utils/getBrandProfileById'

export function DashboardPage() {
  const [activeBrandId, setActiveBrandId] = useState<BrandId>(DEFAULT_BRAND_ID)

  const activeBrandProfile = useMemo(() => {
    const profile = getBrandProfileById(activeBrandId)

    if (!profile) {
      throw new Error(`Brand profile not found for id: ${activeBrandId}`)
    }

    return profile
  }, [activeBrandId])

  return (
    <DashboardShell
      sidebar={
        <DashboardSidebar
          activeBrandId={activeBrandId}
          activeBrandProfile={activeBrandProfile}
          onBrandChange={setActiveBrandId}
        />
      }
      mobileTopbar={<MobileTopbar />}
    >
      <DashboardContent activeBrandProfile={activeBrandProfile} />
    </DashboardShell>
  )
}
