# Scope

`createScope(params)` creates a scoped environment for animations, essential for React/Vue components and media queries.

## Import

```javascript
import { createScope } from 'animejs';
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `root` | Selector/Element | Limits DOM queries to descendants |
| `mediaQueries` | Object | Named media query strings |
| `defaults` | Object | Default animation parameters |

## Methods

| Method | Description |
|--------|-------------|
| `scope.add(fn)` | Adds constructor that re-runs on media query changes |
| `scope.addOnce(fn)` | Adds constructor that runs only once |
| `scope.revert()` | Reverts all animations and calls cleanup functions |
| `scope.refresh()` | Manually reverts and re-runs constructors |
| `scope.keepTime(fn)` | Recreates animation while preserving currentTime |

## Properties

| Property | Description |
|----------|-------------|
| `scope.matches` | Object with boolean state of each media query |
| `scope.root` | The root element |
| `scope.defaults` | Default parameters object |

## Basic Usage

```javascript
import { createScope, animate } from 'animejs';

const scope = createScope({
  root: '.container',
  mediaQueries: {
    mobile: '(max-width: 600px)',
    reduced: '(prefers-reduced-motion)'
  },
  defaults: { ease: 'outExpo' }
});

scope.add(self => {
  const { mobile, reduced } = self.matches;
  
  animate('.el', {
    x: mobile ? 0 : 100,
    duration: reduced ? 0 : 1000
  });
  
  // Cleanup function (runs on revert or media query change)
  return () => {
    // Remove event listeners, etc.
    // Anime.js animations are automatically reverted
  };
});
```

## React Integration

```javascript
import { useEffect, useRef } from 'react';
import { createScope, animate } from 'animejs';

function AnimatedComponent() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scope = createScope({ root: containerRef.current });
    
    scope.add(() => {
      animate('.box', { x: 100, opacity: [0, 1] });
    });

    return () => scope.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef}>
      <div className="box" />
    </div>
  );
}
```

## Registering Methods

```javascript
const scope = createScope();

scope.add(self => {
  // Register a method callable from outside
  self.add('onClick', (e) => {
    animate('.el', { scale: [1, 1.2, 1] });
  });
});

// Call from outside the scope
document.addEventListener('click', scope.methods.onClick);
```
