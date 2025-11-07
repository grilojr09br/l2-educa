import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const BiologySubject = () => {
  const topics = [
    {
      id: 'filos-animais',
      title: 'Filos Animais',
      icon: 'pets',
      description: 'Comparação detalhada dos principais filos animais: Poríferos, Cnidários, Platelmintos, Nematelmintos, Moluscos e Anelídeos',
      path: '/biology/filos-animais',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
      comingSoon: false,
    },
    {
      id: 'celular',
      title: 'Biologia Celular',
      icon: 'cell_tower',
      description: 'Estrutura e função das células, organelas e processos celulares fundamentais',
      path: '/biology/celular',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
      comingSoon: true,
    },
    {
      id: 'bioquimica',
      title: 'Bioquímica',
      icon: 'science',
      description: 'Lipídios, proteínas, aminoácidos e carboidratos essenciais para a vida',
      path: '/biology/bioquimica',
      difficulty: 'Intermediário',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      comingSoon: true,
    },
    {
      id: 'genetica',
      title: 'Genética',
      icon: 'biotech',
      description: 'Leis de Mendel, herança genética e biotecnologia',
      path: '/biology/genetica',
      difficulty: 'Avançado',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
      comingSoon: true,
    },
    {
      id: 'ecologia',
      title: 'Ecologia',
      icon: 'nature',
      description: 'Ecossistemas, cadeias alimentares e relações ecológicas',
      path: '/biology/ecologia',
      difficulty: 'Básico',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #84cc16 0%, #22c55e 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '205 min',
    extra: '310',
    extraLabel: 'Exercícios',
  };

  return (
    <SubjectPageTemplate
      subjectName="Biologia"
      subjectIcon="nature"
      title="Biologia: A Ciência da Vida"
      subtitle="Descubra os segredos da vida através da biologia celular, bioquímica, genética e ecologia"
      topics={topics}
      stats={stats}
      className="biology-subject-page"
    />
  );
};

export default BiologySubject;
