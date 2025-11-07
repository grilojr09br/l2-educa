# 📄 Como Criar uma Nova Página de Matéria

## Tutorial Completo Passo a Passo

Este guia ensina como criar uma nova matéria (ex: Química, Biologia) com página hub e cards de tópicos.

**⚠️ IMPORTANTE**: A partir da v2.0, o L2 Educa usa um sistema de sidebar universal. Consulte também [SIDEBAR_SYSTEM.md](./SIDEBAR_SYSTEM.md) para detalhes sobre configuração centralizada e progress tracking.

---

## 📋 Pré-requisitos

- [ ] Definir nome da matéria (ex: "Química")
- [ ] Definir cor primária e gradiente
- [ ] Definir ícone Material Icons
- [ ] Listar tópicos principais
- [ ] Ter conteúdo pronto para pelo menos 1 tópico

---

## 🎨 Passo 1: Definir Identidade Visual

### Escolher Paleta de Cores

```jsx
// Exemplos de paletas por matéria:

// Matemática (existente)
color: '#6366f1',
gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',

// Física (existente)
color: '#ef4444',
gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',

// Química (sugestão)
color: '#10b981',
gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',

// Biologia (sugestão)
color: '#22c55e',
gradient: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',

// Programação (sugestão)
color: '#f59e0b',
gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
```

### Escolher Ícone

