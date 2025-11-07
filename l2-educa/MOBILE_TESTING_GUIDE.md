# 📱 Guia de Teste - Melhorias Mobile

## Como Testar as Novas Funcionalidades

### 🚀 Iniciando o Servidor de Desenvolvimento

```bash
cd l2-educa
npm run dev
```

O servidor estará disponível em: `http://localhost:5173`

## 🧪 Testes a Realizar

### Teste 1: Notificação de Orientação Mobile (Acid Glass) ⏱️

**Objetivo:** Verificar se a notificação com design acid liquid glass aparece em dispositivos móveis

#### Opção A - Usando Chrome DevTools (Recomendado)
1. Abra o Chrome/Edge
2. Pressione `F12` para abrir DevTools
3. Clique no ícone de **Toggle Device Toolbar** (ou pressione `Ctrl+Shift+M`)
4. Selecione um dispositivo móvel (ex: iPhone 12 Pro)
5. Navegue para uma página de matéria:
   - `http://localhost:5173/#/math/numeros-complexos`
   - `http://localhost:5173/#/math/polinomios`
   - `http://localhost:5173/#/math/geometria-analitica`
   - `http://localhost:5173/#/physics/exercicios-enem`

**✅ Resultado Esperado:**
- Uma notificação **acid liquid glass** aparece no topo da página
- Design com **alta transparência** (75%) e efeitos visuais:
  - Círculos gradientes flutuando e animados
  - Efeito de vidro líquido com blur
  - Ícone de celular rotacionando animado
- **Título**: "Melhor Visualização"
- **Mensagem**: "Gire o celular para horizontal e visualize as fórmulas completas"
- A notificação desaparece automaticamente após **4 segundos**
- Animação bounce suave (entrada e saída)
- Fundo visível através da notificação (efeito glassmorphism)

#### Opção B - Usando Celular Real
1. No computador, execute: `npm run dev -- --host`
2. Encontre o IP local (ex: 192.168.1.100:5173)
3. No celular, acesse: `http://[SEU_IP]:5173`
4. Navegue para uma página de matéria

**✅ Resultado Esperado:**
- Mesma notificação aparece
- Responde ao toque e gestos normalmente

---

### Teste 2: Quebra de Linha nas Fórmulas 📐

**Objetivo:** Verificar se fórmulas quebram linha após `=` em modo portrait

#### Usando Chrome DevTools
1. Abra DevTools em modo dispositivo móvel
2. Selecione **iPhone 12 Pro** (ou similar)
3. Certifique-se que está em **modo portrait** (vertical)
4. Navegue para: `http://localhost:5173/#/math/numeros-complexos`
5. Role até a seção "Operações" ou "Exemplos"

**✅ Resultado Esperado:**
- Fórmulas como `(3 + 4i) + (1 + 2i) = (3 + 1) + (4 + 2)i` devem quebrar após cada `=`
- Os boxes devem expandir verticalmente
- Não deve haver scroll horizontal
- Espaçamento adequado entre linhas

**Exemplo Visual:**

**Antes (transborda):**
```
┌────────────────────────────────────────┐
│ (3 + 4i) + (1 + 2i) = (3 + 1) + (4 +..│→ (overflow!)
└────────────────────────────────────────┘
```

**Depois (quebra linha):**
```
┌────────────────────────────────────────┐
│ (3 + 4i) + (1 + 2i) =                  │
│ (3 + 1) + (4 + 2)i =                   │
│ 4 + 6i                                 │
└────────────────────────────────────────┘
```

---

### Teste 3: Rotação de Tela 🔄

**Objetivo:** Verificar comportamento ao rotacionar o dispositivo

#### Usando Chrome DevTools
1. Em modo dispositivo móvel (portrait)
2. Navegue para uma página com fórmulas
3. Observe as quebras de linha
4. Rotacione para modo **landscape** (horizontal)
   - No DevTools, clique no ícone de rotação

**✅ Resultado Esperado:**
- Em **portrait**: Fórmulas quebram após `=`
- Em **landscape**: Fórmulas voltam ao formato normal (sem quebras)
- Transição é suave
- Layout se ajusta automaticamente

---

### Teste 4: Desktop não é Afetado 🖥️

**Objetivo:** Garantir que desktop funciona normalmente

