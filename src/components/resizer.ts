import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// TODO: should support 2 modes
// 1. fluid (default) - elements resize according to their flex/grow/shrink properties. this is a responsive approach.
// 2. fixed - elements have fixed sizes set via inline/block sizes. and are resized by adjusting those styles.

// grid-template: "sidebar content content" 1fr "sidebar panel panel" minmax(0px, 300px) / minmax(0px, 266px) minmax(100px, 1fr) minmax(0px, 400px)

/* ────────────────────────────────
 * Types
 * ──────────────────────────────── */

type PointerPosition = {
  x: number;
  y: number;
};

type CurrentSizes = {
  topHeight?: number;
  bottomHeight?: number;
  leftWidth?: number;
  rightWidth?: number;
};

/* ────────────────────────────────
 * Component
 * ──────────────────────────────── */

@customElement("wc-resizer")
export class WcResizer extends LitElement {
  @property({ type: Object }) topNode: HTMLElement | null = null;
  @property({ type: Object }) bottomNode: HTMLElement | null = null;
  @property({ type: Object }) leftNode: HTMLElement | null = null;
  @property({ type: Object }) rightNode: HTMLElement | null = null;

  @property({ reflect: true })
  orientation: "vertical" | "horizontal" | null = "horizontal";

  @property({ type: Boolean }) bounded = false;
  @property({ type: Boolean }) fluid = false;

  private dragging = false;
  private activePointerId: number | null = null;
  private initialPointerPos: PointerPosition | null = null;
  private currentSizes: CurrentSizes | null = null;

  constructor() {
    super();

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);

    this.tabIndex = 0;
    this.role = "separator";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pointerdown", this.onPointerDown);
    this.addEventListener("pointermove", this.onPointerMove);
    this.addEventListener("pointerup", this.onPointerUp);
    this.addEventListener("pointercancel", this.onPointerUp);
    this.addEventListener("dblclick", this.onDoubleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("pointerdown", this.onPointerDown);
    this.removeEventListener("pointermove", this.onPointerMove);
    this.removeEventListener("pointerup", this.onPointerUp);
    this.removeEventListener("pointercancel", this.onPointerUp);
    this.removeEventListener("dblclick", this.onDoubleClick);
  }

  willUpdate(changed: Map<string, unknown>) {
    if (
      changed.has("topNode") ||
      changed.has("bottomNode") ||
      changed.has("leftNode") ||
      changed.has("rightNode")
    ) {
      const vertical =
        (this.topNode || this.bottomNode) &&
        !this.leftNode &&
        !this.rightNode;

      const horizontal =
        (this.leftNode || this.rightNode) &&
        !this.topNode &&
        !this.bottomNode;

      this.orientation = vertical
        ? "vertical"
        : horizontal
        ? "horizontal"
        : null;
    }
  }

  /* ────────────────────────────────
   * Pointer handlers
   * ──────────────────────────────── */

  onPointerDown(e: PointerEvent) {
    e.preventDefault();

    this.dragging = true;
    this.activePointerId = e.pointerId;
    this.initialPointerPos = { x: e.clientX, y: e.clientY };

    this.currentSizes = {
      topHeight: this.topNode?.offsetHeight,
      bottomHeight: this.bottomNode?.offsetHeight,
      leftWidth: this.leftNode?.offsetWidth,
      rightWidth: this.rightNode?.offsetWidth,
    };

    this.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  }

  onPointerMove(e: PointerEvent) {
    if (
      !this.dragging ||
      e.pointerId !== this.activePointerId ||
      !this.initialPointerPos ||
      !this.currentSizes
    ) {
      return;
    }

    const rawDx = e.clientX - this.initialPointerPos.x;
    const rawDy = e.clientY - this.initialPointerPos.y;

    let dx = rawDx;
    let dy = rawDy;

    /* ───────── Horizontal clamp (left/right) ───────── */
    if (
      this.bounded &&
      this.currentSizes.leftWidth !== undefined &&
      this.currentSizes.rightWidth !== undefined
    ) {
      const minDx = -this.currentSizes.leftWidth;
      const maxDx = this.currentSizes.rightWidth;
      dx = Math.min(maxDx, Math.max(minDx, rawDx));
    }

    /* ───────── Vertical clamp (top/bottom) ───────── */
    if (
      this.bounded &&
      this.currentSizes.topHeight !== undefined &&
      this.currentSizes.bottomHeight !== undefined
    ) {
      const minDy = -this.currentSizes.topHeight;
      const maxDy = this.currentSizes.bottomHeight;
      dy = Math.min(maxDy, Math.max(minDy, rawDy));
    }

    /* ───────── Apply sizes ───────── */
    if (this.topNode && this.currentSizes.topHeight !== undefined) {
      this.topNode.style.blockSize =
        `${this.currentSizes.topHeight + dy}px`;
    }

    if (this.bottomNode && this.currentSizes.bottomHeight !== undefined) {
      this.bottomNode.style.blockSize =
        `${this.currentSizes.bottomHeight - dy}px`;
    }

    if (this.leftNode && this.currentSizes.leftWidth !== undefined) {
      this.leftNode.style.inlineSize =
        `${this.currentSizes.leftWidth + dx}px`;
    }

    if (this.rightNode && this.currentSizes.rightWidth !== undefined) {
      this.rightNode.style.inlineSize =
        `${this.currentSizes.rightWidth - dx}px`;
    }
  }

  onPointerUp(e: PointerEvent) {
    if (e.pointerId !== this.activePointerId) return;

    this.dragging = false;
    this.activePointerId = null;
    this.initialPointerPos = null;
    this.currentSizes = null;

    this.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
  }

  onDoubleClick() {
    // Optional: reset logic
    console.log("omdc");
    
  }

  /* ────────────────────────────────
   * Render
   * ──────────────────────────────── */

  render() {
    return html`<slot name="icon"></slot>`;
  }

  static styles = css`
    :host {
      display: block;
      min-block-size: 4px;
      min-inline-size: 4px;
      position: relative;
      touch-action: none;
      user-select: none;
    }

    :host::before {
      content: "";
      position: absolute;
      inset: 0;
      background: #ffffff13;
    }

    :host([orientation="vertical"]) {
      cursor: row-resize;
    }

    :host([orientation="vertical"])::before {
      top: -4px;
      block-size: calc(100% + 8px);
      inline-size: 100%;
    }

    :host([orientation="horizontal"]) {
      cursor: col-resize;
    }

    :host([orientation="horizontal"])::before {
      left: -4px;
      inline-size: calc(100% + 8px);
      block-size: 100%;
    }

    ::slotted([slot="icon"]) {
      position: absolute;
      inset: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "wc-resizer": WcResizer;
  }
}
