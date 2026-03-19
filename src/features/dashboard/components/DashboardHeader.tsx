import { SectionHeading } from '../../../components/SectionHeading';
import type { BrandProfile } from '../../../types/brand';

type DashboardHeaderProps = {
  activeBrandProfile: BrandProfile;
};

export function DashboardHeader({ activeBrandProfile }: DashboardHeaderProps) {
  return (
    <header
      id="dashboard-overview"
      className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
    >
      <SectionHeading
        title="Dashboard de Afinidad"
        subtitle={`Análisis de inteligencia cultural para marketing basado en tendencias cinematográficas y afinidad narrativa de marca. Marca activa: ${activeBrandProfile.name}.`}
        className="max-w-2xl"
      />

    </header>
  );
}