1. Feche o modo dispositivo móvel no DevTools
2. Navegue para qualquer página de matéria
3. Observe as fórmulas

**✅ Resultado Esperado:**
- ❌ Notificação NÃO aparece
- Fórmulas estão em formato normal
- Não há quebras de linha forçadas
- Layout permanece como antes

---

### Teste 5: Classes CSS no Body 🏷️

**Objetivo:** Verificar se as classes CSS corretas são aplicadas

#### Usando DevTools Console
1. Abra DevTools
2. Vá para a aba **Console**
3. Em modo **mobile portrait**, execute:
```javascript
document.body.className
```

**✅ Resultado Esperado:**
- Deve incluir a classe `mobile-portrait`

4. Rotacione para **landscape**, execute novamente:
**✅ Resultado Esperado:**
- Deve incluir a classe `mobile-landscape`

5. Em **desktop**, execute:
**✅ Resultado Esperado:**
- Deve incluir a classe `desktop`

---

### Teste 6: Fórmulas em Boxes de Exemplo 📦

**Objetivo:** Verificar quebra de linha em fórmulas dentro de boxes especiais

1. Navegue para: `http://localhost:5173/#/math/numeros-complexos`
2. Role até a seção com boxes de exemplo (example-box)
3. Em modo mobile portrait, observe as fórmulas

**✅ Resultado Esperado:**
- Fórmulas dentro de `example-box` também quebram após `=`
- Padding reduzido para economizar espaço
- Fonte ligeiramente menor mas legível

---

## 🐛 Problemas Conhecidos / Limitações

1. **LaTeX Complexo**: Fórmulas muito complexas podem não quebrar perfeitamente
2. **Detecção User Agent**: Alguns navegadores mobile podem não ser detectados
3. **iPad**: Pode ser detectado como desktop dependendo do modo

## 🔍 Debug

### Verificar se MathJax está Carregado
No Console do DevTools:
```javascript
console.log(window.MathJax ? "✅ MathJax loaded" : "❌ MathJax not loaded")
```

### Verificar Detecção Mobile
No Console do DevTools:
```javascript
console.log("Is Mobile:", /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
console.log("Is Portrait:", window.innerHeight > window.innerWidth)
```

### Forçar Modo Mobile (para testes)
No Console do DevTools:
```javascript
document.body.classList.add('mobile-portrait')
```

## 📊 Checklist Completo

Use esta lista para verificar todos os aspectos:

### Notificação Acid Glass
- [ ] Notificação aparece em mobile
- [ ] Notificação dura 4 segundos
- [ ] Design acid glass visível (transparência alta)
- [ ] Círculos gradientes animando
- [ ] Ícone de rotação animado (360°)
- [ ] Fundo visível através da notificação
- [ ] Efeito blur aplicado
- [ ] Notificação desaparece suavemente
- [ ] Notificação NÃO aparece em desktop
- [ ] Fórmulas quebram após `=` em portrait
- [ ] Fórmulas normais em landscape
- [ ] Fórmulas normais em desktop
- [ ] Boxes expandem verticalmente quando necessário
- [ ] Sem scroll horizontal em mobile portrait
- [ ] Classes CSS corretas no body
- [ ] Rotação funciona corretamente
- [ ] Fórmulas em example-box funcionam
- [ ] Build compila sem erros
- [ ] Sem erros no Console

## 🎯 Páginas para Testar

Certifique-se de testar TODAS estas páginas:

1. ✅ **Números Complexos**: `/#/math/numeros-complexos`
   - Muitas fórmulas com `=`
   - Boxes de exemplo
   - Calculadoras interativas

2. ✅ **Polinômios**: `/#/math/polinomios`
   - Fórmulas de divisão
   - Briot-Ruffini
   - Exemplo boxes

3. ✅ **Geometria Analítica**: `/#/math/geometria-analitica`
   - Fórmulas de distância
   - Equações de reta
   - Matrizes

4. ✅ **Exercícios de Física**: `/#/physics/exercicios-enem`
   - Fórmulas inline
   - Questões com múltiplas fórmulas

## 🚀 Teste de Produção

Após confirmar que tudo funciona no dev:

```bash
npm run build
npm run preview
```

Teste novamente todas as funcionalidades no build de produção.

---

**Última Atualização:** 2025-10-27  
**Status:** ✅ Pronto para Teste

