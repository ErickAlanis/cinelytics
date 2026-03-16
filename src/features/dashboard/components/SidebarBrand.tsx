export function SidebarBrand() {
  return (
    <div className="mb-10 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
        <span className="text-xl text-white">🎬</span>
      </div>

      <div>
        <h1 className="text-xl font-black uppercase tracking-tight text-slate-50">
          Cine<span className="text-indigo-400">lytics</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Brand Signals
        </p>
      </div>
    </div>
  )
}
