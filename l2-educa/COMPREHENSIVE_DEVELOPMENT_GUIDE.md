# 📚 Guia Completo de Desenvolvimento L2 EDUCA
## Padrão Profissional para Criação de Páginas Educacionais

---

## 📖 Índice

1. [Filosofia e Identidade](#1-filosofia-e-identidade)
2. [Arquitetura do Projeto](#2-arquitetura-do-projeto)
3. [Sistema de Design](#3-sistema-de-design)
4. [Componentes Disponíveis](#4-componentes-disponíveis)
5. [Criação de Novas Páginas](#5-criação-de-novas-páginas)
6. [Padrões de Código](#6-padrões-de-código)
7. [Fórmulas Matemáticas](#7-fórmulas-matemáticas)
8. [Responsividade e Mobile](#8-responsividade-e-mobile)
9. [Animações e Transições](#9-animações-e-transições)
10. [Performance e Otimização](#10-performance-e-otimização)
11. [Checklist de Qualidade](#11-checklist-de-qualidade)

---

## 1. Filosofia e Identidade

### 🎯 Missão: O Alquimista Pedagógico Digital

Você não está apenas criando páginas web. Você está transmutando conceitos complexos em **experiências de aprendizado vivas, luminosas e cinestésicas**. Cada página deve:

- ✨ **Encantar visualmente** - Design premium que transmite autoridade
- 🧠 **Ensinar profundamente** - Conteúdo denso, zero fluff
- 🎮 **Engajar ativamente** - Interatividade significativa
- 💫 **Emocionar visceralmente** - Criar conexão memorável

### 📐 Princípios Fundamentais

#### 1. **Zero Fluff, Profundidade Máxima**
```
❌ "Neste tópico, vamos aprender sobre números complexos..."
✅ "Números complexos estendem o sistema dos números reais, permitindo..."
```

#### 2. **Estética como Linguagem Pedagógica**
- Cada cor tem propósito (azul = conceito, roxo = exemplo, vermelho = atenção)
- Cada animação guia o olhar
- Cada espaço reduz carga cognitiva

#### 3. **Coesão Absoluta**
- Um sistema de design unificado
- Padrões consistentes em todas as páginas
- Transições suaves entre seções

---

## 2. Arquitetura do Projeto

### 🏗️ Estrutura de Diretórios

```
l2-educa/
├── public/                          # Arquivos estáticos
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── ...
├── src/
│   ├── App.jsx                      # Componente raiz + routing
│   ├── App.css                      # Estilos globais
│   ├── main.jsx                     # Entry point
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── NavigationBar.jsx        # Barra de navegação interna
│   │   ├── Sidebar.jsx              # Menu lateral global
│   │   ├── AuroraBackground.jsx     # Fundo animado
│   │   ├── LoadingScreen.jsx        # Tela de carregamento
│   │   ├── GlassCard.jsx            # Card com glassmorphism
│   │   ├── MathFormula.jsx          # Renderização LaTeX
│   │   ├── InlineFormula.jsx        # Fórmulas inline
│   │   ├── ScrollReveal.jsx         # Animação de scroll
│   │   ├── Footer.jsx               # Rodapé padrão
│   │   └── MobileOrientationNotification.jsx
│   │
│   ├── pages/                       # Páginas do site
│   │   ├── Terminal.jsx             # Hub principal
│   │   ├── MathSubject.jsx          # Hub de matemática
│   │   ├── PhysicsSubject.jsx       # Hub de física
│   │   ├── ComplexNumbers.jsx       # Página de conteúdo
│   │   ├── Polynomials.jsx          # Página de conteúdo
│   │   └── ...
│   │
│   ├── contexts/                    # Context API
│   │   └── NavigationContext.jsx   # Estado de navegação
│   │
│   └── utils/                       # Utilitários
│       └── mobileDetection.js       # Detecção mobile
│
├── dist/                            # Build de produção
├── package.json                     # Dependências
├── vite.config.js                   # Configuração Vite
└── index.html                       # HTML base
```

### 🔄 Fluxo de Navegação

```
Terminal (/)
    ↓
    ├─→ Matemática (/math)
    │       ↓
    │       ├─→ Números Complexos (/math/numeros-complexos)
    │       ├─→ Polinômios (/math/polinomios)
    │       └─→ Geometria Analítica (/math/geometria-analitica)
    │
    └─→ Física (/physics)
            ↓
            ├─→ Exercícios ENEM (/physics/exercicios-enem)
            └─→ [Futuras páginas...]
```

### ⚙️ Tecnologias Core

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 18.3+ | Framework UI |
| **React Router** | 6+ | Navegação SPA |
| **Vite** | 7+ | Build tool |
| **MathJax** | 3+ | Renderização LaTeX |
| **CSS3** | - | Estilização avançada |

---

## 3. Sistema de Design

### 🎨 Paleta de Cores

```css
/* Cores Primárias - Gradientes Aurora */
--primary-purple: #6366f1;     /* Indigo */
--primary-violet: #a855f7;      /* Violet */
--primary-blue: #3b82f6;        /* Blue */
--primary-cyan: #06b6d4;        /* Cyan */
--primary-pink: #d946ef;        /* Pink */

/* Cores de Física */
--physics-orange: #f59e0b;
--physics-red: #ef4444;

/* Backgrounds */
--bg-dark: #0a0a0a;
--bg-darker: #050505;

/* Transparências (Glassmorphism) */
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: blur(16px);
```

### 🖼️ Efeito Aurora (Fundo Animado)

O componente `AuroraBackground.jsx` cria o fundo líquido animado:

```jsx
// Usado automaticamente em todas as páginas
<AuroraBackground />
```

**Características:**
- 3 blobs animados com gradientes
- Movimento suave e hipnótico
- `filter: blur(180px)` para difração
- Posicionamento fixo, não interfere com scroll

### 💎 Glassmorphism

Todas as superfícies usam o efeito de vidro:

```css
.glass-element {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### 📝 Tipografia

```css
/* Hierarquia de Textos */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Títulos */
h1: clamp(2.5rem, 6vw, 4rem)      /* 40-64px */
h2: clamp(2rem, 5vw, 3rem)        /* 32-48px */
h3: clamp(1.5rem, 4vw, 2rem)      /* 24-32px */

/* Corpo */
p: clamp(1rem, 2.5vw, 1.2rem)     /* 16-19px */
small: clamp(0.875rem, 2vw, 1rem) /* 14-16px */
```

### 🎭 Gradientes Padrão

```css
/* Matemática */
.math-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}

/* Física */
.physics-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
}

/* Sucesso/Exemplo */
.example-gradient {
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
}

/* Atenção/Warning */
.warning-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
}
```

---

## 4. Componentes Disponíveis

### 📦 Componentes Estruturais

#### `NavigationBar`
Barra de navegação interna de cada página

```jsx
import NavigationBar from '../components/NavigationBar';

const sections = [
  { id: 'intro', title: 'Introdução', icon: 'home' },
  { id: 'theory', title: 'Teoria', icon: 'book' },
  { id: 'examples', title: 'Exemplos', icon: 'lightbulb' },
];

<NavigationBar sections={sections} />
```

**Características:**
- Fixa no topo ao fazer scroll
- Destaque automático da seção visível (IntersectionObserver)
- Responsiva (colapsa em mobile)
- Smooth scroll ao clicar

#### `Sidebar`
Menu lateral global do site

```jsx
// Já incluído no App.jsx, não precisa adicionar
```

**Funcionalidades:**
- Toggle com botão hamburger
- Links para todas as páginas
- Animação de slide
- Fecha ao clicar fora (overlay)

#### `GlassCard`
Container com efeito glassmorphism

```jsx
import GlassCard from '../components/GlassCard';

<GlassCard>
  <h2>Título da Seção</h2>
  <p>Conteúdo aqui...</p>
</GlassCard>
```

**Props:**
- `className` (opcional) - Classes CSS adicionais
- `children` - Conteúdo do card

### 🔢 Componentes de Matemática

#### `MathFormula`
Renderização de fórmulas LaTeX (display ou inline)

```jsx
import MathFormula from '../components/MathFormula';

// Modo Display (bloco, centralizado)
<MathFormula display>
  {'E = mc^2'}
</MathFormula>

// Modo Inline (dentro de texto)
<MathFormula>
  {'x^2 + y^2 = r^2'}
</MathFormula>
```

**Props:**
- `display` (boolean) - Modo display (true) ou inline (false)
- `numbered` (boolean) - Adiciona numeração automática
- `className` (string) - Classes CSS adicionais
- `children` (string) - LaTeX code

**Recursos:**
- Auto-scaling em mobile
- Quebra de linha após `=` em portrait
- Suporte completo MathJax

#### `InlineFormula`
Texto com fórmulas inline usando delimitadores `$`

```jsx
import InlineFormula from '../components/InlineFormula';

<InlineFormula>
  A velocidade é $v = 5$ m/s e a aceleração $a = 2$ m/s²
</InlineFormula>
```

#### `TextWithMath`
Similar ao InlineFormula, para uso em componentes expandíveis

```jsx
import TextWithMath from '../components/TextWithMath';

<TextWithMath>
  {`A fórmula é $E = mc^2$ onde $c$ é a velocidade da luz`}
</TextWithMath>
```

### 🎬 Componentes de Animação

#### `ScrollReveal`
Anima elementos quando entram no viewport

```jsx
import ScrollReveal from '../components/ScrollReveal';

<ScrollReveal>
  <GlassCard>
    <h2>Este card aparece suavemente</h2>
  </GlassCard>
</ScrollReveal>

// Com delay personalizado
<ScrollReveal delay={200}>
  <GlassCard>...</GlassCard>
</ScrollReveal>
```

**Props:**
- `delay` (number) - Delay em ms (padrão: 0)
- `children` - Elemento a ser animado

#### `PageTransition`
Transição entre páginas (fade)

```jsx
// Já incluído no App.jsx automaticamente
```

### 📱 Componentes Mobile

#### `MobileOrientationNotification`
Notificação para usar landscape em páginas de conteúdo

```jsx
import MobileOrientationNotification from '../components/MobileOrientationNotification';

// Adicione no início do return da sua página de conteúdo
<MobileOrientationNotification />
```

**Comportamento:**
- Aparece apenas em mobile
- Duração: 2 segundos
- Animação suave
- Não interfere com conteúdo

### 🦶 Componentes de Navegação

#### `Footer`
Rodapé padrão do site

```jsx
import Footer from '../components/Footer';

// Adicione no final da página
<Footer />
```

**Conteúdo:**
- Texto padrão L2 EDUCA
- Links para redes sociais (se configurado)
- Copyright

#### `ScrollToTop`
Volta ao topo ao mudar de página

```jsx
// Já incluído no App.jsx automaticamente
```

---

## 5. Criação de Novas Páginas

### 📋 Processo Completo

#### Passo 1: Criar Arquivo da Página

```bash
# Exemplo: Criando página de Trigonometria
touch src/pages/Trigonometry.jsx
touch src/pages/Trigonometry.css
```

#### Passo 2: Template Base da Página

```jsx
// src/pages/Trigonometry.jsx
import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './Trigonometry.css';

const Trigonometry = () => {
  // 1. Definir seções para navegação
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'home' },
    { id: 'unit-circle', title: 'Círculo Unitário', icon: 'circle' },
    { id: 'identities', title: 'Identidades', icon: 'functions' },
    { id: 'graphs', title: 'Gráficos', icon: 'show_chart' },
  ];

  // 2. Estados para elementos interativos (se houver)
  const [angle, setAngle] = useState(45);
  
  // 3. Refs para canvas/visualizações (se houver)
  const canvasRef = useRef(null);

  // 4. Efeitos para desenho/cálculos
  useEffect(() => {
    // Lógica de desenho ou cálculos
  }, [angle]);

  return (
    <div className="trigonometry-page">
      {/* Notificação Mobile */}
      <MobileOrientationNotification />
      
      {/* Navegação Interna */}
      <NavigationBar sections={sections} />

      {/* SEÇÃO 1: INTRODUÇÃO */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Trigonometria</h1>
            <p className="section-intro">
              A trigonometria estuda as relações entre ângulos e lados 
              de triângulos, com aplicações em física, engenharia e 
              computação gráfica.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Funções Fundamentais</h2>
            <p className="text-content">
              As três funções trigonométricas fundamentais são:
            </p>
            <MathFormula display>
              {'\\sin\\theta = \\frac{\\text{oposto}}{\\text{hipotenusa}}'}
            </MathFormula>
            <MathFormula display>
              {'\\cos\\theta = \\frac{\\text{adjacente}}{\\text{hipotenusa}}'}
            </MathFormula>
            <MathFormula display>
              {'\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* SEÇÃO 2: CÍRCULO UNITÁRIO */}
      <section id="unit-circle" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Círculo Unitário</h1>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Visualização Interativa</h2>
            <div className="interactive-tool">
              <canvas ref={canvasRef} width="600" height="600" className="trig-canvas"></canvas>
              <div className="controls">
                <div className="control-group">
                  <label>Ângulo: {angle}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={angle}
                    onChange={(e) => setAngle(parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* SEÇÃO 3: IDENTIDADES */}
      <section id="identities" className="page-section">
        {/* Conteúdo... */}
      </section>

      {/* SEÇÃO 4: GRÁFICOS */}
      <section id="graphs" className="page-section">
        {/* Conteúdo... */}
      </section>

      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default Trigonometry;
```

#### Passo 3: CSS da Página

```css
/* src/pages/Trigonometry.css */

/* Container Principal */
.trigonometry-page {
  min-height: 100vh;
  padding: clamp(6rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(2rem, 5vw, 4rem);
}

/* Seções */
.page-section {
  max-width: 1200px;
  margin: 0 auto clamp(4rem, 8vw, 6rem);
}

/* Cabeçalho de Seção */
.section-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.section-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  letter-spacing: -0.02em;
}

.section-intro {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Subtítulos */
.subsection-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #fff;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

/* Texto Padrão */
.text-content {
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* Listas */
.content-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.content-list li {
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.85);
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
}

.content-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #a855f7;
  font-weight: bold;
}

/* Boxes de Exemplo */
.example-box {
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  padding: clamp(1rem, 3vw, 1.5rem);
  margin: 1.5rem 0;
}

.example-box strong {
  color: #a855f7;
  font-size: 1.1em;
}

/* Ferramentas Interativas */
.interactive-tool {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.trig-canvas {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.controls {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 1rem;
}

.control-group input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(99, 102, 241, 0.2);
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.control-group input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .trigonometry-page {
    padding: 5rem 1rem 2rem;
  }
  
  .trig-canvas {
    max-width: 100%;
  }
}
```

#### Passo 4: Adicionar Rota no App.jsx

```jsx
// src/App.jsx
import Trigonometry from './pages/Trigonometry';

// Dentro de <Routes>
<Route path="/math/trigonometria" element={<Trigonometry />} />
```

#### Passo 5: Adicionar Link no Hub (MathSubject.jsx)

```jsx
// src/pages/MathSubject.jsx
const topics = [
  // ... tópicos existentes
  {
    id: 'trigonometry',
    title: 'Trigonometria',
    icon: 'architecture',
    description: 'Explore seno, cosseno, tangente e suas aplicações...',
    path: '/math/trigonometria',
    difficulty: 'Intermediário',
    duration: '55 min',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  },
];
```

---

## 6. Padrões de Código

### ✨ Boas Práticas React

#### Estrutura de Componentes

```jsx
// 1. Imports
import React, { useState, useEffect, useRef } from 'react';
import ExternalComponent from '../path';
import './Component.css';

// 2. Definição do Componente
const ComponentName = ({ prop1, prop2 }) => {
  // 3. Estados
  const [state, setState] = useState(initialValue);
  
  // 4. Refs
  const elementRef = useRef(null);
  
  // 5. Funções auxiliares
  const helperFunction = () => {
    // lógica
  };
  
  // 6. Efeitos
  useEffect(() => {
    // lógica de efeito
    return () => {
      // cleanup
    };
  }, [dependencies]);
  
  // 7. Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

// 8. Export
export default ComponentName;
```

#### Nomenclatura

```jsx
// ✅ BOM - PascalCase para componentes
import NavigationBar from './NavigationBar';
const MyComponent = () => {};

// ✅ BOM - camelCase para funções e variáveis
const handleClick = () => {};
const userData = {};

// ✅ BOM - kebab-case para classes CSS
<div className="section-header" />

// ✅ BOM - SCREAMING_SNAKE_CASE para constantes
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// ❌ RUIM
const navigation_bar = () => {}; // errado
const MyVariable = {}; // errado para variável
```

#### Props e Destructuring

```jsx
// ✅ BOM - Destructuring nas props
const Card = ({ title, description, icon }) => {
  return <div>...</div>;
};

// ✅ BOM - Props com valores padrão
const Button = ({ 
  text = 'Clique aqui',
  variant = 'primary',
  onClick 
}) => {
  return <button>...</button>;
};

// ❌ RUIM - Acessar props.algo
const Card = (props) => {
  return <div>{props.title}</div>;
};
```

### 🎨 Padrões CSS

#### Seletores e Classes

```css
/* ✅ BOM - Classes específicas e descritivas */
.complex-numbers-page {
  /* estilos da página */
}

.section-header {
  /* cabeçalho de seção */
}

.interactive-calculator {
  /* calculadora */
}

/* ❌ RUIM - Classes genéricas demais */
.content { }
.box { }
.item { }
```

#### Responsive Design

```css
/* ✅ BOM - Use clamp() para escalabilidade fluida */
.title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  padding: clamp(1rem, 3vw, 2rem);
}

/* ✅ BOM - Media queries mobile-first */
.element {
  /* estilos mobile por padrão */
  padding: 1rem;
}

@media (min-width: 768px) {
  .element {
    /* estilos tablet */
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .element {
    /* estilos desktop */
    padding: 3rem;
  }
}

/* ❌ RUIM - Valores fixos */
.title {
  font-size: 48px; /* não escala */
}
```

#### Animações e Transições

```css
/* ✅ BOM - Transições suaves e específicas */
.button {
  transition: transform 0.3s ease-out, 
              background-color 0.3s ease-out;
}

.button:hover {
  transform: translateY(-2px);
}

/* ✅ BOM - Animações com @keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-element {
  animation: fadeIn 0.5s ease-out;
}

/* ❌ RUIM - Transição genérica */
.button {
  transition: all 0.3s; /* péssima performance */
}
```

---

## 7. Fórmulas Matemáticas

### 📐 Guia Completo LaTeX

#### Sintaxe Básica

```jsx
// Fórmula inline (dentro de texto)
<MathFormula>{'x^2 + y^2'}</MathFormula>

// Fórmula display (centralizada, bloco)
<MathFormula display>
  {'E = mc^2'}
</MathFormula>

// Texto com múltiplas fórmulas
<InlineFormula>
  A velocidade é $v = 5$ m/s e a energia $E = 10$ J
</InlineFormula>
```

#### Operadores e Símbolos

```latex
/* OPERAÇÕES BÁSICAS */
x + y          // adição
x - y          // subtração
x \times y     // multiplicação (×)
x \cdot y      // multiplicação (·)
\frac{x}{y}    // fração

/* POTÊNCIAS E ÍNDICES */
x^2            // expoente
x_i            // índice
x^{2n+1}       // expoente composto
x_{i,j}        // índice composto

/* RAÍZES */
\sqrt{x}       // raiz quadrada
\sqrt[n]{x}    // raiz n-ésima

/* FUNÇÕES TRIGONOMÉTRICAS */
\sin\theta     // seno
\cos\theta     // cosseno
\tan\theta     // tangente
\cot\theta     // cotangente
\sec\theta     // secante
\csc\theta     // cossecante

/* FUNÇÕES ESPECIAIS */
\log x         // logaritmo
\ln x          // logaritmo natural
\exp(x)        // exponencial
\lim_{x \to 0} // limite

/* SOMATÓRIOS E PRODUTÓRIOS */
\sum_{i=1}^{n} x_i    // somatório
\prod_{i=1}^{n} x_i   // produtório
\int_{a}^{b} f(x) dx  // integral

/* VETORES E MATRIZES */
\vec{v}        // vetor
\mathbf{A}     // matriz (negrito)
\begin{pmatrix}
  a & b \\
  c & d
\end{pmatrix}  // matriz 2x2

/* SÍMBOLOS GREGOS */
\alpha, \beta, \gamma, \delta
\epsilon, \theta, \lambda, \pi
\sigma, \omega, \Omega, \Delta

/* RELAÇÕES */
x = y          // igual
x \neq y       // diferente
x < y          // menor
x > y          // maior
x \leq y       // menor ou igual
x \geq y       // maior ou igual
x \approx y    // aproximadamente igual
x \propto y    // proporcional

/* CONJUNTOS */
\in            // pertence
\notin         // não pertence
\subset        // subconjunto
\cup           // união
\cap           // interseção
\emptyset      // conjunto vazio

/* LÓGICA */
\land          // e lógico (∧)
\lor           // ou lógico (∨)
\neg           // negação (¬)
\implies       // implica (⇒)
\iff           // se e somente se (⇔)

/* SETAS */
\rightarrow    // seta direita (→)
\leftarrow     // seta esquerda (←)
\Rightarrow    // seta dupla (⇒)
\leftrightarrow // seta dupla (↔)

/* ESPAÇAMENTO */
\quad          // espaço médio
\qquad         // espaço grande
\,             // espaço pequeno
```

#### Exemplos Práticos

```jsx
// Equação quadrática
<MathFormula display>
  {'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}
</MathFormula>

// Teorema de Pitágoras
<MathFormula display>
  {'a^2 + b^2 = c^2'}
</MathFormula>

// Número complexo (forma trigonométrica)
<MathFormula display>
  {'z = r(\\cos\\theta + i\\sin\\theta)'}
</MathFormula>

// Integral definida
<MathFormula display>
  {'\\int_{0}^{\\pi} \\sin(x) dx = 2'}
</MathFormula>

// Sistema de equações
<MathFormula display>
  {`\\begin{cases}
    x + y = 5 \\\\
    2x - y = 1
  \\end{cases}`}
</MathFormula>

// Matriz
<MathFormula display>
  {`A = \\begin{pmatrix}
    1 & 2 & 3 \\\\
    4 & 5 & 6 \\\\
    7 & 8 & 9
  \\end{pmatrix}`}
</MathFormula>

// Derivada
<MathFormula display>
  {'\\frac{d}{dx}(x^2) = 2x'}
</MathFormula>

// Limite
<MathFormula display>
  {'\\lim_{x \\to \\infty} \\frac{1}{x} = 0'}
</MathFormula>
```

#### Formatação Avançada

```latex
/* TEXTO EM FÓRMULAS */
\\text{velocidade} = \\frac{\\text{distância}}{\\text{tempo}}

/* CORES (se necessário) */
\\color{red}{x} + \\color{blue}{y}

/* ALINHAMENTO MÚLTIPLAS LINHAS */
\\begin{align*}
  x + y &= 5 \\\\
  2x - y &= 1
\\end{align*}

/* CASOS (IF/ELSE) */
f(x) = \\begin{cases}
  x^2 & \\text{se } x \\geq 0 \\\\
  -x^2 & \\text{se } x < 0
\\end{cases}

/* SUBLINHADO/SOBRELINHA */
\\underline{texto}
\\overline{texto}

/* PARÊNTESES GRANDES */
\\left( \\frac{x}{y} \\right)
\\left[ \\frac{x}{y} \\right]
\\left\\{ \\frac{x}{y} \\right\\}
```

### 🎯 Dicas de Uso

1. **Use `display` para fórmulas importantes**
   ```jsx
   <MathFormula display>
     {'E = mc^2'}
   </MathFormula>
   ```

2. **Use inline para fórmulas dentro de texto**
   ```jsx
   <p>
     A fórmula <MathFormula>{'E = mc^2'}</MathFormula> é famosa.
   </p>
   ```

3. **Use InlineFormula para múltiplas fórmulas**
   ```jsx
   <InlineFormula>
     Temos $x = 5$ e $y = 10$, logo $x + y = 15$
   </InlineFormula>
   ```

4. **Escape barras invertidas**
   ```jsx
   // ✅ BOM
   {'\\frac{1}{2}'}
   
   // ❌ RUIM
   {'\frac{1}{2}'} // interpretado como caractere de escape
   ```

---

## 8. Responsividade e Mobile

### 📱 Estratégia Mobile-First

#### Princípios

1. **Design para mobile primeiro**
2. **Adicione complexidade progressivamente**
3. **Teste em devices reais**
4. **Otimize touch targets (min 44x44px)**

#### Breakpoints Padrão

```css
/* Mobile Small: 0-374px */
/* Mobile: 375-767px (padrão) */

/* Tablet: 768-1023px */
@media (min-width: 768px) {
  /* estilos tablet */
}

/* Desktop: 1024-1439px */
@media (min-width: 1024px) {
  /* estilos desktop */
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
  /* estilos tela grande */
}
```

#### Orientação

```css
/* Portrait (vertical) */
@media (orientation: portrait) {
  .formula-box {
    font-size: 0.9rem;
  }
}

/* Landscape (horizontal) */
@media (orientation: landscape) {
  .formula-box {
    font-size: 1.1rem;
  }
}
```

#### Classes de Detecção

O sistema adiciona automaticamente classes ao `<body>`:

```css
/* Estilize baseado no dispositivo */
body.mobile-portrait .formula {
  /* estilos específicos mobile portrait */
}

body.mobile-landscape .formula {
  /* estilos específicos mobile landscape */
}

body.desktop .formula {
  /* estilos específicos desktop */
}
```

### 🎨 Componentes Responsivos

#### Canvas Responsivo

```jsx
<canvas 
  ref={canvasRef} 
  width="600" 
  height="400" 
  className="responsive-canvas"
></canvas>
```

```css
.responsive-canvas {
  width: 100%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 3/2;
}
```

#### Grids Responsivos

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

#### Tabelas Responsivas

```css
/* Mobile: Scroll horizontal */
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  min-width: 600px;
}

/* Desktop: Tamanho normal */
@media (min-width: 1024px) {
  table {
    min-width: auto;
  }
}
```

---

## 9. Animações e Transições

### 🎬 Biblioteca de Animações

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

#### Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.6s ease-out;
}
```

#### Scale In

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.4s ease-out;
}
```

#### Pulse

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s infinite;
}
```

#### Gradient Shift

```css
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-animated {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
```

### 🎯 Uso com ScrollReveal

```jsx
// Animação básica
<ScrollReveal>
  <GlassCard>Conteúdo</GlassCard>
</ScrollReveal>

// Com delay
<ScrollReveal delay={100}>
  <GlassCard>Segundo elemento</GlassCard>
</ScrollReveal>

// Sequência escalonada
<ScrollReveal delay={0}>
  <div>Primeiro</div>
</ScrollReveal>
<ScrollReveal delay={100}>
  <div>Segundo</div>
</ScrollReveal>
<ScrollReveal delay={200}>
  <div>Terceiro</div>
</ScrollReveal>
```

### ⚡ Performance

```css
/* ✅ BOM - Animar apenas transform e opacity */
.optimized {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.optimized:hover {
  transform: translateY(-5px);
  opacity: 0.8;
}

/* ❌ RUIM - Animar propriedades que causam reflow */
.not-optimized {
  transition: width 0.3s, height 0.3s; /* causa reflow */
}

/* ✅ BOM - Use will-change para animações pesadas */
.heavy-animation {
  will-change: transform;
  animation: complexAnimation 2s ease infinite;
}
```

---

## 10. Performance e Otimização

### ⚡ Otimizações React

#### Memoização

```jsx
import React, { useMemo, useCallback, memo } from 'react';

// Memoizar componentes caros
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* renderização cara */}</div>;
});

// Memoizar cálculos
const ComplexCalculation = ({ input }) => {
  const result = useMemo(() => {
    // cálculo pesado
    return expensiveCalculation(input);
  }, [input]); // só recalcula se input mudar
  
  return <div>{result}</div>;
};

// Memoizar callbacks
const ParentComponent = () => {
  const handleClick = useCallback(() => {
    // lógica do handler
  }, []); // função estável
  
  return <ChildComponent onClick={handleClick} />;
};
```

#### Code Splitting

```jsx
// Lazy loading de páginas
import { lazy, Suspense } from 'react';

const ComplexNumbers = lazy(() => import('./pages/ComplexNumbers'));
const Polynomials = lazy(() => import('./pages/Polynomials'));

// No App.jsx
<Suspense fallback={<LoadingScreen />}>
  <Routes>
    <Route path="/math/numeros-complexos" element={<ComplexNumbers />} />
    <Route path="/math/polinomios" element={<Polynomials />} />
  </Routes>
</Suspense>
```

### 🖼️ Otimização de Assets

#### Imagens

```jsx
// Use formatos modernos
<img 
  src="image.webp" 
  alt="Descrição"
  loading="lazy" // lazy loading nativo
  width="600"
  height="400"
/>

// Múltiplas resoluções
<img
  srcSet="
    image-small.webp 400w,
    image-medium.webp 800w,
    image-large.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-medium.webp"
  alt="Descrição"
/>
```

#### Fontes

```css
/* Pré-carregamento no HTML */
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

/* CSS otimizado */
@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
  font-display: swap; /* Mostra fallback enquanto carrega */
  font-weight: 400;
  font-style: normal;
}
```

### 📊 Monitoramento

```jsx
// Performance timing
useEffect(() => {
  const start = performance.now();
  
  // operação
  
  const end = performance.now();
  console.log(`Operação levou ${end - start}ms`);
}, []);

// Memory profiling (Dev only)
if (process.env.NODE_ENV === 'development') {
  console.log('Memory usage:', performance.memory);
}
```

---

## 11. Checklist de Qualidade

### ✅ Antes de Commitar

#### 🎨 Design e UI

- [ ] Fundo Aurora animado presente
- [ ] Glassmorphism aplicado em cards
- [ ] Gradientes consistentes com paleta
- [ ] Animações suaves (0.3-0.5s ease-out)
- [ ] Cores acessíveis (contraste mínimo WCAG AA)
- [ ] Ícones Material Icons carregados
- [ ] Tipografia fluida com clamp()

#### 📱 Responsividade

- [ ] Testado em mobile (375px)
- [ ] Testado em tablet (768px)
- [ ] Testado em desktop (1920px)
- [ ] Testado em portrait e landscape
- [ ] Notificação mobile aparece
- [ ] Fórmulas quebram linha em portrait
- [ ] Sem scroll horizontal em nenhum breakpoint
- [ ] Touch targets mínimo 44x44px

#### 🔢 Conteúdo

- [ ] Fórmulas LaTeX renderizando corretamente
- [ ] Zero erros de português
- [ ] Conteúdo denso e profundo (sem fluff)
- [ ] Exemplos práticos incluídos
- [ ] Explicações lógicas e sequenciais
- [ ] Links internos funcionando

#### ⚙️ Funcionalidade

- [ ] Navegação interna highlighting corretamente
- [ ] Smooth scroll funcionando
- [ ] Elementos interativos responsivos
- [ ] Canvas desenhando corretamente
- [ ] Estados gerenciados adequadamente
- [ ] Sem erros no console

#### 🚀 Performance

- [ ] Build compila sem erros
- [ ] Sem warnings de React
- [ ] Componentes memoizados quando necessário
- [ ] Imagens otimizadas
- [ ] Lazy loading implementado
- [ ] Lighthouse score > 90

#### ♿ Acessibilidade

- [ ] Alt text em imagens
- [ ] Labels em inputs
- [ ] ARIA labels onde necessário
- [ ] Navegação por teclado funcional
- [ ] Contraste de cores adequado

#### 📝 Código

- [ ] Nomenclatura consistente
- [ ] Comentários em lógica complexa
- [ ] Sem código duplicado
- [ ] Imports organizados
- [ ] CSS organizado e modular
- [ ] Sem console.logs desnecessários

### 🎯 Checklist de Página Completa

Para cada nova página criada:

```markdown
## Página: [Nome da Página]

### Estrutura
- [ ] Arquivo .jsx criado
- [ ] Arquivo .css criado
- [ ] Rota adicionada no App.jsx
- [ ] Link adicionado no Hub apropriado
- [ ] Seções definidas para navegação

### Componentes
- [ ] MobileOrientationNotification incluído
- [ ] NavigationBar configurado
- [ ] GlassCards utilizados
- [ ] ScrollReveal aplicado
- [ ] Footer incluído

### Conteúdo
- [ ] Título principal impactante
- [ ] Introdução cativante
- [ ] Mínimo 3 seções de conteúdo
- [ ] Fórmulas matemáticas (se aplicável)
- [ ] Exemplos práticos
- [ ] Elemento interativo (calculadora/gráfico)

### Estilização
- [ ] Gradiente de título definido
- [ ] Cores consistentes com sistema
- [ ] Responsividade completa
- [ ] Animações aplicadas

### Testes
- [ ] Testado em Chrome
- [ ] Testado em Firefox
- [ ] Testado em Safari (se possível)
- [ ] Testado em mobile
- [ ] Testado interatividade
- [ ] Testado navegação

### Documentação
- [ ] Comentários em código complexo
- [ ] README atualizado (se necessário)
```

---

## 📚 Recursos Adicionais

### 🔗 Links Úteis

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **MathJax Docs**: https://docs.mathjax.org
- **CSS Tricks**: https://css-tricks.com
- **Material Icons**: https://fonts.google.com/icons

### 📖 Arquivos de Referência

- `MOBILE_FORMULA_IMPROVEMENTS.md` - Melhorias mobile
- `MOBILE_TESTING_GUIDE.md` - Guia de testes
- `PROJECT_SUMMARY.md` - Resumo do projeto
- `DEPLOYMENT_GUIDE.md` - Deploy em produção

### 🎨 Inspirações de Design

- Stripe (https://stripe.com) - Animações sutis
- Apple (https://apple.com) - Minimalismo
- Vercel (https://vercel.com) - Glassmorphism
- Linear (https://linear.app) - Interações fluidas

---

## 🎓 Exemplos Práticos Completos

### Exemplo 1: Página Simples (Sem Interatividade)

```jsx
// src/pages/SimpleTopic.jsx
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './SimpleTopic.css';

const SimpleTopic = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'home' },
    { id: 'theory', title: 'Teoria', icon: 'book' },
    { id: 'examples', title: 'Exemplos', icon: 'lightbulb' },
  ];

  return (
    <div className="simple-topic-page">
      <MobileOrientationNotification />
      <NavigationBar sections={sections} />

      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Tópico Simples</h1>
            <p className="section-intro">
              Uma introdução clara e concisa ao tópico.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Conceito Fundamental</h2>
            <p className="text-content">
              Explicação detalhada do conceito.
            </p>
            <MathFormula display>
              {'f(x) = x^2 + 2x + 1'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default SimpleTopic;
```

### Exemplo 2: Página com Calculadora Interativa

```jsx
// src/pages/InteractiveTopic.jsx
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './InteractiveTopic.css';

const InteractiveTopic = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'home' },
    { id: 'calculator', title: 'Calculadora', icon: 'calculate' },
  ];

  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(1);

  const calculateDiscriminant = () => {
    return b * b - 4 * a * c;
  };

  const calculateRoots = () => {
    const delta = calculateDiscriminant();
    if (delta < 0) return null;
    
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    return { x1, x2 };
  };

  const roots = calculateRoots();

  return (
    <div className="interactive-topic-page">
      <MobileOrientationNotification />
      <NavigationBar sections={sections} />

      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Equação do 2º Grau</h1>
            <p className="section-intro">
              Calculadora interativa para equações quadráticas.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id="calculator" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Calculadora Interativa</h2>
            
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Coeficiente a:</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                  className="calculator-input"
                />
              </div>
              
              <div className="input-group">
                <label>Coeficiente b:</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                  className="calculator-input"
                />
              </div>
              
              <div className="input-group">
                <label>Coeficiente c:</label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                  className="calculator-input"
                />
              </div>
            </div>

            <div className="equation-display">
              <MathFormula display>
                {`${a}x^2 + ${b}x + ${c} = 0`}
              </MathFormula>
            </div>

            <div className="results">
              <h3>Discriminante (Δ):</h3>
              <p className="result-value">{calculateDiscriminant().toFixed(2)}</p>
              
              {roots ? (
                <>
                  <h3>Raízes:</h3>
                  <p className="result-value">
                    x₁ = {roots.x1.toFixed(2)}<br />
                    x₂ = {roots.x2.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="no-roots">Sem raízes reais</p>
              )}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default InteractiveTopic;
```

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run dev -- --host    # Expõe para rede local

# Build
npm run build            # Build de produção
npm run preview          # Preview do build

# Linting (se configurado)
npm run lint             # Verifica erros de código

# Deploy
npm run deploy           # Deploy para GitHub Pages (se configurado)
```

---

## 🎯 Conclusão

Este guia é seu **grimório de desenvolvimento** para o L2 EDUCA. Siga-o rigorosamente para:

✨ **Manter consistência** em todas as páginas
🎨 **Garantir qualidade premium** em design e código  
🚀 **Otimizar performance** e experiência do usuário  
📱 **Assegurar responsividade** em todos os dispositivos  
🧠 **Entregar conteúdo profundo** e educacional de alto nível

### Lembre-se:

> *"Você não está criando apenas uma página web. Você está transmutando conhecimento em uma experiência memorável, visceral e transformadora."*

---

**Versão:** 1.0.0  
**Data:** 2025-10-27  
**Autor:** L2 EDUCA Team  
**Status:** ✅ Completo e Pronto para Uso

*Este documento é vivo e deve ser atualizado conforme o projeto evolui.*

