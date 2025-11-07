import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import { SUBJECTS_CONFIG } from '../config/subjectsConfig';
import './PhysicsSubject.css';

const PhysicsSubject = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Get topics from centralized config and add descriptions
  const topicsFromConfig = SUBJECTS_CONFIG.physics.topics.map(topic => ({
    ...topic,
    description: getTopicDescription(topic.id),
    comingSoon: false, // All new topics are available
  }));

  // Additional topics still in development
  const additionalTopics = [
    {
      id: 'mechanics',
      title: 'Mecânica Clássica',
      icon: 'settings',
      description: 'Explore as leis de Newton, força, movimento, energia cinética e potencial. Fundamentos essenciais da física.',
      path: '/physics/mecanica',
      difficulty: 'Em Breve',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      comingSoon: true,
    },
    {
      id: 'thermodynamics',
      title: 'Termodinâmica',
      icon: 'whatshot',
      description: 'Temperatura, calor, leis da termodinâmica e transformações gasosas. Compreenda o comportamento térmico da matéria.',
      path: '/physics/termodinamica',
      difficulty: 'Em Breve',
      duration: '55 min',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
      comingSoon: true,
    },
    {
      id: 'modern-physics',
      title: 'Física Moderna',
      icon: 'psychology',
      description: 'Relatividade, física quântica, átomo, radioatividade. Descubra os mistérios do universo moderno.',
      path: '/physics/moderna',
      difficulty: 'Em Breve',
      duration: '70 min',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      comingSoon: true,
    },
  ];

  const topics = [...topicsFromConfig, ...additionalTopics];

  // Helper function to get descriptions for topics
  function getTopicDescription(topicId) {
    const descriptions = {
      'exercicios-enem': 'Resolva e compreenda questões do ENEM com explicações detalhadas passo a passo. Mecânica, cinemática, energia, trabalho e muito mais.',
      'transformadores': 'Aprenda sobre transformadores elétricos com questões de ENEM e VUNESP. Relação entre espiras, tensão e corrente. Aplicações práticas.',
      'magnetismo': 'Domine propriedades dos ímãs, campo magnético e força magnética com questões de vestibulares. Teoria e prática.',
      'espelhos-planos': 'Óptica geométrica: formação de imagens, campo visual, reflexão e múltiplos espelhos. Questões resolvidas passo a passo.',
      'espelhos-esfericos': 'Espelhos côncavos e convexos: equação de Gauss, aumento linear e aplicações. Inclui questão do mirascópio ENEM 2024.',
      'optica': 'Reflexão, refração, lentes, espelhos e instrumentos ópticos. Compreenda os fenômenos luminosos com visualizações interativas.',
      'eletromagnetismo': 'Eletricidade, magnetismo, corrente elétrica, circuitos e campos eletromagnéticos. A física da energia elétrica com calculadoras interativas.',
    };
    return descriptions[topicId] || 'Conteúdo de física com exercícios resolvidos.';
  }

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    let filtered = [...topics];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      if (difficultyFilter === 'available') {
        filtered = filtered.filter(topic => !topic.comingSoon);
      } else if (difficultyFilter === 'coming-soon') {
        filtered = filtered.filter(topic => topic.comingSoon);
      } else {
        filtered = filtered.filter(topic => 
          topic.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
        );
      }
    }

    // Sort: Active content first, then by difficulty
    filtered.sort((a, b) => {
      // Prioritize available content
      if (a.comingSoon !== b.comingSoon) {
        return a.comingSoon ? 1 : -1;
      }
      // Then sort by title
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [searchQuery, difficultyFilter, topics]);

  return (
    <div className="physics-subject-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="material-icons">home</span>
          Terminal
        </Link>
        <span className="material-icons breadcrumb-separator">chevron_right</span>
        <span className="breadcrumb-current">Física</span>
      </div>

      {/* Header */}
      <section className="physics-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">science</span>
            FÍSICA
          </div>
          <h1 className="physics-title">
            <span className="gradient-text">Física: Desvendando o Universo</span>
          </h1>
          <p className="physics-subtitle">
            Compreenda as leis fundamentais que regem o universo. Da mecânica clássica à física quântica,
            explore os fenômenos naturais com explicações claras e exemplos práticos.
          </p>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{topics.filter(t => !t.comingSoon).length}</div>
              <div className="stat-label">Tópicos Disponíveis</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{topics.length}</div>
              <div className="stat-label">Total de Tópicos</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">ENEM</div>
              <div className="stat-label">Questões e Teoria</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Topics Grid */}
      <section className="topics-section">
        <ScrollReveal>
          <h2 className="section-title">
            <span className="material-icons">folder_open</span>
            Selecione um Tópico
          </h2>
        </ScrollReveal>

        {/* Search and Filter Controls */}
        <ScrollReveal>
          <div className="subject-controls">
            <div className="search-bar">
              <span className="material-icons search-icon">search</span>
              <input
                type="text"
                placeholder="Buscar tópicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar busca"
                >
                  <span className="material-icons">close</span>
                </button>
              )}
            </div>

            <div className="filter-group">
              <span className="material-icons filter-icon">filter_list</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="difficulty-filter"
              >
                <option value="all">Todos os Níveis</option>
                <option value="available">Disponíveis Agora</option>
                <option value="coming-soon">Em Breve</option>
                <option value="intermediário">Intermediário</option>
                <option value="avançado">Avançado</option>
                <option value="todos os níveis">Todos os Níveis</option>
              </select>
            </div>

            <div className="results-count">
              {filteredTopics.length} {filteredTopics.length === 1 ? 'tópico' : 'tópicos'}
            </div>
          </div>
        </ScrollReveal>

        <div className="topics-grid">
          {filteredTopics.map((topic, index) => (
            <ScrollReveal key={topic.id} delay={index * 100}>
              <Link 
                to={topic.comingSoon ? '#' : topic.path} 
                className={`topic-card-link ${topic.comingSoon ? 'disabled' : ''}`}
              >
                <GlassCard className="topic-card-content">
                  {/* Coming Soon Badge */}
                  {topic.comingSoon && (
                    <div className="coming-soon-badge">
                      <span className="material-icons">schedule</span>
                      Em Breve
                    </div>
                  )}

                  {/* Icon Container */}
                  <div className="topic-icon-container" style={{ background: topic.gradient }}>
                    <span className="material-icons topic-icon">{topic.icon}</span>
                    <div className="icon-glow" style={{ background: topic.gradient }}></div>
                  </div>

                  {/* Content */}
                  <div className="topic-content">
                    <h3 className="topic-title">{topic.title}</h3>
                    <p className="topic-description">{topic.description}</p>

                    {/* Meta Info */}
                    <div className="topic-meta">
                      <span className="meta-item">
                        <span className="material-icons">
                          {topic.comingSoon ? 'lock' : 'signal_cellular_alt'}
                        </span>
                        {topic.difficulty}
                      </span>
                      <span className="meta-item">
                        <span className="material-icons">schedule</span>
                        {topic.duration}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  {!topic.comingSoon && (
                    <div className="topic-enter">
                      <span className="material-icons">arrow_forward</span>
                    </div>
                  )}

                  {/* Decorative elements */}
                  <div className="topic-corner-tl"></div>
                  <div className="topic-corner-br"></div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PhysicsSubject;

