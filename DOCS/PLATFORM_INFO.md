# L2 EDUCA Platform

**Version:** 2.0.0  
**Type:** Multi-Subject Educational Hub

---

## 🏗️ Architecture

This is a **unified educational platform** containing multiple subjects under one app.

```
L2 EDUCA Platform (single app)
├── Terminal Homepage (/)
│   └── Subject folders (Math, Physics, Chemistry, etc.)
│
├── Math Subject (/math)
│   ├── Números Complexos
│   ├── Divisão de Polinômios
│   └── Geometria Analítica
│
└── Future Subjects
    ├── Physics (coming soon)
    ├── Chemistry (coming soon)
    └── ...more
```

---

## 📁 Folder Structure

```
l2-educa/
├── src/
│   ├── pages/
│   │   ├── Terminal.jsx          # Main hub/homepage
│   │   ├── MathSubject.jsx       # Math folder page
│   │   ├── ComplexNumbers.jsx    # Math topic
│   │   ├── Polynomials.jsx       # Math topic
│   │   ├── AnalyticGeometry.jsx  # Math topic
│   │   └── (future subjects...)
│   │
│   └── components/
│       ├── AuroraBackground.jsx  # Shared background
│       ├── GlassCard.jsx         # Shared glass effect
│       ├── Sidebar.jsx           # Navigation menu
│       └── ...
```

---

## 🎨 Recent Fixes (v2.0.0)

### Layout Fixes
- ✅ Fixed grid overflow issues
- ✅ Contained bright lines/borders within cards
- ✅ Fixed infinite animation loops
- ✅ Proper overflow handling on all containers
- ✅ Mobile responsive grid (1 column on mobile)
- ✅ Tablet responsive grid (auto-fit columns)

### Improvements
- ✅ Renamed from "math-edu-app" to "L2 EDUCA"
- ✅ Better mobile responsiveness
- ✅ Smoother animations (no rotation glitches)
- ✅ Proper z-index stacking
- ✅ Icon glow effects contained
- ✅ Corner decorations properly positioned

---

## 🚀 Navigation Structure

```
Terminal (/)
    ↓
Matemática (/math)
    ↓
Topics (/math/numeros-complexos, etc.)
```

**Sidebar Navigation:**
- 🖥️ **Terminal** → Returns to main hub
- 📊 **Matemática** → Returns to Math subject (only visible in math section)
- 📑 **Topic Links** → Direct access to lessons

---

## 🎯 Design Philosophy

- **Single App** = All subjects in one unified platform
- **Shared Components** = Consistent design across all subjects
- **Modular Structure** = Easy to add new subjects
- **Seamless Navigation** = React Router for instant transitions
- **Responsive First** = Mobile, tablet, and desktop optimized

---

## 📱 Responsive Breakpoints

- **Desktop:** 1024px+ (multi-column grid)
- **Tablet:** 768px-1023px (2 columns)
- **Mobile:** < 768px (1 column, optimized sizing)

---

## 🔮 Future Expansion

To add a new subject:
1. Create subject folder page (e.g., `PhysicsSubject.jsx`)
2. Add subject routes in `App.jsx`
3. Create topic pages inside `/pages/physics/`
4. Update Terminal page with new subject card
5. Update Sidebar menu items

---

**Design by L2** | Educational Platform v2.0

