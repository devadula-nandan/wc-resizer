import { LitElement, css, html } from "lit";
import "../components/resizer";

class HorizontalExample extends LitElement {
  static styles = css`
    .el {
      background-color: var(--cds-layer);
      overflow: auto;
    }
    .horizontal-container {
      --start-element-fraction: 1fr;
      --end-element-fraction: 1fr;
      display: grid;
      grid-template-columns: var(--start-element-fraction) auto var(
          --end-element-fraction
        );
      block-size: 100%;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
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
        <div class="el">element 1</div>
        <wc-resizer  id="horizontal-resizer">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            style="width: max( 1px, var(--resizer-thickness, 1px));height: max( 1px, var(--resizer-thickness, 1px));"
          >
            <rect width="1" height="1" fill="currentColor" />
          </svg>
        </wc-resizer>
        <div class="el">element 2</div>
      </div>
    `;
  }
}

customElements.define("horizontal-example", HorizontalExample);
