import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DayStat {
  date: string;
  cumulative_units: number;
  units_won: number;
}

export default function PnLChart({ data }: { data: DayStat[] }) {
  if (!data.length) return null;

  const chartData = data.map(d => ({
    date: d.date.slice(5),
    units: d.cumulative_units,
    daily: d.units_won,
  }));

  return (
    <div className="glass p-4">
      <h2 className="text-lg font-bold mb-3 text-white/80">Cumulative P&L</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v > 0 ? '+' : ''}${v}`} />
          <Tooltip
            contentStyle={{ background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }}
            formatter={(value: number) => [`${value > 0 ? '+' : ''}${value.toFixed(2)}u`, 'Units']}
          />
          <Area type="monotone" dataKey="units" stroke="#10b981" fill="url(#green)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
