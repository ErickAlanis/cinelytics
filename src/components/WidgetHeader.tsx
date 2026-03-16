import type { ReactNode } from 'react'

type WidgetHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function WidgetHeader({
  title,
  subtitle,
  action,
}: WidgetHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-bold tracking-tight text-slate-50">
          {title}
        </h3>

        {subtitle ? (
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
