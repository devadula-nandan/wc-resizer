import { LitElement, css, html } from "lit";
import "../components/resizer";

class HorizontalExample extends LitElement {
  static styles = css`
    .el {
      background-color: var(--cds-layer);
      overflow: auto;
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

    wc-resizer {
      background: var(--cds-border-subtle);
    }
    cds-toggle {
      padding: 0.6rem;
      display: block;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const resizer = this.renderRoot.querySelector(
        "#horizontal-resizer"
      ) as any;
      const el1 = this.renderRoot.querySelectorAll(".el")[0] as HTMLElement;
      const el2 = this.renderRoot.querySelectorAll(".el")[1] as HTMLElement;

      resizer.leftNode = el1;
      resizer.rightNode = el2;
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
        <wc-resizer id="horizontal-resizer">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            style="width: max( 1px, var(--resizer-thickness, 1px));height: max( 1px, var(--resizer-thickness, 1px));"
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
    `;
  }
}

customElements.define("horizontal-example", HorizontalExample);
