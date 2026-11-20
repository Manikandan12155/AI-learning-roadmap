export interface LabItem {
  id: string;
  title: string;
  category: "Foundations" | "Machine Learning" | "Deep Learning" | "GenAI & LLMs" | "Agentic AI";
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  colabUrl: string;
  kaggleSearchQuery: string;
  starterSnippet: string;
  expectedOutput: string;
  tags: string[];
}

export const AI_LAB_EXPERIMENTS: LabItem[] = [
  {
    id: "lab-numpy-tensors",
    title: "NumPy Matrix Math to PyTorch Tensors",
    category: "Foundations",
    description: "Learn how weights, dot products, and multi-dimensional matrices transform from raw NumPy arrays into GPU-accelerated PyTorch tensors.",
    difficulty: "Beginner",
    estimatedMinutes: 15,
    colabUrl: "https://colab.research.google.com/#create=true",
    kaggleSearchQuery: "numpy pytorch tensor operations beginner",
    starterSnippet: `# Matrix Multiplication & Tensors
import numpy as np

# 1. Create weight matrix & input vector
W = np.random.randn(3, 4)
x = np.random.randn(4, 1)

# 2. Forward dot product
output = np.dot(W, x)
print("Weight shape:", W.shape)
print("Output vector:\\n", output)
`,
    expectedOutput: "Weight shape: (3, 4)\nOutput vector:\n [[...], [...], [...]]",
    tags: ["NumPy", "Tensors", "Math", "Linear Algebra"],
  },
  {
    id: "lab-sklearn-classifier",
    title: "Scikit-Learn Classification Pipeline",
    category: "Machine Learning",
    description: "Train a Random Forest classifier on Iris/Wine data with train-test split, accuracy metrics, and confusion matrix visualization.",
    difficulty: "Beginner",
    estimatedMinutes: 20,
    colabUrl: "https://colab.research.google.com/#create=true",
    kaggleSearchQuery: "scikit-learn classification random forest beginner",
    starterSnippet: `# Random Forest on Iris Dataset
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=50, random_state=42)
clf.fit(X_train, y_train)
preds = clf.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, preds) * 100:.2f}%")
`,
    expectedOutput: "Model Accuracy: 100.00%",
    tags: ["Scikit-Learn", "RandomForest", "Supervised ML"],
  },
  {
    id: "lab-pytorch-nn",
    title: "Build a Deep Neural Network from Scratch",
    category: "Deep Learning",
    description: "Create a multi-layer perceptron (MLP) with ReLU activations and backpropagation using PyTorch autograd engine.",
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    colabUrl: "https://colab.research.google.com/#create=true",
    kaggleSearchQuery: "pytorch neural network from scratch mlp",
    starterSnippet: `# PyTorch Mini Neural Network
import torch
import torch.nn as nn

class MiniNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 32)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(32, 2)
        
    def forward(self, x):
        return self.fc2(self.relu(self.fc1(x)))

model = MiniNet()
dummy_in = torch.randn(4, 10)
out = model(dummy_in)
print("Forward Pass Shape:", out.shape)
print("Parameters count:", sum(p.numel() for p in model.parameters()))
`,
    expectedOutput: "Forward Pass Shape: torch.Size([4, 2])\nParameters count: 418",
    tags: ["PyTorch", "Backpropagation", "Neural Networks"],
  },
  {
    id: "lab-llm-rag-pipeline",
    title: "Lightweight RAG (Retrieval-Augmented Generation)",
    category: "GenAI & LLMs",
    description: "Generate embeddings, store them in a local vector array, and query the most relevant context chunk to ground an LLM prompt.",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    colabUrl: "https://colab.research.google.com/#create=true",
    kaggleSearchQuery: "rag retrieval augmented generation langchain",
    starterSnippet: `# Conceptual Vector Cosine Similarity
import numpy as np

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Mock embeddings for 3 docs & query
doc_embeddings = {
    "Doc 1 (Cooking)": np.array([0.1, 0.9, 0.2]),
    "Doc 2 (Deep Learning)": np.array([0.9, 0.1, 0.8]),
    "Doc 3 (Quantum Physics)": np.array([0.8, 0.2, 0.1]),
}
query = np.array([0.95, 0.05, 0.75]) # "How do neural networks train?"

scores = {k: cosine_sim(v, query) for k, v in doc_embeddings.items()}
best_match = max(scores, key=scores.get)
print("Query match scores:")
for k, v in scores.items():
    print(f"  {k}: {v:.4f}")
print(f"\\nRetrieved Top Context: {best_match}")
`,
    expectedOutput: "Query match scores:\n  Doc 1 (Cooking): 0.2647\n  Doc 2 (Deep Learning): 0.9996\n  Doc 3 (Quantum Physics): 0.7712\n\nRetrieved Top Context: Doc 2 (Deep Learning)",
    tags: ["RAG", "Vector Search", "Embeddings", "LLM"],
  },
  {
    id: "lab-agent-tool-calling",
    title: "Agentic Loop with Tool Execution",
    category: "Agentic AI",
    description: "Simulate an autonomous agent that takes a user question, decides which tool to invoke, executes it, and reflects on the final answer.",
    difficulty: "Advanced",
    estimatedMinutes: 30,
    colabUrl: "https://colab.research.google.com/#create=true",
    kaggleSearchQuery: "agentic ai tool calling python langchain",
    starterSnippet: `# Minimal Autonomous Agent Loop
import json

def get_weather(city: str):
    return f"Weather in {city}: 28°C, Partly Cloudy."

def calculate(expr: str):
    return eval(expr)

tools = {
    "get_weather": get_weather,
    "calculate": calculate
}

# Simulated LLM Thought & Decision
step_thought = "I need to check the weather of Chennai and calculate temperature in Fahrenheit."
tool_call = {"tool": "get_weather", "arg": "Chennai"}

# Tool execution
res = tools[tool_call["tool"]](tool_call["arg"])
print("Step 1 Thought:", step_thought)
print("Tool Invocation:", tool_call)
print("Tool Result:", res)
`,
    expectedOutput: "Step 1 Thought: I need to check the weather of Chennai and calculate temperature in Fahrenheit.\nTool Invocation: {'tool': 'get_weather', 'arg': 'Chennai'}\nTool Result: Weather in Chennai: 28°C, Partly Cloudy.",
    tags: ["Agentic AI", "Function Calling", "Autonomous Agents"],
  },
];

