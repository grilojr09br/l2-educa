import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const GeographySubject = () => {
  const topics = [
    {
      id: 'industrializacao',
      title: 'Industrialização Mundial',
      icon: 'factory',
      description: 'Revoluções industriais, blocos econômicos, EUA e China',
      path: '/geografia/industrializacao',
      difficulty: 'Médio',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      comingSoon: false,
    },
    {
      id: 'urbanizacao',
      title: 'Urbanização',
      icon: 'location_city',
      description: 'Conceitos urbanos, problemas e planejamento das cidades',
      path: '/geografia/urbanizacao',
      difficulty: 'Básico',
      duration: '40 min',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
      comingSoon: false,
    },
    {
      id: 'agricultura',
      title: 'Espaço Agrário',
      icon: 'agriculture',
      description: 'Sistemas agrícolas, Revolução Verde e conflitos no campo',
      path: '/geografia/agricultura',
      difficulty: 'Médio',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)',
      comingSoon: false,
    },
    {
      id: 'fisica',
      title: 'Geografia Física',
      icon: 'terrain',
      description: 'Relevo, clima, vegetação e recursos naturais do planeta',
      path: '/geography/fisica',
      difficulty: 'Intermediário',
      duration: '55 min',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
      comingSoon: true,
    },
    {
      id: 'humana',
      title: 'Geografia Humana',
      icon: 'groups',
      description: 'População, migração e questões socioambientais',
      path: '/geography/humana',
      difficulty: 'Básico',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '240 min',
    extra: '280',
    extraLabel: 'Mapas',
  };

  return (
    <SubjectPageTemplate
      subjectName="Geografia"
      subjectIcon="public"
      title="Geografia: Compreendendo o Mundo"
      subtitle="Explore o mundo através da geografia física, humana e geopolítica"
      topics={topics}
      stats={stats}
      className="geography-subject-page"
    />
  );
};

export default GeographySubject;
