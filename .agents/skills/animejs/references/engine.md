# Engine

Global animation engine configuration and control.

## Import

```javascript
import { engine } from 'animejs';
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `speed` | Number | 1 | Global playback speed (0.5 = half, 2 = double) |
| `fps` | Number | 120 | Frame rate cap |
| `precision` | Number | 4 | Decimal places for CSS values |
| `timeUnit` | 'ms'/'s' | 'ms' | Time unit for duration/delay |
| `pauseOnDocumentHidden` | Boolean | true | Pause when tab hidden |
| `useDefaultMainLoop` | Boolean | true | Use built-in RAF loop |

## Methods

| Method | Description |
|--------|-------------|
| `engine.pause()` | Pauses all animations |
| `engine.resume()` | Resumes all animations |
| `engine.update()` | Manual tick (when `useDefaultMainLoop = false`) |

## Properties

| Property | Description |
|----------|-------------|
| `engine.currentTime` | Current engine time |
| `engine.deltaTime` | Time since last frame |
| `engine.defaults` | Global default parameters object |

## Usage

```javascript
import { engine, animate } from 'animejs';

// Slow motion
engine.speed = 0.5;

// Lower frame rate for performance
engine.fps = 30;

// Use seconds instead of milliseconds
engine.timeUnit = 's';
animate('.el', { x: 100, duration: 1 }); // 1 second

// Pause/resume all
engine.pause();
engine.resume();
```

## Custom Loop (Three.js, game engines)

```javascript
import { engine, animate } from 'animejs';

engine.useDefaultMainLoop = false;

function gameLoop() {
  engine.update(); // Manually tick anime.js
  renderer.render(scene, camera);
  requestAnimationFrame(gameLoop);
}
gameLoop();
```

## Global Defaults

```javascript
engine.defaults.duration = 500;
engine.defaults.ease = 'outExpo';
```
