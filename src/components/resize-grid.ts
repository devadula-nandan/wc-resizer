import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("resize-grid")
export class ResizeGrid extends LitElement {
  static styles = css`
    :host {
      --start-element-size: 1fr;
      --end-element-size: 1fr;

      display: grid;
      block-size: 100%;
      inline-size: 100%;
      overflow: hidden;

      transition: grid-template-columns 180ms cubic-bezier(0.25, 0.9, 0.25, 1),
        grid-template-rows 180ms cubic-bezier(0.25, 0.9, 0.25, 1);
    }

    :host([axis="x"]) {
      grid-template-columns: var(--start-element-size) auto var(
          --end-element-size
        );
    }

    :host([axis="y"]) {
      grid-template-rows: var(--start-element-size) auto var(--end-element-size);
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }
  `;

  render() {
    return html`
      <slot name="left"></slot>
      <slot name="top"></slot>
      <slot name="handle-horizontal"></slot>
      <slot name="handle-vertical"></slot>
      <slot name="right"></slot>
      <slot name="bottom"></slot>
    `;
  }
}
