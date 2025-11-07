import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const PhilosophySubject = () => {
  const topics = [
    {
      id: 'antiga',
      title: 'Filosofia Antiga',
      icon: 'history_edu',
      description: 'Período Helenístico, estoicismo, epicurismo e filosofia greco-romana',
      path: '/philosophy/antiga',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      comingSoon: true,
    },
    {
      id: 'moderna',
      title: 'Filosofia Moderna',
      icon: 'auto_stories',
      description: 'Renascimento Cultural e Científico, Maquiavel e pensadores modernos',
      path: '/philosophy/moderna',
      difficulty: 'Intermediário',
      duration: '55 min',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      comingSoon: true,
    },
    {
      id: 'etica',
      title: 'Ética e Política',
      icon: 'balance',
      description: 'Teorias éticas, filosofia política e questões morais contemporâneas',
      path: '/philosophy/etica',
      difficulty: 'Avançado',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
      comingSoon: true,
    },
    {
      id: 'epistemologia',
      title: 'Epistemologia',
      icon: 'psychology',
      description: 'Teoria do conhecimento, racionalismo e empirismo',
      path: '/philosophy/epistemologia',
      difficulty: 'Avançado',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '215 min',
    extra: '195',
    extraLabel: 'Questões',
  };

  return (
    <SubjectPageTemplate
      subjectName="Filosofia"
      subjectIcon="psychology"
      title="Filosofia: O Amor à Sabedoria"
      subtitle="Explore o pensamento filosófico desde a antiguidade até os tempos modernos"
      topics={topics}
      stats={stats}
      className="philosophy-subject-page"
    />
  );
};

export default PhilosophySubject;
