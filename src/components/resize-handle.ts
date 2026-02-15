import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  HandleDragStartEvent,
  HandleDragMoveEvent,
  HandleDragEndEvent,
  HandleDoubleTapEvent,
} from "./types.js";

// ============================================================================
// RESIZE HANDLE - Drag handle (only emits delta and double-tap)
// ============================================================================

// Constants
const KEYBOARD_STEP_PX = 10;
const SHIFT_MULTIPLIER = 5;
const COLLAPSED_THRESHOLD = 0;
const ARIA_VALUE_MIN = 0;
const ARIA_VALUE_MAX = 100;
const ARIA_VALUE_DEFAULT = 50;

@customElement("resize-handle")
export class ResizeHandle extends LitElement {
  private lastTapTime = 0;
  private lastTapX = 0;
  private lastTapY = 0;
  private isDragging = false;
  private startPos = 0;
  private keyboardStep = KEYBOARD_STEP_PX;

  @property({ type: Number, attribute: "double-tap-threshold" })
  doubleTapThreshold = 300;

  @property({ type: Number, attribute: "double-tap-distance" })
  doubleTapDistance = 24;

  @property({ type: String })
  ariaLabel = "Resize handle";

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

    :host(:focus) {
      outline: 1px solid
        var(--resize-handle-focus-color, var(--cds-focus, #c6c6c6));
      outline-offset: clamp(-1px, calc(2px - var(--resize-handle-size)), 0px);
      background: var(
        --resize-handle-bg-focus,
        var(--cds-border-interactive, #c6c6c6)
      );
    }

    :host([data-axis="horizontal"]) {
      cursor: ew-resize;
      min-inline-size: max(var(--resize-handle-size), 1px);
    }

    :host([data-axis="vertical"]) {
      cursor: ns-resize;
      min-block-size: max(var(--resize-handle-size), 1px);
    }

    :host([data-dragging]) {
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
      background: var(
        --resize-handle-grab-bg-hover,
        var(--resize-handle-grab-bg)
      );
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
    this.addEventListener("pointerdown", this.handlePointerDown);
    this.addEventListener("keydown", this.handleKeyDown);
    this.setAttribute("slot", "handle");

    // Set axis attribute on initial render for proper styling
    const grid = this.closest("resize-grid");
    if (grid) {
      const axis = grid.getAttribute("axis") || "horizontal";
      this.dataset.axis = axis;
    }

    // Set accessibility attributes
    this.setAttribute("role", "separator");
    this.setAttribute("tabindex", "0");
    this.setAttribute("aria-label", this.ariaLabel);

    // Set aria-orientation based on axis
    const axis = this.dataset.axis || "horizontal";
    this.setAttribute("aria-orientation", axis);

    // Initialize ARIA value attributes
    this.setAttribute("aria-valuemin", String(ARIA_VALUE_MIN));
    this.setAttribute("aria-valuemax", String(ARIA_VALUE_MAX));
    this.setAttribute("aria-valuenow", String(ARIA_VALUE_DEFAULT));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("pointerdown", this.handlePointerDown);
    this.removeEventListener("keydown", this.handleKeyDown);
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

  private handleKeyDown = (e: KeyboardEvent) => {
    const grid = this.closest("resize-grid");
    if (!grid) return;

    const axis = grid.getAttribute("axis") || "horizontal";
    const isHorizontal = axis === "horizontal";

    let delta = 0;

    // Handle arrow keys based on axis
    if (isHorizontal) {
      if (e.key === "ArrowLeft") {
        delta = -this.keyboardStep;
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        delta = this.keyboardStep;
        e.preventDefault();
      }
    } else {
      if (e.key === "ArrowUp") {
        delta = -this.keyboardStep;
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        delta = this.keyboardStep;
        e.preventDefault();
      }
    }

    // Multiply delta by shift multiplier if shift key is held
    if (e.shiftKey && delta !== 0) {
      delta *= SHIFT_MULTIPLIER;
    }

    // Handle Home key - reset to default
    if (e.key === "Home") {
      this.dispatchEvent(new HandleDoubleTapEvent());
      e.preventDefault();
      return;
    }

    // Handle PageUp - collapse start panel (expand end panel)
    if (e.key === "PageUp") {
      this.dispatchEvent(
        new CustomEvent("handle:collapse", {
          detail: { panel: "start" },
          bubbles: true,
          composed: true,
        }),
      );
      e.preventDefault();
      return;
    }

    // Handle PageDown - collapse end panel (expand start panel)
    if (e.key === "PageDown") {
      this.dispatchEvent(
        new CustomEvent("handle:collapse", {
          detail: { panel: "end" },
          bubbles: true,
          composed: true,
        }),
      );
      e.preventDefault();
      return;
    }

    if (delta !== 0) {
      // Emit keyboard resize events
      this.dispatchEvent(
        new CustomEvent("handle:keyboardstart", {
          detail: { delta },
          bubbles: true,
          composed: true,
        }),
      );

      this.dispatchEvent(
        new CustomEvent("handle:keyboardmove", {
          detail: { delta },
          bubbles: true,
          composed: true,
        }),
      );

      this.dispatchEvent(
        new CustomEvent("handle:keyboardend", {
          detail: { delta },
          bubbles: true,
          composed: true,
        }),
      );
    }
  };

  updateAriaAttributes(startRatio: number, endRatio: number) {
    // Set aria-valuenow as percentage (0-100)
    const startPercent = Math.round(startRatio * ARIA_VALUE_MAX);
    this.setAttribute("aria-valuenow", String(startPercent));
    this.setAttribute("aria-valuemin", String(ARIA_VALUE_MIN));
    this.setAttribute("aria-valuemax", String(ARIA_VALUE_MAX));

    // Update aria-label based on state
    const isStartCollapsed = startRatio < COLLAPSED_THRESHOLD;
    const isEndCollapsed = endRatio < COLLAPSED_THRESHOLD;

    if (isStartCollapsed) {
      this.setAttribute("aria-label", "Resize handle (start panel collapsed)");
    } else if (isEndCollapsed) {
      this.setAttribute("aria-label", "Resize handle (end panel collapsed)");
    } else {
      this.setAttribute("aria-label", this.ariaLabel);
    }
  }

  private handlePointerDown = (e: PointerEvent) => {
    // Handle double-tap to reset
    if (this.detectDoubleTap(e)) {
      this.dispatchEvent(new HandleDoubleTapEvent());
      return;
    }

    e.preventDefault();
    this.startDrag(e);
  };

  private startDrag(e: PointerEvent) {
    // Get axis from parent grid
    const grid = this.closest("resize-grid");
    if (!grid) {
      console.error("resize-handle must be inside a resize-grid");
      return;
    }

    const axis = grid.getAttribute("axis") || "horizontal";
    const isHorizontal = axis === "horizontal";

    this.dataset.axis = axis;
    this.startPos = isHorizontal ? e.clientX : e.clientY;
    this.isDragging = true;
    this.dataset.dragging = "";

    // Emit drag start event
    this.dispatchEvent(new HandleDragStartEvent(this.startPos));

    const handleMove = (e: PointerEvent) => {
      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = currentPos - this.startPos;

      // Emit delta only
      this.dispatchEvent(new HandleDragMoveEvent(delta));
    };

    const handleEnd = (e: PointerEvent) => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
      window.removeEventListener("pointercancel", handleEnd);

      this.isDragging = false;
      delete this.dataset.dragging;

      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = currentPos - this.startPos;

      // Emit final delta
      this.dispatchEvent(new HandleDragEndEvent(delta));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("pointercancel", handleEnd);
  }

  render() {
    return html`
      <div class="handle-content">
        <slot></slot>
      </div>
    `;
  }
}
