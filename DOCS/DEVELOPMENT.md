# Guia de Desenvolvimento

## 🛠️ Setup do Ambiente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Editor de código (VS Code recomendado)

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd math-edu-app

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura de Arquivos

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AuroraBackground.jsx/css
│   ├── LoadingScreen.jsx/css
│   ├── NavigationBar.jsx/css
│   ├── GlassCard.jsx/css
│   ├── ScrollReveal.jsx/css
│   └── Footer.jsx/css
│
├── pages/              # Páginas principais
│   ├── Home.jsx/css           # Landing page
│   ├── ComplexNumbers.jsx/css # Números complexos
│   ├── Polynomials.jsx/css    # Polinômios
│   └── AnalyticGeometry.jsx/css # Geometria
│
├── App.jsx/css         # Componente raiz
└── main.jsx           # Entry point
```

## 🎨 Convenções de Código

### Componentes React
```jsx
// Sempre use functional components com hooks
import React, { useState, useEffect } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### CSS
```css
/* Use BEM-like naming */
.component-name {
  /* Estilos base */
}

.component-name__element {
  /* Elemento filho */
}

.component-name--modifier {
  /* Variação */
}

/* Use clamp() para responsividade */
font-size: clamp(1rem, 2vw, 1.5rem);

/* Prefira CSS variables para cores */
color: var(--primary-color, #6366f1);
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev (http://localhost:5173)

# Build
npm run build        # Gera dist/index.html otimizado

# Preview
npm run preview      # Preview do build de produção
```

## 🎯 Adicionando Novo Conteúdo

### 1. Nova Seção em Página Existente

```jsx
// Em qualquer página (ex: ComplexNumbers.jsx)

// Adicione à lista de seções
const sections = [
  // ... seções existentes
  { id: 'new-section', title: 'Nova Seção', icon: 'icon_name' },
];

// Adicione a seção no JSX
<section id="new-section" className="page-section">
  <ScrollReveal>
    <div className="section-header">
      <h1 className="section-title">Nova Seção</h1>
      <p className="section-intro">Introdução...</p>
    </div>
  </ScrollReveal>

  <ScrollReveal delay={100}>
    <GlassCard>
      <h2 className="subsection-title">Conteúdo</h2>
      {/* Seu conteúdo aqui */}
    </GlassCard>
  </ScrollReveal>
</section>
```

### 2. Nova Página

1. Crie o arquivo em `src/pages/`:
```jsx
// src/pages/NewTopic.jsx
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './NewTopic.css';

const NewTopic = () => {
  const sections = [
    { id: 'section1', title: 'Seção 1', icon: 'home' },
  ];

  return (
    <div className="new-topic-page">
      <NavigationBar sections={sections} />
      {/* Conteúdo */}
      <Footer />
    </div>
  );
};

export default NewTopic;
```

2. Adicione a rota em `App.jsx`:
```jsx
import NewTopic from './pages/NewTopic';

// No componente Routes
<Route path="/novo-topico" element={<NewTopic />} />
```

3. Adicione o link em `Home.jsx`:
```jsx
const topics = [
  // ... tópicos existentes
  {
    id: 'new-topic',
    title: 'Novo Tópico',
    icon: 'icon_name',
    description: 'Descrição...',
    path: '/novo-topico',
  },
];
```

## 🎨 Sistema de Design

### Cores
```css
/* Gradientes principais */
--gradient-primary: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #3b82f6 100%);

/* Aurora blobs */
--aurora-indigo: rgba(99, 102, 241, 0.8);
--aurora-purple: rgba(168, 85, 247, 0.8);
--aurora-blue: rgba(59, 130, 246, 0.8);
--aurora-violet: rgba(139, 92, 246, 0.8);

/* Backgrounds */
--bg-dark: #0a0a0a;
--bg-card: rgba(255, 255, 255, 0.05);
```

### Componentes Padrão

#### GlassCard
```jsx
<GlassCard className="custom-class">
  <h2>Título</h2>
  <p>Conteúdo</p>
</GlassCard>
```

#### ScrollReveal
```jsx
<ScrollReveal delay={100}>
  <div>Conteúdo revelado ao rolar</div>
</ScrollReveal>
```

#### Fórmulas Matemáticas
```jsx
// Inline (não implementado no CSS atual, use div)
<div className="formula">
  z = a + bi
</div>

// Com destaque
<div className="formula-small">
  |z| = √(a² + b²)
</div>
```

## 🖼️ Canvas Interativo

Para criar visualizações matemáticas:

```jsx
import { useRef, useEffect } from 'react';

const MyCanvas = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpar
    ctx.clearRect(0, 0, width, height);

    // Desenhar
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // ... desenho
    ctx.stroke();
  }, [data]);

  return (
    <canvas 
      ref={canvasRef} 
      width="600" 
      height="400" 
      className="geometry-canvas"
    />
  );
};
```

## 📱 Responsividade

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  /* Estilos mobile */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  /* Estilos tablet */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Estilos desktop */
}
```

### Tipografia Fluida
```css
/* Use clamp() para escalar suavemente */
font-size: clamp(
  1rem,    /* min: mobile */
  2vw,     /* preferred: baseado na viewport */
  1.5rem   /* max: desktop */
);
```

## 🔍 Debugging

### React DevTools
1. Instale a extensão do navegador
2. Inspecione componentes e estado

### Console Logging
```jsx
useEffect(() => {
  console.log('Estado atual:', state);
}, [state]);
```

### Performance
```jsx
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => {
  console.log(`${id} took ${actualDuration}ms`);
}}>
  <MyComponent />
</Profiler>
```

## 🧪 Testes

### Testar Localmente
```bash
# Desenvolvimento
npm run dev
# Abra http://localhost:5173

# Build + Preview
npm run build && npm run preview
```

### Checklist de Teste
- [ ] Funciona em Chrome
- [ ] Funciona em Firefox  
- [ ] Funciona em Safari
- [ ] Responsivo em mobile (DevTools)
- [ ] Todas as interatividades funcionam
- [ ] Animações suaves
- [ ] Sem erros no console
- [ ] Navegação funcional

## 🐛 Troubleshooting

### Problema: Componente não renderiza
- Verifique imports
- Confira props passadas
- Verifique erros no console

### Problema: Estilos não aplicados
- Confirme que o CSS está importado
- Verifique nomes de classe
- Inspecione com DevTools

### Problema: Build falha
- Limpe node_modules: `rm -rf node_modules && npm install`
- Verifique sintaxe JSX
- Veja mensagens de erro

### Problema: Canvas não desenha
- Verifique se ref está conectado
- Confirme dimensões do canvas
- Verifique se useEffect tem dependências corretas

## 📚 Recursos

### Documentação
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MathJax](https://docs.mathjax.org/)

### Design
- [Material Icons](https://fonts.google.com/icons)
- [Google Fonts](https://fonts.google.com/)
- [Glassmorphism Generator](https://glassmorphism.com/)

## 🤝 Contribuindo

1. Siga as convenções de código
2. Teste suas mudanças
3. Mantenha responsividade
4. Documente funcionalidades novas
5. Otimize performance

---

**Happy coding! 💻**

