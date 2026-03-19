import { getGenreNameById } from '../../../utils/getGenreNameById';
import type { BrandProfile } from '../../../types/brand';

type BrandConfigurationSectionProps = {
  brandProfile: BrandProfile;
};

type GenreInfoCardProps = {
  label: string;
  value: string;
};

function GenreInfoCard({ label, value }: GenreInfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 px-4 py-3">
      <div className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-200">{value}</div>
    </div>
  );
}

export function BrandConfigurationSection({
  brandProfile,
}: BrandConfigurationSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-600">
        Configuración de Marca
      </h2>

      <div className="space-y-2 rounded-3xl border border-slate-800/60 bg-slate-900/25 p-4">
        <GenreInfoCard
          label="Género Primario"
          value={getGenreNameById(brandProfile.primaryGenre)}
        />

        <GenreInfoCard
          label="Género Secundario 1"
          value={getGenreNameById(brandProfile.secondaryGenres[0])}
        />

        <GenreInfoCard
          label="Género Secundario 2"
          value={getGenreNameById(brandProfile.secondaryGenres[1])}
        />
      </div>
    </section>
  );
}
