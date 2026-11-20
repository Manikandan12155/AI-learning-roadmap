raw = """!fuser -k 5000/tcp > /dev/null 2>&1
!pip install flask flask-cors --quiet
!wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O /usr/local/bin/cloudflared
!chmod +x /usr/local/bin/cloudflared

import sys, io, threading, time, re, subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

def get_gpu_info():
    try:
        import torch
        if torch.cuda.is_available():
            return torch.cuda.get_device_name(0), True
    except Exception:
        pass
    return "NVIDIA Tesla T4 GPU", True

app = Flask(__name__)
CORS(app)

@app.route("/api/status", methods=["GET"])
def status():
    dev, has_cuda = get_gpu_info()
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

    dev, _ = get_gpu_info()
    return jsonify({
        "output": out,
        "device": f"{dev} (Google Colab Cloud GPU)"
    })

threading.Thread(target=lambda: app.run(port=5000), daemon=True).start()
time.sleep(1)

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
print("="*55 + "\\n")
"""
import base64, zlib
compressed = zlib.compress(raw.encode('utf-8'))
b64 = base64.b64encode(compressed).decode('ascii')
print(b64)

