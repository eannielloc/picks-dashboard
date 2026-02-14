import PickCard from './PickCard';

interface Pick {
  id: number; date: string; game: string; pick: string; units: number;
  odds: number; result: string; score: string | null; pnl: number;
  sport: string; edge: number | null; edges_used: string | null;
}

export default function RecentPicks({ picks }: { picks: Pick[] }) {
  if (!picks.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-3 text-white/80">Recent Picks</h2>
      <div className="space-y-2">
        {picks.map(p => <PickCard key={p.id} pick={p} />)}
      </div>
    </div>
  );
}
