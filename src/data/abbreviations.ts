export type CategoryFilter = "All" | "GenAI & LLM" | "ML & Deep Learning" | "NLP & Vision" | "MLOps & Cloud" | "CS & Systems";

export const CATEGORIES: CategoryFilter[] = [
  "All",
  "GenAI & LLM",
  "ML & Deep Learning",
  "NLP & Vision",
  "MLOps & Cloud",
  "CS & Systems",
];

export interface Abbreviation {
  term: string;
  expansion: string;
  category: "GenAI & LLM" | "ML & Deep Learning" | "NLP & Vision" | "MLOps & Cloud" | "CS & Systems";
  definition: string;
  keyContext: string;
}

export const TECHNICAL_ABBREVIATIONS: Abbreviation[] = [
  // GenAI & LLMs
  {
    term: "RAG",
    expansion: "Retrieval-Augmented Generation",
    category: "GenAI & LLM",
    definition: "An architecture that retrieves relevant context from an external vector database or search engine before passing it to an LLM alongside the user prompt.",
    keyContext: "The industry standard for eliminating hallucinations and querying private enterprise documents."
  },
  {
    term: "LLM",
    expansion: "Large Language Model",
    category: "GenAI & LLM",
    definition: "A deep neural network with billions of parameters trained on vast internet-scale text corpora to understand and generate human-like language (e.g., GPT-4, Claude, Gemini, Llama).",
    keyContext: "Operates via next-token prediction to deliver broad reasoning and natural language synthesis."
  },
  {
    term: "LoRA",
    expansion: "Low-Rank Adaptation",
    category: "GenAI & LLM",
    definition: "A parameter-efficient fine-tuning (PEFT) technique that freezes base model weights and injects trainable low-rank decomposition matrices into transformer layers.",
    keyContext: "Reduces VRAM requirements by 3x-4x, enabling production LLM fine-tuning on consumer GPUs."
  },
  {
    term: "QLoRA",
    expansion: "Quantized Low-Rank Adaptation",
    category: "GenAI & LLM",
    definition: "An ultra memory-efficient fine-tuning method that loads the base model in 4-bit NormalFloat (NF4) quantization while training full 16-bit LoRA adapters.",
    keyContext: "Enables fine-tuning of 70B parameter models on a single 24GB or 16GB GPU."
  },
  {
    term: "RLHF",
    expansion: "Reinforcement Learning from Human Feedback",
    category: "GenAI & LLM",
    definition: "A post-training alignment pipeline that trains a reward model from human comparison data and optimizes policy weights via PPO or similar reinforcement learning algorithms.",
    keyContext: "The foundational technique that made ChatGPT and Claude helpful, honest, and harmless."
  },
  {
    term: "DPO",
    expansion: "Direct Preference Optimization",
    category: "GenAI & LLM",
    definition: "An alignment algorithm that eliminates the separate reward model and reinforcement learning loop by optimizing preferred responses directly via implicit cross-entropy loss.",
    keyContext: "A modern, highly stable, and faster alternative to traditional RLHF."
  },
  {
    term: "PEFT",
    expansion: "Parameter-Efficient Fine-Tuning",
    category: "GenAI & LLM",
    definition: "A family of fine-tuning techniques (LoRA, Prefix Tuning, Adapters) that freeze the majority of base model parameters and train only a tiny fraction (<1%) of weights.",
    keyContext: "Dramatically saves compute cost, checkpoint storage, and GPU memory."
  },
  {
    term: "MCP",
    expansion: "Model Context Protocol",
    category: "GenAI & LLM",
    definition: "An open protocol introduced by Anthropic that standardizes how AI applications connect with external data repositories, business tools, and development environments.",
    keyContext: "The emerging universal standard for AI Agents and developer tool integrations."
  },
  {
    term: "CoT",
    expansion: "Chain of Thought",
    category: "GenAI & LLM",
    definition: "A prompting technique where the model is prompted to break complex reasoning tasks into explicit, step-by-step intermediate thoughts before arriving at an answer.",
    keyContext: "Drastically boosts accuracy on mathematical reasoning, logic, and multi-step deduction."
  },
  {
    term: "ReAct",
    expansion: "Reasoning and Acting",
    category: "GenAI & LLM",
    definition: "An autonomous agent paradigm combining reasoning traces (Thought) and task-specific actions (Tool Calling), followed by observation feedback to execute multi-step workflows.",
    keyContext: "The core foundational architecture powering modern agent frameworks like LangGraph and CrewAI."
  },
  {
    term: "TTS",
    expansion: "Text-to-Speech",
    category: "GenAI & LLM",
    definition: "A generative audio model architecture that converts raw written text into natural, expressive, human-like voice waveforms.",
    keyContext: "Implemented in modern systems like ElevenLabs, Whisper TTS, and Kokoro AI."
  },
  {
    term: "STT / ASR",
    expansion: "Speech-to-Text / Automatic Speech Recognition",
    category: "GenAI & LLM",
    definition: "An acoustic and language modeling system that transcribes continuous human speech audio into structured written text (e.g., OpenAI Whisper).",
    keyContext: "Essential for modern voice assistants, live meeting summaries, and audio ingestion pipelines."
  },

  // ML & Deep Learning
  {
    term: "ANN",
    expansion: "Artificial Neural Network",
    category: "ML & Deep Learning",
    definition: "A computational model inspired by biological neural networks, consisting of interconnected layers of artificial neurons (Input, Hidden, Output) trained via backpropagation.",
    keyContext: "The foundational mathematical building block for all modern deep learning architectures."
  },
  {
    term: "CNN",
    expansion: "Convolutional Neural Network",
    category: "ML & Deep Learning",
    definition: "A specialized neural network architecture that employs sliding convolutional filters and pooling layers to extract spatial hierarchies and grid-like visual features.",
    keyContext: "The gold standard for computer vision, image classification, and medical imaging."
  },
  {
    term: "RNN",
    expansion: "Recurrent Neural Network",
    category: "ML & Deep Learning",
    definition: "A neural network that maintains an internal persistent hidden state to process sequential or temporal data across time steps.",
    keyContext: "Historically used for text and time-series data, now largely superseded by Transformers."
  },
  {
    term: "LSTM",
    expansion: "Long Short-Term Memory",
    category: "ML & Deep Learning",
    definition: "An advanced RNN variant equipped with input, forget, and output gating mechanisms designed to mitigate vanishing gradients and preserve long-range dependencies.",
    keyContext: "Widely utilized for financial time-series forecasting and legacy sequential modeling."
  },
  {
    term: "GAN",
    expansion: "Generative Adversarial Network",
    category: "ML & Deep Learning",
    definition: "A machine learning framework where two neural networks—a Generator and a Discriminator—compete in a minimax zero-sum game to synthesize photorealistic data.",
    keyContext: "Pioneered neural image synthesis, creative style transfer, and super-resolution."
  },
  {
    term: "VAE",
    expansion: "Variational Autoencoder",
    category: "ML & Deep Learning",
    definition: "A directed probabilistic generative model that maps input data into a continuous latent space distribution, allowing controlled sampling and reconstruction.",
    keyContext: "Used extensively in unsupervised representation learning and latent diffusion backbones."
  },
  {
    term: "SGD",
    expansion: "Stochastic Gradient Descent",
    category: "ML & Deep Learning",
    definition: "A fundamental first-order optimization algorithm that iteratively minimizes a loss function by computing gradients on randomly sampled mini-batches of training data.",
    keyContext: "The foundational baseline from which modern optimizers (Adam, AdamW, Lion) evolved."
  },
  {
    term: "SVM",
    expansion: "Support Vector Machine",
    category: "ML & Deep Learning",
    definition: "A classical supervised machine learning algorithm that finds the optimal separating hyperplane with maximum geometric margin between distinct data classes.",
    keyContext: "Employs the kernel trick for powerful non-linear decision boundaries on tabular datasets."
  },
  {
    term: "PCA",
    expansion: "Principal Component Analysis",
    category: "ML & Deep Learning",
    definition: "An unsupervised linear dimensionality reduction technique that computes orthogonal eigenvectors to project high-dimensional data along axes of maximal variance.",
    keyContext: "Standard practice for data visualization, noise reduction, and feature compression."
  },
  {
    term: "ROC-AUC",
    expansion: "Receiver Operating Characteristic — Area Under Curve",
    category: "ML & Deep Learning",
    definition: "A comprehensive classification performance metric that plots True Positive Rate against False Positive Rate across all discrimination thresholds.",
    keyContext: "The primary evaluation metric for imbalanced classification tasks (e.g., fraud detection)."
  },

  // NLP & Vision
  {
    term: "BERT",
    expansion: "Bidirectional Encoder Representations from Transformers",
    category: "NLP & Vision",
    definition: "A transformer encoder architecture introduced by Google that captures bidirectional context by attending simultaneously to tokens preceding and succeeding each word.",
    keyContext: "The industry standard for search query ranking, sentiment classification, and entity extraction."
  },
  {
    term: "ViT",
    expansion: "Vision Transformer",
    category: "NLP & Vision",
    definition: "An architecture that splits 2D images into fixed-size grid patches (e.g., 16x16) and processes them as token embeddings through standard Transformer encoder blocks.",
    keyContext: "Underpins state-of-the-art visual foundation models including CLIP, DALL-E, and Gemini Vision."
  },
  {
    term: "CLIP",
    expansion: "Contrastive Language-Image Pre-training",
    category: "NLP & Vision",
    definition: "A multi-modal foundation model trained contrastively to map text descriptions and raw images into a shared embedding vector space for zero-shot classification.",
    keyContext: "The core semantic conditioning component for modern text-to-image diffusion models."
  },
  {
    term: "TF-IDF",
    expansion: "Term Frequency — Inverse Document Frequency",
    category: "NLP & Vision",
    definition: "A statistical weighting measure in information retrieval that quantifies a word's importance relative to its frequency in a specific document and its rarity across the corpus.",
    keyContext: "The mathematical backbone of classical sparse search engines and the BM25 retrieval ranking function."
  },
  {
    term: "NER",
    expansion: "Named Entity Recognition",
    category: "NLP & Vision",
    definition: "An information extraction subtask that identifies and segments unstructured text into predefined categories such as person names, organizations, locations, and dates.",
    keyContext: "Crucial for automated contract review, resume parsing, and knowledge graph construction."
  },

  // MLOps & Cloud
  {
    term: "MLOps",
    expansion: "Machine Learning Operations",
    category: "MLOps & Cloud",
    definition: "A set of engineering practices that unifies ML system development (Dev) with operations (Ops) to automate CI/CD, deployment, testing, and continuous monitoring of models.",
    keyContext: "Prevents data drift, ensures reproducibility, and automates retraining pipelines in production."
  },
  {
    term: "LLMOps",
    expansion: "Large Language Model Operations",
    category: "MLOps & Cloud",
    definition: "Operational workflows specialized for generative AI: prompt engineering versioning, token budget tracking, latency telemetry, guardrail enforcement, and automated evals.",
    keyContext: "Managed with platforms like LangSmith, Arize Phoenix, Weights & Biases, and Trulens."
  },
  {
    term: "vLLM",
    expansion: "Virtual Large Language Model (High-throughput Serving Engine)",
    category: "MLOps & Cloud",
    definition: "A high-performance open-source inference and serving engine utilizing PagedAttention to eliminate memory fragmentation and achieve 10x-20x higher throughput.",
    keyContext: "The global production standard for hosting and serving self-hosted open-weights LLMs."
  },
  {
    term: "Triton",
    expansion: "Triton Inference Server",
    category: "MLOps & Cloud",
    definition: "An enterprise-grade open-source inference serving software by NVIDIA that optimizes concurrent model execution across multiple frameworks (TensorRT, ONNX, PyTorch).",
    keyContext: "The gold standard for ultra-low latency, dynamically batched enterprise microservices."
  },
  {
    term: "ONNX",
    expansion: "Open Neural Network Exchange",
    category: "MLOps & Cloud",
    definition: "An open standard format for representing machine learning models, enabling seamless interoperability and runtime hardware acceleration across distinct frameworks.",
    keyContext: "Essential for deploying PyTorch and TensorFlow models to edge hardware and ONNX Runtime."
  },
  {
    term: "CI / CD",
    expansion: "Continuous Integration / Continuous Deployment",
    category: "MLOps & Cloud",
    definition: "An automated software engineering methodology where code, configurations, and models are continuously tested, verified, and safely pushed to live environments.",
    keyContext: "Orchestrated using tools such as GitHub Actions, GitLab CI, and Kubernetes Argo Workflows."
  },

  // CS & Systems
  {
    term: "CUDA",
    expansion: "Compute Unified Device Architecture",
    category: "CS & Systems",
    definition: "A proprietary parallel computing platform and application programming interface developed by NVIDIA that grants developers direct access to GPU instruction sets.",
    keyContext: "The foundational compute runtime upon which virtually all modern deep learning frameworks operate."
  },
  {
    term: "API",
    expansion: "Application Programming Interface",
    category: "CS & Systems",
    definition: "A standardized software intermediary protocol allowing independent applications to exchange data and invoke functionality via structured contracts (REST, gRPC).",
    keyContext: "Examples include the OpenAI REST API, Anthropic Messages API, and Hugging Face endpoints."
  },
  {
    term: "HNSW",
    expansion: "Hierarchical Navigable Small World",
    category: "CS & Systems",
    definition: "A multi-layered graph data structure and search algorithm providing logarithmic time-complexity for Approximate Nearest Neighbor (ANN) vector similarity search.",
    keyContext: "The core vector indexing engine powering Pinecone, Qdrant, Milvus, and pgvector."
  },
  {
    term: "KV Cache",
    expansion: "Key-Value Cache",
    category: "CS & Systems",
    definition: "An inference optimization technique that stores computed key and value attention tensors in GPU memory to avoid redundant recomputation during token generation.",
    keyContext: "Essential for low-latency autoregressive decoding in production transformer inference."
  },
  {
    term: "FP16 / BF16 / INT8",
    expansion: "Floating Point 16 / Brain Floating Point 16 / Integer 8",
    category: "CS & Systems",
    definition: "Numerical representation formats defining bit-depth precision for weights and activations, balancing numerical stability against memory footprint and compute latency.",
    keyContext: "BF16 is the standard for modern model pre-training; INT8 and INT4 are standard for quantized inference."
  }
];
