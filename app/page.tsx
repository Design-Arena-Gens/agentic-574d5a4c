"use client";

import { useMemo, useState } from "react";
import { Film, Download, ClipboardCopy, RefreshCw } from "lucide-react";
import { PromptBuilder } from "../components/PromptBuilder";
import { DialogueBuilder } from "../components/DialogueBuilder";
import { OutputPanel } from "../components/OutputPanel";
import { generateLTX2Prompt } from "../lib/generator";
import type { BuildState } from "../lib/types";

export default function Page() {
  const [state, setState] = useState<BuildState>({
    idea: "A lone astronaut explores a bioluminescent alien forest",
    negative: "low quality, blurry, noisy, bad anatomy, watermark",
    options: {
      styles: ["cinematic", "photorealistic"],
      shotType: "wide",
      cameraMovements: ["slow dolly"],
      lens: "35mm",
      aspectRatio: "16:9",
      durationSec: 5,
      fps: 24,
      resolution: "1080p",
      lighting: ["volumetric", "bioluminescent glow"],
      colorGrade: ["teal and orange"],
      mood: ["mysterious", "awe"],
      environment: ["alien forest"],
      timeOfDay: "night",
      weather: "clear",
      seed: undefined,
    },
    dialogue: { context: "first contact exploration", turns: [] },
  });

  const output = useMemo(() => generateLTX2Prompt(state), [state]);

  return (
    <main className="container mx-auto container-max px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400">
            <Film />
          </div>
          <div>
            <h1 className="text-xl font-semibold">LTX-2 Prompt Studio</h1>
            <p className="text-sm text-neutral-400">Generate rich, production-ready video prompts</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={() => setState((s) => ({ ...s }))}>
            <RefreshCw className="h-4 w-4" />
            Reset
          </button>
          <a
            className="btn btn-primary"
            href="#output"
          >
            <ClipboardCopy className="h-4 w-4" />
            Generate
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <PromptBuilder value={state} onChange={setState} />
        </section>
        <section className="card p-5">
          <DialogueBuilder value={state} onChange={setState} />
        </section>
      </div>

      <section id="output" className="mt-6">
        <OutputPanel output={output} />
        <div className="mt-4 flex gap-2">
          <a
            className="btn btn-ghost"
            download="ltx2_prompt.json"
            href={`data:application/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(output.structured, null, 2)
            )}`}
          >
            <Download className="h-4 w-4" /> Download JSON
          </a>
        </div>
      </section>
    </main>
  );
}
