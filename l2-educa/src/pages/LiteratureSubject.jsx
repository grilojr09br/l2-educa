import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const LiteratureSubject = () => {
  const topics = [
    {
      id: 'modernismo-portugues',
      title: 'Modernismo Português',
      icon: 'public',
      description: 'Revista Orpheu, Fernando Pessoa, Sá-Carneiro e os heterônimos',
      path: '/literature/modernismo-portugues',
      difficulty: 'Avançado',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      comingSoon: false,
    },
    {
      id: 'modernismo-brasileiro-2',
      title: 'Modernismo Brasileiro - 2ª Fase',
      icon: 'history_edu',
      description: 'Geração de 30: Drummond, Cecília Meireles, Vinicius e Murilo Mendes',
      path: '/literature/modernismo-brasileiro-segunda-fase',
      difficulty: 'Intermediário',
      duration: '55 min',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)',
      comingSoon: false,
    },
    {
      id: 'modernismo-brasileiro-3',
      title: 'Modernismo Brasileiro - 3ª Fase',
      icon: 'menu_book',
      description: 'Geração de 45: João Cabral, Guimarães Rosa e Clarice Lispector',
      path: '/literature/modernismo-brasileiro-terceira-fase',
      difficulty: 'Avançado',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      comingSoon: false,
    },
    {
      id: 'movimentos-posteriores',
      title: 'Movimentos Posteriores',
      icon: 'rocket_launch',
      description: 'Concretismo (anos 50) e Poesia Marginal (anos 70)',
      path: '/literature/movimentos-posteriores',
      difficulty: 'Intermediário',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)',
      comingSoon: false,
    },
    {
      id: 'movimentos',
      title: 'Movimentos Literários',
      icon: 'auto_stories',
      description: 'Romantismo, realismo, modernismo e literatura contemporânea',
      path: '/literature/movimentos',
      difficulty: 'Intermediário',
      duration: '55 min',
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #fde047 100%)',
      comingSoon: true,
    },
    {
      id: 'analise',
      title: 'Análise Literária',
      icon: 'search',
      description: 'Técnicas de interpretação de textos e obras literárias',
      path: '/literature/analise',
      difficulty: 'Avançado',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '315 min',
    extra: '50+',
    extraLabel: 'Autores',
  };

  return (
    <SubjectPageTemplate
      subjectName="Literatura"
      subjectIcon="auto_stories"
      title="Literatura: A Arte da Palavra"
      subtitle="Explore os movimentos literários e desenvolva suas habilidades de análise textual"
      topics={topics}
      stats={stats}
      className="literature-subject-page"
    />
  );
};

export default LiteratureSubject;
