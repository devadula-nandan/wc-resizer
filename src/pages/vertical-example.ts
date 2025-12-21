import { LitElement, css, html } from "lit";
import "../components/resizer";

class VerticalExample extends LitElement {
  static styles = css`
    .el {
      height: 198px;
      width: 600px;
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
      const resizer = this.renderRoot.querySelector(
        "#ex-1"
      ) as HTMLElement & { topNode: HTMLElement; bottomNode: HTMLElement };
      const el1 = this.renderRoot.querySelector(
        "#ex-1-el-1"
      ) as HTMLElement;
      const el2 = this.renderRoot.querySelector(
        "#ex-1-el-2"
      ) as HTMLElement;
      
      resizer.topNode = el1;
      resizer.bottomNode = el2;
    });
  }
  render() {
    return html`
      <div class="container" style="display: inline-block">
        <div id="ex-1-el-1" class="el">element 1</div>
        <wc-resizer id="ex-1" bounded> </wc-resizer>
        <div id="ex-1-el-2" class="el">element 2</div>
      </div>
    `;
  }
}

customElements.define("vertical-example", VerticalExample);
