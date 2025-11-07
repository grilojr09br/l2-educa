import React from 'react';
import SubjectPageTemplate from '../components/SubjectPageTemplate';

const EnglishSubject = () => {
  const topics = [
    {
      id: 'grammar',
      title: 'Grammar & Vocabulary',
      icon: 'spellcheck',
      description: 'Essential grammar rules, tenses, and vocabulary building',
      path: '/english/grammar',
      difficulty: 'Intermediário',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
      comingSoon: true,
    },
    {
      id: 'reading',
      title: 'Reading Comprehension',
      icon: 'auto_stories',
      description: 'Improve your reading skills with texts and exercises',
      path: '/english/reading',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
      comingSoon: true,
    },
  ];

  const stats = {
    content: '110 min',
    extra: '180',
    extraLabel: 'Exercises',
  };

  return (
    <SubjectPageTemplate
      subjectName="Inglês"
      subjectIcon="language"
      title="English: Master the Language"
      subtitle="Master English through grammar, vocabulary, and reading comprehension"
      topics={topics}
      stats={stats}
      className="english-subject-page"
    />
  );
};

export default EnglishSubject;
