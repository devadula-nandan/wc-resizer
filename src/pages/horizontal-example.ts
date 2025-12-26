import { LitElement, css, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";

class HorizontalExample extends LitElement {
  static styles = css``;

  render() {
    return html`
      <resize-grid axis="x">
        <resize-panel slot="left">Panel 1</resize-panel>
        <resize-handle slot="handle-horizontal">
          <div
            slot="icon"
            style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px)); background: currentColor;"
          ></div>
        </resize-handle>
        <resize-panel slot="right">Panel 2</resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("horizontal-example", HorizontalExample);
