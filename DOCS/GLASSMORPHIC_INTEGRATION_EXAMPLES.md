# Glassmorphic Panel - Integration Examples for L2 Educa

## 🎯 Real Integration Examples for Your Existing Pages

Here are practical examples showing how to integrate the glassmorphic panels into your existing L2 Educa pages.

## 1. Homepage Hero Section

**File**: `src/pages/Home/Home.jsx`

Add a stunning hero section:

```jsx
import GlassmorphicPanel from '../../components/GlassmorphicPanel';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section with Glass Effect */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 20px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <GlassmorphicPanel
          width={500}
          height={200}
          blur={3}
          tint="#ffffff"
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', margin: 0, color: '#1f2937' }}>L2 Educa</h1>
            <p style={{ fontSize: '20px', marginTop: '16px', color: '#4b5563' }}>
              Prepare-se para o vestibular com conteúdo de qualidade
            </p>
          </div>
        </GlassmorphicPanel>
      </section>

      {/* Rest of your existing home page */}
      {/* ... */}
    </div>
  );
}
```

## 2. Subject Selection Cards

**File**: `src/pages/SubjectSelector/SubjectSelector.jsx` or `Home.jsx`

Replace or enhance your subject cards:

```jsx
import GlassmorphicPanel from '../../components/GlassmorphicPanel';
import { useNavigate } from 'react-router-dom';

function SubjectSelector() {
  const navigate = useNavigate();

  const subjects = [
    { name: 'Física', icon: '⚛️', path: '/fisica', color: '#e0f2fe' },
    { name: 'Química', icon: '🧪', path: '/quimica', color: '#dcfce7' },
    { name: 'Matemática', icon: '📐', path: '/matematica', color: '#fae8ff' },
    { name: 'Biologia', icon: '🌱', path: '/biologia', color: '#d1fae5' },
    { name: 'História', icon: '📜', path: '/historia', color: '#fee2e2' },
    { name: 'Literatura', icon: '📚', path: '/literatura', color: '#fef3c7' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '36px', marginBottom: '40px' }}>
        Escolha sua Matéria
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {subjects.map((subject) => (
          <GlassmorphicPanel
            key={subject.name}
            width={280}
            height={140}
            tint={subject.color}
            onClick={() => navigate(subject.path)}
            className="subject-card"
            style={{ cursor: 'pointer' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                {subject.icon}
              </div>
              <h3 style={{ margin: 0, fontSize: '24px', color: '#1f2937' }}>
                {subject.name}
              </h3>
            </div>
          </GlassmorphicPanel>
        ))}
      </div>
    </div>
  );
}
```

## 3. Subject Page Header

**File**: `src/pages/SubjectPage/SubjectPage.jsx`

Add a glass header to any subject page:

```jsx
import GlassmorphicPanel from '../../components/GlassmorphicPanel';

function SubjectPage({ subject, icon, description }) {
  return (
    <div className="subject-page">
      {/* Glass Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        marginBottom: '40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <GlassmorphicPanel
            width={400}
            height={150}
            tint="#e0f2fe"
            blur={2.5}
          >
            <div>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>{icon}</div>
              <h1 style={{ margin: 0, fontSize: '36px', color: '#1f2937' }}>
                {subject}
              </h1>
              <p style={{ margin: '8px 0 0', color: '#4b5563' }}>
                {description}
              </p>
            </div>
          </GlassmorphicPanel>
        </div>
      </div>

      {/* Rest of your subject page content */}
      {/* ... existing topics, cards, etc. */}
    </div>
  );
}
```

## 4. Topic Cards with Glass Effect

**File**: `src/pages/TopicPage/TopicPage.jsx`

Enhance topic navigation:

```jsx
import GlassmorphicPanel from '../../components/GlassmorphicPanel';

function TopicPage() {
  const topics = [
    { id: 1, title: 'Cinemática', description: 'Movimento e velocidade' },
    { id: 2, title: 'Dinâmica', description: 'Forças e leis de Newton' },
    { id: 3, title: 'Energia', description: 'Trabalho e conservação' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #f3f4f6, #ffffff)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      {/* Add a subtle gradient background for contrast */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        opacity: 0.05,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2>Tópicos de Física</h2>
        
        <div style={{
          display: 'grid',
          gap: '24px',
          marginTop: '24px'
        }}>
          {topics.map((topic) => (
            <GlassmorphicPanel
              key={topic.id}
              width={350}
              height={100}
              tint="#e0f2fe"
              blur={2}
              showShadow={true}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#1f2937' }}>
                  {topic.title}
                </h3>
                <p style={{ margin: '8px 0 0', color: '#6b7280' }}>
                  {topic.description}
                </p>
              </div>
            </GlassmorphicPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 5. Announcement Banner

**File**: Any page where you want announcements

Add dynamic announcements:

```jsx
import GlassmorphicPanel from '../components/GlassmorphicPanel';

