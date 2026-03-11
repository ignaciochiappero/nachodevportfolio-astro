# Utilities

## Table of Contents
- [stagger()](#stagger)
- [DOM Utilities](#dom-utilities)
- [Math Utilities](#math-utilities)
- [Chainable Utilities](#chainable-utilities)

## stagger()

Create staggered values for animations.

```javascript
import { stagger } from 'animejs';
```

### Time Staggering
```javascript
animate('.items', {
  x: 100,
  delay: stagger(100)  // 0ms, 100ms, 200ms, 300ms...
});
```

### Value Staggering
```javascript
animate('.items', {
  x: stagger(50),           // 0, 50, 100, 150...
  rotate: stagger(15),      // 0, 15, 30, 45...
  opacity: stagger([0, 1])  // Range from 0 to 1
});
```

### Timeline Position Staggering
```javascript
createTimeline()
  .add('.items', { x: 100 }, stagger(50));
```

### Stagger Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `start` | Number | Starting value |
| `from` | String/Number | Starting position |
| `reversed` | Boolean | Reverse order |
| `ease` | String | Easing for distribution |
| `grid` | Array | Grid dimensions [cols, rows] |
| `axis` | String | 'x' or 'y' for grid |
| `modifier` | Function | Transform stagger value |
| `use` | String | 'index', 'progress', 'value' |
| `total` | Number | Override total count |

### start
```javascript
// Start from 500ms instead of 0
animate('.items', {
  delay: stagger(100, { start: 500 })  // 500, 600, 700...
});
```

### from
```javascript
// From first (default)
stagger(100, { from: 'first' })   // or from: 0

// From last
stagger(100, { from: 'last' })

// From center
stagger(100, { from: 'center' })

// From specific index
stagger(100, { from: 5 })

// From random
stagger(100, { from: 'random' })
```

### reversed
```javascript
// Reverse stagger order
animate('.items', {
  delay: stagger(100, { reversed: true })
});
```

### ease
```javascript
// Apply easing to stagger distribution
animate('.items', {
  delay: stagger(500, { ease: 'inOutQuad' })
});
```

### grid
```javascript
// Stagger based on 2D grid position
const grid = [10, 5];  // 10 columns, 5 rows

animate('.grid-items', {
  scale: [0, 1],
  delay: stagger(100, { 
    grid: grid,
    from: 'center'
  })
});
```

### axis
```javascript
// Restrict grid stagger to one axis
animate('.grid-items', {
  x: stagger(10, { grid: [10, 5], axis: 'x' }),
  y: stagger(10, { grid: [10, 5], axis: 'y' })
});
```

### modifier
```javascript
// Transform stagger values
animate('.items', {
  delay: stagger(100, {
    modifier: (value, index, total) => value * 2
  })
});
```

### Range Values
```javascript
// Stagger between two values
animate('.items', {
  opacity: stagger([0, 1]),      // 0 to 1
  scale: stagger([0.5, 1.5]),    // 0.5 to 1.5
  x: stagger([-100, 100])        // -100 to 100
});
```

### Complete Example
```javascript
import { animate, stagger } from 'animejs';

animate('.grid-item', {
  scale: [0, 1],
  opacity: [0, 1],
  delay: stagger(50, {
    grid: [4, 4],
    from: 'center',
    ease: 'outQuad'
  }),
  duration: 800,
  ease: 'outElastic(1, .5)'
});
```

## DOM Utilities

Access via `utils` namespace:

```javascript
import { utils } from 'animejs';
```

### $() - Query Selector
```javascript
// Returns array of elements
const elements = utils.$('.class');
const [first] = utils.$('#id');
```

### get() - Get Property Value
```javascript
// Get computed CSS value
const opacity = utils.get('.el', 'opacity');
const transform = utils.get('.el', 'transform');

// Get from specific element
const el = document.querySelector('.el');
const width = utils.get(el, 'width');
```

### set() - Set Property Value
```javascript
// Set CSS properties
utils.set('.el', { opacity: 0.5, x: 100 });

// Set on specific element
utils.set(el, { backgroundColor: '#FF0000' });
```

### cleanInlineStyles() - Remove Inline Styles
```javascript
// Remove specific properties
utils.cleanInlineStyles('.el', ['transform', 'opacity']);

// Remove all inline styles
utils.cleanInlineStyles('.el');
```

### remove() - Remove from Animation
```javascript
// Remove target from all animations
utils.remove('.el');

// Remove from specific animation
utils.remove('.el', animation);
```

### sync() - Synchronize Animations
```javascript
// Sync animation to another
utils.sync(animationA, animationB);
```

## Math Utilities

```javascript
import { utils } from 'animejs';
```

### random() - Random Number
```javascript
utils.random(0, 100);      // Random between 0-100
utils.random(50, 150);     // Random between 50-150
utils.random(-100, 100);   // Random between -100 to 100
```

### createSeededRandom() - Seeded Random
```javascript
const seededRandom = utils.createSeededRandom(12345);
seededRandom(0, 100);  // Reproducible random
```

### randomPick() - Pick Random Item
```javascript
utils.randomPick(['a', 'b', 'c']);  // Random item from array
```

### shuffle() - Shuffle Array
```javascript
utils.shuffle([1, 2, 3, 4, 5]);  // Shuffled array
```

### round() - Round Number
```javascript
utils.round(3.14159, 2);   // 3.14
utils.round(3.14159, 0);   // 3
utils.round(0);            // Returns rounding function
```

### clamp() - Clamp Value
```javascript
utils.clamp(150, 0, 100);  // 100 (clamped to max)
utils.clamp(-50, 0, 100);  // 0 (clamped to min)
utils.clamp(50, 0, 100);   // 50 (within range)
```

### snap() - Snap to Increment
```javascript
utils.snap(47, 10);   // 50 (snapped to nearest 10)
utils.snap(23, 5);    // 25 (snapped to nearest 5)
```

### wrap() - Wrap Value
```javascript
utils.wrap(370, 0, 360);   // 10 (wrapped around)
utils.wrap(-10, 0, 360);   // 350 (wrapped around)
```

### mapRange() - Map Value Between Ranges
```javascript
// Map 50 from [0,100] to [0,1]
utils.mapRange(50, 0, 100, 0, 1);  // 0.5

// Map 0.5 from [0,1] to [0,360]
utils.mapRange(0.5, 0, 1, 0, 360);  // 180
```

### lerp() - Linear Interpolation
```javascript
utils.lerp(0, 100, 0.5);   // 50 (halfway)
utils.lerp(0, 100, 0.25);  // 25 (quarter)
```

### damp() - Damped Interpolation
```javascript
// Smooth following with damping
let current = 0;
const target = 100;

// In animation loop
current = utils.damp(current, target, 0.1, deltaTime);
```

### Angle Conversions
```javascript
utils.degToRad(180);   // 3.14159...
utils.radToDeg(Math.PI);  // 180
```

### String Padding
```javascript
utils.padStart(5, 3, '0');   // '005'
utils.padEnd(5, 3, '0');     // '500'
utils.roundPad(3.1, 2);      // '3.10'
```

## Chainable Utilities

Some utilities can be chained:

```javascript
import { utils } from 'animejs';

// Chain multiple operations
const result = utils
  .clamp(value, 0, 100)
  .round(2);
```

## keepTime() - Time Keeper

Create a time keeper for tracking elapsed time:

```javascript
import { utils } from 'animejs';

const timeKeeper = utils.keepTime();

// Later...
const elapsed = timeKeeper();  // Time since creation
```

## Complete Example

```javascript
import { animate, stagger, utils } from 'animejs';

// Get all grid items
const items = utils.$('.grid-item');

// Set initial state
utils.set(items, { 
  opacity: 0, 
  scale: 0.5 
});

// Animate with stagger
animate(items, {
  opacity: 1,
  scale: 1,
  x: (el, i) => utils.random(-20, 20),
  y: (el, i) => utils.random(-20, 20),
  rotate: (el, i) => utils.random(-15, 15),
  delay: stagger(50, {
    grid: [4, 4],
    from: 'center',
    ease: 'outQuad'
  }),
  duration: 800,
  ease: 'outElastic(1, .6)',
  onComplete: () => {
    console.log('Animation complete!');
  }
});
```
