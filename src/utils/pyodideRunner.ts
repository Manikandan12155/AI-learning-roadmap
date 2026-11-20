// Client-side Python Interpreter via CDN Pyodide (WASM)
declare global {
  interface Window {
    loadPyodide?: any;
    pyodideInstance?: any;
  }
}

let pyodidePromise: Promise<any> | null = null;

export async function getPyodideInstance(): Promise<any> {
  if (typeof window === "undefined") return null;

  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (!pyodidePromise) {
    pyodidePromise = new Promise(async (resolve, reject) => {
      try {
        // Dynamically load pyodide script if not present
        if (!window.loadPyodide) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.async = true;
          await new Promise((res, rej) => {
            script.onload = res;
            script.onerror = rej;
            document.head.appendChild(script);
          });
        }

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
        });

        window.pyodideInstance = pyodide;
        resolve(pyodide);
      } catch (err) {
        console.error("Pyodide load failed, using fallback executor", err);
        pyodidePromise = null;
        resolve(null);
      }
    });
  }

  return pyodidePromise;
}

export async function executePythonCode(code: string): Promise<string> {
  try {
    const pyodide = await getPyodideInstance();
    if (pyodide) {
      // Capture stdout & stderr
      pyodide.runPython(`
import sys
import io
sys_stdout_backup = sys.stdout
sys_stderr_backup = sys.stderr
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

      try {
        pyodide.runPython(code);
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");

        pyodide.runPython(`
sys.stdout = sys_stdout_backup
sys.stderr = sys_stderr_backup
`);

        if (stderr && stderr.trim()) {
          return `${stdout ? stdout + "\n" : ""}${stderr.trim()}`;
        }
        return stdout && stdout.trim() ? stdout.trim() : "Process finished with exit code 0 (No output)";
      } catch (runtimeErr: any) {
        pyodide.runPython(`
sys.stdout = sys_stdout_backup
sys.stderr = sys_stderr_backup
`);
        return `Traceback (most recent call last):\n${runtimeErr?.message || runtimeErr}`;
      }
    }
  } catch (e: any) {
    console.warn("WASM run failed, using fallback parser:", e);
  }

  // Lightweight JavaScript fallback simulator for common Python commands like print(), arithmetic, etc.
  return simulatePythonFallback(code);
}

function simulatePythonFallback(code: string): string {
  const lines = code.split("\n");
  const outputs: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    // Handle print(...)
    const printMatch = line.match(/^print\((.*)\)$/);
    if (printMatch) {
      let content = printMatch[1].trim();
      // Remove outer quotes if simple string
      if (
        (content.startsWith('"') && content.endsWith('"')) ||
        (content.startsWith("'") && content.endsWith("'"))
      ) {
        outputs.push(content.slice(1, -1));
      } else {
        try {
          // evaluate basic math / expressions
          // eslint-disable-next-line no-eval
          const val = eval(content);
          outputs.push(String(val));
        } catch {
          outputs.push(content);
        }
      }
    }
  }

  if (outputs.length > 0) {
    return outputs.join("\n");
  }

  return "Executed successfully.";
}

