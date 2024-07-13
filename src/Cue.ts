import type { CueRenderer } from "~/CueRenderer";

export interface Cue {
  getRenderer(): CueRenderer;
  register(mod: Mod, evaluate: () => void): void;
  evaluate(): boolean;
}
