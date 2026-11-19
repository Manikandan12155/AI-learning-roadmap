export interface AIProviderConfig {
  id: string;
  name: string;
  logoText: string;
  keyStorageKey: string;
  getKeyUrl: string;
  tag: string;
  defaultModel: string;
  models: { id: string; name: string; tag: string }[];
}

export const AI_PROVIDERS: AIProviderConfig[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    logoText: "Gemini",
    keyStorageKey: "gemini_user_api_key",
    getKeyUrl: "https://aistudio.google.com/app/apikey",
    tag: "Huge Context & Reasoning",
    defaultModel: "gemini-3.1-pro-preview",
    models: [
      { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro (Preview)", tag: "Recommended" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", tag: "Fast" },
      { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", tag: "Ultra Fast" },
    ],
  },
  {
    id: "groq",
    name: "Groq Cloud",
    logoText: "Groq",
    keyStorageKey: "groq_user_api_key",
    getKeyUrl: "https://console.groq.com/keys",
    tag: "Ultra Fast (500+ tok/s)",
    defaultModel: "llama-3.3-70b-versatile",
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", tag: "Flagship" },
      { id: "deepseek-r1-distill-llama-70b", name: "DeepSeek R1 (70B Distill)", tag: "Reasoning" },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", tag: "Fast" },
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B", tag: "Instant" },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    logoText: "OpenRouter",
    keyStorageKey: "openrouter_user_api_key",
    getKeyUrl: "https://openrouter.ai/keys",
    tag: "All-in-One Multi-Model",
    defaultModel: "deepseek/deepseek-r1:free",
    models: [
      { id: "deepseek/deepseek-r1:free", name: "DeepSeek R1 (Free)", tag: "Free SOTA" },
      { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B (Free)", tag: "Free" },
      { id: "google/gemini-2.0-flash-exp:free", name: "Gemini 2.0 Flash (Free)", tag: "Free" },
      { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B (Free)", tag: "Free" },
    ],
  },
  {
    id: "cerebras",
    name: "Cerebras",
    logoText: "Cerebras",
    keyStorageKey: "cerebras_user_api_key",
    getKeyUrl: "https://cloud.cerebras.ai",
    tag: "World's Fastest (1500+ tok/s)",
    defaultModel: "llama3.3-70b",
    models: [
      { id: "llama3.3-70b", name: "Llama 3.3 70B", tag: "Ultra Speed" },
      { id: "llama3.1-8b", name: "Llama 3.1 8B", tag: "Instant" },
    ],
  },
  {
    id: "together",
    name: "Together AI",
    logoText: "Together",
    keyStorageKey: "together_user_api_key",
    getKeyUrl: "https://api.together.xyz/settings/api-keys",
    tag: "Free Credits & Open Source",
    defaultModel: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    models: [
      { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo", name: "Llama 3.3 70B Turbo", tag: "Fast" },
      { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1", tag: "Reasoning" },
      { id: "Qwen/Qwen2.5-Coder-32B-Instruct", name: "Qwen 2.5 Coder 32B", tag: "Code Master" },
    ],
  },
];

