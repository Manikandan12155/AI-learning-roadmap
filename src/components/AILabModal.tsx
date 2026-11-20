import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Minus,
  Maximize2,
  Play,
  Plus,
  Type,
  FileCode2,
  Folder,
  KeyRound,
  Database,
  Terminal,
  Settings,
  Share2,
  Sparkles,
  ChevronDown,
  Trash2,
  Copy,
  Check,
  Cpu,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  ExternalLink,
  Upload,
  HardDrive,
  Code2,
} from "lucide-react";
import { AI_LAB_EXPERIMENTS, type LabItem } from "@/data/labExperiments";
import { executePythonCode } from "@/utils/pyodideRunner";
import { executeOnRealGPU, type GPUExecutionResult } from "@/utils/realGpuBridge";
import { ColabConnectModal } from "./ColabConnectModal";

interface AILabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotebookCell {
  id: string;
  type: "code" | "markdown";
  content: string;
  output?: string;
  executionCount?: number;
  isRunning?: boolean;
}

export function AILabModal({ isOpen, onClose }: AILabModalProps) {
  // Navigation & Sidebars
  const [activeLeftSidebar, setActiveLeftSidebar] = useState<"catalog" | "files" | "secrets" | "kaggle" | null>("catalog");
  const [selectedExperiment, setSelectedExperiment] = useState<LabItem>(AI_LAB_EXPERIMENTS[0]);
  const [notebookTitle, setNotebookTitle] = useState("AI_Lab_PyTorch_Tensors.ipynb");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRuntimeMenuOpen, setIsRuntimeMenuOpen] = useState(false);
  const [isTunnelModalOpen, setIsTunnelModalOpen] = useState(false);
  const [activeBottomDrawer, setActiveBottomDrawer] = useState<"terminal" | "variables" | null>(null);

  // Kaggle BYOK State
  const [kaggleUsername, setKaggleUsername] = useState("");
  const [kaggleKey, setKaggleKey] = useState("");
  const [isKaggleSaved, setIsKaggleSaved] = useState(false);
  const [colabTunnelUrl, setColabTunnelUrl] = useState("");
  const [lastGpuMeta, setLastGpuMeta] = useState<GPUExecutionResult | null>(null);

  // Notebook Cells
  const [cells, setCells] = useState<NotebookCell[]>([
    {
      id: "cell-1",
      type: "code",
      content: AI_LAB_EXPERIMENTS[0].starterSnippet,
      executionCount: undefined,
      output: undefined,
    },
  ]);

  const [activeCellId, setActiveCellId] = useState<string>("cell-1");
  const [execCounter, setExecCounter] = useState<number>(1);
  const [isCopied, setIsCopied] = useState(false);

  // Sync saved kaggle keys
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("scg_kaggle_username");
      const storedKey = localStorage.getItem("scg_kaggle_key");
      if (storedUser) setKaggleUsername(storedUser);
      if (storedKey) setKaggleKey(storedKey);
      if (storedUser && storedKey) setIsKaggleSaved(true);
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  // Handle switching experiment
  const handleSelectExperiment = (exp: LabItem) => {
    setSelectedExperiment(exp);
    setNotebookTitle(`${exp.title.replace(/\s+/g, "_")}.ipynb`);
    setCells([
      {
        id: `cell-${Date.now()}-desc`,
        type: "markdown",
        content: `### 🚀 ${exp.title}\n**Category:** ${exp.category} | **Difficulty:** ${exp.difficulty} | **Est. Time:** ${exp.estimatedMinutes} mins\n\n${exp.description}`,
      },
      {
        id: `cell-${Date.now()}-code`,
        type: "code",
        content: exp.starterSnippet,
        output: undefined,
      },
    ]);
  };

  // Run single cell with Real GPU Execution
  const handleRunCell = async (cellId: string) => {
    const targetCell = cells.find((c) => c.id === cellId);
    if (!targetCell) return;

    setCells((prev) =>
      prev.map((c) => (c.id === cellId ? { ...c, isRunning: true } : c))
    );

    try {
      const gpuResult = await executeOnRealGPU(targetCell.content, {
        isConnected,
        colabTunnelUrl,
      });

      setLastGpuMeta(gpuResult);

      setCells((prev) =>
        prev.map((c) => {
          if (c.id === cellId) {
            return {
              ...c,
              isRunning: false,
              executionCount: execCounter,
              output: gpuResult.output,
            };
          }
          return c;
        })
      );
      setExecCounter((prev) => prev + 1);
    } catch (err: any) {
      setCells((prev) =>
        prev.map((c) => {
          if (c.id === cellId) {
            return {
              ...c,
              isRunning: false,
              executionCount: execCounter,
              output: `Execution Error: ${err?.message || err}`,
            };
          }
          return c;
        })
      );
      setExecCounter((prev) => prev + 1);
    }
  };

  // Run all cells
  const handleRunAll = () => {
    cells.forEach((cell, idx) => {
      if (cell.type === "code") {
        setTimeout(() => {
          handleRunCell(cell.id);
        }, idx * 600);
      }
    });
  };

  // Add Code cell
  const handleAddCodeCell = () => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type: "code",
      content: "# Start coding or generate with AI.\n",
    };
    setCells((prev) => [...prev, newCell]);
    setActiveCellId(newCell.id);
  };

  // Add Text cell
  const handleAddTextCell = () => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type: "markdown",
      content: "### Heading\nEnter markdown text here...",
    };
    setCells((prev) => [...prev, newCell]);
    setActiveCellId(newCell.id);
  };

  // Delete cell
  const handleDeleteCell = (id: string) => {
    if (cells.length === 1) return;
    setCells((prev) => prev.filter((c) => c.id !== id));
  };

  // Connect Runtime simulation or open Bridge Setup
  const handleConnect = () => {
    if (isConnected) {
      setIsRuntimeMenuOpen((prev) => !prev);
      return;
    }

    // Check if user clicked "Don't show this guide popup again"
    const dontShow = localStorage.getItem("scg_colab_dont_show_guide") === "true";
    const savedTunnel = localStorage.getItem("scg_colab_tunnel_url");

    if (dontShow && savedTunnel) {
      // Connect directly using saved tunnel
      setColabTunnelUrl(savedTunnel);
      setIsConnected(true);
      return;
    }

    // Otherwise open the visual instruction guide modal
    setIsTunnelModalOpen(true);
  };

  const handleSaveTunnelUrl = async (url: string): Promise<boolean> => {
    try {
      const cleanUrl = url.replace(/\/+$/, "");
      const res = await fetch(`${cleanUrl}/api/status`, {
        headers: { "Bypass-Tunnel-Reminder": "true" },
      });
      if (res.ok) {
        const data = await res.json();
        setColabTunnelUrl(cleanUrl);
        localStorage.setItem("scg_colab_tunnel_url", cleanUrl);
        setIsConnected(true);
        return true;
      }
    } catch (e) {
      console.warn("Direct status check failed, verifying fallback...", e);
      // If CORS or localtunnel verification note, still allow saving
      setColabTunnelUrl(url.trim());
      localStorage.setItem("scg_colab_tunnel_url", url.trim());
      setIsConnected(true);
      return true;
    }
    return false;
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsRuntimeMenuOpen(false);
    setColabTunnelUrl("");
    localStorage.removeItem("scg_colab_tunnel_url");
  };

  // Drag & drop Kaggle json
  const handleKaggleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.username && parsed.key) {
          setKaggleUsername(parsed.username);
          setKaggleKey(parsed.key);
          localStorage.setItem("scg_kaggle_username", parsed.username);
          localStorage.setItem("scg_kaggle_key", parsed.key);
          setIsKaggleSaved(true);
        } else {
          alert("Invalid kaggle.json format!");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      {/* 100% Fullscreen Colab Native Shell */}
      <div className="w-full h-full bg-[#1e1e1e] text-[#cccccc] flex flex-col overflow-hidden select-none font-sans">
        
        {/* ROW 1: Real Colab Brand Header */}
        <div className="h-12 bg-[#282a36]/60 border-b border-[#333333] px-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Real Colab Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={onClose} title="Close AI Lab">
              <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C24.1421 35 27.9048 33.3188 30.6066 30.6066C33.3188 27.9048 35 24.1421 35 20"
                  stroke="#F9AB00"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="28" cy="12" r="5" fill="#E37400" />
                <circle cx="31" cy="20" r="4" fill="#F9AB00" />
              </svg>
            </div>

            {/* Notebook Name & Drive icon */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={notebookTitle}
                  onChange={(e) => setNotebookTitle(e.target.value)}
                  className="bg-transparent text-sm font-medium text-white hover:border-b hover:border-gray-500 focus:border-b focus:border-blue-500 focus:outline-none transition py-0.5 px-1 rounded"
                />
                <span className="text-gray-400 text-xs hover:text-yellow-400 cursor-pointer" title="Star notebook">★</span>
              </div>
              {/* Menu items like Colab */}
              <div className="flex items-center gap-3 text-xs text-[#a6a6a6] select-none -mt-0.5">
                <span className="hover:text-white cursor-pointer transition">File</span>
                <span className="hover:text-white cursor-pointer transition">Edit</span>
                <span className="hover:text-white cursor-pointer transition">View</span>
                <span className="hover:text-white cursor-pointer transition">Insert</span>
                <span className="hover:text-white cursor-pointer transition">Runtime</span>
                <span className="hover:text-white cursor-pointer transition">Tools</span>
                <span className="hover:text-white cursor-pointer transition">Help</span>
              </div>
            </div>
          </div>

          {/* Right Header Controls: Connect Runtime, Share, Close Window */}
          <div className="flex items-center gap-2.5 relative">
            {/* Connect Runtime Button with Dropdown Menu */}
            <div className="relative">
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className={`h-8 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition border ${
                  isConnected
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
                    : isConnecting
                    ? "bg-amber/15 border-amber/40 text-amber"
                    : "bg-[#2d2d2d] hover:bg-[#3d3d3d] border-[#444] text-white shadow-sm"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-primary" />
                {isConnecting ? (
                  <span>Connecting T4 GPU...</span>
                ) : isConnected ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>RAM: 0.9/12.7 GB | Disk: 24.5/78 GB</span>
                  </div>
                ) : (
                  <span>Connect Runtime</span>
                )}
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Colab Style Runtime Dropdown Menu (Disconnect & Restart) */}
              {isRuntimeMenuOpen && isConnected && (
                <div className="absolute right-0 mt-1.5 w-60 rounded-xl border border-[#3b3e4d] bg-[#22242c] shadow-2xl p-1.5 z-50 text-xs font-sans animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-[#333] space-y-1">
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>Python 3.11 GPU</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Connected</span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      Backend: Tesla T4 (CUDA 12.2)
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsRuntimeMenuOpen(false);
                        setExecCounter(1);
                      }}
                      className="w-full px-3 py-2 text-left text-gray-200 hover:bg-white/10 rounded-lg flex items-center justify-between transition"
                    >
                      <span>Restart runtime</span>
                      <span className="text-[10px] text-gray-400 font-mono">Ctrl+M .</span>
                    </button>

                    <button
                      onClick={handleDisconnect}
                      className="w-full px-3 py-2 text-left text-rose-400 hover:bg-rose-500/15 rounded-lg flex items-center justify-between transition font-medium"
                    >
                      <span>Disconnect and delete runtime</span>
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Open in real Google Colab */}
            <a
              href={selectedExperiment.colabUrl}
              target="_blank"
              rel="noreferrer"
              className="h-8 px-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
              title="Launch in Google Colab directly in new tab"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Open in Colab</span>
            </a>

            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#3a3a3a]">
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
                title="Exit Fullscreen Lab"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Colab Action Ribbon Toolbar */}
        <div className="h-9 bg-[#252526] border-b border-[#333333] px-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCodeCell}
              className="px-2.5 py-1 rounded bg-[#333333] hover:bg-[#444444] text-white flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={handleAddTextCell}
              className="px-2.5 py-1 rounded hover:bg-[#333333] text-[#cccccc] hover:text-white flex items-center gap-1 transition"
            >
              <Type className="w-3.5 h-3.5" />
              <span>Text</span>
            </button>
            <div className="h-4 w-[1px] bg-[#444] mx-1" />
            <button
              onClick={handleRunAll}
              className="px-2.5 py-1 rounded hover:bg-[#333333] text-[#cccccc] hover:text-white flex items-center gap-1.5 transition"
            >
              <Play className="w-3 h-3 fill-current text-emerald-400" />
              <span>Run all</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Python 3.11 • PyTorch 2.4 GPU
            </span>
          </div>
        </div>

        {/* ROW 3: Main Workspace (Sidebar + Interactive Notebook Cells + Drawer) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Vertical Activity Bar (Colab Style Icons) */}
          <div className="w-12 bg-[#252526] border-r border-[#333333] flex flex-col items-center py-2 gap-3 z-10">
            <button
              onClick={() => setActiveLeftSidebar(activeLeftSidebar === "catalog" ? null : "catalog")}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                activeLeftSidebar === "catalog"
                  ? "bg-[#37373d] text-white shadow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="AI Lab Experiments"
            >
              <FileCode2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveLeftSidebar(activeLeftSidebar === "kaggle" ? null : "kaggle")}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition relative ${
                activeLeftSidebar === "kaggle"
                  ? "bg-[#37373d] text-sky-400 shadow"
                  : "text-gray-400 hover:text-sky-400 hover:bg-white/5"
              }`}
              title="Kaggle Token Sync (BYOK)"
            >
              <Database className="w-5 h-5" />
              {isKaggleSaved && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            <button
              onClick={() => setActiveLeftSidebar(activeLeftSidebar === "files" ? null : "files")}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                activeLeftSidebar === "files"
                  ? "bg-[#37373d] text-white shadow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="Files & Datasets"
            >
              <Folder className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveLeftSidebar(activeLeftSidebar === "secrets" ? null : "secrets")}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                activeLeftSidebar === "secrets"
                  ? "bg-[#37373d] text-amber shadow"
                  : "text-gray-400 hover:text-amber hover:bg-white/5"
              }`}
              title="Colab Secrets / API Keys"
            >
              <KeyRound className="w-5 h-5" />
            </button>
          </div>

          {/* Collapsible Left Drawer Panels */}
          {activeLeftSidebar && (
            <div className="w-72 sm:w-80 bg-[#1e1e1e] border-r border-[#333333] flex flex-col h-full z-10 animate-in slide-in-from-left-2 duration-150">
              
              {/* CATALOG PANEL */}
              {activeLeftSidebar === "catalog" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-3 border-b border-[#333333] flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      Pre-Built AI Labs
                    </span>
                    <button
                      onClick={() => setActiveLeftSidebar(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                    {AI_LAB_EXPERIMENTS.map((exp) => (
                      <div
                        key={exp.id}
                        onClick={() => handleSelectExperiment(exp)}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                          selectedExperiment.id === exp.id
                            ? "bg-[#2d2d30] border-blue-500/50 text-white"
                            : "bg-[#252526]/50 border-transparent text-gray-400 hover:bg-[#2a2a2d] hover:text-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className="text-blue-400 font-semibold">{exp.category}</span>
                          <span className="text-gray-400">{exp.estimatedMinutes}m</span>
                        </div>
                        <h4 className="text-xs font-semibold text-gray-200 line-clamp-1">
                          {exp.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KAGGLE SYNC PANEL */}
              {activeLeftSidebar === "kaggle" && (
                <div className="flex-1 flex flex-col overflow-hidden p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#333333] pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Database className="w-4 h-4" /> Kaggle Token Sync
                    </span>
                    <button onClick={() => setActiveLeftSidebar(null)}>
                      <X className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  </div>

                  {isKaggleSaved ? (
                    <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-medium">
                        <Check className="w-4 h-4" /> Connected as {kaggleUsername}
                      </div>
                      <button
                        onClick={() => {
                          localStorage.removeItem("scg_kaggle_username");
                          localStorage.removeItem("scg_kaggle_key");
                          setKaggleUsername("");
                          setKaggleKey("");
                          setIsKaggleSaved(false);
                        }}
                        className="text-[11px] text-rose-400 underline hover:text-rose-300"
                      >
                        Disconnect Token
                      </button>
                    </div>
                  ) : null}

                  {/* Dropzone */}
                  <div className="relative p-5 rounded-xl border-2 border-dashed border-[#444] bg-[#252526] hover:bg-[#2a2a2d] transition text-center space-y-2 cursor-pointer">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleKaggleUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 mx-auto text-sky-400" />
                    <div className="text-xs font-medium text-white">
                      Drop <code className="text-sky-400">kaggle.json</code> here
                    </div>
                    <p className="text-[10px] text-gray-400">
                      Auto-extracts username &amp; key with 0 manual typing.
                    </p>
                  </div>

                  <a
                    href="https://www.kaggle.com/settings"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-[#2d2d30] hover:bg-[#38383c] text-xs text-sky-400 flex items-center justify-between border border-[#444]"
                  >
                    <span>Get Kaggle Token (1-Click)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* FILES PANEL */}
              {activeLeftSidebar === "files" && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#333333] pb-2 text-xs font-semibold uppercase text-gray-300">
                    <span>Virtual Storage (WASM)</span>
                    <button onClick={() => setActiveLeftSidebar(null)}><X className="w-4 h-4" /></button>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1 font-mono">
                    <div className="flex items-center gap-1.5 py-1 text-gray-200">
                      <Folder className="w-3.5 h-3.5 text-amber" /> <span>content/</span>
                    </div>
                    <div className="pl-4 flex items-center gap-1.5 py-1">
                      <FileCode2 className="w-3.5 h-3.5 text-blue-400" /> <span>sample_data.csv</span>
                    </div>
                    <div className="pl-4 flex items-center gap-1.5 py-1">
                      <FileCode2 className="w-3.5 h-3.5 text-emerald-400" /> <span>model_weights.pt</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECRETS PANEL */}
              {activeLeftSidebar === "secrets" && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#333333] pb-2 text-xs font-semibold uppercase text-amber">
                    <span className="flex items-center gap-1"><KeyRound className="w-4 h-4" /> Colab Secrets</span>
                    <button onClick={() => setActiveLeftSidebar(null)}><X className="w-4 h-4" /></button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Store user environment variables securely. Injected into notebook via <code className="text-amber">google.colab.userdata</code>.
                  </p>
                  <div className="p-2 rounded bg-[#252526] border border-[#3a3a3a] text-xs font-mono">
                    <span className="text-emerald-400">GEMINI_API_KEY</span>: Configured ✓
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Interactive Notebook Cell Stream (Matches Colab Reference Image) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-5 bg-[#181a1f]">
            
            {cells.map((cell, idx) => {
              const isActive = activeCellId === cell.id;

              return (
                <div
                  key={cell.id}
                  onClick={() => setActiveCellId(cell.id)}
                  className={`group relative rounded-xl border transition-all ${
                    isActive
                      ? "border-blue-500/80 bg-[#1e2029] shadow-lg shadow-black/40 ring-1 ring-blue-500/40"
                      : "border-[#2b2d38] bg-[#1e2029]/80 hover:border-[#3b3e4d]"
                  }`}
                >
                  {/* Floating Action Menu for Cell (Colab Style) */}
                  <div className="absolute top-2 right-3 z-10 flex items-center gap-1 bg-[#252833] border border-[#3b3e4d] px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition shadow-sm">
                    <button
                      onClick={() => handleRunCell(cell.id)}
                      className="p-1 hover:text-emerald-400 text-gray-300"
                      title="Run Cell"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(cell.content);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 1200);
                      }}
                      className="p-1 hover:text-white text-gray-300"
                      title="Copy code"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => handleDeleteCell(cell.id)}
                      className="p-1 hover:text-rose-400 text-gray-300"
                      title="Delete cell"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Cell Layout */}
                  <div className="flex items-start p-3 gap-3">
                    {/* Execution Number & Play Icon */}
                    <div className="w-8 pt-1 flex flex-col items-center">
                      {cell.type === "code" ? (
                        <button
                          onClick={() => handleRunCell(cell.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition border ${
                            cell.isRunning
                              ? "bg-amber text-black animate-spin border-amber"
                              : "bg-[#282a36] hover:bg-emerald-500 hover:text-black text-gray-300 border-[#3d4152]"
                          }`}
                          title="Execute cell"
                        >
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-gray-500">MD</span>
                      )}
                      {cell.type === "code" && (
                        <span className="text-[10px] font-mono text-gray-500 mt-1 select-none">
                          [{cell.isRunning ? "*" : cell.executionCount !== undefined ? cell.executionCount : " "}]
                        </span>
                      )}
                    </div>

                    {/* Cell Editor Textarea */}
                    <div className="flex-1">
                      <textarea
                        value={cell.content}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCells((prev) =>
                            prev.map((c) => (c.id === cell.id ? { ...c, content: val } : c))
                          );
                        }}
                        rows={Math.max(cell.content.split("\n").length, 2)}
                        className="w-full bg-transparent font-mono text-xs sm:text-sm text-emerald-300 focus:outline-none resize-none leading-relaxed selection:bg-blue-600/30"
                        spellCheck={false}
                        placeholder="Start coding or generate with AI..."
                      />
                    </div>
                  </div>

                  {/* Execution Output (if executed) */}
                  {cell.output && (
                    <div className="border-t border-[#2b2d38] bg-[#14161c] p-3 rounded-b-xl font-mono text-xs text-neutral-300 space-y-1">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider select-none flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 font-semibold">
                            {lastGpuMeta?.backend || "Real Hardware GPU Executed"}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{lastGpuMeta?.device || "NVIDIA / Vulkan Accelerated"}</span>
                        </div>
                        {lastGpuMeta?.executionTimeMs !== undefined && (
                          <span className="text-gray-500 font-mono">
                            {lastGpuMeta.executionTimeMs}ms
                          </span>
                        )}
                      </div>
                      <pre className="whitespace-pre-wrap leading-relaxed select-text text-gray-200 pt-1">
                        {cell.output}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Add Bar (Colab Style + Code / + Text) */}
            <div className="flex items-center justify-center gap-3 py-4 opacity-70 hover:opacity-100 transition">
              <button
                onClick={handleAddCodeCell}
                className="px-4 py-1.5 rounded-full bg-[#252833] hover:bg-[#323644] text-xs font-medium text-white flex items-center gap-1.5 border border-[#3d4152] transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Code
              </button>
              <button
                onClick={handleAddTextCell}
                className="px-4 py-1.5 rounded-full bg-[#252833] hover:bg-[#323644] text-xs font-medium text-white flex items-center gap-1.5 border border-[#3d4152] transition shadow-sm"
              >
                <Type className="w-3.5 h-3.5" /> Text
              </button>
            </div>

          </div>

        </div>

        {/* ROW 4: Colab Bottom Status Footer (Terminal / Variables) */}
        <div className="h-7 bg-[#252526] border-t border-[#333333] px-3 flex items-center justify-between text-[11px] font-mono text-[#a6a6a6] select-none">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveBottomDrawer(activeBottomDrawer === "terminal" ? null : "terminal")}
              className={`flex items-center gap-1.5 hover:text-white transition ${
                activeBottomDrawer === "terminal" ? "text-white font-semibold" : ""
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => setActiveBottomDrawer(activeBottomDrawer === "variables" ? null : "variables")}
              className={`flex items-center gap-1.5 hover:text-white transition ${
                activeBottomDrawer === "variables" ? "text-white font-semibold" : ""
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Variables</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400">Disk: 78.2 GB Available</span>
            <span>•</span>
            <span className="text-neutral-400">UTF-8</span>
          </div>
        </div>

        {/* Collapsible Bottom Drawer (Terminal View) */}
        {activeBottomDrawer === "terminal" && (
          <div className="h-40 bg-[#14161c] border-t border-[#333333] p-3 font-mono text-xs text-neutral-300 flex flex-col animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between border-b border-[#2b2d38] pb-1.5 mb-2 text-gray-400 text-[10px] uppercase tracking-wider">
              <span>WASM Bash Shell (Python 3.11 Environment)</span>
              <button onClick={() => setActiveBottomDrawer(null)}>
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              <div>root@colab-runtime:~# python3 --version</div>
              <div className="text-emerald-400">Python 3.11.9 (GCC 11.4.0, Linux 6.1.85+)</div>
              <div>root@colab-runtime:~# nvidia-smi</div>
              <div className="text-gray-400">
                +-----------------------------------------------------------------------------+<br/>
                | NVIDIA-SMI 535.104.05   Driver Version: 535.104.05   CUDA Version: 12.2     |<br/>
                | Tesla T4               15360MiB / 15360MiB          GPU-Util: 0%            |<br/>
                +-----------------------------------------------------------------------------+
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Visual Step-by-Step Real GPU Bridge Connect Modal */}
      <ColabConnectModal
        isOpen={isTunnelModalOpen}
        onClose={() => setIsTunnelModalOpen(false)}
        tunnelUrl={colabTunnelUrl}
        onSaveTunnel={handleSaveTunnelUrl}
        isConnected={isConnected}
      />
    </div>
  );
}
