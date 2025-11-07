import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const SociologySubject = () => {
  const topics = [
    {
      id: 'contemporanea',
      title: 'Sociologia Contemporânea',
      icon: 'groups',
      description: 'Questões sociais atuais, desigualdade e transformações sociais',
      path: '/sociology/contemporanea',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      comingSoon: true,
    },
    {
      id: 'teorias',
      title: 'Teorias Sociológicas',
      icon: 'psychology',
      description: 'Pensadores clássicos e modernos da sociologia',
      path: '/sociology/teorias',
      difficulty: 'Avançado',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '110 min',
    extra: '110',
    extraLabel: 'Pensadores',
  };

  return (
    <SubjectPageTemplate
      subjectName="Sociologia"
      subjectIcon="groups"
      title="Sociologia: Entendendo a Sociedade"
      subtitle="Compreenda as relações sociais e as transformações da sociedade contemporânea"
      topics={topics}
      stats={stats}
      className="sociology-subject-page"
    />
  );
};

export default SociologySubject;
