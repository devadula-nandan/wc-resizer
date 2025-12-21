import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// TODO: should support 2 modes
// 1. fluid (default) - elements resize according to their flex/grow/shrink properties. this is a responsive approach.
// 2. fixed - elements have fixed sizes set via inline/block sizes. and are resized by adjusting those styles.

// grid-template: "sidebar content content" 1fr "sidebar panel panel" minmax(0px, 300px) / minmax(0px, 266px) minmax(100px, 1fr) minmax(0px, 400px)

/* ────────────────────────────────
 * Types
 * ──────────────────────────────── */

type MousePosition = {
  x: number;
  y: number;
};

type CurrentSizes = {
  topHeight?: number;
  bottomHeight?: number;
  leftWidth?: number;
  rightWidth?: number;
};

/**
 * A drag resizer that adjusts nearby elements when dragged.
 */
@customElement("wc-resizer")
export class WcResizer extends LitElement {
  /* ────────────────────────────────
   * Public properties
   * ──────────────────────────────── */

  @property({ type: Object }) topNode: HTMLElement | null = null;
  @property({ type: Object }) bottomNode: HTMLElement | null = null;
  @property({ type: Object }) leftNode: HTMLElement | null = null;
  @property({ type: Object }) rightNode: HTMLElement | null = null;
  @property({ reflect: true }) orientation: "vertical" | "horizontal" | null =
    "horizontal";
  @property({ type: Boolean }) bounded = false;
  @property({ type: Boolean }) fluid = false;

  /* ────────────────────────────────
   * Internal state
   * ──────────────────────────────── */

  private dragging = false;
  private initialMousePos: MousePosition | null = null;
  private currentSizes: CurrentSizes | null = null;

  constructor() {
    super();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);

    this.tabIndex = 0;
    this.role = "separator";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("dblclick", this.onDoubleClick);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.onMouseDown);
    this.removeEventListener("dblclick", this.onDoubleClick);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
  }

  willUpdate(changedProps: Map<string, unknown>) {
    if (
      changedProps.has("topNode") ||
      changedProps.has("bottomNode") ||
      changedProps.has("leftNode") ||
      changedProps.has("rightNode")
    ) {
      const isVertical =
        (this.topNode || this.bottomNode) && !this.leftNode && !this.rightNode;

      const isHorizontal =
        (this.leftNode || this.rightNode) && !this.topNode && !this.bottomNode;

      const nextOrientation = isVertical
        ? "vertical"
        : isHorizontal
        ? "horizontal"
        : null;

      // Avoid unnecessary updates
      if (this.orientation !== nextOrientation) {
        this.orientation = nextOrientation;
      }
    }
  }

  /* ────────────────────────────────
   * Event handlers
   * ──────────────────────────────── */

  onMouseDown(event: MouseEvent) {
    event.preventDefault();

    this.dragging = true;
    this.initialMousePos = { x: event.clientX, y: event.clientY };
    this.currentSizes = {
      topHeight: this.topNode?.offsetHeight,
      bottomHeight: this.bottomNode?.offsetHeight,
      leftWidth: this.leftNode?.offsetWidth,
      rightWidth: this.rightNode?.offsetWidth,
    };

    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging || !this.initialMousePos || !this.currentSizes) return;

    const dx = event.clientX - this.initialMousePos.x;
    const dy = event.clientY - this.initialMousePos.y;

    if (this.bounded) {
      if (
        this.currentSizes.topHeight !== undefined &&
        this.currentSizes.topHeight + dy < 0
      )
        return;
      if (
        this.currentSizes.bottomHeight !== undefined &&
        this.currentSizes.bottomHeight - dy < 0
      )
        return;
      if (
        this.currentSizes.leftWidth !== undefined &&
        this.currentSizes.leftWidth + dx < 0
      )
        return;
      if (
        this.currentSizes.rightWidth !== undefined &&
        this.currentSizes.rightWidth - dx < 0
      )
        return;
    }

    if (this.topNode && this.currentSizes.topHeight !== undefined) {
      this.topNode.style.blockSize = `${this.currentSizes.topHeight + dy}px`;
    }
    if (this.bottomNode && this.currentSizes.bottomHeight !== undefined) {
      this.bottomNode.style.blockSize = `${this.currentSizes.bottomHeight - dy}px`;
    }
    if (this.leftNode && this.currentSizes.leftWidth !== undefined) {
      this.leftNode.style.inlineSize = `${this.currentSizes.leftWidth + dx}px`;
    }
    if (this.rightNode && this.currentSizes.rightWidth !== undefined) {
      this.rightNode.style.inlineSize = `${this.currentSizes.rightWidth - dx}px`;
    }
  }

  onMouseUp() {
    this.dragging = false;
    this.initialMousePos = null;
    this.currentSizes = null;

    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", this.onMouseMove);
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
      user-select: none;
      position: relative;
      cursor: grab;
    }

    :host::before {
      content: "";
      position: absolute;
      inset: 0;
      background: #ffffff13;
    }

    /* ───────── Vertical ───────── */
    :host([orientation="vertical"]) {
      cursor: row-resize;
    }

    :host([orientation="vertical"])::before {
      top: -4px;
      block-size: calc(100% + 8px);
      inline-size: 100%;
    }

    /* ───────── Horizontal ───────── */
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

    :host(:active) {
      cursor: grabbing;
    }
  `;
}

/* ────────────────────────────────
 * Global typings
 * ──────────────────────────────── */

declare global {
  interface HTMLElementTagNameMap {
    "wc-resizer": WcResizer;
  }
}
