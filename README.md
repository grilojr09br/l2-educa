# 🎓 L2 EDUCA - Plataforma Educacional Completa

> **Plataforma educacional moderna com sistema de autenticação enterprise, chatbot IA, e conteúdo interativo**

---

## 🚀 Início Rápido

### 📋 Pré-requisitos
- Node.js 18+ 
- Conta Supabase
- Chaves API OpenRouter (para chatbot)

### ⚡ Instalação Rápida

```bash
# 1. Frontend (l2-educa)
cd l2-educa
npm install
npm run dev

# 2. Backend (l2-educa-backend)
cd l2-educa-backend
npm install
npm run build
npm start
```

### 📖 Guia Completo

👉 **Veja [`DOCS/QUICK_START.md`](./DOCS/QUICK_START.md)** para instruções detalhadas

---

## 📚 Documentação

### 🔥 Documentação Completa: [`/DOCS`](./DOCS)

**134 documentos** organizados por categoria:

- 🚀 **[Início Rápido](./DOCS/QUICK_START.md)** - Comece aqui!
- 🔐 **[Autenticação](./DOCS/ENTERPRISE_AUTH_IMPLEMENTATION_SUMMARY.md)** - Sistema enterprise completo
- 🤖 **[Chatbot & IA](./DOCS/CHATBOT_SETUP.md)** - Integração OpenRouter
- 🚢 **[Deploy](./DOCS/DEPLOYMENT_GUIDE.md)** - Railway, Vercel, etc
- 🎨 **[UI/Frontend](./DOCS/GLASSMORPHIC_IMPLEMENTATION_SUMMARY.md)** - Componentes glassmorphic
- ⚡ **[Performance](./DOCS/PERFORMANCE_OPTIMIZATIONS.md)** - Otimizações implementadas

👉 **[DOCS/README.md](./DOCS/README.md)** - Navegação completa da documentação  
👉 **[DOCS/INDEX.md](./DOCS/INDEX.md)** - Índice detalhado de todos os 134 docs

---

## 🏗️ Estrutura do Projeto

```
Educational web page creator/
├── 📚 DOCS/                    # 134 documentos organizados
│   ├── README.md              # Navegação da documentação
│   ├── INDEX.md               # Índice completo
│   └── *.md                   # Todos os guias e documentos
│
├── 🎨 l2-educa/               # Frontend React + Vite
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── contexts/         # Context providers
│   │   └── utils/            # Utilitários
│   ├── package.json
│   └── vite.config.js
│
├── 🔧 l2-educa-backend/       # Backend Node.js + TypeScript
│   ├── src/
│   │   ├── controllers/      # Controladores
│   │   ├── services/         # Serviços
│   │   ├── routes/           # Rotas da API
│   │   └── middleware/       # Middlewares
│   ├── scripts/              # Scripts SQL
│   └── package.json
│
└── 🎨 Creation/               # Componentes UI standalone
    └── UI/
        ├── Glass Material Editor/
        └── Glassmorphic-Component-Standalone/
```

---

## ✨ Principais Funcionalidades

### 🔐 Sistema de Autenticação Enterprise
- Login por email (sem username)
- Verificação de email
- Sistema de avatares com upload
- Perfil de usuário completo
- Tokens JWT seguros
- Rate limiting integrado

### 🤖 Chatbot IA Avançado
- Integração OpenRouter API
- Suporte a múltiplos modelos
- Streaming de respostas
- Interface moderna e responsiva
- Modo mobile otimizado

### 🎨 Interface Moderna
- Design glassmorphic
- Componentes reutilizáveis
- Animações suaves
- Totalmente responsivo
- Dark mode ready

### 📚 Conteúdo Educacional
- Múltiplas matérias
- Fórmulas matemáticas interativas
- Sistema de navegação inteligente
- Cache de conteúdo
- Performance otimizada

---

## 🛠️ Tecnologias

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navegação
- **Supabase Client** - Auth & Database
- **KaTeX/MathJax** - Fórmulas matemáticas
- **CSS Modules** - Estilização

### Backend
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Express** - Framework web
- **Supabase** - BaaS (Auth, DB, Storage)
- **JWT** - Autenticação
- **Express Rate Limit** - Proteção

### Deploy
- **Railway** - Backend hosting
- **Vercel/Netlify** - Frontend hosting (opções)
- **Supabase** - Database & Auth

---

## 📊 Status do Projeto

```
✅ Autenticação Enterprise    100% Completo
✅ Sistema de Avatar          100% Completo
✅ Chatbot IA                 100% Completo
✅ Interface Glassmorphic     100% Completo
✅ Conteúdo Educacional       Em Progresso
✅ Performance Optimization   100% Completo
✅ Documentação               100% Organizada (134 docs)
```

---

## 🚀 Deploy

### Opções de Deploy:

1. **Railway (Recomendado para Backend)**
   ```bash
   # Ver: DOCS/RAILWAY_DEPLOYMENT_GUIDE.md
   railway login
   railway init
   railway up
   ```

