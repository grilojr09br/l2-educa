import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const ChemistrySubject = () => {
  const topics = [
    {
      id: 'organica',
      title: 'Química Orgânica',
      icon: 'science',
      description: 'Estudo dos compostos de carbono, nomenclatura, funções orgânicas e reações',
      path: '/chemistry/organica',
      difficulty: 'Intermediário',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      comingSoon: true,
    },
    {
      id: 'cinetica',
      title: 'Cinética Química',
      icon: 'speed',
      description: 'Velocidade das reações, fatores que influenciam e mecanismos de reação',
      path: '/chemistry/cinetica',
      difficulty: 'Intermediário',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      comingSoon: true,
    },
    {
      id: 'nox',
      title: 'NOX e Reações de Oxidação',
      icon: 'shuffle',
      description: 'Número de oxidação, balanceamento de equações redox e aplicações',
      path: '/chemistry/nox',
      difficulty: 'Básico',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
      comingSoon: true,
    },
    {
      id: 'radioatividade',
      title: 'Radioatividade',
      icon: 'warning',
      description: 'Desintegração nuclear, meia-vida e aplicações da radioatividade',
      path: '/chemistry/radioatividade',
      difficulty: 'Intermediário',
      duration: '40 min',
      gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
      comingSoon: true,
    },
    {
      id: 'tabela-periodica',
      title: 'Tabela Periódica Interativa',
      icon: 'grid_on',
      description: 'Explore os elementos químicos de forma interativa e visual',
      path: '/chemistry/tabela-periodica',
      difficulty: 'Referência',
      duration: '∞',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '300 min',
    extra: '118',
    extraLabel: 'Elementos',
  };

  return (
    <SubjectPageTemplate
      subjectName="Química"
      subjectIcon="biotech"
      title="Química: Transformando a Matéria"
      subtitle="Explore o mundo molecular através da química orgânica, cinética, reações e a tabela periódica interativa"
      topics={topics}
      stats={stats}
      className="chemistry-subject-page"
    />
  );
};

export default ChemistrySubject;
