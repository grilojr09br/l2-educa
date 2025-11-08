# 🏗️ Estrutura do Site L2 Educa

## Visão Geral

O L2 Educa é uma plataforma educacional SPA (Single Page Application) construída com React, focada em fornecer conteúdo denso e profundo com design premium.

---

## 📂 Estrutura de Diretórios

```
l2-educa/
├── public/                          # Arquivos estáticos
│   ├── favicon.svg                  # Favicon principal
│   ├── apple-touch-icon.png         # Ícone iOS
│   ├── sw.js                        # Service Worker (PWA)
│   └── web-app-manifest-*.png       # Ícones PWA
│
├── src/
│   ├── main.jsx                     # Entry point (registra SW)
│   ├── App.jsx                      # Componente raiz + routing
│   ├── App.css                      # Estilos globais
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── AuroraBackground.jsx     # Fundo animado (pausado em viewport)
│   │   ├── LoadingScreen.jsx        # Smart loading (detecção de device)
│   │   ├── Sidebar.jsx              # Menu lateral global (home button)
│   │   ├── NavigationBar.jsx        # Barra de navegação interna
│   │   ├── GlassCard.jsx            # Card com glassmorphism
│   │   ├── ScrollReveal.jsx         # Animação de scroll
│   │   ├── PageTransition.jsx       # Transição entre páginas
│   │   ├── Footer.jsx               # Rodapé padrão
│   │   │
│   │   ├── MathFormula.jsx          # Fórmulas display (lazy loading)
│   │   ├── InlineFormula.jsx        # Fórmulas inline
│   │   ├── ExpandableFormula.jsx    # Fórmulas expansíveis
│   │   ├── TextWithMath.jsx         # Texto com fórmulas embutidas
│   │   │
│   │   └── MobileOrientationNotification.jsx  # Aviso mobile
│   │
│   ├── pages/                       # Páginas do site
│   │   ├── Terminal.jsx             # Hub principal (/)
│   │   │
│   │   ├── MathSubject.jsx          # Hub de matemática (/math)
│   │   ├── ComplexNumbers.jsx       # Números Complexos
│   │   ├── Polynomials.jsx          # Polinômios
│   │   ├── AnalyticGeometry.jsx     # Geometria Analítica
│   │   │
│   │   ├── PhysicsSubject.jsx       # Hub de física (/physics)
│   │   └── PhysicsExercises.jsx     # Exercícios ENEM
│   │
│   ├── contexts/                    # Context API
│   │   ├── NavigationContext.jsx    # Estado de navegação (memoized)
│   │   └── PerformanceContext.jsx   # Monitoramento FPS
│   │
│   └── utils/                       # Utilitários
│       ├── mobileDetection.js       # Detecção mobile/orientation
│       ├── useDeviceDetection.js    # Detecção hardware (RAM, CPU)
│       ├── usePerformance.js        # Hook de FPS monitoring
│       ├── formulaCache.js          # IndexedDB cache para MathJax
│       ├── mathJaxPreloader.js      # Lazy preload de MathJax
│       └── registerSW.js            # Registro do Service Worker
│
├── dist/                            # Build de produção
├── guias-importantes/               # 📚 DOCUMENTAÇÃO (VOCÊ ESTÁ AQUI)
├── tests/                           # Relatórios Lighthouse
├── package.json                     # Dependências
├── vite.config.js                   # Build config + code splitting
└── index.html                       # HTML base
```

---

## 🔄 Fluxo de Navegação

### Hierarquia de Páginas

```
/ (Terminal)
    │
    ├─→ /math (MathSubject)
    │       │
    │       ├─→ /math/numeros-complexos (ComplexNumbers)
    │       ├─→ /math/polinomios (Polynomials)
    │       └─→ /math/geometria-analitica (AnalyticGeometry)
    │
    ├─→ /physics (PhysicsSubject)
    │       │
    │       └─→ /physics/exercicios-enem (PhysicsExercises)
    │
    └─→ /[futura-materia] (Coming Soon)
```

### Rotas Configuradas (App.jsx)

```jsx
<Routes>
  <Route path="/" element={<Terminal />} />
  <Route path="/math" element={<MathSubject />} />
  <Route path="/math/numeros-complexos" element={<ComplexNumbers />} />
  <Route path="/math/polinomios" element={<Polynomials />} />
  <Route path="/math/geometria-analitica" element={<AnalyticGeometry />} />
  <Route path="/physics" element={<PhysicsSubject />} />
  <Route path="/physics/exercicios-enem" element={<PhysicsExercises />} />
</Routes>
```

---

## ⚙️ Tecnologias e Dependências

### Core Stack

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 18.3+ | Framework UI |
| **React Router** | 6+ | SPA routing (HashRouter) |
| **Vite** | 7+ | Build tool & dev server |
| **MathJax** | 3+ | Renderização LaTeX (CDN) |
| **CSS3** | - | Estilos avançados (grid, flex, clamp) |

