# 📐 Math Formula Examples - Quick Reference

## Basic Usage

### Import
```jsx
import MathFormula from '../components/MathFormula';
```

## Numbers Complexos Examples

### Forma Algébrica
```jsx
<MathFormula display>
  z = a + bi
</MathFormula>

<MathFormula display>
  z = 3 + 4i
</MathFormula>
```

### Forma Trigonométrica
```jsx
<MathFormula display numbered>
  z = r(\cos\theta + i\sin\theta)
</MathFormula>

<MathFormula display>
  z = r\,\text{cis}\,\theta
</MathFormula>
```

### Forma Exponencial  
```jsx
<MathFormula display>
  z = re^{i\theta}
</MathFormula>
```

### Módulo
```jsx
<MathFormula display numbered>
  |z| = \sqrt{a^2 + b^2}
</MathFormula>

<MathFormula display>
  |z_1 \cdot z_2| = |z_1| \cdot |z_2|
</MathFormula>
```

### Argumento
```jsx
<MathFormula display>
  \theta = \arg(z) = \arctan\left(\frac{b}{a}\right)
</MathFormula>

<MathFormula display>
  \arg(z_1 \cdot z_2) = \arg(z_1) + \arg(z_2)
</MathFormula>
```

### Operações
```jsx
<MathFormula display>
  (a + bi) + (c + di) = (a + c) + (b + d)i
</MathFormula>

<MathFormula display>
  (a + bi)(c + di) = (ac - bd) + (ad + bc)i
</MathFormula>

<MathFormula display>
  \frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{c^2 + d^2}
</MathFormula>
```

### Conjugado
```jsx
<MathFormula display>
  \overline{z} = a - bi
</MathFormula>

<MathFormula display>
  z \cdot \overline{z} = |z|^2 = a^2 + b^2
</MathFormula>
```

### Fórmula de Euler
```jsx
<MathFormula display numbered>
  e^{i\theta} = \cos\theta + i\sin\theta
</MathFormula>

<MathFormula display>
  e^{i\pi} + 1 = 0
</MathFormula>
```

## Polinômios Examples

### Definição
```jsx
<MathFormula display>
  P(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0
</MathFormula>

<MathFormula>
  <MathFormula display>
  P(x) = \sum_{k=0}^{n} a_kx^k
</MathFormula>
```

### Teorema do Resto
```jsx
<MathFormula display numbered>
  P(x) = (x - a) \cdot Q(x) + R, \quad R = P(a)
</MathFormula>
```

### Teorema de D'Alembert
```jsx
<MathFormula display>
  P(a) = 0 \iff (x - a) \mid P(x)
</MathFormula>
```

### Teorema das Raízes Racionais
```jsx
<MathFormula display>
  \text{Se } \frac{p}{q} \text{ é raiz, então } p \mid a_0 \text{ e } q \mid a_n
</MathFormula>
```

### Divisão
```jsx
<MathFormula display>
  \frac{P(x)}{D(x)} = Q(x) + \frac{R(x)}{D(x)}
</MathFormula>
```

### Produtos Notáveis
```jsx
<MathFormula display>
  (a + b)^2 = a^2 + 2ab + b^2
</MathFormula>

<MathFormula display>
  a^2 - b^2 = (a + b)(a - b)
</MathFormula>

<MathFormula display>
  a^3 + b^3 = (a + b)(a^2 - ab + b^2)
</MathFormula>

<MathFormula display>
  a^3 - b^3 = (a - b)(a^2 + ab + b^2)
</MathFormula>
```

### Binômio de Newton
```jsx
<MathFormula display numbered>
  (a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k}b^k
</MathFormula>
```

## Geometria Analítica Examples

### Distância entre Pontos
```jsx
<MathFormula display numbered>
  d(P_1, P_2) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
</MathFormula>

<MathFormula display>
  d = \sqrt{\Delta x^2 + \Delta y^2}
</MathFormula>
```

### Ponto Médio
```jsx
<MathFormula display>
  M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)
</MathFormula>
```

### Coeficiente Angular
```jsx
<MathFormula display>
  m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}
</MathFormula>

<MathFormula display>
  \tan\alpha = m
</MathFormula>
```

### Equação da Reta - Formas
```jsx
<!-- Forma Reduzida -->
<MathFormula display>
  y = mx + b
</MathFormula>

<!-- Forma Geral -->
<MathFormula display>
  Ax + By + C = 0
</MathFormula>

<!-- Forma Segmentária -->
<MathFormula display>
  \frac{x}{p} + \frac{y}{q} = 1
</MathFormula>

<!-- Ponto-Inclinação -->
<MathFormula display>
  y - y_1 = m(x - x_1)
</MathFormula>
```

