import { LitElement, css, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";
import "../components/resize-handle-pivot";

class PivotExample extends LitElement {
  static styles = css``;

  render() {
    return html`
      <resize-grid axis="x">
        <resize-panel slot="left"> Panel 1 </resize-panel>
        <resize-handle slot="handle-horizontal"></resize-handle>
        <resize-panel slot="right">
          <resize-grid axis="y">
            <resize-panel slot="top">Panel 2</resize-panel>
            <resize-handle slot="handle-vertical">
              <resize-handle-pivot></resize-handle-pivot>
              <svg
                slot="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1 1"
                style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px));"
              >
                <rect width="1" height="1" fill="currentColor"></rect>
              </svg>
            </resize-handle>
            <resize-panel slot="bottom">Panel 3</resize-panel>
          </resize-grid>
        </resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("pivot-example", PivotExample);
