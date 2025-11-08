# 📚 Guia: Como Criar Páginas de Disciplinas Padronizadas

## 🎯 Objetivo

Usar o `SubjectPageTemplate` garante:
- ✅ **Estrutura consistente** entre todas as disciplinas
- ✅ **Animações padronizadas** (sem bugs)
- ✅ **Menos código** para manter
- ✅ **Experiência uniforme** para o usuário

---

## 🚀 Como Usar (3 passos simples)

### 1️⃣ Crie o arquivo da disciplina

```jsx
// src/pages/NomeDaDisciplina.jsx
import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const NomeDaDisciplina = () => {
  // Defina os tópicos
  const topics = [
    {
      id: 'topico-1',
      title: 'Nome do Tópico',
      icon: 'icone_material', // Material Icons
      description: 'Descrição breve do tópico',
      path: '/disciplina/topico-1',
      difficulty: 'Básico | Intermediário | Avançado',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #cor1, #cor2)',
      comingSoon: false, // true para "Em Breve"
    },
    // ... mais tópicos
  ];

  // Estatísticas personalizadas (opcional)
  const stats = {
    content: '180 min', // ou deixe para calcular automaticamente
    extra: '150',
    extraLabel: 'Exercícios',
  };

  return (
    <SubjectPageTemplate
      subjectName="Nome da Disciplina"
      subjectIcon="icone_material"
      title="Título Principal Inspirador"
      subtitle="Descrição curta e motivadora da disciplina"
      topics={topics}
      stats={stats}
      className="nome-disciplina-page" // opcional
    />
  );
};

export default NomeDaDisciplina;
```

### 2️⃣ **NÃO** crie CSS separado

O template já tem todo o CSS necessário. Se precisar de customização específica, use a prop `className`.

### 3️⃣ Adicione a rota no App.jsx

```jsx
import NomeDaDisciplina from './pages/NomeDaDisciplina';

// No lazy loading:
const NomeDaDisciplina = lazy(() => import('./pages/NomeDaDisciplina'));

// Nas rotas:
<Route path="/disciplina" element={<NomeDaDisciplina />} />
```

---

## 📋 Props do SubjectPageTemplate

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `subjectName` | string | ✅ | Nome da disciplina (ex: "Matemática") |
| `subjectIcon` | string | ✅ | Ícone Material Icons (ex: "functions") |
| `title` | string | ✅ | Título principal (ex: "Matemática de Nível Mestre") |
| `subtitle` | string | ✅ | Descrição/subtítulo |
| `topics` | array | ✅ | Array de objetos com os tópicos |
| `stats` | object | ❌ | Estatísticas personalizadas (opcional) |
| `className` | string | ❌ | Classe CSS adicional (opcional) |

---

## 📝 Estrutura de um Tópico

```javascript
{
  id: 'identificador-unico',           // Obrigatório
  title: 'Título do Tópico',           // Obrigatório
  icon: 'material_icon_name',          // Obrigatório
  description: 'Descrição detalhada',  // Obrigatório
  path: '/disciplina/topico',          // Obrigatório
  difficulty: 'Intermediário',         // Obrigatório
  duration: '45 min',                  // Obrigatório
  gradient: 'linear-gradient(...)',    // Obrigatório
  comingSoon: false,                   // Opcional (default: false)
}
```

---

## 🎨 Gradientes Sugeridos por Área

```javascript
// Matemática
'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'

// Ciências (Física, Química, Biologia)
'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'

// Humanas (História, Geografia, Filosofia)
'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)'

// Linguagens (Português, Inglês, Literatura)
'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)'

// Artes
'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)'
```

---

## ✅ Exemplo Completo: Química

```jsx
import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const ChemistrySubject = () => {
  const topics = [
    {
      id: 'organic',
      title: 'Química Orgânica',
      icon: 'science',
      description: 'Estude compostos orgânicos, nomenclatura e reações',
      path: '/chemistry/organica',
      difficulty: 'Avançado',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      comingSoon: true,
    },
    {
      id: 'periodic-table',
      title: 'Tabela Periódica',
      icon: 'grid_on',
      description: 'Explore elementos, propriedades periódicas e famílias',
      path: '/chemistry/tabela-periodica',
      difficulty: 'Intermediário',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '300 min',
    extra: '200',
    extraLabel: 'Reações',
  };

  return (
    <SubjectPageTemplate
      subjectName="Química"
      subjectIcon="biotech"
      title="Química: Transformando a Matéria"
      subtitle="Desvende as reações, elementos e transformações químicas que moldam nosso mundo"
      topics={topics}
      stats={stats}
    />
  );
};

export default ChemistrySubject;
```

---

## 🚫 O Que NÃO Fazer

❌ **NÃO crie CSS separado** para cada disciplina  
❌ **NÃO use** `NavigationBar` (é para páginas de conteúdo)  
❌ **NÃO use** `useNavigation().navigateWithTransition`  
❌ **NÃO reimplemente** a estrutura (breadcrumb, hero, grid)  
❌ **NÃO use** estruturas de dados diferentes

---

## 📦 Benefícios

✅ **Código reduzido**: ~30 linhas vs ~200 linhas  
✅ **Manutenção centralizada**: Mudar o template atualiza todas as páginas  
✅ **Sem bugs de animação**: Tudo padronizado  
✅ **Consistência visual**: Mesma experiência em todas as disciplinas  
✅ **Desenvolvimento rápido**: Nova disciplina em 5 minutos  

---

## 🔄 Migração de Páginas Antigas

1. Copie apenas o array `topics`
2. Ajuste os nomes das propriedades se necessário
3. Delete o CSS antigo
4. Use o template

**Antes**: 200 linhas (JSX + CSS)  
**Depois**: 30 linhas (só JSX)

---

## 💡 Dicas

- Use ícones Material Icons relevantes para cada tópico
- Mantenha descrições entre 80-120 caracteres
- Use `comingSoon: true` para conteúdo futuro
- Gradientes tornam os cards mais atrativos
- Difficulty deve ser: Básico, Intermediário ou Avançado

---

**Pronto! Agora todas as páginas de disciplinas são padronizadas e consistentes! 🎉**

