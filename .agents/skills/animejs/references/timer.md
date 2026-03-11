# Timers

## Table of Contents

- [Overview](#overview)
- [Creating Timers](#creating-timers)
- [Timer Options](#timer-options)
- [Timer Callbacks](#timer-callbacks)
- [Timer Methods](#timer-methods)
- [Common Patterns](#common-patterns)

## Creating Timers

```javascript
import { createTimer } from 'animejs';

const timer = createTimer(parameters);
```

Timers are lightweight timing utilities without animation targets. Use them for:
- Frame loops
- Countdowns
- Time-based logic
- Synchronizing non-animated elements

## Parameters

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | Number | 1000 | Timer duration in ms |
| `delay` | Number | 0 | Delay before start |
| `loop` | Boolean/Number | false | Loop count or infinite |
| `loopDelay` | Number | 0 | Delay between loops |
| `alternate` | Boolean | false | Reverse on each loop |
| `reversed` | Boolean | false | Start reversed |
| `autoplay` | Boolean | true | Auto-start |
| `frameRate` | Number | 60 | Target FPS |
| `playbackRate` | Number | 1 | Speed multiplier |

## Basic Usage

### Simple Timer
```javascript
createTimer({
  duration: 2000,
  onComplete: () => console.log('2 seconds passed!')
});
```

### Countdown Timer
```javascript
const countdown = createTimer({
  duration: 10000,
  onUpdate: (timer) => {
    const remaining = Math.ceil((timer.duration - timer.currentTime) / 1000);
    document.querySelector('.countdown').textContent = remaining;
  },
  onComplete: () => {
    document.querySelector('.countdown').textContent = 'Done!';
  }
});
```

### Frame Loop
```javascript
createTimer({
  duration: Infinity,  // or loop: true
  onUpdate: (timer) => {
    // Called every frame
    updateGameState(timer.currentTime);
    render();
  }
});
```

### Looping Timer
```javascript
createTimer({
  duration: 1000,
  loop: true,
  onLoop: (timer) => {
    console.log('Loop:', timer.currentLoop);
  }
});
```

## Callbacks

| Callback | When Called |
|----------|-------------|
| `onBegin` | When timer starts (after delay) |
| `onUpdate` | Every frame |
| `onLoop` | At end of each loop |
| `onPause` | When paused |
| `onComplete` | When timer finishes |
| `then()` | Promise-based completion |

```javascript
createTimer({
  duration: 5000,
  onBegin: (t) => console.log('Started'),
  onUpdate: (t) => {
    console.log('Time:', t.currentTime);
    console.log('Progress:', t.progress);
  },
  onLoop: (t) => console.log('Loop:', t.currentLoop),
  onPause: (t) => console.log('Paused at:', t.currentTime),
  onComplete: (t) => console.log('Completed')
});
```

## Methods

| Method | Description |
|--------|-------------|
| `play()` | Start/resume timer |
| `pause()` | Pause timer |
| `resume()` | Resume from pause |
| `restart()` | Restart from beginning |
| `reverse()` | Reverse direction |
| `alternate()` | Toggle direction |
| `complete()` | Jump to end |
| `reset()` | Reset to start |
| `revert()` | Stop and cleanup |
| `cancel()` | Stop immediately |
| `seek(time)` | Seek to time in ms |
| `stretch(duration)` | Change duration |

```javascript
const timer = createTimer({
  duration: 5000,
  autoplay: false
});

timer.play();
timer.pause();
timer.seek(2500);  // Jump to 2.5s
timer.reverse();
timer.restart();
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `duration` | Number | Total duration |
| `currentTime` | Number | Current time in ms |
| `progress` | Number | Progress 0-1 |
| `paused` | Boolean | Is paused |
| `began` | Boolean | Has started |
| `completed` | Boolean | Has finished |
| `reversed` | Boolean | Is reversed |
| `currentLoop` | Number | Current loop count |
| `iterationCurrentTime` | Number | Time within current iteration |

## Use Cases

### Progress Bar
```javascript
createTimer({
  duration: 3000,
  onUpdate: (timer) => {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = `${timer.progress * 100}%`;
  }
});
```

### Debounced Updates
```javascript
let updateTimer = null;

function scheduleUpdate() {
  if (updateTimer) updateTimer.cancel();
  
  updateTimer = createTimer({
    duration: 300,
    onComplete: () => performUpdate()
  });
}
```

### Synchronized Clock
```javascript
createTimer({
  duration: 1000,
  loop: true,
  onLoop: () => {
    const now = new Date();
    document.querySelector('.clock').textContent = 
      now.toLocaleTimeString();
  }
});
```

### Animation Sequencing
```javascript
// Use timer in timeline for delays
import { createTimeline, createTimer } from 'animejs';

createTimeline()
  .add('.intro', { opacity: [0, 1] })
  .add({ duration: 1000 })  // 1 second pause
  .add('.content', { opacity: [0, 1] });
```

### Frame-Rate Independent Logic
```javascript
let lastTime = 0;

createTimer({
  duration: Infinity,
  onUpdate: (timer) => {
    const deltaTime = timer.currentTime - lastTime;
    lastTime = timer.currentTime;
    
    // Use deltaTime for frame-rate independent updates
    position += velocity * (deltaTime / 1000);
  }
});
```

## Timer vs Animation

Use **Timer** when:
- No DOM elements to animate
- Need time-based logic only
- Building custom update loops
- Synchronizing external systems

Use **Animation** when:
- Animating DOM elements
- Need property interpolation
- Want built-in easing
- Animating CSS/transforms
