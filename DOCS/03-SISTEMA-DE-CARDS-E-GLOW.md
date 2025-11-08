# 🎴 Sistema de Cards e Glow Effects

## Guia Definitivo para Cards com Glow Perfeito

Este documento explica **tudo** sobre o sistema de cards e efeitos de glow no L2 Educa, incluindo problemas comuns e soluções.

---

## 📖 Índice

1. [Conceito de Glow](#conceito-de-glow)
2. [Implementação Correta](#implementação-correta)
3. [Anatomia de um Card](#anatomia-de-um-card)
4. [Sistema de Grid](#sistema-de-grid)
5. [Problemas Comuns e Soluções](#problemas-comuns-e-soluções)
6. [Exemplos Práticos](#exemplos-práticos)
7. [Troubleshooting](#troubleshooting)

---

## 🌟 Conceito de Glow

### O Que É

O "glow" (brilho) é um efeito visual que:
- Aparece ao passar o mouse sobre um card
- Cria um halo luminoso ao redor do elemento
- Intensifica ao clicar
- **Deve se fundir suavemente com o fundo** (sem bordas de corte)

### Por Que é Importante

1. **Feedback Visual** - Usuário sabe onde está o mouse
2. **Hierarquia** - Destaca elemento ativo
3. **Estética Premium** - Aparência "acid liquid glass"
4. **Engajamento** - Convida à interação

---

## ✅ Implementação Correta

### Método: CSS `filter: drop-shadow()`

**Por que drop-shadow?**

✅ Não afeta a hit area (área clicável)  
✅ Fade natural integrado  
✅ Não precisa de pseudo-elementos  
✅ GPU accelerated  
✅ Sem vazamento de conteúdo  

### Template Base

```css
.card {
  /* Estado inicial: sem glow */
  filter: drop-shadow(0 0 0 transparent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px); /* Eleva o card */
  
  /* Glow multi-camada */
  filter: 
    drop-shadow(0 10px 40px rgba(168, 85, 247, 0.3))  /* Camada profunda */
    drop-shadow(0 0 60px rgba(99, 102, 241, 0.2));     /* Camada difusa */
}

.card:active {
  transform: translateY(-12px) scale(0.97); /* Pressiona levemente */
  
  /* Glow intensificado */
  filter: 
    drop-shadow(0 15px 50px rgba(168, 85, 247, 0.4))
    drop-shadow(0 0 80px rgba(99, 102, 241, 0.3));
}
```

### Cores por Matéria

```css
/* Matemática (Purple/Violet) */
drop-shadow(0 10px 40px rgba(168, 85, 247, 0.3))
drop-shadow(0 0 60px rgba(99, 102, 241, 0.2))

/* Física (Red/Orange) */
drop-shadow(0 10px 40px rgba(239, 68, 68, 0.3))
drop-shadow(0 0 60px rgba(245, 158, 11, 0.2))

/* Química (Green/Emerald) */
drop-shadow(0 10px 40px rgba(16, 185, 129, 0.3))
drop-shadow(0 0 60px rgba(52, 211, 153, 0.2))
```

---

## 🏗️ Anatomia de um Card

### Estrutura HTML/JSX

```jsx
<button className="card-wrapper">
  <GlassCard className="card-content">
    {/* Icon */}
    <div className="card-icon">
      <span className="material-icons">functions</span>
    </div>
    
    {/* Title */}
    <h3 className="card-title">Título do Card</h3>
    
    {/* Description */}
    <p className="card-description">Descrição breve do conteúdo</p>
    
    {/* Stats */}
    <div className="card-stats">
      <span>10 tópicos</span>
      <span>50 exercícios</span>
    </div>
    
    {/* Arrow */}
    <div className="card-arrow">
      <span className="material-icons">arrow_forward</span>
    </div>
  </GlassCard>
</button>
```

### Camadas de Estilo

```
┌─────────────────────────────────┐
│ .card-wrapper                   │ ← drop-shadow aplicado aqui
│  (button/Link)                  │
│                                 │
│  ┌───────────────────────────┐ │
│  │ .card-content (GlassCard) │ │ ← glassmorphism + padding
│  │                           │ │
│  │  [Icon]                   │ │
│  │  [Title]                  │ │
│  │  [Description]            │ │
│  │  [Stats]                  │ │
│  │  [Arrow]                  │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

## 📐 Sistema de Grid

### Por Que Padding é Crítico

O `drop-shadow` precisa de **espaço** para se estender além do card. Sem padding, ele é cortado nas bordas do grid container.

### Anatomia do Grid

```
┌─────────────────────────────────────────┐
│ Grid Container                          │
│                                         │
│  (padding: 2-3rem) ← CRÍTICO!          │
│  ┌───────┐  ┌───────┐  ┌───────┐      │
│  │ Card  │  │ Card  │  │ Card  │      │
│  │  ╱╲   │  │  ╱╲   │  │  ╱╲   │      │
│  │ ╱  ╲  │  │ ╱  ╲  │  │ ╱  ╲  │      │
│  │ CARD  │  │ CARD  │  │ CARD  │      │
│  │ ╲  ╱  │  │ ╲  ╱  │  │ ╲  ╱  │      │
│  │  ╲╱   │  │  ╲╱   │  │  ╲╱   │      │
│  └───────┘  └───────┘  └───────┘      │
│                                         │
│  ← Espaço para glow em todos os lados  │
└─────────────────────────────────────────┘
```

### Template de Grid Correto

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  
  /* ✅ OBRIGATÓRIO: Padding para glow */
  padding: clamp(2rem, 5vw, 3rem);
  
  width: 100%;
  max-width: 100%;
}
```

### Valores de Padding

| Viewport | Padding | Quando Usar |
|----------|---------|-------------|
| **2rem** (32px) | Mobile pequeno (< 400px) | Mínimo necessário |
| **~2.5rem** (40px) | Tablet (400-600px) | Proporcional ao viewport |
| **3rem** (48px) | Desktop (> 600px) | Máximo conforto |

**Regra**: Usar `clamp(2rem, 5vw, 3rem)` para adaptar automaticamente.

---

## ❌ Problemas Comuns e Soluções

### Problema 1: Glow Cortado nas Bordas

**Sintomas**:
- Glow aparece como "linha reta" nas laterais/base
- Efeito "corte" visível

**Causa**:
```css
.grid-container {
  padding: 0; /* ❌ SEM ESPAÇO */
}
```

**Solução**:
```css
.grid-container {
  padding: clamp(2rem, 5vw, 3rem); /* ✅ COM ESPAÇO */
}
```

---

### Problema 2: Hover Area Expandida

**Sintomas**:
- Hover ativa muito longe do card
- Glow aparece antes do mouse estar sobre o elemento

**Causa**:
```css
.card::before {
  inset: -40px; /* ❌ Expandiu hit area */
  background: ...;
  filter: blur(30px);
}
```

**Solução**: Usar `drop-shadow` ao invés de pseudo-elemento:
```css
.card:hover {
  filter: drop-shadow(...); /* ✅ Não afeta hit area */
}
```

---

### Problema 3: Animação Infinita

**Sintomas**:
- Glow pisca/loop indefinidamente
- Animação muito rápida

**Causa**:
```css
@keyframes loop-infinito {
  0% { inset: -20px; }
  50% { inset: -60px; } /* ❌ Muda layout */
  100% { inset: -20px; }
}

.card::before {
  animation: loop-infinito 0.5s infinite; /* ❌ INFINITO */
}
```

**Solução**: Usar apenas `transition`:
```css
.card {
  transition: all 0.4s ease; /* ✅ Executa uma vez */
}
```

---

### Problema 4: Shimmer/Border Vaza

**Sintomas**:
- Efeito shimmer (::after) vaza para fora do card
- Border animada sai dos limites

**Causa**:
```css
.card {
  overflow: visible; /* ❌ Permite vazamento */
}
```

**Solução**:
```css
.card {
  overflow: hidden; /* ✅ Contém efeitos internos */
}

/* O drop-shadow no elemento pai não é afetado */
```

---

### Problema 5: Grid Muito Espaçado

**Sintomas**:
- Espaço excessivo entre cards
- Layout "quebrado"

**Causa**:
```css
.grid-container {
  gap: 4rem; /* ❌ Muito grande */
}
```

**Solução**:
```css
.grid-container {
  gap: clamp(1.5rem, 3vw, 2.5rem); /* ✅ Responsivo */
}
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Card de Matéria (Terminal)

```jsx
// Terminal.jsx
<button
  className="subject-card"
  onClick={() => navigate('/math')}
  style={{
    '--subject-gradient': 'linear-gradient(135deg, #6366f1, #a855f7)',
  }}
>
  <GlassCard className="subject-card-inner">
    <div className="folder-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
      <span className="material-icons">functions</span>
    </div>
    <h3>Matemática</h3>
    <p>Álgebra, Geometria, Cálculo</p>
  </GlassCard>
</button>
```

```css
/* Terminal.css */
.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  padding: clamp(2rem, 5vw, 3rem); /* ← PADDING */
}

.subject-card {
  filter: drop-shadow(0 0 0 transparent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.subject-card:hover {
  transform: translateY(-8px);
  filter: drop-shadow(0 10px 40px var(--subject-glow, rgba(168, 85, 247, 0.3)))
          drop-shadow(0 0 60px rgba(99, 102, 241, 0.2));
}

.subject-card-inner {
  overflow: hidden; /* ← Contém shimmer */
}
```

---

### Exemplo 2: Card de Tópico (MathSubject)

```jsx
// MathSubject.jsx
<button
  className="topic-card-link"
  onClick={() => navigate('/math/numeros-complexos')}
  style={{
    '--topic-gradient': 'linear-gradient(135deg, #6366f1, #a855f7)',
  }}
>
  <GlassCard className="topic-card-content">
    <div className="topic-icon">
      <span className="material-icons">calculate</span>
    </div>
    <h3>Números Complexos</h3>
    <p>Números na forma a + bi</p>
  </GlassCard>
</button>
```

```css
/* MathSubject.css */
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 4vw, 2.5rem);
  padding: clamp(2rem, 5vw, 3rem); /* ← PADDING */
}

.topic-card-link {
  filter: drop-shadow(0 0 0 transparent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.topic-card-link:hover {
  transform: translateY(-8px);
  filter: drop-shadow(0 10px 40px rgba(168, 85, 247, 0.3))
          drop-shadow(0 0 60px rgba(99, 102, 241, 0.2));
}
```

---

## 🔍 Troubleshooting

### Checklist de Diagnóstico

Quando o glow não estiver funcionando:

1. **[ ] Verificar padding do grid**
   ```css
   .grid { padding: clamp(2rem, 5vw, 3rem); }
   ```

2. **[ ] Verificar uso de drop-shadow**
   ```css
   .card:hover { filter: drop-shadow(...); }
   ```

3. **[ ] Verificar overflow do card**
   ```css
   .card-content { overflow: hidden; }
   ```

4. **[ ] Verificar estados hover/active**
   ```css
   .card:hover { } /* Deve existir */
   .card:active { } /* Opcional mas recomendado */
   ```

5. **[ ] Verificar transition**
   ```css
   .card { transition: all 0.4s ease; }
   ```

6. **[ ] Verificar se não há pseudo-elementos conflitantes**
   ```css
   /* ❌ Remover se existir */
   .card::before { inset: -40px; }
   ```

---

### Ferramenta: Inspetor de Glow

Use o DevTools para verificar:

```js
// Abrir console e colar:
const card = document.querySelector('.subject-card');
const computed = window.getComputedStyle(card);

console.log('Filter:', computed.filter);
console.log('Transform:', computed.transform);
console.log('Overflow:', computed.overflow);

const grid = card.parentElement;
console.log('Grid padding:', window.getComputedStyle(grid).padding);
```

**Valores esperados**:
- `filter: drop-shadow(...)` no hover
- `transform: translateY(-8px)` no hover
- `padding: 32px` (ou similar) no grid

---

## 📊 Comparação de Métodos

| Método | Vantagens | Desvantagens | Recomendado? |
|--------|-----------|--------------|--------------|
| **drop-shadow** | ✅ Não afeta hit area<br>✅ Fade natural<br>✅ GPU acelerado | ❌ Menos controle fino | ✅ **SIM** |
| **box-shadow** | ✅ Controle preciso<br>✅ Multi-layer fácil | ❌ Só funciona em elementos retangulares<br>❌ Não segue forma do elemento | ⚠️ Apenas para glassmorphism interno |
| **::before + blur** | ✅ Controle total | ❌ Expande hit area<br>❌ Complexo<br>❌ Causa bugs | ❌ **NÃO USAR** |

---

## ✅ Regras de Ouro

### ✅ SEMPRE Fazer

1. Usar `filter: drop-shadow()` para glow
2. Adicionar `padding: clamp(2rem, 5vw, 3rem)` nos grids
3. Manter `overflow: hidden` nos cards internos (GlassCard)
4. Usar `transition` (não `animation`)
5. Testar em mobile e desktop
6. Verificar todas as extremidades (esquerda, direita, inferior)

### ❌ NUNCA Fazer

1. Usar pseudo-elementos com `inset` negativo grande (>10px)
2. Colocar `overflow: visible` em cards
3. Esquecer padding nos grids
4. Criar animações `@keyframes` infinitas não intencionais
5. Ignorar estados de hover/active
6. Hardcodar valores (sempre usar `clamp()`)

---

## 📚 Arquivos de Referência

- `src/pages/Terminal.css` - Cards de matérias
- `src/pages/MathSubject.css` - Cards de tópicos
- `src/pages/PhysicsSubject.css` - Cards de tópicos
- `src/components/GlassCard.css` - Glassmorphism base

---

## 🎯 Resumo

1. **Glow = `drop-shadow`** (não `::before`)
2. **Grid = `padding: clamp(2rem, 5vw, 3rem)`** (sempre)
3. **Card interno = `overflow: hidden`** (contém shimmer)
4. **Transição = `0.4s cubic-bezier`** (suave)
5. **Testar = todas as extremidades** (bordas + cantos)

---

**Próximo**: [04-PADROES-DE-DESIGN-E-CSS.md](./04-PADROES-DE-DESIGN-E-CSS.md)

