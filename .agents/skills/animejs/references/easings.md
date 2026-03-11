# Easings

## Table of Contents
- [Built-in Easings](#built-in-easings)
- [Cubic Bezier](#cubic-bezier)
- [Linear](#linear)
- [Steps](#steps)
- [Spring](#spring)
- [Irregular](#irregular)
- [Custom Easings](#custom-easings)

## Built-in Easings

### Naming Convention
V4 uses simplified names without the "ease" prefix:

| V3 (Old) | V4 (Correct) |
|----------|--------------|
| `easeInQuad` | `inQuad` |
| `easeOutExpo` | `outExpo` |
| `easeInOutCubic` | `inOutCubic` |

### Available Easings

**In** (slow start):
- `inQuad`, `inCubic`, `inQuart`, `inQuint`, `inSine`
- `inExpo`, `inCirc`, `inBack`, `inElastic`, `inBounce`

**Out** (slow end):
- `outQuad`, `outCubic`, `outQuart`, `outQuint`, `outSine`
- `outExpo`, `outCirc`, `outBack`, `outElastic`, `outBounce`

**InOut** (slow start and end):
- `inOutQuad`, `inOutCubic`, `inOutQuart`, `inOutQuint`, `inOutSine`
- `inOutExpo`, `inOutCirc`, `inOutBack`, `inOutElastic`, `inOutBounce`

**OutIn** (fast start and end):
- `outInQuad`, `outInCubic`, `outInQuart`, `outInQuint`, `outInSine`
- `outInExpo`, `outInCirc`, `outInBack`, `outInElastic`, `outInBounce`

### Usage
```javascript
import { animate } from 'animejs';

animate('.el', { x: 100, ease: 'outExpo' });
animate('.el', { x: 100, ease: 'inOutQuad' });
animate('.el', { x: 100, ease: 'outElastic' });
```

### Parametric Easings
Some easings accept parameters:

```javascript
// Elastic with amplitude and period
animate('.el', { x: 100, ease: 'outElastic(1, .5)' });

// Back with overshoot
animate('.el', { x: 100, ease: 'inBack(1.7)' });

// Generic in/out with power
animate('.el', { x: 100, ease: 'in(3)' });      // cubic
animate('.el', { x: 100, ease: 'out(4)' });     // quartic
animate('.el', { x: 100, ease: 'inOut(2)' });   // quadratic
```

## Cubic Bezier

Create custom easing curves with cubic-bezier:

```javascript
import { animate, cubicBezier } from 'animejs';

// Function syntax
animate('.el', { 
  x: 100, 
  ease: cubicBezier(0.25, 0.1, 0.25, 1.0) 
});

// String syntax
animate('.el', { 
  x: 100, 
  ease: 'cubicBezier(0.25, 0.1, 0.25, 1.0)' 
});
```

### Common Cubic Bezier Values
| Name | Values |
|------|--------|
| ease | `cubicBezier(0.25, 0.1, 0.25, 1.0)` |
| ease-in | `cubicBezier(0.42, 0, 1.0, 1.0)` |
| ease-out | `cubicBezier(0, 0, 0.58, 1.0)` |
| ease-in-out | `cubicBezier(0.42, 0, 0.58, 1.0)` |

## Linear

### Simple Linear
```javascript
animate('.el', { x: 100, ease: 'linear' });
```

### Linear with Keyframes
Create piecewise linear easing:

```javascript
import { animate, linear } from 'animejs';

// Function syntax with values
animate('.el', { 
  x: 100, 
  ease: linear(0, 0.25, 0.5, 0.75, 1) 
});

// With position hints
animate('.el', { 
  x: 100, 
  ease: linear(0, '0.5 25%', 0.5, 1) 
});

// String syntax
animate('.el', { 
  x: 100, 
  ease: 'linear(0, 0.5 25%, 0.5, 1)' 
});
```

## Steps

Create stepped/discrete animations:

```javascript
import { animate, steps } from 'animejs';

// 4 steps
animate('.el', { x: 100, ease: steps(4) });

// Steps with jump start (default is jump end)
animate('.el', { x: 100, ease: steps(4, true) });

// String syntax
animate('.el', { x: 100, ease: 'steps(4)' });
animate('.el', { x: 100, ease: 'steps(8, start)' });
animate('.el', { x: 100, ease: 'steps(8, end)' });
```

### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| count | Number | Number of steps |
| jumpStart | Boolean | Jump at start vs end |

### Use Cases
```javascript
// Sprite animation (8 frames)
animate('.sprite', { 
  backgroundPositionX: '-800px',
  ease: steps(8),
  duration: 800,
  loop: true
});

// Typewriter effect
animate('.cursor', {
  opacity: [1, 0],
  ease: steps(1),
  duration: 500,
  loop: true,
  alternate: true
});
```

## Spring

Physics-based spring animations:

```javascript
import { animate, spring } from 'animejs';

animate('.el', { 
  x: 100, 
  ease: spring() 
});
```

### Perceived Parameters (Recommended)
More intuitive control based on visual feel:

```javascript
animate('.el', { 
  x: 100, 
  ease: spring({ 
    bounce: 0.5,      // -1 to 1, default 0.5
    duration: 500     // perceived duration in ms
  }) 
});
```

| Parameter | Range | Default | Description |
|-----------|-------|---------|-------------|
| `bounce` | -1 to 1 | 0.5 | Bounciness. 0-1 = bouncy, <0 = overdamped |
| `duration` | 10-10000 | 628 | Perceived duration when animation "feels" complete |

### Physics Parameters
Direct control over spring physics:

```javascript
animate('.el', { 
  x: 100, 
  ease: spring({ 
    mass: 1,          // 1-10000, default 1
    stiffness: 100,   // 0-10000, default 100
    damping: 10,      // 0-10000, default 10
    velocity: 0       // -10000 to 10000, default 0
  }) 
});
```

| Parameter | Range | Default | Description |
|-----------|-------|---------|-------------|
| `mass` | 1-10000 | 1 | Object mass (higher = slower, heavier) |
| `stiffness` | 0-10000 | 100 | Spring tightness (higher = faster response) |
| `damping` | 0-10000 | 10 | Oscillation decay (higher = less bounce) |
| `velocity` | -10000 to 10000 | 0 | Initial velocity |

### Spring onComplete Callback
The animation's `onComplete` fires at settling duration. Use spring's `onComplete` for perceived completion:

```javascript
animate('.el', {
  x: 100,
  onComplete: () => console.log('Settling complete'),
  ease: spring({ 
    bounce: 0.25,
    duration: 350,
    onComplete: () => console.log('Perceived complete')
  })
});
```

### Common Spring Presets
```javascript
// Snappy
spring({ bounce: 0.15, duration: 300 })

// Bouncy
spring({ bounce: 0.5, duration: 500 })

// Gentle
spring({ bounce: 0, duration: 600 })

// Wobbly
spring({ stiffness: 180, damping: 12 })

// Stiff
spring({ stiffness: 300, damping: 20 })

// Slow
spring({ stiffness: 50, damping: 10 })
```

## Irregular

Create organic, irregular easing:

```javascript
import { animate, irregular } from 'animejs';

animate('.el', { 
  x: 100, 
  ease: irregular(10, 1) 
});
```

### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| segments | Number | Number of segments |
| randomness | Number | Amount of randomness (0-2+) |

```javascript
// Subtle irregularity
irregular(10, 0.5)

// Medium irregularity
irregular(10, 1)

// High irregularity
irregular(10, 2)
```

## Custom Easings

### Easing Function
Create custom easing with a function:

```javascript
import { animate, eases } from 'animejs';

// Custom easing function (t goes from 0 to 1)
const customEase = (t) => t * t;  // Same as inQuad

animate('.el', { x: 100, ease: customEase });
```

### Using eases Object
Access built-in easings programmatically:

```javascript
import { eases } from 'animejs';

// Get easing function
const outExpo = eases.outExpo;

// Use in animation
animate('.el', { x: 100, ease: eases.inOutQuad });

// Combine easings
const customEase = (t) => {
  if (t < 0.5) return eases.inQuad(t * 2) / 2;
  return 0.5 + eases.outQuad((t - 0.5) * 2) / 2;
};
```

## Per-Property Easings

Apply different easings to different properties:

```javascript
animate('.el', {
  x: { to: 100, ease: 'outExpo' },
  y: { to: 100, ease: 'outBounce' },
  rotate: { to: 360, ease: spring({ bounce: 0.3 }) },
  opacity: { to: 1, ease: 'linear' }
});
```
