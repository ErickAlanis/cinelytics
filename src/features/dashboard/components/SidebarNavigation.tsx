const navItems = [
  { label: 'Dashboard', icon: '▦', active: true },
  { label: 'Tendencias', icon: '🔥', active: false },
  { label: 'Estrenos', icon: '🎞', active: false },
]

export function SidebarNavigation() {
  return (
    <nav>
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        Navegación
      </h2>

      <ul className="space-y-2 text-sm font-medium">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              className={
                item.active
                  ? 'flex items-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-indigo-400'
                  : 'flex items-center gap-3 rounded-xl p-3 text-slate-400 transition-colors hover:bg-slate-800/50'
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
