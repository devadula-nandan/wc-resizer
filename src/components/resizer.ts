import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// TODO: should support 2 modes
// 1. fluid (default) - elements resize according to their flex/grow/shrink properties. this is a responsive approach.
// 2. fixed - elements have fixed sizes set via inline/block sizes. and are resized by adjusting those styles.

// grid-template: "sidebar content content" 1fr "sidebar panel panel" minmax(0px, 300px) / minmax(0px, 266px) minmax(100px, 1fr) minmax(0px, 400px)

// If one node is provided, it's an overlay panel or a panel that influences the layout.
// It resizes the inline/block size of that node.
//
// If two nodes are provided, they are split panels. They are resized using grid-template adjustments.
// In this case, the node containing the `data-panel-fixed` attribute must have a fixed grid-template size
// (px, rem, etc.), so the container can adjust the other panel accordingly.
// One panel is fixed-size; the other is fluid.
//
// If four nodes are provided, it's a pivot resizer. It resizes all four nodes accordingly.
// The nodes containing the `data-panel-fixed` attribute must have a fixed grid-template size
// (px, rem, etc.), so the container can adjust the other panels accordingly.
// The panel containing `data-panel-fixed` is fixed-size; the other panels are fluid.

// add buttons to collapse / expand panels
// transitions
// add snapping points

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
  private externalDrag = false;

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
        (this.topNode || this.bottomNode) && !this.leftNode && !this.rightNode;

      const horizontal =
        (this.leftNode || this.rightNode) && !this.topNode && !this.bottomNode;

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

    if (!this.externalDrag) {
      this.setPointerCapture(e.pointerId);
    }

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
      this.topNode.style.blockSize = `${this.currentSizes.topHeight + dy}px`;
    }

    if (this.bottomNode && this.currentSizes.bottomHeight !== undefined) {
      this.bottomNode.style.blockSize = `${
        this.currentSizes.bottomHeight - dy
      }px`;
    }

    if (this.leftNode && this.currentSizes.leftWidth !== undefined) {
      this.leftNode.style.inlineSize = `${this.currentSizes.leftWidth + dx}px`;
    }

    if (this.rightNode && this.currentSizes.rightWidth !== undefined) {
      this.rightNode.style.inlineSize = `${
        this.currentSizes.rightWidth - dx
      }px`;
    }
  }

  onPointerUp(e: PointerEvent) {
    if (e.pointerId !== this.activePointerId) return;

    this.dragging = false;
    this.activePointerId = null;
    this.initialPointerPos = null;
    this.currentSizes = null;

    if (!this.externalDrag) {
      this.releasePointerCapture(e.pointerId);
    }

    document.body.style.userSelect = "";
  }

  onDoubleClick() {
    // Optional: reset logic
    console.log("omdc");
  }

  public _startFromExternal(e: PointerEvent) {
    this.externalDrag = true;
    this.onPointerDown(e);
  }

  public _moveFromExternal(e: PointerEvent) {
    this.onPointerMove(e);
  }

  public _endFromExternal(e: PointerEvent) {
    this.externalDrag = false;
    this.onPointerUp(e);
  }

  /* ────────────────────────────────
   * Render
   * ──────────────────────────────── */

  render() {
    return html` <slot name="pivot-start"></slot>
      <div class="icon-container">
        <slot name="icon"> </slot>
      </div>
      <slot name="pivot-end"></slot>`;
  }

  static styles = css`
    :host {
      --resizer-thickness: 2px;
      display: block;
      min-block-size: max(1px, var(--resizer-thickness, 1px));
      min-inline-size: max(1px, var(--resizer-thickness, 1px));
      touch-action: none;
      user-select: none;
    }

    .icon-container {
      inline-size: 100%;
      block-size: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :host([orientation="vertical"]) {
      cursor: row-resize;
    }

    :host([orientation="horizontal"]) {
      cursor: col-resize;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "wc-resizer": WcResizer;
  }
}
