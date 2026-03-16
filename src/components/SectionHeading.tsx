type SectionHeadingProps = {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h3 className="text-4xl font-bold tracking-tight text-slate-50">
        {title}
      </h3>

      {subtitle ? (
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      ) : null}
    </div>
  )
}
