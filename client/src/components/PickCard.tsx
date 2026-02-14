interface Pick {
  id: number;
  date: string;
  game: string;
  pick: string;
  units: number;
  odds: number;
  result: string;
  score: string | null;
  pnl: number;
  sport: string;
  edge: number | null;
  edges_used: string | null;
}

export default function PickCard({ pick }: { pick: Pick }) {
  const resultColor = pick.result === 'WIN' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    : pick.result === 'LOSS' ? 'bg-red-500/20 text-red-400 border-red-500/30'
    : pick.result === 'PUSH' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    : 'bg-blue-500/20 text-blue-400 border-blue-500/30';

  const pnlColor = pick.pnl > 0 ? 'text-emerald-400' : pick.pnl < 0 ? 'text-red-400' : 'text-white/60';

  return (
    <div className="glass p-4 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-white/30">{pick.date}</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/40">{pick.sport}</span>
        </div>
        <p className="font-medium text-white/90 truncate">{pick.game}</p>
        <p className="text-sm text-emerald-400 font-semibold">{pick.pick}</p>
        {pick.score && <p className="text-xs text-white/30 mt-1">{pick.score}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <p className="text-xs text-white/40">{pick.units}u @ {pick.odds}</p>
          <p className={`text-sm font-bold ${pnlColor}`}>
            {pick.pnl > 0 ? '+' : ''}{pick.pnl.toFixed(2)}u
          </p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${resultColor}`}>
          {pick.result}
        </span>
      </div>
    </div>
  );
}
