import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<
  ComponentPropsWithoutRef<'div'> & {
    className?: string
  }
>

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/8 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
