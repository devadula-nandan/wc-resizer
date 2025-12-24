import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("control-panel")
export class ControlPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      box-sizing: border-box;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    document.querySelector("app-root")?.style.setProperty(
      "--resizer-thickness",
      `4px`
    );
  }

  render() {
    return html`
      <cds-layer level="1">
        <cds-form id="test-form">
          <cds-stack gap="7">
            <cds-heading>Resizer Controls</cds-heading>
            <cds-number-input
              label="--resizer-thickness"
              min="0"
              max="16"
              value="4"
              step="1"
              invalid-text="Are you sure about that?"
              @cds-number-input=${(e: any) => {
               document.querySelector("app-root")?.style.setProperty(
                  "--resizer-thickness",
                  `${e.target.value}px`
                );
                
              }}
              icon-description="Add/decrement number"
            ></cds-number-input>

            <!-- <cds-button type="submit"> Submit </cds-button> -->
          </cds-stack>
        </cds-form>
      </cds-layer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "control-panel": ControlPanel;
  }
}
