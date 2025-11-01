export type Resolution = "720p" | "1080p" | "4k";

export interface VideoOptions {
  styles: string[];
  shotType: string;
  cameraMovements: string[];
  lens: string; // e.g., 24mm, 35mm
  aspectRatio: string; // e.g., 16:9, 9:16, 2.39:1
  durationSec: number; // 2..10
  fps: number; // 12..30
  resolution: Resolution;
  lighting: string[];
  colorGrade: string[];
  mood: string[];
  environment: string[];
  timeOfDay: string;
  weather: string;
  seed?: number;
}

export interface DialogueTurn {
  character: string; // empty => Narrator
  emotion: string; // from a controlled list
  action?: string; // optional direction
  line: string;
}

export interface DialogueBlock {
  context?: string;
  turns: DialogueTurn[];
}

export interface BuildState {
  idea: string;
  negative: string;
  options: VideoOptions;
  dialogue: DialogueBlock;
}

export interface GeneratedOutput {
  prompt: string;
  negative: string;
  structured: Record<string, unknown>;
}
