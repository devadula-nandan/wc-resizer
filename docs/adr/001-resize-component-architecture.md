# ADR 001: Resize Component Architecture

## Status
Accepted

## Context
We need a flexible, accessible, and performant resize component system that allows users to adjust panel sizes through mouse, touch, and keyboard interactions. The component must support both horizontal and vertical layouts, provide excellent accessibility, and be composable for various use cases.

## Decision

### Compound Component Architecture
We have adopted a **compound component pattern** with three main components:

1. **`resize-grid`** - Container/Orchestrator
2. **`resize-panel`** - Content containers
3. **`resize-handle`** - Interactive drag handle

This architecture provides:
- **Separation of concerns**: Each component has a single, well-defined responsibility
- **Composability**: Components can be used independently or together
- **Flexibility**: Handles can be detached and used standalone if needed
- **Maintainability**: Clear boundaries between components reduce coupling

### Component Responsibilities

#### resize-grid (Orchestrator)
**Role**: Coordinates resize operations and manages panel sizes

**Responsibilities**:
- Listens to events from child handles
- Calculates new panel sizes using `ResizeController`
- Applies CSS grid properties to layout panels
- Manages ARIA attributes for accessibility
- Dispatches high-level resize events
- Guards against events from nested grids

**Key Design Decisions**:
- Uses event delegation pattern to handle events from child components
- Implements `withEventGuard()` helper to reduce repetition in event handlers
- Separates concerns: `startResize()`, `applyResizeUpdate()` for cleaner code
- Uses constants for magic numbers (COLLAPSED_THRESHOLD, etc.)

#### resize-panel (Content Container)
**Role**: Wraps content and provides semantic structure

**Responsibilities**:
- Auto-assigns slot based on position ("start" or "end")
- Receives `aria-collapsed` attribute from parent grid
- Provides overflow handling and containment

**Key Design Decisions**:
- Minimal logic - primarily a styled container
- Accessibility attributes managed by parent for consistency

#### resize-handle (Interactive Control)
**Role**: Captures user input and emits delta events

**Responsibilities**:
- Handles pointer events (mouse, touch)
- Handles keyboard events (arrows, PageUp/PageDown, Home, Shift modifier)
- Emits standardized events with delta values
- Manages its own ARIA attributes (valuenow, valuemin, valuemax)
- Can function independently of resize-grid

**Key Design Decisions**:
- **Event-based communication**: Emits custom events rather than directly manipulating DOM
- **Delta-based**: Reports change amounts, not absolute positions
- **Keyboard accessibility**:
  - Arrow keys: Move by 10px (configurable via `keyboardStep`)
  - Shift + Arrow: 2x multiplier for faster movement
  - PageUp: Collapse start panel
  - PageDown: Collapse end panel
  - Home: Reset to default
- **Independent operation**: Can be used without resize-grid for custom implementations

### State Management

#### Size Representation
- Panels use **fractional units (fr)** for flexible, responsive layouts
- Sizes stored as ratios (0-1) for calculations
- CSS custom properties (`--start-size`, `--end-size`) for reactivity

#### Collapse Detection
- Threshold: `size < 0.01` (COLLAPSED_THRESHOLD constant)
- Collapsed state: `0.001` (COLLAPSED_SIZE constant)
- Expanded state: `0.999` (EXPANDED_SIZE constant)

### Accessibility

#### ARIA Attributes
**On resize-handle**:
- `role="separator"` - Semantic role for screen readers
- `aria-orientation` - "horizontal" or "vertical" based on axis
- `aria-valuenow` - Current position as percentage (0-100)
- `aria-valuemin="0"`, `aria-valuemax="100"` - Range bounds
- `aria-label` - Dynamic label indicating collapsed state

**On resize-panel**:
- `aria-collapsed` - "true" when panel is collapsed, "false" otherwise

#### Keyboard Support
Follows WCAG 2.1 guidelines for keyboard navigation:
- All interactive elements are keyboard accessible
- Clear focus indicators
- Logical tab order
- Standard key bindings (arrows, Home, PageUp/PageDown)

### Event Architecture

#### Handle Events (Low-level)
Emitted by `resize-handle`:
- `handle:dragstart` - Pointer drag initiated
- `handle:dragmove` - Pointer drag in progress
- `handle:dragend` - Pointer drag completed
- `handle:doubletap` - Double-tap/click detected
- `handle:keyboardstart` - Keyboard resize initiated
- `handle:keyboardmove` - Keyboard resize in progress
- `handle:keyboardend` - Keyboard resize completed
- `handle:collapse` - PageUp/PageDown pressed

#### Grid Events (High-level)
Emitted by `resize-grid`:
- `resize:start` - Resize operation started
- `resize:move` - Resize in progress (includes size details)
- `resize:end` - Resize completed (includes final sizes)
- `resize:reset` - Sizes reset to default

### Performance Optimizations

1. **Transition Management**:
   - Disabled during pointer drag for smooth 60fps interaction
   - Enabled for keyboard operations for visual feedback
   - Respects `prefers-reduced-motion`

2. **Event Handling**:
   - Event delegation reduces listener count
   - Guards prevent processing events from nested grids
   - Stops propagation to prevent bubbling to parent grids

3. **CSS Containment**:
   - `contain: layout style paint` on panels
   - Reduces browser reflow/repaint scope

### Code Quality Improvements

#### Refactoring Applied
1. **Extracted common patterns**:
   - `isDirectChildEvent()` - Event source validation
   - `withEventGuard()` - Event handler wrapper
   - `startResize()` - Initialization logic
   - `applyResizeUpdate()` - Size calculation and application

2. **Eliminated magic numbers**:
   - Constants defined at module level
   - Self-documenting names (COLLAPSED_THRESHOLD, SHIFT_MULTIPLIER)

3. **Reduced duplication**:
   - Unified drag and keyboard event handling
   - Shared ARIA update logic

## Consequences

### Positive
- **Composable**: Components can be mixed and matched
- **Accessible**: Full keyboard support and ARIA attributes
- **Maintainable**: Clear separation of concerns
- **Testable**: Each component can be tested independently
- **Flexible**: Handles can be used standalone
- **Performant**: Optimized for smooth interactions
- **Type-safe**: Full TypeScript support

### Negative
- **Complexity**: Multiple components require coordination
- **Learning curve**: Developers must understand compound pattern
- **Event overhead**: Custom events add slight performance cost

### Neutral
- **Bundle size**: Three components vs. one monolithic component
- **API surface**: More components = more API to document

## Alternatives Considered

### Single Monolithic Component
**Rejected**: Would violate single responsibility principle and reduce flexibility

### Prop-based Communication
**Rejected**: Events provide better decoupling and allow independent handle usage

### Absolute Positioning
**Rejected**: CSS Grid provides better responsive behavior and simpler code

## References
- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [WCAG 2.1 Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-accessible)
- [ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.2/#separator)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## Notes
- This ADR documents the architecture as of the keyboard enhancement implementation
- Future enhancements may include touch gesture support, snap points, or animation curves
- The component is designed to be framework-agnostic (uses Lit, but principles apply broadly)