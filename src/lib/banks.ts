import { sbServerClient } from "@/lib/supabase/server";

export interface Bank {
  id: string;
  name: string;
  slug: string;
  deferment_phone: string;
  deferment_hours: string | null;
  deferment_url: string | null;
  logo_url: string | null;
  hq: string | null;
  assets_bn: number | null;
  rank: number | null;
}

const BANK_SELECT_FIELDS =
  "id, name, slug, deferment_phone, deferment_hours, deferment_url, logo_url, hq, assets_bn, rank";

/**
 * Fetches all active banks, ordered by rank (asset size) ascending.
 * Intended for server components / server actions.
 */
export async function getBanks(): Promise<Bank[]> {
  const supabase = await sbServerClient();

  const { data, error } = await supabase
    .from("banks")
    .select(BANK_SELECT_FIELDS)
    .eq("is_active", true)
    .order("rank", { ascending: true });

  if (error) {
    console.error("[getBanks] Supabase error:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches a single bank by slug.
 */
export async function getBankBySlug(slug: string): Promise<Bank | null> {
  const supabase = await sbServerClient();

  const { data, error } = await supabase
    .from("banks")
    .select(BANK_SELECT_FIELDS)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("[getBankBySlug] Supabase error:", error.message);
    return null;
  }

  return data;
}
