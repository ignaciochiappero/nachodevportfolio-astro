# Getting Started

## Installation

```bash
npm install animejs
```

## ES Module Imports

```javascript
// Main imports
import { animate, createTimeline, stagger, utils } from 'animejs';

// Additional modules
import { onScroll, createDraggable, splitText, createScope } from 'animejs';
import { createAnimatable, createTimer, createLayout } from 'animejs';
import { svg, waapi, engine, eases, spring, cubicBezier } from 'animejs';
```

## Subpath Imports (Smaller Bundles)

```javascript
import { animate } from 'animejs/animation';
import { createTimeline } from 'animejs/timeline';
import { createTimer } from 'animejs/timer';
import { stagger, utils } from 'animejs/utilities';
import { onScroll } from 'animejs/scroll';
import { createDraggable } from 'animejs/draggable';
import { splitText } from 'animejs/text';
import { createScope } from 'animejs/scope';
import { createAnimatable } from 'animejs/animatable';
import { createLayout } from 'animejs/layout';
import { svg } from 'animejs/svg';
import { waapi } from 'animejs/waapi';
```

## CDN / UMD

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@4/dist/anime.min.js"></script>
<script>
  const { animate, createTimeline, stagger } = anime;
  animate('.el', { x: 100 });
</script>
```

## React Integration

```javascript
import { useEffect, useRef } from 'react';
import { createScope, animate } from 'animejs';

function AnimatedComponent() {
  const root = useRef(null);

  useEffect(() => {
    const scope = createScope({ root: root.current });
    
    scope.add(() => {
      animate('.box', {
        x: [0, 100],
        opacity: [0, 1],
        delay: stagger(100)
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={root}>
      <div className="box" />
      <div className="box" />
    </div>
  );
}
```

## Vue Integration

```javascript
import { onMounted, onUnmounted, ref } from 'vue';
import { createScope, animate } from 'animejs';

const root = ref(null);
let scope;

onMounted(() => {
  scope = createScope({ root: root.value });
  scope.add(() => {
    animate('.box', { x: 100 });
  });
});

onUnmounted(() => {
  scope.revert();
});
```
