import { LitElement, css, html } from "lit";
import "../components/resizer";
import "../components/resizer-pivot";

class PivotExample extends LitElement {
  static styles = css`
    .el {
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    .horizontal-container {
      --start-element-size: 1fr;
      --end-element-size: 1fr;
      display: grid;
      grid-template-columns: var(--start-element-size) auto var(
          --end-element-size
        );
      block-size: 100%;
    }
    .vertical-container {
      --start-element-size: 1fr;
      --end-element-size: 1fr;
      display: grid;
      grid-template-rows: var(--start-element-size) auto var(--end-element-size);
      block-size: 100%;
    }

    wc-resizer {
      background-color: var(--cds-border-subtle);
    }
    wc-resizer-pivot {
      background-color: var(--cds-text-primary);
    }
    cds-toggle {
      padding: 0.6rem;
      display: block;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const horizontalResizer = this.renderRoot.querySelector(
        "#horizontal-resizer"
      ) as any;

      const verticalResizer = this.renderRoot.querySelector(
        "#vertical-resizer"
      ) as any;

      const pivotResizer = this.renderRoot.querySelector(
        "#pivot-resizer"
      ) as any;

      const el1 = this.renderRoot.querySelectorAll(".el")[0] as HTMLElement;
      const el2 = this.renderRoot.querySelectorAll(".el")[1] as HTMLElement;
      const el3 = this.renderRoot.querySelectorAll(".el")[2] as HTMLElement;
      const el4 = this.renderRoot.querySelectorAll(".el")[3] as HTMLElement;

      horizontalResizer.leftNode = el1;
      horizontalResizer.rightNode = el2;

      verticalResizer.topNode = el3;
      verticalResizer.bottomNode = el4;

      pivotResizer.horizontalResizer = horizontalResizer;
      pivotResizer.verticalResizer = verticalResizer;
    });
  }
  render() {
    return html`
      <div class="horizontal-container">
        <div class="el">
          <cds-toggle
            label-b="Fluid"
            label-a="Fixed"
            size="sm"
            @cds-toggle-changed=${(e: any) =>
              e.target.parentElement.toggleAttribute(
                "data-fixed",
                e.target.toggled
              )}
          ></cds-toggle>
        </div>
        <wc-resizer id="horizontal-resizer"> </wc-resizer>
        <div class="vertical-container el">
          <div class="el">
            <cds-toggle
              label-b="Fluid"
              label-a="Fixed"
              size="sm"
              @cds-toggle-changed=${(e: any) =>
                e.target.parentElement.toggleAttribute(
                  "data-fixed",
                  e.target.toggled
                )}
            ></cds-toggle>
          </div>
          <wc-resizer id="vertical-resizer" orientation="vertical">
            <wc-resizer-pivot id="pivot-resizer" slot="pivot-start">
            </wc-resizer-pivot>
            <svg
              slot="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1 1"
              style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px));"
            >
              <rect width="1" height="1" fill="currentColor" />
            </svg>
          </wc-resizer>

          <div class="el">
            <cds-toggle
              label-b="Fluid"
              label-a="Fixed"
              size="sm"
              @cds-toggle-changed=${(e: any) =>
                e.target.parentElement.toggleAttribute(
                  "data-fixed",
                  e.target.toggled
                )}
            ></cds-toggle>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("pivot-example", PivotExample);
