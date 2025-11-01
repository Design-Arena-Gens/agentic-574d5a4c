"use client";

import { ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";
import type { GeneratedOutput } from "../lib/types";

export function OutputPanel({ output }: { output: GeneratedOutput }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(output.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Generated prompt</h2>
          <p className="text-sm text-neutral-400">Optimized for LTX-2 with structured metadata</p>
        </div>
        <button className="btn btn-primary" onClick={copy}>
          {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-sm leading-relaxed text-neutral-200">
{output.prompt}

NEGATIVE: {output.negative}
      </pre>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-neutral-400">Show structured JSON</summary>
        <pre className="mt-2 overflow-auto rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-xs text-neutral-300">{JSON.stringify(output.structured, null, 2)}</pre>
      </details>
    </div>
  );
}
