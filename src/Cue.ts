import type { CueRenderer } from "~/CueRenderer";

export interface Cue {
  getRenderer(): CueRenderer;
  register(mod: Mod, trigger: () => void): void;
  evaluate(): boolean;
}
