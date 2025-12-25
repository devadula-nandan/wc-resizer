import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/** Public interface of <resize-handle> */
interface ResizeHandle extends HTMLElement {
  startDrag(e: PointerEvent): void;
}

@customElement("resize-handle-pivot")
export class ResizeHandlePivot extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: red;
      block-size: var(--resizer-thickness);
      inline-size: var(--resizer-thickness);
      cursor: all-scroll;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("slot", "pivot");
    this.addEventListener("pointerdown", this.handlePointerDown);
  }

  private handlePointerDown = (e: PointerEvent) => {
    const root = this.getRootNode();

    if (root instanceof ShadowRoot || root instanceof Document) {
      const handle = root.querySelector("resize-handle") as ResizeHandle | null;
      handle?.startDrag(e);
    }
  };

  render() {
    return html``;
  }
}
