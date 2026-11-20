import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Zap,
  ShieldCheck,
  Terminal,
  Activity,
  AlertCircle,
} from "lucide-react";

interface ColabConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  tunnelUrl: string;
  onSaveTunnel: (url: string) => Promise<boolean>;
  isConnected: boolean;
}

export function ColabConnectModal({
  isOpen,
  onClose,
  tunnelUrl,
  onSaveTunnel,
  isConnected,
}: ColabConnectModalProps) {
  const [inputUrl, setInputUrl] = useState(tunnelUrl);
  const [isCopied, setIsCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // 100% Free Zero-Auth Tunnel using Cloudflare Tunnel (cloudflared)
  // No account, no signup, no token needed!
  const COLAB_SERVER_SCRIPT = `!pip install flask flask-cors --quiet
!wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O /usr/local/bin/cloudflared
!chmod +x /usr/local/bin/cloudflared

import sys, io, torch, threading, time, re, subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/status", methods=["GET"])
def status():
    has_cuda = torch.cuda.is_available()
    dev = torch.cuda.get_device_name(0) if has_cuda else "CPU"
    return jsonify({"status": "online", "device": dev, "cuda": has_cuda})

@app.route("/api/execute", methods=["POST"])
def execute():
    code = request.get_json(force=True).get("code", "")
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = b_out = io.StringIO()
    sys.stderr = b_err = io.StringIO()
    try:
        exec(code, globals())
        out = b_out.getvalue() or b_err.getvalue() or "Executed successfully."
    except Exception as e:
        out = f"Execution Error: {str(e)}"
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    return jsonify({
        "output": out,
        "device": f"{torch.cuda.get_device_name(0)} (Google Colab Cloud GPU)" if torch.cuda.is_available() else "CPU"
    })

# Start Flask
threading.Thread(target=lambda: app.run(port=5000), daemon=True).start()
time.sleep(1)

# Start Cloudflare Tunnel (100% Free, No Login / No Token required)
process = subprocess.Popen(["cloudflared", "tunnel", "--url", "http://127.0.0.1:5000"], stderr=subprocess.PIPE, text=True)
tunnel_url = None
for line in process.stderr:
    match = re.search(r"https://[a-zA-Z0-9-]+\.trycloudflare\.com", line)
    if match:
        tunnel_url = match.group(0)
        break

print("\\n" + "="*55)
print("🚀 YOUR REAL GPU TUNNEL URL IS READY:")
print(f"👉 {tunnel_url}")
print("="*55 + "\\n")`;

  // Public Google Drive Colab Notebook (Zero GitHub dependency, anyone with Google account can open!)
  const TARGET_COLAB_URL = "https://colab.research.google.com/drive/123W4ppRDtI-5G_KeFctZAOG48QZx5utQ";

  const handleLaunchAndAutoCopy = () => {
    // 1. Automatically copy bridge script to clipboard
    navigator.clipboard.writeText(COLAB_SERVER_SCRIPT);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);

    // 2. Open specific targeted Colab Notebook in new tab
    window.open(TARGET_COLAB_URL, "_blank");
  };

  const handleConnectTunnel = async () => {
    if (!inputUrl.trim()) return;
    setIsVerifying(true);
    setErrorMsg(null);

    const success = await onSaveTunnel(inputUrl.trim());
    setIsVerifying(false);
    if (success) {
      onClose();
    } else {
      setErrorMsg("Could not verify live tunnel. Please make sure the Colab cell is actively running.");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#181a20] text-foreground shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 grid place-items-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Connect Real Cloud GPU (NVIDIA Tesla T4)
              </h3>
              <p className="text-xs text-muted-foreground">
                Zero lag in-app execution via live Google Colab kernel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2 Step Ultra-Seamless Visual Flow */}
        <div className="space-y-4 text-xs">
          
          {/* Step 1: 1-Click Launch */}
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[11px] grid place-items-center font-bold">1</span>
                <span>Open Colab &amp; Click Run</span>
              </div>
              <button
                onClick={handleLaunchAndAutoCopy}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Colab (Code Pre-Loaded)</span>
              </button>
            </div>
            <p className="text-muted-foreground text-[11px] pl-6.5 leading-relaxed">
              Code is already pre-loaded inside the notebook! Just click <span className="text-emerald-400 font-semibold">▶ Run</span> (or press <span className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl + F9</span>) to start your free NVIDIA Tesla T4 GPU server.
            </p>
          </div>

          {/* Step 2: Paste Tunnel URL */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] grid place-items-center font-bold">2</span>
                <span>Paste Tunnel URL &amp; Connect</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Instant Verification</span>
            </div>
            <p className="text-muted-foreground text-[11px] pl-6.5">
              Copy the tunnel link printed at the bottom of Colab (e.g. <code className="text-emerald-300">https://xxxx.loca.lt</code>) and paste below:
            </p>
            <div className="flex gap-2 pl-6.5">
              <input
                type="url"
                placeholder="https://xxxx.loca.lt"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-white/15 bg-black/40 text-white font-mono text-xs placeholder:text-gray-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleConnectTunnel}
                disabled={isVerifying || !inputUrl.trim()}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition disabled:opacity-50 whitespace-nowrap shadow-sm"
              >
                {isVerifying ? "Verifying..." : "Connect GPU"}
              </button>
            </div>
            {errorMsg && (
              <p className="text-rose-400 text-[11px] pl-6.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
              </p>
            )}
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Direct Device Bridge
          </span>
          <span>Packets verified via Browser Network Tab (F12)</span>
        </div>

      </div>
    </div>
  );
}

