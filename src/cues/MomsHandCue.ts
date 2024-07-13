import type { Cue } from "~/Cue";
import { EntityType, ModCallback } from "isaac-typescript-definitions";
import { CueTypeAnimationName } from "~/CueTypeAnimationName";
import { CueAnimationName } from "~/CueAnimationName";
import { CueRenderer } from "~/CueRenderer";
import { once } from "~/once";

export class MomsHandCue implements Cue {
  private static readonly MOMS_HAND_ENTITY_TYPES = new Set([EntityType.MOMS_HAND, EntityType.MOMS_DEAD_HAND]);

  private readonly renderer = new CueRenderer(CueTypeAnimationName.Danger, CueAnimationName.MomsHand);

  public getRenderer(): CueRenderer {
    return this.renderer;
  }

  public register(mod: Mod, trigger: () => void): void {
    mod.AddCallback(ModCallback.POST_UPDATE, once(mod, trigger));
    mod.AddCallback(ModCallback.POST_NEW_ROOM, trigger);
    mod.AddCallback(ModCallback.PRE_ENTITY_SPAWN, (entityType) => {
      if (MomsHandCue.MOMS_HAND_ENTITY_TYPES.has(entityType)) {
        trigger();
      }

      return undefined;
    });
  }

  public evaluate(): boolean {
    return Isaac.GetRoomEntities().some((entity) => MomsHandCue.MOMS_HAND_ENTITY_TYPES.has(entity.Type));
  }
}
