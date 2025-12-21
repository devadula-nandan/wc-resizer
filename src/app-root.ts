import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "./components/main-navigation";
import "./components/resizer";
import "./pages/vertical-example";
import "./pages/horizontal-example";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
    }
  `;
  private router = new Router(this, [
    {
      path: "/vertical-example",
      render: () => html`<vertical-example></vertical-example>`,
    },
    {
      path: "/horizontal-example",
      render: () => html`<horizontal-example></horizontal-example>`,
    },
    {
      path: "/",
      render: () => {
        return html`<p>Welcome to Home</p>`;
      },
    },
  ]);

  render() {
    return html`
      <main-navigation></main-navigation>
      <main>${this.router.outlet()}</main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
