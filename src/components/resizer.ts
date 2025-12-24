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

type PointerPosition = { x: number; y: number };
type Axis = "x" | "y";

type ResizeContext = {
  axis: Axis;
  startSize: number;
  endSize: number;
  fixed: "start" | "end" | "both" | null;
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

  @property({ type: Boolean }) bounded = true;
  @property({ type: Boolean }) fluid = false;

  private dragging = false;
  private externalDrag = false;

  private activePointerId: number | null = null;
  private initialPointerPos: PointerPosition | null = null;

  private gridContainer: HTMLElement | null = null;
  private ctx: ResizeContext | null = null;

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
   * Resize engine
   * ──────────────────────────────── */

  private resolveContext(): ResizeContext | null {
    const resolveFixed = (startNode: Element, endNode: Element) => {
      const startFixed = startNode.hasAttribute("data-fixed");
      const endFixed = endNode.hasAttribute("data-fixed");

      if (startFixed && endFixed) return "both";
      if (startFixed) return "start";
      if (endFixed) return "end";
      return null;
    };

    const resolveAxis = (
      startNode: Element,
      endNode: Element,
      axis: "x" | "y"
    ): ResizeContext => ({
      axis,
      startSize:
        axis === "x"
          ? startNode.getBoundingClientRect().width
          : startNode.getBoundingClientRect().height,
      endSize:
        axis === "x"
          ? endNode.getBoundingClientRect().width
          : endNode.getBoundingClientRect().height,
      fixed: resolveFixed(startNode, endNode),
    });

    if (this.leftNode && this.rightNode) {
      return resolveAxis(this.leftNode, this.rightNode, "x");
    }

    if (this.topNode && this.bottomNode) {
      return resolveAxis(this.topNode, this.bottomNode, "y");
    }

    return null;
  }

  onPointerDown(e: PointerEvent) {
    e.preventDefault();

    this.dragging = true;
    this.activePointerId = e.pointerId;
    this.initialPointerPos = { x: e.clientX, y: e.clientY };

    this.gridContainer =
      this.leftNode?.parentElement ??
      this.topNode?.parentElement ??
      this.rightNode?.parentElement ??
      this.bottomNode?.parentElement ??
      null;

    this.ctx = this.resolveContext();
    if (!this.ctx || !this.gridContainer) return;

    if (!this.externalDrag) this.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  }

onPointerMove(e: PointerEvent) {
  if (
    !this.dragging ||
    e.pointerId !== this.activePointerId ||
    !this.initialPointerPos ||
    !this.gridContainer ||
    !this.ctx
    ) return;

  const delta =
    this.ctx.axis === "x"
      ? e.clientX - this.initialPointerPos.x
      : e.clientY - this.initialPointerPos.y;

  let start = this.ctx.startSize + delta;
  let end = this.ctx.endSize - delta;

  if (this.bounded) {
    start = Math.max(0, start);
    end = Math.max(0, end);
  }

  const total = start + end || 1;

  if (this.ctx.fixed === "start") {
    // start element is fixed in px, end element is fluid
    this.gridContainer.style.setProperty("--start-element-size", `${start}px`);
    this.gridContainer.style.setProperty("--end-element-size", `1fr`);
    return;
  } else if (this.ctx.fixed === "end") {
    // end element is fixed in px, start element is fluid
    this.gridContainer.style.setProperty("--start-element-size", `1fr`);
    this.gridContainer.style.setProperty("--end-element-size", `${end}px`);
    return;
  } else if (this.ctx.fixed === "both") {
    // both are fixed in px
    this.gridContainer.style.setProperty("--start-element-size", `${start}px`);
    this.gridContainer.style.setProperty("--end-element-size", `${end}px`);
    return;
  }

  // fluid case (default)
  this.gridContainer.style.setProperty("--start-element-size", `${start / total}fr`);
  this.gridContainer.style.setProperty("--end-element-size", `${end / total}fr`);
}

  onPointerUp(e: PointerEvent) {
    if (e.pointerId !== this.activePointerId) return;

    this.dragging = false;
    this.activePointerId = null;
    this.initialPointerPos = null;
    this.ctx = null;

    if (!this.externalDrag) this.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
  }

  onDoubleClick() {
    this.gridContainer?.style.setProperty("--start-element-size", "1fr");
    this.gridContainer?.style.setProperty("--end-element-size", "1fr");
  }

  // forward pointer events for external control (e.g., from pivot resizer)
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
    return html`
      <slot name="pivot-start"></slot>
      <div class="icon-container">
        <slot name="icon"></slot>
      </div>
      <slot name="pivot-end"></slot>
    `;
  }

  static styles = css`
    :host {
      /* --resizer-thickness: 2px; */
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
