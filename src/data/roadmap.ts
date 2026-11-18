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
    level: "Level 14 — Technical Abbreviations & Complete AI Glossary",
    short: "Technical Abbreviations",
    tagline: "The definitive 100% complete AI, LLM, MLOps, deep learning & system abbreviations reference.",
    icon: "book",
    sections: [
      {
        name: "1. GenAI, LLMs & Foundation Models",
        topics: [
          t("LLM — Large Language Model", N),
          t("SLM — Small Language Model", N),
          t("VLM — Vision Language Model", N),
          t("MoE — Mixture of Experts Architecture", N),
          t("MHA — Multi-Head Attention", N),
          t("MQA — Multi-Query Attention", N),
          t("GQA — Grouped-Query Attention", N),
          t("RoPE — Rotary Position Embedding", N),
          t("ALiBi — Attention with Linear Biases", N),
          t("KV Cache — Key-Value Cache for Autoregressive Decoding", N),
          t("TTS — Text-to-Speech", N),
          t("STT / ASR — Speech-to-Text / Automatic Speech Recognition", N),
          t("SSM — State Space Model (Mamba architecture)", N),
          t("AGI — Artificial General Intelligence", N),
        ],
      },
      {
        name: "2. Prompting, Agents & Tool Protocols",
        topics: [
          t("MCP — Model Context Protocol (Anthropic tool standard)", N),
          t("CoT — Chain of Thought Prompting", N),
          t("ToT — Tree of Thoughts Prompting", N),
          t("GoT — Graph of Thoughts Prompting", N),
          t("ReAct — Reasoning and Acting (Agent pattern)", N),
          t("HITL — Human-in-the-Loop Orchestration", N),
          t("HOTL — Human-on-the-Loop Supervision", N),
          t("DSPy — Declarative Self-improving Language Programs", N),
          t("FC / TC — Function Calling / Tool Calling", N),
          t("RPA — Robotic Process Automation", N),
        ],
      },
      {
        name: "3. RAG & Vector Search Ecosystem",
        topics: [
          t("RAG — Retrieval-Augmented Generation", N),
          t("GraphRAG — Knowledge Graph Retrieval-Augmented Generation", N),
          t("CRAG — Corrective Retrieval-Augmented Generation", N),
          t("Self-RAG — Self-Reflective Retrieval-Augmented Generation", N),
          t("RAPTOR — Recursive Abstractive Processing for Tree-Organized Retrieval", N),
          t("HNSW — Hierarchical Navigable Small World (Vector Indexing)", N),
          t("IVF-PQ — Inverted File with Product Quantization", N),
          t("BM25 — Best Matching 25 (Lexical Ranking Algorithm)", N),
          t("ANN — Approximate Nearest Neighbors Search", N),
          t("k-NN — k-Nearest Neighbors Algorithm", N),
          t("VDB — Vector Database (Pinecone, Qdrant, Milvus, Chroma)", N),
          t("SPLADE — Sparse Lexical and Expansion Model", N),
          t("RRF — Reciprocal Rank Fusion (Hybrid Search Ranking)", N),
        ],
      },
      {
        name: "4. Fine-Tuning, Alignment & Optimization",
        topics: [
          t("PEFT — Parameter-Efficient Fine-Tuning", N),
          t("LoRA — Low-Rank Adaptation of LLMs", N),
          t("QLoRA — Quantized Low-Rank Adaptation (4-bit)", N),
          t("DoRA — Weight-Decomposed Low-Rank Adaptation", N),
          t("SFT — Supervised Fine-Tuning", N),
          t("RLHF — Reinforcement Learning from Human Feedback", N),
          t("RLAIF — Reinforcement Learning from AI Feedback", N),
          t("DPO — Direct Preference Optimization", N),
          t("PPO — Proximal Policy Optimization", N),
          t("ORPO — Odds Ratio Preference Optimization", N),
          t("KTO — Kahneman-Tversky Optimization", N),
          t("GRPO — Group Relative Policy Optimization (DeepSeek R1 reasoning)", N),
          t("SGD — Stochastic Gradient Descent", N),
          t("AdamW — Adaptive Moment Estimation with Decoupled Weight Decay", N),
        ],
      },
      {
        name: "5. Inference, Serving & Performance Metrics",
        topics: [
          t("vLLM — High-throughput PagedAttention Serving Engine", N),
          t("TGI — Text Generation Inference (HuggingFace)", N),
          t("TTFT — Time To First Token (Latency Metric)", N),
          t("TPS — Tokens Per Second (Throughput Metric)", N),
          t("ITL — Inter-Token Latency", N),
          t("SLA / SLO — Service Level Agreement / Objective", N),
          t("GGUF — GPT-Generated Unified Format (llama.cpp standard)", N),
          t("AWQ — Activation-aware Weight Quantization", N),
          t("GPTQ — Generative Pre-trained Transformer Post-Training Quantization", N),
          t("EXL2 — ExLlamaV2 Fast Quantization Format", N),
          t("FP16 / BF16 — Float 16 / Brain Float 16 Formats", N),
          t("INT8 / INT4 — 8-bit / 4-bit Integer Precision Quantization", N),
          t("FP8 — 8-bit Floating Point (NVIDIA Hopper / Ada Lovelace standard)", N),
          t("FlashAttention — Fast & Memory-Efficient Exact Attention IO Kernel", N),
        ],
      },
      {
        name: "6. Classical Machine Learning & Deep Learning",
        topics: [
          t("ANN — Artificial Neural Network", N),
          t("CNN — Convolutional Neural Network", N),
          t("RNN — Recurrent Neural Network", N),
          t("LSTM — Long Short-Term Memory Network", N),
          t("GRU — Gated Recurrent Unit", N),
          t("GAN — Generative Adversarial Network", N),
          t("VAE — Variational Autoencoder", N),
          t("SVM — Support Vector Machine", N),
          t("PCA — Principal Component Analysis", N),
          t("t-SNE — t-Distributed Stochastic Neighbor Embedding", N),
          t("UMAP — Uniform Manifold Approximation and Projection", N),
          t("GBDT — Gradient Boosted Decision Trees (XGBoost, LightGBM)", N),
          t("RF — Random Forest", N),
          t("MSE / RMSE — Mean Squared Error / Root Mean Squared Error", N),
          t("MAE — Mean Absolute Error", N),
          t("ROC-AUC — Receiver Operating Characteristic Area Under Curve", N),
        ],
      },
      {
        name: "7. NLP & Computer Vision (CV)",
        topics: [
          t("BERT — Bidirectional Encoder Representations from Transformers", N),
          t("RoBERTa — Robustly Optimized BERT Approach", N),
          t("DeBERTa — Decoding-enhanced BERT with Disentangled Attention", N),
          t("ViT — Vision Transformer", N),
          t("CLIP — Contrastive Language-Image Pre-training", N),
          t("BLIP — Bootstrapping Language-Image Pre-training", N),
          t("YOLO — You Only Look Once (Real-Time Object Detection)", N),
          t("SAM — Segment Anything Model (Meta CV standard)", N),
          t("OCR — Optical Character Recognition", N),
          t("NER — Named Entity Recognition", N),
          t("POS — Part of Speech Tagging", N),
          t("TF-IDF — Term Frequency-Inverse Document Frequency", N),
          t("N-Gram — Continuous sequence of n items from a text", N),
          t("BLEU — Bilingual Evaluation Understudy (Machine Translation Score)", N),
          t("ROUGE — Recall-Oriented Understudy for Gesting Evaluation (Summarization)", N),
          t("IoU — Intersection over Union (Object Detection Metric)", N),
          t("mAP — Mean Average Precision", N),
          t("NeRF — Neural Radiance Fields (3D Scene Synthesis)", N),
          t("DDPM — Denoising Diffusion Probabilistic Models", N),
        ],
      },
      {
        name: "8. MLOps, Data Engineering & Cloud",
        topics: [
          t("MLOps — Machine Learning Operations", N),
          t("LLMOps — Large Language Model Operations", N),
          t("DataOps — Data Operations", N),
          t("ETL / ELT — Extract, Transform, Load / Extract, Load, Transform", N),
          t("CDC — Change Data Capture", N),
          t("OLAP — Online Analytical Processing (ClickHouse, Snowflake)", N),
          t("OLTP — Online Transaction Processing (PostgreSQL, MySQL)", N),
          t("ONNX — Open Neural Network Exchange", N),
          t("CI/CD — Continuous Integration / Continuous Deployment", N),
          t("IaC — Infrastructure as Code (Terraform, Pulumi)", N),
          t("K8s — Kubernetes Container Orchestration", N),
          t("DVC — Data Version Control", N),
          t("OTel — OpenTelemetry Observability Standard", N),
        ],
      },
      {
        name: "9. Hardware, Compute & Silicon Accelerators",
        topics: [
          t("GPU — Graphics Processing Unit", N),
          t("TPU — Tensor Processing Unit (Google Silicon)", N),
          t("NPU — Neural Processing Unit (On-Device AI)", N),
          t("ASIC — Application-Specific Integrated Circuit", N),
          t("CUDA — Compute Unified Device Architecture (NVIDIA API)", N),
          t("ROCm — Radeon Open Compute (AMD GPU Stack)", N),
          t("HBM — High Bandwidth Memory (HBM3e in H100/H200/B200)", N),
          t("NVLink — High-speed GPU interconnect bus", N),
          t("FLOPS / TFLOPS / PFLOPS — Floating Point Operations Per Second", N),
          t("TDP — Thermal Design Power (Watts)", N),
          t("VRAM — Video Random Access Memory", N),
        ],
      },
      {
        name: "10. AI Safety, Benchmarks & Enterprise Standards",
        topics: [
          t("MMLU — Massive Multitask Language Understanding Benchmark", N),
          t("GSM8K — Grade School Math 8K Benchmark", N),
          t("HumanEval — OpenAI Code Generation Benchmark", N),
          t("MATH — Challenging Competition Math Benchmark", N),
          t("SWE-bench — Software Engineering Benchmark for Autonomous Agents", N),
          t("PII — Personally Identifiable Information Redaction", N),
          t("OWASP — Open Worldwide Application Security Project (LLM Top 10)", N),
          t("LLM-as-a-Judge — Using Frontier LLMs for Automated Evaluation", N),
          t("RAG Triad — Context Relevance, Groundedness & Answer Relevance", N),
          t("RBAC — Role-Based Access Control", N),
        ],
      },
    ],
  },
];

export const TOTAL_TOPICS = ROADMAP.reduce(
  (a, l) => a + l.sections.reduce((b, s) => b + s.topics.length, 0),
  0,
);
