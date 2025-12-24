import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type PointerPos = { x: number; y: number };

@customElement("wc-resizer")
export class WcResizer extends LitElement {
  @property({ type: Object }) containerNode?: HTMLElement;
  @property({ type: Object }) leftNode?: HTMLElement;
  @property({ type: Object }) rightNode?: HTMLElement;
  @property({ type: Object }) topNode?: HTMLElement;
  @property({ type: Object }) bottomNode?: HTMLElement;

  @property({ reflect: true }) orientation: "horizontal" | "vertical" =
    "horizontal";
  @property() mode: "fluid" | "fixed" = "fluid";

  private ready = false;
  private dragging = false;
  private pointerId: number | null = null;
  private start!: PointerPos;
  private before = 0;
  private after = 0;
  private size = 0;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pointerdown", this.onDown);
    this.addEventListener("pointermove", this.onMove);
    this.addEventListener("pointerup", this.onUp);
    this.addEventListener("pointercancel", this.onUp);
  }

  updated() {
    if (this.ready) return;

    const ok =
      this.containerNode &&
      ((this.leftNode && this.rightNode) || (this.topNode && this.bottomNode));

    if (!ok) return;

    this.setupGrid();
    this.ready = true;
  }

  setupGrid() {
    const c = this.containerNode!;
    c.style.display = "grid";

    if (this.orientation === "horizontal") {
      c.style.gridTemplateColumns = "1fr auto 1fr";
      c.replaceChildren(this.leftNode!, this, this.rightNode!);
    } else {
      c.style.gridTemplateRows = "1fr auto 1fr";
      c.replaceChildren(this.topNode!, this, this.bottomNode!);
    }
  }

  onDown = (e: PointerEvent) => {
    e.preventDefault();
    const style = getComputedStyle(this.containerNode!);
    const tracks =
      this.orientation === "horizontal"
        ? style.gridTemplateColumns.split(" ")
        : style.gridTemplateRows.split(" ");

    this.before = parseFloat(tracks[0]);
    this.after = parseFloat(tracks[2]);

    this.size =
      this.orientation === "horizontal"
        ? this.containerNode!.clientWidth
        : this.containerNode!.clientHeight;

    this.dragging = true;
    this.pointerId = e.pointerId;
    this.start = { x: e.clientX, y: e.clientY };
    this.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  onMove = (e: PointerEvent) => {
    if (!this.dragging || e.pointerId !== this.pointerId) return;

    const delta =
      this.orientation === "horizontal"
        ? e.clientX - this.start.x
        : e.clientY - this.start.y;

    const total = this.before + this.after;
    const ratio = delta / this.size;

    const a = Math.max(0.1, this.before + ratio * total);
    const b = total - a;

    const t =
      this.orientation === "horizontal"
        ? ` ${a}fr auto ${b}fr`
        : ` ${a}fr auto ${b}fr`;

    if (this.orientation === "horizontal")
      this.containerNode!.style.gridTemplateColumns = t;
    else this.containerNode!.style.gridTemplateRows = t;
  };

  onUp = (e: PointerEvent) => {
    if (e.pointerId !== this.pointerId) return;
    this.dragging = false;
    this.pointerId = null;
    this.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
  };

  render() {
    return html`
      <slot name="pivot">
        <div class="default-pivot"></div>
      </slot>
    `;
  }

  static styles = css`
    :host {
      --resizer-thickness: 4px;
      background: gray;
      touch-action: none;
      user-select: none;
      position: relative;
    }
    ::slotted([slot="pivot"]) {
      transform: translateX(calc(var(--resizer-thickness, 4px) * -1));
    }

    :host([orientation="horizontal"]) {
      cursor: ew-resize;
      inline-size: var(--resizer-thickness, 4px);
    }
    :host([orientation="vertical"]) {
      cursor: ns-resize;
      block-size: var(--resizer-thickness, 4px);
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    "wc-resizer": WcResizer;
  }
}
