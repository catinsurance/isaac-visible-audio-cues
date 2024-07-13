import type { Cue } from "~/Cue";
import type { CueRenderContext } from "~/Renderer";
import { ModCallback } from "isaac-typescript-definitions";
import { DogToothCrawlspaceCue } from "~/cues/DogToothCrawlspaceCue";
import { DogToothSecretRoomCue } from "~/cues/DogToothSecretRoomCue";
import { MomsHandCue } from "~/cues/MomsHandCue";
import { Renderer } from "~/Renderer";

const mod = RegisterMod("visible-audio-cues", 1);
const cues: Cue[] = [
  new DogToothCrawlspaceCue(),
  new DogToothSecretRoomCue(),
  new MomsHandCue(),
];

const renderer = new Renderer();
const cueRenderContexts = new Map<Cue, CueRenderContext>();

cues.forEach((cue) => {
  cue.register(mod, () => {
    const frame = Game().GetFrameCount();
    const active = cue.evaluate();

    if (active) {
      cue.getRenderer().reset();
    }

    cueRenderContexts.set(cue, { cue, active, frame });
  });
});

mod.AddCallback(ModCallback.POST_GAME_STARTED, () => {
  cueRenderContexts.clear();
});

mod.AddCallback(ModCallback.POST_RENDER, () => {
  renderer.render(Array.from(cueRenderContexts.values()));
});