### Bibliotecas Adicionais

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.x",
    "idb": "^7.x" // IndexedDB wrapper para cache
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^7.x"
  }
}
```

---

## 🧩 Componentes Globais

### 1. AuroraBackground
**Arquivo**: `src/components/AuroraBackground.jsx`

**Propósito**: Fundo animado gradiente

**Características**:
- 4 blobs animados com gradientes purple/blue/pink
- Pausado quando fora do viewport (performance)
- Estático em mobile (reduz GPU load)
- `position: fixed`, não interfere com scroll

**Uso**: Automático em todas as páginas (renderizado no `App.jsx`)

---

### 2. LoadingScreen
**Arquivo**: `src/components/LoadingScreen.jsx`

**Propósito**: Smart loading com detecção de dispositivo

**Características**:
- Detecta RAM, CPU cores, GPU
- Classifica device (low/mid/high tier)
- Aplica otimizações automáticas
- Exibe mensagens dinâmicas em português
- Mínimo 1 segundo de duração
- Usa `sessionStorage` para não repetir

**Triggers**:
- Primeira visita (sem `hasSeenLoading`)
- Após limpar cache

---

### 3. Sidebar
**Arquivo**: `src/components/Sidebar.jsx`

**Propósito**: Menu lateral global (ícone home)

**Comportamento**:
- Sempre visível (exceto durante loading)
- Botão flutuante no canto superior esquerdo
- Navega para `/` (Terminal)
- Ícone material: `home`

---

### 4. PageTransition
**Arquivo**: `src/components/PageTransition.jsx`

**Propósito**: Overlay animado entre páginas

**Funcionamento**:
- Triggered por `NavigationContext`
- Fade in/out suave
- Cor dinâmica por matéria (purple, red, green)

---

### 5. ScrollReveal
**Arquivo**: `src/components/ScrollReveal.jsx`

**Propósito**: Animação de fade-in ao scrollar

**Uso**:
```jsx
<ScrollReveal delay={0}>
  <div>Conteúdo aparece ao scrollar</div>
</ScrollReveal>
```

**Características**:
- IntersectionObserver
- Memoizado (performance)
- Mobile: transição mais rápida (0.4s vs 0.8s)

---

## 🎨 Sistema de Context

### NavigationContext
**Arquivo**: `src/contexts/NavigationContext.jsx`

**Propósito**: Gerenciar transições de página

**API**:
```jsx
const { navigateWithTransition, isTransitioning, transitionColor } = useNavigation();

// Usar ao invés de navigate()
navigateWithTransition('/math', 'purple');
```

**Cores disponíveis**: `'purple'`, `'red'`, `'green'`, `'blue'`

---

### PerformanceContext
**Arquivo**: `src/contexts/PerformanceContext.jsx`

**Propósito**: Monitorar FPS e notificar baixa performance

**Comportamento**:
- Monitora FPS continuamente
- Notifica se FPS < 30 por 5+ segundos
- Ignora quando página não está visível
- Notificação auto-hide após 10s

**Uso**: Automático (wrapper em `App.jsx`)

---

## 🚀 Fluxo de Inicialização

### 1. `main.jsx` (Entry Point)
```jsx
// 1. Renderiza <App />
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 2. Registra Service Worker (produção apenas)
if (import.meta.env.PROD) {
  registerServiceWorker();
}
```

---

### 2. `App.jsx` (Root Component)
```jsx
function App() {
  return (
    <Router>                       {/* HashRouter */}
      <PerformanceProvider>         {/* Monitoramento FPS */}
        <NavigationProvider>        {/* Transições */}
          <AppContent />            {/* Conteúdo */}
        </NavigationProvider>
      </PerformanceProvider>
    </Router>
  );
}

function AppContent() {
  const [loadingComplete, setLoadingComplete] = useState(hasSeenBefore);

  return (
    <>
      {!loadingComplete && <LoadingScreen />}
      {loadingComplete && (
        <>
          <AuroraBackground />
          <PageTransition />
          <ScrollToTop />
          <Sidebar />
        </>
      )}
      <div id="main-content">
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/* ... rotas ... */}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
```

---

### 3. LoadingScreen
```
1. Detecta dispositivo (RAM, CPU, GPU)
2. Classifica tier (low/mid/high)
3. Aplica classes CSS ao body
4. Executa tasks (fonts, resources, optimize)
5. Anima progresso 0% → 100%
6. Marca sessionStorage['hasSeenLoading'] = 'true'
7. Chama onComplete() → mostra app
```

---

### 4. Primeira Página (Terminal)
```
1. Lazy load do componente
2. AuroraBackground inicia animação
3. Cards de matérias renderizam
4. Drop-shadow glow aplicado no hover
5. IntersectionObserver monitora scroll
6. ScrollReveal anima elementos
```

---

## 📱 Responsividade

### Breakpoints Padrão

```css
/* Mobile first approach */

/* Mobile pequeno */
@media (max-width: 480px) { }

/* Mobile/Tablet */
@media (max-width: 768px) { }

/* Tablet grande */
@media (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

### Detecção de Orientação

```js
// src/utils/mobileDetection.js
export function isMobilePortrait() {
  return window.innerWidth < 768 && 
         window.innerHeight > window.innerWidth;
}

// CSS classes aplicadas automaticamente
document.body.classList.add('mobile-portrait');
document.body.classList.add('mobile-landscape');
```

---

## 🔧 Build e Deploy

### Desenvolvimento
```bash
npm run dev
# → http://localhost:5173/
```

### Produção
```bash
npm run build
# → gera dist/
```

### Preview
```bash
npm run preview
# → testa build localmente
```

### Estrutura do Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js         # Main bundle
│   ├── react-vendor-[hash].js  # React/Router
│   ├── math-vendor-[hash].js   # MathJS
│   ├── page-*-[hash].js        # Páginas lazy loaded
│   ├── math-components-[hash].js  # Componentes Math
│   └── *.css                   # CSS code split
├── sw.js                       # Service Worker
└── [favicons e PWA icons]
```

---

## 🎯 Resumo dos Conceitos

1. **SPA com React Router**: Navegação sem reload
2. **Lazy Loading**: Páginas carregadas sob demanda
3. **Code Splitting**: Bundles otimizados por categoria
4. **Smart Loading**: Detecção e otimização automática
5. **Context API**: Estado global compartilhado
6. **PWA**: Service Worker + cache inteligente
7. **Performance**: IntersectionObserver, memoization, lazy MathJax

---

**Próximo**: [02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md](./02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md)

