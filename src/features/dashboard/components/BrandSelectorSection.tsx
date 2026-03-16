export function BrandSelectorSection() {
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
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            defaultValue="starbucks"
          >
            <option value="redbull">Red Bull</option>
            <option value="tesla">Tesla</option>
            <option value="starbucks">Starbucks</option>
            <option value="nike">Nike</option>
            <option value="lego">LEGO</option>
          </select>
        </div>
      </div>
    </section>
  )
}
