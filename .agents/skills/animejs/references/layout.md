# Layout Animations

## Table of Contents
- [Overview](#overview)
- [Creating Layout Animations](#creating-layout-animations)
- [Usage Patterns](#usage-patterns)
- [Settings](#settings)
- [States](#states)
- [Methods](#methods)
- [Layout ID](#layout-id)
- [Callbacks](#callbacks)
- [Common Gotchas](#common-gotchas)

## Overview

Layout animations use the FLIP (First, Last, Invert, Play) technique to smoothly animate DOM changes like:
- Reordering lists
- Adding/removing elements
- Changing CSS display property
- Moving elements between containers

```javascript
import { createLayout } from 'animejs';
```

## Creating Layout Animations

```javascript
import { createLayout } from 'animejs';

const layout = createLayout(root, parameters);
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| root | Element/String | Container element |
| parameters | Object | Settings, states, callbacks |

## Usage Patterns

### Basic Layout Animation
```javascript
const layout = createLayout('.container', {
  duration: 500,
  ease: 'outExpo'
});

// Record current state
layout.record();

// Make DOM changes
container.appendChild(newElement);
// or reorder elements
// or change styles

// Animate to new state
layout.animate();
```

### CSS Display Property Animation
```javascript
const layout = createLayout('.container');

layout.record();

// Toggle display
element.style.display = element.style.display === 'none' ? 'block' : 'none';

layout.animate();
```

### Staggered Layout Animation
```javascript
import { createLayout, stagger } from 'animejs';

const layout = createLayout('.container', {
  delay: stagger(50),
  duration: 600,
  ease: 'outExpo'
});

layout.record();
shuffleElements();
layout.animate();
```

### DOM Order Animation
```javascript
const layout = createLayout('.list');

layout.record();

// Reorder DOM elements
const items = [...container.children];
items.sort((a, b) => a.dataset.order - b.dataset.order);
items.forEach(item => container.appendChild(item));

layout.animate();
```

### Enter Layout Animation
```javascript
const layout = createLayout('.container', {
  enterFrom: {
    opacity: 0,
    scale: 0.8,
    y: 20
  }
});

layout.record();

// Add new element
container.appendChild(newElement);

layout.animate();
```

### Exit Layout Animation
```javascript
const layout = createLayout('.container', {
  leaveTo: {
    opacity: 0,
    scale: 0.8,
    y: -20
  }
});

layout.record();

// Remove element
elementToRemove.remove();

layout.animate();
```

### Swap Parent Animation
```javascript
const layout = createLayout('.container', {
  swapAt: 0.5  // Swap at 50% of animation
});

layout.record();

// Move element to different parent
newParent.appendChild(element);

layout.animate();
```

### Modal Dialog Animation
```javascript
const layout = createLayout('body', {
  enterFrom: {
    opacity: 0,
    scale: 0.9
  },
  leaveTo: {
    opacity: 0,
    scale: 0.9
  }
});

function showModal() {
  layout.record();
  modal.style.display = 'flex';
  layout.animate();
}

function hideModal() {
  layout.record();
  modal.style.display = 'none';
  layout.animate();
}
```

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `children` | String | `'*'` | Selector for animated children |
| `delay` | Number/Function | 0 | Animation delay |
| `duration` | Number | 500 | Animation duration |
| `ease` | String | `'outExpo'` | Easing function |
| `properties` | Array | All | CSS properties to animate |

### children
```javascript
// Only animate specific children
createLayout('.container', {
  children: '.item'  // Only .item elements
});
```

### properties
```javascript
// Only animate specific properties
createLayout('.container', {
  properties: ['transform', 'opacity']
});

// Animate box-shadow (expensive)
createLayout('.container', {
  properties: ['transform', 'opacity', 'boxShadow']
});
```

## States

### enterFrom
Initial state for entering elements:

```javascript
createLayout('.container', {
  enterFrom: {
    opacity: 0,
    scale: 0.5,
    y: 50,
    rotate: -10
  }
});
```

### leaveTo
Final state for leaving elements:

```javascript
createLayout('.container', {
  leaveTo: {
    opacity: 0,
    scale: 0.5,
    y: -50,
    rotate: 10
  }
});
```

### swapAt
When to swap element during parent change (0-1):

```javascript
createLayout('.container', {
  swapAt: 0.5  // Swap at 50% progress
});
```

## Methods

| Method | Description |
|--------|-------------|
| `record()` | Capture current state |
| `animate()` | Animate to new state |
| `update()` | Update without animation |
| `revert()` | Revert all changes |

### record()
```javascript
// Must call before DOM changes
layout.record();
```

### animate()
```javascript
// Call after DOM changes
const animation = layout.animate();

// Returns animation instance
animation.then(() => console.log('Layout animation complete'));
```

### update()
```javascript
// Update positions without animation
layout.update();
```

### revert()
```javascript
// Clean up layout instance
layout.revert();
```

## Layout ID

Use `data-layout-id` for elements that move between containers:

```html
<div class="container-a">
  <div data-layout-id="item-1">Item 1</div>
</div>

<div class="container-b">
  <!-- Item will animate here when moved -->
</div>
```

```javascript
const layout = createLayout('body');

layout.record();

// Move to different container
containerB.appendChild(item1);

layout.animate();  // Smooth transition between containers
```

## Callbacks

```javascript
createLayout('.container', {
  onBegin: (layout) => console.log('Started'),
  onUpdate: (layout) => console.log('Progress:', layout.progress),
  onComplete: (layout) => console.log('Finished')
});
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `root` | Element | Container element |
| `children` | Array | Animated child elements |
| `progress` | Number | Animation progress 0-1 |

## Common Gotchas

### 1. Always Record Before Changes
```javascript
// WRONG
container.appendChild(newElement);
layout.record();  // Too late!
layout.animate();

// CORRECT
layout.record();
container.appendChild(newElement);
layout.animate();
```

### 2. Elements Must Have Position
```javascript
// Elements need layout context
.item {
  position: relative;  /* or absolute, fixed */
}
```

### 3. Avoid Animating During Animation
```javascript
// Wait for completion
await layout.animate();
// Then make more changes
layout.record();
// ...
```

### 4. Use Layout ID for Cross-Container
```javascript
// Without layout-id, element will fade out/in
// With layout-id, element will smoothly move
<div data-layout-id="unique-id">...</div>
```

### 5. Performance with Many Elements
```javascript
// Limit animated properties for better performance
createLayout('.container', {
  properties: ['transform', 'opacity'],  // Skip expensive properties
  children: '.animate-me'  // Only animate specific children
});
```

## Complete Example

```javascript
import { createLayout, stagger } from 'animejs';

const container = document.querySelector('.grid');
const layout = createLayout(container, {
  duration: 600,
  ease: 'outExpo',
  delay: stagger(30, { from: 'center' }),
  enterFrom: {
    opacity: 0,
    scale: 0.8
  },
  leaveTo: {
    opacity: 0,
    scale: 0.8
  },
  onComplete: () => console.log('Layout animation done')
});

// Add item
function addItem(content) {
  layout.record();
  const item = document.createElement('div');
  item.className = 'grid-item';
  item.textContent = content;
  container.appendChild(item);
  layout.animate();
}

// Remove item
function removeItem(item) {
  layout.record();
  item.remove();
  layout.animate();
}

// Shuffle items
function shuffleItems() {
  layout.record();
  const items = [...container.children];
  items.sort(() => Math.random() - 0.5);
  items.forEach(item => container.appendChild(item));
  layout.animate();
}
```
