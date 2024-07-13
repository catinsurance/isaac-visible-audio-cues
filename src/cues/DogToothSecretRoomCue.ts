import type { Cue } from "~/Cue";
import {
  CollectibleType, DoorSlot, ModCallback, RoomType,
} from "isaac-typescript-definitions";
import { CueTypeAnimationName } from "~/CueTypeAnimationName";
import { doesSomePlayerHaveItem } from "~/doesSomePlayerHaveItem";
import { CueRenderer } from "~/CueRenderer";
import { CueAnimationName } from "~/CueAnimationName";

export class DogToothSecretRoomCue implements Cue {
  public readonly renderer = new CueRenderer(CueTypeAnimationName.Info, CueAnimationName.DogToothSecretRoom);

  public getRenderer(): CueRenderer {
    return this.renderer;
  }

  public register(mod: Mod, evaluate: () => void): void {
    mod.AddCallback(ModCallback.POST_NEW_ROOM, evaluate);
  }

  public evaluate(): boolean {
    if (!doesSomePlayerHaveItem(CollectibleType.DOG_TOOTH)) {
      return false;
    }

    const slots = Object.values(DoorSlot).filter((slot) => (typeof slot === "number"));
    const adjacentRooms: RoomDescriptor[] = [];
    slots.forEach((slot) => {
      const door = Game().GetRoom().GetDoor(slot);

      if (door !== undefined) {
        adjacentRooms.push(Game().GetLevel().GetRoomByIdx(door.TargetRoomIndex));
      }
    });

    const adjacentSecretRooms = adjacentRooms
      .filter((room) => (
        room.Data?.Type === RoomType.SECRET
        || room.Data?.Type === RoomType.SUPER_SECRET
      ));

    return (adjacentSecretRooms.some((room) => !room.Clear));
  }
}
