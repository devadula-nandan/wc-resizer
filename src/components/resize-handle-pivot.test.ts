import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { ResizeHandlePivot } from './resize-handle-pivot.js';
import './resize-grid.js';
import './resize-panel.js';
import './resize-handle.js';

describe('ResizeHandlePivot', () => {
  let pivot: ResizeHandlePivot;

  beforeEach(async () => {
    pivot = await fixture(html`<resize-handle-pivot></resize-handle-pivot>`);
  });

  describe('initialization', () => {
    it('should be defined', () => {
      expect(pivot).to.be.instanceOf(ResizeHandlePivot);
    });

    it('should set slot attribute', () => {
      expect(pivot.getAttribute('slot')).to.equal('pivot');
    });
  });

  describe('within resize-panel', () => {
    let grid: HTMLElement;
    let panel: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start" pivot="start">
            <resize-handle-pivot></resize-handle-pivot>
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;
    });

    it('should set position attribute from parent panel', () => {
      expect(pivot.getAttribute('position')).to.equal('start');
    });

    it('should have correct cursor style', () => {
      const styles = window.getComputedStyle(pivot);
      expect(styles.cursor).to.equal('all-scroll');
    });
  });

  describe('pointer events', () => {
    let grid: HTMLElement;
    let handle: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start" pivot="start">
            <resize-handle-pivot></resize-handle-pivot>
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      const panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;
      handle = grid.querySelector('resize-handle')!;
    });

    it('should delegate pointerdown to resize-handle', async () => {
      const listener = oneEvent(handle, 'handle:dragstart');
      pivot.dispatchEvent(new PointerEvent('pointerdown', { 
        clientX: 100, 
        clientY: 100, 
        bubbles: true,
        composed: true
      }));
      await listener;
    });
  });

  describe('double click events', () => {
    let grid: HTMLElement;
    let handle: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start" pivot="start">
            <resize-handle-pivot></resize-handle-pivot>
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      const panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;
      handle = grid.querySelector('resize-handle')!;
    });

    it('should delegate dblclick to resize-handle', async () => {
      const listener = oneEvent(grid, 'handle:doubletap');
      pivot.dispatchEvent(new MouseEvent('dblclick', { 
        bubbles: true,
        composed: true
      }));
      await listener;
    });
  });

  describe('positioning', () => {
    it('should have negative margin for start position', async () => {
      const grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start" pivot="start">
            <resize-handle-pivot></resize-handle-pivot>
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      const panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;

      expect(pivot.getAttribute('position')).to.equal('start');
    });
  });

  describe('styling', () => {
    it('should be absolutely positioned', () => {
      const styles = window.getComputedStyle(pivot);
      expect(styles.position).to.equal('absolute');
    });

    it('should have user-select none', () => {
      const styles = window.getComputedStyle(pivot);
      expect(styles.userSelect).to.equal('none');
    });

    it('should use currentColor for background', () => {
      const styles = window.getComputedStyle(pivot);
      expect(styles.background).to.include('currentcolor');
    });
  });

  describe('grab area', () => {
    it('should have ::before pseudo-element for grab area', async () => {
      const grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start" pivot="start">
            <resize-handle-pivot></resize-handle-pivot>
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      const panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;

      const beforeStyles = window.getComputedStyle(pivot, '::before');
      expect(beforeStyles.content).to.not.equal('none');
      expect(beforeStyles.position).to.equal('absolute');
    });
  });

  describe('shadow DOM integration', () => {
    it('should work within shadow DOM', async () => {
      const container = await fixture(html`
        <div>
          <resize-grid axis="horizontal">
            <resize-panel slot="start" position="start" pivot="start">
              <resize-handle-pivot></resize-handle-pivot>
              <div style="width: 200px;">Start</div>
            </resize-panel>
            <resize-handle slot="handle"></resize-handle>
            <resize-panel slot="end" position="end">
              <div style="width: 200px;">End</div>
            </resize-panel>
          </resize-grid>
        </div>
      `);

      const grid = container.querySelector('resize-grid')!;
      const panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;

      expect(pivot).to.be.instanceOf(ResizeHandlePivot);
      expect(pivot.getAttribute('position')).to.equal('start');
    });
  });

  describe('event delegation', () => {
    it('should find resize-handle in same root', async () => {
      const grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start" pivot="start">
            <resize-handle-pivot></resize-handle-pivot>
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      const panel = grid.querySelector('resize-panel[position="start"]')!;
      pivot = panel.querySelector('resize-handle-pivot')!;
      const handle = grid.querySelector('resize-handle')!;

      let dragStartFired = false;
      handle.addEventListener('handle:dragstart', () => {
        dragStartFired = true;
      });

      pivot.dispatchEvent(new PointerEvent('pointerdown', { 
        clientX: 100, 
        clientY: 100, 
        bubbles: true,
        composed: true
      }));

      await new Promise(resolve => setTimeout(resolve, 50));
      expect(dragStartFired).to.be.true;
    });
  });

  describe('render', () => {
    it('should render empty template', () => {
      expect(pivot.shadowRoot?.textContent?.trim()).to.equal('');
    });

    it('should not have any child elements', () => {
      expect(pivot.shadowRoot?.children.length).to.equal(0);
    });
  });
});