import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("control-panel")
export class ControlPanel extends LitElement {
  resizerThickness = 4;

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      box-sizing: border-box;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    this.resizerThickness =
      Number(localStorage.getItem("resizer-thickness")) || 4;

    this.updateApp();
  }

  updateApp() {
    document
      .querySelector("app-root")
      ?.style.setProperty("--resizer-thickness", `${this.resizerThickness}px`);

    localStorage.setItem("resizer-thickness", String(this.resizerThickness));
  }

  render() {
    return html`
      <cds-layer level="1">
        <cds-stack gap="7">
          <cds-heading>Resizer Controls</cds-heading>

          <cds-number-input
            label="--resizer-thickness"
            min="0"
            max="16"
            step="1"
            .value=${this.resizerThickness}
            @cds-number-input=${(e: any) => {
              this.resizerThickness = Number(e.target.value);
              this.updateApp();
            }}
          ></cds-number-input>

          <cds-button kind="danger" @click=${() => {
            this.resizerThickness = 4;
            this.updateApp();
            this.requestUpdate();
          }}>
            Reset
          </cds-button>
        </cds-stack>
      </cds-layer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "control-panel": ControlPanel;
  }
}
