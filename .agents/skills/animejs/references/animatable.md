# Animatable

`createAnimatable(targets, params)` creates reactive animated values for high-frequency updates (cursor tracking, scroll, game loops). More performant than `animate()` for continuous value changes.

## Import

```javascript
import { createAnimatable } from 'animejs';
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `targets` | Selector/Element/Array | Elements to animate |
| `params` | Object | Property names with duration values or settings objects |

## Property Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `duration` | Number | 1000 | Transition duration in ms |
| `ease` | String/Function | 'outQuad' | Easing function |
| `modifier` | Function | - | Value modifier (e.g., `utils.snap(10)`) |
| `unit` | String | - | CSS unit ('px', 'rem', '%', 'rad') |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `animatable.prop(value)` | Animatable | Sets property, returns instance for chaining |
| `animatable.prop(value, duration, ease)` | Animatable | Sets with custom duration/ease |
| `animatable.prop()` | Number/Array | Gets current value |
| `animatable.revert()` | Animatable | Reverts to original values |

## Properties

| Property | Description |
|----------|-------------|
| `animatable.targets` | Array of target elements |
| `animatable.animations` | Object containing all property animations |

## Basic Usage

```javascript
import { createAnimatable, utils } from 'animejs';

const circle = createAnimatable('.circle', {
  x: 500,        // 500ms duration for x
  y: 500,        // 500ms duration for y
  scale: 200,    // 200ms duration for scale
  ease: 'out(3)' // Global easing
});

// Animate on mouse move
window.addEventListener('mousemove', e => {
  const x = e.clientX - window.innerWidth / 2;
  const y = e.clientY - window.innerHeight / 2;
  
  // Chainable setters
  circle.x(x).y(y);
});

// Get current values
console.log(circle.x(), circle.y());
```

## With Modifier

```javascript
const snappedCircle = createAnimatable('.circle', {
  x: { duration: 0, modifier: utils.snap(50) },
  y: { duration: 0, modifier: utils.snap(50) }
});
```

## Color Animation

```javascript
const box = createAnimatable('.box', {
  backgroundColor: 250,
  ease: 'outExpo'
});

// Pass RGB array
box.backgroundColor([255, 100, 50]);
```
