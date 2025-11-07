# Glassmorphic Panel Component Guide

## 🌟 Overview

The **GlassmorphicPanel** component brings beautiful, modern glass effects to your React application using WebGL-powered shaders. Based on the award-winning Glass Material Editor by Daniela Muntyan, this component makes it easy to add stunning glassmorphic UI elements to your educational platform.

## ✨ Features

- **Real-time WebGL rendering** - Smooth, hardware-accelerated glass effects
- **Highly customizable** - Control blur, distortion, colors, shadows, and more
- **Easy to use** - Simple React component API
- **Performance optimized** - Cached uniforms and efficient rendering
- **Responsive** - Automatically adapts to container size
- **Background support** - Works with custom images or gradients
- **Chromatic aberration** - Realistic light refraction effects

## 📦 Installation

The component is already installed in your `l2-educa/src/components/` directory:

```
src/components/
├── GlassShader.jsx              # WebGL shader renderer
├── GlassmorphicPanel.jsx        # Main component
├── GlassmorphicPanel.css        # Styles
├── GlassmorphicPanelExample.jsx # Usage examples
└── GlassmorphicPanelExample.css # Example styles
```

## 🚀 Quick Start

### Basic Usage

```jsx
import GlassmorphicPanel from './components/GlassmorphicPanel';

function MyComponent() {
  return (
    <GlassmorphicPanel
      width={300}
      height={120}
    >
      <div>
        <h2>Hello World</h2>
        <p>Beautiful glass effect!</p>
      </div>
    </GlassmorphicPanel>
  );
}
```

## 🎨 Props API

### GlassmorphicPanel Props

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

## 💡 Examples

### 1. Feature Card

```jsx
<GlassmorphicPanel
  width={350}
  height={120}
  tint="#fae8ff"
  showShadow={true}
>
  <div>
    <h2>Feature Highlight</h2>
    <p>Perfect for showcasing important features</p>
  </div>
</GlassmorphicPanel>
```

### 2. Interactive Button

```jsx
<GlassmorphicPanel
  width={200}
  height={80}
  tint="#fef3c7"
  cornerRadius={40}
  onClick={() => console.log('Clicked!')}
>
  <div>
    <h2>Click Me</h2>
  </div>
</GlassmorphicPanel>
```

### 3. High Blur Effect

```jsx
<GlassmorphicPanel
  width={250}
  height={100}
  blur={4.5}
  distortion={3.5}
>
  <div>
    <h2>Dreamy Glass</h2>
    <p>Extra blurry effect</p>
  </div>
</GlassmorphicPanel>
```

### 4. Sharp Crystal

```jsx
<GlassmorphicPanel
  width={250}
  height={100}
  blur={1}
  distortion={1}
  cornerRadius={8}
>
  <div>
    <h2>Crystal Clear</h2>
    <p>Minimal blur</p>
  </div>
</GlassmorphicPanel>
```

### 5. Custom Background

```jsx
<GlassmorphicPanel
  width={300}
  height={150}
  backgroundImage="https://example.com/image.jpg"
>
  <div style={{ color: 'white' }}>
    <h2>Custom Image</h2>
  </div>
</GlassmorphicPanel>
```

### 6. No Shadow Variant

```jsx
<GlassmorphicPanel
  width={250}
  height={100}
  showShadow={false}
  tint="#dcfce7"
>
  <div>
    <h2>Flat Style</h2>
    <p>No shadow</p>
  </div>
</GlassmorphicPanel>
```

## 🎯 Use Cases in Educational Platform

### 1. Subject Cards

```jsx
<GlassmorphicPanel
  width={300}
  height={120}
  tint="#e0f2fe"
  onClick={() => navigate('/physics')}
>
  <div>
    <h2>⚛️ Física</h2>
    <p>Explore physics topics</p>
  </div>
</GlassmorphicPanel>
```

### 2. Important Announcements

```jsx
<GlassmorphicPanel
  width={400}
  height={150}
  tint="#fef3c7"
  blur={3}
>
  <div>
    <h3>📢 Announcement</h3>
    <p>New content available for Chemistry!</p>
  </div>
</GlassmorphicPanel>
```

### 3. Hero Section

