import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "./pages/pivot-example";
import "./pages/control-panel";

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
    .custom-flex {
      display: flex;
      height: calc(100dvh - 40px);
    }
    .left {
      flex: 1;
      max-inline-size: calc(100% - 24rem - 1px);
      max-block-size: 100%;
    }
    .right {
      flex: 0 0 24rem;
      background-color: var(--cds-layer-01);
      border-inline-start: 1px solid var(--cds-border-subtle);
    }
    .resize {
      resize: both;
      padding: 1rem;
      border: dashed 1px var(--cds-border-strong);
      /* outline: dashed 1px var(--cds-border-strong); */
      outline-offset: -17px;
      overflow: hidden;
      max-inline-size: calc(100% - 34px);
      max-block-size: calc(100% - 34px);
      block-size: 100%;
      min-inline-size: 120px;
      min-block-size: 120px;
      box-shadow: inset 0 0 0 1rem var(--cds-layer-02);
    }
    [role="tabpanel"] {
      block-size: 100%;
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
        <div class="custom-flex">
        <div class="left">
          <div class="resize">
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
          </div>
        </div>
        <aside class="controls right">
          <control-panel></control-panel>
        </aside>
        </div>
      </main>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
