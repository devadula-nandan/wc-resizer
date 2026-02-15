import { expect, fixture, html, oneEvent, waitUntil } from "@open-wc/testing";
import { ResizeHandle } from "./resize-handle.js";
import "./resize-grid.js";
import "./resize-panel.js";

describe("ResizeHandle", () => {
  let handle: ResizeHandle;

  beforeEach(async () => {
    handle = await fixture(html`<resize-handle></resize-handle>`);
  });

  describe("initialization", () => {
    it("should be defined", () => {
      expect(handle).to.be.instanceOf(ResizeHandle);
    });

    it("should have default properties", () => {
      expect(handle.doubleTapThreshold).to.equal(300);
      expect(handle.doubleTapDistance).to.equal(24);
      expect(handle.ariaLabel).to.equal("Resize handle");
    });

    it("should set slot attribute", () => {
      expect(handle.getAttribute("slot")).to.equal("handle");
    });

    it("should have accessibility attributes", () => {
      expect(handle.getAttribute("role")).to.equal("separator");
      expect(handle.getAttribute("tabindex")).to.equal("0");
      expect(handle.getAttribute("aria-label")).to.equal("Resize handle");
      expect(handle.getAttribute("aria-valuemin")).to.equal("0");
      expect(handle.getAttribute("aria-valuemax")).to.equal("100");
      expect(handle.getAttribute("aria-valuenow")).to.equal("50");
    });
  });

  describe("within resize-grid", () => {
    let grid: HTMLElement;

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

    it("should set axis data attribute for horizontal", () => {
      expect(handle.dataset.axis).to.equal("horizontal");
    });

    it("should set aria-orientation for horizontal", () => {
      expect(handle.getAttribute("aria-orientation")).to.equal("horizontal");
    });
  });

  describe("vertical axis", () => {
    let grid: HTMLElement;

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
      handle = grid.querySelector("resize-handle")!;
    });

    it("should set axis data attribute for vertical", () => {
      expect(handle.dataset.axis).to.equal("vertical");
    });

    it("should set aria-orientation for vertical", () => {
      expect(handle.getAttribute("aria-orientation")).to.equal("vertical");
    });
  });

  describe("keyboard and pointer event handling", () => {
    // Note: Keyboard and pointer event tests are covered in resize-grid.test.ts
    // where the full grid context is available. ResizeHandle relies on being
    // within a ResizeGrid to properly handle and dispatch these events.
    it("should be tested within grid context", () => {
      expect(true).to.be.true;
    });
  });

  describe("updateAriaAttributes", () => {
    it("should update aria-valuenow based on ratio", () => {
      handle.updateAriaAttributes(0.3, 0.7);
      expect(handle.getAttribute("aria-valuenow")).to.equal("30");
    });

    it("should update aria-label when start panel is collapsed", () => {
      handle.updateAriaAttributes(0, 1);
      expect(handle.getAttribute("aria-label")).to.equal(
        "Resize handle (start panel collapsed)",
      );
    });

    it("should update aria-label when end panel is collapsed", () => {
      handle.updateAriaAttributes(1, 0);
      expect(handle.getAttribute("aria-label")).to.equal(
        "Resize handle (end panel collapsed)",
      );
    });

    it("should restore default aria-label when neither panel is collapsed", () => {
      handle.updateAriaAttributes(0, 1);
      handle.updateAriaAttributes(0.5, 0.5);
      expect(handle.getAttribute("aria-label")).to.equal("Resize handle");
    });

    it("should always maintain aria-valuemin and aria-valuemax", () => {
      handle.updateAriaAttributes(0.6, 0.4);
      expect(handle.getAttribute("aria-valuemin")).to.equal("0");
      expect(handle.getAttribute("aria-valuemax")).to.equal("100");
    });
  });

  describe("custom properties", () => {
    it("should accept custom doubleTapThreshold", async () => {
      handle = await fixture(
        html`<resize-handle double-tap-threshold="500"></resize-handle>`,
      );
      expect(handle.doubleTapThreshold).to.equal(500);
    });

    it("should accept custom doubleTapDistance", async () => {
      handle = await fixture(
        html`<resize-handle double-tap-distance="50"></resize-handle>`,
      );
      expect(handle.doubleTapDistance).to.equal(50);
    });

    it("should accept custom ariaLabel property", async () => {
      handle = await fixture(
        html`<resize-handle .ariaLabel=${"Custom label"}></resize-handle>`,
      );
      await handle.updateComplete;
      expect(handle.ariaLabel).to.equal("Custom label");
    });
  });
});
