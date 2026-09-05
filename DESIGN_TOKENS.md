# Design Tokens - B4One Class Premium Redesign

## Color Palette

### Primary Gradient
```
Indigo    → Purple    → Pink
#6366f1    #8b5cf6    #a855f7
```

### Secondary Colors
- **Emerald**: #10b981 (success states)
- **Amber**: #f59e0b (warning states)
- **Blue**: #0ea5e9 (info states)
- **Rose**: #f43f5e (alert states)
- **Red**: #ef4444 (danger states)

### Neutral Colors
- **Slate-900**: #0f172a (dark backgrounds)
- **Slate-800**: #1e293b (dark sidebar)
- **Slate-50**: #f8fafc (light backgrounds)
- **Gray-900**: #111827 (text)
- **Gray-600**: #4b5563 (secondary text)
- **Gray-200**: #e5e7eb (borders)

## Typography

### Font Family
- Primary: 'Inter'
- Fallback: 'Segoe UI', system-ui, -apple-system, sans-serif

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extra Bold: 800

### Size Scale
```
xs:    0.75rem (12px)
sm:    0.875rem (14px)
base:  1rem (16px)
lg:    1.125rem (18px)
xl:    1.25rem (20px)
2xl:   1.5rem (24px)
3xl:   1.875rem (30px)
4xl:   2.25rem (36px)
5xl:   3rem (48px)
```

## Spacing

### Scale (using Tailwind units)
```
0:    0px
0.5:  2px
1:    4px
1.5:  6px
2:    8px
2.5:  10px
3:    12px
3.5:  14px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
```

## Border Radius

### Standard Values
- `rounded-lg`: 0.5rem (8px)
- `rounded-xl`: 0.75rem (12px)
- `rounded-2xl`: 1rem (16px)
- `rounded-full`: 9999px

## Shadows

### Shadow Levels
```
sm:     0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:     0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:     0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:     0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl:    0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Color-Matched Shadows
```
shadow-indigo-500/30:    Indigo glow effect
shadow-red-200/30:       Red glow effect
shadow-emerald-500/10:   Green glow effect
shadow-black/10:         Soft dark shadow
```

## Animation Durations

### Standard Durations
```
75ms:   Ultra-fast hover feedback
100ms:  Component transitions
150ms:  Page transitions
200ms:  Modal animations
300ms:  Drawer/sidebar animations
500ms:  Page entrance animations
```

### Timing Functions
```
linear:         Constant speed
ease-in:        Slow start, fast end
ease-out:       Fast start, slow end (DEFAULT)
ease-in-out:    Slow start and end
cubic-bezier:   Custom curves for special effects
```

## Breakpoints

### Responsive Design
```
xs:    0px
sm:    640px
md:    768px
lg:    1024px
xl:    1280px
2xl:   1536px
```

## Component Sizes

### Button Sizes
```
sm:  px-3 py-1.5 text-sm
md:  px-4 py-2 text-sm
lg:  px-6 py-3 text-base
```

### Input Sizes
```
padding:  px-4 py-2.5
font:     sm text-sm
border:   border-2
radius:   rounded-lg
```

### Icon Sizes
```
sm:    h-4 w-4
md:    h-6 w-6
lg:    h-8 w-8
xl:    h-12 w-12
2xl:   h-16 w-16
```

## Gradients

### Button Gradients
```
primary:  from-indigo-600 to-purple-600
danger:   from-red-600 to-red-700
success:  from-emerald-600 to-green-600
```

### Background Gradients
```
card header:      from-indigo-600 to-purple-600
sidebar:          from-slate-900 via-slate-800 to-slate-900
login page:       from-slate-900 via-slate-50 to-blue-50
```

### Text Gradients
```
main:   from-indigo-600 to-purple-600
alt:    from-pink-500 to-rose-500
```

## Transitions

### Smooth Transitions
```
default:     transition-all duration-300 ease-out
fast:        transition-all duration-200 ease-out
slow:        transition-all duration-500 ease-out
transform:   transition-transform duration-300 ease-out
colors:      transition-colors duration-300 ease-out
```

## Glass Morphism

### Standard Glass Effects
```
.glass:       rgba(255, 255, 255, 0.85) with blur(16px)
.glass-dark:  rgba(15, 23, 42, 0.8) with blur(16px)
```

## Animations

### Predefined Animations
```
fade-in:      Opacity and upward movement (500ms)
slide-in:     Left to right fade (400ms)
slide-in-right: Right to left fade (400ms)
float:        Continuous gentle up/down (3s)
blob:         Organic morphing (7s)
glow:         Pulsing shadow (2s)
shimmer:      Loading effect (1.5s)
```

## Accessibility

### Focus States
```
focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
```

### Contrast Ratios
- Normal text: 4.5:1
- Large text: 3:1
- Decorative: No requirement

### Color-Blind Safe
- Avoid color-only differentiation
- Use patterns and text labels
- Test with color-blind simulator

## Component Patterns

### Card Pattern
```css
rounded-2xl
border border-gray-200
bg-white
shadow-lg hover:shadow-xl
transition-all duration-300
```

### Button Pattern
```css
rounded-lg
font-semibold
transition-all duration-300
focus:outline-none focus:ring-2 focus:ring-offset-2
disabled:opacity-50 disabled:pointer-events-none
```

### Input Pattern
```css
rounded-lg
border-2
transition-all duration-300
focus:outline-none focus:ring-2 focus:ring-offset-1
```

## Premium Features

### Glass Effect on Cards
```
background: rgba(255, 255, 255, 0.85)
backdrop-filter: blur(16px)
border: 1px solid rgba(255, 255, 255, 0.5)
```

### Gradient Overlays
```
background: linear-gradient(135deg, color1 0%, color2 100%)
opacity: 0.1-0.3 for subtle effects
```

### Shadow Stacking
```
box-shadow: 
  0 0 20px rgba(99, 102, 241, 0.3),
  0 10px 25px -5px rgba(0, 0, 0, 0.1)
```

## Usage Examples

### Premium Card
```html
<div class="premium-card-light hover:shadow-2xl transition-all">
  <div class="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">
    <!-- Gradient header -->
  </div>
  <!-- Content -->
</div>
```

### Premium Button
```html
<button class="gradient-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
  Click Me
</button>
```

### Animated Background
```html
<div class="absolute inset-0 -z-10">
  <div class="float-element-1 animate-blob"></div>
  <div class="float-element-2 animate-blob animation-delay-2000"></div>
</div>
```

## Dark Mode Considerations

Current design uses light mode primarily. For future dark mode:
- Reverse color usage
- Use `glass-dark` on dark backgrounds
- Adjust opacity values
- Keep gradients but use darker colors
- Ensure contrast ratios

## Performance Optimizations

- GPU-accelerated transforms
- will-change properties used sparingly
- Animations use CSS (not JS)
- Minimal repaints/reflows
- Optimized SVG sizes
