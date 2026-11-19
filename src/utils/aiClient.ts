import { AI_PROVIDERS } from "@/data/aiProviders";

export async function requestAICompletion({
  providerId,
  apiKey,
  model,
  prompt,
}: {
  providerId: string;
  apiKey: string;
  model: string;
  prompt: string;
}): Promise<string> {
  const provider = AI_PROVIDERS.find((p) => p.id === providerId) || AI_PROVIDERS[0];

  // 1. Google Gemini Native API
  if (provider.id === "gemini") {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2500,
          },
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "Google Gemini request failed.");
    }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No response returned from Gemini.");
    return text;
  }

  // 2. Groq Cloud (OpenAI Compatible)
  if (provider.id === "groq") {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "Groq Cloud request failed.");
    }
    return data?.choices?.[0]?.message?.content || "";
  }

  // 3. OpenRouter (OpenAI Compatible)
  if (provider.id === "openrouter") {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://smartcanvasgrow.com",
        "X-Title": "Smart Canvas Grow AI Roadmap",
      },
      body: JSON.stringify({
        model: model || "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "OpenRouter request failed.");
    }
    return data?.choices?.[0]?.message?.content || "";
  }

  // 4. Cerebras Cloud (OpenAI Compatible)
  if (provider.id === "cerebras") {
    const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "llama3.3-70b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "Cerebras request failed.");
    }
    return data?.choices?.[0]?.message?.content || "";
  }

  // 5. Together AI (OpenAI Compatible)
  if (provider.id === "together") {
    const res = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "Together AI request failed.");
    }
    return data?.choices?.[0]?.message?.content || "";
  }

  // 6. DeepSeek Official Platform
  if (provider.id === "deepseek") {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "DeepSeek request failed.");
    }
    return data?.choices?.[0]?.message?.content || "";
  }

  // 7. OpenAI Official (GPT-4o, o3-mini)
  if (provider.id === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "OpenAI request failed.");
    }
    return data?.choices?.[0]?.message?.content || "";
  }

  // 8. Anthropic Claude Official (Claude 3.5 Haiku, 3.7 Sonnet)
  if (provider.id === "claude") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "dangerously-allow-browser": "true",
      },
      body: JSON.stringify({
        model: model || "claude-3-5-haiku-20241022",
        max_tokens: 2500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "Anthropic Claude request failed.");
    }
    return data?.content?.[0]?.text || "";
  }

  throw new Error(`Unsupported AI Provider: ${providerId}`);
}
