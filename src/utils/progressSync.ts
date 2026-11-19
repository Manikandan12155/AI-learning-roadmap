import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface UserProgressData {
  completedTopicsCount: number;
  unlockedTier: number;
  progressData: Record<string, boolean>;
}

/**
 * Saves or updates user learning progress in Supabase profiles table
 */
export async function syncUserProgressToCloud(
  userId: string,
  progress: UserProgressData,
  userMeta?: { email?: string; full_name?: string; avatar_url?: string }
) {
  if (!isSupabaseConfigured || !userId) return;

  try {
    const payload: any = {
      id: userId,
      completed_topics_count: progress.completedTopicsCount,
      unlocked_tier: progress.unlockedTier,
      progress_data: progress.progressData,
      last_active_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (userMeta?.email) payload.email = userMeta.email;
    if (userMeta?.full_name) payload.full_name = userMeta.full_name;
    if (userMeta?.avatar_url) payload.avatar_url = userMeta.avatar_url;

    const { error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      console.warn("Supabase progress sync note (table might need creation in dashboard):", error.message);
    }
  } catch (err) {
    console.warn("Progress sync error:", err);
  }
}

/**
 * Loads cloud progress from Supabase profiles table
 */
export async function loadUserProgressFromCloud(
  userId: string
): Promise<Record<string, boolean> | null> {
  if (!isSupabaseConfigured || !userId) return null;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("progress_data, completed_topics_count")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) return null;
    return (data.progress_data as Record<string, boolean>) || null;
  } catch (err) {
    console.warn("Failed to load user cloud progress:", err);
    return null;
  }
}

