import { ModCallback } from "isaac-typescript-definitions";

export function once(mod: Mod, fn: () => void): () => void {
  let ran = false;

  mod.AddCallback(ModCallback.POST_GAME_STARTED, () => {
    ran = false;
  });

  return () => {
    if (ran) {
      return;
    }

    fn();
    ran = true;
  };
}
