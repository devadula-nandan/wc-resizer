import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/resizer";
import "./pages/vertical-example";
import "./pages/horizontal-example";
import "./pages/pivot-example";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
    }
    cds-tabs {
      box-shadow: inset 0px -2px 0px var(--cds-border-subtle);
      background-color: var(--cds-layer-01);
    }
  `;
  private getTabFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") ?? "home";
  }
  firstUpdated() {
    const tab = this.getTabFromUrl();

    const tabEl = this.renderRoot.querySelector<HTMLElement>(
      `cds-tab[value="${tab}"]`
    );
    requestAnimationFrame(() => {
      tabEl?.click();
    });
  }

  private updateUrl(tab: string) {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState({}, "", newUrl);
  }

  render() {
    return html`
      <main>
        <cds-tabs
          type=""
          @cds-tabs-selected=${(e: CustomEvent) => {
            const tabValue = e.detail.item.value;
            this.updateUrl(tabValue);
          }}
        >
          <cds-tab id="tab-home" target="panel-home" value="home">Home</cds-tab>

          <cds-tab
            id="tab-vertical-example"
            target="panel-vertical-example"
            value="vertical-example"
            >Vertical</cds-tab
          >
          <cds-tab
            id="tab-horizontal-example"
            target="panel-horizontal-example"
            value="horizontal-example"
            >Horizontal</cds-tab
          >
          <cds-tab
            id="tab-pivot-example"
            target="panel-pivot-example"
            value="pivot-example"
            >Pivot</cds-tab
          >
        </cds-tabs>
        <div
          id="panel-home"
          role="tabpanel"
          aria-labelledby="tab-home"
          hidden=""
        >
          Tab Panel 1
        </div>
        <div
          id="panel-vertical-example"
          role="tabpanel"
          aria-labelledby="tab-vertical-example"
          hidden=""
        >
          <vertical-example></vertical-example>
        </div>
        <div
          id="panel-horizontal-example"
          role="tabpanel"
          aria-labelledby="tab-horizontal-example"
          hidden=""
        >
          <horizontal-example></horizontal-example>
        </div>
        <div
          id="panel-pivot-example"
          role="tabpanel"
          aria-labelledby="tab-pivot-example"
          hidden=""
        >
          <pivot-example></pivot-example>
        </div>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