```jsx
<GlassmorphicPanel
  width={500}
  height={200}
  tint="#fae8ff"
  blur={3.5}
  backgroundImage="/hero-bg.jpg"
>
  <div>
    <h1>Welcome to L2 Educa</h1>
    <p>Your path to academic success</p>
  </div>
</GlassmorphicPanel>
```

### 4. Feature Highlights

```jsx
<GlassmorphicPanel
  width={280}
  height={140}
  tint="#dcfce7"
  cornerRadius={20}
>
  <div>
    <h3>✨ Smart Loading</h3>
    <p>Optimized performance for better learning</p>
  </div>
</GlassmorphicPanel>
```

## 🎨 Color Palette Suggestions

### Soft & Professional
- `#f8fff0` - Soft green tint (default)
- `#e0f2fe` - Sky blue
- `#fef3c7` - Warm yellow
- `#fae8ff` - Soft purple
- `#dcfce7` - Mint green

### Vibrant
- `#bfdbfe` - Bright blue
- `#fde68a` - Golden yellow
- `#fbcfe8` - Pink
- `#a7f3d0` - Emerald

### Education-themed
- `#dbeafe` - Study blue
- `#fee2e2` - Soft red (for important notes)
- `#d1fae5` - Success green
- `#e0e7ff` - Calm indigo

## ⚡ Performance Tips

1. **Reuse instances** - Create panels once, don't recreate on every render
2. **Optimize images** - Use compressed images for backgrounds
3. **Limit simultaneous panels** - Too many WebGL contexts can impact performance
4. **Use appropriate blur** - Higher blur values are more GPU-intensive

## 🔧 Customization

### Custom Container Styles

```jsx
<GlassmorphicPanel
  width={300}
  height={120}
  className="my-custom-panel"
  style={{
    margin: '20px auto',
    maxWidth: '100%'
  }}
>
  <div>Content</div>
</GlassmorphicPanel>
```

### Responsive Design

```jsx
function ResponsivePanel() {
  const isMobile = window.innerWidth < 768;
  
  return (
    <GlassmorphicPanel
      width={isMobile ? 250 : 400}
      height={isMobile ? 100 : 150}
    >
      <div>Responsive Content</div>
    </GlassmorphicPanel>
  );
}
```

## 🐛 Troubleshooting

### WebGL Not Supported
The component requires WebGL support. Check browser compatibility:
```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (!gl) {
  console.error('WebGL not supported');
}
```

### Content Not Visible
Ensure your container has sufficient height:
```css
.glassmorphic-panel {
  min-height: 300px;
}
```

### Performance Issues
- Reduce `blur` and `distortion` values
- Limit the number of panels on the page
- Use smaller background images

## 📝 Browser Support

- ✅ Chrome 56+
- ✅ Firefox 51+
- ✅ Safari 10+
- ✅ Edge 79+
- ⚠️ IE 11 (requires WebGL polyfill)

## 🎓 Advanced: Custom Shader Uniforms

For advanced users, you can pass custom uniforms directly to the GlassShader component:

```jsx
<GlassShader
  backgroundImage="/bg.jpg"
  uniforms={{
    width: 300,
    height: 120,
    mouseX: 150,
    mouseY: 60,
    tintR: 0.98,
    tintG: 1.0,
    tintB: 0.95,
    saturation: 1.0,
    distortion: 2.5,
    blur: 2.5,
    cornerRadius: 24,
    chromaticAberration: 1.0,
    shadowIntensity: 0.2,
    shadowOffsetX: 0,
    shadowOffsetY: 8,
    shadowBlur: 20
  }}
/>
```

## 📚 Credits

This component is based on the **Glass Material Editor** created by [Daniela Muntyan](https://danielamuntyan.com/) for [Figma Make](https://www.figma.com/make/).

Original design: https://www.figma.com/design/VsEQXAvvklWz4NNWvslLOp/Glass-Material-Editor

## 🤝 Contributing

Feel free to extend and customize this component for your educational platform. Some ideas:
- Add animation presets
- Create theme variants
- Add accessibility features
- Build a visual editor interface

---

**Happy coding! 🚀** Make your educational platform stand out with beautiful glass effects!

