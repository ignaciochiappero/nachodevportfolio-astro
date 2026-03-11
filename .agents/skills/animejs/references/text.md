# Text Animations

## Table of Contents
- [splitText() Function](#splittext-function)
- [Settings](#settings)
- [Split Parameters](#split-parameters)
- [HTML Template](#html-template)
- [Methods](#methods)
- [Properties](#properties)
- [Animation Examples](#animation-examples)

## splitText() Function

Split text into animatable lines, words, and characters:

```javascript
import { splitText } from 'animejs';

const split = splitText(target, parameters);
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| target | Element/String | Text element to split |
| parameters | Object | Settings and split parameters |

### Returns
`TextSplitter` instance with arrays of split elements.

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `lines` | Boolean | false | Split into lines |
| `words` | Boolean | false | Split into words |
| `chars` | Boolean | false | Split into characters |
| `debug` | Boolean | false | Show debug outlines |
| `includeSpaces` | Boolean | false | Wrap spaces as elements |
| `accessible` | Boolean | true | Create accessible clone |

### Basic Splitting
```javascript
// Split into characters
const split = splitText('.text', { chars: true });

// Split into words
const split = splitText('.text', { words: true });

// Split into lines
const split = splitText('.text', { lines: true });

// Split into all
const split = splitText('.text', { 
  lines: true, 
  words: true, 
  chars: true 
});
```

### debug
```javascript
// Show visual outlines for debugging
splitText('.text', { 
  chars: true, 
  debug: true 
});
```

### includeSpaces
```javascript
// Wrap spaces as separate elements
splitText('.text', { 
  words: true, 
  includeSpaces: true 
});
```

### accessible
```javascript
// Create accessible clone (default: true)
// Preserves original text for screen readers
splitText('.text', { 
  chars: true, 
  accessible: true 
});
```

## Split Parameters

Customize the generated HTML elements:

| Parameter | Type | Description |
|-----------|------|-------------|
| `class` | String | CSS class for split elements |
| `wrap` | String | Wrapper element tag |
| `clone` | Boolean | Clone elements instead of moving |

### class
```javascript
splitText('.text', {
  chars: true,
  class: 'char'  // Each char gets class="char"
});
```

### wrap
```javascript
// Wrap each element in a span
splitText('.text', {
  words: true,
  wrap: 'span'
});

// Wrap in custom element
splitText('.text', {
  chars: true,
  wrap: 'div'
});
```

### clone
```javascript
// Clone elements (useful for effects)
splitText('.text', {
  chars: true,
  clone: true
});
```

## HTML Template

Customize the HTML structure with templates:

```javascript
splitText('.text', {
  chars: true,
  charTemplate: '<span class="char" data-char="{{char}}">{{char}}</span>'
});

splitText('.text', {
  words: true,
  wordTemplate: '<span class="word">{{word}}</span>'
});

splitText('.text', {
  lines: true,
  lineTemplate: '<div class="line">{{line}}</div>'
});
```

## Methods

| Method | Description |
|--------|-------------|
| `addEffect(animation)` | Add animation effect |
| `revert()` | Restore original text |
| `refresh()` | Recalculate splits |

### addEffect()
```javascript
const split = splitText('.text', { chars: true });

// Add hover effect to each character
split.addEffect((char, i) => {
  char.addEventListener('mouseenter', () => {
    animate(char, { scale: 1.2, color: '#FF0000' });
  });
  char.addEventListener('mouseleave', () => {
    animate(char, { scale: 1, color: '#000000' });
  });
});
```

### revert()
```javascript
// Restore original text
split.revert();
```

### refresh()
```javascript
// After text content changes
split.refresh();
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `$target` | Element | Original text element |
| `html` | String | Original HTML content |
| `lines` | Array | Line elements |
| `words` | Array | Word elements |
| `chars` | Array | Character elements |
| `debug` | Boolean | Debug mode status |
| `includeSpaces` | Boolean | Spaces included |
| `accessible` | Boolean | Accessible clone created |
| `lineTemplate` | String | Line HTML template |
| `wordTemplate` | String | Word HTML template |
| `charTemplate` | String | Char HTML template |

```javascript
const split = splitText('.text', { 
  lines: true, 
  words: true, 
  chars: true 
});

console.log(split.lines);   // Array of line elements
console.log(split.words);   // Array of word elements
console.log(split.chars);   // Array of character elements
```

## Animation Examples

### Character Reveal
```javascript
import { animate, splitText, stagger } from 'animejs';

const split = splitText('.title', { chars: true });

animate(split.chars, {
  opacity: [0, 1],
  y: [20, 0],
  delay: stagger(30),
  duration: 600,
  ease: 'outExpo'
});
```

### Word-by-Word Fade
```javascript
const split = splitText('.paragraph', { words: true });

animate(split.words, {
  opacity: [0, 1],
  filter: ['blur(10px)', 'blur(0px)'],
  delay: stagger(50),
  duration: 800,
  ease: 'outQuad'
});
```

### Line-by-Line Slide
```javascript
const split = splitText('.content', { lines: true });

animate(split.lines, {
  opacity: [0, 1],
  x: [-50, 0],
  delay: stagger(100),
  duration: 700,
  ease: 'outExpo'
});
```

### Typewriter Effect
```javascript
const split = splitText('.typewriter', { chars: true });

// Hide all characters initially
utils.set(split.chars, { opacity: 0 });

animate(split.chars, {
  opacity: 1,
  delay: stagger(50),
  duration: 0,  // Instant appearance
  ease: 'steps(1)'
});
```

### Wave Animation
```javascript
const split = splitText('.wave-text', { chars: true });

animate(split.chars, {
  y: [0, -20, 0],
  delay: stagger(30, { from: 'center' }),
  duration: 600,
  loop: true,
  ease: 'inOutQuad'
});
```

### Scramble Effect
```javascript
const split = splitText('.scramble', { chars: true });
const originalChars = split.chars.map(c => c.textContent);
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';

animate(split.chars, {
  opacity: [0, 1],
  delay: stagger(20),
  duration: 500,
  onBegin: (anim) => {
    // Scramble during animation
    const interval = setInterval(() => {
      split.chars.forEach((char, i) => {
        if (Math.random() > anim.progress) {
          char.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        } else {
          char.textContent = originalChars[i];
        }
      });
    }, 50);
    
    anim.then(() => clearInterval(interval));
  }
});
```

### Scroll-Triggered Text
```javascript
import { animate, splitText, stagger, onScroll } from 'animejs';

const split = splitText('.reveal-text', { words: true });

animate(split.words, {
  opacity: [0, 1],
  y: [30, 0],
  delay: stagger(40),
  duration: 800,
  ease: 'outExpo',
  autoplay: onScroll({
    enter: 'top 80%'
  })
});
```

### Hover Character Effect
```javascript
const split = splitText('.hover-text', { chars: true });

split.chars.forEach(char => {
  char.addEventListener('mouseenter', () => {
    animate(char, {
      scale: 1.3,
      color: '#FF6B6B',
      duration: 200,
      ease: 'outExpo'
    });
  });
  
  char.addEventListener('mouseleave', () => {
    animate(char, {
      scale: 1,
      color: '#000000',
      duration: 400,
      ease: 'outElastic(1, .5)'
    });
  });
});
```

## Complete Example

```javascript
import { animate, createTimeline, splitText, stagger } from 'animejs';

// Split the heading
const headingSplit = splitText('.hero-heading', { 
  chars: true,
  class: 'char'
});

// Split the subheading
const subSplit = splitText('.hero-sub', { 
  words: true 
});

// Create entrance animation
const tl = createTimeline({
  defaults: { ease: 'outExpo' }
});

tl.add(headingSplit.chars, {
  opacity: [0, 1],
  y: [100, 0],
  rotateX: [90, 0],
  delay: stagger(30, { from: 'center' }),
  duration: 800
})
.add(subSplit.words, {
  opacity: [0, 1],
  y: [20, 0],
  delay: stagger(50),
  duration: 600
}, '-=400');

// Cleanup on page leave
window.addEventListener('beforeunload', () => {
  headingSplit.revert();
  subSplit.revert();
});
```
