import { LitElement, css, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";

class VerticalExample extends LitElement {
  static styles = css``;

  render() {
    return html`
      <resize-grid axis="y">
        <resize-panel slot="top">Panel 1</resize-panel>
        <resize-handle slot="handle-vertical">
          <div
            slot="icon"
            style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px)); background: currentColor;"
          ></div>
        </resize-handle>
        <resize-panel slot="bottom">Panel 2</resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("vertical-example", VerticalExample);
