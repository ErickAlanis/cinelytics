import { Card } from '../../../components/Card'
import { WidgetHeader } from '../../../components/WidgetHeader'

export function AffinityMixWidget() {
  return (
    <Card className="col-span-12 flex flex-col items-center p-8 lg:col-span-4">
      <WidgetHeader title="Mix de Afinidad"/>

      <div className="relative mb-8 h-48 w-48">
        <svg className="h-full w-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="#1e293b"
            strokeWidth="16"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="url(#affinity-gradient)"
            strokeWidth="16"
            fill="transparent"
            strokeDasharray="502"
            strokeDashoffset="90"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="affinity-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-50">82%</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Brand Fit
          </span>
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Emocional</span>
          <span>High</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-[82%] bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>
      </div>
    </Card>
  )
}
