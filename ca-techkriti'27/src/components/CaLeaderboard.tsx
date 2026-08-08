import React, { useState, useEffect } from 'react';
import { insforge } from '../lib/insforge';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  points: number;
  referrals: number;
}

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Aarav Patel', college: 'BITS Pilani', points: 4250, referrals: 85 },
  { rank: 2, name: 'Siddharth Verma', college: 'IIT Delhi', points: 3890, referrals: 74 },
  { rank: 3, name: 'Riya Sen', college: 'IIT Bombay', points: 3540, referrals: 68 },
  { rank: 4, name: 'Devansh Sharma', college: 'NIT Trichy', points: 3120, referrals: 59 },
  { rank: 5, name: 'Ananya Roy', college: 'DTU Delhi', points: 2980, referrals: 52 },
];

export const CaLeaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(DEFAULT_LEADERBOARD);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await insforge.database.from('ca_leaderboard').select('*').order('points', { ascending: false });
      if (data && data.length > 0) {
        setEntries(data.map((item: any, idx: number) => ({
          rank: idx + 1,
          name: item.name || item.full_name,
          college: item.college || item.college_name,
          points: item.points || 100,
          referrals: item.referrals || 5
        })));
      }
    } catch {
      // Keep fallback mock data if table is empty
    }
  };

  return (
    <section className="py-20 px-6 relative z-10 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="liquid-glass inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-pink-300 uppercase tracking-widest mb-4">
          Live Standings
        </span>
        <h2 className="font-general text-4xl font-bold text-foreground">
          Top Ambassador <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">Leaderboard</span>
        </h2>
      </div>

      <div className="liquid-glass rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-hero-sub bg-white/[0.02]">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Ambassador</th>
                <th className="py-4 px-6">College</th>
                <th className="py-4 px-6 text-right">Referrals</th>
                <th className="py-4 px-6 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {entries.map((row) => (
                <tr key={row.rank} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-6 font-bold">
                    {row.rank === 1 && <span className="text-amber-400 flex items-center gap-1"><Trophy size={16} /> #1</span>}
                    {row.rank === 2 && <span className="text-slate-300 flex items-center gap-1"><Medal size={16} /> #2</span>}
                    {row.rank === 3 && <span className="text-amber-600 flex items-center gap-1"><Award size={16} /> #3</span>}
                    {row.rank > 3 && <span className="text-hero-sub">#{row.rank}</span>}
                  </td>
                  <td className="py-4 px-6 font-semibold text-foreground">{row.name}</td>
                  <td className="py-4 px-6 text-hero-sub">{row.college}</td>
                  <td className="py-4 px-6 text-right font-mono text-purple-300">{row.referrals}</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-amber-300">
                    {row.points} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
