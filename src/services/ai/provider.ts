import OpenAI from "openai";
import { serverConfig } from "@/config/env";

/**
 * AI provider abstraction layer.
 *
 * Uses OpenAI-compatible API so you can swap providers by changing env vars:
 * - OpenAI:   OPENAI_BASE_URL=https://api.openai.com/v1
 * - Groq:     OPENAI_BASE_URL=https://api.groq.com/openai/v1
 * - Together: OPENAI_BASE_URL=https://api.together.xyz/v1
 * - Ollama:   OPENAI_BASE_URL=http://localhost:11434/v1
 *
 * TODO: Add provider-specific streaming adapters if needed.
 */
export function getAIClient(): OpenAI {
  return new OpenAI({
    apiKey: serverConfig.ai.apiKey || "placeholder",
    baseURL: serverConfig.ai.baseUrl,
  });
}

export const AI_MODEL = serverConfig.ai.model;
