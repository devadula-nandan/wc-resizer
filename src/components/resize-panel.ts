import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("resize-panel")
export class ResizePanel extends LitElement {
  static styles = css`
    :host {
      overflow: hidden;
    }
  `;
  render() {
    return html` <slot></slot> `;
  }
}
