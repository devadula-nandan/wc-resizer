import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('main-navigation')
export class MainNavigation extends LitElement {
  static styles = [
    css`
      :host {
        font-size: 1rem;
      }
    `
  ];
  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/vertical-example">Vertical Example</a>
        <a href="/horizontal-example">Horizontal Example</a>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-navigation': MainNavigation;
  }
}
