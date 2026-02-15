import { expect, fixture, html } from "@open-wc/testing";
import { ResizeController } from "./resize-controller.js";
import { ResizeGrid } from "./resize-grid.js";
import type { Axis } from "./types.js";
import "./resize-panel.js";
import "./resize-handle.js";

describe("ResizeController", () => {
  let controller: ResizeController;
  let grid: ResizeGrid;
  let startPanel: HTMLElement;
  let endPanel: HTMLElement;

  beforeEach(async () => {
    grid = await fixture(html`
      <resize-grid axis="horizontal">
        <resize-panel slot="start" position="start">
          <div style="width: 200px; height: 100px;">Start</div>
        </resize-panel>
        <resize-handle slot="handle"></resize-handle>
        <resize-panel slot="end" position="end">
          <div style="width: 300px; height: 100px;">End</div>
        </resize-panel>
      </resize-grid>
    `);

    startPanel = grid.querySelector('resize-panel[position="start"]')!;
    endPanel = grid.querySelector('resize-panel[position="end"]')!;
    controller = new ResizeController(grid, "horizontal");
  });

  describe("constructor", () => {
    it("should initialize with correct axis", () => {
      expect(controller.getState().axis).to.equal("horizontal");
    });

    it("should initialize with zero sizes", () => {
      const state = controller.getState();
      expect(state.startSize).to.equal(0);
      expect(state.endSize).to.equal(0);
    });
  });

  describe("connect", () => {
    it("should connect to grid and panels", () => {
      controller.connect(grid, startPanel, endPanel);
      expect(controller.isConnected()).to.be.true;
    });

    it("should not be connected before calling connect", () => {
      const newController = new ResizeController(grid, "horizontal");
      expect(newController.isConnected()).to.be.false;
    });
  });

  describe("disconnect", () => {
    it("should disconnect from grid and panels", () => {
      controller.connect(grid, startPanel, endPanel);
      controller.disconnect();
      expect(controller.isConnected()).to.be.false;
    });
  });

  describe("captureInitialSizes", () => {
    it("should return false when not connected", () => {
      expect(controller.captureInitialSizes()).to.be.false;
    });

    it("should capture panel sizes when connected", () => {
      controller.connect(grid, startPanel, endPanel);
      const result = controller.captureInitialSizes();
      expect(result).to.be.true;

      const state = controller.getState();
      expect(state.startSize).to.be.greaterThan(0);
      expect(state.endSize).to.be.greaterThan(0);
    });

    it("should capture horizontal sizes correctly", () => {
      controller.connect(grid, startPanel, endPanel);
      controller.captureInitialSizes();

      const state = controller.getState();
      const startRect = startPanel.getBoundingClientRect();
      const endRect = endPanel.getBoundingClientRect();

      expect(state.startSize).to.equal(startRect.width);
      expect(state.endSize).to.equal(endRect.width);
    });
  });

  describe("calculateSizes", () => {
    beforeEach(() => {
      controller.connect(grid, startPanel, endPanel);
      controller.captureInitialSizes();
    });

    it("should calculate sizes with positive delta", () => {
      const result = controller.calculateSizes(50);

      expect(result.delta).to.equal(50);
      expect(result.startSize).to.be.greaterThan(0);
      expect(result.endSize).to.be.greaterThan(0);
      expect(result.axis).to.equal("horizontal");
    });

    it("should calculate sizes with negative delta", () => {
      const result = controller.calculateSizes(-50);

      expect(result.delta).to.equal(-50);
      expect(result.startSize).to.be.greaterThan(0);
      expect(result.endSize).to.be.greaterThan(0);
    });

    it("should maintain total size (ratios sum to 1)", () => {
      const result = controller.calculateSizes(25);

      const ratioSum = result.startRatio + result.endRatio;
      expect(ratioSum).to.be.closeTo(1, 0.01);
    });

    it("should clamp ratios between 0 and 1", () => {
      const largePositiveDelta = controller.calculateSizes(10000);
      expect(largePositiveDelta.startRatio).to.be.at.most(1);
      expect(largePositiveDelta.endRatio).to.be.at.least(0);

      controller.captureInitialSizes();
      const largeNegativeDelta = controller.calculateSizes(-10000);
      expect(largeNegativeDelta.startRatio).to.be.at.least(0);
      expect(largeNegativeDelta.endRatio).to.be.at.most(1);
    });

    it("should handle zero delta", () => {
      const initialState = controller.getState();
      const result = controller.calculateSizes(0);

      expect(result.delta).to.equal(0);
      expect(result.startSize).to.equal(initialState.startSize);
      expect(result.endSize).to.equal(initialState.endSize);
    });

    it("should calculate correct ratios", () => {
      const state = controller.getState();
      const total = state.startSize + state.endSize;
      const delta = 50;

      const result = controller.calculateSizes(delta);

      const expectedStartRatio = (state.startSize + delta) / total;
      const expectedEndRatio = (state.endSize - delta) / total;

      expect(result.startRatio).to.be.closeTo(expectedStartRatio, 0.01);
      expect(result.endRatio).to.be.closeTo(expectedEndRatio, 0.01);
    });
  });

  describe("getState", () => {
    it("should return a copy of state", () => {
      controller.connect(grid, startPanel, endPanel);
      controller.captureInitialSizes();

      const state1 = controller.getState();
      const state2 = controller.getState();

      expect(state1).to.not.equal(state2);
      expect(state1).to.deep.equal(state2);
    });

    it("should not allow mutation of internal state", () => {
      controller.connect(grid, startPanel, endPanel);
      controller.captureInitialSizes();

      const state = controller.getState();
      const originalStartSize = state.startSize;

      // Attempt to mutate the returned object (TypeScript prevents this at compile time,
      // but we verify runtime protection by casting to writable type)
      const mutableState = state as {
        startSize: number;
        endSize: number;
        axis: Axis;
      };
      mutableState.startSize = 999;

      const newState = controller.getState();
      expect(newState.startSize).to.equal(originalStartSize);
    });
  });

  describe("vertical axis", () => {
    beforeEach(async () => {
      grid = await fixture(html`
        <resize-grid axis="vertical">
          <resize-panel slot="start" position="start">
            <div style="width: 100px; height: 200px;">Start</div>
          </resize-panel>
          <resize-handle slot="handle"></resize-handle>
          <resize-panel slot="end" position="end">
            <div style="width: 100px; height: 300px;">End</div>
          </resize-panel>
        </resize-grid>
      `);

      startPanel = grid.querySelector('resize-panel[position="start"]')!;
      endPanel = grid.querySelector('resize-panel[position="end"]')!;
      controller = new ResizeController(grid, "vertical");
    });

    it("should capture vertical sizes correctly", () => {
      controller.connect(grid, startPanel, endPanel);
      controller.captureInitialSizes();

      const state = controller.getState();
      const startRect = startPanel.getBoundingClientRect();
      const endRect = endPanel.getBoundingClientRect();

      expect(state.startSize).to.equal(startRect.height);
      expect(state.endSize).to.equal(endRect.height);
    });

    it("should have vertical axis in state", () => {
      expect(controller.getState().axis).to.equal("vertical");
    });
  });
});
