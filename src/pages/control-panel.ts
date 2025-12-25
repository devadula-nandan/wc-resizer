import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("control-panel")
export class ControlPanel extends LitElement {
  @property({ type: Number })
  resizerThickness = 4;

  @property({ type: String })
  theme = "white";

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

    this.theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "g100"
        : "white");

    this.updateApp();
  }

  updateApp() {
    // Resizer
    document
      .querySelector("app-root")
      ?.style.setProperty("--resizer-thickness", `${this.resizerThickness}px`);
    localStorage.setItem("resizer-thickness", String(this.resizerThickness));

    // Theme
    document.documentElement.className = `cds-theme-zone-${this.theme}`;
    localStorage.setItem("theme", this.theme);
  }

  render() {
    return html`
      <cds-layer level="1">
        <cds-stack gap="7">
          <cds-heading>Resizer</cds-heading>

          <!-- Resizer -->
          <cds-number-input
            label="--resizer-thickness"
            min="0"
            max="16"
            step="1"
            invalid-text="Are you sure about that?"
            .value=${this.resizerThickness}
            @cds-number-input=${(e: any) => {
              this.resizerThickness = Number(e.target.value);
              this.updateApp();
            }}
          ></cds-number-input>

          <!-- Theme -->
          <cds-dropdown
            label="Theme"
            .value=${this.theme}
            @cds-dropdown-selected=${(e: any) => {
              this.theme = e.detail.item.value;
              this.updateApp();
              this.requestUpdate();
            }}
          >
            <cds-dropdown-item value="white">White</cds-dropdown-item>
            <cds-dropdown-item value="g10">Gray 10</cds-dropdown-item>
            <cds-dropdown-item value="g90">Gray 90</cds-dropdown-item>
            <cds-dropdown-item value="g100">Dark</cds-dropdown-item>
          </cds-dropdown>

          <!-- Reset -->
          <cds-button
            kind="danger"
            @click=${() => {
              this.resizerThickness = 4;
              this.theme = "white";
              this.updateApp();
              this.requestUpdate();
            }}
          >
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
