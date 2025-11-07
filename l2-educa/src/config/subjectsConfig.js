// Centralized subjects and topics configuration
// Single source of truth for all navigation and content structure

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
      {
        id: 'polinomios',
        title: 'Polinômios',
        icon: 'calculate',
        path: '/math/polinomios',
        difficulty: 'Intermediário',
        duration: '50 min',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      },
      {
        id: 'geometria-analitica',
        title: 'Geometria Analítica',
        icon: 'analytics',
        path: '/math/geometria-analitica',
        difficulty: 'Avançado',
        duration: '55 min',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
      {
        id: 'equacao-circunferencia',
        title: 'Equação da Circunferência',
        icon: 'circle',
        path: '/math/equacao-circunferencia',
        difficulty: 'Intermediário',
        duration: '40 min',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
      },
      {
        id: 'excentricidade',
        title: 'Excentricidade',
        icon: 'lens',
        path: '/math/excentricidade',
        difficulty: 'Avançado',
        duration: '35 min',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
      },
    ],
  },
  physics: {
    id: 'physics',
    name: 'Física',
    icon: 'science',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
    path: '/physics',
    topics: [
      {
        id: 'exercicios-enem',
        title: 'Exercícios ENEM',
        icon: 'quiz',
        path: '/physics/exercicios-enem',
        difficulty: 'Todos os Níveis',
        duration: '14 questões',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      },
      {
        id: 'transformadores',
        title: 'Transformadores',
        icon: 'power',
        path: '/physics/transformadores',
        difficulty: 'Intermediário',
        duration: '8 questões',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      },
      {
        id: 'magnetismo',
        title: 'Magnetismo e Ímãs',
        icon: 'radio_button_checked',
        path: '/physics/magnetismo',
        difficulty: 'Intermediário',
        duration: '8 questões',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      },
      {
        id: 'espelhos-planos',
        title: 'Espelhos Planos',
        icon: 'flip',
        path: '/physics/espelhos-planos',
        difficulty: 'Básico',
        duration: '8 questões',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
      {
        id: 'espelhos-esfericos',
        title: 'Espelhos Esféricos',
        icon: 'lens',
        path: '/physics/espelhos-esfericos',
        difficulty: 'Avançado',
        duration: '8 questões',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
      },
      {
        id: 'optica',
        title: 'Óptica Completa',
        icon: 'visibility',
        path: '/physics/optica',
        difficulty: 'Intermediário',
        duration: '60 min',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
      {
        id: 'eletromagnetismo',
        title: 'Eletromagnetismo',
        icon: 'flash_on',
        path: '/physics/eletromagnetismo',
        difficulty: 'Avançado',
        duration: '75 min',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      },
    ],
  },
  chemistry: {
    id: 'chemistry',
    name: 'Química',
    icon: 'biotech',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    path: '/chemistry',
    topics: [],
  },
  biology: {
    id: 'biology',
    name: 'Biologia',
    icon: 'nature',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
    path: '/biology',
    topics: [
      {
        id: 'filos-animais',
        title: 'Filos Animais',
        icon: 'pets',
        path: '/biology/filos-animais',
        difficulty: 'Intermediário',
        duration: '50 min',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
      },
    ],
  },
  philosophy: {
    id: 'philosophy',
    name: 'Filosofia',
    icon: 'psychology',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    path: '/philosophy',
    topics: [],
  },
  history: {
    id: 'history',
    name: 'História',
    icon: 'history_edu',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    path: '/history',
    topics: [],
  },
  portuguese: {
    id: 'portuguese',
    name: 'Português',
    icon: 'menu_book',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    path: '/portuguese',
    topics: [
      {
        id: 'interpretacao',
        title: 'Interpretação de Textos',
        icon: 'book',
        path: '/portuguese/interpretacao',
        difficulty: 'Intermediário',
        duration: '40 min',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      },
      {
        id: 'concordancia',
        title: 'Concordância Verbal e Nominal',
        icon: 'check_circle',
        path: '/portuguese/concordancia',
        difficulty: 'Intermediário',
        duration: '45 min',
        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
      },
      {
        id: 'regencia',
        title: 'Regência Verbal e Nominal',
        icon: 'arrow_forward',
        path: '/portuguese/regencia',
        difficulty: 'Avançado',
        duration: '50 min',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
      },
      {
        id: 'crase',
        title: 'Crase',
        icon: 'functions',
        path: '/portuguese/crase',
        difficulty: 'Avançado',
        duration: '35 min',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      },
      {
        id: 'pontuacao',
        title: 'Pontuação',
        icon: 'edit',
        path: '/portuguese/pontuacao',
        difficulty: 'Básico',
        duration: '30 min',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
      },
    ],
  },
  geography: {
    id: 'geography',
    name: 'Geografia',
    icon: 'public',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    path: '/geography',
    topics: [
      {
        id: 'industrializacao',
        name: 'Industrialização Mundial',
        path: '/geografia/industrializacao',
        icon: 'factory'
      },
      {
        id: 'urbanizacao',
        name: 'Urbanização',
        path: '/geografia/urbanizacao',
        icon: 'location_city'
      },
      {
        id: 'agricultura',
        name: 'Espaço Agrário',
        path: '/geografia/agricultura',
        icon: 'agriculture'
      }
    ],
  },
  sociology: {
    id: 'sociology',
    name: 'Sociologia',
    icon: 'groups',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    path: '/sociology',
    topics: [],
  },
  literature: {
    id: 'literature',
    name: 'Literatura',
    icon: 'auto_stories',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    path: '/literature',
    topics: [],
  },
  arts: {
    id: 'arts',
    name: 'Artes',
    icon: 'palette',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    path: '/arts',
    topics: [],
  },
  english: {
    id: 'english',
    name: 'Inglês',
    icon: 'language',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    path: '/english',
    topics: [],
  },
};

// Helper function to get subject from path
export const getSubjectFromPath = (pathname) => {
  try {
    if (!pathname || typeof pathname !== 'string') {
      console.warn('getSubjectFromPath: Invalid pathname', pathname);
      return null;
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return null;

    const subjectPath = `/${pathSegments[0]}`;
    
    for (const subjectKey in SUBJECTS_CONFIG) {
      const subject = SUBJECTS_CONFIG[subjectKey];
      if (subject && subject.path === subjectPath) {
        return subject;
      }
    }
    return null;
  } catch (error) {
    console.error('Error in getSubjectFromPath:', error);
    return null;
  }
};

// Helper function to get topic from path
export const getTopicFromPath = (pathname, subject) => {
  try {
    if (!pathname || typeof pathname !== 'string') {
      console.warn('getTopicFromPath: Invalid pathname', pathname);
      return null;
    }
    
    if (!subject || !subject.topics || !Array.isArray(subject.topics)) {
      return null;
    }
    
    return subject.topics.find(topic => topic && topic.path === pathname) || null;
  } catch (error) {
    console.error('Error in getTopicFromPath:', error);
    return null;
  }
};

// Get all topics across all subjects (for search)
export const getAllTopics = () => {
  try {
    const allTopics = [];
    
    if (!SUBJECTS_CONFIG || typeof SUBJECTS_CONFIG !== 'object') {
      console.error('SUBJECTS_CONFIG is not properly defined');
      return [];
    }
    
    for (const subjectKey in SUBJECTS_CONFIG) {
      const subject = SUBJECTS_CONFIG[subjectKey];
      
      if (!subject) continue;
      
      if (subject.topics && Array.isArray(subject.topics) && subject.topics.length > 0) {
        subject.topics.forEach(topic => {
          if (topic && topic.id && topic.path) {
            allTopics.push({
              ...topic,
              subjectName: subject.name || 'Unknown',
              subjectId: subject.id || subjectKey,
              subjectIcon: subject.icon || 'school',
              subjectColor: subject.color || '#6366f1',
            });
          }
        });
      }
    }
    
    return allTopics;
  } catch (error) {
    console.error('Error in getAllTopics:', error);
    return [];
  }
};

// Get subject by ID
export const getSubjectById = (subjectId) => {
  try {
    if (!subjectId || typeof subjectId !== 'string') {
      console.warn('getSubjectById: Invalid subjectId', subjectId);
      return null;
    }
    
    if (!SUBJECTS_CONFIG || typeof SUBJECTS_CONFIG !== 'object') {
      console.error('SUBJECTS_CONFIG is not properly defined');
      return null;
    }
    
    return SUBJECTS_CONFIG[subjectId] || null;
  } catch (error) {
    console.error('Error in getSubjectById:', error);
    return null;
  }
};

export default SUBJECTS_CONFIG;

