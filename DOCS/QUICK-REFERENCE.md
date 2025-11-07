# ⚡ Referência Rápida - L2 Educa

## Comandos Essenciais

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor local

# Build
npm run build            # Build de produção

# Preview
npm run preview          # Testar build localmente
```

---

## 🎨 Cores por Matéria

```css
/* Matemática */
--color: #6366f1;
--gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
--glow: rgba(168, 85, 247, 0.3), rgba(99, 102, 241, 0.2);

/* Física */
--color: #ef4444;
--gradient: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%);
--glow: rgba(239, 68, 68, 0.3), rgba(245, 158, 11, 0.2);

/* Química */
--color: #10b981;
--gradient: linear-gradient(135deg, #10b981 0%, #34d399 100%);
--glow: rgba(16, 185, 129, 0.3), rgba(52, 211, 153, 0.2);

/* Biologia */
--color: #22c55e;
--gradient: linear-gradient(135deg, #22c55e 0%, #84cc16 100%);
--glow: rgba(34, 197, 94, 0.3), rgba(132, 204, 22, 0.2);
```

---

## 🎴 Template de Card com Glow

```css
.card-wrapper {
  filter: drop-shadow(0 0 0 transparent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-wrapper:hover {
  transform: translateY(-8px);
  filter: drop-shadow(0 10px 40px rgba(168, 85, 247, 0.3))
          drop-shadow(0 0 60px rgba(99, 102, 241, 0.2));
}

.card-wrapper:active {
  transform: translateY(-12px) scale(0.97);
  filter: drop-shadow(0 15px 50px rgba(168, 85, 247, 0.4))
          drop-shadow(0 0 80px rgba(99, 102, 241, 0.3));
}
```

---

## 📐 Template de Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  padding: clamp(2rem, 5vw, 3rem); /* ← CRÍTICO */
  width: 100%;
  max-width: 100%;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
```

---

## 💎 Glassmorphism

```css
.glass-element {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
}
```

---

## 📝 Valores Responsivos (clamp)

```css
/* Títulos */
h1: clamp(2.5rem, 6vw, 4rem);       /* 40-64px */
h2: clamp(2rem, 5vw, 3rem);         /* 32-48px */
h3: clamp(1.5rem, 4vw, 2rem);       /* 24-32px */

/* Texto */
p: clamp(1rem, 2.5vw, 1.2rem);      /* 16-19px */

/* Espaçamento */
padding: clamp(1.5rem, 4vw, 3rem);
gap: clamp(1.5rem, 3vw, 2.5rem);
margin: clamp(2rem, 5vw, 4rem);
```

---

## 🧮 Fórmulas MathJax

```jsx
/* Display (centralizada) */
<MathFormula display>
  x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
</MathFormula>

/* Inline (no texto) */
<InlineFormula>z = a + bi</InlineFormula>

/* Texto com fórmulas */
<TextWithMath>
  O número complexo $z = a + bi$ onde $i^2 = -1$
</TextWithMath>
```

---

## 🔄 Navegação com Transição

```jsx
import { useNavigation } from '../contexts/NavigationContext';

const { navigateWithTransition } = useNavigation();

// Usar ao invés de navigate()
navigateWithTransition('/math', 'purple');
navigateWithTransition('/physics', 'red');
navigateWithTransition('/chemistry', 'green');
```

---

## 🎬 Animação de Scroll

```jsx
import ScrollReveal from '../components/ScrollReveal';

<ScrollReveal delay={0}>
  <h1>Aparece ao scrollar</h1>
</ScrollReveal>

<ScrollReveal delay={100}>
  <p>Aparece 100ms depois</p>
</ScrollReveal>
```

---

## 🚨 Problemas Comuns

### Glow cortado
```css
/* ❌ ERRADO */
.grid { padding: 0; }

/* ✅ CORRETO */
.grid { padding: clamp(2rem, 5vw, 3rem); }
```

### Hover muito longe
```css
/* ❌ ERRADO */
.card::before { inset: -40px; }

/* ✅ CORRETO */
.card:hover { filter: drop-shadow(...); }
```

### Shimmer vaza
```css
/* ❌ ERRADO */
.card { overflow: visible; }

/* ✅ CORRETO */
.card { overflow: hidden; }
```

---

## 📱 Breakpoints

```css
/* Mobile pequeno */
@media (max-width: 480px) { }

/* Mobile/Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

---

## ✅ Checklist Nova Feature

- [ ] Build sem erros (`npm run build`)
- [ ] Testado em mobile
- [ ] Testado em desktop
- [ ] Glow funcionando (não cortado)
- [ ] Responsivo (todos os breakpoints)
- [ ] Cores consistentes com matéria
- [ ] Transições suaves
- [ ] Fórmulas renderizando (se aplicável)
- [ ] Performance OK (FPS > 30)

---

## 📚 Guias Completos

1. [Estrutura do Site](./01-ESTRUTURA-DO-SITE.md)
2. [Criar Nova Página](./02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md)
3. [Sistema de Cards e Glow](./03-SISTEMA-DE-CARDS-E-GLOW.md)

---

## 🎯 Regras de Ouro

### ✅ SEMPRE
- Usar `drop-shadow` para glow
- Adicionar padding nos grids
- Usar `clamp()` para responsividade
- Testar em mobile E desktop
- Seguir paleta de cores da matéria

### ❌ NUNCA
- Usar `inset` negativo grande
- Esquecer padding do grid
- Ignorar mobile
- Hardcodar valores
- Criar animações infinitas não intencionais

---

**Última atualização**: 27 de Outubro, 2025

