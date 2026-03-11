# Scroll Animations

## Table of Contents
- [onScroll() Function](#onscroll-function)
- [Settings](#settings)
- [Thresholds](#thresholds)
- [Synchronization Modes](#synchronization-modes)
- [Callbacks](#callbacks)
- [Methods](#methods)
- [Properties](#properties)

## onScroll() Function

Create scroll-triggered animations with `onScroll()`:

```javascript
import { animate, onScroll } from 'animejs';

animate('.element', {
  x: 100,
  autoplay: onScroll(parameters)
});
```

### Standalone Import
```javascript
import { onScroll } from 'animejs/events';
```

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `container` | Element/String | `document` | Scroll container |
| `target` | Element/String | Animated element | Element to observe |
| `axis` | String | `'y'` | Scroll axis ('x' or 'y') |
| `repeat` | Boolean | `true` | Repeat on re-enter |
| `debug` | Boolean | `false` | Show debug markers |

### container
```javascript
// Custom scroll container
animate('.el', {
  x: 100,
  autoplay: onScroll({
    container: '.scroll-container'
  })
});
```

### target
```javascript
// Observe different element than animated
animate('.animated', {
  x: 100,
  autoplay: onScroll({
    target: '.trigger-element'
  })
});
```

### axis
```javascript
// Horizontal scroll
animate('.el', {
  x: 100,
  autoplay: onScroll({
    axis: 'x'
  })
});
```

### debug
```javascript
// Show visual debug markers
animate('.el', {
  x: 100,
  autoplay: onScroll({
    debug: true
  })
});
```

## Thresholds

Define when animations trigger based on element position.

### Numeric Values
```javascript
// Pixels from viewport edge
onScroll({
  enter: 100,    // 100px from bottom
  leave: 100     // 100px from top
})
```

### Position Shorthands
```javascript
// Format: 'elementEdge viewportPosition'
onScroll({
  enter: 'top bottom',     // Element top hits viewport bottom
  leave: 'bottom top'      // Element bottom hits viewport top
})

// Available positions:
// Element: 'top', 'center', 'bottom'
// Viewport: 'top', 'center', 'bottom'
```

### Percentage Values
```javascript
onScroll({
  enter: 'top 80%',        // Element top at 80% of viewport
  leave: 'bottom 20%'      // Element bottom at 20% of viewport
})
```

### Relative Position Values
```javascript
onScroll({
  enter: 'top bottom-=100',  // 100px before viewport bottom
  leave: 'bottom top+=50'    // 50px after viewport top
})
```

### Min/Max Thresholds
```javascript
onScroll({
  enter: {
    min: 'top bottom',
    max: 'bottom top'
  }
})
```

## Synchronization Modes

### Play/Pause (Default)
Animation plays when in view, pauses when out:

```javascript
animate('.el', {
  x: 100,
  loop: true,
  autoplay: onScroll()  // Default behavior
});
```

### Method Names
Trigger specific methods on enter/leave:

```javascript
animate('.el', {
  x: 100,
  autoplay: onScroll({
    enter: 'play',
    leave: 'pause'
  })
});

// Available methods:
// 'play', 'pause', 'restart', 'reverse', 'alternate', 'complete', 'reset'
```

### Playback Progress Sync
Sync animation progress to scroll position:

```javascript
animate('.el', {
  x: 100,
  autoplay: onScroll({
    sync: true  // Sync progress to scroll
  })
});
```

### Smooth Scroll Sync
Smoothed scroll synchronization:

```javascript
animate('.el', {
  x: 100,
  autoplay: onScroll({
    sync: 'smooth'
  })
});
```

### Eased Scroll Sync
Apply easing to scroll sync:

```javascript
animate('.el', {
  x: 100,
  autoplay: onScroll({
    sync: 'smooth',
    ease: 'outExpo'
  })
});
```

## Callbacks

| Callback | When Called |
|----------|-------------|
| `onEnter` | Element enters viewport |
| `onEnterForward` | Enters while scrolling down |
| `onEnterBackward` | Enters while scrolling up |
| `onLeave` | Element leaves viewport |
| `onLeaveForward` | Leaves while scrolling down |
| `onLeaveBackward` | Leaves while scrolling up |
| `onUpdate` | Every scroll update |
| `onSyncComplete` | Sync animation completes |
| `onResize` | Container resizes |

```javascript
animate('.el', {
  x: 100,
  autoplay: onScroll({
    onEnter: (observer) => console.log('Entered'),
    onLeave: (observer) => console.log('Left'),
    onUpdate: (observer) => {
      console.log('Progress:', observer.progress);
    }
  })
});
```

### Directional Callbacks
```javascript
animate('.el', {
  x: 100,
  autoplay: onScroll({
    onEnterForward: () => console.log('Scrolling down, entered'),
    onEnterBackward: () => console.log('Scrolling up, entered'),
    onLeaveForward: () => console.log('Scrolling down, left'),
    onLeaveBackward: () => console.log('Scrolling up, left')
  })
});
```

## Methods

| Method | Description |
|--------|-------------|
| `link(animation)` | Link another animation |
| `refresh()` | Recalculate positions |
| `revert()` | Remove observer |

### link()
```javascript
const scrollObserver = onScroll({ sync: true });

animate('.el1', { x: 100, autoplay: scrollObserver });

// Link additional animations
scrollObserver.link(animate('.el2', { y: 100, autoplay: false }));
scrollObserver.link(animate('.el3', { rotate: 360, autoplay: false }));
```

### refresh()
```javascript
// After DOM changes
scrollObserver.refresh();
```

### revert()
```javascript
// Remove scroll observer
scrollObserver.revert();
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `progress` | Number | Scroll progress 0-1 |
| `isInView` | Boolean | Element in viewport |
| `scrollY` | Number | Current scroll position |
| `velocity` | Number | Scroll velocity |

## Complete Examples

### Reveal on Scroll
```javascript
import { animate, onScroll, stagger } from 'animejs';

animate('.reveal', {
  opacity: [0, 1],
  y: [50, 0],
  delay: stagger(100),
  duration: 800,
  ease: 'outExpo',
  autoplay: onScroll({
    enter: 'top 85%',
    repeat: false  // Only animate once
  })
});
```

### Parallax Effect
```javascript
animate('.parallax-bg', {
  y: [-100, 100],
  autoplay: onScroll({
    sync: true,
    enter: 'top bottom',
    leave: 'bottom top'
  })
});
```

### Progress Indicator
```javascript
animate('.progress-bar', {
  scaleX: [0, 1],
  autoplay: onScroll({
    target: '.content',
    sync: true,
    enter: 'top top',
    leave: 'bottom bottom'
  })
});
```

### Horizontal Scroll Animation
```javascript
animate('.horizontal-item', {
  x: [100, 0],
  opacity: [0, 1],
  autoplay: onScroll({
    container: '.horizontal-scroll',
    axis: 'x',
    enter: 'left right',
    leave: 'right left'
  })
});
```

### Scroll-Synced Timeline
```javascript
import { createTimeline, onScroll } from 'animejs';

createTimeline({
  autoplay: onScroll({
    sync: true,
    enter: 'top center',
    leave: 'bottom center'
  })
})
.add('.step-1', { opacity: [0, 1], y: [20, 0] })
.add('.step-2', { opacity: [0, 1], y: [20, 0] })
.add('.step-3', { opacity: [0, 1], y: [20, 0] });
```

### Debug Mode
```javascript
// Enable debug to visualize thresholds
animate('.el', {
  x: 100,
  autoplay: onScroll({
    debug: true,
    enter: 'top 80%',
    leave: 'bottom 20%'
  })
});
```
