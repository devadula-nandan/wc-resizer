import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("resize-handle-pivot")
export class ResizeHandlePivot extends LitElement {
  static styles = css`
    :host {
      display: block;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background: currentColor;
      block-size: max(1px, var(--resizer-thickness));
      inline-size: max(1px, var(--resizer-thickness));
      cursor: all-scroll;
      position: absolute;
      &:before {
        content: "";
        position: absolute;
        margin-block-start: calc(
          -1 * max(0px, var(--resizer-grab-thickness)) / 2
        );
        margin-inline-start: calc(
          -1 * max(0px, var(--resizer-grab-thickness)) / 2
        );
        inline-size: calc(
          max(1px, var(--resizer-thickness)) +
            max(0px, var(--resizer-grab-thickness))
        );
        block-size: calc(
          max(1px, var(--resizer-thickness)) +
            max(0px, var(--resizer-grab-thickness))
        );
        background-color: var(--resizer-grab-color);
        z-index: 1;
      }
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

  private resetSizes = (_e: MouseEvent) => {
    // Double-click to reset - handled by resize-handle via event bubbling
    this.dispatchEvent(
      new CustomEvent("handle:doubletap", {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private handlePointerDown = (e: PointerEvent) => {
    // Forward pointer events to resize-handle via event bubbling
    this.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        composed: true,
        clientX: e.clientX,
        clientY: e.clientY,
        pointerId: e.pointerId,
        pointerType: e.pointerType,
      }),
    );
  };

  render() {
    return html``;
  }
}
