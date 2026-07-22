"use server";

import { sbServerClient } from "@/lib/supabase/server";
import type { SituationFormData } from "@/app/(app)/dashboard/situation/_components/SituationWizard";

const SITUATION_SELECT_FIELDS =
  "situation, situation_details, situation_start_date, expected_resolution_date, monthly_income_before, monthly_income_current, desired_outcome, preferred_communication_tone";

/**
 * Fetches the current user's situation, if they've saved one. Row Level
 * Security scopes this to the signed-in user.
 */
export async function getSituation(): Promise<SituationFormData | null> {
  const supabase = await sbServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return null;
  }

  const { data, error } = await supabase
    .from("situations")
    .select(SITUATION_SELECT_FIELDS)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (error) {
    console.error("[getSituation] Supabase error:", error.message);
    return null;
  }

  if (!data) return null;

  return {
    situation: data.situation ?? "",
    situation_details: data.situation_details ?? "",
    situation_start_date: data.situation_start_date ?? "",
    expected_resolution_date: data.expected_resolution_date ?? "",
    monthly_income_before: data.monthly_income_before?.toString() ?? "",
    monthly_income_current: data.monthly_income_current?.toString() ?? "",
    desired_outcome: data.desired_outcome ?? "lower_payments",
    preferred_communication_tone:
      data.preferred_communication_tone ?? "empathetic",
  };
}

/**
 * Saves (creates or replaces) the current user's situation. There is only
 * ever one situation per user, so this is always an upsert keyed on user_id.
 */
export async function saveSituation(
  data: SituationFormData,
): Promise<{ error?: string }> {
  const supabase = await sbServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase.from("situations").upsert({
    user_id: userData.user.id,
    situation: data.situation,
    situation_details: data.situation_details || null,
    situation_start_date: data.situation_start_date || null,
    expected_resolution_date: data.expected_resolution_date || null,
    monthly_income_before: data.monthly_income_before || null,
    monthly_income_current: data.monthly_income_current || null,
    desired_outcome: data.desired_outcome,
    preferred_communication_tone: data.preferred_communication_tone,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("[saveSituation] Supabase error:", error.message);
    return { error: "Failed to save your situation." };
  }

  return {};
}
