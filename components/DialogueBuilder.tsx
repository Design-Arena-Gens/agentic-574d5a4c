"use client";

import { useId, useState } from "react";
import type { BuildState, DialogueTurn } from "../lib/types";
import { Plus, X } from "lucide-react";

const EMOTIONS = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "fearful",
  "surprised",
  "confident",
  "anxious",
  "curious",
  "romantic",
];

export function DialogueBuilder({ value, onChange }: { value: BuildState; onChange: (s: BuildState) => void }) {
  const ctxId = useId();
  const [draft, setDraft] = useState<DialogueTurn>({ character: "", emotion: "neutral", action: "", line: "" });

  const addTurn = () => {
    if (!draft.line.trim()) return;
    const turns = [...value.dialogue.turns, draft];
    onChange({ ...value, dialogue: { ...value.dialogue, turns } });
    setDraft({ character: "", emotion: "neutral", action: "", line: "" });
  };

  const removeTurn = (idx: number) => {
    const turns = value.dialogue.turns.filter((_, i) => i !== idx);
    onChange({ ...value, dialogue: { ...value.dialogue, turns } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={ctxId} className="label">Dialogue context (optional)</label>
        <input
          id={ctxId}
          className="input"
          placeholder="Scene context, goal, tone, voiceover notes"
          value={value.dialogue.context}
          onChange={(e) => onChange({ ...value, dialogue: { ...value.dialogue, context: e.target.value } })}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <input
          className="input md:col-span-1"
          placeholder="Character"
          value={draft.character}
          onChange={(e) => setDraft({ ...draft, character: e.target.value })}
        />
        <select
          className="input md:col-span-1"
          value={draft.emotion}
          onChange={(e) => setDraft({ ...draft, emotion: e.target.value })}
        >
          {EMOTIONS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <input
          className="input md:col-span-1"
          placeholder="Action/Direction (optional)"
          value={draft.action}
          onChange={(e) => setDraft({ ...draft, action: e.target.value })}
        />
        <div className="flex gap-2 md:col-span-1">
          <input
            className="input flex-1"
            placeholder="Line"
            value={draft.line}
            onChange={(e) => setDraft({ ...draft, line: e.target.value })}
          />
          <button className="btn btn-primary" onClick={addTurn}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {value.dialogue.turns.map((t, i) => (
          <div key={i} className="card flex items-start justify-between gap-3 p-3">
            <div className="text-sm text-neutral-300">
              <span className="text-neutral-400">{t.character || "Narrator"}</span>
              {" "}
              <span className="text-xs text-neutral-500">[{t.emotion}{t.action ? `, ${t.action}` : ""}]</span>
              <div className="mt-1 text-neutral-100">?{t.line}?</div>
            </div>
            <button className="btn btn-ghost px-2" onClick={() => removeTurn(i)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {value.dialogue.turns.length === 0 && (
          <p className="text-sm text-neutral-500">Add dialogue turns to guide lip-sync, emotion, and pacing.</p>
        )}
      </div>
    </div>
  );
}
