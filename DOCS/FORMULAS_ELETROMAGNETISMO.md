# Fórmulas de Eletromagnetismo

Este documento contém todas as fórmulas extraídas do tópico de Eletromagnetismo, com seus respectivos nomes e descrição de termos.

---

## 1. ELETROSTÁTICA

### 1.1. Quantização da Carga Elétrica
**Fórmula:** `Q = n · e`

**Termos:**
- **Q**: Carga elétrica total (Coulomb - C)
- **n**: Número de elétrons (quantidade inteira)
- **e**: Carga elementar = 1,6 × 10⁻¹⁹ C

---

### 1.2. Lei de Coulomb
**Fórmula:** `F = k · |q₁ · q₂| / r²`

**Termos:**
- **F**: Força elétrica entre as cargas (Newton - N)
- **k**: Constante eletrostática no vácuo = 9 × 10⁹ N·m²/C²
- **q₁**: Primeira carga elétrica (Coulomb - C)
- **q₂**: Segunda carga elétrica (Coulomb - C)
- **r**: Distância entre as cargas (metro - m)

---

### 1.3. Campo Elétrico (definição geral)
**Fórmula:** `E⃗ = F⃗ / q`

**Termos:**
- **E⃗**: Vetor campo elétrico (Newton por Coulomb - N/C ou Volt por metro - V/m)
- **F⃗**: Vetor força elétrica (Newton - N)
- **q**: Carga elétrica de prova (Coulomb - C)

---

### 1.4. Campo Elétrico de Carga Puntiforme
**Fórmula:** `E = k · |Q| / r²`

**Termos:**
- **E**: Intensidade do campo elétrico (N/C ou V/m)
- **k**: Constante eletrostática = 9 × 10⁹ N·m²/C²
- **Q**: Carga elétrica geradora do campo (Coulomb - C)
- **r**: Distância da carga ao ponto (metro - m)

---

## 2. CORRENTE ELÉTRICA

### 2.1. Intensidade da Corrente Elétrica
**Fórmula:** `i = ΔQ / Δt`

**Termos:**
- **i**: Intensidade da corrente elétrica (Ampère - A)
- **ΔQ**: Quantidade de carga elétrica que atravessa uma seção (Coulomb - C)
- **Δt**: Intervalo de tempo (segundo - s)

---

## 3. TENSÃO E RESISTÊNCIA

### 3.1. Tensão Elétrica (Diferença de Potencial)
**Fórmula:** `U = W / Q`

**Termos:**
- **U**: Tensão elétrica ou diferença de potencial (Volt - V)
- **W**: Energia ou trabalho elétrico (Joule - J)
- **Q**: Carga elétrica (Coulomb - C)

---

### 3.2. Segunda Lei de Ohm (Resistência do Condutor)
**Fórmula:** `R = ρ · L / A`

**Termos:**
- **R**: Resistência elétrica (Ohm - Ω)
- **ρ**: Resistividade do material (Ohm · metro - Ω·m)
- **L**: Comprimento do condutor (metro - m)
- **A**: Área da seção transversal do condutor (metro quadrado - m²)

---

### 3.3. Primeira Lei de Ohm
**Fórmula:** `U = R · i`

**Forma alternativa:** `i = U / R`

**Termos:**
- **U**: Tensão elétrica (Volt - V)
- **R**: Resistência elétrica (Ohm - Ω)
- **i**: Intensidade da corrente elétrica (Ampère - A)

---

## 4. POTÊNCIA E ENERGIA ELÉTRICA

### 4.1. Potência Elétrica (fórmula principal)
**Fórmula:** `P = U · i`

**Termos:**
- **P**: Potência elétrica (Watt - W)
- **U**: Tensão elétrica (Volt - V)
- **i**: Intensidade da corrente elétrica (Ampère - A)

---

### 4.2. Potência Elétrica (em função da resistência e corrente)
**Fórmula:** `P = R · i²`

**Termos:**
- **P**: Potência elétrica (Watt - W)
- **R**: Resistência elétrica (Ohm - Ω)
- **i**: Intensidade da corrente elétrica (Ampère - A)

---

### 4.3. Potência Elétrica (em função da tensão e resistência)
**Fórmula:** `P = U² / R`

**Termos:**
- **P**: Potência elétrica (Watt - W)
- **U**: Tensão elétrica (Volt - V)
- **R**: Resistência elétrica (Ohm - Ω)

---

### 4.4. Energia Elétrica
**Fórmula:** `E = P · Δt`

**Termos:**
- **E**: Energia elétrica (Joule - J)
- **P**: Potência elétrica (Watt - W)
- **Δt**: Intervalo de tempo (segundo - s)

---

### 4.5. Energia Elétrica em kWh
**Fórmula:** `E(kWh) = [P(W) · t(h)] / 1000`

**Termos:**
- **E(kWh)**: Energia em quilowatt-hora (kWh)
- **P(W)**: Potência em watts (W)
- **t(h)**: Tempo em horas (h)

