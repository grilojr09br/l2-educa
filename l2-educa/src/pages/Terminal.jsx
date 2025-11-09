import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import { useAdmin } from '../contexts/AdminContext';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import DocSearch from '../components/DocSearch';
import './Terminal.css';

// Force HMR reload - Terminal cleaned of formulaCache
const Terminal = () => {
  const [time, setTime] = useState(new Date());
  const { navigateWithTransition } = useNavigation();
  const { subjects } = useAdmin(); // Get subjects from AdminContext

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sort subjects: Active first, then by name
  const sortedSubjects = React.useMemo(() => {
    return [...subjects].sort((a, b) => {
      // Prioritize active content (not coming soon and status 'ativo')
      const aActive = !a.comingSoon && a.status === 'ativo';
      const bActive = !b.comingSoon && b.status === 'ativo';
      
      if (aActive !== bActive) {
        return aActive ? -1 : 1;
      }

      // Then sort by status priority
      const statusPriority = { 'ativo': 1, 'em atualização': 2, 'em breve': 3 };
      const aPriority = statusPriority[a.status] || 99;
      const bPriority = statusPriority[b.status] || 99;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // Finally sort by name
      return a.name.localeCompare(b.name);
    });
  }, [subjects]);

  // Get status label and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'ativo':
        return { label: 'Ativo', icon: 'check_circle' };
      case 'em atualização':
        return { label: 'Em Atualização', icon: 'update' };
      case 'em breve':
        return { label: 'Em Breve', icon: 'schedule' };
      default:
        return { label: 'Ativo', icon: 'trending_up' };
    }
  };

  return (
    <div className="terminal-page">
      {/* Dev Admin Link */}
      {import.meta.env.MODE === 'development' && (
        <Link to="/dev-admin" className="dev-admin-link">
          <span className="material-icons">admin_panel_settings</span>
          Admin Panel
        </Link>
      )}

      {/* Header com relógio */}
      <div className="terminal-header">
        <ScrollReveal>
          <div className="terminal-clock">
            <div className="clock-time">{time.toLocaleTimeString('pt-BR')}</div>
            <div className="clock-date">{time.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="terminal-brand">
            <div className="brand-header">
              <span className="terminal-prompt-mini">{'>'}</span>
              <h1 className="terminal-title-clean">L2 EDUCA</h1>
            </div>
            <div className="animated-underline">
              <div className="underline-bar"></div>
              <div className="underline-glow"></div>
            </div>
            <p className="terminal-subtitle-clean">
              Centro de Conhecimento Universal • Selecione sua jornada de aprendizado
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Documentation Search */}
      <DocSearch />

      {/* Grid de disciplinas */}
      <div className="subjects-grid">
        {sortedSubjects.map((subject, index) => (
          <ScrollReveal key={subject.id} delay={index * 50}>
            {subject.comingSoon ? (
              <div className="subject-card coming-soon">
                <GlassCard className="subject-card-inner">
                  <div className="subject-folder">
                    <div 
                      className="folder-icon" 
                      style={{ background: subject.gradient }}
                    >
                      <span className="material-icons">{subject.icon}</span>
                    </div>
                    <div className="folder-tab" style={{ borderBottomColor: subject.color }}></div>
                  </div>
                  
                  <div className="subject-info">
                    <h2 className="subject-name">{subject.name}</h2>
                    <p className="subject-description">{subject.description}</p>
                    <div className="subject-stats">
                      <span className="stat">
                        <span className="material-icons">schedule</span>
                        Em breve
                      </span>
                    </div>
                  </div>

                  <div className="coming-soon-badge">
                    <span className="material-icons">lock</span>
                    Em Desenvolvimento
                  </div>
                </GlassCard>
              </div>
            ) : (
              <div 
                onClick={() => {
                  // Map subject IDs to transition colors
                  const colorMap = {
                    'mathematics': 'purple',
                    'physics': 'orange',
                    'chemistry': 'green',
                    'biology': 'green',
                    'philosophy': 'purple',
                    'history': 'purple',
                    'portuguese': 'blue',
                    'geography': 'teal',
                    'sociology': 'pink',
                    'literature': 'amber',
                    'arts': 'rose',
                    'english': 'sky'
                  };
                  const color = colorMap[subject.id] || 'purple';
                  navigateWithTransition(subject.path, color);
                }}
                className="subject-card"
                style={{
                  '--subject-gradient': subject.gradient,
                  '--subject-glow': `${subject.color}80`,
                  '--subject-glow-secondary': `${subject.color}40`,
                  cursor: 'pointer'
                }}
              >
                <GlassCard className="subject-card-inner">
                  <div className="subject-folder">
                    <div 
                      className="folder-icon" 
                      style={{ background: subject.gradient }}
                    >
                      <span className="material-icons">{subject.icon}</span>
                    </div>
                    <div className="folder-tab" style={{ borderBottomColor: subject.color }}></div>
                  </div>
                  
                  <div className="subject-info">
                    <h2 className="subject-name">{subject.name}</h2>
                    <p className="subject-description">{subject.description}</p>
                    <div className="subject-stats">
                      <span className="stat">
                        <span className="material-icons">folder</span>
                        {subject.topics} tópicos
                      </span>
                      <span className="stat">
                        <span className="material-icons">{getStatusInfo(subject.status).icon}</span>
                        {getStatusInfo(subject.status).label}
                      </span>
                    </div>
                  </div>

                  <div className="subject-arrow">
                    <span className="material-icons">arrow_forward</span>
                  </div>
                </GlassCard>
              </div>
            )}
          </ScrollReveal>
        ))}
      </div>

      {/* Footer com informações do sistema */}
      <div className="terminal-footer">
        <ScrollReveal>
          <div className="footer-brand">
            <h2 className="footer-title">L2 EDUCA</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="footer-info">
            <div className="footer-item">
              <span className="material-icons">copyright</span>
              <span>Desenvolvido por L2 ©</span>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-item ai-powered">
              <span className="material-icons">psychology</span>
              <span>Alimentado por nossa IA</span>
              <span className="ai-name">L2 ATLAS</span>
              <div className="ai-glow"></div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Terminal;

