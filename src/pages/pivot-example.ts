import { LitElement, css, html } from "lit";
import "../components/resizer";

class PivotExample extends LitElement {
  static styles = css`
    #el-1 {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: hidden;
    }
    #el-2 {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: hidden;
    }
    #el-3 {
      height: 198px;
      background-color: #ffffff31;
      overflow: hidden;
    }
    #el-4 {
      height: 198px;
      background-color: #ffffff31;
      overflow: hidden;
    }

    #ex-pivot {
      block-size: 4px;
      inline-size: 4px;
      background: #ffffff;
      position: absolute;
      z-index: 10;
      margin-left: -4px;
      cursor: move;

      &::before {
        content: "";
        block-size: 12px;
        inline-size: 12px;
        background: transparent;
        position: absolute;
        inset: 50%;
        /* background-color: #ffffff13; */
        background-color: transparent;
        transform: translate(-50%, -50%);
      }
    }

    .c-1 {
      position: relative;
    }

    wc-resizer {
      background: gray;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const horizontalResizer = this.renderRoot.querySelector("#ex-1") as HTMLElement & {
        leftNode: HTMLElement;
        rightNode: HTMLElement;
      };
      const verticalResizer = this.renderRoot.querySelector("#ex-2") as HTMLElement & {
        topNode: HTMLElement;
        bottomNode: HTMLElement;
      };
      const resizerAxis = this.renderRoot.querySelector("#ex-pivot") as HTMLElement & {
        leftNode: HTMLElement;
        rightNode: HTMLElement;
        topNode: HTMLElement;
        bottomNode: HTMLElement;
      };
      const el1 = this.renderRoot.querySelector("#el-1") as HTMLElement;
      const el2 = this.renderRoot.querySelector("#el-2") as HTMLElement;
      const el3 = this.renderRoot.querySelector("#el-3") as HTMLElement;
      const el4 = this.renderRoot.querySelector("#el-4") as HTMLElement;

      horizontalResizer.leftNode = el1;
      horizontalResizer.rightNode = el2;
      verticalResizer.topNode = el3;
      verticalResizer.bottomNode = el4;

      resizerAxis.leftNode = el1;
      resizerAxis.rightNode = el2;
      resizerAxis.topNode = el3;
      resizerAxis.bottomNode = el4;

    });
  }
  render() {
    return html`
      <div class="container c-1" style="display: inline-flex;">
        <div id="el-1">element 1</div>
        <wc-resizer id="ex-1" bounded> </wc-resizer>
        <div class="container" id="el-2" style="display: inline-flex; flex-direction: column;">
          <div id="el-3">element 3</div>
         <div id="ex-1-2"> <wc-resizer id="ex-pivot" bounded> </wc-resizer>
          <wc-resizer id="ex-2" orientation="vertical" bounded> </wc-resizer></div>
          <div id="el-4">element 4</div>
        </div>
      </div>
    `;
  }
}

customElements.define("pivot-example", PivotExample);
