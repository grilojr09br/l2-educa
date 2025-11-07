# Quick Start Guide

## 🚀 Get It Running in 2 Minutes

### Step 1: Navigate to the project folder

```bash
cd "Creation/UI/Glassmorphic-Component-Standalone"
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Run the dev server

```bash
npm run dev
```

✨ That's it! The demo will open automatically at `http://localhost:3000`

## 📖 What You'll See

- 8 different glassmorphic panel examples
- Various configurations (blur, colors, shadows, shapes)
- Interactive button example
- Code usage examples

## 🎨 Start Customizing

### Modify the examples

Edit `src/App.jsx` to change the examples or add your own.

### Create your own component

```jsx
import GlassmorphicPanel from './components/GlassmorphicPanel';

<GlassmorphicPanel width={300} height={120} tint="#e0f2fe">
  <div>
    <h2>My Custom Glass</h2>
  </div>
</GlassmorphicPanel>
```

### Change the background

Edit `src/App.css` and modify the `.app` background gradient.

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 💡 Tips

1. **Needs a background** - Glass effect requires something behind it (gradient or image)
2. **Min height** - Set minimum 300px height on containers for best results
3. **Performance** - Limit to 3-5 panels per page
4. **WebGL required** - Works on all modern browsers

## 🎯 Next Steps

1. Explore the 8 examples in the demo
2. Try modifying the props (blur, tint, width, height)
3. Change the background gradient or add images
4. Create your own custom glass panels
5. Integrate into your own project

---

**Need help?** Check the full `README.md` for detailed documentation!

