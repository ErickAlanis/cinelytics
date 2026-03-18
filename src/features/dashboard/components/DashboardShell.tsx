import { useEffect } from 'react'

type DashboardShellProps = {
  sidebar: React.ReactNode
  mobileTopbar: React.ReactNode
  children: React.ReactNode
  isMobileSidebarOpen: boolean
  onCloseMobileSidebar: () => void
}

export function DashboardShell({
  sidebar,
  mobileTopbar,
  children,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
}: DashboardShellProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseMobileSidebar()
      }
    }

    if (isMobileSidebarOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileSidebarOpen, onCloseMobileSidebar])

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

          <div className="relative z-10 h-full w-[85vw] max-w-80 overflow-y-auto border-r border-slate-800/50 bg-[#030712] p-6 shadow-2xl">
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="lg:hidden">{mobileTopbar}</div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