### Distância Ponto-Reta
```jsx
<MathFormula display numbered>
  d(P, r) = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}
</MathFormula>
```

### Retas Paralelas e Perpendiculares
```jsx
<MathFormula display>
  r_1 \parallel r_2 \iff m_1 = m_2
</MathFormula>

<MathFormula display>
  r_1 \perp r_2 \iff m_1 \cdot m_2 = -1
</MathFormula>
```

### Ângulo entre Retas
```jsx
<MathFormula display>
  \tan\theta = \left|\frac{m_2 - m_1}{1 + m_1m_2}\right|
</MathFormula>
```

### Área do Triângulo
```jsx
<MathFormula display numbered>
  A = \frac{1}{2}\left|\det\begin{pmatrix}
    x_1 & y_1 & 1 \\
    x_2 & y_2 & 1 \\
    x_3 & y_3 & 1
  \end{pmatrix}\right|
</MathFormula>
```

### Determinantes
```jsx
<!-- 2x2 -->
<MathFormula display>
  \det(A) = \begin{vmatrix}
    a & b \\
    c & d
  \end{vmatrix} = ad - bc
</MathFormula>

<!-- 3x3 (Sarrus) -->
<MathFormula display numbered>
  \det(A) = \begin{vmatrix}
    a & b & c \\
    d & e & f \\
    g & h & i
  \end{vmatrix} = aei + bfg + cdh - ceg - bdi - afh
</MathFormula>
```

### Colinearidade
```jsx
<MathFormula display>
  \text{Pontos colineares} \iff \begin{vmatrix}
    x_1 & y_1 & 1 \\
    x_2 & y_2 & 1 \\
    x_3 & y_3 & 1
  \end{vmatrix} = 0
</MathFormula>
```

## Special Formatting

### Inline Math
```jsx
O número complexo <MathFormula>z = 3 + 4i</MathFormula> tem módulo 
<MathFormula>|z| = 5</MathFormula>.
```

### With Text
```jsx
<MathFormula display>
  \text{Se } P(a) = 0, \text{ então } a \text{ é raiz de } P(x)
</MathFormula>
```

### Systems of Equations
```jsx
<MathFormula display>
  \begin{cases}
    ax + by = c \\
    dx + ey = f
  \end{cases}
</MathFormula>
```

### Piecewise Functions
```jsx
<MathFormula display>
  f(x) = \begin{cases}
    x^2 & \text{se } x \geq 0 \\
    -x^2 & \text{se } x < 0
  \end{cases}
</MathFormula>
```

### Limits
```jsx
<MathFormula display>
  \lim_{x \to \infty} \frac{1}{x} = 0
</MathFormula>
```

### Derivatives
```jsx
<MathFormula display>
  \frac{d}{dx}(x^n) = nx^{n-1}
</MathFormula>
```

### Integrals
```jsx
<MathFormula display>
  \int_{a}^{b} f(x)\,dx = F(b) - F(a)
</MathFormula>
```

## Greek Letters Cheat Sheet

```
\alpha α    \beta β      \gamma γ    \delta δ
\epsilon ε  \zeta ζ      \eta η      \theta θ
\iota ι     \kappa κ     \lambda λ   \mu μ
\nu ν       \xi ξ        \omicron o  \pi π
\rho ρ      \sigma σ     \tau τ      \upsilon υ
\phi φ      \chi χ       \psi ψ      \omega ω

Uppercase: \Gamma Γ, \Delta Δ, \Theta Θ, \Lambda Λ, etc.
```

## Common Operators

```
\pm ±           \mp ∓           \times ×        \div ÷
\cdot ·         \ast ∗          \circ ∘         \bullet •
\leq ≤          \geq ≥          \neq ≠          \approx ≈
\equiv ≡        \propto ∝       \sim ∼          \cong ≅
\parallel ∥     \perp ⊥         \subset ⊂       \supset ⊃
\in ∈           \notin ∉        \forall ∀       \exists ∃
\infty ∞        \partial ∂      \nabla ∇        \emptyset ∅
```

## Special Constructs

```jsx
// Fractions
\frac{numerator}{denominator}
\dfrac{a}{b}  // Display-style fraction

// Roots
\sqrt{x}
\sqrt[n]{x}   // nth root

// Subscripts & Superscripts
x_1, x_2, x_n
x^2, x^{n+1}
x_1^2

// Overline & Underline
\overline{AB}
\underline{text}

// Vectors & Arrows
\vec{v}
\overrightarrow{AB}

// Braces
\{, \}, \langle, \rangle

// Spacing
\,    // small space
\quad // medium space
\qquad // large space
```

---

**Pro Tip**: Preview your formulas at https://www.mathjax.org/#demo to test syntax before adding to components!

