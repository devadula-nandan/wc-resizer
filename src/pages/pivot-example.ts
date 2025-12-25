import { LitElement, css, html } from "lit";
import "../components/resize-grid";
import "../components/resize-panel";
import "../components/resize-handle";
import "../components/resize-handle-pivot";

class PivotExample extends LitElement {
  static styles = css`
    .outer-grid {
      --start-element-size: 1fr;
      --end-element-size: 4fr;
    }
    .inner-grid {
      --start-element-size: 3fr;
      --end-element-size: 1fr;
    }
    cds-toggle {
      padding: 0.6rem;
      display: block;
    }
  `;

  render() {
    return html`
      <resize-grid axis="x" class="outer-grid">
        <resize-panel slot="left">
          <cds-toggle
            label-b="Fluid"
            label-a="Fixed"
            size="sm"
            @cds-toggle-changed=${(e: any) =>
              e.target.parentElement.toggleAttribute("fixed", e.target.toggled)}
          ></cds-toggle>
        </resize-panel>
        <resize-handle slot="handle-horizontal"></resize-handle>
        <resize-panel slot="right">
          <resize-grid axis="y" class="inner-grid">
            <resize-panel slot="top">
              <cds-toggle
                label-b="Fluid"
                label-a="Fixed"
                size="sm"
                @cds-toggle-changed=${(e: any) =>
                  e.target.parentElement.toggleAttribute(
                    "fixed",
                    e.target.toggled
                  )}
              ></cds-toggle>
            </resize-panel>
            <resize-handle slot="handle-vertical">
              <resize-handle-pivot></resize-handle-pivot>
              <div
                slot="icon"
                style="height: max(1px, var(--resizer-thickness, 1px));width: clamp(1px, var(--resizer-thickness, 1px), 100%); background: currentColor;"
              ></div>
            </resize-handle>
            <resize-panel slot="bottom">
              <cds-toggle
                label-b="Fluid"
                label-a="Fixed"
                size="sm"
                @cds-toggle-changed=${(e: any) =>
                  e.target.parentElement.toggleAttribute(
                    "fixed",
                    e.target.toggled
                  )}
              ></cds-toggle>
            </resize-panel>
          </resize-grid>
        </resize-panel>
      </resize-grid>
    `;
  }
}

customElements.define("pivot-example", PivotExample);
