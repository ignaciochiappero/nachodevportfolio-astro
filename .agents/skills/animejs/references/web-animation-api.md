# Web Animations API (WAAPI)

## Table of Contents
- [When to Use WAAPI](#when-to-use-waapi)
- [waapi.animate()](#waapinanimate)
- [Improvements Over Native WAAPI](#improvements-over-native-waapi)
- [API Differences](#api-differences)
- [waapi.convertEase()](#waapiconvertease)
- [Syncing with Timelines](#syncing-with-timelines)

## When to Use WAAPI

Use WAAPI (`waapi.animate()`) instead of JS (`animate()`) when:

| Use WAAPI | Use JS Engine |
|-----------|---------------|
| Hardware-accelerated transforms | Complex sequencing |
| Simple CSS animations | Callbacks on every frame |
| Better battery performance | Animating JS objects |
| Offloading to compositor | Relative values (`+=`, `-=`) |
| Mobile performance critical | Composition modes |
| Fewer callbacks needed | loopDelay, frameRate control |

## waapi.animate()

```javascript
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

### Basic Usage
```javascript
waapi.animate('.element', {
  x: 100,
  opacity: [0, 1],
  duration: 1000,
  ease: 'outExpo'
});
```

### Standalone Import
```javascript
import { animate } from 'animejs/waapi';

animate('.element', { x: 100 });
```

## Improvements Over Native WAAPI

Anime.js WAAPI wrapper provides several improvements:

### 1. Sensible Defaults
```javascript
// Native WAAPI - verbose
element.animate(
  [{ transform: 'translateX(0px)' }, { transform: 'translateX(100px)' }],
  { duration: 1000, fill: 'forwards', easing: 'ease-out' }
);

// Anime.js WAAPI - clean
waapi.animate(element, { x: 100, ease: 'outQuad' });
```

### 2. Multi-Target Animation
```javascript
// Animate multiple elements at once
waapi.animate('.items', {
  x: 100,
  delay: (el, i) => i * 100
});
```

### 3. Default Units
```javascript
// Units added automatically
waapi.animate('.el', {
  x: 100,        // becomes '100px'
  rotate: 360,   // becomes '360deg'
  scale: 1.5     // unitless
});
```

### 4. Function-Based Values
```javascript
waapi.animate('.items', {
  x: (el, i, total) => i * 50,
  delay: (el, i) => i * 100
});
```

### 5. Individual Transforms
```javascript
// Animate transforms independently
waapi.animate('.el', {
  x: 100,
  y: 50,
  rotate: 45,
  scale: 1.2
});
```

### 6. Individual Property Parameters
```javascript
waapi.animate('.el', {
  x: { to: 100, duration: 500, ease: 'outExpo' },
  rotate: { to: 360, duration: 1000, ease: 'linear' }
});
```

### 7. Spring and Custom Easings
```javascript
import { waapi, spring } from 'animejs';

// Springs work in WAAPI!
waapi.animate('.el', {
  x: 100,
  ease: spring({ stiffness: 100, damping: 10 })
});

// Custom easings converted automatically
waapi.animate('.el', {
  x: 100,
  ease: 'outElastic(1, .5)'
});
```

## API Differences

### iterations (not loop)
```javascript
// Native WAAPI uses 'iterations'
// Anime.js uses 'loop' for consistency

waapi.animate('.el', {
  x: 100,
  loop: 3        // Converted to iterations: 3
});

waapi.animate('.el', {
  x: 100,
  loop: true     // Converted to iterations: Infinity
});
```

### direction (not alternate/reversed)
```javascript
// Anime.js style
waapi.animate('.el', {
  x: 100,
  alternate: true,
  reversed: true
});

// Equivalent native WAAPI
// direction: 'alternate-reverse'
```

### easing (ease in Anime.js)
```javascript
// Anime.js uses 'ease'
waapi.animate('.el', {
  x: 100,
  ease: 'outExpo'  // Converted to valid WAAPI easing
});
```

### finished Promise
```javascript
// Both work the same way
const anim = waapi.animate('.el', { x: 100 });

// Promise-based
await anim.finished;
// or
await anim.then();
```

## waapi.convertEase()

Convert Anime.js easings to WAAPI-compatible format:

```javascript
import { waapi } from 'animejs';

// Convert easing string
const waapiEasing = waapi.convertEase('outExpo');
// Returns: 'cubic-bezier(0.16, 1, 0.3, 1)'

// Convert spring
const springEasing = waapi.convertEase(spring({ bounce: 0.5 }));
// Returns: 'linear(...)' approximation

// Use with native WAAPI
element.animate(
  [{ transform: 'translateX(100px)' }],
  { duration: 1000, easing: waapi.convertEase('outElastic(1, .5)') }
);
```

## Syncing with Timelines

WAAPI animations can be synced with JS timelines:

```javascript
import { createTimeline, waapi } from 'animejs';

// Create WAAPI animation
const waapiAnim = waapi.animate('.hardware-accelerated', {
  x: 100,
  autoplay: false
});

// Sync with timeline
createTimeline()
  .add('.js-animated', { y: 100 })
  .sync(waapiAnim, '<')  // Start together
  .add('.another', { opacity: 1 });
```

## Playback Methods

WAAPI animations support standard playback methods:

```javascript
const anim = waapi.animate('.el', { x: 100, autoplay: false });

anim.play();
anim.pause();
anim.reverse();
anim.cancel();

// Seek (use currentTime)
anim.currentTime = 500;

// Playback rate
anim.playbackRate = 2;
```

## persist Option

Keep styles after animation completes:

```javascript
// Without persist - styles revert after completion
waapi.animate('.el', { x: 100 });

// With persist - styles remain
waapi.animate('.el', { 
  x: 100, 
  persist: true 
});
```

## Complete Example

```javascript
import { waapi, spring, createTimeline } from 'animejs';

// Hardware-accelerated entrance
const entrance = waapi.animate('.hero-image', {
  scale: [0.8, 1],
  opacity: [0, 1],
  duration: 800,
  ease: spring({ bounce: 0.3 }),
  persist: true
});

// Sync with JS timeline for complex sequencing
const tl = createTimeline()
  .sync(entrance)
  .add('.hero-title', {
    y: [50, 0],
    opacity: [0, 1],
    duration: 600
  }, '-=400')
  .add('.hero-cta', {
    scale: [0, 1],
    ease: spring({ stiffness: 200 })
  }, '-=200');

// Hover effect with WAAPI for performance
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    waapi.animate(card, {
      scale: 1.05,
      duration: 200,
      ease: 'outQuad'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    waapi.animate(card, {
      scale: 1,
      duration: 300,
      ease: 'outQuad'
    });
  });
});
```

## Performance Tips

1. **Use WAAPI for transforms and opacity** - These are compositor-friendly
2. **Avoid animating layout properties** - width, height, top, left trigger reflow
3. **Use `will-change` sparingly** - Only when needed, remove after
4. **Batch animations** - Group related animations together
5. **Use `persist: true`** - Avoid style recalculation on completion
