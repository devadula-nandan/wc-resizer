import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wc-resizer-pivot")
export class PivotResizer extends LitElement {
  @property({ type: Object }) horizontalResizer!: any;
  @property({ type: Object }) verticalResizer!: any;

  private dragging = false;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.dragging = true;
      this.setPointerCapture(e.pointerId);

      this.horizontalResizer._startFromExternal(e);
      this.verticalResizer._startFromExternal(e);
    });

    this.addEventListener("pointermove", (e) => {
      if (!this.dragging) return;
      this.horizontalResizer._moveFromExternal(e);
      this.verticalResizer._moveFromExternal(e);
    });

    this.addEventListener("pointerup", (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.dragging = false;
      this.releasePointerCapture(e.pointerId);

      this.horizontalResizer._endFromExternal(e);
      this.verticalResizer._endFromExternal(e);
    });

    this.addEventListener("pointercancel", (e) => {
      this.dragging = false;
      this.horizontalResizer._endFromExternal(e);
      this.verticalResizer._endFromExternal(e);
    });
  }

  static styles = css`
    :host {
      display: inline-block;
      block-size: max(1px, var(--resizer-thickness, 1px));
      inline-size: max(1px, var(--resizer-thickness, 1px));
      position: absolute;
      cursor: move;
    }
    :host([slot="pivot-start"]) {
      margin-inline-start: calc(var(--resizer-thickness, 4px) * -1);
    }
    :host([slot="pivot-end"]) {
      inset-inline-end: 0;
      margin-block-start: calc(var(--resizer-thickness, 4px) * -1);
      margin-inline-end: calc(var(--resizer-thickness, 4px) * -1);
    }
  `;
}
