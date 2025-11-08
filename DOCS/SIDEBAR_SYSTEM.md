# 🎯 Sistema Universal de Sidebar - Documentação Completa

## Visão Geral

O L2 Educa agora possui um sistema de sidebar universal e inteligente que:
- Detecta automaticamente o contexto (subject/topic) baseado na rota
- Carrega dinamicamente os itens de menu do arquivo de configuração centralizado
- Rastreia e exibe progresso do usuário
- Oferece busca/filtro em tempo real
- Expande/colapsa seções automaticamente
- Persiste estado entre sessões

---

## 📋 Arquitetura do Sistema

### 1. Configuração Centralizada (`src/config/subjectsConfig.js`)

Todos os subjects e topics agora vivem em um único arquivo de configuração:

```javascript
export const SUBJECTS_CONFIG = {
  mathematics: {
    id: 'mathematics',
    name: 'Matemática',
    icon: 'functions',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    path: '/math',
    topics: [
      {
        id: 'numeros-complexos',
        title: 'Números Complexos',
        icon: 'functions',
        path: '/math/numeros-complexos',
        difficulty: 'Avançado',
        duration: '45 min',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      },
      // ... mais tópicos
    ],
  },
  // ... outros subjects
};
```

#### Estrutura de um Subject

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador único (ex: 'mathematics') |
| `name` | string | Nome exibido (ex: 'Matemática') |
| `icon` | string | Material Icons (ex: 'functions') |
| `color` | string | Cor primária (ex: '#6366f1') |
| `gradient` | string | CSS gradient para UI |
| `path` | string | Rota base (ex: '/math') |
| `topics` | array | Lista de tópicos do subject |

#### Estrutura de um Topic

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador único no subject |
| `title` | string | Nome exibido |
| `icon` | string | Material Icons |
| `path` | string | Rota completa (ex: '/math/polinomios') |
| `difficulty` | string | Nível (ex: 'Intermediário') |
| `duration` | string | Tempo estimado (ex: '45 min') |
| `gradient` | string | CSS gradient para UI |

#### Helper Functions Disponíveis

```javascript
// Obter subject a partir do pathname
getSubjectFromPath(pathname) => Subject | null

// Obter topic a partir do pathname e subject
getTopicFromPath(pathname, subject) => Topic | null

// Obter todos os topics (para busca global)
getAllTopics() => Array<Topic>

// Obter subject por ID
getSubjectById(subjectId) => Subject | null
```

---

### 2. Sistema de Progress Tracking (`src/utils/progressTracker.js`)

Rastreia o progresso do usuário em `localStorage` com a seguinte estrutura:

```javascript
{
  "physics": {
    "optica": {
      "visited": true,
      "lastVisited": 1704067200000,
      "completed": false,
      "completedAt": null
    },
    "eletromagnetismo": {
      "visited": true,
      "lastVisited": 1704153600000,
      "completed": true,
      "completedAt": 1704240000000
    }
  }
}
```

#### API do Progress Tracker

##### Funções Básicas

```javascript
// Obter todo o progresso
getAllProgress() => Object

// Marcar tópico como visitado
markTopicVisited(subjectId, topicId)

// Marcar tópico como completo/incompleto
markTopicCompleted(subjectId, topicId, completed = true)

// Obter progresso de um tópico específico
getTopicProgress(subjectId, topicId) => {
  visited: boolean,
  completed: boolean,
  lastVisited: timestamp | null,
  completedAt: timestamp | null
}

// Obter estatísticas de progresso de um subject
getSubjectProgress(subjectId, totalTopics) => {
  visited: number,
  completed: number,
  total: number,
  visitedPercentage: number,
  completedPercentage: number
}

// Limpar todo o progresso (debug/reset)
clearAllProgress()
```

##### React Hooks

```javascript
// Hook para rastrear progresso de um tópico
const { progress, markVisited, markCompleted, isVisited, isCompleted } = 
  useProgress(subjectId, topicId);

// Hook para estatísticas de progresso de um subject
const stats = useSubjectProgress(subjectId, totalTopics);
// Retorna: { visited, completed, total, visitedPercentage, completedPercentage }
```

