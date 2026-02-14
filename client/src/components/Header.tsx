import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-surface-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Drew's Picks</h1>
            <p className="text-xs text-white/40">if I'm wrong, I'm loud about it</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/history" className="text-sm text-white/60 hover:text-white transition">History</Link>
          <a
            href="https://x.com/drewvibecheck"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            @drewvibecheck
          </a>
        </div>
      </div>
    </header>
  );
}
