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
  private lastTapTime = 0;
  private lastTapX = 0;
  private lastTapY = 0;

  connectedCallback() {
    super.connectedCallback();

    this.grid = this.closest("resize-grid")!;

    this.axis = this.getAttribute("slot") === "handle-vertical" ? "y" : "x";

    const panels = Array.from(
      this.grid.querySelectorAll<HTMLElement>("resize-panel")
    );

    if (this.axis === "x") {
      this.startNode = panels.find((p) => p.slot === "left")!;
      this.endNode = panels.find((p) => p.slot === "right")!;
    } else {
      this.startNode = panels.find((p) => p.slot === "top")!;
      this.endNode = panels.find((p) => p.slot === "bottom")!;
    }

    this.addEventListener("pointerdown", this.startDrag);
  }

  resetSizes = (e: MouseEvent) => {
    e.preventDefault();
    this.grid.style.removeProperty("--start-element-size");
    this.grid.style.removeProperty("--end-element-size");
  };

  private get pivot() {
    const slot = this.closest("resize-panel")?.getAttribute("slot");

    if (slot === "left") return "end";
    if (slot === "right") return "start";
    return undefined;
  }
  // mobile + desktop double tap detection
  private detectDoubleTap(e: PointerEvent) {
    const now = Date.now();
    const dt = now - this.lastTapTime;
    const dx = Math.abs(e.clientX - this.lastTapX);
    const dy = Math.abs(e.clientY - this.lastTapY);

    if (dt < 300 && dx < 24 && dy < 24) {
      if ("vibrate" in navigator) navigator.vibrate(8);
      this.resetSizes(e as any);
      this.lastTapTime = 0;
      return true;
    }

    this.lastTapTime = now;
    this.lastTapX = e.clientX;
    this.lastTapY = e.clientY;

    return false;
  }

  // private emitDelta(delta: number) {
  //   requestAnimationFrame(() => {
  //     this.dispatchEvent(
  //       new CustomEvent("resize-handle:drag", {
  //         detail: {
  //           delta,
  //           startSize: this.startSize,
  //           endSize: this.endSize,
  //           axis: this.axis,
  //         },
  //         bubbles: true,
  //         composed: true,
  //       })
  //     );
  //   });
  // }

  startDrag = (e: PointerEvent) => {
    if (this.detectDoubleTap(e)) return;
    e.preventDefault();

    const rectStart = this.startNode.getBoundingClientRect();
    const rectEnd = this.endNode.getBoundingClientRect();

    this.startSize = this.axis === "x" ? rectStart.width : rectStart.height;
    this.endSize = this.axis === "x" ? rectEnd.width : rectEnd.height;

    const startPos = this.axis === "x" ? e.clientX : e.clientY;

    // this.dispatchEvent(
    //   new CustomEvent("resize-handle:start", {
    //     detail: { axis: this.axis },
    //     bubbles: true,
    //     composed: true,
    //   })
    // );

    const move = (e: PointerEvent) => {
      this.grid.style.transition = "none";
      const delta = (this.axis === "x" ? e.clientX : e.clientY) - startPos;

      const start = this.startSize + delta;
      const end = this.endSize - delta;
      const total = start + end || 1;

      const ratio = (v: number) => Math.max(0, v / total);

      this.grid.style.setProperty("--start-element-size", `${ratio(start)}fr`);
      this.grid.style.setProperty("--end-element-size", `${ratio(end)}fr`);

      // this.emitDelta(delta);
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      this.grid.style.removeProperty("transition");
      // this.dispatchEvent(
      //   new CustomEvent("resize-handle:end", {
      //     detail: { axis: this.axis },
      //     bubbles: true,
      //     composed: true,
      //   })
      // );
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  };

  static styles = css`
    :host {
      touch-action: none;
      background: var(--cds-border-subtle);
      min-block-size: max(1px, var(--resizer-thickness));
      min-inline-size: max(1px, var(--resizer-thickness));
    }
    :host([slot="handle-horizontal"]) {
      cursor: ew-resize;

      .icon-container {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          block-size: 100%;
          inline-size: calc(max(1px, var(--resizer-thickness)) + max(0px, var(--resizer-grab-thickness)));
          background-color: var(--resizer-grab-color);
        }
      }
    }
    :host([slot="handle-vertical"]) {
      cursor: ns-resize;
      min-inline-size: 0;
      .icon-container {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          inline-size: 100%;
          block-size: calc(max(1px, var(--resizer-thickness)) + max(0px, var(--resizer-grab-thickness)));
          background-color: var(--resizer-grab-color);
        }
      }
    }
    .handle-content {
      block-size: 100%;
      inline-size: 100%;
      display: flex;
    }
    .icon-container {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  render() {
    return html`
      <div class="handle-content">
        <div>
          ${this.pivot === "start" ? html`<slot name="pivot"></slot>` : ""}
        </div>
        <div class="icon-container" part="icon-container">
          <slot name="icon"></slot>
        </div>
        <div>
          ${this.pivot === "end" ? html`<slot name="pivot"></slot>` : ""}
        </div>
      </div>
    `;
  }
}
