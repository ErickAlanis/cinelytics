import { useEffect, useRef } from 'react';

type DashboardShellProps = {
  sidebar: React.ReactNode;
  mobileTopbar: React.ReactNode;
  children: React.ReactNode;
  isMobileSidebarOpen: boolean;
  onCloseMobileSidebar: () => void;
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled'));
}

export function DashboardShell({
  sidebar,
  mobileTopbar,
  children,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
}: DashboardShellProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const drawer = drawerRef.current;
    const focusableElements = drawer ? getFocusableElements(drawer) : [];
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseMobileSidebar();
        return;
      }

      if (event.key === 'Tab' && drawer && focusableElements.length > 0) {
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastFocusable
        ) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileSidebarOpen, onCloseMobileSidebar]);

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex">{sidebar}</div>

      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar panel lateral"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobileSidebar}
          />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Marca y filtros"
            className="relative z-10 h-full w-[85vw] max-w-80 overflow-y-auto border-r border-slate-800/50 bg-[#030712] p-6 shadow-2xl"
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={onCloseMobileSidebar}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300"
              >
                Cerrar
              </button>
            </div>

            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="lg:hidden">{mobileTopbar}</div>

        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
