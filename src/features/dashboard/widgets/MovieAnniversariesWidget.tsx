import { Card } from '../../../components/Card'
import { WidgetHeader } from '../../../components/WidgetHeader'

export function MovieAnniversariesWidget() {
  return (
    <Card className="col-span-12 p-8 lg:col-span-5">
      <WidgetHeader title="Aniversarios Clave" />

      <div className="space-y-6">
        <div className="relative flex gap-4 border-l-2 border-indigo-500/30 pl-6">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-[#070b14] bg-gradient-to-br from-indigo-500 to-purple-500" />

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
              Hoy · 20 años
            </span>

            <h4 className="mt-1 text-base font-bold text-slate-50">
              Back to the Future
            </h4>

            <p className="mt-1 text-xs italic text-slate-400">
              Estrategia: Storytelling retro-futurista.
            </p>
          </div>
        </div>

        <div className="flex gap-4 border-l-2 border-slate-800 pl-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Mañana · 10 años
            </span>

            <h4 className="mt-1 text-base font-bold text-slate-300">
              Harry Potter
            </h4>

            <p className="mt-1 text-xs italic text-slate-500">
              Estrategia: Colecciones mágicas temáticas.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
