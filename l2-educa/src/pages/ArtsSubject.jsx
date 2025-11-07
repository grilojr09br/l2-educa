import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const ArtsSubject = () => {
  const topics = [
    {
      id: 'movimentos',
      title: 'Movimentos Artísticos',
      icon: 'palette',
      description: 'História da arte através dos principais movimentos e estilos',
      path: '/arts/movimentos',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
      comingSoon: true,
    },
    {
      id: 'brasileira',
      title: 'Arte Brasileira',
      icon: 'brush',
      description: 'Arte indígena, colonial e contemporânea no Brasil',
      path: '/arts/brasileira',
      difficulty: 'Básico',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '95 min',
    extra: '75',
    extraLabel: 'Obras',
  };

  return (
    <SubjectPageTemplate
      subjectName="Artes"
      subjectIcon="palette"
      title="Artes: Expressão e Criação"
      subtitle="Descubra a história da arte e os movimentos que transformaram a expressão humana"
      topics={topics}
      stats={stats}
      className="arts-subject-page"
    />
  );
};

export default ArtsSubject;
