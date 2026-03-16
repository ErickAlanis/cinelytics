import { Card } from '../../../components/Card'

export function TalentSearchPanel() {
  return (
    <Card className="bg-slate-900/30 p-5 border-slate-800/60">
      <label className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
        Buscar actor
      </label>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Ej. Ryan Gosling"
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
        />

        <button
          type="button"
          className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="text-sm font-black text-slate-50">Ryan Gosling</div>
          <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">
            Match destacado
          </div>

          <div className="mt-4 inline-flex flex-col rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">
            <span className="text-3xl font-black text-indigo-400">76%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Afinidad
            </span>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
              Drama
            </span>
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
              Romance
            </span>
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
              Sci-Fi
            </span>
          </div>

          <p className="text-sm italic leading-relaxed text-indigo-300">
            Insight: Este actor se asocia con campañas aspiracionales y de lujo
            porque gran parte de su filmografía se concentra en drama, romance y
            narrativas estilizadas.
          </p>
        </div>
      </div>
    </Card>
  )
}
