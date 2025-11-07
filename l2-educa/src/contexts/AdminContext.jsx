import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// Default subjects data - always reflects latest updates
const DEFAULT_SUBJECTS = [
  {
    id: 'mathematics',
    name: 'Matemática',
    icon: 'functions',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    description: 'Álgebra, Geometria, Cálculo',
    path: '/math',
    topics: 4,
    status: 'ativo',
  },
  {
    id: 'physics',
    name: 'Física',
    icon: 'science',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
    description: 'Mecânica, Óptica, Eletromagnetismo',
    path: '/physics',
    topics: 3,
    status: 'ativo',
  },
  {
    id: 'chemistry',
    name: 'Química',
    icon: 'biotech',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    description: 'Orgânica, Cinética, Tabela Periódica',
    path: '/chemistry',
    topics: 5,
    status: 'em atualização',
  },
  {
    id: 'biology',
    name: 'Biologia',
    icon: 'nature',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
    description: 'Celular, Bioquímica, Genética',
    path: '/biology',
    topics: 4,
    status: 'em atualização',
  },
  {
    id: 'philosophy',
    name: 'Filosofia',
    icon: 'psychology',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    description: 'Antiga, Moderna, Ética',
    path: '/philosophy',
    topics: 4,
    status: 'em atualização',
  },
  {
    id: 'history',
    name: 'História',
    icon: 'history_edu',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    description: 'Idade Média, Brasil, Mundial',
    path: '/history',
    topics: 3,
    status: 'em atualização',
  },
  {
    id: 'portuguese',
    name: 'Português',
    icon: 'menu_book',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    description: 'Gramática, Ortografia, Figuras',
    path: '/portuguese',
    topics: 3,
    status: 'em atualização',
  },
  {
    id: 'geography',
    name: 'Geografia',
    icon: 'public',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    description: 'Física, Humana, Geopolítica',
    path: '/geography',
    topics: 2,
    status: 'em atualização',
  },
  {
    id: 'sociology',
    name: 'Sociologia',
    icon: 'groups',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    description: 'Contemporânea, Teorias Sociais',
    path: '/sociology',
    topics: 2,
    status: 'em atualização',
  },
  {
    id: 'literature',
    name: 'Literatura',
    icon: 'auto_stories',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    description: 'Modernismo, Movimentos Literários',
    path: '/literature',
    topics: 6,
    status: 'ativo',
  },
  {
    id: 'arts',
    name: 'Artes',
    icon: 'palette',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    description: 'Movimentos Artísticos, História',
    path: '/arts',
    topics: 2,
    status: 'em atualização',
  },
  {
    id: 'english',
    name: 'Inglês',
    icon: 'language',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    description: 'Grammar, Vocabulary, Reading',
    path: '/english',
    topics: 2,
    status: 'em atualização',
  },
  {
    id: 'programming',
    name: 'Programação',
    icon: 'code',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    description: 'Python, JavaScript, Algoritmos',
    path: '/programming',
    topics: 0,
    comingSoon: true,
    status: 'em breve',
  },
];

