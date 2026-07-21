import type { Bank } from "@/lib/banks";
import type { StatementExtraction } from "@/lib/statement-extraction";

const SUFFIX_WORDS =
  /\b(bank|banking|na|n a|inc|incorporated|corp|corporation|financial|services|co|company|llc|ltd)\b/g;

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(SUFFIX_WORDS, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Best-effort match of an extracted institution name against the curated
 * `banks` list, by normalized substring containment. Not a proper fuzzy
 * match (no edit-distance/typo tolerance) — good enough for v1 given the
 * user always gets a chance to confirm or override in the review step.
 */
export function matchBank(
  extraction: Pick<
    StatementExtraction,
    "institution_name" | "institution_aliases"
  >,
  banks: Bank[],
): Bank | null {
  const candidates = [extraction.institution_name, ...extraction.institution_aliases]
    .map(normalize)
    .filter(Boolean);

  if (candidates.length === 0) return null;

  for (const bank of banks) {
    const bankName = normalize(bank.name);
    if (!bankName) continue;

    const isMatch = candidates.some(
      (candidate) =>
        candidate === bankName ||
        candidate.includes(bankName) ||
        bankName.includes(candidate),
    );

    if (isMatch) return bank;
  }

  return null;
}
