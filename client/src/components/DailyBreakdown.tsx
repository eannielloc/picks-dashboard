interface DayStat {
  date: string;
  wins: number;
  losses: number;
  pushes: number;
  units_won: number;
  cumulative_units: number;
  cumulative_record: string;
}

export default function DailyBreakdown({ data }: { data: DayStat[] }) {
  if (!data.length) return null;

  return (
    <div className="glass overflow-hidden">
      <h2 className="text-lg font-bold p-4 pb-2 text-white/80">Daily Breakdown</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase">
              <th className="text-left p-3">Date</th>
              <th className="text-center p-3">Record</th>
              <th className="text-right p-3">Day P&L</th>
              <th className="text-right p-3">Cumulative</th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map(d => (
              <tr key={d.date} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-3 text-white/70">{d.date}</td>
                <td className="p-3 text-center font-medium">{d.wins}-{d.losses}{d.pushes > 0 ? `-${d.pushes}` : ''}</td>
                <td className={`p-3 text-right font-bold ${d.units_won >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {d.units_won > 0 ? '+' : ''}{d.units_won.toFixed(2)}u
                </td>
                <td className={`p-3 text-right font-bold ${d.cumulative_units >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {d.cumulative_units > 0 ? '+' : ''}{d.cumulative_units.toFixed(2)}u
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
