import Anthropic from "@anthropic-ai/sdk";

// Resolves ANTHROPIC_API_KEY from the environment. Server-side only —
// never import this into a client component.
export const anthropicClient = new Anthropic();
