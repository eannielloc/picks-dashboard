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
              <p className="text-lg">Check out today's picks</p>
              <a href="https://t.me/blazepickss" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-[#229ED9]/20 text-[#229ED9] hover:bg-[#229ED9]/30 transition text-sm font-medium">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Join our Telegram
              </a>
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
