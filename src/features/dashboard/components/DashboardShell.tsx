type DashboardShellProps = {
  sidebar: React.ReactNode
  mobileTopbar: React.ReactNode
  children: React.ReactNode
}

export function DashboardShell({
  sidebar,
  mobileTopbar,
  children,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex">{sidebar}</div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="md:hidden">{mobileTopbar}</div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
