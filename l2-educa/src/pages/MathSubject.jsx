import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './MathSubject.css';

const MathSubject = () => {
  const topics = [
    {
      id: 'complex-numbers',
      title: 'Números Complexos',
      icon: 'functions',
      description: 'Explore o fascinante mundo dos números complexos, suas formas de representação, conversões entre forma algébrica e trigonométrica, e operações fundamentais.',
      path: '/math/numeros-complexos',
      difficulty: 'Intermediário',
      duration: '45 min',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    },
    {
      id: 'polynomials',
      title: 'Divisão de Polinômios',
      icon: 'calculate',
      description: 'Domine as técnicas de divisão de polinômios, desde o método da chave até o dispositivo de Briot-Ruffini, com visualizações interativas passo a passo.',
      path: '/math/polinomios',
      difficulty: 'Avançado',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    },
    {
      id: 'analytic-geometry',
      title: 'Geometria Analítica',
      icon: 'analytics',
      description: 'Compreenda distâncias entre pontos e retas, equações da reta em suas diversas formas, e recapitule conceitos essenciais de matrizes com aplicações práticas.',
      path: '/math/geometria-analitica',
      difficulty: 'Intermediário',
      duration: '60 min',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    },
    {
      id: 'circle-equation',
      title: 'Equação da Circunferência',
      icon: 'radio_button_unchecked',
      description: 'Aprenda a transformar a equação geral em forma reduzida usando a técnica de completar quadrados, identificando centro e raio da circunferência.',
      path: '/math/equacao-circunferencia',
      difficulty: 'Intermediário',
      duration: '40 min',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    },
    {
      id: 'eccentricity',
      title: 'Excentricidade',
      icon: 'track_changes',
      description: 'Definições, elipse, hipérbole e cálculo. Exemplo: 8x^2+50y^2=200.',
      path: '/math/excentricidade',
      difficulty: 'Intermediário',
      duration: '50 min',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
    },
  ];

  return (
    <div className="math-subject-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="material-icons">home</span>
          Terminal
        </Link>
        <span className="material-icons breadcrumb-separator">chevron_right</span>
        <span className="breadcrumb-current">Matemática</span>
      </div>

      {/* Header */}
      <section className="math-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">functions</span>
            MATEMÁTICA
          </div>
          <h1 className="math-title">
            <span className="gradient-text">Matemática de Nível Mestre</span>
          </h1>
          <p className="math-subtitle">
            Uma jornada completa e interativa pelos conceitos fundamentais da matemática avançada.
            Explore, aprenda e domine através de explicações detalhadas e ferramentas visuais.
          </p>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{topics.length}</div>
              <div className="stat-label">Tópicos Disponíveis</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">195</div>
              <div className="stat-label">Minutos de Conteúdo</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">∞</div>
              <div className="stat-label">Possibilidades</div>
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

        <div className="topics-grid">
          {topics.map((topic, index) => (
            <ScrollReveal key={topic.id} delay={index * 100}>
              <Link 
                to={topic.path} 
                className="topic-card-link"
                style={{
                  '--topic-gradient': topic.gradient,
                  '--topic-glow': topic.id === 'complex-numbers' ? 'rgba(139, 92, 246, 0.4)' : 
                                  topic.id === 'polynomials' ? 'rgba(236, 72, 153, 0.4)' : 
                                  'rgba(59, 130, 246, 0.4)',
                  '--topic-glow-secondary': topic.id === 'complex-numbers' ? 'rgba(168, 85, 247, 0.2)' : 
                                           topic.id === 'polynomials' ? 'rgba(217, 70, 239, 0.2)' : 
                                           'rgba(99, 102, 241, 0.2)'
                }}
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

export default MathSubject;

