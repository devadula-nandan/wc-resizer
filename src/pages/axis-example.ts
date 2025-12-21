import { LitElement, css, html } from "lit";
import "../components/resizer";

class AxisExample extends LitElement {
  static styles = css`
    #el-1 {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: auto;
    }
    #el-2 {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: auto;
    }
    #el-3 {
      height: 198px;
      background-color: #ffffff31;
      overflow: auto;
    }
    #el-4 {
      height: 198px;
      background-color: #ffffff31;
      overflow: auto;
    }

    #ex-axis {
      block-size: 8px;
      inline-size: 8px;
      background: yellow;
      position: absolute;
      z-index: 10;
      top: -2px;
      left: -2px;
      cursor: move;
    }
    #ex-1-2{
      position: relative;
    }

    wc-resizer {
      background: gray;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const resizer1 = this.renderRoot.querySelector("#ex-1") as HTMLElement & {
        leftNode: HTMLElement;
        rightNode: HTMLElement;
      };
      const resizer2 = this.renderRoot.querySelector("#ex-2") as HTMLElement & {
        topNode: HTMLElement;
        bottomNode: HTMLElement;
      };
      const resizerAxis = this.renderRoot.querySelector("#ex-axis") as HTMLElement & {
        leftNode: HTMLElement;
        rightNode: HTMLElement;
        topNode: HTMLElement;
        bottomNode: HTMLElement;
      };
      const el1 = this.renderRoot.querySelector("#el-1") as HTMLElement;
      const el2 = this.renderRoot.querySelector("#el-2") as HTMLElement;
      const el3 = this.renderRoot.querySelector("#el-3") as HTMLElement;
      const el4 = this.renderRoot.querySelector("#el-4") as HTMLElement;

      resizer1.leftNode = el1;
      resizer1.rightNode = el2;
      resizer2.topNode = el3;
      resizer2.bottomNode = el4;

      resizerAxis.leftNode = el1;
      resizerAxis.rightNode = el2;
      resizerAxis.topNode = el3;
      resizerAxis.bottomNode = el4;

    });
  }
  render() {
    return html`
      <div class="container" style="display: inline-flex;">
        <div id="el-1">element 1</div>
        <wc-resizer id="ex-1" bounded> </wc-resizer>
        <div class="container" id="el-2" style="display: inline-flex; flex-direction: column;">
          <div id="el-3">element 3</div>
         <div id="ex-1-2"> <wc-resizer id="ex-axis" bounded> </wc-resizer>
          <wc-resizer id="ex-2" orientation="vertical" bounded> </wc-resizer></div>
          <div id="el-4">element 4</div>
        </div>
      </div>
    `;
  }
}

customElements.define("axis-example", AxisExample);