Visite [Material Icons](https://fonts.google.com/icons) e escolha:

```jsx
// Exemplos:
'functions'       // Matemática
'science'         // Física
'biotech'         // Química
'nature'          // Biologia
'code'            // Programação
'history_edu'     // História
```

---

## 📝 Passo 2: Adicionar Card na Página Terminal

### 2.1 Abrir `src/pages/Terminal.jsx`

Localize o array `subjects`:

```jsx
const subjects = [
  {
    id: 'mathematics',
    name: 'Matemática',
    icon: 'functions',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    description: 'Álgebra, Geometria, Cálculo',
    path: '/math',
    topics: 12,
  },
  // ... outras matérias
];
```

### 2.2 Adicionar Nova Matéria

```jsx
const subjects = [
  // ... matérias existentes ...
  
  {
    id: 'chemistry',                // ID único (sem espaços)
    name: 'Química',                // Nome exibido
    icon: 'biotech',                // Ícone Material
    color: '#10b981',               // Cor primária
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    description: 'Orgânica, Inorgânica, Físico-Química',
    path: '/chemistry',             // Rota (sem espaços, lowercase)
    topics: 0,                      // Iniciar com 0
    comingSoon: true,               // REMOVER quando houver conteúdo
  },
];
```

**⚠️ IMPORTANTE**: Se `comingSoon: true`, o card ficará desabilitado até você criar o conteúdo.

---

## 🏗️ Passo 3: Criar Página Hub da Matéria

### 3.1 Criar Arquivo JSX

Criar: `src/pages/ChemistrySubject.jsx` (substituir "Chemistry" pelo nome da matéria)

### 3.2 Template Completo

```jsx
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './ChemistrySubject.css';

const ChemistrySubject = () => {
  const { navigateWithTransition } = useNavigation();

  // ✅ IMPORTANTE: Configurar cor da transição
  const handleNavigate = (path) => {
    navigateWithTransition(path, 'green'); // Usar cor da matéria
  };

  // ✅ Lista de tópicos
  const topics = [
    {
      id: 1,
      title: 'Química Orgânica',
      description: 'Estudo dos compostos de carbono e suas reações',
      icon: 'science',
      topics: 15,
      exercises: 120,
      difficulty: 'Intermediário',
      path: '/chemistry/organica',
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      disabled: false, // true se ainda não implementado
    },
    {
      id: 2,
      title: 'Química Inorgânica',
      description: 'Estudo dos elementos e compostos inorgânicos',
      icon: 'biotech',
      topics: 12,
      exercises: 100,
      difficulty: 'Básico',
      path: '/chemistry/inorganica',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      disabled: true, // ← Coming soon
    },
    // ... mais tópicos
  ];

  return (
    <div className="chemistry-subject-page">
      <NavigationBar />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => handleNavigate('/')} className="breadcrumb-link">
          <span className="material-icons">home</span>
          Início
        </button>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Química</span>
      </div>

      {/* Hero Section */}
      <div className="chemistry-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">biotech</span>
            QUÍMICA
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="chemistry-title">
            <span className="gradient-text">Química</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="chemistry-subtitle">
            Explore o mundo molecular através da química orgânica, inorgânica e físico-química
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={300}>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{topics.length}</div>
              <div className="stat-label">Tópicos</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">
                {topics.reduce((sum, t) => sum + t.exercises, 0)}
              </div>
              <div className="stat-label">Exercícios</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Topics Grid */}
      <section className="topics-section">
        <ScrollReveal>
          <h2 className="section-title">
            <span className="material-icons">book</span>
            Tópicos de Estudo
          </h2>
        </ScrollReveal>

        {/* ✅ IMPORTANTE: Grid com padding para glow */}
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <ScrollReveal key={topic.id} delay={index * 100}>
              <button
                onClick={() => !topic.disabled && handleNavigate(topic.path)}
                className={`topic-card-link ${topic.disabled ? 'disabled' : ''}`}
                disabled={topic.disabled}
                style={{
                  '--topic-gradient': topic.gradient,
                  '--topic-color': '#10b981', // Cor da matéria
                }}
              >
                <GlassCard className="topic-card-content">
                  {topic.disabled && (
                    <div className="coming-soon-badge">
                      <span className="material-icons">schedule</span>
                      Em Breve
                    </div>
                  )}

                  {/* Icon */}
                  <div className="topic-icon" style={{ background: topic.gradient }}>
                    <span className="material-icons">{topic.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="topic-title">{topic.title}</h3>
                  <p className="topic-description">{topic.description}</p>

                  {/* Stats */}
                  <div className="topic-stats">
                    <span className="topic-stat">
                      <span className="material-icons">article</span>
                      {topic.topics} tópicos
                    </span>
                    <span className="topic-stat">
                      <span className="material-icons">quiz</span>
                      {topic.exercises} exercícios
                    </span>
                  </div>

                  {/* Difficulty */}
                  <div className="topic-difficulty">{topic.difficulty}</div>

                  {/* Arrow */}
                  {!topic.disabled && (
                    <div className="topic-arrow">
                      <span className="material-icons">arrow_forward</span>
                    </div>
                  )}
                </GlassCard>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChemistrySubject;
```

---

## 🎨 Passo 4: Criar Arquivo CSS

### 4.1 Criar: `src/pages/ChemistrySubject.css`

```css
/* Chemistry Subject Page */
.chemistry-subject-page {
  min-height: 100vh;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 5vw, 2rem);
  overflow-x: hidden;
  width: 100%;
}

/* Breadcrumb */
.breadcrumb {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  flex-wrap: wrap;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease-out;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.breadcrumb-link:hover {
  color: #10b981; /* ← Cor da matéria */
  background: rgba(16, 185, 129, 0.1);
}

/* Hero Section */
.chemistry-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 6rem) 0;
  text-align: center;
}

.subject-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2));
  border: 2px solid rgba(16, 185, 129, 0.4);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
}

.chemistry-title {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 5s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Stats */
.stats-row {
  display: flex;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  flex-wrap: wrap;
  margin-top: 3rem;
}

.stat-box {
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  min-width: 150px;
  transition: all 0.3s ease-out;
}

.stat-box:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #10b981, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

/* ✅ Topics Grid - COM PADDING PARA GLOW */
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
  max-width: 100%;
  padding: clamp(2rem, 5vw, 3rem); /* ← CRÍTICO: Espaço para glow */
}

/* ✅ Topic Card - COM DROP-SHADOW */
.topic-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  filter: drop-shadow(0 0 0 transparent); /* ← Estado inicial */
}

.topic-card-link:not(.disabled):hover {
  transform: translateY(-8px);
  filter: drop-shadow(0 10px 40px rgba(16, 185, 129, 0.3))
          drop-shadow(0 0 60px rgba(52, 211, 153, 0.2)); /* ← Glow suave */
}

.topic-card-link:not(.disabled):active {
  transform: translateY(-12px) scale(0.97);
  filter: drop-shadow(0 15px 50px rgba(16, 185, 129, 0.4))
          drop-shadow(0 0 80px rgba(52, 211, 153, 0.3)); /* ← Glow intenso */
}

.topic-card-link.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.topic-card-content {
  height: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: relative;
}

/* Coming Soon Badge */
.coming-soon-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* Topic Icon */
.topic-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
}

.topic-icon .material-icons {
  font-size: 2.5rem;
  color: white;
}

/* Topic Content */
.topic-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.topic-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

/* Stats */
.topic-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.topic-stat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Arrow */
.topic-arrow {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-out;
}

.topic-card-link:hover .topic-arrow {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(52, 211, 153, 0.4));
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔗 Passo 5: Configurar Sistema Universal

### 5.1 Adicionar em `src/config/subjectsConfig.js`

**⚠️ NOVO NA V2.0**: Configuração centralizada para sidebar automático.

```jsx
export const SUBJECTS_CONFIG = {
  // ... subjects existentes ...
  
  chemistry: {
    id: 'chemistry',
    name: 'Química',
    icon: 'biotech',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    path: '/chemistry',
    topics: [
      {
        id: 'organica',
        title: 'Química Orgânica',
        icon: 'science',
        path: '/chemistry/organica',
        difficulty: 'Intermediário',
        duration: '45 min',
        gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      },
      // ... mais tópicos
    ],
  },
};
```

**Benefícios**: Sidebar detecta automaticamente, busca funciona, progress tracking integrado.

### 5.2 Configurar Rotas em `src/App.jsx`

Localizar as importações e adicionar:

```jsx
// Lazy load pages
const Terminal = lazy(() => import('./pages/Terminal'));
const MathSubject = lazy(() => import('./pages/MathSubject'));
const PhysicsSubject = lazy(() => import('./pages/PhysicsSubject'));
const ChemistrySubject = lazy(() => import('./pages/ChemistrySubject')); // ← ADICIONAR
```

Adicionar rota:

```jsx
<Routes>
  <Route path="/" element={<Terminal />} />
  <Route path="/math" element={<MathSubject />} />
  <Route path="/physics" element={<PhysicsSubject />} />
  <Route path="/chemistry" element={<ChemistrySubject />} /> {/* ← ADICIONAR */}
  
  {/* Tópicos virão depois */}
</Routes>
```

---

## 🧪 Passo 6: Testar

### 6.1 Build e Verificar

```bash
npm run build
```

**Verificar**:
- ✅ Build sem erros
- ✅ Sem warnings de linter

### 6.2 Testar Funcionalidades

1. ✅ Card aparece na página Terminal
2. ✅ Clicar no card navega para `/chemistry`
3. ✅ Breadcrumb funciona (voltar para home)
4. ✅ Glow aparece ao passar mouse sobre cards
5. ✅ Glow NÃO é cortado nas bordas
6. ✅ Cards "Coming Soon" ficam desabilitados
7. ✅ Responsivo em mobile/desktop

---

## 📄 Passo 7: Criar Página de Tópico

Quando estiver pronto para criar conteúdo de um tópico:

1. Criar: `src/pages/ChemistryOrganic.jsx`
2. Adicionar em `subjectsConfig.js` (já feito no Passo 5.1)
3. Adicionar rota: `/chemistry/organica` em `App.jsx`
4. **Implementar Progress Tracking**:

```jsx
import { useProgress } from '../utils/progressTracker';

const ChemistryOrganic = () => {
  const { markVisited, markCompleted, isCompleted } = 
    useProgress('chemistry', 'organica');
  
  useEffect(() => {
    markVisited(); // Marca como visitado ao carregar
  }, []);
  
  return (
    <div>
      {/* Conteúdo */}
      
      <button onClick={() => markCompleted(!isCompleted)}>
        {isCompleted ? 'Tópico Completo ✓' : 'Marcar como Completo'}
      </button>
    </div>
  );
};
```

5. Usar componentes `MathFormula`, `TextWithMath`, etc.
6. Seguir estrutura de `PhysicsOptics.jsx` ou `PhysicsElectromagnetism.jsx`

**Ver**: 
- [SIDEBAR_SYSTEM.md](./SIDEBAR_SYSTEM.md) - Progress tracking
- [05-SISTEMA-DE-FORMULAS-MATHJAX.md](./05-SISTEMA-DE-FORMULAS-MATHJAX.md) - Fórmulas

---

## ✅ Checklist Final

Antes de considerar completo:

- [ ] **Subject adicionado em `subjectsConfig.js`** (v2.0)
- [ ] **Topics definidos em `subjectsConfig.js`** (v2.0)
- [ ] Card adicionado em `Terminal.jsx` (se aplicável)
- [ ] Página hub criada (`ChemistrySubject.jsx`)
- [ ] CSS criado com **padding no grid**
- [ ] Rota configurada em `App.jsx`
- [ ] Cores e gradientes consistentes
- [ ] Build sem erros
- [ ] **Sidebar detecta automaticamente** (v2.0)
- [ ] **Busca funciona no sidebar** (v2.0)
- [ ] **Progress tracking implementado** (v2.0)
- [ ] Testado em mobile e desktop
- [ ] Glow funcionando corretamente (não cortado)
- [ ] Breadcrumb funcional
- [ ] Stats corretos (contagem de tópicos)

---

## 🚨 Problemas Comuns

### Glow Cortado nas Bordas

**Causa**: Falta de padding no grid

**Solução**: Adicionar ao CSS:
```css
.topics-grid {
  padding: clamp(2rem, 5vw, 3rem); /* ← OBRIGATÓRIO */
}
```

### Hover Area Expandida

**Causa**: Uso de pseudo-elemento com `inset` negativo

**Solução**: Usar `drop-shadow` ao invés de `::before`:
```css
.topic-card-link:hover {
  filter: drop-shadow(0 10px 40px rgba(...));
}
```

### Card Não Clicável

**Causa**: `button` sem `cursor: pointer` ou com `disabled` incorreto

**Solução**: Verificar CSS e lógica de `disabled`

---

## 📚 Recursos Relacionados

- **[SIDEBAR_SYSTEM.md](./SIDEBAR_SYSTEM.md)** - ⭐ Sistema universal v2.0 (NOVO)
- [03-SISTEMA-DE-CARDS-E-GLOW.md](./03-SISTEMA-DE-CARDS-E-GLOW.md) - Detalhes sobre glow
- [04-PADROES-DE-DESIGN-E-CSS.md](./04-PADROES-DE-DESIGN-E-CSS.md) - Paleta de cores
- [05-SISTEMA-DE-FORMULAS-MATHJAX.md](./05-SISTEMA-DE-FORMULAS-MATHJAX.md) - Para páginas de conteúdo

---

**Próximo**: [SIDEBAR_SYSTEM.md](./SIDEBAR_SYSTEM.md) ou [03-SISTEMA-DE-CARDS-E-GLOW.md](./03-SISTEMA-DE-CARDS-E-GLOW.md)

