import type { Axis, ResizeEventDetail, ResizeState } from "./types.js";

// ============================================================================
// RESIZE CONTROLLER - Pure calculation logic (no DOM manipulation)
// ============================================================================

export class ResizeController {
  private startPanel: HTMLElement | null = null;
  private endPanel: HTMLElement | null = null;
  private grid: HTMLElement | null = null;
  private axis: Axis;
  private state: ResizeState;

  constructor(_host: HTMLElement, axis: Axis) {
    this.axis = axis;
    this.state = {
      startSize: 0,
      endSize: 0,
      axis,
    };
  }

  connect(grid: HTMLElement, startPanel: HTMLElement, endPanel: HTMLElement) {
    this.grid = grid;
    this.startPanel = startPanel;
    this.endPanel = endPanel;
  }

  disconnect() {
    this.grid = null;
    this.startPanel = null;
    this.endPanel = null;
  }

  isConnected(): boolean {
    return !!(this.grid && this.startPanel && this.endPanel);
  }

  captureInitialSizes(): boolean {
    if (!this.startPanel || !this.endPanel) return false;

    const startRect = this.startPanel.getBoundingClientRect();
    const endRect = this.endPanel.getBoundingClientRect();

    this.state.startSize =
      this.axis === "horizontal" ? startRect.width : startRect.height;
    this.state.endSize =
      this.axis === "horizontal" ? endRect.width : endRect.height;

    return true;
  }

  calculateSizes(delta: number): ResizeEventDetail {
    const newStartSize = this.state.startSize + delta;
    const newEndSize = this.state.endSize - delta;
    const total = newStartSize + newEndSize || 1;

    const startRatio = Math.max(0, Math.min(1, newStartSize / total));
    const endRatio = Math.max(0, Math.min(1, newEndSize / total));

    return {
      startSize: newStartSize,
      endSize: newEndSize,
      startRatio,
      endRatio,
      delta,
      axis: this.axis,
    };
  }

  getState(): Readonly<ResizeState> {
    return { ...this.state };
  }
}
