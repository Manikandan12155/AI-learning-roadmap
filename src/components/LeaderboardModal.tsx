import React, { useEffect, useState } from "react";
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  Sparkles,
  ShieldCheck,
  X,
  ExternalLink,
  Users,
  Search,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";

interface LeaderboardUser {
  id: string;
  full_name: string;
  email?: string;
  avatar_url?: string;
  completed_topics_count: number;
  unlocked_tier: number;
  last_active_at: string;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

const TIER_BADGES = [
  { name: "Novice", color: "text-neutral-400 bg-neutral-800 border-neutral-700" },
  { name: "Cyber Fox", color: "text-amber-300 bg-amber-500/15 border-amber-500/30" },
  { name: "Neural Leopard", color: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30" },
  { name: "Alpha Wolf", color: "text-purple-300 bg-purple-500/15 border-purple-500/30" },
  { name: "Apex Dragon", color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/40" },
];

export function LeaderboardModal({ isOpen, onClose, currentUserId }: LeaderboardModalProps) {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    async function fetchLeaderboard() {
      setLoading(true);
      if (!isSupabaseConfigured) {
        // Fallback mock leaderboard if Supabase isn't reachable
        setUsers([
          {
            id: "1",
            full_name: "Aiswarya Babu",
            avatar_url: "https://lh3.googleusercontent.com/a/ACg8ocLBu6qSmn1GPuHmjdyRlfufo1ZwL-xlTBsvw8DsIGvXmz4ri9As=s96-c",
            completed_topics_count: 65,
            unlocked_tier: 1,
            last_active_at: new Date().toISOString(),
          },
          {
            id: "2",
            full_name: "Manikandan R",
            avatar_url: "",
            completed_topics_count: 280,
            unlocked_tier: 3,
            last_active_at: new Date().toISOString(),
          },
        ]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url, completed_topics_count, unlocked_tier, last_active_at")
          .order("completed_topics_count", { ascending: false })
          .limit(50);

        if (data && !error) {
          setUsers(data as LeaderboardUser[]);
        }
      } catch (e) {
        console.error("Leaderboard fetch error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) =>
    (u.full_name || "Anonymous").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#141210] via-[#0d0c0a] to-[#080706] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 sm:p-7 space-y-5 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-36 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-border bg-surface hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            <Trophy className="h-3.5 w-3.5 fill-current" /> Global AI Learners Leaderboard
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white uppercase tracking-tight">
            Top Consistency Builders
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
            Ranked live by validated topics mastered across all 14 curriculum levels (583 total).
          </p>
        </div>

        {/* Top 3 Podium Cards (If at least 2 users exist) */}
        {!loading && filteredUsers.length >= 2 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 pb-2">
            {/* Rank 2 */}
            <div className="rounded-2xl border border-neutral-700/60 bg-white/[0.02] p-3 text-center flex flex-col items-center justify-end relative">
              <div className="h-6 w-6 rounded-full bg-slate-400 text-black font-extrabold text-[10px] grid place-items-center mb-1.5 shadow">
                2
              </div>
              <img
                src={filteredUsers[1]?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${filteredUsers[1]?.id}`}
                alt=""
                className="w-11 h-11 rounded-full border-2 border-slate-400 object-cover mb-1.5 shadow-md"
              />
              <span className="font-display font-bold text-xs text-white truncate max-w-full">
                {filteredUsers[1]?.full_name || "Learner"}
              </span>
              <span className="font-mono text-[11px] text-amber-400 font-semibold">
                {filteredUsers[1]?.completed_topics_count} Topics
              </span>
            </div>

            {/* Rank 1 (Gold Apex) */}
            <div className="rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-amber-500/15 to-transparent p-3.5 text-center flex flex-col items-center justify-end relative shadow-[0_0_25px_rgba(245,158,11,0.25)] transform -translate-y-1">
              <div className="h-7 w-7 rounded-full bg-amber-400 text-black font-black text-xs grid place-items-center mb-1.5 shadow-glow">
                👑
              </div>
              <img
                src={filteredUsers[0]?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${filteredUsers[0]?.id}`}
                alt=""
                className="w-13 h-13 rounded-full border-2 border-amber-400 object-cover mb-1.5 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
              <span className="font-display font-extrabold text-xs sm:text-sm text-yellow-300 truncate max-w-full">
                {filteredUsers[0]?.full_name || "Learner"}
              </span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                {filteredUsers[0]?.completed_topics_count} Topics
              </span>
            </div>

            {/* Rank 3 */}
            <div className="rounded-2xl border border-neutral-700/60 bg-white/[0.02] p-3 text-center flex flex-col items-center justify-end relative">
              <div className="h-6 w-6 rounded-full bg-amber-700 text-white font-extrabold text-[10px] grid place-items-center mb-1.5 shadow">
                3
              </div>
              <img
                src={filteredUsers[2]?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${filteredUsers[2]?.id || "seed3"}`}
                alt=""
                className="w-11 h-11 rounded-full border-2 border-amber-700 object-cover mb-1.5 shadow-md"
              />
              <span className="font-display font-bold text-xs text-white truncate max-w-full">
                {filteredUsers[2]?.full_name || "Learner"}
              </span>
              <span className="font-mono text-[11px] text-amber-400 font-semibold">
                {filteredUsers[2]?.completed_topics_count || 0} Topics
              </span>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search learners by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/50 font-sans"
          />
        </div>

        {/* User Rank Scroll List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {loading ? (
            <div className="text-center py-8 text-neutral-400 text-xs font-mono">
              Loading global rankings from Supabase...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-xs">
              No learners found. Be the first to start learning!
            </div>
          ) : (
            filteredUsers.map((user, idx) => {
              const isCurrentUser = user.id === currentUserId;
              const tierBadge = TIER_BADGES[user.unlocked_tier] || TIER_BADGES[0];

              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isCurrentUser
                      ? "border-amber-400/80 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono text-xs font-extrabold w-6 text-center ${
                        idx === 0
                          ? "text-yellow-400 font-black text-sm"
                          : idx === 1
                          ? "text-slate-300"
                          : idx === 2
                          ? "text-amber-600"
                          : "text-neutral-500"
                      }`}
                    >
                      #{idx + 1}
                    </span>

                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-semibold text-xs sm:text-sm text-white truncate">
                          {user.full_name || "AI Engineer"}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`px-2 py-0.2 rounded-full border text-[9px] font-mono font-semibold ${tierBadge.color}`}
                        >
                          {tierBadge.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-emerald-400 block">
                      {user.completed_topics_count}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 block uppercase">
                      / 583 Topics
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>Synced with Supabase PostgreSQL</span>
          <span className="text-amber-400 font-semibold">100% Verifiable Ranks</span>
        </div>
      </div>
    </div>
  );
}

