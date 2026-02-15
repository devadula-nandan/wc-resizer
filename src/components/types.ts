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

// Handle events - only emit delta
export class HandleDragStartEvent extends CustomEvent<{ startPos: number }> {
  constructor(startPos: number) {
    super("handle:dragstart", {
      detail: { startPos },
      bubbles: true,
      composed: true
    });
  }
}

export class HandleDragMoveEvent extends CustomEvent<{ delta: number }> {
  constructor(delta: number) {
    super("handle:dragmove", {
      detail: { delta },
      bubbles: true,
      composed: true
    });
  }
}

export class HandleDragEndEvent extends CustomEvent<{ delta: number }> {
  constructor(delta: number) {
    super("handle:dragend", {
      detail: { delta },
      bubbles: true,
      composed: true
    });
  }
}

export class HandleDoubleTapEvent extends CustomEvent<{}> {
  constructor() {
    super("handle:doubletap", {
      detail: {},
      bubbles: true,
      composed: true
    });
  }
}

// Grid events - emitted after orchestration
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