---

## 5. CIRCUITOS ELÉTRICOS

### 5.1. Resistência Equivalente em Série
**Fórmula:** `Req = R₁ + R₂ + R₃ + ...`

**Termos:**
- **Req**: Resistência equivalente (Ohm - Ω)
- **R₁, R₂, R₃, ...**: Resistências individuais conectadas em série (Ohm - Ω)

**Propriedades da associação em série:**
- Corrente constante: `itotal = i₁ = i₂ = i₃`
- Tensão dividida: `Utotal = U₁ + U₂ + U₃`

---

### 5.2. Resistência Equivalente em Paralelo
**Fórmula:** `1/Req = 1/R₁ + 1/R₂ + 1/R₃ + ...`

**Fórmula simplificada para dois resistores:** `Req = (R₁ · R₂) / (R₁ + R₂)`

**Termos:**
- **Req**: Resistência equivalente (Ohm - Ω)
- **R₁, R₂, R₃, ...**: Resistências individuais conectadas em paralelo (Ohm - Ω)

**Propriedades da associação em paralelo:**
- Tensão constante: `Utotal = U₁ = U₂ = U₃`
- Corrente dividida: `itotal = i₁ + i₂ + i₃`

---

### 5.3. Primeira Lei de Kirchhoff (Lei dos Nós)
**Fórmula:** `Σ ientrada = Σ isaída`

**Termos:**
- **Σ ientrada**: Soma de todas as correntes que chegam a um nó (Ampère - A)
- **Σ isaída**: Soma de todas as correntes que saem de um nó (Ampère - A)

---

### 5.4. Segunda Lei de Kirchhoff (Lei das Malhas)
**Fórmula:** `Σ U = 0`

**Termos:**
- **Σ U**: Soma algébrica de todas as tensões em uma malha fechada (Volt - V)
- O resultado é sempre zero devido à conservação de energia

---

## 6. MAGNETISMO

### 6.1. Campo Magnético de um Fio Reto
**Fórmula:** `B = (μ₀ · i) / (2π · r)`

**Termos:**
- **B**: Intensidade do campo magnético (Tesla - T)
- **μ₀**: Permeabilidade magnética do vácuo = 4π × 10⁻⁷ T·m/A
- **i**: Corrente elétrica no fio (Ampère - A)
- **r**: Distância do fio ao ponto (metro - m)

---

### 6.2. Força Magnética sobre Carga em Movimento
**Fórmula:** `F = q · v · B · sen(θ)`

**Termos:**
- **F**: Força magnética (Newton - N)
- **q**: Carga elétrica em movimento (Coulomb - C)
- **v**: Velocidade da carga (metro por segundo - m/s)
- **B**: Intensidade do campo magnético (Tesla - T)
- **θ**: Ângulo entre o vetor velocidade e o vetor campo magnético (graus ou radianos)

---

### 6.3. Força Magnética sobre Condutor com Corrente
**Fórmula:** `F = B · i · L · sen(θ)`

**Termos:**
- **F**: Força magnética sobre o condutor (Newton - N)
- **B**: Intensidade do campo magnético (Tesla - T)
- **i**: Corrente elétrica no condutor (Ampère - A)
- **L**: Comprimento do condutor dentro do campo (metro - m)
- **θ**: Ângulo entre o condutor e o vetor campo magnético (graus ou radianos)

---

## 7. INDUÇÃO ELETROMAGNÉTICA

### 7.1. Lei de Faraday-Neumann
**Fórmula:** `ε = -dΦB/dt`

**Termos:**
- **ε**: Força eletromotriz induzida (Volt - V)
- **ΦB**: Fluxo magnético (Weber - Wb)
- **dΦB/dt**: Taxa de variação do fluxo magnético em relação ao tempo
- **Sinal negativo**: Representa a Lei de Lenz (a corrente induzida se opõe à variação)

---

### 7.2. Transformadores
**Fórmula:** `Up/Us = Np/Ns = is/ip`

**Termos:**
- **Up**: Tensão no enrolamento primário (Volt - V)
- **Us**: Tensão no enrolamento secundário (Volt - V)
- **Np**: Número de espiras no enrolamento primário
- **Ns**: Número de espiras no enrolamento secundário
- **ip**: Corrente no enrolamento primário (Ampère - A)
- **is**: Corrente no enrolamento secundário (Ampère - A)

---

## SUMÁRIO DE TERMOS RECORRENTES

Abaixo está um resumo dos termos que aparecem em múltiplas fórmulas ao longo do tópico de Eletromagnetismo:

### **F - Força**
- **Contexto Eletrostático**: Força elétrica entre cargas (Lei de Coulomb)
- **Contexto Magnético**: Força magnética sobre cargas em movimento ou condutores com corrente
- **Unidade**: Newton (N)

