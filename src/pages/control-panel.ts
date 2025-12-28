import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("control-panel")
export class ControlPanel extends LitElement {
  @property({ type: Number })
  resizeHandleSize = 4;

  @property({ type: Number })
  resizeHandleGrabArea = 8;

  @property({ type: Boolean })
  resizeHandleGrabBg = false;

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

    this.resizeHandleSize =
      Number(localStorage.getItem("resize-handle-size")) || 4;

    this.resizeHandleGrabArea =
      Number(localStorage.getItem("resize-handle-grab-area")) || 8;

    const storedGrabColor = localStorage.getItem("--resize-handle-grab-bg");

    this.resizeHandleGrabBg =
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
    app?.style.setProperty(
      "--resize-handle-size",
      `${this.resizeHandleSize}px`
    );
    localStorage.setItem("resize-handle-size", String(this.resizeHandleSize));

    app?.style.setProperty(
      "--resize-handle-grab-area",
      `${this.resizeHandleGrabArea}px`
    );
    localStorage.setItem(
      "resize-handle-grab-area",
      String(this.resizeHandleGrabArea)
    );

    app?.style.setProperty(
      "--resize-handle-grab-bg",
      this.resizeHandleGrabBg ? "var(--cds-background-selected)" : "transparent"
    );
    localStorage.setItem(
      "--resize-handle-grab-bg",
      String(this.resizeHandleGrabBg)
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
            label="--resize-handle-size"
            min="0"
            max="16"
            step="1"
            invalid-text="Are you sure about that?"
            .value=${this.resizeHandleSize}
            @cds-number-input=${(e: any) => {
              this.resizeHandleSize = Number(e.target.value);
              this.updateApp();
            }}
          ></cds-number-input>
          <cds-number-input
            label="--resize-handle-grab-area"
            min="0"
            max="32"
            step="1"
            invalid-text="Are you sure about that?"
            .value=${this.resizeHandleGrabArea}
            @cds-number-input=${(e: any) => {
              this.resizeHandleGrabArea = Number(e.target.value);
              this.updateApp();
            }}
          ></cds-number-input>
          <cds-checkbox
            ?checked=${this.resizeHandleGrabBg}
            @cds-checkbox-changed=${(e: any) => {
              this.resizeHandleGrabBg = e.target.checked;
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
              this.resizeHandleSize = 4;
              this.resizeHandleGrabArea = 8;
              this.resizeHandleGrabBg = false;
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
