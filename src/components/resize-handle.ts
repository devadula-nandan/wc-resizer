import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("resize-handle")
export class ResizeHandle extends LitElement {
  private startNode!: HTMLElement;
  private endNode!: HTMLElement;
  private grid!: HTMLElement;
  private startSize = 0;
  private endSize = 0;
  private axis: "x" | "y" = "x";

  connectedCallback() {
    super.connectedCallback();

    this.grid = this.closest("resize-grid")!;

    this.axis = this.getAttribute("slot") === "handle-vertical" ? "y" : "x";

    const panels = [...this.grid.querySelectorAll("resize-panel")];

    if (this.axis === "x") {
      this.startNode = panels.find((p) => p.slot === "left")!;
      this.endNode = panels.find((p) => p.slot === "right")!;
    } else {
      this.startNode = panels.find((p) => p.slot === "top")!;
      this.endNode = panels.find((p) => p.slot === "bottom")!;
    }

    this.addEventListener("pointerdown", this.startDrag);
  }

  private get pivot() {
    const slot = this.closest("resize-panel")?.getAttribute("slot");

    if (slot === "left") return "end";
    if (slot === "right") return "start";
    return undefined;
  }

  startDrag = (e: PointerEvent) => {
    e.preventDefault();

    const rectStart = this.startNode.getBoundingClientRect();
    const rectEnd = this.endNode.getBoundingClientRect();

    this.startSize = this.axis === "x" ? rectStart.width : rectStart.height;
    this.endSize = this.axis === "x" ? rectEnd.width : rectEnd.height;

    const startPos = this.axis === "x" ? e.clientX : e.clientY;

    const move = (e: PointerEvent) => {
      const delta = (this.axis === "x" ? e.clientX : e.clientY) - startPos;

      const start = this.startSize + delta;
      const end = this.endSize - delta;
      const total = start + end || 1;

      const ratio = (v: number) => Math.max(0, v / total);

      this.grid.style.setProperty("--start-element-size", `${ratio(start)}fr`);
      this.grid.style.setProperty("--end-element-size", `${ratio(end)}fr`);
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  };

  static styles = css`
    :host {
      touch-action: none;
      background: var(--cds-border-subtle);
      min-block-size: var(--resizer-thickness);
      min-inline-size: var(--resizer-thickness);
    }

    :host([slot="handle-horizontal"]) {
      cursor: col-resize;
    }
    :host([slot="handle-vertical"]) {
      cursor: row-resize;
    }
  `;

  render() {
    return html`
      <div style="display: flex;">
       <div style="position: relative;">
        ${this.pivot === "start" ? html` <slot name="pivot"></slot>` : ""}
       </div>
        <div
          style="flex-grow: 1; display: flex; justify-content: center; align-items: center;"
        >
          <slot name="icon"></slot>
        </div>
        <div style="position: relative;">
        ${this.pivot === "end" ? html` <slot name="pivot"></slot>` : ""}
        </div>
      </div>
    `;
  }
}