function AnnouncementBanner() {
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <GlassmorphicPanel
          width={450}
          height={100}
          tint="#fef3c7"
          blur={2}
          cornerRadius={16}
        >
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '18px', color: '#92400e' }}>
              📢 Novo Conteúdo Disponível!
            </h4>
            <p style={{ margin: '8px 0 0', color: '#78350f' }}>
              Química Orgânica completa já está no ar
            </p>
          </div>
        </GlassmorphicPanel>
      </div>
    </div>
  );
}
```

## 6. Feature Highlights Section

**File**: `src/pages/Home/Home.jsx` or About page

Showcase platform features:

```jsx
import GlassmorphicPanel from '../../components/GlassmorphicPanel';

function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Smart Loading',
      description: 'Carregamento otimizado',
      color: '#fef3c7'
    },
    {
      icon: '📱',
      title: 'Responsivo',
      description: 'Funciona em qualquer dispositivo',
      color: '#e0f2fe'
    },
    {
      icon: '🎯',
      title: 'Focado',
      description: 'Conteúdo direcionado',
      color: '#dcfce7'
    },
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '36px', marginBottom: '40px' }}>
        Por que escolher L2 Educa?
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {features.map((feature) => (
          <GlassmorphicPanel
            key={feature.title}
            width={250}
            height={140}
            tint={feature.color}
            blur={2.5}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                {feature.icon}
              </div>
              <h3 style={{ margin: 0, fontSize: '20px', color: '#1f2937' }}>
                {feature.title}
              </h3>
              <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#6b7280' }}>
                {feature.description}
              </p>
            </div>
          </GlassmorphicPanel>
        ))}
      </div>
    </section>
  );
}
```

## 7. Call-to-Action Button

**File**: Any page with CTAs

Create attractive CTAs:

```jsx
import GlassmorphicPanel from '../components/GlassmorphicPanel';
import { useNavigate } from 'react-router-dom';

function CTAButton() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <GlassmorphicPanel
        width={240}
        height={90}
        tint="#fef3c7"
        cornerRadius={45}
        blur={2}
        onClick={() => navigate('/signup')}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '24px', color: '#92400e' }}>
            Começar Agora →
          </h3>
        </div>
      </GlassmorphicPanel>
    </div>
  );
}
```

## 8. Admin Panel Quick Actions

**File**: `src/pages/Admin/AdminPanel.jsx`

Add glass cards to admin:

```jsx
import GlassmorphicPanel from '../../components/GlassmorphicPanel';

function AdminPanel() {
  const actions = [
    { title: 'Adicionar Conteúdo', icon: '➕', color: '#dcfce7' },
    { title: 'Ver Estatísticas', icon: '📊', color: '#e0f2fe' },
    { title: 'Gerenciar Usuários', icon: '👥', color: '#fae8ff' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <h1 style={{ color: 'white', marginBottom: '40px' }}>Painel Admin</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        {actions.map((action) => (
          <GlassmorphicPanel
            key={action.title}
            width={220}
            height={120}
            tint={action.color}
            blur={2}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>
                {action.icon}
              </div>
              <h4 style={{ margin: 0, color: '#1f2937' }}>
                {action.title}
              </h4>
            </div>
          </GlassmorphicPanel>
        ))}
      </div>
    </div>
  );
}
```

## 🎨 CSS Tips for Integration

Add these utility classes to your global CSS:

```css
/* Gradient backgrounds for glass panels */
.gradient-bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-bg-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.gradient-bg-soft {
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
}

/* Glass panel hover effects */
.glass-interactive {
  transition: transform 0.3s ease;
}

.glass-interactive:hover {
  transform: translateY(-4px);
}

/* Responsive grid for glass cards */
.glass-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 40px 20px;
}
```

## 📱 Responsive Considerations

Make panels responsive:

```jsx
import { useState, useEffect } from 'react';
import GlassmorphicPanel from '../components/GlassmorphicPanel';

function ResponsiveGlassPanel() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <GlassmorphicPanel
      width={isMobile ? 280 : 400}
      height={isMobile ? 120 : 160}
      blur={isMobile ? 2 : 3}
    >
      <div>Responsive Content</div>
    </GlassmorphicPanel>
  );
}
```

## ⚠️ Important Notes

1. **Background Required**: Glass effect needs a background to look good. Always use a gradient or image behind it.

2. **Container Height**: Set minimum height on containers (300px+) for best visual results.

3. **Performance**: Limit to 3-5 glass panels per viewport for optimal performance.

4. **Content Styling**: Style your content normally - the glass is just the background effect.

5. **Color Contrast**: Ensure text has good contrast against the glass tint color.

## 🚀 Quick Integration Checklist

- [ ] Import `GlassmorphicPanel` component
- [ ] Add gradient or image background to parent container
- [ ] Set appropriate `width` and `height` for your use case
- [ ] Choose `tint` color that matches your content theme
- [ ] Adjust `blur` and `distortion` for desired effect
- [ ] Add your content as children
- [ ] Test on mobile devices
- [ ] Verify performance with multiple panels

---

**Pro Tips:**
- Start with the defaults, then tweak one prop at a time
- Use the example page (`/glass-demo`) to preview different configurations
- Keep blur values between 2-4 for best performance
- Match tint colors to your subject themes for visual consistency

Happy integrating! 🎉

