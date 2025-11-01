"use client";

import { useId } from "react";
import { presets } from "../lib/presets";
import type { BuildState, Resolution } from "../lib/types";
import { clsx } from "clsx";

export function PromptBuilder({ value, onChange }: { value: BuildState; onChange: (s: BuildState) => void }) {
  const ideaId = useId();
  const negativeId = useId();

  const toggleTag = (key: keyof BuildState["options"], tag: string) => {
    const current = new Set((value.options as any)[key] as string[]);
    if (current.has(tag)) current.delete(tag);
    else current.add(tag);
    onChange({ ...value, options: { ...value.options, [key]: Array.from(current) } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor={ideaId} className="label">Main idea</label>
        <textarea
          id={ideaId}
          className="input min-h-[80px]"
          placeholder="Describe the scene, characters, action, and visual style"
          value={value.idea}
          onChange={(e) => onChange({ ...value, idea: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Styles</label>
        <div className="flex flex-wrap gap-2">
          {presets.styles.map((s) => (
            <button
              key={s}
              type="button"
              className={clsx("btn btn-ghost px-3 py-1 text-xs", value.options.styles.includes(s) && "bg-brand-500/20 text-brand-300 border border-brand-500/30")}
              onClick={() => toggleTag("styles", s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Shot type</label>
          <select
            className="input"
            value={value.options.shotType}
            onChange={(e) => onChange({ ...value, options: { ...value.options, shotType: e.target.value } })}
          >
            {presets.shotTypes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Lens</label>
          <select
            className="input"
            value={value.options.lens}
            onChange={(e) => onChange({ ...value, options: { ...value.options, lens: e.target.value } })}
          >
            {presets.lenses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Camera movements</label>
        <div className="flex flex-wrap gap-2">
          {presets.cameraMovements.map((m) => (
            <button
              key={m}
              className={clsx("btn btn-ghost px-3 py-1 text-xs", value.options.cameraMovements.includes(m) && "bg-brand-500/20 text-brand-300 border border-brand-500/30")}
              onClick={() => toggleTag("cameraMovements", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Aspect ratio</label>
          <select
            className="input"
            value={value.options.aspectRatio}
            onChange={(e) => onChange({ ...value, options: { ...value.options, aspectRatio: e.target.value } })}
          >
            {presets.aspectRatios.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Resolution</label>
          <select
            className="input"
            value={value.options.resolution}
            onChange={(e) =>
              onChange({
                ...value,
                options: { ...value.options, resolution: e.target.value as Resolution },
              })
            }
          >
            {presets.resolutions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Duration: {value.options.durationSec}s</label>
          <input
            type="range"
            min={2}
            max={10}
            value={value.options.durationSec}
            className="w-full"
            onChange={(e) => onChange({ ...value, options: { ...value.options, durationSec: Number(e.target.value) } })}
          />
        </div>
        <div>
          <label className="label">FPS: {value.options.fps}</label>
          <input
            type="range"
            min={12}
            max={30}
            value={value.options.fps}
            className="w-full"
            onChange={(e) => onChange({ ...value, options: { ...value.options, fps: Number(e.target.value) } })}
          />
        </div>
      </div>

      <div>
        <label className="label">Lighting</label>
        <div className="flex flex-wrap gap-2">
          {presets.lighting.map((l) => (
            <button
              key={l}
              className={clsx("btn btn-ghost px-3 py-1 text-xs", value.options.lighting.includes(l) && "bg-brand-500/20 text-brand-300 border border-brand-500/30")}
              onClick={() => toggleTag("lighting", l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Color grade</label>
        <div className="flex flex-wrap gap-2">
          {presets.colorGrades.map((c) => (
            <button
              key={c}
              className={clsx("btn btn-ghost px-3 py-1 text-xs", value.options.colorGrade.includes(c) && "bg-brand-500/20 text-brand-300 border border-brand-500/30")}
              onClick={() => toggleTag("colorGrade", c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Mood</label>
        <div className="flex flex-wrap gap-2">
          {presets.moods.map((m) => (
            <button
              key={m}
              className={clsx("btn btn-ghost px-3 py-1 text-xs", value.options.mood.includes(m) && "bg-brand-500/20 text-brand-300 border border-brand-500/30")}
              onClick={() => toggleTag("mood", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Time of day</label>
          <select
            className="input"
            value={value.options.timeOfDay}
            onChange={(e) => onChange({ ...value, options: { ...value.options, timeOfDay: e.target.value } })}
          >
            {presets.timesOfDay.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Weather</label>
          <select
            className="input"
            value={value.options.weather}
            onChange={(e) => onChange({ ...value, options: { ...value.options, weather: e.target.value } })}
          >
            {presets.weather.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={negativeId} className="label">Negative prompt</label>
        <textarea
          id={negativeId}
          className="input min-h-[60px]"
          placeholder="Artifacts to avoid"
          value={value.negative}
          onChange={(e) => onChange({ ...value, negative: e.target.value })}
        />
      </div>
    </div>
  );
}
