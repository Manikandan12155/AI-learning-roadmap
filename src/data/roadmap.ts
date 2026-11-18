export type Topic = { name: string; isNew?: boolean };
export type Section = { name: string; topics: Topic[] };
export type Level = {
  level: string;
  short: string;
  tagline: string;
  icon:
    | "rocket"
    | "code"
    | "database"
    | "sigma"
    | "brain"
    | "network"
    | "languages"
    | "sparkles"
    | "bot"
    | "layers"
    | "cloud"
    | "telescope"
    | "trophy"
    | "flag"
    | "book";
  sections: Section[];
};

const N = true;

const t = (name: string, isNew?: boolean): Topic => ({ name, isNew });

export const ROADMAP: Level[] = [
  {
    level: "Level 0 — Foundation",
    short: "Foundation",
    tagline: "Computer, OS, networking & programming logic — the launchpad.",
    icon: "rocket",
    sections: [
      {
        name: "Computer & OS systems",
        topics: [
          t("How computers work (CPU, RAM, Storage)"),
          t("OS basics & Process management"),
          t("Linux & Terminal CLI essentials", N),
          t("File systems & Permissions"),
          t("Environment variables & PATH", N),
        ],
      },
      {
        name: "Networking & Internet basics",
        topics: [
          t("How the Internet works", N),
          t("DNS, IP & Ports", N),
          t("HTTP / HTTPS & Status codes", N),
          t("Client-Server architecture", N),
        ],
      },
      {
        name: "Developer tools & Git",
        topics: [
          t("VS Code setup & Extensions"),
          t("WSL 2 & Terminal setup (Bash/Zsh)", N),
          t("SSH keys & GitHub authentication", N),
          t("Git basics (Commit, Branch, Merge)"),
          t("GitHub & Pull requests"),
          t("Package managers overview"),
        ],
      },
      {
        name: "Programming logic & DSA intuition",
        topics: [
          t("Variables & Primitive data types"),
          t("Conditions & Boolean logic"),
          t("Loops & Iteration"),
          t("Functions & Scope"),
          t("Data structures (Arrays, HashMaps/Dicts)", N),
          t("Algorithm intuition & Big-O basics", N),
        ],
      },
    ],
  },
  {
    level: "Level 1 — Python complete",
    short: "Python",
    tagline: "Master Python end-to-end for AI engineering.",
    icon: "code",
    sections: [
      {
        name: "Python basics",
        topics: ["Syntax", "Data types", "Loops", "Functions", "Modules", "Exception handling"].map(
          (x) => t(x),
        ),
      },
      {
        name: "Advanced Python",
        topics: [
          t("OOP"),
          t("Decorators"),
          t("Generators"),
          t("Iterators"),
          t("Context managers"),
          t("Multithreading"),
          t("Multiprocessing", N),
          t("Asyncio"),
          t("GIL & Concurrency models", N),
          t("Memory management & GC", N),
          t("Performance profiling (cProfile)", N),
        ],
      },
      {
        name: "Python for backend & DB",
        topics: [
          t("APIs & REST concepts"),
          t("JSON"),
          t("Requests & HTTPX", N),
          t("File handling"),
          t("Virtual env & uv", N),
          t("Pip & Poetry", N),
          t("Logging"),
          t("Type hints & Mypy", N),
          t("Pydantic", N),
          t("SQLAlchemy (ORM)", N),
          t("PostgreSQL basics", N),
          t("Database migrations (Alembic)", N),
          t("Redis basics", N),
        ],
      },
      {
        name: "Code quality & Architecture",
        topics: [
          t("Testing (pytest)", N),
          t("Linters & Formatters (Ruff, Black)", N),
          t("SOLID principles", N),
          t("Design patterns", N),
          t("Clean architecture", N),
        ],
      },
      {
        name: "Python projects",
        topics: [
          t("Calculator"),
          t("API caller"),
          t("File processor"),
          t("Chat CLI (Typer / Rich)", N),
          t("Production CRUD with SQLAlchemy & Alembic", N),
        ],
      },
    ],
  },
  {
    level: "Level 2 — Data handling & Analysis",
    short: "Data",
    tagline: "Wrangle, clean, shape and visualise data for AI pipelines.",
    icon: "database",
    sections: [
      {
        name: "NumPy for Numerical Computing",
        topics: [
          t("Arrays & Indexing / Slicing"),
          t("Vectorization vs Loops", N),
          t("Broadcasting & Matrix operations"),
          t("Linear algebra ops (Dot product, Inverses)", N),
          t("Random sampling & Distributions", N),
        ],
      },
      {
        name: "Pandas & Polars (Data Wrangling)",
        topics: [
          t("Series & DataFrames"),
          t("Data ingestion (CSV, JSONL, Parquet)", N),
          t("Data cleaning & Missing value imputation"),
          t("Filtering, Grouping & Aggregations"),
          t("Merging, Joining & Reshaping (Pivot/Melt)", N),
          t("Polars basics for high-performance data", N),
        ],
      },
      {
        name: "Data Visualization & EDA",
        topics: [
          t("Matplotlib (Subplots & Customization)"),
          t("Seaborn for statistical distributions", N),
          t("Plotly for interactive charts", N),
          t("Exploratory Data Analysis (EDA) workflow", N),
          t("Outlier detection & Correlation heatmaps", N),
        ],
      },
      {
        name: "Data Preprocessing & Formats",
        topics: [
          t("Feature scaling (Standardization / Normalization)", N),
          t("Categorical encoding (One-Hot, Target)", N),
          t("Working with Hugging Face Datasets", N),
          t("Data validation (Pandera)", N),
        ],
      },
      {
        name: "Data projects",
        topics: [
          t("Automated EDA report generator", N),
          t("Real-world dataset cleaning pipeline", N),
          t("LLM dataset cleaning & formatting (JSONL/Parquet)", N),
        ],
      },
    ],
  },
  {
    level: "Level 3 — Maths for AI & Deep Learning",
    short: "Maths",
    tagline: "Mathematical intuition & foundations behind AI algorithms.",
    icon: "sigma",
    sections: [
      {
        name: "Linear Algebra (Tensors & Embeddings)",
        topics: [
          t("Vectors, Matrices & Tensors"),
          t("Dot products, Matrix multiplication & Transpose"),
          t("Vector spaces & Norms (L1, L2 norm)", N),
          t("Cosine similarity & Distance metrics", N),
          t("Eigenvalues, Eigenvectors & SVD", N),
          t("Dimensionality reduction intuition (PCA)", N),
        ],
      },
      {
        name: "Calculus & Optimization (Training Engine)",
        topics: [
          t("Derivatives & Partial derivatives"),
          t("The Chain Rule (Backpropagation intuition)", N),
          t("Gradients & Vector calculus", N),
          t("Gradient descent (Batch, Mini-batch, SGD)"),
          t("Learning rates & Optimizers intuition", N),
          t("Loss functions (MSE, MAE, Huber)", N),
        ],
      },
      {
        name: "Probability & Information Theory (LLM Math)",
        topics: [
          t("Conditional probability & Bayes theorem"),
          t("Probability distributions (Gaussian, Binomial, Uniform)", N),
          t("Information theory (Entropy, Cross-Entropy Loss)", N),
          t("KL Divergence & Perplexity basics", N),
          t("Maximum Likelihood Estimation (MLE)", N),
        ],
      },
      {
        name: "Statistics & Hypothesis Testing",
        topics: [
          t("Descriptive stats (Mean, Median, Variance, Std dev)"),
          t("Correlation vs Causation (Pearson, Spearman)", N),
          t("Hypothesis testing (p-value, Null hypothesis)", N),
          t("A/B testing for AI models & Confidence intervals", N),
        ],
      },
      {
        name: "Applied Math in Python",
        topics: [
          t("Implementing Gradient Descent from scratch in NumPy", N),
          t("Computing Cosine Similarity & Vector Search in NumPy", N),
          t("Implementing Cross-Entropy & Softmax from scratch", N),
        ],
      },
    ],
  },
  {
    level: "Level 4 — Machine learning",
    short: "ML",
    tagline: "Classical ML from regression to gradient boosting & production pipelines.",
    icon: "brain",
    sections: [
      {
        name: "ML Fundamentals & Principles",
        topics: [
          t("AI vs ML vs DL & Problem framing"),
          t("Features, Targets & Train-Val-Test splits"),
          t("Bias-Variance tradeoff", N),
          t("Overfitting vs Underfitting"),
          t("Regularization (L1 Lasso, L2 Ridge, ElasticNet)", N),
        ],
      },
      {
        name: "Supervised Learning Algorithms",
        topics: [
          t("Linear & Polynomial regression"),
          t("Logistic regression & Classification"),
          t("k-Nearest Neighbors (k-NN)", N),
          t("Support Vector Machines (SVM)", N),
          t("Decision trees & Random forest"),
          t("Ensemble methods (Bagging vs Boosting)", N),
        ],
      },
      {
        name: "Advanced Boosting & Tabular SOTA",
        topics: [
          t("Gradient Boosting intuition", N),
          t("XGBoost", N),
          t("LightGBM", N),
          t("CatBoost", N),
          t("Feature engineering & Selection", N),
          t("Hyperparameter tuning (Optuna, GridSearchCV)", N),
        ],
      },
      {
        name: "Unsupervised & Dimensionality Reduction",
        topics: [
          t("Clustering (K-Means, DBSCAN)", N),
          t("Dimensionality reduction (PCA, t-SNE)", N),
          t("Anomaly detection (Isolation Forest)", N),
        ],
      },
      {
        name: "Evaluation, XAI & Pipelines",
        topics: [
          t("Precision, Recall, F1 score & Confusion matrix"),
          t("ROC-AUC & Precision-Recall curves", N),
          t("Cross-validation (Stratified K-Fold)", N),
          t("Scikit-learn Pipelines & ColumnTransformer", N),
          t("Experiment tracking with MLflow", N),
          t("Model Explainability (SHAP & LIME)", N),
          t("Data Drift & Model monitoring basics", N),
          t("Model serialization (Joblib, ONNX basics)", N),
        ],
      },
      {
        name: "ML Projects",
        topics: [
          t("End-to-End Scikit-learn Pipeline project", N),
          t("House price prediction with XGBoost", N),
          t("Credit card fraud / Anomaly detection", N),
          t("Recommendation system", N),
        ],
      },
    ],
  },
  {
    level: "Level 5 — Deep learning & Modern Transformers",
    short: "Deep Learning",
    tagline: "Neural networks, PyTorch mastery, CNNs & modern Transformer architectures.",
    icon: "network",
    sections: [
      {
        name: "Neural Network Fundamentals",
        topics: [
          t("Perceptrons, Dense layers, Weights & Biases"),
          t("Activation functions (ReLU, GELU, SwiGLU, Softmax)", N),
          t("Forward pass, Loss computation & Backpropagation"),
          t("Regularization (BatchNorm, LayerNorm, Dropout)", N),
          t("Optimizers (Adam, AdamW, Learning rate scheduling)", N),
        ],
      },
      {
        name: "PyTorch Mastery (Industry Standard)",
        topics: [
          t("PyTorch Tensors, Autograd & GPU/CUDA acceleration", N),
          t("Building custom models with nn.Module", N),
          t("Dataset, DataLoader & Custom data pipelines", N),
          t("Writing custom training loops & Checkpointing", N),
          t("Hugging Face Accelerate & Mixed precision (FP16/BF16)", N),
        ],
      },
      {
        name: "Vision & Sequence Models",
        topics: [
          t("CNN architectures & Transfer learning (ResNet)", N),
          t("Vision Transformers (ViT) basics", N),
          t("Sequence models (RNN, LSTM, GRU limitations)"),
        ],
      },
      {
        name: "Modern Transformer Architecture (LLM Core)",
        topics: [
          t("Self-Attention & Multi-Head Attention (MHA)"),
          t("GQA (Grouped-Query) & MQA Attention", N),
          t("FlashAttention intuition & KV Caching", N),
          t("Positional embeddings (Sinusoidal, RoPE)", N),
          t("Encoder (BERT) vs Decoder (GPT/Llama)", N),
          t("Mixture of Experts (MoE) basics", N),
          t("Hugging Face Transformers library", N),
        ],
      },
      {
        name: "Deep Learning Projects",
        topics: [
          t("Custom PyTorch Neural Net from scratch", N),
          t("Vision Classifier with Transfer Learning (ResNet / ViT)", N),
          t("Mini-GPT / Decoder Transformer from scratch in PyTorch", N),
        ],
      },
    ],
  },
  {
    level: "Level 6 — Natural Language Processing (NLP)",
    short: "NLP",
    tagline: "From text representations & modern tokenizers to semantic embeddings.",
    icon: "languages",
    sections: [
      {
        name: "Text Preprocessing & Extraction",
        topics: [
          t("Text normalization & Regex cleaning", N),
          t("Stemming vs Lemmatization (spaCy / NLTK)"),
          t("Part-of-Speech (POS) & Dependency Parsing", N),
          t("Named Entity Recognition (NER with spaCy)", N),
        ],
      },
      {
        name: "Classical NLP & Sparse Vectors",
        topics: [
          t("Bag of Words & N-grams", N),
          t("TF-IDF representation", N),
          t("BM25 algorithm (Foundation for Hybrid Search)", N),
          t("Text classification & Sentiment analysis"),
        ],
      },
      {
        name: "Modern Subword Tokenizers (LLM Core)",
        topics: [
          t("Why subwords? (OOV problem)", N),
          t("Byte-Pair Encoding (BPE)", N),
          t("WordPiece & SentencePiece", N),
          t("Tiktoken & Hugging Face Tokenizers", N),
          t("Special tokens, Padding & Attention masks", N),
        ],
      },
      {
        name: "Embeddings & Semantic Search",
        topics: [
          t("Word2Vec & GloVe limitations"),
          t("Sentence-Transformers (SBERT) & Dense vectors"),
          t("Bi-Encoders vs Cross-Encoders (Re-ranking intuition)", N),
          t("NLP Evaluation metrics (BLEU, ROUGE, Perplexity)", N),
        ],
      },
      {
        name: "NLP Projects",
        topics: [
          t("Resume / Document Information Extractor (NER + Regex)", N),
          t("Semantic Search Engine with BM25 + SBERT", N),
          t("Fine-tuning BERT for Text Classification", N),
        ],
      },
    ],
  },
  {
    level: "Level 7 — Generative AI & Advanced RAG",
    short: "GenAI",
    tagline: "LLMs, reasoning models, advanced RAG 2.0 architectures & fine-tuning.",
    icon: "sparkles",
    sections: [
      {
        name: "LLM & Reasoning Fundamentals",
        topics: [
          t("Tokens, Context window & Attention limits"),
          t("Sampling params (Temperature, Top-P, Penalties)"),
          t("Hallucination mitigation & Groundedness"),
          t("Reasoning models & Test-time compute (DeepSeek-R1, o1)", N),
          t("Open-weight LLMs (Llama 3, Mistral, Qwen)", N),
        ],
      },
      {
        name: "Prompt & Context Engineering",
        topics: [
          t("Zero-shot, Few-shot & Chain-of-Thought (CoT)"),
          t("System prompt design & Persona steering"),
          t("Structured output & JSON schemas (Pydantic + Instructor)", N),
          t("Context window optimization & Lost-in-the-middle", N),
        ],
      },
      {
        name: "Modern LLM APIs & Multi-Provider",
        topics: [
          t("OpenAI API, Anthropic Claude & Google Gemini", N),
          t("Multi-provider unified gateways (LiteLLM)", N),
          t("Function calling & Tool schemas"),
          t("Streaming responses (SSE / WebSockets)"),
          t("Semantic caching for cost reduction (Redis / GPTCache)", N),
        ],
      },
      {
        name: "Vector Databases & Embeddings",
        topics: [
          t("Dense vs Sparse vs ColBERT late-interaction", N),
          t("Vector search algorithms (HNSW, IVF-PQ)", N),
          t("Vector databases (Qdrant, Pinecone, ChromaDB, pgvector)", N),
          t("Metadata filtering & Hybrid indexing"),
        ],
      },
      {
        name: "Advanced RAG 2.0 Architectures",
        topics: [
          t("Advanced chunking (Semantic, Parent-child, Recursive)"),
          t("Hybrid search (BM25 + Dense vector fusion / RRF)", N),
          t("Re-ranking with Cross-Encoders (Cohere, BGE)", N),
          t("Corrective RAG (CRAG) & Self-RAG", N),
          t("GraphRAG & Knowledge Graphs basics", N),
          t("RAG Evaluation with Ragas & TruLens", N),
        ],
      },
      {
        name: "Fine-Tuning & Model Alignment",
        topics: [
          t("When to fine-tune vs RAG vs Prompting"),
          t("PEFT, LoRA & QLoRA quantization"),
          t("Alignment techniques (RLHF, DPO)", N),
          t("High-speed fine-tuning with Unsloth", N),
          t("Dataset prep, Formatting & Loss curves", N),
        ],
      },
      {
        name: "Local LLMs & Edge Inference",
        topics: [
          t("Local inference with Ollama & LM Studio"),
          t("Quantization formats (GGUF, AWQ, GPTQ)", N),
          t("Private offline enterprise LLM deployments", N),
        ],
      },
      {
        name: "GenAI Projects",
        topics: [
          t("Enterprise Document Search Engine with Hybrid RAG & Re-ranking", N),
          t("Financial Report Analyzer with Structured JSON Extraction", N),
          t("Custom Domain Fine-tuned Small LLM with Unsloth / LoRA", N),
        ],
      },
    ],
  },
  {
    level: "Level 8 — Autonomous AI Agents & Multi-Agent Systems",
    short: "Agents",
    tagline: "Build reasoning, tool-using, persistent & multi-agent systems.",
    icon: "bot",
    sections: [
      {
        name: "Agent Core & Cognitive Architecture",
        topics: [
          t("ReAct pattern (Reasoning + Acting loop)", N),
          t("Plan-and-Solve & Reflection patterns"),
          t("Tool calling & Dynamic parameter binding"),
          t("Loop detection, Error handling & Self-correction", N),
          t("Agent evaluation (Task success rate, Tool precision)", N),
        ],
      },
      {
        name: "Agent Memory & Persistence",
        topics: [
          t("Short-term working memory vs Long-term memory"),
          t("Entity memory & Semantic episodic memory (Mem0)", N),
          t("Context pruning, Summarization & Compression", N),
          t("State checkpoints & DB persistence", N),
        ],
      },
      {
        name: "Tools, Sandboxes & Browser Automation",
        topics: [
          t("Model Context Protocol (MCP) Client & Server standard", N),
          t("Code execution sandboxes (E2B / Docker)", N),
          t("Web browsing agents (Playwright, Browser-Use)", N),
          t("API integration tools & OpenAPI spec loaders", N),
        ],
      },
      {
        name: "Stateful Workflows with LangGraph",
        topics: [
          t("StateGraph, Nodes & Conditional edges", N),
          t("Human-in-the-loop approval gates (Breakpoints)", N),
          t("State persistence & Postgres checkpointers", N),
          t("Hierarchical agent supervision graphs", N),
        ],
      },
      {
        name: "Multi-Agent Frameworks & Swarms",
        topics: [
          t("Role-based multi-agent collaboration (CrewAI)", N),
          t("Conversational agent swarms (AutoGen / Swarm)", N),
          t("Agent-to-agent communication protocols"),
          t("Task delegation, Voting & Consensus mechanisms", N),
        ],
      },
      {
        name: "Autonomous Agent Projects",
        topics: [
          t("Autonomous Web Research Agent (Browser-Use + Search)", N),
          t("Self-Healing Coding Agent with E2B Sandbox", N),
          t("Enterprise Multi-Agent Workflow with LangGraph & HITL", N),
        ],
      },
    ],
  },
  {
    level: "Level 9 — Full-Stack AI Application Engineering",
    short: "AI Apps",
    tagline: "Ship production-grade, secure, real-time AI SaaS applications.",
    icon: "layers",
    sections: [
      {
        name: "High-Performance AI Backend",
        topics: [
          t("FastAPI async endpoints & Dependency Injection"),
          t("Server-Sent Events (SSE) & WebSocket streaming"),
          t("Background task queues (Celery / Redis)", N),
          t("Database integration (PostgreSQL + SQLAlchemy)", N),
          t("User authentication & Sessions (Clerk / Supabase)", N),
        ],
      },
      {
        name: "Modern AI Frontend & Generative UI",
        topics: [
          t("React / Next.js with TypeScript & Tailwind"),
          t("Vercel AI SDK (useChat, useCompletion)", N),
          t("Generative UI & Rich interactive widgets (shadcn/ui)", N),
          t("Markdown, Syntax highlighting & LaTeX rendering", N),
          t("Voice & Audio UI integration", N),
        ],
      },
      {
        name: "Security, Guardrails & Privacy",
        topics: [
          t("Prompt injection & Jailbreak defense (Llama Guard)", N),
          t("PII redaction & Sensitive data sanitization", N),
          t("Redis rate limiting (Token bucket algorithm)", N),
          t("API key encryption & Secure secret management", N),
          t("OWASP Top 10 for LLM applications", N),
        ],
      },
      {
        name: "Monetization, Analytics & Cost Control",
        topics: [
          t("Token metering & User quota tracking", N),
          t("Usage-based billing integration (Stripe)", N),
          t("Latency & Time-to-First-Token (TTFT) tuning", N),
          t("User feedback loops (Thumbs up/down logging)", N),
        ],
      },
      {
        name: "Full-Stack AI Projects",
        topics: [
          t("Full-Stack AI SaaS with Next.js, FastAPI & Stripe", N),
          t("Real-Time Voice Assistant with WebSockets", N),
          t("Enterprise Knowledge Chat with Generative UI", N),
        ],
      },
    ],
  },
  {
    level: "Level 10 — AI Infrastructure & GPU Deployment (LLMOps)",
    short: "Deploy",
    tagline: "Containers, serverless GPUs, high-throughput serving engines & CI/CD.",
    icon: "cloud",
    sections: [
      {
        name: "Docker & NVIDIA GPU Containers",
        topics: [
          t("Docker fundamentals & Multi-stage builds"),
          t("Docker Compose for Multi-service AI apps (App + DB + VectorDB)"),
          t("NVIDIA Container Toolkit & CUDA pass-through", N),
          t("Minimizing container size & Fast layer caching", N),
        ],
      },
      {
        name: "High-Throughput LLM Serving Engines",
        topics: [
          t("vLLM & PagedAttention architecture", N),
          t("Continuous batching & Chunked prefill", N),
          t("TensorRT-LLM & ONNX Runtime optimization", N),
          t("Hosting OpenAI-compatible API servers", N),
          t("Quantization serving (AWQ, GPTQ, FP8)", N),
        ],
      },
      {
        name: "Serverless GPUs & Cloud Platforms",
        topics: [
          t("Serverless GPU platforms (Modal, RunPod, Replicate)", N),
          t("Scale-to-zero architecture (GPU cost savings)", N),
          t("Cloud GPU VMs (AWS EC2, Lambda Labs)", N),
          t("Frontend hosting & Edge routing (Vercel, Cloudflare)", N),
        ],
      },
      {
        name: "Distributed AI & Orchestration",
        topics: [
          t("Kubernetes (K8s) basics for AI workloads", N),
          t("Distributed serving with Ray & Ray Serve", N),
          t("Model caching & HF Hub download optimization", N),
          t("GPU health monitoring & Auto-scaling policies", N),
        ],
      },
      {
        name: "CI/CD & LLMOps Automation",
        topics: [
          t("GitHub Actions CI/CD pipelines for AI services"),
          t("Automated model testing & container build", N),
          t("Blue-Green & Canary deployment for models", N),
        ],
      },
      {
        name: "Infra & Deployment Projects",
        topics: [
          t("Deploying an Open-Source LLM with vLLM on RunPod", N),
          t("Serverless AI Microservice with Modal (Scale-to-Zero)", N),
          t("Automated CI/CD Pipeline deploying Containerized RAG API", N),
        ],
      },
    ],
  },
  {
    level: "Level 11 — Multimodal AI, Observability & System Design",
    short: "Advanced",
    tagline: "Vision-Language models, real-time voice agents, LLM observability & enterprise system design.",
    icon: "telescope",
    sections: [
      {
        name: "Multimodal AI & Vision-Language Models (VLMs)",
        topics: [
          t("Vision-Language architecture (CLIP, LLaVA, Qwen2-VL)", N),
          t("Image patch embeddings & Multimodal tokens", N),
          t("Document Visual QA & Complex PDF extraction", N),
          t("Object detection & Vision pipelines (YOLO / OpenCV)"),
          t("Diffusion model fundamentals (Flux / SD basics)", N),
        ],
      },
      {
        name: "Real-Time Voice AI & Speech Pipelines",
        topics: [
          t("OpenAI Realtime API & Gemini Live WebSockets", N),
          t("Speech-to-Text (Whisper, Groq low-latency STT)", N),
          t("Voice Activity Detection (Silero VAD) & Turn-taking", N),
          t("Text-to-Speech (ElevenLabs, Kokoro TTS)", N),
          t("WebRTC audio streaming with LiveKit", N),
        ],
      },
      {
        name: "LLM Observability, Tracing & Evals",
        topics: [
          t("OpenTelemetry standard for AI (OpenInference)", N),
          t("Tracing & Session tracking (LangSmith, Phoenix)", N),
          t("LLM-as-a-Judge automated evaluation pipelines", N),
          t("Latency profiling & Token cost attribution", N),
          t("Production feedback loops & Drift detection", N),
        ],
      },
      {
        name: "AI System Design (Enterprise Architecture)",
        topics: [
          t("Architecting systems for 10M+ tokens/day", N),
          t("Model routing & Cascades (Small model -> Big model)", N),
          t("Multi-provider fallback & Regional failover", N),
          t("Enterprise Data Governance & Compliance (SOC2/GDPR)", N),
          t("AI Architecture Case Studies (Perplexity, Cursor)", N),
        ],
      },
      {
        name: "Advanced Capstone Projects",
        topics: [
          t("Ultra-Low-Latency Real-Time Voice Agent with LiveKit", N),
          t("Multimodal Document Intelligence Pipeline (VLM)", N),
          t("Production LLM Observability & Evaluation Platform", N),
        ],
      },
    ],
  },
  {
    level: "Level 12 — Expert Level & AI Leadership",
    short: "Expert",
    tagline: "Build venture-grade AI products, contribute to OSS & establish thought leadership.",
    icon: "trophy",
    sections: [
      {
        name: "Venture-Grade AI Product Engineering",
        topics: [
          t("AI Product Strategy & Defensible Moats", N),
          t("Synthetic Data Generation pipelines (Cosmopedia style)", N),
          t("Domain Adaptation & Continual Pretraining basics", N),
          t("AI Pricing Models (Seat-based vs Token Consumption)", N),
          t("Enterprise AI Security Compliance (SOC2, HIPAA)", N),
        ],
      },
      {
        name: "Open Source AI Engineering",
        topics: [
          t("Contributing to Hugging Face (Datasets, Models, Hub)", N),
          t("Contributing to LangGraph / vLLM / Ollama", N),
          t("Publishing custom MCP Servers & Open-Source Tools", N),
          t("Model Card creation & Responsible AI disclosure", N),
        ],
      },
      {
        name: "Personal Brand & Technical Influence",
        topics: [
          t("High-Impact GitHub Portfolio & Readme engineering"),
          t("Writing deep-dive technical benchmarks & Teardowns", N),
          t("Publishing AI research breakdowns on X & LinkedIn"),
          t("Building public demo spaces on Hugging Face Spaces", N),
        ],
      },
    ],
  },
  {
    level: "Final Projects — Production Capstones",
    short: "Capstones",
    tagline: "Ten industry-standard, portfolio-grade capstones proving senior capability.",
    icon: "flag",
    sections: [
      {
        name: "Production Capstones",
        topics: [
          t("Enterprise Multi-Tenant Support Agent with LangGraph & HITL", N),
          t("Perplexity-Style Search Engine with Citations & Hybrid RAG", N),
          t("Autonomous Web Research Agent using Browser-Use & Playwright", N),
          t("Multimodal Financial Document Intelligence (VLM + Table Extraction)", N),
          t("Ultra-Low-Latency Realtime Voice Assistant with LiveKit & WebRTC", N),
          t("Repo-Level Coding Assistant & Automated PR Reviewer with E2B", N),
          t("Enterprise MCP Server ecosystem with Slack, GitHub & DB tools", N),
          t("Fine-Tuned Domain Specialist SLM deployed on vLLM / RunPod", N),
          t("AI Observability & Automated Evaluation Dashboard (Phoenix / OTel)", N),
          t("No-Code Multi-Agent Workflow Automation Platform (Zapier for AI)", N),
        ],
      },
    ],
  },
  {
    level: "Level 14 — Technical Abbreviations & Complete AI Encyclopedia",
    short: "Technical Abbreviations",
    tagline: "The definitive 2026 global industry reference: 250 essential abbreviations across 14 specialized domains.",
    icon: "book",
    sections: [
      {
        name: "1. 2026 Frontier GenAI & Reasoning Architectures",
        topics: [
          t("LLM — Large Language Model (Massive transformer text models like GPT-4o, Claude 3.5, Gemini 1.5)", N),
          t("SLM — Small Language Model (Sub-8B efficient models like Phi-3.5, Gemma 2, Llama 3.2, Qwen 2.5)", N),
          t("VLM — Vision Language Model (Native multimodal models processing images, video and text)", N),
          t("LMM — Large Multimodal Model (Omni models handling audio, video, vision & text natively)", N),
          t("MoE — Mixture of Experts (Sparse gating routing tokens to specialized feedforward sub-networks)", N),
          t("MLA — Multi-Head Latent Attention (DeepSeek low-rank KV compression for extreme inference memory saving)", N),
          t("MTP — Multi-Token Prediction (Training objective predicting multiple future tokens simultaneously)", N),
          t("SSM — State Space Model (Sub-quadratic linear-time sequence modeling alternative to attention)", N),
          t("Mamba — Selective State Space Architecture with input-dependent selection mechanism", N),
          t("Jamba — Hybrid Architecture interleaving Transformer Attention, Mamba SSM, and MoE blocks", N),
          t("RWKV — Receptance Weighted Key Value (RNN-transformer hybrid with linear attention)", N),
          t("TTT — Test-Time Training (Dynamic weight updates during inference context parsing)", N),
          t("RoPE — Rotary Position Embedding (Relative positional encoding with rotational complex matrices)", N),
          t("ALiBi — Attention with Linear Biases (Extrapolates attention linearly beyond training sequence length)", N),
          t("MHA — Multi-Head Attention (Standard transformer attention with separate Q, K, V heads)", N),
          t("MQA — Multi-Query Attention (Shares a single Key and Value head across all Query heads)", N),
          t("GQA — Grouped-Query Attention (Balanced architecture grouping Query heads into shared KV heads)", N),
          t("SWA — Sliding Window Attention (Local attention window bounded to fixed surrounding tokens)", N),
          t("KV Cache — Key-Value Cache (Stores past attention matrices in GPU VRAM to avoid redundant decoding)", N),
          t("AGI — Artificial General Intelligence (Autonomous machine intelligence matching/surpassing humans)", N),
          t("ASI — Artificial Superintelligence (Hypothetical AI surpassing collective human intelligence)", N),
        ],
      },
      {
        name: "2. Reasoning, Post-Training Alignment & RL",
        topics: [
          t("GRPO — Group Relative Policy Optimization (DeepSeek R1 critic-free group-normalized RL reasoning)", N),
          t("RLHF — Reinforcement Learning from Human Feedback (PPO reward model aligned on human preferences)", N),
          t("RLAIF — Reinforcement Learning from AI Feedback (Constitutional AI using frontier LLM judges)", N),
          t("DPO — Direct Preference Optimization (Closed-form implicit reward optimization without critic)", N),
          t("PPO — Proximal Policy Optimization (Clipped surrogate objective RL algorithm for actor-critic)", N),
          t("KTO — Kahneman-Tversky Optimization (Prospect theory binary human preference alignment)", N),
          t("ORPO — Odds Ratio Preference Optimization (Penalizes dispreferred odds directly in cross-entropy loss)", N),
          t("IPO — Identity Preference Optimization (Regularized DPO preventing overfitting to reference model)", N),
          t("SimPO — Simple Preference Optimization (Target reward margin without reference model computation)", N),
          t("SFT — Supervised Fine-Tuning (Instruction tuning on curated prompt-response pairs)", N),
          t("CoT — Chain of Thought Prompting (Explicit step-by-step intermediate reasoning generation)", N),
          t("ToT — Tree of Thoughts (Tree search exploring multiple reasoning paths with backtracking)", N),
          t("GoT — Graph of Thoughts (Models arbitrary network graph reasoning structures)", N),
          t("MCTS — Monte Carlo Tree Search (Search algorithm guiding test-time compute in reasoning LLMs)", N),
          t("PRM — Process Reward Model (Grades each intermediate step in a chain of thought)", N),
          t("ORM — Outcome Reward Model (Grades only the final answer accuracy of a model completion)", N),
          t("STaR — Self-Taught Reasoner (Bootstrapping reasoning via self-generated rationales)", N),
        ],
      },
      {
        name: "3. Parameter-Efficient Fine-Tuning (PEFT) & Quantization",
        topics: [
          t("PEFT — Parameter-Efficient Fine-Tuning (Tuning minimal weights without altering frozen backbone)", N),
          t("LoRA — Low-Rank Adaptation (Decomposes weight updates into low-rank matrices A and B)", N),
          t("QLoRA — Quantized Low-Rank Adaptation (4-bit NormalFloat base model with 16-bit LoRA adapters)", N),
          t("DoRA — Weight-Decomposed Low-Rank Adaptation (Separates magnitude and directional updates)", N),
          t("GaLore — Gradient Low-Rank Projection (Memory-efficient full-parameter pre-training and tuning)", N),
          t("RSLoRA — Rank-Stabilized Low-Rank Adaptation (Prevents scaling collapse on high LoRA ranks)", N),
          t("IA3 — Infused Adapter by Inhibiting and Amplifying Inner Activations (Vector scaling vectors)", N),
          t("Prefix Tuning — Prepends learnable continuous virtual prompt tokens to transformer keys/values", N),
          t("Prompt Tuning — Prepends learnable virtual embedding tokens to the input token sequence", N),
          t("AWQ — Activation-aware Weight Quantization (Protects salient weight channels by observing activations)", N),
          t("GPTQ — Generative Pre-trained Transformer Quantization (One-shot second-order Hessian quantization)", N),
          t("GGUF — GPT-Generated Unified Format (Binary file format for llama.cpp CPU/GPU inference)", N),
          t("EXL2 — ExLlamaV2 Quantization Format (Variable bit-rate quantization optimized for NVIDIA GPUs)", N),
          t("SmoothQuant — Migrates activation outliers to weights mathematically to enable INT8 quantization", N),
          t("FP8 — 8-bit Floating Point (E4M3 and E5M2 formats accelerated by NVIDIA Hopper H100 and Blackwell)", N),
          t("BF16 — Brain Floating Point 16 (1 sign, 8 exponent, 7 mantissa bits matching FP32 dynamic range)", N),
          t("FP16 — Standard IEEE Half-Precision Floating Point format (1 sign, 5 exponent, 10 mantissa bits)", N),
          t("INT8 / INT4 — 8-bit and 4-bit Integer Fixed-Point Quantization formats", N),
          t("NF4 — NormalFloat 4 (Information-theoretically optimal quantile distribution for zero-mean normal weights)", N),
        ],
      },
      {
        name: "4. Autonomous Agents, Protocols & Tool Orchestration",
        topics: [
          t("MCP — Model Context Protocol (Universal open standard by Anthropic connecting AI models to tools)", N),
          t("ReAct — Reasoning and Acting (Interleaved Thought-Action-Observation agent loop)", N),
          t("HITL — Human-in-the-Loop (Interactive human approvals for high-stakes tool execution)", N),
          t("HOTL — Human-on-the-Loop (Human oversight observing and intervening during agent execution)", N),
          t("FC / TC — Function Calling / Tool Calling (Structured schema invocation for APIs and databases)", N),
          t("DSPy — Declarative Self-improving Language Programs (Compiles pipelines into optimal prompts/weights)", N),
          t("MAS — Multi-Agent System (Autonomous network of collaborative or adversarial specialized agents)", N),
          t("RPA — Robotic Process Automation (Software bots automating repetitive screen and GUI workflows)", N),
          t("CUA — Computer-Using Agent (AI models driving mouse clicks, keystrokes, and OS navigation)", N),
          t("BUSA — Browser-Use Software Agent (Autonomous web interaction via Playwright/Puppeteer DOM parsing)", N),
          t("E2B — Execution Environment for Bots (Sandboxed cloud virtualization for safe agent code execution)", N),
          t("A2A — Agent-to-Agent Communication Protocol (Inter-agent message buses and state synchronization)", N),
        ],
      },
      {
        name: "5. Retrieval-Augmented Generation (RAG) & Vector Search",
        topics: [
          t("RAG — Retrieval-Augmented Generation (Injects external real-time knowledge into LLM prompt context)", N),
          t("GraphRAG — Knowledge Graph RAG (Extracts entities/relationships and synthesizes global community summaries)", N),
          t("CRAG — Corrective RAG (Self-evaluates retrieval confidence and triggers web searches on poor chunks)", N),
          t("Self-RAG — Self-Reflective RAG (Uses specialized reflection tokens to critique retrieval necessity)", N),
          t("RAPTOR — Recursive Abstractive Processing for Tree-Organized Retrieval (Hierarchical cluster summaries)", N),
          t("HNSW — Hierarchical Navigable Small World (Multi-layer skip-list graph for ultra-fast vector search)", N),
          t("IVF-PQ — Inverted File with Product Quantization (Vector clustering with compressed sub-vector codes)", N),
          t("ANN — Approximate Nearest Neighbors Search (Tradeoff algorithm balancing query speed and recall)", N),
          t("k-NN — k-Nearest Neighbors (Exact brute-force Euclidean/Cosine distance nearest neighbor search)", N),
          t("BM25 — Best Matching 25 (Probabilistic lexical keyword TF-IDF ranking algorithm)", N),
          t("RRF — Reciprocal Rank Fusion (Merges vector semantic search and keyword lexical search rankings)", N),
          t("SPLADE — Sparse Lexical and Expansion Model (Learns term expansion weights using BERT MLM head)", N),
          t("ColBERT — Contextualized Late Interaction over BERT (Fine-grained token-level MaxSim vector retrieval)", N),
          t("VDB — Vector Database (Dedicated engine for storing and indexing high-dimensional embeddings)", N),
          t("MMR — Maximal Marginal Relevance (Balances query relevance with chunk diversity to avoid redundancy)", N),
          t("HyDE — Hypothetical Document Embeddings (Generates zero-shot answer to retrieve similar real docs)", N),
        ],
      },
      {
        name: "6. Inference Engines, Serving & Kernel Optimization",
        topics: [
          t("vLLM — Virtual Large Language Model (High-throughput serving engine utilizing PagedAttention)", N),
          t("TGI — Text Generation Inference (Hugging Face production LLM container serving stack)", N),
          t("SGLang — Structured Generation Language (RadixAttention engine for low-latency multi-call workflows)", N),
          t("TRT-LLM — TensorRT-LLM (NVIDIA deeply optimized GPU inference compiler and runtime library)", N),
          t("Ollama — Local developer tool packaging and running open LLMs natively via llama.cpp", N),
          t("FlashAttention — IO-aware Exact Attention Kernel (Tiles Q,K,V blocks in GPU SRAM avoiding HBM read/writes)", N),
          t("CUTLASS — CUDA Templates for Linear Algebra Subroutines (High-performance GEMM building blocks)", N),
          t("Triton DSL — OpenAI Python-like language for authoring highly optimized GPU compute kernels", N),
          t("PagedAttention — Virtual memory paging for transformer KV cache preventing VRAM fragmentation", N),
          t("Speculative Decoding — Draft model generates candidate tokens verified in parallel by target LLM", N),
          t("EAGLE — Extrapolation Algorithm for Greater Language-model Efficiency (Fast speculative decoding)", N),
          t("Medusa — Multiple auxiliary decoding heads predicting multiple future tokens in parallel", N),
          t("Chunked Prefill — Batches long prompt prefill tokens alongside ongoing autoregressive generation tokens", N),
          t("TTFT — Time To First Token (Critical latency metric measuring initial prompt response time)", N),
          t("TPS — Tokens Per Second (System throughput metric measuring generation speed per user/server)", N),
          t("ITL — Inter-Token Latency (Time elapsed between consecutive generated tokens in streaming)", N),
          t("MTP — Multi-Token Prediction (Inference engine capability emitting chunks of tokens per step)", N),
        ],
      },
      {
        name: "7. Classical Machine Learning & Statistical Modeling",
        topics: [
          t("ANN — Artificial Neural Network (Interconnected layers of synthetic neurons learning via weights)", N),
          t("CNN — Convolutional Neural Network (Spatial feature extraction using convolving matrix kernels)", N),
          t("RNN — Recurrent Neural Network (Processes sequential data maintaining an internal hidden state)", N),
          t("LSTM — Long Short-Term Memory (RNN with input, forget, and output gates solving vanishing gradients)", N),
          t("GRU — Gated Recurrent Unit (Simplified LSTM using update and reset gates with fewer parameters)", N),
          t("GAN — Generative Adversarial Network (Generator and Discriminator competing in a zero-sum game)", N),
          t("VAE — Variational Autoencoder (Encodes data into a probabilistic latent Gaussian distribution)", N),
          t("SVM — Support Vector Machine (Finds optimal separating hyperplane maximizing classification margin)", N),
          t("PCA — Principal Component Analysis (Linear orthogonal transformation for dimensionality reduction)", N),
          t("t-SNE — t-Distributed Stochastic Neighbor Embedding (Non-linear dimensionality reduction for visualization)", N),
          t("UMAP — Uniform Manifold Approximation and Projection (Riemannian geometry dimensional reduction)", N),
          t("GBDT — Gradient Boosted Decision Trees (Sequentially fits weak trees to residual pseudo-gradients)", N),
          t("XGBoost — Extreme Gradient Boosting (Scalable, regularized tree boosting library)", N),
          t("LightGBM — Light Gradient Boosting Machine (Leaf-wise histogram-based fast tree learning)", N),
          t("CatBoost — Categorical Boosting (Target-encoding gradient boosting resilient to categorical features)", N),
          t("RF — Random Forest (Ensemble bagging of decorrelated decision trees using bootstrap sampling)", N),
          t("k-Means — Iterative centroid clustering minimizing within-cluster sum-of-squares (inertia)", N),
          t("DBSCAN — Density-Based Spatial Clustering of Applications with Noise (Discovers arbitrary shapes)", N),
          t("GMM — Gaussian Mixture Model (Probabilistic clustering assuming mixture of finite Gaussian densities)", N),
          t("HMM — Hidden Markov Model (Markov process with unobserved hidden states emitting observables)", N),
          t("SVD — Singular Value Decomposition (Factorizes rectangular matrices into singular vectors and values)", N),
          t("EM — Expectation-Maximization Algorithm (Finds maximum likelihood estimates for latent variable models)", N),
          t("MCMC — Markov Chain Monte Carlo (Stochastic sampling from complex probability distributions)", N),
          t("MLE — Maximum Likelihood Estimation (Finds parameters maximizing probability of observed sample)", N),
          t("MAP — Maximum A Posteriori (Bayesian estimation incorporating prior probability distributions)", N),
          t("ROC-AUC — Receiver Operating Characteristic Area Under Curve (Discrimination metric across thresholds)", N),
          t("PR-AUC — Precision-Recall Area Under Curve (Superior metric for heavily skewed/imbalanced classes)", N),
          t("MSE / RMSE — Mean Squared Error / Root Mean Squared Error (Standard regression loss metrics)", N),
          t("MAE — Mean Absolute Error (L1 regression loss robust to extreme outliers)", N),
          t("MAPE — Mean Absolute Percentage Error (Scale-independent relative forecast error metric)", N),
        ],
      },
      {
        name: "8. Natural Language Processing (NLP) & Speech AI",
        topics: [
          t("BERT — Bidirectional Encoder Representations from Transformers (Masked language model encoder)", N),
          t("RoBERTa — Robustly Optimized BERT Approach (Pre-trained longer with bigger batches & dynamic masking)", N),
          t("DeBERTa — Decoding-enhanced BERT with Disentangled Attention (Disentangles content and position vectors)", N),
          t("T5 — Text-to-Text Transfer Transformer (Unifies all NLP tasks into a text-in text-out framework)", N),
          t("BART — Bidirectional and Auto-Regressive Transformers (Denoising sequence-to-sequence autoencoder)", N),
          t("TF-IDF — Term Frequency-Inverse Document Frequency (Classical statistical text importance weighting)", N),
          t("BPE — Byte-Pair Encoding (Subword tokenization merging most frequent byte/character pairs)", N),
          t("WordPiece — Subword tokenization maximizing language model likelihood before adding new units", N),
          t("SentencePiece — Language-independent subword tokenizer treating whitespace as normal characters", N),
          t("NER — Named Entity Recognition (Identifies entities: person, location, date, organization)", N),
          t("POS — Part-of-Speech Tagging (Grammatical labeling of words: noun, verb, adjective)", N),
          t("WSD — Word Sense Disambiguation (Determines polysemous meaning of words in context)", N),
          t("NLI — Natural Language Inference (Entailment, contradiction, or neutral premise-hypothesis checking)", N),
          t("BLEU — Bilingual Evaluation Understudy (N-gram precision metric for machine translation quality)", N),
          t("ROUGE — Recall-Oriented Understudy for Gisting Evaluation (N-gram recall metric for summarization)", N),
          t("METEOR — Metric for Evaluation of Translation with Explicit Ordering (Harmonic mean with stem matching)", N),
          t("TTS — Text-to-Speech (Converts written text characters into acoustic neural voice waveforms)", N),
          t("STT / ASR — Speech-to-Text / Automatic Speech Recognition (Acoustic audio to tokenized text)", N),
          t("VAD — Voice Activity Detection (Detects presence or absence of human speech in audio streams)", N),
          t("WER / CER — Word Error Rate / Character Error Rate (Standard speech transcription accuracy metrics)", N),
          t("MFCC — Mel-Frequency Cepstral Coefficients (Acoustic spectral representations modeling human hearing)", N),
          t("Vocoder — Neural synthesis model turning acoustic mel-spectrograms into audible audio waveforms", N),
        ],
      },
      {
        name: "9. Computer Vision (CV), Multimodal & Generative Media",
        topics: [
          t("ViT — Vision Transformer (Treats 16x16 image patches as sequence tokens in an encoder)", N),
          t("CLIP — Contrastive Language-Image Pre-training (Aligns text and visual embeddings in shared space)", N),
          t("BLIP — Bootstrapping Language-Image Pre-training (Unified vision-language understanding & generation)", N),
          t("YOLO — You Only Look Once (Single-stage real-time object detection and instance segmentation)", N),
          t("SSD — Single Shot MultiBox Detector (Detects multi-scale boundary boxes in single forward pass)", N),
          t("Faster R-CNN — Two-stage object detection network using Region Proposal Networks (RPN)", N),
          t("Mask R-CNN — Extends Faster R-CNN with an auxiliary branch for pixel-level instance segmentation", N),
          t("SAM — Segment Anything Model (Zero-shot foundation model for promptable image segmentation)", N),
          t("OCR — Optical Character Recognition (Extracts text typography from photos and scanned documents)", N),
          t("IoU — Intersection over Union (Measures overlap ratio between ground-truth and predicted bounding box)", N),
          t("mAP — Mean Average Precision (Standard evaluation metric for object detection accuracy)", N),
          t("DDPM — Denoising Diffusion Probabilistic Models (Generates data by inverting forward Gaussian noise)", N),
          t("DDIM — Denoising Diffusion Implicit Models (Deterministic non-Markovian sampling accelerating diffusion)", N),
          t("DiT — Diffusion Transformer (Replaces standard U-Net backbone in diffusion models with transformers)", N),
          t("Latent Diffusion — Performs diffusion operations within compressed latent space (Stable Diffusion)", N),
          t("NeRF — Neural Radiance Fields (Synthesizes novel 3D views from sparse 2D photos via MLPs)", N),
          t("3D GS — 3D Gaussian Splatting (Real-time rasterization of 3D radiance fields via Gaussian primitives)", N),
          t("SLAM — Simultaneous Localization and Mapping (Real-time tracking of camera pose and environment)", N),
          t("SFM — Structure from Motion (3D reconstruction of scenes from uncalibrated collections of photos)", N),
          t("FPN — Feature Pyramid Network (Top-down architecture with lateral connections for multi-scale vision)", N),
          t("FID — Fréchet Inception Distance (Measures similarity and realism of synthetic generated images)", N),
        ],
      },
      {
        name: "10. Silicon Hardware, Compute & Deep Learning Compilers",
        topics: [
          t("GPU — Graphics Processing Unit (Massively parallel SIMD/SIMT processor accelerating matrix math)", N),
          t("TPU — Tensor Processing Unit (Google proprietary ASIC engineered for matrix multiplication systolic arrays)", N),
          t("NPU — Neural Processing Unit (Low-power dedicated edge chip accelerating on-device neural inference)", N),
          t("ASIC — Application-Specific Integrated Circuit (Custom silicon chip tailored for specific math tasks)", N),
          t("FPGA — Field Programmable Gate Array (Reconfigurable hardware matrix circuit for low-latency ML)", N),
          t("CUDA — Compute Unified Device Architecture (NVIDIA parallel computing platform and API)", N),
          t("ROCm — Radeon Open Compute (AMD open-source software development platform for GPUs)", N),
          t("HBM — High Bandwidth Memory (3D stacked DRAM providing multi-terabyte/s memory bandwidth)", N),
          t("NVLink — High-speed multi-GPU interconnect bus bypassing slow PCIe bus bottlenecks)", N),
          t("PCIe — Peripheral Component Interconnect Express (Standard motherboard expansion bus standard)", N),
          t("TDP — Thermal Design Power (Maximum heat dissipation wattage of a CPU/GPU processor)", N),
          t("FLOPS — Floating Point Operations Per Second (Standard hardware compute throughput performance metric)", N),
          t("TFLOPS / PFLOPS — TeraFLOPS (10^12) and PetaFLOPS (10^15) compute measurement units", N),
          t("XLA — Accelerated Linear Algebra (Domain-specific JIT compiler for JAX and TensorFlow graphs)", N),
          t("TensorRT — NVIDIA Deep Learning Inference Optimizer and runtime platform generating tuned engines)", N),
          t("ONNX — Open Neural Network Exchange (Open ecosystem format representing deep learning graphs)", N),
          t("TVM — Apache Tensor Virtual Machine (End-to-end compiler stack for CPUs, GPUs, and accelerators)", N),
          t("MLIR — Multi-Level Intermediate Representation (Extensible compiler infrastructure framework)", N),
          t("SRAM — Static Random Access Memory (Ultra-fast on-die chip cache memory in GPUs/TPUs)", N),
          t("VRAM — Video Random Access Memory (High-speed graphics memory dedicated to holding model weights)", N),
        ],
      },
      {
        name: "11. MLOps, LLMOps, Data Engineering & Distributed Systems",
        topics: [
          t("MLOps — Machine Learning Operations (DevOps practices bridging ML development and production lifecycle)", N),
          t("LLMOps — Large Language Model Operations (Prompt management, guardrails, evaluations, inference telemetry)", N),
          t("DataOps — Data Operations (Agile data management practices accelerating data delivery & quality)", N),
          t("ETL / ELT — Extract, Transform, Load / Extract, Load, Transform (Core data engineering pipeline patterns)", N),
          t("CDC — Change Data Capture (Tracks and streams database row-level INSERT/UPDATE/DELETE events)", N),
          t("OLAP — Online Analytical Processing (Columnar database storage optimized for complex aggregations)", N),
          t("OLTP — Online Transaction Processing (Row-oriented ACID database optimized for rapid concurrent writes)", N),
          t("DVC — Data Version Control (Git-like version control for massive dataset snapshots and models)", N),
          t("IaC — Infrastructure as Code (Declarative cloud resource provisioning with Terraform/Pulumi)", N),
          t("K8s — Kubernetes (Container orchestration platform automating deployment, scaling and failover)", N),
          t("CI / CD — Continuous Integration / Continuous Deployment (Automated test, build and release pipelines)", N),
          t("OTel — OpenTelemetry (Vendor-neutral observability standard for traces, metrics and application logs)", N),
          t("DAG — Directed Acyclic Graph (Computational graph workflow definition in Airflow and Prefect)", N),
          t("HDFS — Hadoop Distributed File System (Scalable distributed file storage running on commodity servers)", N),
          t("ACID — Atomicity, Consistency, Isolation, Durability (Guarantees of database transaction processing)", N),
          t("CAP Theorem — Consistency, Availability, Partition Tolerance (Distributed systems tradeoff theorem)", N),
          t("Raft / Paxos — Consensus protocols ensuring synchronized state agreement across distributed clusters)", N),
          t("LSM-Tree — Log-Structured Merge-Tree (High-throughput append-only storage engine for NoSQL databases)", N),
          t("SLA / SLO / SLI — Service Level Agreement / Objective / Indicator (Reliability contracts and measurements)", N),
        ],
      },
      {
        name: "12. Benchmarks, AI Safety, Red Teaming & Enterprise Security",
        topics: [
          t("MMLU — Massive Multitask Language Understanding (Evaluation across 57 humanities and STEM subjects)", N),
          t("MMLU-Pro — More rigorous, reasoning-focused MMLU benchmark with expanded 10-choice options)", N),
          t("GSM8K — Grade School Math 8K (8,500 diverse multi-step grade school mathematics problems)", N),
          t("MATH — Challenging high school competition mathematics problem solving benchmark", N),
          t("HumanEval — OpenAI Python programming coding benchmark measuring functional correctness (pass@k)", N),
          t("SWE-bench — Software Engineering Benchmark (Tests autonomous agents on real GitHub bug resolution)", N),
          t("Chatbot Arena — Crowdsourced open platform comparing LLM responses via human blind Elo voting", N),
          t("ARC — Abstraction and Reasoning Corpus (Measures core fluid intelligence and out-of-distribution logic)", N),
          t("PII — Personally Identifiable Information (Sensitive personal data requiring redaction and masking)", N),
          t("OWASP — Open Worldwide Application Security Project (Publishes Top 10 vulnerabilities for LLM apps)", N),
          t("Jailbreak — Prompt engineering attack tricking an aligned LLM into bypassing safety policies", N),
          t("Prompt Injection — Malicious adversarial instructions overriding system prompts via user/data inputs", N),
          t("LLM-as-a-Judge — Using a frontier model to automatically evaluate and score another model's output", N),
          t("RAG Triad — TruLens evaluation framework: Context Relevance, Groundedness, and Answer Relevance", N),
          t("RBAC — Role-Based Access Control (Restricts enterprise resource access based on assigned employee roles)", N),
          t("ABAC — Attribute-Based Access Control (Fine-grained access based on user, resource, and environment context)", N),
          t("SOC 2 — Service Organization Control 2 (Security compliance standard for SaaS and cloud providers)", N),
          t("GDPR — General Data Protection Regulation (EU privacy law governing personal data processing and right to forget)", N),
        ],
      },
      {
        name: "13. Robotics, Reinforcement Learning & Physical AI",
        topics: [
          t("VLA — Vision-Language-Action Model (Translates visual scene understanding directly into physical robot motor control)", N),
          t("MDP — Markov Decision Process (Mathematical framework modeling sequential decision making)", N),
          t("POMDP — Partially Observable Markov Decision Process (MDP where the environment state is not fully visible)", N),
          t("DQN — Deep Q-Network (Combines Q-learning with deep neural networks and experience replay)", N),
          t("SAC — Soft Actor-Critic (Off-policy actor-critic algorithm maximizing reward and entropy simultaneously)", N),
          t("TD3 — Twin Delayed Deep Deterministic Policy Gradient (Reduces overestimation bias in continuous action spaces)", N),
          t("DDPG — Deep Deterministic Policy Gradient (Actor-critic algorithm for continuous action control)", N),
          t("A2C / A3C — Advantage Actor-Critic / Asynchronous Advantage Actor-Critic (Actor-critic RL architectures)", N),
          t("HER — Hindsight Experience Replay (Replays past failures by retroactively treating them as intended goals)", N),
          t("ROS / ROS2 — Robot Operating System (Standard open-source middleware robotics framework and message bus)", N),
          t("URDF — Unified Robot Description Format (XML specification defining robot kinematics and visual meshes)", N),
          t("Sim2Real — Techniques bridging the simulation-to-reality domain gap for robotics trained in physics engines", N),
        ],
      },
      {
        name: "14. Privacy, Cryptography & Secure Distributed AI",
        topics: [
          t("FL — Federated Learning (Trains shared global models across decentralized edge devices without pooling raw data)", N),
          t("DP — Differential Privacy (Adds mathematically calibrated noise to guarantee privacy against membership inference)", N),
          t("HE / FHE — Homomorphic Encryption / Fully Homomorphic Encryption (Performs math on ciphertext without decrypting)", N),
          t("TEE — Trusted Execution Environment (Isolated secure hardware enclave inside CPU/GPU preventing host inspection)", N),
          t("MPC / SMPC — Secure Multi-Party Computation (Joint computation of a function over inputs while keeping inputs private)", N),
          t("ZKP — Zero-Knowledge Proof (Allows proving a statement is true without revealing any secret information)", N),
        ],
      },
    ],
  },
];

export const TOTAL_TOPICS = ROADMAP.reduce(
  (a, l) => a + l.sections.reduce((b, s) => b + s.topics.length, 0),
  0,
);
