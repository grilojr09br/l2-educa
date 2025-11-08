# L2 EDUCA - UI Standardization Guide

**Version:** 2.0  
**Date:** October 28, 2025  
**Status:** Active

## Overview

This guide documents the UI/UX standardization implemented across the L2 EDUCA platform. All components, pages, and interactions follow these standards to ensure consistency, maintainability, and excellent user experience.

---

## 1. Topic Card Standards

### 1.1 Card Structure

All topic cards across all subjects now follow the **Math Subject style**:

```jsx
<Link to={topic.path} className="topic-card-link">
  <GlassCard className="topic-card">
    {/* Icon */}
    <div className="topic-icon-wrapper">
      <span className="material-icons topic-icon">{topic.icon}</span>
    </div>

    {/* Title & Description */}
    <h3 className="topic-title">{topic.title}</h3>
    <p className="topic-description">{topic.description}</p>

    {/* Meta Information */}
    <div className="topic-meta">
      <div className="meta-item">
        <span className="material-icons">signal_cellular_alt</span>
        {topic.difficulty}
      </div>
      <div className="meta-item">
        <span className="material-icons">schedule</span>
        {topic.duration}
      </div>
    </div>

    {/* Arrow Icon (if not coming soon) */}
    {!topic.comingSoon && (
      <div className="topic-enter">
        <span className="material-icons">arrow_forward</span>
      </div>
    )}

    {/* Decorative Corners */}
    <div className="topic-corner-tl"></div>
    <div className="topic-corner-br"></div>
  </GlassCard>
</Link>
```

### 1.2 Key Design Elements

#### Arrow Icon
- **Position:** Absolute, bottom-right corner
- **Size:** 50px × 50px (desktop), 45px × 45px (tablet), 40px × 40px (mobile)
- **Style:** Circular with glassmorphism background
- **Hover:** Transforms to gradient background with glow effect

