import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const HistorySubject = () => {
  const topics = [
    {
      id: 'revolucao-francesa',
      title: 'Revolução Francesa',
      icon: 'gavel',
      description: '1789–1799: fases, eventos, personagens, documentos e legados.',
      path: '/history/revolucao-francesa',
      difficulty: 'Intermediário',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
    },
    {
      id: 'era-napoleonica',
      title: 'Era Napoleônica',
      icon: 'military_tech',
      description: '1799–1815: Consulado, Império, guerras, reformas e legado.',
      path: '/history/era-napoleonica',
      difficulty: 'Avançado',
      duration: '70 min',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    },
    {
      id: 'idade-media',
      title: 'Idade Média',
      icon: 'castle',
      description: 'Feudalismo, cruzadas, igreja medieval e transformações sociais',
      path: '/history/idade-media',
      difficulty: 'Intermediário',
      duration: '55 min',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      comingSoon: true,
    },
    {
      id: 'brasil',
      title: 'História do Brasil',
      icon: 'flag',
      description: 'Colonização, independência, república e Brasil contemporâneo',
      path: '/history/brasil',
      difficulty: 'Intermediário',
      duration: '80 min',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      comingSoon: true,
    },
    {
      id: 'mundial',
      title: 'História Mundial',
      icon: 'public',
      description: 'Grandes civilizações, guerras mundiais e relações internacionais',
      path: '/history/mundial',
      difficulty: 'Avançado',
      duration: '90 min',
      gradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '225 min',
    extra: '280',
    extraLabel: 'Eventos',
  };

  return (
    <SubjectPageTemplate
      subjectName="História"
      subjectIcon="history_edu"
      title="História: Compreendendo o Passado"
      subtitle="Compreenda os eventos que moldaram o mundo através dos séculos"
      topics={topics}
      stats={stats}
      className="history-subject-page"
    />
  );
};

export default HistorySubject;
