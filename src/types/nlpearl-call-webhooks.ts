/**
 * NLPearl — Call Webhook payload types (V2)
 * Source: https://developers.nlpearl.ai/pages/webhooks
 *
 * The Call Webhook fires at the START and at the END of every call, with an
 * identical shape for both Inbound and Outbound Pearls. On the start-of-call
 * trigger, end-of-call fields (transcript, summary, collectedInfo, duration,
 * recording, overallSentiment) may be empty / zero rather than populated.
 *
 * ENUM FORMAT
 * `conversationStatus`, `status`, `overallSentiment` and transcript `role`
 * arrive as INTEGER codes on the wire (confirmed by testing — note the docs'
 * example payloads misleadingly show string names). These fields are therefore
 * typed as the numeric `*Code` unions. Use the `*ByCode` maps below to convert
 * a code to its human-readable name, and the `*Name` unions / const objects if
 * you need to go the other way.
 */

/* ------------------------------------------------------------------ *
 * Enums: name -> numeric code (codes per the docs tables)            *
 * Defined as const objects so they're usable at runtime, with        *
 * derived name/code union types.                                     *
 * ------------------------------------------------------------------ */

export const ConversationStatus = {
  NeedRetry: 10,
  InCallQueue: 20,
  OnCall: 40,
  VoiceMailLeft: 70,
  Success: 100,
  NotSuccessful: 110,
  Completed: 130,
  Unreachable: 150,
  Blacklisted: 220,
  QueueAbandon: 300,
  Error: 500,
} as const;
export type ConversationStatusName = keyof typeof ConversationStatus;
export type ConversationStatusCode =
  (typeof ConversationStatus)[ConversationStatusName];

export const CallStatus = {
  InProgress: 3,
  Completed: 4,
  Busy: 5,
  Failed: 6,
  NoAnswer: 7,
  Canceled: 8,
} as const;
export type CallStatusName = keyof typeof CallStatus;
export type CallStatusCode = (typeof CallStatus)[CallStatusName];

export const TranscriptRole = {
  Pearl: 2,
  Client: 3,
} as const;
export type TranscriptRoleName = keyof typeof TranscriptRole;
export type TranscriptRoleCode = (typeof TranscriptRole)[TranscriptRoleName];

export const OverallSentiment = {
  Negative: 1,
  SlightlyNegative: 2,
  Neutral: 3,
  SlightlyPositive: 4,
  Positive: 5,
} as const;
export type OverallSentimentName = keyof typeof OverallSentiment;
export type OverallSentimentCode =
  (typeof OverallSentiment)[OverallSentimentName];

/* ------------------------------------------------------------------ *
 * Reverse lookups: numeric code -> name.                             *
 * Payloads arrive as codes, so these map them to readable names.      *
 * ------------------------------------------------------------------ */

export const ConversationStatusByCode = Object.fromEntries(
  Object.entries(ConversationStatus).map(([name, code]) => [code, name]),
) as Record<ConversationStatusCode, ConversationStatusName>;

export const CallStatusByCode = Object.fromEntries(
  Object.entries(CallStatus).map(([name, code]) => [code, name]),
) as Record<CallStatusCode, CallStatusName>;

export const TranscriptRoleByCode = Object.fromEntries(
  Object.entries(TranscriptRole).map(([name, code]) => [code, name]),
) as Record<TranscriptRoleCode, TranscriptRoleName>;

export const OverallSentimentByCode = Object.fromEntries(
  Object.entries(OverallSentiment).map(([name, code]) => [code, name]),
) as Record<OverallSentimentCode, OverallSentimentName>;

/* ------------------------------------------------------------------ *
 * Nested objects                                                     *
 * ------------------------------------------------------------------ */

/** A single message in the conversation `transcript` array. */
export interface TranscriptMessage {
  /** Speaker: 2 = Pearl, 3 = Client. Map via TranscriptRoleByCode. */
  role: TranscriptRoleCode;
  /** Text content of the message. */
  content: string;
  /** Timestamp in seconds when the message started. */
  startTime: number;
  /** Timestamp in seconds when the message ended. */
  endTime: number;
}

/** A single variable captured during the call (`collectedInfo` array). */
export interface CollectedInfo {
  /** ID of the variable as configured in your Pearl. */
  id: string;
  /** Display name of the variable. */
  name: string;
  /**
   * Value collected for this variable during the call.
   * Docs type this as `any`; `unknown` is used here to force narrowing.
   * Widen to `any` if you prefer not to narrow at call sites.
   */
  value: unknown;
}

/* ------------------------------------------------------------------ *
 * Call Webhook payload (V2)                                          *
 * ------------------------------------------------------------------ */

export interface CallWebhookPayload {
  /** Unique identifier of the call. */
  id: string;
  /** Unique identifier of the Pearl used during this call. */
  pearlId: string;
  /** ISO 8601 datetime when call processing started, e.g. "2024-06-01T10:15:00Z". */
  startTime: string;
  /** Conversation outcome as a numeric code. See {@link ConversationStatus} / {@link ConversationStatusByCode}. */
  conversationStatus: ConversationStatusCode;
  /** Overall technical status of the call as a numeric code. See {@link CallStatus} / {@link CallStatusByCode}. */
  status: CallStatusCode;
  /** Phone number the call was made from (E.164, e.g. "+18005550100"). */
  from: string;
  /** Phone number the call was made to (E.164, e.g. "+14155552671"). */
  to: string;
  /** Name associated with the call, if available. */
  name: string | null;
  /** Call duration in seconds. */
  duration: number;
  /** URL to the call recording, if recording is enabled. */
  recording: string | null;
  /** Full conversation transcript as an ordered list of messages. */
  transcript: TranscriptMessage[];
  /** Concise AI-generated summary of the conversation. */
  summary: string;
  /** Structured data points collected during the call. */
  collectedInfo: CollectedInfo[];
  /** Tags triggered during the conversation, per your Pearl configuration. */
  tags: string[];
  /** Whether the call was transferred to a human agent or external number. */
  isCallTransferred: boolean;
  /** Overall emotional tone from the client as a numeric code. See {@link OverallSentiment} / {@link OverallSentimentByCode}. */
  overallSentiment: OverallSentimentCode;
  /** Associated lead ID, or null if the call is not linked to a lead. */
  leadId: string | null;
}

/* ------------------------------------------------------------------ *
 * Optional: runtime type guard                                       *
 * ------------------------------------------------------------------ */

/** Minimal structural check that an unknown body is a Call Webhook payload. */
export function isCallWebhookPayload(
  body: unknown,
): body is CallWebhookPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.id === "string" &&
    typeof b.pearlId === "string" &&
    typeof b.startTime === "string" &&
    Array.isArray(b.transcript) &&
    Array.isArray(b.collectedInfo) &&
    Array.isArray(b.tags)
  );
}
