import type { CueAnimationName } from "~/CueAnimationName";
import { CueTypeAnimationName } from "~/CueTypeAnimationName";

export class CueRenderer {
  private static readonly RENDER_DURATION_FRAMES = 150;

  private static readonly INFO_ICON_FLASH_DURATION_FRAMES = 25;
  private static readonly DANGER_ICON_FLASH_DURATION_FRAMES = 10;

  private static readonly CUE_TYPE_ICON_X_OFFSET = 32;
  private static readonly CUE_TYPE_ICON_Y_OFFSET = 10;

  private readonly cueSprite = Sprite();
  private readonly cueTypeSprite = Sprite();

  public constructor(
    private readonly cueTypeAnimationName: CueTypeAnimationName,
    private readonly cueAnimationName: CueAnimationName,
  ) {
    this.cueSprite.Load("gfx/cues.anm2", true);
    this.cueTypeSprite.Load("gfx/cue_types.anm2", true);
  }

  public reset(): void {
    this.cueSprite.Play(this.cueAnimationName, true);
    this.cueTypeSprite.Play(this.cueTypeAnimationName, true);
  }

  public render(x: number, y: number, initialFrame: number): void {
    const currentAnimationFrame = Game().GetFrameCount() - initialFrame;
    if (currentAnimationFrame > CueRenderer.RENDER_DURATION_FRAMES) {
      return;
    }

    this.cueSprite.Render(Vector(x, y));

    if (this.shouldRenderCueTypeSprite(currentAnimationFrame)) {
      this.cueTypeSprite.Render(
        Vector(x + CueRenderer.CUE_TYPE_ICON_X_OFFSET, y + CueRenderer.CUE_TYPE_ICON_Y_OFFSET),
      );
    }
  }

  private shouldRenderCueTypeSprite(currentAnimationFrame: number): boolean {
    if (this.cueTypeAnimationName === CueTypeAnimationName.Info) {
      return Math.sin((Math.PI * currentAnimationFrame) / CueRenderer.INFO_ICON_FLASH_DURATION_FRAMES) > 0;
    }

    if (this.cueTypeAnimationName === CueTypeAnimationName.Danger) {
      return Math.sin((Math.PI * currentAnimationFrame) / CueRenderer.DANGER_ICON_FLASH_DURATION_FRAMES) > 0;
    }

    throw new Error(this.cueTypeAnimationName satisfies never);
  }
}
