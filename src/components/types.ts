// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type Axis = "horizontal" | "vertical";
export type PanelPosition = "start" | "end";

export interface ResizeState {
  startSize: number;
  endSize: number;
  axis: Axis;
}

export interface ResizeEventDetail {
  startSize: number;
  endSize: number;
  startRatio: number;
  endRatio: number;
  delta: number;
  axis: Axis;
}

// Custom events with proper typing
export class ResizeStartEvent extends CustomEvent<{ axis: Axis }> {
  constructor(axis: Axis) {
    super("resize:start", { 
      detail: { axis }, 
      bubbles: true, 
      composed: true 
    });
  }
}

export class ResizeMoveEvent extends CustomEvent<ResizeEventDetail> {
  constructor(detail: ResizeEventDetail) {
    super("resize:move", { 
      detail, 
      bubbles: true, 
      composed: true 
    });
  }
}

export class ResizeEndEvent extends CustomEvent<ResizeEventDetail> {
  constructor(detail: ResizeEventDetail) {
    super("resize:end", { 
      detail, 
      bubbles: true, 
      composed: true 
    });
  }
}

export class ResizeResetEvent extends CustomEvent<{ axis: Axis }> {
  constructor(axis: Axis) {
    super("resize:reset", { 
      detail: { axis }, 
      bubbles: true, 
      composed: true 
    });
  }
}