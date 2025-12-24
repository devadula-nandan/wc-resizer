import { LitElement, css, html } from "lit";
import "../components/resizer";
import "../components/resizer-pivot";

class PivotExample extends LitElement {
  static styles = css`
    #el-1 {
      width: 299px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    #el-2 {
      width: 299px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    #el-3 {
      height: 199px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    #el-4 {
      height: 199px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
    }
    wc-resizer-pivot {
      background-color: var(--cds-text-primary);
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
        "wc-resizer-pivot"
      ) as any;

      const el1 = this.renderRoot.querySelector("#el-1") as HTMLElement;
      const el2 = this.renderRoot.querySelector("#el-2") as HTMLElement;
      const el3 = this.renderRoot.querySelector("#el-3") as HTMLElement;
      const el4 = this.renderRoot.querySelector("#el-4") as HTMLElement;

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
      <div class="container c-1" style="display: inline-flex;">
        <div id="el-1">element 1</div>
        <wc-resizer id="horizontal-resizer" bounded> </wc-resizer>
        <div
          class="container"
          id="el-2"
          style="display: inline-flex; flex-direction: column;"
        >
          <div id="el-3">element 3</div>
          <wc-resizer id="vertical-resizer" orientation="vertical" bounded>
            <wc-resizer-pivot slot="pivot-start"> </wc-resizer-pivot>
            <svg
              slot="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1 1"
              style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px));"
            >
              <rect width="1" height="1" fill="currentColor" />
            </svg>
          </wc-resizer>

          <div id="el-4">element 4</div>
        </div>
      </div>
    `;
  }
}

customElements.define("pivot-example", PivotExample);
