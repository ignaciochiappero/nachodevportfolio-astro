# Core Animation API

## Table of Contents
- [animate() Function](#animate-function)
- [Targets](#targets)
- [Animatable Properties](#animatable-properties)
- [Tween Parameters](#tween-parameters)
- [Keyframes](#keyframes)
- [Playback Settings](#playback-settings)
- [Callbacks](#callbacks)
- [Playback Methods](#playback-methods)
- [Animation Properties](#animation-properties)

## animate() Function

```javascript
import { animate } from 'animejs';

const animation = animate(targets, parameters);
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| targets | String, Element, Object, Array | Elements to animate |
| parameters | Object | Animation properties and settings |

### Returns
`Animation` instance with playback methods and properties.

## Targets

### CSS Selector
```javascript
animate('.class', { x: 100 });
animate('#id', { x: 100 });
animate('div > span', { x: 100 });
```

### DOM Elements
```javascript
const el = document.querySelector('.box');
animate(el, { x: 100 });

const els = document.querySelectorAll('.box');
animate(els, { x: 100 });
```

### JavaScript Objects
```javascript
const obj = { x: 0, y: 0 };
animate(obj, {
  x: 100,
  y: 200,
  onUpdate: () => console.log(obj.x, obj.y)
});
```

### Array of Mixed Targets
```javascript
animate(['.class', element, obj], { x: 100 });
```

## Animatable Properties

### CSS Transform Shorthands
| Property | CSS Equivalent |
|----------|---------------|
| `x` | `translateX` |
| `y` | `translateY` |
| `z` | `translateZ` |
| `rotate` | `rotate` |
| `rotateX` | `rotateX` |
| `rotateY` | `rotateY` |
| `rotateZ` | `rotateZ` |
| `scale` | `scale` |
| `scaleX` | `scaleX` |
| `scaleY` | `scaleY` |
| `scaleZ` | `scaleZ` |
| `skew` | `skew` |
| `skewX` | `skewX` |
| `skewY` | `skewY` |

### CSS Properties
```javascript
animate('.el', {
  opacity: 1,
  backgroundColor: '#FFF',
  borderRadius: '50%',
  width: '200px',
  boxShadow: '0 10px 20px rgba(0,0,0,.2)'
});
```

### CSS Variables
```javascript
animate('.el', {
  '--custom-property': 100
});
```

### JavaScript Object Properties
```javascript
const data = { progress: 0 };
animate(data, { progress: 100 });
```

### HTML Attributes
```javascript
animate('input', { value: 100 });
animate('progress', { value: 75 });
```

### SVG Attributes
```javascript
animate('circle', { r: 50, cx: 100, cy: 100 });
animate('rect', { width: 200, height: 100 });
```

## Tween Parameters

### Value Types

```javascript
// Numerical (unitless)
animate('.el', { opacity: 0.5 });

// With units
animate('.el', { x: '100px', width: '50%' });

// From-To array
animate('.el', { x: [0, 100] });  // from 0 to 100

// Relative values (JS engine only)
animate('.el', { x: '+=100' });   // add 100
animate('.el', { x: '-=50' });    // subtract 50
animate('.el', { x: '*=2' });     // multiply by 2

// Colors
animate('.el', { backgroundColor: '#FF0000' });
animate('.el', { backgroundColor: 'rgb(255, 0, 0)' });
animate('.el', { backgroundColor: 'hsl(0, 100%, 50%)' });

// Function-based values
animate('.el', {
  x: (el, i, total) => i * 50,
  delay: (el, i) => i * 100
});
```

### Per-Property Parameters

```javascript
animate('.el', {
  x: {
    to: 100,
    duration: 500,
    ease: 'outExpo'
  },
  rotate: {
    to: 360,
    duration: 1000,
    ease: 'inOutQuad'
  }
});
```

### Tween Parameter Object
| Property | Type | Description |
|----------|------|-------------|
| `to` | Any | End value |
| `from` | Any | Start value |
| `delay` | Number | Delay before this property animates |
| `duration` | Number | Duration for this property |
| `ease` | String/Function | Easing for this property |
| `composition` | String | 'none', 'replace', 'blend' (JS only) |
| `modifier` | Function | Transform the animated value |

### Modifier Function
```javascript
animate('.el', {
  x: {
    to: 360,
    modifier: v => Math.round(v)  // Round values
  }
});
```

### Composition Modes (JS Engine Only)
```javascript
// 'none' - No composition, direct value
// 'replace' - Replace existing transforms (default)
// 'blend' - Blend with existing transforms

animate('.el', {
  x: 100,
  composition: 'blend'
});
```

## Keyframes

### Property Value Keyframes
```javascript
animate('.el', {
  x: [0, 100, 50, 150],  // 4 keyframes
  opacity: [0, 1, 1, 0]
});
```

### Tween Parameters Keyframes
```javascript
animate('.el', {
  x: [
    { to: 100, duration: 500 },
    { to: 200, duration: 300, ease: 'outExpo' }
  ]
});
```

### Duration-Based Keyframes
```javascript
animate('.el', {
  keyframes: [
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ],
  duration: 3000
});
```

### Percentage-Based Keyframes
```javascript
animate('.el', {
  keyframes: {
    '0%': { x: 0, y: 0 },
    '50%': { x: 100, y: 50 },
    '100%': { x: 200, y: 0 }
  },
  duration: 2000
});
```

## Playback Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | Number | 1000 | Duration in ms |
| `delay` | Number | 0 | Delay before start |
| `loop` | Boolean/Number | false | Loop count or infinite |
| `loopDelay` | Number | 0 | Delay between loops (JS only) |
| `alternate` | Boolean | false | Reverse on each loop |
| `reversed` | Boolean | false | Play in reverse |
| `autoplay` | Boolean/ScrollObserver | true | Auto-start or scroll trigger |
| `frameRate` | Number | 60 | Target FPS (JS only) |
| `playbackRate` | Number | 1 | Speed multiplier |
| `playbackEase` | String | 'linear' | Ease the entire animation (JS only) |
| `persist` | Boolean | false | Keep WAAPI styles after completion |

```javascript
animate('.el', {
  x: 100,
  duration: 2000,
  delay: 500,
  loop: 3,
  alternate: true,
  ease: 'inOutQuad'
});
```

## Callbacks

| Callback | When Called |
|----------|-------------|
| `onBegin` | When animation starts (after delay) |
| `onUpdate` | Every frame |
| `onBeforeUpdate` | Before each frame update (JS only) |
| `onRender` | After DOM is updated (JS only) |
| `onLoop` | At the end of each loop |
| `onPause` | When paused (JS only) |
| `onComplete` | When animation finishes |
| `then()` | Promise-based completion |

```javascript
animate('.el', {
  x: 100,
  onBegin: (anim) => console.log('Started'),
  onUpdate: (anim) => console.log('Progress:', anim.progress),
  onLoop: (anim) => console.log('Loop:', anim.currentLoop),
  onComplete: (anim) => console.log('Done')
});

// Promise-based
await animate('.el', { x: 100 }).then();
```

### Callback Parameters
```javascript
onUpdate: (animation) => {
  animation.progress;        // 0 to 1
  animation.currentTime;     // Current time in ms
  animation.duration;        // Total duration
  animation.paused;          // Boolean
  animation.began;           // Boolean
  animation.completed;       // Boolean
}
```

## Playback Methods

| Method | Description |
|--------|-------------|
| `play()` | Start/resume animation |
| `pause()` | Pause animation |
| `resume()` | Resume from paused state |
| `restart()` | Restart from beginning |
| `reverse()` | Reverse playback direction |
| `alternate()` | Toggle direction |
| `complete()` | Jump to end |
| `reset()` | Reset to initial state (JS only) |
| `revert()` | Remove all changes |
| `cancel()` | Stop and remove |
| `seek(time)` | Seek to time in ms |
| `stretch(duration)` | Change duration (JS only) |
| `refresh()` | Recalculate values (JS only) |

```javascript
const anim = animate('.el', { x: 100, autoplay: false });

anim.play();
anim.pause();
anim.seek(500);      // Seek to 500ms
anim.reverse();
anim.restart();
anim.complete();
```

## Animation Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | Number | Unique animation ID |
| `targets` | Array | Animated elements |
| `duration` | Number | Total duration |
| `currentTime` | Number | Current playback time |
| `progress` | Number | Progress 0-1 |
| `paused` | Boolean | Is paused |
| `began` | Boolean | Has started |
| `completed` | Boolean | Has finished |
| `reversed` | Boolean | Is reversed |
| `currentLoop` | Number | Current loop count |

```javascript
const anim = animate('.el', { x: 100 });

console.log(anim.duration);    // 1000
console.log(anim.progress);    // 0-1
console.log(anim.completed);   // false
```
