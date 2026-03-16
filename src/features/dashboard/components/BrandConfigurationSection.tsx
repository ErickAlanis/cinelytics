import { getGenreNameById } from '../../../utils/getGenreNameById'
import type { BrandProfile } from '../../../types/brand'

type BrandConfigurationSectionProps = {
  brandProfile: BrandProfile
}

export function BrandConfigurationSection({
  brandProfile,
}: BrandConfigurationSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-600">
        Configuración de Marca
      </h2>

      <div className="space-y-4 rounded-3xl border border-slate-800/60 bg-slate-900/30 p-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="primary-genre"
            className="text-[11px] font-semibold text-slate-500"
          >
            Género Primario
          </label>

          <input
            id="primary-genre"
            value={getGenreNameById(brandProfile.primaryGenre)}
            readOnly
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="secondary-genre-1"
            className="text-[11px] font-semibold text-slate-500"
          >
            Género Secundario 1
          </label>

          <input
            id="secondary-genre-1"
            value={getGenreNameById(brandProfile.secondaryGenres[0])}
            readOnly
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="secondary-genre-2"
            className="text-[11px] font-semibold text-slate-500"
          >
            Género Secundario 2
          </label>

          <input
            id="secondary-genre-2"
            value={getGenreNameById(brandProfile.secondaryGenres[1])}
            readOnly
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300 outline-none"
          />
        </div>

        <p className="pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
          Visible solo para demo
        </p>
      </div>
    </section>
  )
}
