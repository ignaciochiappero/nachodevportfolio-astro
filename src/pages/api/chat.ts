import type { APIRoute } from "astro";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { CHAT_LIMITS, getSystemPrompt } from "../../lib/chat-config";

export const prerender = false;

const MODELS = [
  "google/gemini-2.0-flash-001",
  "openai/gpt-4o-mini",
  "anthropic/claude-3-haiku",
];

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;

function getOpenRouterApiKey() {
  const keyFromAstro = import.meta.env.OPENROUTER_API_KEY;
  const keyFromNode =
    typeof process !== "undefined" ? process.env.OPENROUTER_API_KEY : undefined;

  return keyFromAstro ?? keyFromNode ?? "";
}

function getClientIP(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnecting = request.headers.get("cf-connecting-ip");

  if (cfConnecting) return cfConnecting;
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  if (realIP) return realIP;

  return "unknown";
}

function checkRateLimit(clientId: string) {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);

  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });

    return { allowed: true, remaining: CHAT_LIMITS.maxMessagesPerSession - 1 };
  }

  if (record.count >= CHAT_LIMITS.maxMessagesPerSession) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;

  return {
    allowed: true,
    remaining: CHAT_LIMITS.maxMessagesPerSession - record.count,
  };
}

function normalizeMessages(messages: unknown) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is { role: string; content: string } => {
      return (
        !!message &&
        typeof message === "object" &&
        "role" in message &&
        "content" in message
      );
    })
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: typeof message.content === "string" ? message.content : "",
    }))
    .filter((message) => message.content.trim().length > 0);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = getOpenRouterApiKey();

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "Falta configurar OPENROUTER_API_KEY en el entorno del proyecto. Agregala en .env y reinicia el servidor de Astro.",
          code: "MISSING_OPENROUTER_API_KEY",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const openrouter = createOpenRouter({ apiKey });

    const body = await request.json();
    const messages = normalizeMessages(body?.messages);
    const userName =
      typeof body?.userName === "string" ? body.userName.trim() : "";
    const currentSection =
      typeof body?.currentSection === "string" ? body.currentSection : "inicio";
    const fingerprint =
      typeof body?.fingerprint === "string" ? body.fingerprint : "";

    if (!userName || userName.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid user name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      messages.length === 0 ||
      messages.length > CHAT_LIMITS.maxHistoryInStorage
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid messages payload" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (
      !lastMessage ||
      lastMessage.content.length > CHAT_LIMITS.maxInputLength
    ) {
      return new Response(JSON.stringify({ error: "Message too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clientId = fingerprint
      ? `${getClientIP(request)}:${fingerprint}`
      : getClientIP(request);
    const rateLimit = checkRateLimit(clientId);

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          error:
            "Llegaste al limite diario del chat. Si queres seguimos por WhatsApp o mail.",
          limitReached: true,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const stream = streamText({
      model: openrouter(MODELS[0], { models: MODELS }),
      system: getSystemPrompt(userName, currentSection),
      messages,
      temperature: 0.7,
      maxRetries: 2,
    });

    const response = stream.toTextStreamResponse();
    response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error:
          "Los modelos estan ocupados en este momento. Proba de nuevo en unos segundos o escribime por contacto directo.",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
