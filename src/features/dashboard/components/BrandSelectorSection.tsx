import { brandProfiles } from '../../../constants/brandProfiles';
import type { BrandId } from '../../../types/brand';

type BrandSelectorSectionProps = {
  activeBrandId: BrandId;
  onBrandChange: (brandId: BrandId) => void;
};

export function BrandSelectorSection({
  activeBrandId,
  onBrandChange,
}: BrandSelectorSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        Marca
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="active-brand"
            className="text-xs font-semibold text-slate-400"
          >
            Marca Activa
          </label>

          <select
            id="active-brand"
            value={activeBrandId}
            onChange={(event) => onBrandChange(event.target.value as BrandId)}
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
          >
            {brandProfiles.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
