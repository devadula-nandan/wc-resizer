import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wc-pivot-resizer")
export class PivotResizer extends LitElement {
  @property({ type: Object }) xResizer!: HTMLElement;
  @property({ type: Object }) yResizer!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("slot", "pivot");

    const forward = (e: PointerEvent) => {
      const clone = new PointerEvent(e.type, e);
      this.xResizer.dispatchEvent(clone);
      this.yResizer.dispatchEvent(clone);
    };

    this.addEventListener("pointerdown", forward);
    this.addEventListener("pointermove", forward);
    this.addEventListener("pointerup", forward);
    this.addEventListener("pointercancel", forward);
  }

  static styles = css`
    :host {
      block-size: var(--resizer-thickness, 4px);
      inline-size: var(--resizer-thickness, 4px);
      background: white;
      cursor: move;
      position: absolute;
      z-index: 10;
    }
  `;
}
