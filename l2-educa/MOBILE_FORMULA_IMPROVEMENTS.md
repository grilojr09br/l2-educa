# Melhorias de Visualização Mobile - Fórmulas

## 📱 Visão Geral

Este documento descreve as melhorias implementadas para otimizar a visualização de fórmulas matemáticas em dispositivos móveis, especialmente em modo portrait (vertical).

## ✨ Funcionalidades Implementadas

### 1. **Quebra de Linha Automática nas Fórmulas**

Quando um celular é detectado em modo portrait (vertical), todas as fórmulas dentro de boxes agora:

- ✅ Quebram automaticamente após cada sinal de `=`
- ✅ Ajustam a altura do box conforme necessário
- ✅ Mantêm espaçamento adequado entre linhas
- ✅ Aplicam fonte menor para melhor legibilidade

**Como funciona:**
- O componente `MathFormula` detecta se o dispositivo está em portrait
- Adiciona `\\[0.5em]` (quebra de linha LaTeX) após cada `=` na fórmula
- Os estilos CSS adaptam o layout para acomodar múltiplas linhas

### 2. **Notificação de Orientação (Acid Liquid Glass)**

Quando um usuário mobile entra em qualquer página de matéria específica, uma notificação estilosa aparece por 4 segundos com design **acid liquid glass** informando:

> **Melhor Visualização**  
> "Gire o celular para horizontal e visualize as fórmulas completas"

**Páginas que mostram a notificação:**
- Números Complexos (`/math/numeros-complexos`)
- Polinômios (`/math/polinomios`)
- Geometria Analítica (`/math/geometria-analitica`)
- Exercícios de Física (`/physics/exercicios-enem`)

**Características da notificação:**
- ⏱️ **Duração: 6 segundos** (tempo ideal para ler e processar)
- 🎨 **Design Acid Liquid Glass** com alta transparência e efeito líquido
- 🔄 **Ícone animado de rotação** do celular (360° loop)
- 💎 **Círculos flutuantes intensos** com gradientes vibrantes (blur effect)
- 🌈 **Cores ultra-vibrantes** - Indigo, Violet, Pink, Blue
- 📐 **Layout horizontal** - 92% de largura para melhor visualização
- 💫 **Animação bounce** suave de entrada e saída
- 🪟 **Transparência balanceada** (65%) com ilha opaca (95%) para contraste
- 📍 Posicionada abaixo do menu (95px do topo)
- 💪 **Contraste extremo** - texto com glow e sombras profundas
- 🚫 Não aparece em dispositivos desktop

**Design Acid Glass (3 Camadas):**
- **Camada 1 (Fundo)**: Conteúdo da página visível através do vidro
- **Camada 2 (Vidro Ácido)**: 
  - Container com 65% transparência
  - `blur(24px) saturate(200%) contrast(120%)`
  - 4 círculos grandes (90-120px) com opacidade 0.7-0.9
  - Animação float em 8 segundos
  - Borda roxa 1.5px com glow
- **Camada 3 (Ilha Opaca)**: 
  - Background 95-98% opaco (contraste extremo)
  - Gradiente escuro `rgba(30,30,45,0.95) → rgba(20,20,35,0.98)`
  - Texto branco com glow roxo e sombras profundas
  - Borda roxa `rgba(168,85,247,0.4)`
  - Box-shadow múltiplo (4 camadas)

### 3. **Detecção Inteligente de Dispositivo e Orientação**

Sistema robusto de detecção que:

- 🔍 Identifica se o dispositivo é mobile
- 📐 Detecta a orientação (portrait vs landscape)
- 🔄 Atualiza dinamicamente ao rotacionar o celular
- 🏷️ Adiciona classes CSS ao body para estilização contextual

**Classes adicionadas ao body:**
- `mobile-portrait` - Celular em modo vertical
- `mobile-landscape` - Celular em modo horizontal
- `desktop` - Computador desktop

## 📂 Arquivos Criados/Modificados

### Novos Arquivos:

1. **`src/components/MobileOrientationNotification.jsx`**
   - Componente React da notificação
   - Lógica de detecção mobile e temporização

2. **`src/components/MobileOrientationNotification.css`**
   - Estilos da notificação
   - Animações de entrada/saída

3. **`src/utils/mobileDetection.js`**
   - Funções utilitárias de detecção
   - `isMobileDevice()`, `isPortraitOrientation()`, `isMobilePortrait()`
   - `updateOrientationClass()` - Gerencia classes no body

### Arquivos Modificados:

1. **`src/components/MathFormula.jsx`**
   - Importa funções de detecção mobile
   - Adiciona função `processFormulaForMobile()`
   - Processa fórmulas para quebrar após `=`

2. **`src/components/MathFormula.css`**
   - Novos estilos para `body.mobile-portrait`
   - Quebra de linha em containers MathJax
   - Ajustes de padding e espaçamento
   - Estilos para example-box, properties-box, etc.

3. **`src/App.jsx`**
   - Importa `updateOrientationClass`
   - Adiciona useEffect para monitorar orientação
   - Listeners para eventos `resize` e `orientationchange`

4. **Páginas de Matéria:**
   - `src/pages/ComplexNumbers.jsx`
   - `src/pages/Polynomials.jsx`
   - `src/pages/AnalyticGeometry.jsx`
   - `src/pages/PhysicsExercises.jsx`
   - Todas importam e exibem `MobileOrientationNotification`

