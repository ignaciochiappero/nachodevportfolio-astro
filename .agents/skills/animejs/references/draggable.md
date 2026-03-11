# Draggable

## Table of Contents
- [Creating Draggables](#creating-draggables)
- [Axes Parameters](#axes-parameters)
- [Settings](#settings)
- [Callbacks](#callbacks)
- [Methods](#methods)
- [Properties](#properties)

## Creating Draggables

```javascript
import { createDraggable } from 'animejs';

const draggable = createDraggable(targets, parameters);
```

### Basic Usage
```javascript
createDraggable('.draggable-element');
```

### With Options
```javascript
createDraggable('.element', {
  x: { snap: 50 },
  y: { snap: 50 },
  releaseEase: spring({ stiffness: 200, damping: 20 })
});
```

## Axes Parameters

Control movement on each axis independently:

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | Object/Boolean | X-axis configuration |
| `y` | Object/Boolean | Y-axis configuration |
| `snap` | Number/Array/Function | Snap points |
| `modifier` | Function | Transform position value |
| `mapTo` | Element/String | Map movement to another element |

### Enable/Disable Axes
```javascript
// Only horizontal dragging
createDraggable('.el', {
  x: true,
  y: false
});

// Only vertical dragging
createDraggable('.el', {
  x: false,
  y: true
});
```

### snap
```javascript
// Snap to grid
createDraggable('.el', {
  x: { snap: 50 },   // Snap every 50px
  y: { snap: 50 }
});

// Snap to specific values
createDraggable('.el', {
  x: { snap: [0, 100, 200, 300] }
});

// Custom snap function
createDraggable('.el', {
  x: { 
    snap: (value) => Math.round(value / 100) * 100 
  }
});
```

### modifier
```javascript
// Invert movement
createDraggable('.el', {
  x: { modifier: v => -v }
});

// Limit range
createDraggable('.el', {
  x: { modifier: v => utils.clamp(v, -200, 200) }
});
```

### mapTo
```javascript
// Map drag to another element
createDraggable('.handle', {
  x: { mapTo: '.slider-thumb' },
  y: false
});
```

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `trigger` | Element/String | Target | Element that triggers drag |
| `container` | Element/String | null | Constrain to container |
| `containerPadding` | Number/Array | 0 | Padding inside container |
| `containerFriction` | Number | 0.85 | Friction at container edges |
| `releaseContainerFriction` | Number | 0.65 | Friction on release at edges |
| `releaseMass` | Number | 1 | Mass for release physics |
| `releaseStiffness` | Number | 80 | Spring stiffness on release |
| `releaseDamping` | Number | 20 | Spring damping on release |
| `velocityMultiplier` | Number | 1 | Velocity scaling |
| `minVelocity` | Number | 0 | Minimum velocity threshold |
| `maxVelocity` | Number | Infinity | Maximum velocity cap |
| `releaseEase` | String/Function | spring | Release easing |
| `dragSpeed` | Number | 1 | Drag speed multiplier |
| `dragThreshold` | Number | 0 | Pixels before drag starts |
| `scrollThreshold` | Number | 30 | Scroll detection threshold |
| `scrollSpeed` | Number | 3 | Auto-scroll speed |
| `cursor` | Boolean | true | Change cursor on drag |

### trigger
```javascript
// Use different element as drag handle
createDraggable('.card', {
  trigger: '.card-header'
});
```

### container
```javascript
// Constrain to parent
createDraggable('.el', {
  container: '.parent'
});

// Constrain to viewport
createDraggable('.el', {
  container: document.documentElement
});
```

### containerPadding
```javascript
// Uniform padding
createDraggable('.el', {
  container: '.parent',
  containerPadding: 20
});

// Per-side padding [top, right, bottom, left]
createDraggable('.el', {
  container: '.parent',
  containerPadding: [10, 20, 10, 20]
});
```

### containerFriction
```javascript
// Resistance at container edges (0-1)
createDraggable('.el', {
  container: '.parent',
  containerFriction: 0.5  // More resistance
});
```

### Release Physics
```javascript
import { createDraggable, spring } from 'animejs';

// Custom release behavior
createDraggable('.el', {
  releaseMass: 1,
  releaseStiffness: 100,
  releaseDamping: 15,
  velocityMultiplier: 1.5
});

// Use spring easing
createDraggable('.el', {
  releaseEase: spring({
    stiffness: 120,
    damping: 6
  })
});
```

### dragThreshold
```javascript
// Require 10px movement before drag starts
createDraggable('.el', {
  dragThreshold: 10
});
```

### cursor
```javascript
// Disable cursor change
createDraggable('.el', {
  cursor: false
});
```

## Callbacks

| Callback | When Called |
|----------|-------------|
| `onGrab` | When drag starts |
| `onDrag` | During drag movement |
| `onUpdate` | Every frame during drag |
| `onRelease` | When drag ends |
| `onSnap` | When snapping to position |
| `onSettle` | When movement stops |
| `onResize` | When container resizes |
| `onAfterResize` | After resize handling |

```javascript
createDraggable('.el', {
  onGrab: (draggable) => {
    console.log('Grabbed at:', draggable.x, draggable.y);
  },
  onDrag: (draggable) => {
    console.log('Dragging:', draggable.x, draggable.y);
  },
  onRelease: (draggable) => {
    console.log('Released with velocity:', draggable.velocity);
  },
  onSnap: (draggable) => {
    console.log('Snapped to:', draggable.x, draggable.y);
  },
  onSettle: (draggable) => {
    console.log('Settled at:', draggable.x, draggable.y);
  }
});
```

## Methods

| Method | Description |
|--------|-------------|
| `disable()` | Disable dragging |
| `enable()` | Enable dragging |
| `setX(value)` | Set X position |
| `setY(value)` | Set Y position |
| `animateInView()` | Animate into container view |
| `scrollInView()` | Scroll into container view |
| `stop()` | Stop current movement |
| `reset()` | Reset to initial position |
| `revert()` | Remove draggable |
| `refresh()` | Recalculate bounds |

### setX() / setY()
```javascript
const draggable = createDraggable('.el');

// Programmatically set position
draggable.setX(100);
draggable.setY(200);
```

### animateInView()
```javascript
// Animate element back into container bounds
draggable.animateInView();
```

### stop()
```javascript
// Stop any ongoing movement
draggable.stop();
```

### reset()
```javascript
// Reset to original position
draggable.reset();
```

### disable() / enable()
```javascript
// Temporarily disable
draggable.disable();

// Re-enable
draggable.enable();
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | Number | Current X position |
| `y` | Number | Current Y position |
| `velocity` | Number | Current velocity |
| `isDragging` | Boolean | Currently being dragged |
| `isReleasing` | Boolean | In release animation |
| `disabled` | Boolean | Is disabled |

## Complete Examples

### Basic Draggable Card
```javascript
createDraggable('.card', {
  container: '.board',
  containerPadding: 10,
  releaseEase: spring({ stiffness: 200, damping: 20 }),
  onSettle: (d) => savePosition(d.x, d.y)
});
```

### Slider Control
```javascript
createDraggable('.slider-thumb', {
  x: { snap: 10 },
  y: false,
  container: '.slider-track',
  onDrag: (d) => {
    const progress = utils.mapRange(d.x, 0, trackWidth, 0, 100);
    updateValue(progress);
  }
});
```

### Sortable List
```javascript
const items = utils.$('.sortable-item');

items.forEach(item => {
  createDraggable(item, {
    y: true,
    x: false,
    container: '.list',
    onDrag: (d) => {
      // Reorder logic
      const newIndex = Math.round(d.y / itemHeight);
      reorderItems(item, newIndex);
    }
  });
});
```

### Flick/Throw Effect
```javascript
createDraggable('.throwable', {
  velocityMultiplier: 2,
  releaseMass: 0.5,
  releaseStiffness: 50,
  releaseDamping: 8,
  container: '.arena',
  containerFriction: 0.3
});
```

### Carousel Drag
```javascript
createDraggable('.carousel-track', {
  x: {
    snap: (value) => {
      const slideWidth = 300;
      return Math.round(value / slideWidth) * slideWidth;
    }
  },
  y: false,
  releaseEase: spring({ stiffness: 150, damping: 20 }),
  onSnap: (d) => {
    const currentSlide = Math.abs(d.x / 300);
    updateIndicators(currentSlide);
  }
});
```
