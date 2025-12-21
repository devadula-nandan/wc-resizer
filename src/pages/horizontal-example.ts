import { LitElement, css, html } from "lit";
import "../components/resizer";

class HorizontalExample extends LitElement {
  static styles = css`
    .el {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: auto;
    }

    wc-resizer {
      background: gray;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const resizer = this.renderRoot.querySelector("#ex-2") as HTMLElement & {
        leftNode: HTMLElement;
        rightNode: HTMLElement;
      };
      const el1 = this.renderRoot.querySelector("#ex-2-el-1") as HTMLElement;
      const el2 = this.renderRoot.querySelector("#ex-2-el-2") as HTMLElement;

      resizer.leftNode = el1;
      resizer.rightNode = el2;
    });
  }
  render() {
    return html`
      <div class="container" style="display: inline-flex;">
        <div id="ex-2-el-1" class="el">element 1</div>
        <wc-resizer id="ex-2" bounded> </wc-resizer>
        <div id="ex-2-el-2" class="el">element 2</div>
      </div>
    `;
  }
}

customElements.define("horizontal-example", HorizontalExample);
