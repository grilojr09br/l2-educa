# Glassmorphic Component - Standalone Demo

Beautiful WebGL-powered glassmorphic effects for modern React applications.

![Glassmorphic Component](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react) ![WebGL](https://img.shields.io/badge/WebGL-Powered-990000?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)

## ✨ Features

- 🎨 **Beautiful glass effects** - Real-time blur, distortion, and chromatic aberration
- ⚡ **GPU-accelerated** - Smooth 60fps WebGL rendering
- 🎯 **Simple API** - Easy-to-use React component
- 📱 **Responsive** - Auto-adapts to container size
- 🎭 **Customizable** - 10+ props for fine-tuning
- 🚀 **Production ready** - Optimized and tested

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📦 Project Structure

```
Glassmorphic-Component-Standalone/
├── src/
│   ├── components/
│   │   ├── GlassShader.jsx          # WebGL shader renderer
│   │   ├── GlassmorphicPanel.jsx    # Main component
│   │   └── GlassmorphicPanel.css    # Component styles
│   ├── App.jsx                       # Demo examples
│   ├── App.css                       # Demo styles
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Basic Usage

```jsx
import GlassmorphicPanel from './components/GlassmorphicPanel';

function MyComponent() {
  return (
    <GlassmorphicPanel
      width={300}
      height={120}
      tint="#f8fff0"
      blur={2.5}
      cornerRadius={24}
    >
      <div>
        <h2>Your Content Here</h2>
        <p>Add any JSX content</p>
      </div>
    </GlassmorphicPanel>
  );
}
```

## 🎛️ Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to display inside the glass panel |
| `width` | number | 300 | Width of the glass effect in pixels |
| `height` | number | 120 | Height of the glass effect in pixels |
| `blur` | number | 2.5 | Blur intensity (0-5) |
| `distortion` | number | 2.5 | Glass distortion effect (0-5) |
| `tint` | string | '#f8fff0' | Tint color in hex format |
| `cornerRadius` | number | 24 | Border radius in pixels |
| `backgroundImage` | string | null | URL of background image |
| `showShadow` | boolean | true | Show drop shadow |
| `className` | string | '' | Additional CSS classes |
| `style` | object | {} | Additional inline styles |
| `onClick` | function | null | Click handler |
| `onHover` | function | null | Hover handler |

## 💡 Examples in Demo

The demo (`App.jsx`) includes 8 different examples, each with unique SVG backgrounds to showcase the glass effects:

1. **Basic Panel** - Gradient circles background showing blur and distortion
2. **Custom Tint** - Wave patterns with sky blue tint
3. **Extra Blur** - Geometric shapes with high blur for dreamy effect
4. **Sharp Glass** - Striped pattern with minimal blur for clarity
5. **Interactive Button** - Dotted pattern with clickable hover effect
6. **Wide Card** - Abstract shapes for feature card layout
7. **No Shadow** - Grid pattern with flat style
8. **Custom Background** - Mountain scene with external image

## 🎨 Customization Tips

### Change Background

The demo uses a gradient background. You can change it in `App.css`:

```css
.app {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Or use an image */
  background: url('your-image.jpg') center/cover;
}
```

### Create Your Own Variant

```jsx
// Purple glass button
<GlassmorphicPanel
  width={200}
  height={80}
  tint="#e0e7ff"
  blur={2}
  cornerRadius={40}
  onClick={() => console.log('Clicked!')}
>
  <h3>Custom Button</h3>
</GlassmorphicPanel>
```

### Use Custom Background Image

```jsx
<GlassmorphicPanel
  width={350}
  height={150}
  backgroundImage="https://your-image-url.jpg"
>
  <div style={{ color: 'white' }}>
    <h2>With Custom Background</h2>
  </div>
</GlassmorphicPanel>
```

## ⚡ Performance

- **GPU Accelerated**: Uses WebGL for hardware rendering
- **Optimized**: Cached uniforms and efficient render loop
- **Responsive**: Automatically adapts to container size
- **Best Practice**: Limit to 3-5 panels per page for optimal performance

## 🌐 Browser Support

- ✅ Chrome 56+
- ✅ Firefox 51+
- ✅ Safari 10+
- ✅ Edge 79+
- ⚠️ IE 11 (requires WebGL polyfill)

**WebGL Required**: This component requires WebGL support. Check compatibility:
```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (!gl) {
  console.error('WebGL not supported');
}
```

## 🔧 Development

### Run in Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Code Architecture

### GlassShader.jsx
- WebGL rendering engine
- GLSL fragment shaders for glass effects
- Handles textures, uniforms, and animation loop
- Optimized with cached uniform locations

### GlassmorphicPanel.jsx
- High-level wrapper component
- Manages glass positioning and sizing
- Converts hex colors to RGB
- Provides simple prop-based API

## 🎓 Learn More

### Key Technologies
- **React 18** - Component framework
- **WebGL** - Hardware-accelerated graphics
- **GLSL** - Shader programming language
- **Vite** - Fast build tool

### Shader Features
- Signed Distance Functions (SDF) for shapes
- Gaussian blur with noise sampling
- Chromatic aberration simulation
- Real-time refraction effects
- Soft shadow rendering

## 🤝 Credits

This component is based on the **Glass Material Editor** created by [Daniela Muntyan](https://danielamuntyan.com/) for [Figma Make](https://www.figma.com/make/).

Original design: https://www.figma.com/design/VsEQXAvvklWz4NNWvslLOp/Glass-Material-Editor

## 📄 License

This is a demonstration project. Feel free to use and modify for your own projects.

## 🐛 Troubleshooting

### Component not rendering?
- Check if WebGL is supported in your browser
- Open browser console for error messages
- Ensure container has sufficient height (min 300px recommended)

### Performance issues?
- Reduce `blur` and `distortion` values
- Limit number of panels on the page (3-5 recommended)
- Use smaller background images

### Content not visible?
- Check that container has minimum height set
- Verify text color contrasts with glass tint
- Ensure content is wrapped in a div element

---

**Made with ❤️ using React + WebGL**

For questions or improvements, feel free to modify and extend this component!

