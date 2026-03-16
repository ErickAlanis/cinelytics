export function BrandConfigurationSection() {
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

          <select
            id="primary-genre"
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300 outline-none ring-indigo-500 focus:ring-2"
            defaultValue="18"
          >
            <option value="28">Action</option>
            <option value="878">Science Fiction</option>
            <option value="18">Drama</option>
            <option value="16">Animation</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="secondary-genre-1"
            className="text-[11px] font-semibold text-slate-500"
          >
            Género Secundario 1
          </label>

          <select
            id="secondary-genre-1"
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300 outline-none ring-indigo-500 focus:ring-2"
            defaultValue="10751"
          >
            <option value="12">Adventure</option>
            <option value="10751">Family</option>
            <option value="18">Drama</option>
            <option value="14">Fantasy</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="secondary-genre-2"
            className="text-[11px] font-semibold text-slate-500"
          >
            Género Secundario 2
          </label>

          <select
            id="secondary-genre-2"
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300 outline-none ring-indigo-500 focus:ring-2"
            defaultValue="35"
          >
            <option value="53">Thriller</option>
            <option value="35">Comedy</option>
            <option value="28">Action</option>
            <option value="36">History</option>
          </select>
        </div>

        <p className="pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
          Visible solo para demo
        </p>
      </div>
    </section>
  )
}