export const AdminProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(() => {
    // ONE-TIME MIGRATION: Clear old cached data from previous system
    // This ensures all users get the new Literatura topics
    const needsMigration = localStorage.getItem('l2educa_needs_migration');
    if (needsMigration !== 'false') {
      console.log('🔄 One-time migration: clearing old cached data');
      localStorage.removeItem('l2educa_subjects');
      localStorage.removeItem('l2educa_subjects_customized');
      localStorage.removeItem('l2educa_data_version');
      localStorage.setItem('l2educa_needs_migration', 'false');
      console.log('✨ Using latest default subjects (after migration)');
      return DEFAULT_SUBJECTS;
    }
    
    // Check if user has customized subjects (flag in localStorage)
    const isCustomized = localStorage.getItem('l2educa_subjects_customized') === 'true';
    
    if (isCustomized) {
      // User has customized subjects via admin panel - load their custom data
      const stored = localStorage.getItem('l2educa_subjects');
      if (stored) {
        try {
          console.log('📋 Loading customized subjects from admin panel');
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored subjects:', e);
          return DEFAULT_SUBJECTS;
        }
      }
    }
    
    // Default: always use latest DEFAULT_SUBJECTS (no caching)
    console.log('✨ Using latest default subjects');
    return DEFAULT_SUBJECTS;
  });

  const [persistenceMode, setPersistenceMode] = useState('session'); // 'session', 'localStorage', 'manual'
  
  // TODO: Backend authentication integration
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Save to localStorage only when persistenceMode is 'localStorage'
  // This is only used when admin explicitly saves changes
  useEffect(() => {
    if (persistenceMode === 'localStorage') {
      localStorage.setItem('l2educa_subjects', JSON.stringify(subjects));
      localStorage.setItem('l2educa_subjects_customized', 'true');
    }
  }, [subjects, persistenceMode]);

  // Update a subject (marks data as customized)
  const updateSubject = (subjectId, updates) => {
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === subjectId 
          ? { ...subject, ...updates }
          : subject
      )
    );
    // Mark as customized when user edits via admin panel
    localStorage.setItem('l2educa_subjects_customized', 'true');
    localStorage.setItem('l2educa_subjects', JSON.stringify(subjects));
  };

  // Add a new subject (marks data as customized)
  const addSubject = (newSubject) => {
    const newSubjects = [...subjects, {
      id: newSubject.id || `subject-${Date.now()}`,
      name: newSubject.name || 'Nova Disciplina',
      icon: newSubject.icon || 'school',
      color: newSubject.color || '#6366f1',
      gradient: newSubject.gradient || 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      description: newSubject.description || '',
      path: newSubject.path || `/${newSubject.id}`,
      topics: newSubject.topics || 0,
      status: newSubject.status || 'em breve',
      comingSoon: newSubject.comingSoon || false,
    }];
    setSubjects(newSubjects);
    // Mark as customized when user adds via admin panel
    localStorage.setItem('l2educa_subjects_customized', 'true');
    localStorage.setItem('l2educa_subjects', JSON.stringify(newSubjects));
  };

  // Delete a subject (marks data as customized)
  const deleteSubject = (subjectId) => {
    const newSubjects = subjects.filter(subject => subject.id !== subjectId);
    setSubjects(newSubjects);
    // Mark as customized when user deletes via admin panel
    localStorage.setItem('l2educa_subjects_customized', 'true');
    localStorage.setItem('l2educa_subjects', JSON.stringify(newSubjects));
  };

  // Reset to default subjects (clears customization flag)
  const resetToDefault = () => {
    setSubjects(DEFAULT_SUBJECTS);
    // Clear customization flag to return to using defaults
    localStorage.removeItem('l2educa_subjects_customized');
    localStorage.removeItem('l2educa_subjects');
    console.log('🔄 Reset to default subjects - will now auto-update with code changes');
  };

  // Export configuration
  const exportConfig = () => {
    const config = {
      subjects,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `l2educa-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import configuration
  const importConfig = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          if (config.subjects && Array.isArray(config.subjects)) {
            setSubjects(config.subjects);
            // Mark as customized when importing config
            localStorage.setItem('l2educa_subjects_customized', 'true');
            localStorage.setItem('l2educa_subjects', JSON.stringify(config.subjects));
            resolve(config);
          } else {
            reject(new Error('Invalid config format'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  // Manual save to localStorage (marks as customized)
  const saveToLocalStorage = () => {
    localStorage.setItem('l2educa_subjects', JSON.stringify(subjects));
    localStorage.setItem('l2educa_subjects_customized', 'true');
    console.log('💾 Subjects saved - will persist custom changes');
  };

  // Clear localStorage (returns to using defaults)
  const clearLocalStorage = () => {
    localStorage.removeItem('l2educa_subjects');
    localStorage.removeItem('l2educa_subjects_customized');
    console.log('🗑️ Cleared custom subjects - will now auto-update with code changes');
  };

  // TODO: Backend authentication functions (placeholders)
  const login = async (username, password) => {
    console.warn('⚠️ Backend authentication not implemented yet');
    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    // setUser(data.user);
    // setAuthToken(data.token);
    // setIsAuthenticated(true);
    
    // Temporary dev bypass
    if (import.meta.env.MODE === 'development') {
      setUser({ username, role: 'admin' });
      setIsAuthenticated(true);
      return { success: true, user: { username, role: 'admin' } };
    }
    return { success: false, error: 'Backend not configured' };
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    // TODO: Call backend logout endpoint
  };

  const value = {
    subjects,
    setSubjects,
    updateSubject,
    addSubject,
    deleteSubject,
    resetToDefault,
    exportConfig,
    importConfig,
    persistenceMode,
    setPersistenceMode,
    saveToLocalStorage,
    clearLocalStorage,
    // Auth (future)
    user,
    authToken,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

