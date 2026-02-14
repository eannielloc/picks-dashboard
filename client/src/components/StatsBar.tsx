import { Trophy, TrendingUp, Target, Percent, Flame } from 'lucide-react';

interface Stats {
  record: string;
  units: number;
  winRate: number;
  roi: number;
  streak: string;
  streakType: string;
}

export default function StatsBar({ stats }: { stats: Stats | null }) {
  if (!stats) return null;

  const items = [
    { label: 'Record', value: stats.record, icon: Trophy, color: 'text-emerald-400' },
    { label: 'Units', value: `${stats.units > 0 ? '+' : ''}${stats.units.toFixed(2)}`, icon: TrendingUp, color: stats.units >= 0 ? 'text-emerald-400' : 'text-red-400' },
    { label: 'Win Rate', value: `${stats.winRate}%`, icon: Target, color: stats.winRate >= 50 ? 'text-emerald-400' : 'text-red-400' },
    { label: 'ROI', value: `${stats.roi > 0 ? '+' : ''}${stats.roi}%`, icon: Percent, color: stats.roi >= 0 ? 'text-emerald-400' : 'text-red-400' },
    { label: 'Streak', value: stats.streak, icon: Flame, color: stats.streakType === 'WIN' ? 'text-emerald-400' : 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {items.map(item => (
        <div key={item.label} className="glass p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-xs text-white/40 uppercase tracking-wider">{item.label}</span>
          </div>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
