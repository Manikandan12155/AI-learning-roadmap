# ==============================================================================
# 🚀 AI-LAB Real GPU Backend Server for Google Colab
# Run this entire cell once in Google Colab (Runtime -> Change runtime type -> T4 GPU)
# ==============================================================================

!pip install flask flask-cors pyngrok --quiet

import os
import sys
import io
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from pyngrok import ngrok

app = Flask(__name__)
CORS(app) # Allow requests from our AI-LAB website

@app.route("/api/status", methods=["GET"])
def status():
    has_cuda = torch.cuda.is_available()
    device_name = torch.cuda.get_device_name(0) if has_cuda else "CPU"
    total_mem = torch.cuda.get_device_properties(0).total_memory / (1024**3) if has_cuda else 0
    return jsonify({
        "status": "online",
        "cuda": has_cuda,
        "device": device_name,
        "vram_gb": round(total_mem, 2)
    })

@app.route("/api/execute", methods=["POST"])
def execute():
    data = request.get_json(force=True)
    code = data.get("code", "")
    
    # Capture real stdout and stderr
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = buffer_out = io.StringIO()
    sys.stderr = buffer_err = io.StringIO()
    
    try:
        # Execute in real Python environment with full PyTorch CUDA access
        exec(code, globals())
        stdout_val = buffer_out.getvalue()
        stderr_val = buffer_err.getvalue()
        output = stdout_val if stdout_val else (stderr_val if stderr_val else "Execution completed successfully.")
    except Exception as e:
        output = f"Execution Error: {str(e)}"
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr

    has_cuda = torch.cuda.is_available()
    device_name = torch.cuda.get_device_name(0) if has_cuda else "CPU"
    
    return jsonify({
        "output": output,
        "device": f"{device_name} (Google Colab Cloud GPU)",
        "cuda_active": has_cuda
    })

# Start ngrok tunnel to expose Colab GPU server to the web
# Or alternatively use localtunnel / cloudflared
public_url = ngrok.connect(5000).public_url
print("\n" + "="*60)
print("✅ REAL GOOGLE COLAB GPU SERVER IS LIVE!")
print("Copy this Tunnel URL and paste it in your AI-LAB Website:")
print(f"👉 {public_url}")
print("="*60 + "\n")

app.run(port=5000)

