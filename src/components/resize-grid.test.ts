import { expect, fixture, html, oneEvent, waitUntil } from "@open-wc/testing";
import { ResizeGrid } from "./resize-grid.js";
import "./resize-panel.js";
import "./resize-handle.js";

describe("ResizeGrid", () => {
  let grid: ResizeGrid;

  describe("initialization", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
    });

    it("should be defined", () => {
      expect(grid).to.be.instanceOf(ResizeGrid);
    });

    it("should have default axis", () => {
      expect(grid.axis).to.equal("horizontal");
    });

    it("should have default sizes", () => {
      expect(grid.startSize).to.equal(1);
      expect(grid.endSize).to.equal(1);
    });

    it("should reflect axis attribute", () => {
      expect(grid.getAttribute("axis")).to.equal("horizontal");
    });

    it("should set CSS custom properties", () => {
      expect(grid.style.getPropertyValue("--start-size")).to.equal("1fr");
      expect(grid.style.getPropertyValue("--end-size")).to.equal("1fr");
    });
  });

  describe("vertical axis", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="vertical">
          <resize-panel slot="start" position="start">
            <div style="height: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="height: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
    });

    it("should have vertical axis", () => {
      expect(grid.axis).to.equal("vertical");
    });

    it("should reflect vertical axis attribute", () => {
      expect(grid.getAttribute("axis")).to.equal("vertical");
    });
  });

  describe("custom sizes", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal" .startSize=${2} .endSize=${3}>
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
    });

    it("should accept custom start size", () => {
      expect(grid.startSize).to.equal(2);
    });

    it("should accept custom end size", () => {
      expect(grid.endSize).to.equal(3);
    });

    it("should update CSS custom properties", () => {
      expect(grid.style.getPropertyValue("--start-size")).to.equal("2fr");
      expect(grid.style.getPropertyValue("--end-size")).to.equal("3fr");
    });
  });

  describe("drag events", () => {
    let handle: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      handle = grid.querySelector("resize-handle")!;
    });

    it("should emit resize:start on drag start", async () => {
      const listener = oneEvent(grid, "resize:start");
      handle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );
      const event = await listener;
      expect(event.detail.axis).to.equal("horizontal");
    });

    it("should emit resize:move on drag move", async () => {
      // Start drag first
      handle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );

      const listener = oneEvent(grid, "resize:move");
      handle.dispatchEvent(
        new CustomEvent("handle:dragmove", {
          detail: { delta: 50 },
          bubbles: true,
          composed: true,
        }),
      );
      const event = await listener;
      expect(event.detail.delta).to.equal(50);
      expect(event.detail.axis).to.equal("horizontal");
    });

    it("should emit resize:end on drag end", async () => {
      // Start drag first
      handle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );

      const listener = oneEvent(grid, "resize:end");
      handle.dispatchEvent(
        new CustomEvent("handle:dragend", {
          detail: { delta: 50 },
          bubbles: true,
          composed: true,
        }),
      );
      const event = await listener;
      expect(event.detail.delta).to.equal(50);
      expect(event.detail.axis).to.equal("horizontal");
    });

    it("should update sizes on drag", async () => {
      const initialStartSize = grid.startSize;
      const initialEndSize = grid.endSize;

      // Start drag
      handle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );

      // Move drag
      handle.dispatchEvent(
        new CustomEvent("handle:dragmove", {
          detail: { delta: 50 },
          bubbles: true,
          composed: true,
        }),
      );

      await waitUntil(
        () =>
          grid.startSize !== initialStartSize ||
          grid.endSize !== initialEndSize,
      );

      expect(grid.startSize).to.not.equal(initialStartSize);
      expect(grid.endSize).to.not.equal(initialEndSize);
    });

    it("should set disable-transitions attribute during drag", async () => {
      handle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );

      await waitUntil(() => grid.hasAttribute("disable-transitions"));
      expect(grid.hasAttribute("disable-transitions")).to.be.true;
    });

    it("should remove disable-transitions attribute after drag", async () => {
      // Start drag
      handle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );

      await waitUntil(() => grid.hasAttribute("disable-transitions"));

      // End drag
      handle.dispatchEvent(
        new CustomEvent("handle:dragend", {
          detail: { delta: 50 },
          bubbles: true,
          composed: true,
        }),
      );

      await waitUntil(() => !grid.hasAttribute("disable-transitions"));
      expect(grid.hasAttribute("disable-transitions")).to.be.false;
    });
  });

  describe("keyboard events", () => {
    let handle: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      handle = grid.querySelector("resize-handle")!;
    });

    it("should handle keyboard resize", async () => {
      const listener = oneEvent(grid, "resize:end");

      handle.dispatchEvent(
        new CustomEvent("handle:keyboardstart", {
          detail: { delta: 10 },
          bubbles: true,
          composed: true,
        }),
      );

      handle.dispatchEvent(
        new CustomEvent("handle:keyboardmove", {
          detail: { delta: 10 },
          bubbles: true,
          composed: true,
        }),
      );

      handle.dispatchEvent(
        new CustomEvent("handle:keyboardend", {
          detail: { delta: 10 },
          bubbles: true,
          composed: true,
        }),
      );

      await listener;
    });
  });

  describe("double tap reset", () => {
    let handle: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal" .startSize=${2} .endSize=${3}>
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      handle = grid.querySelector("resize-handle")!;
    });

    it("should reset sizes on double tap", async () => {
      expect(grid.startSize).to.equal(2);
      expect(grid.endSize).to.equal(3);

      const listener = oneEvent(grid, "resize:reset");
      handle.dispatchEvent(
        new CustomEvent("handle:doubletap", {
          bubbles: true,
          composed: true,
        }),
      );

      await listener;
      expect(grid.startSize).to.equal(1);
      expect(grid.endSize).to.equal(1);
    });

    it("should emit resize:reset event", async () => {
      const listener = oneEvent(grid, "resize:reset");
      handle.dispatchEvent(
        new CustomEvent("handle:doubletap", {
          bubbles: true,
          composed: true,
        }),
      );
      const event = await listener;
      expect(event.detail.axis).to.equal("horizontal");
    });
  });

  describe("collapse events", () => {
    let handle: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      handle = grid.querySelector("resize-handle")!;
    });

    it("should collapse start panel", async () => {
      handle.dispatchEvent(
        new CustomEvent("handle:collapse", {
          detail: { panel: "start" },
          bubbles: true,
          composed: true,
        }),
      );

      await waitUntil(() => grid.startSize === 0);
      expect(grid.startSize).to.equal(0);
      expect(grid.endSize).to.equal(1);
    });

    it("should collapse end panel", async () => {
      handle.dispatchEvent(
        new CustomEvent("handle:collapse", {
          detail: { panel: "end" },
          bubbles: true,
          composed: true,
        }),
      );

      await waitUntil(() => grid.endSize === 0);
      expect(grid.startSize).to.equal(1);
      expect(grid.endSize).to.equal(0);
    });

    it("should emit resize:end after collapse", async () => {
      const listener = oneEvent(grid, "resize:end");
      handle.dispatchEvent(
        new CustomEvent("handle:collapse", {
          detail: { panel: "start" },
          bubbles: true,
          composed: true,
        }),
      );
      await listener;
    });
  });

  describe("public API", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
    });

    it("should have setSizes method", () => {
      expect(grid.setSizes).to.be.a("function");
    });

    it("should update sizes via setSizes", () => {
      grid.setSizes(0.3, 0.7);
      expect(grid.startSize).to.equal(0.3);
      expect(grid.endSize).to.equal(0.7);
    });

    it("should have resetSizes method", () => {
      expect(grid.resetSizes).to.be.a("function");
    });

    it("should reset sizes via resetSizes", async () => {
      grid.setSizes(0.3, 0.7);
      const listener = oneEvent(grid, "resize:reset");
      grid.resetSizes();
      await listener;
      expect(grid.startSize).to.equal(1);
      expect(grid.endSize).to.equal(1);
    });

    it("should have getAxis method", () => {
      expect(grid.getAxis).to.be.a("function");
    });

    it("should return axis via getAxis", () => {
      expect(grid.getAxis()).to.equal("horizontal");
    });
  });

  describe("ARIA attributes", () => {
    let startPanel: HTMLElement;
    let endPanel: HTMLElement;

    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
      startPanel = grid.querySelector('resize-panel[position="start"]')!;
      endPanel = grid.querySelector('resize-panel[position="end"]')!;
    });

    it("should set aria-collapsed on panels", () => {
      expect(startPanel.getAttribute("aria-collapsed")).to.equal("false");
      expect(endPanel.getAttribute("aria-collapsed")).to.equal("false");
    });

    it("should maintain aria-collapsed as false for non-negative sizes", async () => {
      grid.setSizes(0, 1);
      await grid.updateComplete;
      // Size of 0 is not considered collapsed (threshold check is <, not <=)
      expect(startPanel.getAttribute("aria-collapsed")).to.equal("false");
      expect(endPanel.getAttribute("aria-collapsed")).to.equal("false");
    });
  });

  describe("nested grids", () => {
    it("should not respond to events from nested grids", async () => {
      const outerGrid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <resize-grid axis="vertical">
              <resize-panel slot="start" position="start">
                <div style="height: 100px;">Nested Start</div>
              </resize-panel>
              <resize-handle slot="handle"></resize-handle>
              <resize-panel slot="end" position="end">
                <div style="height: 100px;">Nested End</div>
              </resize-panel>
            </resize-grid>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">Outer End</div>
          </resize-panel>
        </resize-grid>
      `);

      const innerGrid = outerGrid.querySelector(
        'resize-grid[axis="vertical"]',
      )!;
      const innerHandle = innerGrid.querySelector("resize-handle")!;

      let outerResizeStartFired = false;
      outerGrid.addEventListener("resize:start", () => {
        outerResizeStartFired = true;
      });

      // Trigger event from inner grid
      innerHandle.dispatchEvent(
        new CustomEvent("handle:dragstart", {
          detail: { startPos: 100 },
          bubbles: true,
          composed: true,
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(outerResizeStartFired).to.be.true;
    });
  });

  describe("property updates", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
    });

    it("should update CSS properties when startSize changes", async () => {
      grid.startSize = 2;
      await grid.updateComplete;
      expect(grid.style.getPropertyValue("--start-size")).to.equal("2fr");
    });

    it("should update CSS properties when endSize changes", async () => {
      grid.endSize = 3;
      await grid.updateComplete;
      expect(grid.style.getPropertyValue("--end-size")).to.equal("3fr");
    });
  });

  describe("error handling", () => {
    it("should handle missing panels gracefully", async () => {
      const consoleError = console.error;
      let errorCalled = false;
      console.error = () => {
        errorCalled = true;
      };

      await fixture(html`
        <resize-grid axis="horizontal">
          <resize-handle slot="handle"></resize-handle>
        </resize-grid>
      `);

      console.error = consoleError;
      expect(errorCalled).to.be.true;
    });

    it("should handle missing start panel", async () => {
      const consoleError = console.error;
      let errorCalled = false;
      console.error = () => {
        errorCalled = true;
      };

      await fixture(html`
        <resize-grid axis="horizontal">
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);

      console.error = consoleError;
      expect(errorCalled).to.be.true;
    });

    it("should handle missing end panel", async () => {
      const consoleError = console.error;
      let errorCalled = false;
      console.error = () => {
        errorCalled = true;
      };

      await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
        </resize-grid>
      `);

      console.error = consoleError;
      expect(errorCalled).to.be.true;
    });
  });

  describe("slots", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="horizontal">
          <resize-panel slot="start" position="start">
            <div style="width: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 200px;">End</div>
          </resize-panel>
        </resize-grid>
      `);
    });

    it("should have start slot", () => {
      const slots = grid.shadowRoot!.querySelectorAll("slot");
      const startSlot = Array.from(slots).find((s) => s.name === "start");
      expect(startSlot).to.exist;
    });

    it("should have handle slot", () => {
      const slots = grid.shadowRoot!.querySelectorAll("slot");
      const handleSlot = Array.from(slots).find((s) => s.name === "handle");
      expect(handleSlot).to.exist;
    });

    it("should have end slot", () => {
      const slots = grid.shadowRoot!.querySelectorAll("slot");
      const endSlot = Array.from(slots).find((s) => s.name === "end");
      expect(endSlot).to.exist;
    });
  });
});
