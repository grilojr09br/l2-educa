import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './PortugueseSubject.css';

const PortugueseSubject = () => {

  const topics = [
    {
      id: 1,
      title: 'Interpretação de Textos',
      description: 'Estratégias de leitura, identificação de ideias principais e análise crítica de textos',
      icon: 'book',
      difficulty: 'Intermediário',
      duration: '40 min',
      path: '/portuguese/interpretacao',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    },
    {
      id: 2,
      title: 'Concordância Verbal e Nominal',
      description: 'Regras de concordância entre sujeito e verbo, e entre substantivos e adjetivos',
      icon: 'check_circle',
      difficulty: 'Intermediário',
      duration: '45 min',
      path: '/portuguese/concordancia',
      gradient: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
    },
    {
      id: 3,
      title: 'Regência Verbal e Nominal',
      description: 'Relação entre verbos e seus complementos, uso correto de preposições',
      icon: 'arrow_forward',
      difficulty: 'Avançado',
      duration: '50 min',
      path: '/portuguese/regencia',
      gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    },
    {
      id: 4,
      title: 'Crase',
      description: 'Regras de uso da crase, casos obrigatórios, proibidos e facultativos',
      icon: 'functions',
      difficulty: 'Avançado',
      duration: '35 min',
      path: '/portuguese/crase',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    },
    {
      id: 5,
      title: 'Pontuação',
      description: 'Uso correto dos sinais de pontuação e seu impacto no sentido do texto',
      icon: 'edit',
      difficulty: 'Básico',
      duration: '30 min',
      path: '/portuguese/pontuacao',
      gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    },
  ];

  return (
    <div className="portuguese-subject-page">
      <NavigationBar />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="material-icons">home</span>
          Início
        </Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Português</span>
      </div>

      {/* Hero Section */}
      <div className="portuguese-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">menu_book</span>
            PORTUGUÊS
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="portuguese-title">
            <span className="gradient-text">Português</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="portuguese-subtitle">
            Domine a língua portuguesa com foco em interpretação, gramática e uso correto da norma culta
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={300}>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{topics.length}</div>
              <div className="stat-label">Tópicos</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">200</div>
              <div className="stat-label">Minutos</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Topics Grid */}
      <section className="topics-section">
        <ScrollReveal>
          <h2 className="section-title">
            <span className="material-icons">book</span>
            Tópicos de Estudo
          </h2>
        </ScrollReveal>

        <div className="topics-grid">
          {topics.map((topic, index) => (
            <ScrollReveal key={topic.id} delay={index * 100}>
              <Link
                to={topic.path}
                className="topic-card-link"
              >
                <GlassCard className="topic-card-content">
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
                        <span className="material-icons">signal_cellular_alt</span>
                        {topic.difficulty}
                      </span>
                      <span className="meta-item">
                        <span className="material-icons">schedule</span>
                        {topic.duration}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="topic-enter">
                    <span className="material-icons">arrow_forward</span>
                  </div>

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

export default PortugueseSubject;
