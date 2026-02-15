import { expect } from "@open-wc/testing";
import {
  HandleDragStartEvent,
  HandleDragMoveEvent,
  HandleDragEndEvent,
  HandleDoubleTapEvent,
  ResizeStartEvent,
  ResizeMoveEvent,
  ResizeEndEvent,
  ResizeResetEvent,
} from "./types.js";

describe("Custom Events", () => {
  describe("HandleDragStartEvent", () => {
    it("should create event with correct type and detail", () => {
      const event = new HandleDragStartEvent(100);
      expect(event.type).to.equal("handle:dragstart");
      expect(event.detail.startPos).to.equal(100);
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });
  });

  describe("HandleDragMoveEvent", () => {
    it("should create event with correct type and detail", () => {
      const event = new HandleDragMoveEvent(50);
      expect(event.type).to.equal("handle:dragmove");
      expect(event.detail.delta).to.equal(50);
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });

    it("should handle negative delta", () => {
      const event = new HandleDragMoveEvent(-25);
      expect(event.detail.delta).to.equal(-25);
    });
  });

  describe("HandleDragEndEvent", () => {
    it("should create event with correct type and detail", () => {
      const event = new HandleDragEndEvent(75);
      expect(event.type).to.equal("handle:dragend");
      expect(event.detail.delta).to.equal(75);
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });
  });

  describe("HandleDoubleTapEvent", () => {
    it("should create event with correct type", () => {
      const event = new HandleDoubleTapEvent();
      expect(event.type).to.equal("handle:doubletap");
      expect(event.detail).to.deep.equal({});
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });
  });

  describe("ResizeStartEvent", () => {
    it("should create event with horizontal axis", () => {
      const event = new ResizeStartEvent("horizontal");
      expect(event.type).to.equal("resize:start");
      expect(event.detail.axis).to.equal("horizontal");
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });

    it("should create event with vertical axis", () => {
      const event = new ResizeStartEvent("vertical");
      expect(event.detail.axis).to.equal("vertical");
    });
  });

  describe("ResizeMoveEvent", () => {
    it("should create event with complete detail", () => {
      const detail = {
        startSize: 200,
        endSize: 300,
        startRatio: 0.4,
        endRatio: 0.6,
        delta: 50,
        axis: "horizontal" as const,
      };
      const event = new ResizeMoveEvent(detail);
      expect(event.type).to.equal("resize:move");
      expect(event.detail).to.deep.equal(detail);
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });
  });

  describe("ResizeEndEvent", () => {
    it("should create event with complete detail", () => {
      const detail = {
        startSize: 250,
        endSize: 250,
        startRatio: 0.5,
        endRatio: 0.5,
        delta: 0,
        axis: "vertical" as const,
      };
      const event = new ResizeEndEvent(detail);
      expect(event.type).to.equal("resize:end");
      expect(event.detail).to.deep.equal(detail);
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });
  });

  describe("ResizeResetEvent", () => {
    it("should create event with horizontal axis", () => {
      const event = new ResizeResetEvent("horizontal");
      expect(event.type).to.equal("resize:reset");
      expect(event.detail.axis).to.equal("horizontal");
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });

    it("should create event with vertical axis", () => {
      const event = new ResizeResetEvent("vertical");
      expect(event.detail.axis).to.equal("vertical");
    });
  });
});