#### Decorative Corners
- **Position:** Top-left and bottom-right
- **Appearance:** Hidden by default, fade in on hover
- **Color:** Purple gradient (#a855f7)
- **Size:** 25px × 25px

#### Card Hover Effects
- **Transform:** `translateY(-8px)`
- **Glow:** Multi-layer box-shadow with topic-specific color
- **Arrow:** Slides to the right with color change
- **Corners:** Fade in (opacity 0 → 1)

### 1.3 Mobile Responsiveness

**Breakpoints:**
- **Desktop:** Default styles
- **Tablet (≤768px):** Arrow 45px, adjusted padding
- **Mobile (≤480px):** Arrow 40px, reduced spacing

**Key Mobile Fixes:**
- Arrow positioned at `bottom: 1rem; right: 1rem` to prevent text overlap
- Card padding reduced to prevent cramping
- Meta items stack vertically on very small screens

### 1.4 Removed Elements

**No longer used:**
- "Começar" button in footer
- `.start-button` and `.topic-footer` classes
- Footer area in cards

---

## 2. Sticky Topic Navigation

### 2.1 Component Overview

The `StickyTopicNav` component replaces the old `NavigationBar` component across all topic pages.

**Location:** `src/components/StickyTopicNav.jsx`

### 2.2 Features

1. **Sticky Positioning:** Fixed at top of viewport
2. **Smart Show/Hide:** 
   - Appears on scroll up
   - Hides on scroll down (with 300ms delay)
   - Always visible when at page top
3. **Dropdown Menu:** Click to expand/collapse
4. **Active Section Detection:** Highlights current section
5. **Smooth Scrolling:** Animated scroll to sections
6. **Mobile Responsive:** Full-width on mobile, centered on desktop

### 2.3 Usage

```jsx
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';

const YourTopicPage = () => {
  // Define sections
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'home' },
    { id: 'theory', title: 'Teoria', icon: 'lightbulb' },
    { id: 'examples', title: 'Exemplos', icon: 'article' },
    { id: 'exercises', title: 'Exercícios', icon: 'quiz' },
  ];

  // Section detection
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="your-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />
      
      {/* Your sections with matching IDs */}
      <section id="intro">...</section>
      <section id="theory">...</section>
      <section id="examples">...</section>
      <section id="exercises">...</section>
    </div>
  );
};
```

### 2.4 Section ID Conventions

Use consistent section IDs across all pages:

- **Intro/Overview:** `id="intro"`
- **Theory sections:** `id="theory"` or `id="teoria-[topic]"`
- **Examples:** `id="examples"` or `id="exemplos"`
- **Exercises:** `id="exercises"` or `id="exercicios"`
- **Calculators:** `id="calculators"` or `id="calculadoras"`

### 2.5 Visual Design

**Toggle Button:**
- Glassmorphism background with blur
- Gradient border on hover
- Menu icon + label + arrow
- Smooth transitions

**Dropdown Menu:**
- Appears below toggle button
- Glassmorphism container
- Individual items with hover states
- Active item highlighted with gradient + border

**Mobile Design:**
- Full-width sticky bar
- Stacks at `top: 0.5rem`
- Dropdown expands to full width
- Max-height with scroll for many sections

---

## 3. Sidebar Menu Standards

### 3.1 Enhanced Terminal Button

**Design:**
- Larger size (1.1rem padding vs 0.9rem)
- Distinctive gradient background
- Pulsing icon animation
- More prominent hover effects

**Code:**
```jsx
<Link to="/" className="sidebar-nav-button terminal-button-enhanced">
  <div className="terminal-icon-wrapper">
    <span className="material-icons button-icon">terminal</span>
    <div className="terminal-pulse"></div>
  </div>
  <span className="button-label">Terminal</span>
  <div className="button-glow"></div>
</Link>
```

### 3.2 Header Design

**Removed:** Terminal prompt symbol (>)

**Current Structure:**
```jsx
<div className="sidebar-header">
  <h2 className="sidebar-logo">L2 EDUCA</h2>
  <p className="sidebar-subtitle">Centro de Conhecimento</p>
</div>
```

- Clean, focused design
- Larger logo (1.4rem)
- Subtle subtitle

### 3.3 Footer Design

**Compact Single-Line Layout:**

```jsx
<div className="sidebar-footer">
  <div className="footer-compact">
    <h3 className="footer-brand">L2 EDUCA</h3>
    <div className="footer-credits">
      <span className="copyright">© L2</span>
      <span className="divider">•</span>
      <span className="ai-badge">
        <span className="material-icons">psychology</span>
        L2 ATLAS
      </span>
    </div>
  </div>
</div>
```

**Key Features:**
- No version number
- Single-line on desktop
- Stacked on mobile
- AI badge with pulsing icon
- Compact spacing

---

## 4. Color System

### 4.1 Primary Colors

- **Purple:** `#a855f7` (primary accent)
- **Blue:** `#6366f1` (secondary accent)
- **Pink:** `#ec4899` (tertiary accent)

### 4.2 Gradients

**Standard Gradient:**
```css
background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #3b82f6 100%);
```

**Card Glow:**
```css
box-shadow: 
  0 20px 60px var(--topic-glow, rgba(99, 102, 241, 0.3)),
  0 0 80px var(--topic-glow-secondary, rgba(168, 85, 247, 0.2)),
  inset 0 1px 0 rgba(255, 255, 255, 0.15);
```

### 4.3 Glassmorphism

**Standard Effect:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.15);
```

---

## 5. Typography Standards

### 5.1 Font Families

- **Primary:** System font stack (San Francisco, Segoe UI, etc.)
- **Monospace:** 'Courier New', monospace (for code/terminal)

### 5.2 Font Sizes

**Desktop:**
- Heading 1: `clamp(2.5rem, 6vw, 4rem)`
- Heading 2: `clamp(1.75rem, 4vw, 2.5rem)`
- Heading 3: `clamp(1.3rem, 3vw, 1.8rem)`
- Body: `1rem` (16px)
- Small: `0.85rem` - `0.9rem`

**Mobile:**
- Reduced by 10-20% for optimal readability

---

## 6. Animation Standards

### 6.1 Transition Timing

- **Fast:** `0.2s` (hover effects)
- **Standard:** `0.3s` (most transitions)
- **Slow:** `0.4s` (page/card animations)

### 6.2 Easing Functions

- **Standard:** `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce:** `ease-out`
- **Smooth:** `ease-in-out`

### 6.3 Common Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Pulse:**
```css
@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}
```

**Glow:**
```css
@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.3)); }
  50% { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5)); }
}
```

---

## 7. Responsive Breakpoints

### 7.1 Standard Breakpoints

- **Desktop:** `> 1024px` (default)
- **Tablet:** `≤ 1024px`
- **Mobile:** `≤ 768px`
- **Small Mobile:** `≤ 480px`

### 7.2 Layout Adjustments

