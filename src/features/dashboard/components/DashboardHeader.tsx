export function DashboardHeader() {
  return (
    <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h2 className="mb-2 text-4xl font-black tracking-tight text-slate-50">
          Dashboard de Afinidad
        </h2>

        <p className="max-w-xl text-slate-400">
          Análisis de inteligencia cultural para marketing basado en
          tendencias cinematográficas y afinidad narrativa de marca.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
          Demo Review Ready
        </span>
      </div>
    </header>
  )
}
