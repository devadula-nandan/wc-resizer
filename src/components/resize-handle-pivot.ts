import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/** Public interface of <resize-handle> */
interface ResizeHandle extends HTMLElement {
  startDrag(e: PointerEvent): void;
  resetSizes(e: MouseEvent): void;
}

@customElement("resize-handle-pivot")
export class ResizeHandlePivot extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: currentColor;
      block-size: max(1px, var(--resizer-thickness));
      inline-size: max(1px, var(--resizer-thickness));
      cursor: all-scroll;
      position: absolute;
    }
    :host([position="start"]) {
      margin-inline-start: calc(-1 * max(1px, var(--resizer-thickness)));
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("slot", "pivot");
    this.addEventListener("pointerdown", this.handlePointerDown);
    this.addEventListener("dblclick", this.resetSizes);
    this.setAttribute("position", (this.parentElement as any).pivot);
  }

  private resetSizes = (e: MouseEvent) => {
    const root = this.getRootNode();

    if (root instanceof ShadowRoot || root instanceof Document) {
      const handle = root.querySelector("resize-handle") as ResizeHandle | null;
      handle?.resetSizes(e);
    }
  };

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
