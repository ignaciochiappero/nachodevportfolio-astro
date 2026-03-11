# SVG Animations

## Table of Contents
- [SVG Module](#svg-module)
- [createMotionPath()](#createmotionpath)
- [createDrawable()](#createdrawable)
- [morphTo()](#morphto)

## SVG Module

Access SVG utilities via the `svg` namespace:

```javascript
import { svg } from 'animejs';

// Available methods
svg.createMotionPath(path, offset);
svg.createDrawable(path);
svg.morphTo(targetPath);
```

### Standalone Import
```javascript
import { createMotionPath, createDrawable, morphTo } from 'animejs/svg';
```

## createMotionPath()

Animate elements along an SVG path:

```javascript
import { animate, svg } from 'animejs';

const motionPath = svg.createMotionPath('path');

animate('.element', {
  ...motionPath,
  duration: 3000,
  ease: 'linear',
  loop: true
});
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| path | String/SVGPathElement | Path selector or element |
| offset | Number | Starting offset 0-1 (default: 0) |

### Returns
Object with tween parameters:
| Property | Description |
|----------|-------------|
| `translateX` | X coordinate along path |
| `translateY` | Y coordinate along path |
| `rotate` | Angle/direction along path |

### Basic Usage
```javascript
// Element follows the path
animate('.car', {
  ...svg.createMotionPath('.road'),
  duration: 5000,
  ease: 'linear',
  loop: true
});
```

### With Offset
```javascript
// Start at 50% of the path
const motionPath = svg.createMotionPath('.path', 0.5);

animate('.element', {
  ...motionPath,
  duration: 2000
});
```

### Without Rotation
```javascript
const { translateX, translateY } = svg.createMotionPath('.path');

// Only use position, not rotation
animate('.element', {
  translateX,
  translateY,
  duration: 3000
});
```

### Multiple Elements on Path
```javascript
import { animate, svg, stagger } from 'animejs';

// Stagger multiple elements along path
animate('.dot', {
  ...svg.createMotionPath('.circuit'),
  duration: 4000,
  delay: stagger(200),
  loop: true,
  ease: 'linear'
});
```

## createDrawable()

Create line drawing animations:

```javascript
import { animate, svg } from 'animejs';

const drawable = svg.createDrawable('path');

animate(drawable, {
  draw: '0 1',
  duration: 2000,
  ease: 'inOutQuad'
});
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| path | String/SVGElement | Path, line, circle, rect, etc. |

### Returns
Drawable object that can be animated with the `draw` property.

### draw Property Values
```javascript
// Draw from 0% to 100%
animate(drawable, { draw: '0 1' });

// Draw from 50% to 100%
animate(drawable, { draw: '0.5 1' });

// Erase from start
animate(drawable, { draw: '1 1' });

// Keyframes
animate(drawable, {
  draw: ['0 0', '0 1', '1 1']  // Draw then erase
});
```

### Basic Line Drawing
```javascript
const path = svg.createDrawable('.line-path');

animate(path, {
  draw: '0 1',
  duration: 1500,
  ease: 'inOutQuad'
});
```

### Draw and Erase
```javascript
const path = svg.createDrawable('path');

animate(path, {
  draw: ['0 0', '0 1', '1 1'],
  duration: 3000,
  ease: 'inOutQuad'
});
```

### Multiple Paths
```javascript
const paths = utils.$('path').map(p => svg.createDrawable(p));

animate(paths, {
  draw: '0 1',
  delay: stagger(100),
  duration: 1000,
  ease: 'outExpo'
});
```

### Scroll-Synced Drawing
```javascript
import { animate, svg, onScroll } from 'animejs';

const drawable = svg.createDrawable('.signature');

animate(drawable, {
  draw: '0 1',
  duration: 1000,
  autoplay: onScroll({
    sync: true,
    enter: 'top center',
    leave: 'bottom center'
  })
});
```

## morphTo()

Morph between SVG shapes:

```javascript
import { animate, svg } from 'animejs';

animate('.shape-a', {
  d: svg.morphTo('.shape-b'),
  duration: 1000,
  ease: 'inOutQuad'
});
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| targetPath | String/SVGPathElement | Target shape to morph to |

### Requirements
- Both shapes must be `<path>` elements
- Paths should have similar point counts for smooth morphing
- Use path optimization tools if needed

### Basic Morphing
```javascript
animate('.circle-path', {
  d: svg.morphTo('.square-path'),
  duration: 800,
  ease: 'inOutQuad'
});
```

### Morph Sequence
```javascript
import { createTimeline, svg } from 'animejs';

createTimeline({ loop: true })
  .add('.shape', { d: svg.morphTo('.shape-2') })
  .add('.shape', { d: svg.morphTo('.shape-3') })
  .add('.shape', { d: svg.morphTo('.shape-1') });
```

### Interactive Morphing
```javascript
const shapes = ['.circle', '.square', '.triangle'];
let currentIndex = 0;

document.querySelector('.morph-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % shapes.length;
  
  animate('.morphing-shape', {
    d: svg.morphTo(shapes[currentIndex]),
    duration: 500,
    ease: 'outElastic(1, .5)'
  });
});
```

## Complete Examples

### Animated Logo
```javascript
import { createTimeline, svg, stagger } from 'animejs';

// Draw logo paths
const logoPaths = utils.$('.logo path').map(p => svg.createDrawable(p));

createTimeline()
  .add(logoPaths, {
    draw: '0 1',
    duration: 1500,
    delay: stagger(100),
    ease: 'outExpo'
  })
  .add('.logo path', {
    fill: ['transparent', 'currentColor'],
    duration: 500
  }, '-=500');
```

### Car on Track
```javascript
import { animate, svg } from 'animejs';

// Animate car along track
animate('.car', {
  ...svg.createMotionPath('.track'),
  duration: 8000,
  loop: true,
  ease: 'linear'
});

// Draw track as car moves
animate(svg.createDrawable('.track'), {
  draw: '0 1',
  duration: 8000,
  loop: true,
  ease: 'linear'
});
```

### Shape Morph Gallery
```javascript
import { animate, svg } from 'animejs';

const shapes = utils.$('.morph-target');
let current = 0;

function morphToNext() {
  current = (current + 1) % shapes.length;
  
  animate('.active-shape', {
    d: svg.morphTo(shapes[current]),
    duration: 600,
    ease: 'inOutQuad',
    onComplete: () => setTimeout(morphToNext, 2000)
  });
}

morphToNext();
```

### Handwriting Effect
```javascript
import { createTimeline, svg, stagger } from 'animejs';

const letters = utils.$('.handwriting path');
const drawables = letters.map(l => svg.createDrawable(l));

createTimeline()
  .add(drawables, {
    draw: '0 1',
    duration: 800,
    delay: stagger(150),
    ease: 'outQuad'
  });
```

## Tips

1. **Path Optimization**: Use tools like SVGO to optimize paths
2. **Point Matching**: For smooth morphs, ensure similar point counts
3. **Performance**: Complex paths can be expensive - simplify when possible
4. **Stroke Settings**: Set `stroke-dasharray` and `stroke-dashoffset` in CSS for drawables
5. **viewBox**: Ensure proper viewBox for motion paths to work correctly
