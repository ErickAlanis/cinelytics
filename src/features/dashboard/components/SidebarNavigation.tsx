type SidebarNavigationProps = {
  onNavigate?: () => void;
};

const navItems = [
  { label: 'Dashboard', icon: '▦', href: '#dashboard-overview', active: true },
  { label: 'Tendencias', icon: '🔥', href: '#genre-trends', active: false },
  { label: 'Afinidad', icon: '◎', href: '#affinity-mix', active: false },
  { label: 'Estrenos', icon: '🎞', href: '#upcoming-releases', active: false },
  {
    label: 'Aniversarios',
    icon: '🕓',
    href: '#movie-anniversaries',
    active: false,
  },
  { label: 'Talento', icon: '★', href: '#talent-compatibility', active: false },
];

export function SidebarNavigation({ onNavigate }: SidebarNavigationProps) {
  return (
    <nav>
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        Navegación
      </h2>

      <ul className="space-y-2 text-sm font-medium">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={onNavigate}
              aria-current={item.active ? 'page' : undefined}
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
  );
}
