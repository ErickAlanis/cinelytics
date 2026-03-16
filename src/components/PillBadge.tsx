import type { PropsWithChildren } from 'react'

type PillBadgeProps = PropsWithChildren<{
  className?: string
}>

export function PillBadge({
  children,
  className = '',
}: PillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-400 ${className}`}
    >
      {children}
    </span>
  )
}