### **q, Q - Carga Elétrica**
- **q minúsculo**: Geralmente representa carga de prova ou carga em movimento
- **Q maiúsculo**: Geralmente representa carga fonte ou carga total
- **Unidade**: Coulomb (C)
- **Nota**: Carga elementar e = 1,6 × 10⁻¹⁹ C

### **r - Distância**
- **Contexto**: Distância entre cargas, ou distância de um ponto à carga/fio
- **Unidade**: Metro (m)

### **k - Constante Eletrostática**
- **Valor**: 9 × 10⁹ N·m²/C²
- **Uso**: Lei de Coulomb e campo elétrico

### **E - Campo Elétrico**
- **Definição**: Região do espaço onde uma carga sofre força elétrica
- **Unidade**: N/C ou V/m
- **Nota**: E⃗ indica vetor

### **E - Energia Elétrica**
- **Contexto diferente**: Quando usado no contexto de potência e consumo
- **Unidade**: Joule (J) ou quilowatt-hora (kWh)

### **i - Corrente Elétrica**
- **Definição**: Fluxo ordenado de cargas elétricas
- **Unidade**: Ampère (A)
- **Sentido Convencional**: Do polo positivo para o negativo

### **U - Tensão Elétrica (Diferença de Potencial)**
- **Definição**: "Pressão elétrica" que faz os elétrons se moverem
- **Unidade**: Volt (V)
- **Aparece em**: Lei de Ohm, Potência, Circuitos, Transformadores

### **R - Resistência Elétrica**
- **Definição**: Oposição à passagem de corrente elétrica
- **Unidade**: Ohm (Ω)
- **Depende de**: Material (ρ), comprimento (L) e área (A)

### **ρ - Resistividade**
- **Definição**: Propriedade do material que indica resistência
- **Unidade**: Ohm · metro (Ω·m)

### **P - Potência Elétrica**
- **Definição**: Taxa de conversão de energia elétrica
- **Unidade**: Watt (W)
- **Três formas principais**: P = U·i, P = R·i², P = U²/R

### **W - Trabalho/Energia**
- **Contexto**: Energia fornecida ou consumida
- **Unidade**: Joule (J)

### **Δt - Intervalo de Tempo**
- **Uso**: Cálculos de corrente, energia e indução
- **Unidade**: Segundo (s) ou horas (h) conforme contexto

### **B - Campo Magnético**
- **Definição**: Intensidade do campo magnético
- **Unidade**: Tesla (T) ou Gauss (G), sendo 1 T = 10⁴ G

### **μ₀ - Permeabilidade Magnética do Vácuo**
- **Valor**: 4π × 10⁻⁷ T·m/A
- **Uso**: Cálculos de campo magnético

### **v - Velocidade**
- **Contexto**: Velocidade de carga em movimento no campo magnético
- **Unidade**: Metro por segundo (m/s)

### **L - Comprimento**
- **Contexto 1**: Comprimento do condutor (2ª Lei de Ohm)
- **Contexto 2**: Comprimento do condutor dentro do campo magnético (Força magnética)
- **Unidade**: Metro (m)

### **A - Área**
- **Contexto**: Área da seção transversal do condutor
- **Unidade**: Metro quadrado (m²)

### **θ - Ângulo**
- **Contexto**: Ângulo entre vetores (velocidade e campo, ou condutor e campo)
- **Unidade**: Graus (°) ou radianos (rad)
- **Nota**: sen(θ) = 1 quando θ = 90° (perpendicular)

### **ε - Força Eletromotriz (FEM)**
- **Definição**: Tensão induzida por variação de fluxo magnético
- **Unidade**: Volt (V)

### **ΦB - Fluxo Magnético**
- **Definição**: "Quantidade" de campo magnético que atravessa uma área
- **Unidade**: Weber (Wb)

### **N - Número de Espiras**
- **Contexto**: Transformadores (enrolamentos primário e secundário)
- **Unidade**: Número puro (sem dimensão)

---

## NOTAS IMPORTANTES

1. **Convenção de Sinais**: 
   - Na Lei de Faraday, o sinal negativo indica a Lei de Lenz (oposição à variação)
   - Em circuitos, tensões e correntes seguem convenções de sinal conforme o sentido de percurso

2. **Unidades no SI (Sistema Internacional)**:
   - Todas as fórmulas utilizam unidades do SI para cálculos diretos
   - Conversões podem ser necessárias (ex: µC para C, cm para m)

3. **Vetores**:
   - Quando indicado com seta (⃗), a grandeza é vetorial (tem direção e sentido)
   - Fórmulas escalares usam apenas os módulos

4. **Constantes Importantes**:
   - k = 9 × 10⁹ N·m²/C² (constante eletrostática)
   - e = 1,6 × 10⁻¹⁹ C (carga elementar)
   - μ₀ = 4π × 10⁻⁷ T·m/A (permeabilidade magnética do vácuo)

---

**Documento gerado a partir do conteúdo educacional de Eletromagnetismo**