## 🧪 Como Testar

### Teste 1: Notificação Mobile
1. Abra o site em um celular (ou use DevTools do Chrome em modo mobile)
2. Navegue para qualquer página de matéria (ex: Números Complexos)
3. ✅ Deve aparecer a notificação por 2 segundos
4. ✅ A notificação deve desaparecer suavemente

### Teste 2: Quebra de Linha em Portrait
1. Abra uma página com fórmulas em celular vertical
2. Observe fórmulas com sinais de `=`
3. ✅ As fórmulas devem quebrar linha após cada `=`
4. ✅ O box deve expandir verticalmente
5. Rotacione o celular para horizontal
6. ✅ As fórmulas devem voltar ao formato normal (sem quebras)

### Teste 3: Responsividade
1. Abra em desktop
2. ✅ Não deve aparecer notificação
3. ✅ Fórmulas devem estar normais (sem quebras)
4. Redimensione a janela
5. ✅ Layout deve se adaptar suavemente

## 🎯 Exemplos de Fórmulas Que Quebram Linha

**Antes (Portrait - transbordava):**
```
(3 + 4i) + (1 + 2i) = (3 + 1) + (4 + 2)i = 4 + 6i
```

**Depois (Portrait - quebra após =):**
```
(3 + 4i) + (1 + 2i) =
(3 + 1) + (4 + 2)i =
4 + 6i
```

## 🔧 Configurações

### Ajustar Duração da Notificação
Edite `MobileOrientationNotification.jsx`, linha ~21:
```javascript
const timer = setTimeout(() => {
  setShow(false);
}, 6000); // Altere 6000 para o valor desejado em ms (6 segundos)
```

**Importante:** Se mudar a duração, ajuste também o timing da animação de saída no CSS:
```css
/* Linha ~12 do arquivo CSS */
animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
           slideUpAndShrink 0.6s ease-in-out 5.4s;
/* O valor 5.4s deve ser: duração - 0.6s (duração da animação) */
/* Exemplo: 6s - 0.6s = 5.4s */
```

### Personalizar Transparência (Acid Glass)
Edite `MobileOrientationNotification.css`, linha ~18:
```css
.notification-glass-container {
  background: rgba(20, 20, 30, 0.25); /* Ajuste o último valor (0.25 = 25% opaco, 75% transparente) */
  backdrop-filter: blur(20px) saturate(180%); /* Ajuste blur para mais/menos distorção */
}
```

### Desativar Quebra de Linha
Edite `MathFormula.jsx`, linha ~17, modifique a função:
```javascript
const processFormulaForMobile = (formula) => {
  return formula; // Desativa o processamento
};
```

### Customizar Mensagem da Notificação
Edite `MobileOrientationNotification.jsx`, linhas ~56-57:
```jsx
<p className="notification-title">Melhor Visualização</p>
<p className="notification-message">Gire o celular para horizontal e visualize as fórmulas completas</p>
```

### Desabilitar Animação do Ícone
Edite `MobileOrientationNotification.css`, linha ~121:
```css
.rotation-icon {
  /* animation: rotatePhone 2s ease-in-out infinite; */ /* Comente esta linha */
}
```

## 🎨 Estilização

### Classes CSS Disponíveis

```css
/* Aplicar estilos apenas em mobile portrait */
body.mobile-portrait .seu-elemento {
  /* seus estilos */
}

/* Aplicar estilos apenas em mobile landscape */
body.mobile-landscape .seu-elemento {
  /* seus estilos */
}

/* Aplicar estilos apenas em desktop */
body.desktop .seu-elemento {
  /* seus estilos */
}
```

## 📊 Impacto

### Antes das Melhorias:
- ❌ Fórmulas longas transbordavam em portrait
- ❌ Usuários precisavam fazer scroll horizontal
- ❌ Experiência mobile prejudicada

### Depois das Melhorias:
- ✅ Fórmulas se adaptam automaticamente
- ✅ Não há scroll horizontal
- ✅ Usuários informados sobre melhor orientação
- ✅ Experiência mobile otimizada

## 🚀 Tecnologias Utilizadas

- **React Hooks** (useEffect, useState, useRef)
- **CSS Responsive Design**
- **MathJax** (renderização LaTeX)
- **JavaScript Navigator API** (detecção de device)
- **CSS Animations** (notificação suave)

## 📝 Notas Técnicas

1. **LaTeX Line Breaking**: Usa `\\[0.5em]` para quebras com espaçamento
2. **Detecção Mobile**: Baseada em User Agent e dimensões de tela
3. **Performance**: Detecção acontece apenas uma vez no mount
4. **Acessibilidade**: Notificação usa contraste adequado e é temporária

## 🔮 Melhorias Futuras

- [ ] Permitir usuário fechar notificação manualmente
- [ ] Salvar preferência do usuário (não mostrar novamente)
- [ ] Adicionar mais opções de quebra (por operador, por comprimento, etc.)
- [ ] Análise de largura real da fórmula para quebrar inteligentemente
- [ ] Modo escuro/claro para notificação

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Console do navegador (erros JavaScript)
2. Classes CSS aplicadas ao body
3. Renderização MathJax completada
4. User Agent reconhecido como mobile

---

**Data de Implementação:** 2025-10-27  
**Versão:** 1.0.0

