import { LitElement, css, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";

class VerticalExample extends LitElement {
  render() {
    return html`
      <resize-grid axis="vertical">
        <resize-panel position="start">Top content</resize-panel>
        <resize-handle></resize-handle>
        <resize-panel position="end">Bottom content</resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("vertical-example", VerticalExample);
