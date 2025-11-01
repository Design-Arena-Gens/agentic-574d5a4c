import type { BuildState, GeneratedOutput } from "./types";

function list(items: string[], label: string) {
  return items.length ? `${label}: ${items.join(", ")}` : "";
}

export function generateLTX2Prompt(state: BuildState): GeneratedOutput {
  const o = state.options;

  const lines: string[] = [];
  lines.push(`${state.idea}`);
  lines.push(list(o.styles, "Style"));
  lines.push(`Shot: ${o.shotType}, Lens: ${o.lens}, Movements: ${o.cameraMovements.join(", ") || "none"}`);
  lines.push(`Framing: ${o.aspectRatio}, ${o.fps}fps, ${o.durationSec}s, ${o.resolution}`);
  lines.push(list(o.lighting, "Lighting"));
  lines.push(list(o.colorGrade, "Color grade"));
  lines.push(list(o.mood, "Mood"));
  lines.push(list(o.environment, "Environment"));
  lines.push(`Time: ${o.timeOfDay}${o.weather ? ", Weather: " + o.weather : ""}`);

  if (state.dialogue.turns.length) {
    lines.push("Dialogue:");
    if (state.dialogue.context) lines.push(`Context: ${state.dialogue.context}`);
    for (const t of state.dialogue.turns) {
      const speaker = t.character || "Narrator";
      const meta = [t.emotion, t.action].filter(Boolean).join(", ");
      lines.push(`- ${speaker}${meta ? ` [${meta}]` : ""}: ${t.line}`);
    }
  }

  const prompt = lines.filter(Boolean).join("\n");

  const structured = {
    model: "ltx-2",
    text_prompt: state.idea,
    negative_prompt: state.negative,
    video: {
      duration_seconds: o.durationSec,
      fps: o.fps,
      resolution: o.resolution,
      aspect_ratio: o.aspectRatio,
      seed: o.seed ?? null,
    },
    cinematography: {
      styles: o.styles,
      shot_type: o.shotType,
      lens: o.lens,
      camera_movements: o.cameraMovements,
      lighting: o.lighting,
      color_grade: o.colorGrade,
      mood: o.mood,
      environment: o.environment,
      time_of_day: o.timeOfDay,
      weather: o.weather,
    },
    dialogue: state.dialogue.turns.length
      ? {
          context: state.dialogue.context || null,
          turns: state.dialogue.turns.map((t) => ({
            character: t.character || "Narrator",
            emotion: t.emotion,
            action: t.action || null,
            line: t.line,
          })),
        }
      : null,
  } as const;

  return {
    prompt,
    negative: state.negative,
    structured,
  };
}
