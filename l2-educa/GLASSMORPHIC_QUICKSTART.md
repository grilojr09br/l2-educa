# Glassmorphic Panel - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: View the Examples

To see the component in action, add this route to your app:

**Option A: Add to your existing router** (`src/App.jsx`):

```jsx
import GlassmorphicPanelExample from './components/GlassmorphicPanelExample';

// Add this route:
<Route path="/glass-demo" element={<GlassmorphicPanelExample />} />
```

Then visit: `http://localhost:5173/glass-demo`

**Option B: Create a test page** - Replace your main App temporarily:

```jsx
// src/App.jsx
import GlassmorphicPanelExample from './components/GlassmorphicPanelExample';

function App() {
  return <GlassmorphicPanelExample />;
}

export default App;
```

### Step 2: Use in Your Pages

Import and use anywhere in your app:

```jsx
import GlassmorphicPanel from './components/GlassmorphicPanel';

function MyPage() {
  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <GlassmorphicPanel
        width={350}
        height={140}
        tint="#e0f2fe"
      >
        <div>
          <h2>Welcome to Physics</h2>
          <p>Start your learning journey</p>
        </div>
      </GlassmorphicPanel>
    </div>
  );
}
```

### Step 3: Customize

Play with the props to create your perfect look:

```jsx
<GlassmorphicPanel
  width={300}           // Size of glass effect
  height={120}
  blur={3}              // Higher = more blur (0-5)
  distortion={2.5}      // Glass distortion (0-5)
  tint="#fae8ff"        // Color tint (hex)
  cornerRadius={24}     // Border radius (px)
  showShadow={true}     // Enable/disable shadow
  onClick={() => {}}    // Make it interactive
  backgroundImage="url" // Custom background
/>
```

## 📋 Common Patterns

### Subject Card
```jsx
<GlassmorphicPanel width={280} height={120} tint="#e0f2fe">
  <div>
    <h3>⚛️ Física</h3>
    <p>Mecânica, Eletromagnetismo, Ondas</p>
  </div>
</GlassmorphicPanel>
```

### Call-to-Action Button
```jsx
<GlassmorphicPanel 
  width={200} 
  height={80} 
  tint="#fef3c7" 
  cornerRadius={40}
  onClick={() => navigate('/signup')}
>
  <h3>Começar Agora</h3>
</GlassmorphicPanel>
```

### Hero Section
```jsx
<GlassmorphicPanel 
  width={500} 
  height={200} 
  blur={3.5}
  backgroundImage="/images/hero-bg.jpg"
>
  <div>
    <h1>L2 Educa</h1>
    <p>Prepare-se para o vestibular</p>
  </div>
</GlassmorphicPanel>
```

## 🎨 Recommended Color Combinations

For your educational platform:

- **Física (Physics)**: `#e0f2fe` (sky blue)
- **Química (Chemistry)**: `#dcfce7` (mint green)
- **Matemática (Math)**: `#fae8ff` (soft purple)
- **Biologia (Biology)**: `#d1fae5` (emerald)
- **Literatura (Literature)**: `#fef3c7` (warm yellow)
- **História (History)**: `#fee2e2` (soft red)

## ⚠️ Important Notes

1. **Container needs background** - The glass effect needs something behind it to look good. Use a gradient or image.

2. **Minimum height** - Set at least 300px height on the container for best results.

3. **Performance** - Limit to 3-5 panels per page for optimal performance.

4. **Content styling** - Style your content normally with CSS. The glass is just the background effect.

## 🔗 More Help

- Full documentation: `GLASSMORPHIC_COMPONENT_GUIDE.md`
- Examples: `src/components/GlassmorphicPanelExample.jsx`
- Source code: `src/components/GlassmorphicPanel.jsx`

---

**Pro tip**: Start with the defaults, then adjust one prop at a time to see how it affects the look!

