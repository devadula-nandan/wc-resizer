import { LitElement, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";
import "../components/resize-handle-pivot";

class PivotExample extends LitElement {
  render() {
    return html`
      <resize-grid axis="horizontal">
        <resize-panel position="start">Left panel</resize-panel>
        <resize-handle></resize-handle>
        <resize-panel position="end">
          <resize-grid axis="vertical">
            <resize-panel position="start">Top right</resize-panel>
            <resize-handle></resize-handle>
            <resize-panel position="end">Bottom right</resize-panel>
          </resize-grid>
        </resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("pivot-example", PivotExample);