2. **Vercel (Recomendado para Frontend)**
   ```bash
   # Ver: DOCS/DEPLOYMENT_GUIDE.md
   npm run build
   vercel --prod
   ```

3. **Outras Opções**
   - Render
   - Netlify
   - AWS Amplify

👉 **[DOCS/DEPLOYMENT_GUIDE.md](./DOCS/DEPLOYMENT_GUIDE.md)** - Guia completo

---

## 🐛 Troubleshooting

### Problemas Comuns:

#### Chatbot não funciona?
→ [`DOCS/CHATBOT_COMPLETE_FIX_SUMMARY.md`](./DOCS/CHATBOT_COMPLETE_FIX_SUMMARY.md)  
→ [`DOCS/DEBUG_API_KEYS.md`](./DOCS/DEBUG_API_KEYS.md)

#### Login com problemas?
→ [`DOCS/LOGIN_LOOP_FIX.md`](./DOCS/LOGIN_LOOP_FIX.md)  
→ [`DOCS/AUTH_UX_IMPROVEMENTS_COMPLETE.md`](./DOCS/AUTH_UX_IMPROVEMENTS_COMPLETE.md)

#### Avatar não aparece?
→ [`DOCS/AVATAR_UPLOAD_TROUBLESHOOTING.md`](./DOCS/AVATAR_UPLOAD_TROUBLESHOOTING.md)

#### Deploy falhando?
→ [`DOCS/DEPLOYMENT_READY_SUMMARY.md`](./DOCS/DEPLOYMENT_READY_SUMMARY.md)

---

## 📝 Scripts Úteis

### Frontend (l2-educa):
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview da build
```

### Backend (l2-educa-backend):
```bash
npm run dev          # Desenvolvimento (watch mode)
npm run build        # Compilar TypeScript
npm start            # Produção
```

---

## 🧪 Testes

```bash
# Frontend
cd l2-educa
npm run test

# Backend
cd l2-educa-backend
npm run test
```

---

## 📖 Guias Recomendados

### Para Desenvolvedores:
1. [`DOCS/COMPREHENSIVE_DEVELOPMENT_GUIDE.md`](./DOCS/COMPREHENSIVE_DEVELOPMENT_GUIDE.md)
2. [`DOCS/01-ESTRUTURA-DO-SITE.md`](./DOCS/01-ESTRUTURA-DO-SITE.md)
3. [`DOCS/02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md`](./DOCS/02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md)

### Para Deploy:
1. [`DOCS/DEPLOYMENT_GUIDE.md`](./DOCS/DEPLOYMENT_GUIDE.md)
2. [`DOCS/RAILWAY_DEPLOYMENT_GUIDE.md`](./DOCS/RAILWAY_DEPLOYMENT_GUIDE.md)
3. [`DOCS/PRODUCAO_SEM_LOGS.md`](./DOCS/PRODUCAO_SEM_LOGS.md)

### Para Configuração:
1. [`DOCS/QUICK_START.md`](./DOCS/QUICK_START.md)
2. [`DOCS/SUPABASE_QUICK_CONFIG.md`](./DOCS/SUPABASE_QUICK_CONFIG.md)
3. [`DOCS/API_KEY_MANAGEMENT_GUIDE.md`](./DOCS/API_KEY_MANAGEMENT_GUIDE.md)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**Documentação:**
- Toda nova feature deve ter documentação em `/DOCS`
- Atualize [`DOCS/INDEX.md`](./DOCS/INDEX.md) ao adicionar docs
- Siga o padrão de nomenclatura existente

---

## 📄 Licença

Este projeto está sob licença MIT. Veja [`DOCS/LICENCE.md`](./DOCS/LICENCE.md) para mais detalhes.

---

## 📞 Suporte

- 📚 **Documentação:** [`/DOCS`](./DOCS)
- 🐛 **Issues:** [GitHub Issues](https://github.com/seu-usuario/l2-educa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/seu-usuario/l2-educa/discussions)

---

## 🎯 Roadmap

- [x] Sistema de autenticação enterprise
- [x] Chatbot IA com OpenRouter
- [x] Interface glassmorphic
- [x] Sistema de avatares
- [x] Performance optimization
- [ ] Mais conteúdo educacional
- [ ] Sistema de exercícios interativos
- [ ] Gamificação
- [ ] Modo offline
- [ ] App mobile (React Native)

---

## ⭐ Estrelas no GitHub

Se este projeto foi útil, considere dar uma ⭐!

---

## 🙏 Agradecimentos

- React Team
- Vite Team
- Supabase Team
- OpenRouter
- Comunidade Open Source

---

**Desenvolvido com ❤️ pela equipe L2 EDUCA**

```
  _     ____    _____ ____  _   _  ____    _    
 | |   |___ \  | ____|  _ \| | | |/ ___|  / \   
 | |     __) | |  _| | | | | | | | |     / _ \  
 | |___ / __/  | |___| |_| | |_| | |___ / ___ \ 
 |_____|_____| |_____|____/ \___/ \____/_/   \_\
                                                 
```

---

**📚 Explore, aprenda e construa o futuro da educação!**

