import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("control-panel")
export class ControlPanel extends LitElement {
  @property({ type: Number })
  resizerThickness = 4;

  @property({ type: Number })
  resizerGrabThickness = 8;

  @property({ type: Boolean })
  resizerGrabColorEnabled = false;

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

    this.resizerGrabThickness =
      Number(localStorage.getItem("resizer-grab-thickness")) || 8;

    const storedGrabColor = localStorage.getItem("resizer-grab-color-enabled");

    this.resizerGrabColorEnabled =
      storedGrabColor === null ? false : storedGrabColor === "true";

    this.theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "g100"
        : "white");

    this.updateApp();
  }

  updateApp() {
    const app = document.querySelector("app-root");

    // Resizer thickness
    app?.style.setProperty("--resizer-thickness", `${this.resizerThickness}px`);
    localStorage.setItem("resizer-thickness", String(this.resizerThickness));

    app?.style.setProperty(
      "--resizer-grab-thickness",
      `${this.resizerGrabThickness}px`
    );
    localStorage.setItem(
      "resizer-grab-thickness",
      String(this.resizerGrabThickness)
    );

    app?.style.setProperty(
      "--resizer-grab-color",
      this.resizerGrabColorEnabled
        ? "var(--cds-background-selected)"
        : "transparent"
    );
    localStorage.setItem(
      "resizer-grab-color-enabled",
      String(this.resizerGrabColorEnabled)
    );

    // Theme
    document.documentElement.className = `cds-theme-zone-${this.theme}`;
    localStorage.setItem("theme", this.theme);
  }

  render() {
    return html`
      <cds-layer level="1">
        <cds-stack gap="7">
          <cds-heading>Resizer</cds-heading>

          <!-- Resizer Thickness -->
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
          <cds-number-input
            label="--resizer-grab-thickness"
            min="0"
            max="32"
            step="1"
            invalid-text="Are you sure about that?"
            .value=${this.resizerGrabThickness}
            @cds-number-input=${(e: any) => {
              this.resizerGrabThickness = Number(e.target.value);
              this.updateApp();
            }}
          ></cds-number-input>
          <cds-checkbox
            ?checked=${this.resizerGrabColorEnabled}
            @cds-checkbox-changed=${(e: any) => {
              this.resizerGrabColorEnabled = e.target.checked;
              this.updateApp();
            }}
          >
            Show grabbable area
          </cds-checkbox>

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
              this.resizerGrabThickness = 8;
              this.resizerGrabColorEnabled = false;
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