#### Uso em Páginas de Conteúdo

```javascript
import { useProgress } from '../utils/progressTracker';

const MyTopicPage = () => {
  const { markVisited, markCompleted, isCompleted } = 
    useProgress('physics', 'optica');
  
  // Marcar como visitado ao carregar
  useEffect(() => {
    markVisited();
  }, []);
  
  // Botão para marcar como completo
  return (
    <button onClick={() => markCompleted(!isCompleted)}>
      {isCompleted ? 'Completo ✓' : 'Marcar como Completo'}
    </button>
  );
};
```

---

### 3. Sidebar Universal (`src/components/Sidebar.jsx`)

#### Características

1. **Auto-detecção de Contexto**
   - Usa `useLocation()` para detectar rota atual
   - Expande automaticamente o subject ativo
   - Destaca topic atual

2. **Busca/Filtro em Tempo Real**
   - Busca por nome de topic ou subject
   - Filtra resultados instantaneamente
   - Mantém estrutura hierárquica

3. **Progress Indicators**
   - Barra de progresso por subject
   - Ícones de status por topic:
     - ⚪ Não visitado
     - 🕐 Visitado
     - ✅ Completo

4. **Expansão/Colapso**
   - Clique no ícone para expandir/colapsar
   - Estado persiste em `sessionStorage`
   - Animações suaves (max-height)

5. **Responsivo**
   - Sidebar overlay em mobile
   - Ajusta largura automaticamente
   - Toque para fechar overlay

#### Estados do Sidebar

```javascript
const [isOpen, setIsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [expandedSubjects, setExpandedSubjects] = useState({});
```

---

## 🚀 Como Adicionar Novo Subject

### Passo 1: Adicionar em `subjectsConfig.js`

```javascript
export const SUBJECTS_CONFIG = {
  // ... subjects existentes ...
  
  newsubject: {
    id: 'newsubject',
    name: 'Nova Matéria',
    icon: 'school',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    path: '/newsubject',
    topics: [
      {
        id: 'topic1',
        title: 'Tópico 1',
        icon: 'article',
        path: '/newsubject/topic1',
        difficulty: 'Básico',
        duration: '30 min',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      },
      // ... mais tópicos
    ],
  },
};
```

### Passo 2: Criar Páginas

Criar `src/pages/NewSubjectPage.jsx` e topic pages.

### Passo 3: Adicionar Rotas em `App.jsx`

```javascript
const NewSubjectPage = lazy(() => import('./pages/NewSubjectPage'));
const NewSubjectTopic1 = lazy(() => import('./pages/NewSubjectTopic1'));

// Em <Routes>:
<Route path="/newsubject" element={<NewSubjectPage />} />
<Route path="/newsubject/topic1" element={<NewSubjectTopic1 />} />
```

### Passo 4: Atualizar `AdminContext.jsx` (Opcional)

Se estiver usando admin panel, adicione o subject lá também.

**Pronto!** O sidebar automaticamente:
- Detectará o novo subject
- Mostrará os topics
- Rastreará progresso
- Permitirá busca

---

## 🔧 Como Adicionar Novo Topic em Subject Existente

### Passo 1: Adicionar em `subjectsConfig.js`

```javascript
physics: {
  // ... config do subject ...
  topics: [
    // ... topics existentes ...
    {
      id: 'new-topic',
      title: 'Novo Tópico de Física',
      icon: 'atom',
      path: '/physics/new-topic',
      difficulty: 'Avançado',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
    },
  ],
},
```

### Passo 2: Criar Página do Topic

Criar `src/pages/PhysicsNewTopic.jsx` com progress tracking:

```javascript
import { useProgress } from '../utils/progressTracker';

const PhysicsNewTopic = () => {
  const { markVisited, markCompleted, isCompleted } = 
    useProgress('physics', 'new-topic');
  
  useEffect(() => {
    markVisited();
  }, []);
  
  // ... resto do componente
};
```

### Passo 3: Adicionar Rota

```javascript
// Em App.jsx
const PhysicsNewTopic = lazy(() => import('./pages/PhysicsNewTopic'));

<Route path="/physics/new-topic" element={<PhysicsNewTopic />} />
```

