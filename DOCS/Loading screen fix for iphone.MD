## Loading screen fix for iPhone (iOS/WhatsApp)

### Por que travava no iPhone (especialmente abrindo pelo WhatsApp)
- **Sintoma**: a página ficava presa na tela de loading.
- **Causa raiz**: o overlay de loading era mostrado por padrão e dependia do JavaScript para desaparecer. Em alguns navegadores embutidos (como o do WhatsApp no iOS), o JS pode ser bloqueado/atrasado ou falhar por recursos não suportados, então o overlay nunca era removido.

### Estratégia da correção (graceful degradation)
- **Conteúdo visível por padrão**: se o JavaScript não rodar, a página fica utilizável (o overlay fica oculto e as seções aparecem sem animação).
- **Overlay só aparece se o JS realmente rodar**: quando o JS inicia, mostramos o overlay por pouco tempo e o removemos com segurança (com `transitionend` + timeout de fallback).
- **Compatibilidade com iOS/Safari antigo**: removidos recursos que podem quebrar o parsing/execução (arrow functions, `NodeList.forEach`, `const/let` em contextos críticos) e adicionado fallback para `IntersectionObserver`.

---

### Implementação (passo a passo)

#### 1) HTML: modo `no-js` e alternância para `js`
Adicione `class="no-js"` no `<html>` e um pequeno script no `<head>` para trocar para `js` quando o JavaScript estiver ativo:

```html
<html lang="pt-BR" class="no-js">
<head>
  <!-- ... -->
  <script>(function(d){var c=d.documentElement;c.className=c.className.replace('no-js','js');})(document);</script>
  <!-- ... -->
</head>
```

#### 2) CSS: overlay oculto sem JS, conteúdo visível por padrão
- Esconde o overlay quando não há JS.
- Deixa o `main` visível por padrão; usa `.js` para animar a entrada.
- Em mobile, a navegação retrátil só ativa quando há JS.
- Sem JS, as seções com `.reveal` ficam visíveis de imediato.

```css
/* Overlay some sem JS */
html.no-js .loading-overlay { display: none !important; }

/* Main visível por padrão; com JS, fade-in controlado */
main { opacity: 1; transition: opacity 0.8s ease-in; }
html.js main { opacity: 0; }
html.js main.loaded { opacity: 1; }

/* Menu mobile retrátil só com JS */
@media (max-width: 1023px) {
  html.js .main-nav { top: -100px; }
  html.js .main-nav.nav-visible { top: 20px; }
}

/* Animações de reveal só com JS */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.reveal.visible { opacity: 1; transform: translateY(0); }
html.no-js .reveal { opacity: 1; transform: none; }
```

Observação: no CSS, o overlay começa como `display: none;` e só é mostrado pelo JS quando ele de fato inicia.

#### 3) JavaScript: só mostrar o overlay se o JS rodar; remover com segurança
- Exibe o overlay rapidamente (após o JS iniciar) e oculta em ~2.5s.
- Garante remoção do elemento do DOM via `transitionend` e `setTimeout` de fallback.

```js
(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    try {
      var loadingOverlay = document.querySelector('.loading-overlay');
      var mainEl = document.getElementById('main-content');

      function hideOverlay() {
        if (!loadingOverlay) return;
        loadingOverlay.classList.add('hidden');
        if (mainEl) mainEl.classList.add('loaded');
        var cleanup = function () {
          if (loadingOverlay && loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
          }
        };
        loadingOverlay.addEventListener('transitionend', cleanup, { once: true });
        setTimeout(cleanup, 1200);
      }

      // Só mostra overlay se JS iniciou (WhatsApp iOS sem JS: overlay fica oculto via CSS)
      if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        setTimeout(hideOverlay, 2500);
      }

      // ... (demais lógicas da página)
    } catch (e) {
      // Fallback duro: se algo falhar, garantir que o overlay não bloqueie
      try {
        var overlay = document.querySelector('.loading-overlay');
        if (overlay) {
          overlay.classList.add('hidden');
          setTimeout(function () {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 1200);
        }
        var mainEl2 = document.getElementById('main-content');
        if (mainEl2) mainEl2.classList.add('loaded');
      } catch (_) {}
    }
  });
})();
```

#### 4) Compatibilidade iOS/Safari
- Use **ES5** (funções tradicionais, `var`) em trechos críticos.
- Evite `NodeList.forEach`; prefira loops `for` simples.
- Adicione fallback quando `IntersectionObserver` não existe.
- Detecte `passive` em `addEventListener` para evitar erros em implementações antigas.

---

### Por que isso funciona agora no iPhone/WhatsApp
- O **overlay não depende mais do JS para desaparecer**: sem JS, ele já está oculto por CSS e o conteúdo aparece.
- O **overlay só é exibido se o JS realmente rodar**; nesse caso, ele é **removido automaticamente** com fallback, evitando ficar preso se o `transitionend` não disparar.
- A página evita recursos que quebram em WebViews antigas, reduzindo a chance de o JS falhar logo no início.

---

### Como testar
1. Abra o link dentro do WhatsApp no iPhone (WebView embutida).
2. A página deve aparecer imediatamente, ou mostrar o overlay por ~2.5s e então revelar o conteúdo.
3. Teste também em modo privado do Safari, e em iOS diferentes (versões antigas e mais novas).

Se ainda notar travas em algum aparelho específico, anote o modelo do iPhone, versão do iOS e um vídeo/gif curto do comportamento — ajustamos o fallback conforme o caso.
