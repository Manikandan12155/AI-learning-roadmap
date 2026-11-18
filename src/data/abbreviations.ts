export interface Abbreviation {
  term: string;
  expansion: string;
  category: "GenAI & LLM" | "ML & Deep Learning" | "NLP & Vision" | "MLOps & Cloud" | "CS & Systems";
  definition: string;
  keyContext?: string;
}

export const CATEGORIES = [
  "All",
  "GenAI & LLM",
  "ML & Deep Learning",
  "NLP & Vision",
  "MLOps & Cloud",
  "CS & Systems",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const TECHNICAL_ABBREVIATIONS: Abbreviation[] = [
  // GenAI & LLMs
  {
    term: "RAG",
    expansion: "Retrieval-Augmented Generation",
    category: "GenAI & LLM",
    definition: "LLM generation-ku munnadi external vector database or search engine-la irundhu relevant context-ah retrieve panni prompt kooda attach panra architecture.",
    keyContext: "Hallucinations koraika and proprietary company data mela Q&A build panna standard method."
  },
  {
    term: "LLM",
    expansion: "Large Language Model",
    category: "GenAI & LLM",
    definition: "Billions of parameters vachu massive internet text data mela train aana deep neural network (e.g. GPT-4, Claude, Gemini, Llama).",
    keyContext: "Next token prediction moolama human-like understanding & generation perform pannum."
  },
  {
    term: "LoRA",
    expansion: "Low-Rank Adaptation",
    category: "GenAI & LLM",
    definition: "Full model weights-ah update pannama, low-rank matrix decomposition moolama small adapter weights mattum fine-tune panra PEFT technique.",
    keyContext: "VRAM consumption 3x-4x koraikum, consumer GPUs-laye LLM fine-tuning saadhyam aakum."
  },
  {
    term: "QLoRA",
    expansion: "Quantized Low-Rank Adaptation",
    category: "GenAI & LLM",
    definition: "Base model-ah 4-bit NormalFloat (NF4) quantization-la load panni, adhan mela LoRA adapters attach panni train panra ultra memory-efficient method.",
    keyContext: "Single 24GB or 16GB GPU-laye 70B parameter models varaikkum fine-tune panna mudiyum."
  },
  {
    term: "RLHF",
    expansion: "Reinforcement Learning from Human Feedback",
    category: "GenAI & LLM",
    definition: "Human evaluators kodukkura ratings/comparisons-ah reward model-ah maathi, PPO algorithm moolama model alignment & safety optimize panra pipeline.",
    keyContext: "ChatGPT, Claude pondra models human-friendly and safe aaga irukka idhudhan base."
  },
  {
    term: "DPO",
    expansion: "Direct Preference Optimization",
    category: "GenAI & LLM",
    definition: "Separate reward model & complex reinforcement learning loop thevai illama, direct cross-entropy loss moolama preferred answers-ah tune panra algorithm.",
    keyContext: "RLHF-ku modern, stable and faster alternative."
  },
  {
    term: "PEFT",
    expansion: "Parameter-Efficient Fine-Tuning",
    category: "GenAI & LLM",
    definition: "Full base model weights-ah freeze pannitu, very small fraction (<1%) of parameters mattum tune panra general category of techniques (LoRA, Prefix Tuning, Adapters).",
    keyContext: "Compute cost & storage space-ah dramatic-ah save pannum."
  },
  {
    term: "MCP",
    expansion: "Model Context Protocol",
    category: "GenAI & LLM",
    definition: "Anthropic introduce panna open protocol. AI models external data sources, local files, tools, and enterprise servers kooda standardize aaga interact panna udhavum.",
    keyContext: "AI Agents and IDEs-ku universal tool-calling standard."
  },
  {
    term: "CoT",
    expansion: "Chain of Thought",
    category: "GenAI & LLM",
    definition: "Complex reasoning tasks-la LLM direct answer kudukama, step-by-step thinking process generate panna vekkura prompting technique.",
    keyContext: "Math, logic, and multi-hop questions-la accuracy drastically improve pannum."
  },
  {
    term: "ReAct",
    expansion: "Reasoning and Acting",
    category: "GenAI & LLM",
    definition: "Autonomous agent pattern: Model oru observation-ah pathu Reason (Thought) pannum, Action edukkum (Tool call), result-ah observe pannitu next step proceed pannum.",
    keyContext: "Modern autonomous agents (LangGraph, CrewAI) idhoda foundation."
  },
  {
    term: "TTS",
    expansion: "Text-to-Speech",
    category: "GenAI & LLM",
    definition: "Written text input-ah natural human-like voice audio wave-ah convert panra generative model architecture.",
    keyContext: "ElevenLabs, Whisper TTS, Kokoro AI."
  },
  {
    term: "STT / ASR",
    expansion: "Speech-to-Text / Automatic Speech Recognition",
    category: "GenAI & LLM",
    definition: "Spoken audio input-ah accurately text format-ku transcribe panra acoustic & language model (e.g. OpenAI Whisper).",
    keyContext: "Voice assistants and audio transcription systems."
  },

  // ML & Deep Learning
  {
    term: "ANN",
    expansion: "Artificial Neural Network",
    category: "ML & Deep Learning",
    definition: "Biological brain neurons inspire aagi create aana interconnected layers of nodes (Input, Hidden, Output) that learn patterns via backpropagation.",
    keyContext: "Foundational building block for all deep learning."
  },
  {
    term: "CNN",
    expansion: "Convolutional Neural Network",
    category: "ML & Deep Learning",
    definition: "Convolutional filters and pooling layers use panni spatial hierarchy & grid-like patterns (Images, Video frames) process panra neural network architecture.",
    keyContext: "Image classification, Object detection, Computer Vision tasks."
  },
  {
    term: "RNN",
    expansion: "Recurrent Neural Network",
    category: "ML & Deep Learning",
    definition: "Internal loop memory vachu sequential data (Time series, text) process panra architecture.",
    keyContext: "Vanishing gradient problem irundhadhaal LSTM and Transformers replace pannichu."
  },
  {
    term: "LSTM",
    expansion: "Long Short-Term Memory",
    category: "ML & Deep Learning",
    definition: "Input gate, Forget gate, and Output gate use panni long-range dependencies-ah retain panra specialized RNN architecture.",
    keyContext: "Stock prediction, speech, text processing."
  },
  {
    term: "GAN",
    expansion: "Generative Adversarial Network",
    category: "ML & Deep Learning",
    definition: "Generator (creates fake data) and Discriminator (spots fakes) rendum zero-sum game la compete panni realistic data synthesize panra model.",
    keyContext: "Deepfakes, image generation, style transfer."
  },
  {
    term: "VAE",
    expansion: "Variational Autoencoder",
    category: "ML & Deep Learning",
    definition: "Input data-va continuous probabilistic latent space-ku encode panni, anga irundhu new samples reconstruct & generate panra generative model.",
    keyContext: "Unsupervised learning and generative modeling."
  },
  {
    term: "SGD",
    expansion: "Stochastic Gradient Descent",
    category: "ML & Deep Learning",
    definition: "Loss function minimize panna, randomly sampled mini-batches moolama weights update panra fundamental optimization algorithm.",
    keyContext: "Adam, RMSprop pondra modern optimizers-kellam base."
  },
  {
    term: "SVM",
    expansion: "Support Vector Machine",
    category: "ML & Deep Learning",
    definition: "Data points-ah separate panna maximum margin hyper-plane kandupikkura powerful classical machine learning classifier.",
    keyContext: "Kernel trick moolama non-linear separation clean-ah pannum."
  },
  {
    term: "PCA",
    expansion: "Principal Component Analysis",
    category: "ML & Deep Learning",
    definition: "Maximum variance retain pannikittu, high-dimensional data-va lower dimensions-ku transform panra unsupervised dimensionality reduction method.",
    keyContext: "Data visualization and feature compression."
  },
  {
    term: "ROC-AUC",
    expansion: "Receiver Operating Characteristic — Area Under Curve",
    category: "ML & Deep Learning",
    definition: "Different classification thresholds la True Positive Rate vs False Positive Rate compare panni overall model performance measure panra metric.",
    keyContext: "Imbalanced datasets la accuracy vida best metric."
  },

  // NLP & Vision
  {
    term: "BERT",
    expansion: "Bidirectional Encoder Representations from Transformers",
    category: "NLP & Vision",
    definition: "Google create panna Transformer Encoder architecture. Sentences-ah left-to-right and right-to-left both directions la context capture pannum.",
    keyContext: "Search ranking, sentiment analysis, entity extraction."
  },
  {
    term: "ViT",
    expansion: "Vision Transformer",
    category: "NLP & Vision",
    definition: "Image-ah small 16x16 patches-ah cut panni, tokens maadiri sequence-ah Transformer encoder kulla pass panni process panra computer vision model.",
    keyContext: "Modern visual AI (CLIP, DALL-E, Gemini Vision) foundation."
  },
  {
    term: "CLIP",
    expansion: "Contrastive Language-Image Pre-training",
    category: "NLP & Vision",
    definition: "OpenAI create panna multi-modal model. Image and Text rendaiyum ore shared embedding space la align panni zero-shot classification perform pannum.",
    keyContext: "Stable Diffusion text-to-image conditioning-la key component."
  },
  {
    term: "TF-IDF",
    expansion: "Term Frequency — Inverse Document Frequency",
    category: "NLP & Vision",
    definition: "Oru word oru doc la evvalavu frequent and entire corpus la evvalavu rare nu measure panni numerical importance calculate panra classical NLP method.",
    keyContext: "BM25 keyword search engines foundation."
  },
  {
    term: "NER",
    expansion: "Named Entity Recognition",
    category: "NLP & Vision",
    definition: "Unstructured text la irundhu Names, Organizations, Locations, Dates pondra predefined categories-ah identify and classify panra task.",
    keyContext: "Information extraction and document processing."
  },

  // MLOps & Cloud
  {
    term: "MLOps",
    expansion: "Machine Learning Operations",
    category: "MLOps & Cloud",
    definition: "ML models-ah production-ku reliably deploy, monitor, automate, and retrain panna DevOps principles-ah ML workflow-la apply panra practice.",
    keyContext: "Model drift detection, CI/CD for models, automated pipelines."
  },
  {
    term: "LLMOps",
    expansion: "Large Language Model Operations",
    category: "MLOps & Cloud",
    definition: "LLM applications-kaga specific aana ops: Prompt versioning, latency & token usage tracking, guardrails, evaluations (Evals), and fine-tuning pipelines.",
    keyContext: "LangSmith, Phoenix Arize, Trulens, Weights & Biases."
  },
  {
    term: "vLLM",
    expansion: "Virtual Large Language Model (High-throughput Serving Engine)",
    category: "MLOps & Cloud",
    definition: "PagedAttention algorithm use panni GPU memory fragmentation thaduthu, LLM inference throughput-ah 10x-20x boost panra open-source serving engine.",
    keyContext: "Production LLM deployment standard."
  },
  {
    term: "Triton",
    expansion: "Triton Inference Server",
    category: "MLOps & Cloud",
    definition: "NVIDIA develop panna enterprise multi-framework (TensorRT, PyTorch, ONNX) inference serving system for CPUs and GPUs with dynamic batching.",
    keyContext: "Enterprise low-latency serving."
  },
  {
    term: "ONNX",
    expansion: "Open Neural Network Exchange",
    category: "MLOps & Cloud",
    definition: "PyTorch, TensorFlow, Scikit-learn pondra frameworks la train panna models-ah uniform open format la export panni optimized cross-platform execution panna udhavum.",
    keyContext: "Edge deployment, runtime optimization."
  },
  {
    term: "CI / CD",
    expansion: "Continuous Integration / Continuous Deployment",
    category: "MLOps & Cloud",
    definition: "Code and model changes-ah automatic-ah test panni, build panni, production environment-ku safely push panra automated workflow pipeline.",
    keyContext: "GitHub Actions, GitLab CI, Argo Workflows."
  },

  // CS & Systems
  {
    term: "CUDA",
    expansion: "Compute Unified Device Architecture",
    category: "CS & Systems",
    definition: "NVIDIA GPUs la general-purpose parallel computing execute panna use aagura hardware-accelerated programming platform and API.",
    keyContext: "Almost all deep learning frameworks rely on CUDA."
  },
  {
    term: "API",
    expansion: "Application Programming Interface",
    category: "CS & Systems",
    definition: "Two software programs thammukulle standardized requests & responses (REST, gRPC) moolama data communicate panna allow panra interface.",
    keyContext: "OpenAI API, HuggingFace Inference API, backend routes."
  },
  {
    term: "HNSW",
    expansion: "Hierarchical Navigable Small World",
    category: "CS & Systems",
    definition: "Multi-layer graph structure use panni high-dimensional vector embeddings-la ultra-fast Approximate Nearest Neighbor (ANN) search panra algorithm.",
    keyContext: "Pinecone, Qdrant, Milvus, Chroma vector databases core engine."
  },
  {
    term: "KV Cache",
    expansion: "Key-Value Cache",
    category: "CS & Systems",
    definition: "Autoregressive generation la past tokens oda attention Key and Value matrices-ah GPU memory la store panni redundant recalculation thavikkura technique.",
    keyContext: "LLM token generation speed-ah accelerate pannum."
  },
  {
    term: "FP16 / BF16 / INT8",
    expansion: "Floating Point 16 / Brain Floating Point 16 / Integer 8",
    category: "CS & Systems",
    definition: "Weights & activations-ah store panna use aagura precision formats. Lower bits use panna memory koraivaagum and speed adhigamaagum (Quantization).",
    keyContext: "BF16 modern LLM training standard, INT8/INT4 inference standard."
  }
];

