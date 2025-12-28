import { LitElement, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";

class HorizontalExample extends LitElement {
  render() {
    return html`
      <resize-grid axis="horizontal">
        <resize-panel position="start">Left content</resize-panel>
        <resize-handle>
          <div class="handle-icon"></div>
        </resize-handle>
        <resize-panel position="end">Right content</resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("horizontal-example", HorizontalExample);
