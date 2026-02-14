import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PickCard from '../components/PickCard';

export default function History() {
  const [picks, setPicks] = useState<any[]>([]);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const url = dateFilter ? `/api/picks?date=${dateFilter}` : '/api/picks';
    fetch(url).then(r => r.json()).then(setPicks);
  }, [dateFilter]);

  const dates = [...new Set(picks.map(p => p.date))];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Pick History</h2>
          <div className="flex items-center gap-2">
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="bg-surface-700 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="">All Dates</option>
              {!dateFilter && dates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {dateFilter && (
              <button onClick={() => setDateFilter('')} className="text-xs text-white/40 hover:text-white">Clear</button>
            )}
          </div>
        </div>
        <p className="text-sm text-white/40">{picks.length} picks</p>
        <div className="space-y-2">
          {picks.map(p => <PickCard key={p.id} pick={p} />)}
        </div>
      </main>
    </div>
  );
}
