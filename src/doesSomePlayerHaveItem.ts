import type { CollectibleType } from "isaac-typescript-definitions";

export function doesSomePlayerHaveItem(collectibleType: CollectibleType): boolean {
  for (let i = 0; i < Game().GetNumPlayers(); i += 1) {
    if (Isaac.GetPlayer(i).HasCollectible(collectibleType)) {
      return true;
    }
  }

  return false;
}
