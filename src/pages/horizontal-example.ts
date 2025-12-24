import { LitElement, css, html } from "lit";
import "../components/resizer";
import "../components/pivot-resizer";

class HorizontalExample extends LitElement {
  static styles = css`
    .outer {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      width: 600px;
      height: 400px;
    }
    .panel {
      background: #ffffff31;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const rx = this.renderRoot.querySelector("#rx") as any;
      rx.leftNode = this.renderRoot.querySelector("#left");
      rx.rightNode = this.renderRoot.querySelector("#right");
    });
  }

  render() {
    return html`
      <div class="outer">
        <div id="left" class="panel">1</div>
        <wc-resizer id="rx"></wc-resizer>
        <div id="right" class="panel">2</div>
      </div>
    `;
  }
}

customElements.define("horizontal-example", HorizontalExample);
