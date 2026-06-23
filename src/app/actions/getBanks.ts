"use server";

import { createClient } from "@/lib/supabase/server";

const BANK_SELECT_FIELDS =
  "id, name, slug, deferment_phone, deferment_hours, deferment_url, logo_url, hq, assets_bn, rank";

export async function getBanks() {
  const supabase = await createClient();

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
