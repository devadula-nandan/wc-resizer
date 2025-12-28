// ============================================================================
// RESIZE GRID - Container
// ============================================================================

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Axis } from "./types.js";
import { ResizeResetEvent } from "./types.js";

@customElement("resize-grid")
export class ResizeGrid extends LitElement {
  @property({ type: String, reflect: true })
  axis: Axis = "horizontal";

  @property({ type: Number })
  startSize: number = 1;

  @property({ type: Number })
  endSize: number = 1;

  @property({ type: Boolean, attribute: "disable-transitions" })
  disableTransitions = false;

  static styles = css`
    :host {
      display: grid;
      block-size: 100%;
      inline-size: 100%;
      overflow: hidden;
      contain: layout style;
    }

    :host([axis="horizontal"]) {
      grid-template-columns: var(--start-size, 1fr) auto var(--end-size, 1fr);
    }

    :host([axis="vertical"]) {
      grid-template-rows: var(--start-size, 1fr) auto var(--end-size, 1fr);
    }

    :host(:not([disable-transitions])) {
      transition: grid-template-columns 180ms cubic-bezier(0.25, 0.9, 0.25, 1),
        grid-template-rows 180ms cubic-bezier(0.25, 0.9, 0.25, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none !important;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateSizeProperties();
  }

  updated(changed: Map<string, any>) {
    if (changed.has("startSize") || changed.has("endSize")) {
      this.updateSizeProperties();
    }
  }

  private updateSizeProperties() {
    this.style.setProperty("--start-size", `${this.startSize}fr`);
    this.style.setProperty("--end-size", `${this.endSize}fr`);
  }

  setSizes(startRatio: number, endRatio: number) {
    this.startSize = startRatio;
    this.endSize = endRatio;
  }

  resetSizes() {
    this.startSize = 1;
    this.endSize = 1;
    this.dispatchEvent(new ResizeResetEvent(this.axis));
  }

  getAxis(): Axis {
    return this.axis;
  }

  render() {
    const slots =
      this.axis === "horizontal"
        ? ["start", "handle", "end"]
        : ["start", "handle", "end"];

    return html`
      <slot name="${slots[0]}"></slot>
      <slot name="${slots[1]}"></slot>
      <slot name="${slots[2]}"></slot>
    `;
  }
}
