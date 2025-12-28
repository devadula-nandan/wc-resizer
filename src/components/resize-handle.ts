import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ResizeController } from "./resize-controller.js";
import { ResizeStartEvent, ResizeMoveEvent, ResizeEndEvent } from "./types.js";
import { ResizeGrid } from "./resize-grid.js";
import { ResizePanel } from "./resize-panel.js";

// ============================================================================
// RESIZE HANDLE - Drag handle
// ============================================================================

@customElement("resize-handle")
export class ResizeHandle extends LitElement {
  private controller: ResizeController | null = null;
  private grid: ResizeGrid | null = null;
  private lastTapTime = 0;
  private lastTapX = 0;
  private lastTapY = 0;
  private isDragging = false;

  @property({ type: Number, attribute: "double-tap-threshold" })
  doubleTapThreshold = 300;

  @property({ type: Number, attribute: "double-tap-distance" })
  doubleTapDistance = 24;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: none;
      user-select: none;
      background: var(--resize-handle-bg, var(--cds-border-subtle, #e0e0e0));
      transition: background-color 350ms cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
      cursor: var(--resize-handle-cursor, grab);
    }

    :host(:hover) {
      background: var(
        --resize-handle-bg-hover,
        var(--cds-border-interactive, #c6c6c6)
      );
    }

    :host([data-axis="horizontal"]) {
      cursor: ew-resize;
      min-inline-size: var(--resize-handle-size, 4px);
    }

    :host([data-axis="vertical"]) {
      cursor: ns-resize;
      min-block-size: var(--resize-handle-size, 4px);
    }

    :host([data-dragging]) {
      cursor: var(--resize-handle-cursor-active, grabbing);
      background: var(
        --resize-handle-bg-active,
        var(--cds-border-interactive, #c6c6c6)
      );
    }

    :host::before {
      content: "";
      position: absolute;
      inset: calc(-1 * var(--resize-handle-grab-area, 4px));
      background: var(--resize-handle-grab-bg, transparent);
      z-index: 1;
    }

    :host(:hover)::before {
      background: var(--resize-handle-grab-bg-hover, var(--resize-handle-grab-bg));
    }

    .handle-content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: 100%;
      inline-size: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.initialize();
    this.addEventListener("pointerdown", this.handlePointerDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup();
    this.removeEventListener("pointerdown", this.handlePointerDown);
  }

  private initialize() {
    // Find the grid
    this.grid = this.closest("resize-grid") as ResizeGrid | null;

    if (!this.grid) {
      console.error("resize-handle must be inside a resize-grid");
      return;
    }

    const axis = this.grid.getAxis();
    this.dataset.axis = axis;

    // Find panels based on grid axis
    const panels = Array.from(
      this.grid.querySelectorAll<ResizePanel>("resize-panel")
    );

    const startPanel = panels.find((p) => p.position === "start");
    const endPanel = panels.find((p) => p.position === "end");

    if (!startPanel || !endPanel) {
      console.error("resize-grid must contain start and end panels");
      return;
    }

    // Create controller
    this.controller = new ResizeController(this, axis);
    this.controller.connect(this.grid, startPanel, endPanel);

    // Set slot
    this.setAttribute("slot", "handle");
  }

  private cleanup() {
    if (this.controller) {
      this.controller.disconnect();
      this.controller = null;
    }
    this.grid = null;
  }

  private detectDoubleTap(e: PointerEvent): boolean {
    const now = Date.now();
    const dt = now - this.lastTapTime;
    const dx = Math.abs(e.clientX - this.lastTapX);
    const dy = Math.abs(e.clientY - this.lastTapY);

    const isDoubleTap =
      dt < this.doubleTapThreshold &&
      dx < this.doubleTapDistance &&
      dy < this.doubleTapDistance;

    this.lastTapTime = now;
    this.lastTapX = e.clientX;
    this.lastTapY = e.clientY;

    if (isDoubleTap) {
      if ("vibrate" in navigator) {
        navigator.vibrate(8);
      }
      return true;
    }

    return false;
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (!this.controller || !this.controller.isConnected()) {
      console.warn("ResizeHandle not properly initialized");
      return;
    }

    // Handle double-tap to reset
    if (this.detectDoubleTap(e)) {
      this.controller.reset();
      return;
    }

    e.preventDefault();
    this.startDrag(e);
  };

  private startDrag(e: PointerEvent) {
    if (!this.controller || !this.grid) return;

    const axis = this.grid.getAxis();
    const isHorizontal = axis === "horizontal";

    // Capture initial sizes
    if (!this.controller.captureInitialSizes()) {
      console.warn("Failed to capture initial panel sizes");
      return;
    }

    const startPos = isHorizontal ? e.clientX : e.clientY;
    this.isDragging = true;
    this.dataset.dragging = "";

    // Disable transitions during drag
    this.grid.disableTransitions = true;

    // Dispatch start event
    this.dispatchEvent(new ResizeStartEvent(axis));

    const handleMove = (e: PointerEvent) => {
      if (!this.controller) return;

      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = currentPos - startPos;

      const detail = this.controller.calculateSizes(delta);
      this.controller.applySizes(detail);

      this.dispatchEvent(new ResizeMoveEvent(detail));
    };

    const handleEnd = (e: PointerEvent) => {
      if (!this.controller || !this.grid) return;

      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
      window.removeEventListener("pointercancel", handleEnd);

      this.isDragging = false;
      delete this.dataset.dragging;

      // Re-enable transitions
      this.grid.disableTransitions = false;

      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = currentPos - startPos;
      const detail = this.controller.calculateSizes(delta);

      this.dispatchEvent(new ResizeEndEvent(detail));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("pointercancel", handleEnd);
  }

  // Public API
  public reset() {
    this.controller?.reset();
  }

  render() {
    return html`
      <div class="handle-content">
        <slot></slot>
      </div>
    `;
  }
}
