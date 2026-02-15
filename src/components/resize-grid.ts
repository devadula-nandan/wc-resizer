// ============================================================================
// RESIZE GRID - Container (orchestrates resize logic)
// ============================================================================

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Axis } from "./types.js";
import {
  ResizeStartEvent,
  ResizeMoveEvent,
  ResizeEndEvent,
  ResizeResetEvent,
  HandleDragStartEvent,
  HandleDragMoveEvent,
  HandleDragEndEvent,
  HandleDoubleTapEvent,
} from "./types.js";
import { ResizeController } from "./resize-controller.js";
import { ResizePanel } from "./resize-panel.js";

// Constants for panel state thresholds
const COLLAPSED_THRESHOLD = 0;
const COLLAPSED_SIZE = 0;
const EXPANDED_SIZE = 1;
const DEFAULT_SIZE = 1;

@customElement("resize-grid")
export class ResizeGrid extends LitElement {
  private controller: ResizeController | null = null;
  private startPanel: ResizePanel | null = null;
  private endPanel: ResizePanel | null = null;

  @property({ type: String, reflect: true })
  axis: Axis = "horizontal";

  @property({ type: Number })
  startSize: number = 1;

  @property({ type: Number })
  endSize: number = 1;

  static styles = css`
    :host {
      display: grid;
      block-size: 100%;
      inline-size: 100%;
      overflow: hidden;
      contain: layout style;
    }

    :host([axis="horizontal"]) {
      grid-template-columns: var(--start-size, 1fr) auto var(--end-size, 1fr);
    }

    :host([axis="vertical"]) {
      grid-template-rows: var(--start-size, 1fr) auto var(--end-size, 1fr);
    }

    :host(:not([disable-transitions])) {
      transition:
        grid-template-columns 120ms linear,
        grid-template-rows 120ms linear;
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none !important;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateSizeProperties();
    this.initializeController();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupController();
    this.removeEventListeners();
  }

  updated(changed: Map<string, any>) {
    if (changed.has("startSize") || changed.has("endSize")) {
      this.updateSizeProperties();
    }
  }

  private initializeController() {
    // Find panels
    const panels = Array.from(
      this.querySelectorAll<ResizePanel>("resize-panel"),
    );

    this.startPanel = panels.find((p) => p.position === "start") || null;
    this.endPanel = panels.find((p) => p.position === "end") || null;

    if (!this.startPanel || !this.endPanel) {
      console.error("resize-grid must contain start and end panels");
      return;
    }

    // Create controller
    this.controller = new ResizeController(this, this.axis);
    this.controller.connect(this, this.startPanel, this.endPanel);

    // Initialize ARIA attributes on panels
    this.updatePanelAriaAttributes();
  }

  private cleanupController() {
    if (this.controller) {
      this.controller.disconnect();
      this.controller = null;
    }
    this.startPanel = null;
    this.endPanel = null;
  }

  private setupEventListeners() {
    // Pointer events
    this.addEventListener(
      "handle:dragstart",
      this.handleDragStart as EventListener,
      true,
    );
    this.addEventListener(
      "handle:dragmove",
      this.handleDragMove as EventListener,
      true,
    );
    this.addEventListener(
      "handle:dragend",
      this.handleDragEnd as EventListener,
      true,
    );
    this.addEventListener(
      "handle:doubletap",
      this.handleDoubleTap as EventListener,
      true,
    );

    // Keyboard events
    this.addEventListener(
      "handle:keyboardstart",
      this.handleKeyboardStart as EventListener,
      true,
    );
    this.addEventListener(
      "handle:keyboardmove",
      this.handleKeyboardMove as EventListener,
      true,
    );
    this.addEventListener(
      "handle:keyboardend",
      this.handleKeyboardEnd as EventListener,
      true,
    );

    // Collapse events
    this.addEventListener(
      "handle:collapse",
      this.handleCollapse as EventListener,
      true,
    );
  }

  private removeEventListeners() {
    // Pointer events
    this.removeEventListener(
      "handle:dragstart",
      this.handleDragStart as EventListener,
      true,
    );
    this.removeEventListener(
      "handle:dragmove",
      this.handleDragMove as EventListener,
      true,
    );
    this.removeEventListener(
      "handle:dragend",
      this.handleDragEnd as EventListener,
      true,
    );
    this.removeEventListener(
      "handle:doubletap",
      this.handleDoubleTap as EventListener,
      true,
    );

    // Keyboard events
    this.removeEventListener(
      "handle:keyboardstart",
      this.handleKeyboardStart as EventListener,
      true,
    );
    this.removeEventListener(
      "handle:keyboardmove",
      this.handleKeyboardMove as EventListener,
      true,
    );
    this.removeEventListener(
      "handle:keyboardend",
      this.handleKeyboardEnd as EventListener,
      true,
    );

    // Collapse events
    this.removeEventListener(
      "handle:collapse",
      this.handleCollapse as EventListener,
      true,
    );
  }

  /**
   * Guards against events from nested grids by checking if the event
   * originated from a direct child handle of this grid.
   */
  private isDirectChildEvent(e: Event): boolean {
    const handle = e.target as HTMLElement;
    const handleParentGrid = handle.closest("resize-grid");
    return handleParentGrid === this;
  }

  /**
   * Common handler wrapper that validates event source and controller state.
   */
  private withEventGuard<T extends Event>(e: T, handler: (e: T) => void): void {
    if (!this.isDirectChildEvent(e)) return;
    e.stopPropagation();
    if (!this.controller) return;
    handler(e);
  }

  /**
   * Initiates a resize operation by capturing initial panel sizes.
   */
  private startResize(disableTransitions = false): boolean {
    if (!this.controller?.captureInitialSizes()) {
      console.warn("Failed to capture initial panel sizes");
      return false;
    }

    if (disableTransitions) {
      this.setAttribute("disable-transitions", "");
    }

    this.dispatchEvent(new ResizeStartEvent(this.axis));
    return true;
  }

  /**
   * Applies calculated sizes and dispatches appropriate events.
   */
  private applyResizeUpdate(delta: number, isEnd = false): void {
    const detail = this.controller!.calculateSizes(delta);
    this.applySizes(detail.startRatio, detail.endRatio);

    if (isEnd) {
      this.removeAttribute("disable-transitions");
      this.dispatchEvent(new ResizeEndEvent(detail));
    } else {
      this.dispatchEvent(new ResizeMoveEvent(detail));
    }
  }

  private handleDragStart = (e: HandleDragStartEvent) => {
    this.withEventGuard(e, () => this.startResize(true));
  };

  private handleDragMove = (e: HandleDragMoveEvent) => {
    this.withEventGuard(e, () => this.applyResizeUpdate(e.detail.delta));
  };

  private handleDragEnd = (e: HandleDragEndEvent) => {
    this.withEventGuard(e, () => this.applyResizeUpdate(e.detail.delta, true));
  };

  private handleDoubleTap = (e: HandleDoubleTapEvent) => {
    if (!this.isDirectChildEvent(e)) return;
    e.stopPropagation();
    this.resetSizes();
  };

  private handleKeyboardStart = (e: CustomEvent<{ delta: number }>) => {
    this.withEventGuard(e, () => this.startResize());
  };

  private handleKeyboardMove = (e: CustomEvent<{ delta: number }>) => {
    this.withEventGuard(e, () => this.applyResizeUpdate(e.detail.delta));
  };

  private handleKeyboardEnd = (e: CustomEvent<{ delta: number }>) => {
    this.withEventGuard(e, () => this.applyResizeUpdate(e.detail.delta, true));
  };

  private handleCollapse = (e: CustomEvent<{ panel: string }>) => {
    if (!this.isDirectChildEvent(e)) return;
    e.stopPropagation();

    const { panel } = e.detail;
    const sizes =
      panel === "start"
        ? { start: COLLAPSED_SIZE, end: EXPANDED_SIZE }
        : { start: EXPANDED_SIZE, end: COLLAPSED_SIZE };

    this.applySizes(sizes.start, sizes.end);

    this.dispatchEvent(
      new ResizeEndEvent({
        startSize: this.startSize,
        endSize: this.endSize,
        startRatio: this.startSize,
        endRatio: this.endSize,
        delta: 0,
        axis: this.axis,
      }),
    );
  };

  private updateSizeProperties() {
    this.style.setProperty("--start-size", `${this.startSize}fr`);
    this.style.setProperty("--end-size", `${this.endSize}fr`);
  }

  private applySizes(startRatio: number, endRatio: number) {
    this.startSize = startRatio;
    this.endSize = endRatio;
    this.updateHandleAriaAttributes();
    this.updatePanelAriaAttributes();
  }

  private updateHandleAriaAttributes() {
    const handle = this.querySelector("resize-handle");
    if (handle && typeof (handle as any).updateAriaAttributes === "function") {
      (handle as any).updateAriaAttributes(this.startSize, this.endSize);
    }
  }

  private updatePanelAriaAttributes() {
    const isStartCollapsed = this.startSize <= COLLAPSED_THRESHOLD;
    const isEndCollapsed = this.endSize <= COLLAPSED_THRESHOLD;

    if (this.startPanel) {
      this.startPanel.setAttribute("aria-expanded", String(!isStartCollapsed));
      this.startPanel.setAttribute("aria-hidden", String(isStartCollapsed));
    }

    if (this.endPanel) {
      this.endPanel.setAttribute("aria-expanded", String(!isEndCollapsed));
      this.endPanel.setAttribute("aria-hidden", String(isEndCollapsed));
    }
  }

  // Public API
  setSizes(startRatio: number, endRatio: number) {
    this.applySizes(startRatio, endRatio);
  }

  resetSizes() {
    this.startSize = DEFAULT_SIZE;
    this.endSize = DEFAULT_SIZE;
    this.dispatchEvent(new ResizeResetEvent(this.axis));
  }

  getAxis(): Axis {
    return this.axis;
  }

  render() {
    return html`
      <slot name="start"></slot>
      <slot name="handle"></slot>
      <slot name="end"></slot>
    `;
  }
}
