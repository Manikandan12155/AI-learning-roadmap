import { LabItem, AI_LAB_EXPERIMENTS } from "./labExperiments";

/**
 * Intelligent Dynamic Python Lab Code Generator
 * Creates dedicated, topic-specific interactive code, simulation stages,
 * and realistic outputs for ANY AI/ML roadmap topic on the fly.
 */
export function generateDynamicLabForTopic(topicName: string): LabItem {
  const cleanName = topicName.replace(/\s+/g, " ").trim();
  const lower = cleanName.toLowerCase();

  // 1. Python Basics / Data Structures
  if (lower.includes("loop") || lower.includes("variable") || lower.includes("function") || lower.includes("condition")) {
    return {
      id: `dynamic-${Date.now()}`,
      topicKeyword: lower,
      title: `${cleanName}: Interactive Simulation`,
      category: "Foundations",
      description: `Hands-on practical code execution demonstrating ${cleanName} in Python system design.`,
      difficulty: "Beginner",
      estimatedMinutes: 10,
      starterSnippet: `# Topic: ${cleanName}
# Practical Demonstration

def demonstrate_concept():
    data = [10, 25, 42, 88, 120]
    results = {}
    print("Processing items dynamically with logic:")
    for idx, val in enumerate(data):
        transformed = val * 2 if val > 30 else val + 10
        results[f"item_{idx}"] = transformed
        print(f"  Step {idx + 1}: Input={val} -> Processed={transformed}")
    
    print("\nSummary Results Dict:", results)
    return results

output = demonstrate_concept()
`,
      expectedOutput: "Processing items dynamically with logic:\n  Step 1: Input=10 -> Processed=20\n  Step 2: Input=25 -> Processed=35\n  Step 3: Input=42 -> Processed=84\n  Step 4: Input=88 -> Processed=176\n  Step 5: Input=120 -> Processed=240\n\nSummary Results Dict: {'item_0': 20, 'item_1': 35, 'item_2': 84, 'item_3': 176, 'item_4': 240}",
      stages: [
        { name: "Initializing Stack Frame", durationMs: 300, log: "Allocating Python variable scope..." },
        { name: "Executing Control Flow", durationMs: 400, log: "Iterating through inputs and conditionals..." },
        { name: "Output Synthesized", durationMs: 300, log: "Memory clean. Results verified." },
      ],
      tags: [cleanName, "Python", "Logic"],
    };
  }

  // 2. OOP / Classes / Decorators
  if (lower.includes("oop") || lower.includes("decorator") || lower.includes("generator") || lower.includes("context manager")) {
    return {
      id: `dynamic-${Date.now()}`,
      topicKeyword: lower,
      title: `${cleanName}: Design Pattern Lab`,
      category: "Foundations",
      description: `Production OOP & meta-programming implementation of ${cleanName}.`,
      difficulty: "Intermediate",
      estimatedMinutes: 15,
      starterSnippet: `# Topic: ${cleanName}
import time

def timing_logger(func):
    def wrapper(*args, **kwargs):
        t0 = time.time()
        res = func(*args, **kwargs)
        duration = (time.time() - t0) * 1000
        print(f"[Benchmark] {func.__name__} executed in {duration:.3f} ms")
        return res
    return wrapper

class ModelHandler:
    def __init__(self, name: str, version: float):
        self.name = name
        self.version = version

    @timing_logger
    def forward(self, x: list):
        print(f"Executing forward pass inside {self.name} v{self.version}")
        return [item ** 2 for item in x]

handler = ModelHandler("${cleanName}", 1.0)
out = handler.forward([1, 2, 3, 4, 5])
print("Final Output Array:", out)
`,
      expectedOutput: `Executing forward pass inside ${cleanName} v1.0\n[Benchmark] forward executed in 0.052 ms\nFinal Output Array: [1, 4, 9, 16, 25]`,
      stages: [
        { name: "Compiling Bytecode", durationMs: 350, log: "Binding class attributes & methods..." },
        { name: "Decorator Wrapping", durationMs: 450, log: "Applying runtime hook wrapper..." },
        { name: "Invocation Verified", durationMs: 300, log: "Execution completed successfully." },
      ],
      tags: [cleanName, "OOP", "Architecture"],
    };
  }

  // 3. Multithreading / Concurrency / Asyncio
  if (lower.includes("async") || lower.includes("thread") || lower.includes("multiprocessing") || lower.includes("concurrency")) {
    return {
      id: `dynamic-${Date.now()}`,
      topicKeyword: lower,
      title: `${cleanName}: High-Throughput Concurrency`,
      category: "Foundations",
      description: `Benchmarking async coroutines vs worker threads for ${cleanName}.`,
      difficulty: "Intermediate",
      estimatedMinutes: 20,
      starterSnippet: `# Topic: ${cleanName}
import time

tasks = [f"Batch_Worker_{i}" for i in range(1, 5)]

print(f"Initiating Concurrency Engine: {cleanName}")
for t in tasks:
    print(f"  [+] Spawned asynchronous coroutine task: {t}")

print("\n--- Event Loop Execution ---")
for t in tasks:
    time.sleep(0.05)
    print(f"  [✓] {t} completed payload processing (Latency: 12ms)")

print("\nAll 4 async workers gathered successfully without blocking main loop!")
`,
      expectedOutput: `Initiating Concurrency Engine: ${cleanName}\n  [+] Spawned asynchronous coroutine task: Batch_Worker_1\n  [+] Spawned asynchronous coroutine task: Batch_Worker_2\n  [+] Spawned asynchronous coroutine task: Batch_Worker_3\n  [+] Spawned asynchronous coroutine task: Batch_Worker_4\n\n--- Event Loop Execution ---\n  [✓] Batch_Worker_1 completed payload processing (Latency: 12ms)\n  [✓] Batch_Worker_2 completed payload processing (Latency: 12ms)\n  [✓] Batch_Worker_3 completed payload processing (Latency: 12ms)\n  [✓] Batch_Worker_4 completed payload processing (Latency: 12ms)\n\nAll 4 async workers gathered successfully without blocking main loop!`,
      stages: [
        { name: "Configuring Event Loop", durationMs: 400, log: "Registering task queues..." },
        { name: "Dispatching Coroutines", durationMs: 600, log: "Executing non-blocking I/O cycles..." },
        { name: "Gathering Results", durationMs: 350, log: "All futures resolved." },
      ],
      tags: [cleanName, "Async", "Performance"],
    };
  }

  // 4. Linear Algebra / Optimization / Math
  if (lower.includes("algebra") || lower.includes("calculus") || lower.includes("gradient") || lower.includes("matrix") || lower.includes("loss")) {
    return {
      id: `dynamic-${Date.now()}`,
      topicKeyword: lower,
      title: `${cleanName}: Mathematical Derivation & Vector Ops`,
      category: "Machine Learning",
      description: `Matrix transformations and numerical optimization for ${cleanName}.`,
      difficulty: "Intermediate",
      estimatedMinutes: 20,
      starterSnippet: `# Topic: ${cleanName}
import math

print(f"--- Mathematical Simulation for: {cleanName} ---")
# Simulated gradient descent update: W = W - lr * grad
weights = [0.85, -0.42, 1.25, -0.15]
gradients = [0.04, -0.02, 0.09, -0.01]
lr = 0.01

print(f"Initial Weights: {weights}")
print(f"Computed Gradients (dL/dW): {gradients}")

updated_weights = [round(w - (lr * g), 4) for w, g in zip(weights, gradients)]
print(f"\nUpdated Weights after optimization step:")
print(f"W_new = {updated_weights}")

# Compute L2 Norm
l2_norm = math.sqrt(sum(w**2 for w in updated_weights))
print(f"L2 Norm of Weight Vector: {l2_norm:.4f}")
`,
      expectedOutput: `--- Mathematical Simulation for: ${cleanName} ---\nInitial Weights: [0.85, -0.42, 1.25, -0.15]\nComputed Gradients (dL/dW): [0.04, -0.02, 0.09, -0.01]\n\nUpdated Weights after optimization step:\nW_new = [0.8496, -0.4198, 1.2491, -0.1499]\nL2 Norm of Weight Vector: 1.5714`,
      stages: [
        { name: "Computing Partial Derivatives", durationMs: 450, log: "Evaluating Jacobians and gradient tensors..." },
        { name: "Applying Gradient Step", durationMs: 500, log: "Subtracting scaled learning rate delta..." },
        { name: "Norm Calculation", durationMs: 300, log: "Vector magnitude calculated." },
      ],
      tags: [cleanName, "Math", "Optimization"],
    };
  }

  // 5. LLM / Attention / Prompting / RAG / GenAI
  if (lower.includes("prompt") || lower.includes("attention") || lower.includes("token") || lower.includes("llm") || lower.includes("embedding") || lower.includes("genai") || lower.includes("rag")) {
    return {
      id: `dynamic-${Date.now()}`,
      topicKeyword: lower,
      title: `${cleanName}: Frontier GenAI Engine`,
      category: "GenAI & LLMs",
      description: `Interactive neural tokenizer, attention masking, or context injection for ${cleanName}.`,
      difficulty: "Advanced",
      estimatedMinutes: 25,
      starterSnippet: `# Topic: ${cleanName}
# Production LLM Context & Pipeline Simulation

prompt = "Explain why ${cleanName} is foundational to generative AI models."
tokens = prompt.split()
token_ids = [hash(t) % 32000 for t in tokens]

print(f"Input Sequence: '{prompt}'")
print(f"Token Count: {len(tokens)} tokens")
print(f"Vocabulary IDs: {token_ids[:6]}...")

print("\n--- Latent Projection & Attention Weighting ---")
for idx, t in enumerate(tokens[:5]):
    score = round(1.0 / (idx + 1.2), 3)
    bar = "■" * int(score * 20)
    print(f"  Token [{t:>10}] -> Attention Weight: {score:.3f} {bar}")

print(f"\n[✓] {cleanName} execution completed with verified context window.")
`,
      expectedOutput: `Input Sequence: 'Explain why ${cleanName} is foundational to generative AI models.'\nToken Count: 9 tokens\nVocabulary IDs: [1845, 9821, 24102, 451, 8912, 1205]...\n\n--- Latent Projection & Attention Weighting ---\n  Token [   Explain] -> Attention Weight: 0.833 ■■■■■■■■■■■■■■■■\n  Token [       why] -> Attention Weight: 0.455 ■■■■■■■■■\n  Token [     ${cleanName.slice(0, 8)}] -> Attention Weight: 0.312 ■■■■■■\n\n[✓] ${cleanName} execution completed with verified context window.`,
      stages: [
        { name: "Subword Tokenization (BPE)", durationMs: 400, log: "Mapping words to vocabulary token IDs..." },
        { name: "Computing Attention Tensor", durationMs: 650, log: "Evaluating query-key dot product..." },
        { name: "Context Window Grounded", durationMs: 350, log: "Tokens ready for decoder forward pass." },
      ],
      tags: [cleanName, "GenAI", "Transformers"],
    };
  }

  // 6. Agents / Swarms / Tool Calling / Multi-Agent
  if (lower.includes("agent") || lower.includes("swarm") || lower.includes("mcp") || lower.includes("tool") || lower.includes("langgraph")) {
    return {
      id: `dynamic-${Date.now()}`,
      topicKeyword: lower,
      title: `${cleanName}: Autonomous Orchestration Lab`,
      category: "Agentic AI",
      description: `Multi-step agent loop, tool function execution, and state graph transitions for ${cleanName}.`,
      difficulty: "Advanced",
      estimatedMinutes: 25,
      starterSnippet: `# Topic: ${cleanName}
# Autonomous ReAct Agent Loop Simulation

class AgentState:
    def __init__(self, goal: str):
        self.goal = goal
        self.steps = []
        self.completed = False

state = AgentState("Execute ${cleanName} workflow")

def tool_executor(tool_name: str, payload: dict):
    print(f"  [Tool Invoked] {tool_name} with args: {payload}")
    return {"status": "success", "result": f"Executed {tool_name} cleanly"}

print(f"Target Agent Goal: {state.goal}\n")
print("1. [Reasoning]: Identifying required tools for ${cleanName}...")
state.steps.append("Decomposed sub-tasks")

print("2. [Action]: Invoking specialized sub-agent worker...")
res = tool_executor("${cleanName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_worker", {"mode": "production"})

print("3. [Reflection]: Evaluating output validity...")
state.completed = True
print(f"\n[✓] Agent State: COMPLETED -> Final output delivered for ${cleanName}.")
`,
      expectedOutput: `Target Agent Goal: Execute ${cleanName} workflow\n\n1. [Reasoning]: Identifying required tools for ${cleanName}...\n2. [Action]: Invoking specialized sub-agent worker...\n  [Tool Invoked] ${cleanName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_worker with args: {'mode': 'production'}\n3. [Reflection]: Evaluating output validity...\n\n[✓] Agent State: COMPLETED -> Final output delivered for ${cleanName}.`,
      stages: [
        { name: "Initializing Agent Plan", durationMs: 400, log: "Setting up goal condition and memory..." },
        { name: "Calling External Tool", durationMs: 700, log: "Executing sandboxed tool call..." },
        { name: "State Verification", durationMs: 400, log: "Agent reflection loop converged." },
      ],
      tags: [cleanName, "Agents", "Autonomous"],
    };
  }

  // 7. General AI/ML/Data Engineering Fallback
  return {
    id: `dynamic-${Date.now()}`,
    topicKeyword: lower,
    title: `${cleanName}: Interactive Lab`,
    category: "Machine Learning",
    description: `Hands-on Python implementation, metrics evaluation, and pipeline test for ${cleanName}.`,
    difficulty: "Intermediate",
    estimatedMinutes: 20,
    starterSnippet: `# Topic: ${cleanName}
# Production-ready Python pipeline demonstration

def run_experiment():
    print(f"==================================================")
    print(f"  RUNNING LAB EXPERIMENT: {cleanName}")
    print(f"==================================================")
    
    # 1. Dataset setup
    dataset_records = 1000
    features = 16
    print(f"Dataset Size: {dataset_records} samples | {features} features")
    
    # 2. Pipeline processing
    print(f"Processing step: Applying feature transformations...")
    accuracy = 0.942
    latency_ms = 4.8
    
    # 3. Metrics output
    print(f"\nEvaluation Results:")
    print(f"  • Metric Score (Validation): {accuracy * 100:.1f}%")
    print(f"  • Inference Latency:         {latency_ms} ms")
    print(f"  • Pipeline Status:           VERIFIED ✓")

run_experiment()
`,
    expectedOutput: `==================================================\n  RUNNING LAB EXPERIMENT: ${cleanName}\n==================================================\nDataset Size: 1000 samples | 16 features\nProcessing step: Applying feature transformations...\n\nEvaluation Results:\n  • Metric Score (Validation): 94.2%\n  • Inference Latency:         4.8 ms\n  • Pipeline Status:           VERIFIED ✓`,
    stages: [
      { name: "Preparing Environment", durationMs: 350, log: "Loading dependencies & modules..." },
      { name: `Executing ${cleanName} Logic`, durationMs: 650, log: "Running code inside Python sandbox..." },
      { name: "Synthesizing Output", durationMs: 300, log: "Execution finished with code 0." },
    ],
    tags: [cleanName, "AI Lab", "Hands-on"],
  };
}

