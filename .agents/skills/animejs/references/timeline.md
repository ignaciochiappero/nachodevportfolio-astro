# Timelines

## Table of Contents
- [Creating Timelines](#creating-timelines)
- [Adding Animations](#adding-animations)
- [Time Positions](#time-positions)
- [Timeline Methods](#timeline-methods)
- [Defaults](#defaults)
- [Syncing Timelines](#syncing-timelines)
- [Labels](#labels)
- [Callbacks](#callbacks)

## Creating Timelines

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline(parameters);
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| parameters | Object | Playback settings, defaults, callbacks |

### Returns
`Timeline` instance with chainable methods.

## Adding Animations

### Basic Syntax
```javascript
timeline.add(target, animationParameters, position);
```

### Chained Animations
```javascript
createTimeline()
  .add('.first', { x: 100 })
  .add('.second', { x: 100 })
  .add('.third', { x: 100 });
```

### Adding Timers
```javascript
createTimeline()
  .add({ duration: 500 })  // Wait 500ms
  .add('.el', { x: 100 });
```

### Calling Functions
```javascript
createTimeline()
  .add('.el', { x: 100 })
  .call(() => console.log('Animation done!'))
  .add('.el', { y: 100 });
```

## Time Positions

The position parameter controls when animations start in the timeline.

| Type | Example | Description |
|------|---------|-------------|
| Absolute | `100` | Start at 100ms |
| Addition | `'+=100'` | 100ms after previous ends |
| Subtraction | `'-=100'` | 100ms before previous ends |
| Multiplier | `'*=.5'` | At 50% of previous duration |
| Previous End | `'<'` | When previous ends |
| Previous Start | `'<<'` | When previous starts |
| Combined | `'<<+=250'` | 250ms after previous starts |
| Label | `'myLabel'` | At label position |
| Stagger | `stagger(10)` | Stagger each target by 10ms |

### Examples

```javascript
import { createTimeline, stagger } from 'animejs';

createTimeline()
  // Sequential (default)
  .add('.a', { x: 100 })           // Starts at 0
  .add('.b', { x: 100 })           // Starts when .a ends
  
  // Parallel (start together)
  .add('.c', { x: 100 }, '<')      // Starts when .b ends
  .add('.d', { x: 100 }, '<')      // Also starts when .b ends
  
  // Overlap
  .add('.e', { x: 100 }, '-=200')  // Starts 200ms before .d ends
  
  // Absolute position
  .add('.f', { x: 100 }, 1000)     // Starts at exactly 1000ms
  
  // Relative to previous start
  .add('.g', { x: 100 }, '<<')     // Starts when .f starts
  .add('.h', { x: 100 }, '<<+=100') // 100ms after .f starts
  
  // Staggered positions
  .add('.items', { x: 100 }, stagger(50));
```

### Visual Timeline

```
Time:     0ms    500ms   1000ms  1500ms  2000ms
          |-------|-------|-------|-------|
.a        [=======]
.b                [=======]
.c                        [=======]
.d                        [=======]        (parallel with .c)
.e                    [=======]            (overlaps .d)
```

## Timeline Methods

### Content Methods

| Method | Description |
|--------|-------------|
| `add(target, params, pos)` | Add animation |
| `add(timerParams, pos)` | Add timer/delay |
| `set(target, props, pos)` | Set values instantly |
| `sync(timeline, pos)` | Sync another timeline |
| `label(name, pos)` | Add named position |
| `remove(target)` | Remove target from timeline |
| `call(fn, pos)` | Call function at position |
| `init()` | Initialize without playing |

### Playback Methods

| Method | Description |
|--------|-------------|
| `play()` | Start/resume |
| `pause()` | Pause |
| `resume()` | Resume from pause |
| `restart()` | Restart from beginning |
| `reverse()` | Reverse direction |
| `alternate()` | Toggle direction |
| `complete()` | Jump to end |
| `reset()` | Reset to start |
| `revert()` | Remove all changes |
| `cancel()` | Stop and remove |
| `seek(time)` | Seek to time |
| `stretch(duration)` | Change total duration |
| `refresh()` | Recalculate values |

### set() Method
```javascript
// Instantly set values at a position
createTimeline()
  .set('.el', { opacity: 0 })
  .add('.el', { opacity: 1, x: 100 });
```

### init() Method
```javascript
// Prepare timeline without playing
const tl = createTimeline({ autoplay: false })
  .add('.el', { x: 100 })
  .init();

// Later...
tl.play();
```

## Defaults

Set default parameters for all animations in the timeline:

```javascript
createTimeline({
  defaults: {
    duration: 500,
    ease: 'outExpo'
  }
})
.add('.a', { x: 100 })           // Uses defaults
.add('.b', { x: 100, duration: 1000 })  // Override duration
.add('.c', { x: 100 });          // Uses defaults
```

### Available Defaults
```javascript
createTimeline({
  defaults: {
    duration: 1000,
    delay: 0,
    ease: 'outQuad',
    composition: 'replace'
  }
});
```

## Syncing Timelines

### Sync Another Timeline
```javascript
const tlA = createTimeline({ autoplay: false })
  .add('.a', { x: 100 });

const tlB = createTimeline({ autoplay: false })
  .add('.b', { y: 100 });

// Main timeline syncs both
createTimeline()
  .sync(tlA)
  .sync(tlB, '<');  // tlB starts with tlA
```

### Sync WAAPI Animations
```javascript
import { createTimeline, waapi } from 'animejs';

const waapiAnim = waapi.animate('.el', { x: 100 });

createTimeline()
  .add('.other', { y: 100 })
  .sync(waapiAnim, '<');
```

## Labels

Labels create named positions in the timeline:

```javascript
createTimeline()
  .label('start')
  .add('.a', { x: 100 })
  .add('.b', { x: 100 })
  .label('middle')
  .add('.c', { x: 100 })
  .add('.d', { x: 100 }, 'start')   // Jump back to 'start'
  .add('.e', { x: 100 }, 'middle'); // Jump to 'middle'
```

### Label with Offset
```javascript
createTimeline()
  .label('intro', 0)
  .label('main', 1000)
  .label('outro', 2000)
  .add('.a', { x: 100 }, 'intro')
  .add('.b', { x: 100 }, 'main+=500')  // 500ms after 'main'
  .add('.c', { x: 100 }, 'outro-=200'); // 200ms before 'outro'
```

## Callbacks

```javascript
createTimeline({
  onBegin: (tl) => console.log('Timeline started'),
  onUpdate: (tl) => console.log('Progress:', tl.progress),
  onLoop: (tl) => console.log('Loop:', tl.currentLoop),
  onComplete: (tl) => console.log('Timeline finished')
})
.add('.el', { x: 100 });

// Promise-based
await createTimeline()
  .add('.el', { x: 100 })
  .then();
```

## Playback Settings

```javascript
createTimeline({
  delay: 500,
  loop: 2,
  loopDelay: 200,
  alternate: true,
  reversed: false,
  autoplay: true,
  frameRate: 60,
  playbackRate: 1,
  playbackEase: 'linear'
});
```

## Complete Example

```javascript
import { createTimeline, stagger, spring } from 'animejs';

const tl = createTimeline({
  defaults: { duration: 600, ease: 'outExpo' },
  onComplete: () => console.log('Animation complete!')
});

tl.label('intro')
  .set('.overlay', { opacity: 1 })
  .add('.title', { 
    y: [50, 0], 
    opacity: [0, 1] 
  })
  .add('.subtitle', { 
    y: [30, 0], 
    opacity: [0, 1] 
  }, '-=400')
  
  .label('content')
  .add('.card', {
    scale: [0.8, 1],
    opacity: [0, 1],
    delay: stagger(100)
  }, 'content')
  
  .label('cta')
  .add('.button', {
    scale: [0, 1],
    ease: spring({ stiffness: 200, damping: 15 })
  }, 'cta+=200')
  
  .call(() => {
    console.log('Ready for interaction');
  });
```
