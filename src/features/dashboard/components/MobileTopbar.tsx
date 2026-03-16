export function MobileTopbar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-[#030712]/90 px-4 py-3 lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
          <span className="text-sm text-white">🎬</span>
        </div>

        <span className="text-sm font-black text-slate-50">Cinelytics</span>
      </div>

      <button
        type="button"
        className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-400"
      >
        Marca / Filtros
      </button>
    </div>
  )
}
