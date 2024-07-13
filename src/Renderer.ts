/* eslint-disable max-len */

import type { Cue } from "~/Cue";

export interface CueRenderContext {
  cue: Cue;
  active: boolean;
  frame: number;
}

export class Renderer {
  private static readonly HUD_OFFSET_X_MULTIPLIER = 20;
  private static readonly HUD_OFFSET_Y_MULTIPLIER = 12;

  private static readonly SCREEN_OFFSET = 48;

  private static readonly ROW_GAP = 24;

  public reset(cues: Cue[]): void {
    cues.forEach((cue) => {
      cue.getRenderer().reset();
    });
  }

  public render(ctxs: CueRenderContext[]): void {
    const hudOffsetX = Options.HUDOffset * Renderer.HUD_OFFSET_X_MULTIPLIER;
    const hudOffsetY = Options.HUDOffset * Renderer.HUD_OFFSET_Y_MULTIPLIER;

    ctxs
      .filter((ctx) => ctx.active)
      .forEach((ctx, idx) => {
        ctx.cue.getRenderer().render(
          Isaac.GetScreenWidth() + Game().ScreenShakeOffset.X - hudOffsetX - Renderer.SCREEN_OFFSET,
          Isaac.GetScreenHeight() + Game().ScreenShakeOffset.Y - hudOffsetY - Renderer.SCREEN_OFFSET - Renderer.ROW_GAP * idx,
          ctx.frame,
        );
      });
  }
}
