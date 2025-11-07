# 📚 Guias Importantes - L2 Educa

Bem-vindo à documentação completa para desenvolvimento e manutenção do L2 Educa.

---

## 📖 Índice de Guias

### 1. 🏗️ Estrutura e Arquitetura
**[01-ESTRUTURA-DO-SITE.md](./01-ESTRUTURA-DO-SITE.md)**
- Visão geral da arquitetura do projeto
- Estrutura de pastas e arquivos
- Fluxo de navegação
- Contextos e providers
- Sistema de roteamento

### 2. 📄 Criação de Páginas
**[02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md](./02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md)**
- Tutorial passo a passo para criar página de matéria
- Estrutura de components
- Configuração de rotas
- Integração com navigation
- Exemplos práticos

### 3. 🎴 Sistema de Cards
**[03-SISTEMA-DE-CARDS-E-GLOW.md](./03-SISTEMA-DE-CARDS-E-GLOW.md)**
- Como criar cards corretos
- Sistema de glow effects (drop-shadow)
- Grid layout e padding
- Estados de hover/active
- Troubleshooting de glow cortado

### 4. 🎨 Padrões de Design
**[04-PADROES-DE-DESIGN-E-CSS.md](./04-PADROES-DE-DESIGN-E-CSS.md)**
- Glass morphism (acid liquid glass)
- Sistema de cores por matéria
- Typography e spacing
- Animações e transitions
- Responsividade

### 5. 🧮 Renderização de Fórmulas
**[05-SISTEMA-DE-FORMULAS-MATHJAX.md](./05-SISTEMA-DE-FORMULAS-MATHJAX.md)**
- Componentes de fórmulas
- MathJax integration
- Cache e performance
- Mobile optimization
- Exemplos de uso

### 6. ⚡ Performance e Otimização
**[06-PERFORMANCE-E-OTIMIZACAO.md](./06-PERFORMANCE-E-OTIMIZACAO.md)**
- Smart loading system
- Lazy loading
- Code splitting
- Service Worker (PWA)
- Device detection

### 7. ✅ Checklist de Qualidade
**[07-CHECKLIST-NOVA-FEATURE.md](./07-CHECKLIST-NOVA-FEATURE.md)**
- Checklist antes de commit
- Testes manuais
- Verificação de responsividade
- Performance checks
- Accessibility

---

## 🚀 Quick Start

### Para Criar uma Nova Matéria:
1. Leia **[02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md](./02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md)**
2. Siga o template fornecido
3. Configure as rotas
4. Adicione o card na página Terminal
5. Teste em todos os dispositivos

### Para Adicionar Tópico em Matéria Existente:
1. Abra o arquivo da página (ex: `MathSubject.jsx`)
2. Adicione novo objeto no array `topics`
3. Crie a página do tópico (ex: `NewTopic.jsx`)
4. Configure a rota em `App.jsx`
5. Verifique o glow e padding

### Para Resolver Problemas de Glow:
1. Consulte **[03-SISTEMA-DE-CARDS-E-GLOW.md](./03-SISTEMA-DE-CARDS-E-GLOW.md)**
2. Verifique o padding do grid
3. Confirme uso de `filter: drop-shadow()`
4. Teste hover area

---

## 🎯 Melhores Práticas (Resumo)

### ✅ SEMPRE Fazer:
- Usar `drop-shadow` para glow effects
- Adicionar padding nos grids: `padding: clamp(2rem, 5vw, 3rem);`
- Manter `overflow: hidden` nos cards internos
- Usar `clamp()` para valores responsivos
- Testar em mobile e desktop
- Seguir a paleta de cores da matéria
- Implementar lazy loading para fórmulas

### ❌ NUNCA Fazer:
- Usar pseudo-elementos com `inset` negativo grande (>10px)
- Colocar `overflow: visible` em cards
- Esquecer padding nos grids
- Criar animações infinitas não intencionais
- Ignorar estados de hover/active
- Hardcodar valores de espaçamento
- Duplicar componentes ao invés de reutilizar

---

## 📝 Histórico de Correções Importantes

### 27/10/2025 - Sistema de Glow Corrigido
- **Problema**: Glow cortado nas bordas, hover area expandida, animações infinitas
- **Solução**: Substituído pseudo-elementos por `drop-shadow`, adicionado padding aos grids
- **Arquivos**: `Terminal.css`, `MathSubject.css`, `PhysicsSubject.css`
- **Documentação**: `GLOW_FIX_FINAL.md`, `GRID_PADDING_FIX.md`

### 27/10/2025 - Smart Loading System
- **Feature**: Loading screen inteligente com detecção de dispositivo
- **Benefícios**: Otimização automática, preload seletivo, cache inteligente
- **Documentação**: `SMART_LOADING_IMPLEMENTATION.md`

### 27/10/2025 - Performance Optimizations
- **Melhorias**: Lazy loading, code splitting, service worker
- **Resultado**: FCP reduzido, melhor experiência mobile
- **Documentação**: `PERFORMANCE_OPTIMIZATIONS.md`

---

## 🛠️ Ferramentas e Comandos

### Build e Deploy:
```bash
npm run build        # Build de produção
npm run dev          # Servidor de desenvolvimento
npm run preview      # Preview do build
```

### Verificação:
```bash
# Linter (se configurado)
npm run lint

# Lighthouse (Chrome DevTools)
# Performance > Generate Report
```

### Git Workflow:
```bash
git status
git add .
git commit -m "feat: describe your feature"
git push origin main
```

---

## 📧 Suporte

Para dúvidas ou problemas:
1. Consulte os guias relevantes nesta pasta
2. Verifique o histórico de correções
3. Revise os exemplos de código nos guias
4. Consulte a documentação inline nos arquivos

---

**Última atualização**: 27 de Outubro, 2025  
**Versão do site**: v2.0  
**Mantenedores**: Equipe L2 Educa

---

## 📚 Recursos Externos

- [React Documentation](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [MathJax Documentation](https://docs.mathjax.org/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS Tricks - Drop Shadow](https://css-tricks.com/almanac/properties/f/filter/)
- [MDN - CSS Clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)

