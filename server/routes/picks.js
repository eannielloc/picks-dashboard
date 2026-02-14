const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/picks
router.get('/picks', (req, res) => {
  const { limit, date } = req.query;
  let sql = 'SELECT * FROM picks';
  const params = [];
  if (date) { sql += ' WHERE date = ?'; params.push(date); }
  sql += ' ORDER BY date DESC, id DESC';
  if (limit) { sql += ' LIMIT ?'; params.push(parseInt(limit)); }
  res.json(db.prepare(sql).all(...params));
});

// GET /api/picks/today
router.get('/picks/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json(db.prepare('SELECT * FROM picks WHERE date = ? ORDER BY id').all(today));
});

// GET /api/picks/recent
router.get('/picks/recent', (req, res) => {
  res.json(db.prepare('SELECT * FROM picks ORDER BY date DESC, id DESC LIMIT 10').all());
});

// GET /api/stats
router.get('/stats', (req, res) => {
  const all = db.prepare('SELECT * FROM picks WHERE result IN (\'WIN\',\'LOSS\',\'PUSH\')').all();
  const wins = all.filter(p => p.result === 'WIN').length;
  const losses = all.filter(p => p.result === 'LOSS').length;
  const pushes = all.filter(p => p.result === 'PUSH').length;
  const totalPnl = all.reduce((s, p) => s + p.pnl, 0);
  const totalWagered = all.reduce((s, p) => s + p.units, 0);
  const winRate = all.length > 0 ? (wins / (wins + losses)) * 100 : 0;
  const roi = totalWagered > 0 ? (totalPnl / totalWagered) * 100 : 0;

  // Current streak
  const sorted = db.prepare('SELECT result FROM picks WHERE result IN (\'WIN\',\'LOSS\') ORDER BY date DESC, id DESC').all();
  let streak = 0;
  let streakType = sorted[0]?.result || '';
  for (const p of sorted) {
    if (p.result === streakType) streak++;
    else break;
  }

  // Best/worst day
  const days = db.prepare('SELECT * FROM daily_stats ORDER BY units_won DESC').all();
  const bestDay = days[0] || null;
  const worstDay = days[days.length - 1] || null;

  res.json({
    record: `${wins}-${losses}${pushes ? `-${pushes}` : ''}`,
    wins, losses, pushes,
    units: Math.round(totalPnl * 100) / 100,
    totalWagered: Math.round(totalWagered * 100) / 100,
    winRate: Math.round(winRate * 10) / 10,
    roi: Math.round(roi * 10) / 10,
    streak: `${streak}${streakType[0] || ''}`,
    streakType,
    streakCount: streak,
    bestDay: bestDay ? { date: bestDay.date, units: bestDay.units_won, record: `${bestDay.wins}-${bestDay.losses}` } : null,
    worstDay: worstDay ? { date: worstDay.date, units: worstDay.units_won, record: `${worstDay.wins}-${worstDay.losses}` } : null,
  });
});

// GET /api/stats/daily
router.get('/stats/daily', (req, res) => {
  res.json(db.prepare('SELECT * FROM daily_stats ORDER BY date ASC').all());
});

// GET /api/stats/monthly
router.get('/stats/monthly', (req, res) => {
  const rows = db.prepare(`
    SELECT 
      substr(date, 1, 7) as month,
      SUM(wins) as wins,
      SUM(losses) as losses,
      SUM(pushes) as pushes,
      SUM(units_wagered) as wagered,
      SUM(units_won) as units
    FROM daily_stats
    GROUP BY substr(date, 1, 7)
    ORDER BY month DESC
  `).all();
  res.json(rows);
});

module.exports = router;
