const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'picks.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS picks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    game TEXT NOT NULL,
    pick TEXT NOT NULL,
    units REAL NOT NULL,
    odds INTEGER DEFAULT -110,
    edge REAL,
    edges_used TEXT,
    result TEXT DEFAULT 'PENDING',
    score TEXT,
    pnl REAL DEFAULT 0,
    sport TEXT DEFAULT 'NBA',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS daily_stats (
    date TEXT PRIMARY KEY,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    pushes INTEGER DEFAULT 0,
    units_wagered REAL DEFAULT 0,
    units_won REAL DEFAULT 0,
    cumulative_units REAL DEFAULT 0,
    cumulative_record TEXT
  );
`);

// Seed data
const count = db.prepare('SELECT COUNT(*) as c FROM picks').get().c;
if (count === 0) {
  const ins = db.prepare(`INSERT INTO picks (date, game, pick, units, odds, edge, edges_used, result, score, pnl, sport) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
  const insDay = db.prepare(`INSERT INTO daily_stats (date, wins, losses, pushes, units_wagered, units_won, cumulative_units, cumulative_record) VALUES (?,?,?,?,?,?,?,?)`);

  const picks = [
    // Feb 2
    ['2026-02-02', 'Tennis - Arthur Fils', 'Fils ML', 2.0, -117, null, null, 'WIN', null, 1.71, 'Tennis'],
    // Feb 3
    ['2026-02-03', 'ATL @ MIA', 'Hawks +1.5', 2.0, -110, null, null, 'WIN', null, 1.82, 'NBA'],
    ['2026-02-03', 'DEN @ DET', 'Nuggets +5.5', 1.5, -110, null, null, 'WIN', null, 1.36, 'NBA'],
    ['2026-02-03', 'CHI @ MIL', 'Bucks +1.5', 1.0, -110, null, null, 'WIN', null, 0.91, 'NBA'],
    // Feb 4
    ['2026-02-04', 'OKC @ SAS', 'Spurs +2.5', 1.5, -110, null, 'B2B fade, sharp money', 'WIN', 'SAS 116 - OKC 106', 1.36, 'NBA'],
    ['2026-02-04', 'BOS @ HOU', 'Celtics +4.5', 1.5, -110, null, 'ATS fade, CLV', 'WIN', 'BOS 114 - HOU 93', 1.36, 'NBA'],
    ['2026-02-04', 'NOP @ MIL', 'Bucks +5.5', 1.0, -110, 4.0, 'model edge', 'WIN', 'MIL 141 - NOP 137 (OT)', 0.91, 'NBA'],
    // Feb 5
    ['2026-02-05', 'WSH @ DET', 'DET -14.5', 2.0, -110, 6.0, 'model edge', 'LOSS', 'WSH 126 - DET 117', -2.0, 'NBA'],
    ['2026-02-05', 'GSW @ PHX', 'GSW +6.5', 2.0, -110, 4.5, 'model edge', 'WIN', 'GS 101 - PHX 97', 1.82, 'NBA'],
    ['2026-02-05', 'SAS @ DAL', 'DAL +8.5', 1.5, -110, 3.0, 'model edge', 'LOSS', 'SAS 135 - DAL 123', -1.5, 'NBA'],
    // Feb 6
    ['2026-02-06', 'NOP @ MIN', 'MIN -8.5', 2.0, -110, 4.5, 'sharp money, model edge', 'LOSS', 'NOP 119 - MIN 115', -2.0, 'NBA'],
    ['2026-02-06', 'MEM @ POR', 'MEM +8.5', 2.0, -110, 7.5, 'model edge', 'LOSS', 'POR 135 - MEM 115', -2.0, 'NBA'],
    ['2026-02-06', 'MIA @ BOS', 'MIA +6.5', 1.5, -110, 3.0, 'injury edge', 'WIN', 'BOS 98 - MIA 96', 1.36, 'NBA'],
    // Feb 7
    ['2026-02-07', 'MEM @ POR', 'MEM +8.5', 2.0, -110, 6.5, 'sharp money', 'WIN', 'MEM 115 - POR 122', 1.82, 'NBA'],
    ['2026-02-07', 'PHI @ PHX', 'PHX -2.5', 2.0, -110, 5.5, 'injury fade', 'LOSS', 'PHI 109 - PHX 103', -2.2, 'NBA'],
    ['2026-02-07', 'DEN @ CHI', 'CHI +7.5', 1.5, -110, 3.5, 'injury fade', 'LOSS', 'DEN 136 - CHI 120', -1.65, 'NBA'],
    // Feb 9
    ['2026-02-09', 'UTA @ MIA', 'MIA -6.5', 2.0, -110, 4.5, 'model edge', 'LOSS', '111-115', -2.0, 'NBA'],
    ['2026-02-09', 'CHI @ BKN', 'BKN +3.5', 1.5, -110, 3.5, 'pythagorean fade', 'WIN', '123-115', 1.36, 'NBA'],
    ['2026-02-09', 'PHI @ POR', 'POR +3.5', 1.0, -110, 6.5, 'injury fade', 'WIN', '135-118', 0.91, 'NBA'],
    // Feb 11
    ['2026-02-11', 'IND @ BKN', 'IND +6.5', 2.0, -110, 4.5, 'underdog lean', 'WIN', 'IND 115 - BKN 110', 1.82, 'NBA'],
    ['2026-02-11', 'NYK @ PHI', 'NYK +2.5', 2.0, -110, 9.0, 'injury edge, underdog lean', 'WIN', 'NYK 138 - PHI 89', 1.82, 'NBA'],
    ['2026-02-11', 'MIA @ NOP', 'MIA +1.5', 2.0, -110, 5.5, 'pythagorean regression, underdog lean', 'WIN', 'MIA 123 - NOP 111', 1.82, 'NBA'],
    ['2026-02-11', 'DET @ TOR', 'DET +1.5', 2.0, -110, 5.0, 'underdog lean', 'WIN', 'DET 113 - TOR 95', 1.82, 'NBA'],
    ['2026-02-11', 'CHA @ ATL', 'CHA -3.5', 1.5, -110, 2.5, 'pythagorean regression', 'LOSS', 'CHA 110 - ATL 107', -1.65, 'NBA'],
    // Feb 12
    ['2026-02-12', 'DAL @ LAL', 'DAL +6.5', 1.5, -110, 3.5, 'pythagorean regression, underdog lean', 'LOSS', 'LAL 124 - DAL 104', -1.5, 'NBA'],
  ];

  const insertMany = db.transaction(() => {
    for (const p of picks) {
      ins.run(...p);
    }
  });
  insertMany();

  // Daily stats with running totals
  const days = [
    { date: '2026-02-02', w: 1, l: 0, p: 0, wagered: 2.0, won: 1.71 },
    { date: '2026-02-03', w: 3, l: 0, p: 0, wagered: 4.5, won: 4.09 },
    { date: '2026-02-04', w: 3, l: 0, p: 0, wagered: 4.0, won: 3.63 },
    { date: '2026-02-05', w: 1, l: 2, p: 0, wagered: 5.5, won: -1.68 },
    { date: '2026-02-06', w: 1, l: 2, p: 0, wagered: 5.5, won: -2.64 },
    { date: '2026-02-07', w: 1, l: 2, p: 0, wagered: 5.5, won: -2.03 },
    { date: '2026-02-09', w: 2, l: 1, p: 0, wagered: 4.5, won: 0.27 },
    { date: '2026-02-11', w: 4, l: 1, p: 0, wagered: 9.5, won: 5.63 },
    { date: '2026-02-12', w: 0, l: 1, p: 0, wagered: 1.5, won: -1.50 },
  ];

  let cumUnits = 0;
  let cumW = 0;
  let cumL = 0;
  const insertDays = db.transaction(() => {
    for (const d of days) {
      cumUnits += d.won;
      cumW += d.w;
      cumL += d.l;
      insDay.run(d.date, d.w, d.l, d.p, d.wagered, d.won, Math.round(cumUnits * 100) / 100, `${cumW}-${cumL}`);
    }
  });
  insertDays();

  console.log('Seeded picks data');
}

module.exports = db;
