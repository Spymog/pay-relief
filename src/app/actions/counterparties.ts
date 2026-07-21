"use server";

import { sbServerClient } from "@/lib/supabase/server";
import type { AccountType } from "@/lib/statement-extraction";

const COUNTERPARTY_SELECT_FIELDS =
  "id, bank_id, display_name, account_type, last4, source, created_at";

export interface Counterparty {
  id: string;
  bank_id: string | null;
  display_name: string;
  account_type: string;
  last4: string | null;
  source: string;
  created_at: string;
}

/**
 * Fetches the current user's counterparties. Row Level Security scopes this
 * to the signed-in user, so no explicit user_id filter is needed here.
 */
export async function getCounterparties(): Promise<Counterparty[]> {
  const supabase = await sbServerClient();

  const { data, error } = await supabase
    .from("counterparties")
    .select(COUNTERPARTY_SELECT_FIELDS)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getCounterparties] Supabase error:", error.message);
    return [];
  }

  return data ?? [];
}

export interface CreateCounterpartyInput {
  bank_id: string | null;
  display_name: string;
  account_type: AccountType;
  last4: string | null;
  source: string;
}

export async function createCounterparty(
  input: CreateCounterpartyInput,
): Promise<{ data?: Counterparty; error?: string }> {
  const supabase = await sbServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { error: "You must be signed in." };
  }

  if (!input.display_name.trim()) {
    return { error: "A display name is required." };
  }

  const { data, error } = await supabase
    .from("counterparties")
    .insert({ ...input, user_id: userData.user.id })
    .select(COUNTERPARTY_SELECT_FIELDS)
    .single();

  if (error) {
    console.error("[createCounterparty] Supabase error:", error.message);
    return { error: "Failed to save that counterparty." };
  }

  return { data };
}
