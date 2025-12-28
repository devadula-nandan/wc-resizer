import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { PanelPosition } from "./types.js";

// ============================================================================
// RESIZE PANEL - Panel container
// ============================================================================

@customElement("resize-panel")
export class ResizePanel extends LitElement {
  @property({ type: String, reflect: true })
  position: PanelPosition = "start";

  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      contain: layout style paint;
      min-block-size: 0;
      min-inline-size: 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Auto-set slot based on position
    if (!this.hasAttribute("slot")) {
      this.setAttribute("slot", this.position);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
