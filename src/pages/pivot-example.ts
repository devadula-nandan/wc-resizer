import { LitElement, css, html } from "lit";
import "../components/resizer";
import "../components/pivot-resizer";

class AxisExample extends LitElement {
  static styles = css`
    .outer {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      width: 600px;
      height: 400px;
    }
    .right {
      display: grid;
      grid-template-rows: 1fr auto 1fr;
    }
    .panel {
      background: #ffffff31;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const outer = this.renderRoot.querySelector(".outer")!;
      const right = this.renderRoot.querySelector(".right")!;

      const rx = this.renderRoot.querySelector("#rx") as any;
      const ry = this.renderRoot.querySelector("#ry") as any;

      rx.containerNode = outer;
      rx.leftNode = this.renderRoot.querySelector("#el1")!;
      rx.rightNode = this.renderRoot.querySelector("#right")!;

      ry.containerNode = right;
      ry.orientation = "vertical";
      ry.topNode = this.renderRoot.querySelector("#el3")!;
      ry.bottomNode = this.renderRoot.querySelector("#el4")!;

      const pivot = this.renderRoot.querySelector("wc-pivot-resizer") as any;
      pivot.xResizer = rx;
      pivot.yResizer = ry;
    });
  }

  render() {
    return html`
      <div class="outer">
        <div id="el1" class="panel">1</div>
        <wc-resizer id="rx"></wc-resizer>
        <div id="right" class="right">
          <div id="el3" class="panel">3</div>
          <wc-resizer id="ry" orientation="vertical"><wc-pivot-resizer></wc-pivot-resizer></wc-resizer>
          <div id="el4" class="panel">4</div>
        </div>
        
      </div>
    `;
  }
}

customElements.define("pivot-example", AxisExample);
