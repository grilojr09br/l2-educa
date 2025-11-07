import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import Footer from './Footer';
import './SubjectPageTemplate.css';

/**
 * Extracts RGB values from gradient and returns glow colors
 * Supports linear-gradient with hex colors
 */
const extractGlowColors = (gradient) => {
  if (!gradient) {
    return {
      primary: 'rgba(99, 102, 241, 0.4)',
      secondary: 'rgba(168, 85, 247, 0.2)',
      gradientBg: 'linear-gradient(135deg, #6366f1, #a855f7)'
    };
  }

  // Extract all hex colors from gradient
  const hexColors = gradient.match(/#[0-9a-fA-F]{6}/g) || [];
  
  if (hexColors.length > 0) {
    const primaryColor = hexColors[0];
    const secondaryColor = hexColors[1] || hexColors[0];
    
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 99, g: 102, b: 241 };
    };
    
    const rgb1 = hexToRgb(primaryColor);
    const rgb2 = hexToRgb(secondaryColor);
    
    return {
      primary: `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, 0.4)`,
      secondary: `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, 0.2)`,
      gradientBg: gradient
    };
  }
  
  return {
    primary: 'rgba(99, 102, 241, 0.4)',
    secondary: 'rgba(168, 85, 247, 0.2)',
    gradientBg: gradient
  };
};

/**
 * Template base para páginas de disciplinas
 * Garante padronização e consistência em todas as páginas de matérias
 * 
 * @param {Object} props
 * @param {string} props.subjectName - Nome da disciplina (ex: "Matemática")
 * @param {string} props.subjectIcon - Ícone Material Icons (ex: "functions")
 * @param {string} props.title - Título principal
 * @param {string} props.subtitle - Subtítulo/descrição
 * @param {Array} props.topics - Array de tópicos
 * @param {Object} props.stats - Estatísticas (opcional)
 * @param {string} props.className - Classe CSS adicional (opcional)
 */
const SubjectPageTemplate = ({
  subjectName,
  subjectIcon,
  title,
  subtitle,
  topics = [],
  stats = {},
  className = '',
}) => {
  // Estatísticas padrão
  const defaultStats = {
    topics: topics.length,
    content: stats.content || `${topics.length * 40} min`,
    extra: stats.extra || '∞',
    extraLabel: stats.extraLabel || 'Possibilidades',
  };

  return (
    <div className={`subject-page-template ${className}`}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="material-icons">home</span>
          Terminal
        </Link>
        <span className="material-icons breadcrumb-separator">chevron_right</span>
        <span className="breadcrumb-current">{subjectName}</span>
      </div>

      {/* Header */}
      <section className="subject-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">{subjectIcon}</span>
            {subjectName.toUpperCase()}
          </div>
          <h1 className="subject-title">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="subject-subtitle">{subtitle}</p>
          
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{defaultStats.topics}</div>
              <div className="stat-label">Tópicos Disponíveis</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{defaultStats.content}</div>
              <div className="stat-label">Minutos de Conteúdo</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{defaultStats.extra}</div>
              <div className="stat-label">{defaultStats.extraLabel}</div>
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
          {topics.map((topic, index) => {
            const glowColors = extractGlowColors(topic.gradient);
            
            return (
            <ScrollReveal key={topic.id} delay={100 * index}>
              <Link
                to={topic.comingSoon ? '#' : topic.path}
                className={`topic-card-link ${topic.comingSoon ? 'disabled' : ''}`}
                onClick={(e) => topic.comingSoon && e.preventDefault()}
                style={{
                  '--topic-gradient': glowColors.gradientBg,
                  '--topic-glow': glowColors.primary,
                  '--topic-glow-secondary': glowColors.secondary
                }}
              >
                <GlassCard className="topic-card">
                  {/* Coming Soon Badge */}
                  {topic.comingSoon && (
                    <div className="coming-soon-badge">
                      <span className="material-icons">schedule</span>
                      Em Breve
                    </div>
                  )}

                  {/* Icon Container with Glow */}
                  <div
                    className="topic-icon-container"
                    style={{ background: topic.gradient }}
                  >
                    <span className="material-icons topic-icon">{topic.icon}</span>
                    <div className="icon-glow" style={{ background: topic.gradient }}></div>
                  </div>

                  {/* Content */}
                  <div className="topic-content">
                    <h3 className="topic-title">{topic.title}</h3>
                    <p className="topic-description">{topic.description}</p>

                    {/* Meta Info */}
                    <div className="topic-meta">
                      <div className="meta-item">
                        <span className="material-icons">
                          {topic.comingSoon ? 'lock' : 'signal_cellular_alt'}
                        </span>
                        {topic.difficulty}
                      </div>
                      <div className="meta-item">
                        <span className="material-icons">schedule</span>
                        {topic.duration}
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon in Corner */}
                  {!topic.comingSoon && (
                    <div className="topic-enter">
                      <span className="material-icons">arrow_forward</span>
                    </div>
                  )}

                  {/* Decorative Corners */}
                  <div className="topic-corner-tl"></div>
                  <div className="topic-corner-br"></div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubjectPageTemplate;

