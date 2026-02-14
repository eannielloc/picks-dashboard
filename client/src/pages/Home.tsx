import { useEffect, useState } from 'react';
import Header from '../components/Header';
import StatsBar from '../components/StatsBar';
import PnLChart from '../components/PnLChart';
import RecentPicks from '../components/RecentPicks';
import DailyBreakdown from '../components/DailyBreakdown';
import PickCard from '../components/PickCard';

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [daily, setDaily] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [today, setToday] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats);
    fetch('/api/stats/daily').then(r => r.json()).then(setDaily);
    fetch('/api/picks/recent').then(r => r.json()).then(setRecent);
    fetch('/api/picks/today').then(r => r.json()).then(setToday);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <StatsBar stats={stats} />
        <PnLChart data={daily} />

        {/* Today's Picks */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-white/80">Today's Picks</h2>
          {today.length > 0 ? (
            <div className="space-y-2">
              {today.map(p => <PickCard key={p.id} pick={p} />)}
            </div>
          ) : (
            <div className="glass p-8 text-center text-white/30">
              <p className="text-lg">No picks today</p>
              <p className="text-sm mt-1">Check back later or follow @drewvibecheck for alerts</p>
            </div>
          )}
        </div>

        <RecentPicks picks={recent} />
        <DailyBreakdown data={daily} />

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/5">
          <p className="text-white/30 text-sm">
            Follow{' '}
            <a href="https://x.com/drewvibecheck" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              @drewvibecheck
            </a>{' '}
            on X for live picks
          </p>
          <p className="text-white/15 text-xs mt-2">Drew's Picks — gamble responsibly 🎲</p>
        </footer>
      </main>
    </div>
  );
}
