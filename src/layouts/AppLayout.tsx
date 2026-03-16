import type { PropsWithChildren } from 'react'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-50">
      {children}
    </div>
  )
}