### Passo 4: Adicionar Card na Página Hub (Opcional)

Se o subject tiver página hub (como `PhysicsSubject.jsx`), adicione o topic lá também.

**Pronto!** O sidebar automaticamente incluirá o novo topic.

---

## 🎨 Customização Visual

### Cores e Gradientes

Cada subject tem sua própria cor e gradient. Ao criar novos, use cores distintas:

```javascript
// Exemplos de paletas
color: '#6366f1',  // Matemática (purple)
color: '#ef4444',  // Física (red)
color: '#10b981',  // Química (green)
color: '#22c55e',  // Biologia (lime)
color: '#3b82f6',  // Português (blue)
color: '#f59e0b',  // Literatura (orange)
```

### Estilos do Sidebar

Customizáveis em `src/components/Sidebar.css`:

```css
/* Largura do sidebar */
.sidebar {
  width: 380px;  /* Ajustar se necessário */
}

/* Cores da barra de progresso */
.progress-fill {
  background: linear-gradient(90deg, #6366f1, #a855f7);
}

/* Ícones de status */
.status-icon.completed { color: #22c55e; }
.status-icon.visited { color: #fbbf24; }
.status-icon.not-visited { color: rgba(255, 255, 255, 0.3); }
```

---

## 🧪 Testing Checklist

Ao adicionar novos subjects/topics, verifique:

### Sidebar
- [ ] Subject aparece na lista
- [ ] Topics aparecem quando expandido
- [ ] Auto-expande quando na rota do subject
- [ ] Busca encontra o subject/topics
- [ ] Progress bar atualiza corretamente
- [ ] Ícones de status funcionam
- [ ] Link navega para a rota correta
- [ ] Estado persiste ao recarregar

### Progress Tracking
- [ ] Página marca como "visitado" ao carregar
- [ ] Botão de "completo" funciona
- [ ] Progresso persiste no localStorage
- [ ] Estatísticas do subject atualizam
- [ ] Cross-tab sync funciona

### Navegação
- [ ] Rotas funcionam
- [ ] Breadcrumbs corretos
- [ ] Page transitions suaves
- [ ] Lazy loading funciona

### Responsivo
- [ ] Sidebar funciona em mobile
- [ ] Busca funciona em mobile
- [ ] Progress indicators visíveis
- [ ] Overlay fecha ao clicar fora

---

## 🐛 Troubleshooting

### Subject não aparece no sidebar

**Causa**: Não adicionado em `subjectsConfig.js`

**Solução**: Adicione o subject seguindo a estrutura correta

### Topics não expandem

**Causa**: Array `topics` vazio ou indefinido

**Solução**: Certifique-se de que `topics` é um array com pelo menos 1 item

### Progresso não persiste

**Causa**: localStorage bloqueado ou erro de serialização

**Solução**: Verifique console para erros, teste `localStorage` manualmente

### Busca não funciona

**Causa**: Títulos ou nomes inconsistentes

**Solução**: Verifique se `title` e `name` estão definidos corretamente

### Rota não encontrada

**Causa**: Rota não adicionada em `App.jsx`

**Solução**: Adicione `<Route path="..." element={<Component />} />`

---

## 📚 Recursos Relacionados

- [01-ESTRUTURA-DO-SITE.md](./01-ESTRUTURA-DO-SITE.md) - Arquitetura geral
- [02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md](./02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md) - Criar subjects
- [ROUTING_GUIDE.md](../ROUTING_GUIDE.md) - Sistema de rotas

---

## 🔄 Migrações Futuras

Se precisar migrar ou atualizar a estrutura de dados:

1. **Adicionar versão ao localStorage**:
```javascript
const PROGRESS_VERSION = 2;
localStorage.setItem('l2educa_progress_version', PROGRESS_VERSION);
```

2. **Migration script**:
```javascript
const migrateProgress = (oldData) => {
  // Transformar dados antigos para nova estrutura
  return newData;
};
```

3. **Backward compatibility**: Sempre manter suporte para versão anterior por pelo menos 1 release.

---

**Última atualização**: 28 de Outubro de 2025  
**Versão do Sistema**: 2.0 Universal

