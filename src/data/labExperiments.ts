export interface LabStage {
  name: string;
  durationMs: number;
  log: string;
}

export interface LabItem {
  id: string;
  topicKeyword: string; // Used to match with roadmap topics!
  title: string;
  category: "Foundations" | "Machine Learning" | "Deep Learning" | "Computer Vision" | "NLP & Transformers" | "GenAI & LLMs" | "Agentic AI";
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  starterSnippet: string;
  expectedOutput: string;
  stages: LabStage[];
  tags: string[];
}

export const AI_LAB_EXPERIMENTS: LabItem[] = [
  {
    id: "lab-numpy-tensors",
    topicKeyword: "numpy",
    title: "NumPy Matrix Math & PyTorch GPU Tensors",
    category: "Foundations",
    description: "Hands-on vector operations, matrix dot products, and zero-copy GPU tensor allocation using CUDA.",
    difficulty: "Beginner",
    estimatedMinutes: 15,
    starterSnippet: `# NumPy & GPU Tensors Pipeline
import numpy as np

# 1. High-dimensional weight matrix
W = np.random.randn(512, 128)
x = np.random.randn(128, 1)

# 2. Vectorized dot product
output = np.dot(W, x)
print(f"Weights Matrix Shape: {W.shape}")
print(f"Forward Activation Shape: {output.shape}")
print(f"Top 3 Output Values:\n{output[:3]}")
`,
    expectedOutput: "Weights Matrix Shape: (512, 128)\nForward Activation Shape: (512, 1)\nTop 3 Output Values:\n[[ 1.4284]\n [-0.8521]\n [ 0.3197]]",
    stages: [
      { name: "Allocating Memory Matrix", durationMs: 400, log: "Allocating 512x128 float64 buffer in system RAM..." },
      { name: "Vectorized Dot Product", durationMs: 600, log: "Executing SIMD BLAS matrix multiplication..." },
      { name: "Computing Activations", durationMs: 400, log: "Forward pass computed. Metrics verified." }
    ],
    tags: ["NumPy", "Tensors", "Math"],
  },
  {
    id: "lab-pandas-eda",
    topicKeyword: "pandas",
    title: "Pandas Data Wrangling & Feature Engineering",
    category: "Foundations",
    description: "Dataframe profiling, missing values imputation, standard normalization, and correlation heatmaps.",
    difficulty: "Beginner",
    estimatedMinutes: 15,
    starterSnippet: `# Feature Engineering & Preprocessing
features = ["loss", "learning_rate", "batch_size", "accuracy"]
samples = [
    {"loss": 0.42, "learning_rate": 0.001, "batch_size": 32, "accuracy": 0.88},
    {"loss": 0.18, "learning_rate": 0.0005, "batch_size": 64, "accuracy": 0.94},
    {"loss": 0.09, "learning_rate": 0.0001, "batch_size": 128, "accuracy": 0.97},
]

print("Processed Dataset Summary:")
print(f"Total Rows: {len(samples)} | Features Tracked: {len(features)}")
for idx, row in enumerate(samples, 1):
    print(f"  Sample #{idx} -> Loss: {row['loss']}, Accuracy: {row['accuracy']*100:.1f}%")
`,
    expectedOutput: "Processed Dataset Summary:\nTotal Rows: 3 | Features Tracked: 4\n  Sample #1 -> Loss: 0.42, Accuracy: 88.0%\n  Sample #2 -> Loss: 0.18, Accuracy: 94.0%\n  Sample #3 -> Loss: 0.09, Accuracy: 97.0%",
    stages: [
      { name: "Ingesting Tabular Data", durationMs: 300, log: "Loading dataset batch..." },
      { name: "Feature Extraction", durationMs: 500, log: "Computing normalized feature vector distribution..." },
      { name: "Validation Complete", durationMs: 300, log: "Preprocessing pipeline verified successfully." }
    ],
    tags: ["Pandas", "EDA", "Data Engineering"],
  },
  {
    id: "lab-sklearn-classifier",
    topicKeyword: "scikit-learn",
    title: "Random Forest Classifier Pipeline",
    category: "Machine Learning",
    description: "Train a multi-class Random Forest model with train-test split, accuracy scoring, and decision tree ensembles.",
    difficulty: "Beginner",
    estimatedMinutes: 20,
    starterSnippet: `# Scikit-Learn Model Training & Evaluation
# Simulated Random Forest Ensemble on 150 instances
n_estimators = 50
features_dim = 4
classes = ["Setosa", "Versicolor", "Virginica"]

# Training simulation
accuracy = 0.9667
f1_score = 0.9654

print(f"Ensemble: RandomForest (trees={n_estimators})")
print(f"Input Feature Dimensions: {features_dim}")
print(f"Test Set Accuracy: {accuracy * 100:.2f}%")
print(f"Macro F1-Score:    {f1_score:.4f}")
print("Confusion Matrix: 30/30 Test Samples Classified Correctly")
`,
    expectedOutput: "Ensemble: RandomForest (trees=50)\nInput Feature Dimensions: 4\nTest Set Accuracy: 96.67%\nMacro F1-Score:    0.9654\nConfusion Matrix: 30/30 Test Samples Classified Correctly",
    stages: [
      { name: "Building Decision Trees", durationMs: 500, log: "Constructing 50 randomized decision trees..." },
      { name: "Fitting Ensembles", durationMs: 700, log: "Evaluating Gini impurity on bootstrap splits..." },
      { name: "Validation Metrics", durationMs: 400, log: "Test split evaluated. High accuracy reached." }
    ],
    tags: ["Scikit-Learn", "Random Forest", "Supervised ML"],
  },
  {
    id: "lab-pytorch-nn",
    topicKeyword: "pytorch",
    title: "PyTorch Deep MLP with Autograd",
    category: "Deep Learning",
    description: "Multi-layer perceptron (MLP) with ReLU non-linearity, forward graph tracing, and backward gradient descent.",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    starterSnippet: `# PyTorch Mini Network & Gradients
layers = ["Linear(128 -> 256)", "ReLU()", "Linear(256 -> 64)", "Linear(64 -> 10)"]
trainable_params = 128*256 + 256*64 + 64*10 + (256 + 64 + 10)
initial_loss = 2.45
trained_loss = 0.31

print(f"Model Architecture:\n  {' -> '.join(layers)}")
print(f"Total Parameters: {trainable_params:,}")
print(f"Epoch 1 Loss: {initial_loss:.4f} (Random Init)")
print(f"Epoch 10 Loss: {trained_loss:.4f} (Converged on GPU)")
`,
    expectedOutput: "Model Architecture:\n  Linear(128 -> 256) -> ReLU() -> Linear(256 -> 64) -> Linear(64 -> 10)\nTotal Parameters: 49,994\nEpoch 1 Loss: 2.4500 (Random Init)\nEpoch 10 Loss: 0.3100 (Converged on GPU)",
    stages: [
      { name: "Constructing CUDA Computation Graph", durationMs: 500, log: "Registering weights on GPU VRAM..." },
      { name: "Backpropagation Autograd", durationMs: 800, log: "Tracing partial derivatives dL/dW via PyTorch autograd..." },
      { name: "Adam Optimizer Step", durationMs: 400, log: "Weights updated. Loss dropped to 0.3100." }
    ],
    tags: ["PyTorch", "Deep Learning", "Autograd"],
  },
  {
    id: "lab-transformer-attention",
    topicKeyword: "transformer",
    title: "Scaled Dot-Product Self-Attention (Q, K, V)",
    category: "NLP & Transformers",
    description: "Calculate query, key, and value projections with softmax normalization and attention weight matrix heatmap.",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    starterSnippet: `# Scaled Dot-Product Attention (Q, K, V)
tokens = ["The", "AI", "Agent", "Learns"]
seq_len = len(tokens)
d_model = 64
scale_factor = 8.0 # sqrt(64)

print(f"Token Sequence: {tokens} (seq_len={seq_len})")
print(f"Q, K, V Hidden Dimension: {d_model}")
print("\nComputed Attention Matrix (Softmax normalized):")
matrix = [
    [0.72, 0.18, 0.06, 0.04],
    [0.12, 0.65, 0.15, 0.08],
    [0.08, 0.22, 0.58, 0.12],
    [0.05, 0.14, 0.21, 0.60]
]
for t, row in zip(tokens, matrix):
    row_str = " ".join(f"{v:.2f}" for v in row)
    print(f"  {t:>6}: [{row_str}]")
`,
    expectedOutput: "Token Sequence: ['The', 'AI', 'Agent', 'Learns'] (seq_len=4)\nQ, K, V Hidden Dimension: 64\n\nComputed Attention Matrix (Softmax normalized):\n     The: [0.72 0.18 0.06 0.04]\n      AI: [0.12 0.65 0.15 0.08]\n   Agent: [0.08 0.22 0.58 0.12]\n  Learns: [0.05 0.14 0.21 0.60]",
    stages: [
      { name: "Projecting Q, K, V Vectors", durationMs: 400, log: "Linear transformation to d_k subspace..." },
      { name: "Scaled Dot-Product (Q * K^T / sqrt(d_k))", durationMs: 700, log: "Matrix dot product on tensor cores..." },
      { name: "Applying Softmax & Value Weighting", durationMs: 400, log: "Context representation synthesized." }
    ],
    tags: ["Transformers", "Attention", "NLP"],
  },
  {
    id: "lab-llm-rag-pipeline",
    topicKeyword: "rag",
    title: "RAG Vector Search & Context Retrieval",
    category: "GenAI & LLMs",
    description: "Generate embeddings, compute cosine similarities in vector space, and ground LLM prompts with top context.",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    starterSnippet: `# RAG Vector Cosine Similarity Search
query = "How do we deploy deep learning models on cloud GPUs?"
knowledge_base = [
    ("Doc 1", "Baking Italian sourdough pizza requires 80% hydration and high heat.", 0.12),
    ("Doc 2", "GPU deployment on AWS EC2 G4dn uses NVIDIA T4 with TensorRT inference.", 0.94),
    ("Doc 3", "Quantum superposition relies on qubit states collapsing upon measurement.", 0.08),
]

print(f"User Query: '{query}'")
print("\nRetrieved Knowledge Chunks by Cosine Similarity:")
for doc_id, text, score in knowledge_base:
    match_bar = "█" * int(score * 15)
    print(f"  [{score:.2f}] {doc_id}: {text[:50]}... {match_bar}")

top_chunk = max(knowledge_base, key=lambda x: x[2])
print(f"\nTop Context Injected to LLM Prompt: [{top_chunk[0]}] (Score: {top_chunk[2]})")
`,
    expectedOutput: "User Query: 'How do we deploy deep learning models on cloud GPUs?'\n\nRetrieved Knowledge Chunks by Cosine Similarity:\n  [0.12] Doc 1: Baking Italian sourdough pizza requires 80% hydra... █\n  [0.94] Doc 2: GPU deployment on AWS EC2 G4dn uses NVIDIA T4 wi... ██████████████\n  [0.08] Doc 3: Quantum superposition relies on qubit states coll... █\n\nTop Context Injected to LLM Prompt: [Doc 2] (Score: 0.94)",
    stages: [
      { name: "Generating 768-dim Vector Embeddings", durationMs: 500, log: "Embedding prompt into semantic latent space..." },
      { name: "Cosine Similarity Query", durationMs: 600, log: "Scanning vector indexes for top-K matches..." },
      { name: "Prompt Grounding Complete", durationMs: 400, log: "Context chunk injected into LLM context window." }
    ],
    tags: ["RAG", "Vector Search", "Embeddings", "LLM"],
  },
  {
    id: "lab-lora-finetuning",
    topicKeyword: "fine-tuning",
    title: "LoRA Parameter-Efficient Fine-Tuning (PEFT)",
    category: "GenAI & LLMs",
    description: "Freeze 7B base weights and train lightweight Low-Rank Adaptation matrices (rank=8, alpha=16) on GPU.",
    difficulty: "Advanced",
    estimatedMinutes: 30,
    starterSnippet: `# LoRA Rank-Decomposition Matrix Simulation
base_model_params = 7_000_000_000 # 7 Billion
lora_rank = 8
lora_trainable_params = 4_200_000 # Only 4.2 Million!
reduction_pct = (1 - (lora_trainable_params / base_model_params)) * 100

print(f"Base LLM Total Weights: {base_model_params:,} (Frozen ❄️)")
print(f"LoRA Adapter Matrices (r={lora_rank}): {lora_trainable_params:,} (Trainable 🔥)")
print(f"VRAM Reduction: {reduction_pct:.2f}% memory saved!")
print("Fine-tuning Status: Ready on 1x NVIDIA Tesla T4 (15.36 GB VRAM)")
`,
    expectedOutput: "Base LLM Total Weights: 7,000,000,000 (Frozen ❄️)\nLoRA Adapter Matrices (r=8): 4,200,000 (Trainable 🔥)\nVRAM Reduction: 99.94% memory saved!\nFine-tuning Status: Ready on 1x NVIDIA Tesla T4 (15.36 GB VRAM)",
    stages: [
      { name: "Freezing Base 7B Weights", durationMs: 400, log: "Applying requires_grad=False across transformer backbone..." },
      { name: "Injecting Low-Rank A & B Adapters", durationMs: 600, log: "Initializing LoRA rank=8 decomposition matrices..." },
      { name: "Memory Optimization Verified", durationMs: 400, log: "99.94% parameters frozen. Ready for training." }
    ],
    tags: ["LoRA", "Fine-Tuning", "PEFT", "LLM"],
  },
  {
    id: "lab-agent-tool-calling",
    topicKeyword: "agent",
    title: "Autonomous Agentic Loop & Tool Execution",
    category: "Agentic AI",
    description: "Multi-turn autonomous ReAct loop: Observation -> Reasoning -> Action (Function Calling) -> Reflection.",
    difficulty: "Advanced",
    estimatedMinutes: 30,
    starterSnippet: `# Autonomous Agentic ReAct Cycle
goal = "Find current exchange rate of USD to INR and calculate cost of 50 units."
print(f"Agent Goal: {goal}\n")

print("Step 1 [THINK]: I need to fetch the real-time conversion rate via fx_api tool.")
print("Step 2 [ACT]:   Invoking fx_api(from='USD', to='INR')...")
rate = 84.50
print(f"Step 3 [OBSERVE]: Result returned: 1 USD = ₹{rate:.2f}")

print("Step 4 [THINK]: Now calculate total for 50 units: 50 * 84.50.")
total = 50 * rate
print(f"Step 5 [ANSWER]: Total cost for 50 units is ₹{total:,.2f} INR.")
`,
    expectedOutput: "Agent Goal: Find current exchange rate of USD to INR and calculate cost of 50 units.\n\nStep 1 [THINK]: I need to fetch the real-time conversion rate via fx_api tool.\nStep 2 [ACT]:   Invoking fx_api(from='USD', to='INR')...\nStep 3 [OBSERVE]: Result returned: 1 USD = ₹84.50\nStep 4 [THINK]: Now calculate total for 50 units: 50 * 84.50.\nStep 5 [ANSWER]: Total cost for 50 units is ₹4,225.00 INR.",
    stages: [
      { name: "Parsing Agent System Prompt", durationMs: 400, log: "Loading available tools & JSON schema..." },
      { name: "Executing ReAct Reason & Act Loop", durationMs: 800, log: "Evaluating tool invocation request..." },
      { name: "Agent Reflection Complete", durationMs: 400, log: "Goal achieved with validated final response." }
    ],
    tags: ["Agentic AI", "Function Calling", "ReAct"],
  },
];

import { generateDynamicLabForTopic } from "./dynamicLabGenerator";

// Helper function to find or dynamically generate a matching Lab for ANY topic
export function getLabForTopic(topicName: string): LabItem {
  const lower = topicName.toLowerCase();
  const found = AI_LAB_EXPERIMENTS.find((lab) => {
    return lower.includes(lab.topicKeyword) || lab.tags.some((tag) => lower.includes(tag.toLowerCase()));
  });
  if (found) return found;

  // Generate dynamic, topic-specific lab code and stages!
  return generateDynamicLabForTopic(topicName);
}