**Desktop:**
- Multi-column grids
- Hover effects active
- Full navigation visible

**Tablet:**
- 2-column grids
- Reduced padding/spacing
- Touch-friendly sizing

**Mobile:**
- Single-column layout
- Stacked elements
- Larger touch targets (min 44px × 44px)
- Simplified navigation

---

## 8. Accessibility Standards

### 8.1 ARIA Labels

Always include:
```jsx
<button aria-label="Open navigation" aria-expanded={isOpen}>
  <span className="material-icons">menu</span>
</button>
```

### 8.2 Keyboard Navigation

- All interactive elements must be keyboard accessible
- Focus states clearly visible
- Tab order logical
- Skip links for long content

### 8.3 Color Contrast

- Text on background: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear hover/focus states

---

## 9. Performance Best Practices

### 9.1 Code Splitting

- Lazy load pages: `React.lazy()`
- Suspense boundaries with loading states
- Route-based splitting

### 9.2 Asset Optimization

- SVG icons (Material Icons)
- Optimized images (WebP where possible)
- CSS minification in production

### 9.3 Animation Performance

- Use `transform` and `opacity` for animations
- Avoid `width`, `height`, `top`, `left` animations
- Use `will-change` sparingly

---

## 10. File Organization

### 10.1 Component Structure

```
src/
├── components/
│   ├── StickyTopicNav.jsx
│   ├── StickyTopicNav.css
│   ├── GlassCard.jsx
│   ├── ScrollReveal.jsx
│   └── ...
├── hooks/
│   ├── useSectionDetection.js
│   ├── usePageCache.js
│   └── ...
├── pages/
│   ├── ComplexNumbers.jsx
│   ├── ComplexNumbers.css
│   └── ...
└── utils/
    ├── progressTracker.js
    ├── formulaCache.js
    └── ...
```

### 10.2 Naming Conventions

- **Components:** PascalCase (e.g., `StickyTopicNav.jsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useSectionDetection.js`)
- **Utilities:** camelCase (e.g., `progressTracker.js`)
- **CSS Classes:** kebab-case (e.g., `topic-card-link`)

---

## 11. Testing Checklist

When creating or modifying components:

- [ ] Desktop layout correct (>1024px)
- [ ] Tablet layout correct (≤1024px)
- [ ] Mobile layout correct (≤768px)
- [ ] Small mobile correct (≤480px)
- [ ] All hover states working
- [ ] Focus states visible
- [ ] Keyboard navigation functional
- [ ] ARIA labels present
- [ ] Smooth animations (60fps)
- [ ] No console errors
- [ ] Build succeeds
- [ ] Lighthouse score >90

---

## 12. Migration Notes

### 12.1 From Old NavigationBar to StickyTopicNav

**Steps:**
1. Import new components
2. Define sections array
3. Add section detection hook
4. Replace `<NavigationBar />` with `<StickyTopicNav />`
5. Ensure section IDs match

**Before:**
```jsx
import NavigationBar from '../components/NavigationBar';

<NavigationBar sections={sections} />
```

**After:**
```jsx
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';

const sectionIds = sections.map(s => s.id);
const currentSection = useSectionDetection(sectionIds);

<StickyTopicNav sections={sections} currentSection={currentSection} />
```

### 12.2 From "Começar" Button to Arrow Icon

**Steps:**
1. Remove `.topic-footer` and `.start-button` JSX
2. Add `.topic-enter` div with arrow icon
3. Add `.topic-corner-tl` and `.topic-corner-br` divs
4. Update CSS to include arrow and corner styles

---

## 13. Future Improvements

### 13.1 Planned Features

- Dark mode toggle
- Custom theme builder
- More animation presets
- Advanced accessibility features
- Performance monitoring dashboard

### 13.2 Known Issues

- None currently tracked

---

## 14. Support and Resources

### 14.1 Documentation

- **Main README:** `README.md`
- **Development Guide:** `COMPREHENSIVE_DEVELOPMENT_GUIDE.md`
- **Quick Reference:** `guias-importantes/QUICK-REFERENCE.md`

### 14.2 Key Files

- **Topic Card Template:** `src/components/SubjectPageTemplate.jsx`
- **Sticky Navigation:** `src/components/StickyTopicNav.jsx`
- **Section Detection Hook:** `src/hooks/useSectionDetection.js`

---

**Last Updated:** October 28, 2025  
**Maintainer:** L2 Development Team

