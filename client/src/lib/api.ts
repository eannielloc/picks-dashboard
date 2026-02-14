const BASE = '/api';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface Pick {
  id: number;
  date: string;
  game: string;
  pick: string;
  units: number;
  odds: number;
  edge: number | null;
  edges_used: string;
  result: 'WIN' | 'LOSS' | 'PUSH' | 'PENDING';
  score: string | null;
  pnl: number;
  sport: string;
}

export interface Stats {
  record: string;
  wins: number;
  losses: number;
  pushes: number;
  pending: number;
  units: number;
  wagered: number;
  winRate: number;
  roi: number;
  streak: string;
  streakCount: number;
  streakType: string;
  bestDay: { date: string; units: number } | null;
  worstDay: { date: string; units: number } | null;
  totalPicks: number;
}

export interface DailyStat {
  date: string;
  wins: number;
  losses: number;
  pushes: number;
  units_wagered: number;
  units_won: number;
  cumulative_units: number;
  cumulative_wins: number;
  cumulative_losses: number;
}

export const api = {
  getPicks: (params?: { limit?: number; date?: string }) => {
    const q = new URLSearchParams();
    if (params?.limit) q.set('limit', String(params.limit));
    if (params?.date) q.set('date', params.date);
    const qs = q.toString();
    return fetchJSON<Pick[]>(`/picks${qs ? '?' + qs : ''}`);
  },
  getRecentPicks: () => fetchJSON<Pick[]>('/picks/recent'),
  getTodayPicks: () => fetchJSON<Pick[]>('/picks/today'),
  getStats: () => fetchJSON<Stats>('/stats'),
  getDailyStats: () => fetchJSON<DailyStat[]>('/stats/daily'),
};
