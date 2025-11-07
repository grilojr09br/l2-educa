import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import { useProgress } from '../utils/progressTracker';
import './GeographyUrbanization.css';

const GeographyUrbanization = () => {
  const { navigateWithTransition } = useNavigation();
  const { markVisited } = useProgress('geography', 'urbanizacao');

  // Define sections for navigation
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'conceitos', title: 'Conceitos-Chave', icon: 'book' },
    { id: 'problemas', title: 'Problemas Urbanos', icon: 'warning' },
    { id: 'planejamento', title: 'Planejamento', icon: 'map' },
    { id: 'brasil', title: 'Brasil', icon: 'flag' },
    { id: 'exercicios', title: 'Exercícios', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  // Mark as visited when component mounts
  React.useEffect(() => {
    try {
      markVisited();
    } catch (error) {
      console.error('Error marking page as visited:', error);
    }
  }, [markVisited]);

  const handleNavigate = (path) => {
    try {
      navigateWithTransition(path, 'teal');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = path;
    }
  };

  // State for quiz
  const [quizAnswers, setQuizAnswers] = useState({});

  // Urban concepts data
  const concepts = [
    {
      id: 1,
      term: 'Urbanização',
      definition: 'Crescimento da população urbana em ritmo superior ao da população rural',
      example: 'Brasil: 85% da população em áreas urbanas',
      icon: 'trending_up',
      color: '#14b8a6'
    },
    {
      id: 2,
      term: 'Metropolização',
      definition: 'Crescimento e influência de uma metrópole sobre outras cidades',
      example: 'São Paulo influencia toda a região Sudeste',
      icon: 'business',
      color: '#06b6d4'
    },
    {
      id: 3,
      term: 'Metrópole',
      definition: 'Cidade principal que polariza uma região',
      example: 'Rio de Janeiro, São Paulo, Belo Horizonte',
      icon: 'location_city',
      color: '#0891b2'
    },
    {
      id: 4,
      term: 'Região Metropolitana',
      definition: 'Conjunto de cidades integradas a uma metrópole',
      example: 'Grande São Paulo: 39 municípios',
      icon: 'hub',
      color: '#0e7490'
    },
    {
      id: 5,
      term: 'Megalópole',
      definition: 'União física de duas ou mais regiões metropolitanas',
      example: 'Rio-São Paulo (em formação)',
      icon: 'domain',
      color: '#155e75'
    },
    {
      id: 6,
      term: 'Megacidade',
      definition: 'Cidade com mais de 10 milhões de habitantes',
      example: 'São Paulo (12M), Rio de Janeiro (6.7M)',
      icon: 'apartment',
      color: '#164e63'
    },
    {
      id: 7,
      term: 'Conurbação',
      definition: 'União física entre duas ou mais cidades',
      example: 'ABC Paulista (Santo André, São Bernardo, São Caetano)',
      icon: 'merge_type',
      color: '#0d9488'
    },
    {
      id: 8,
      term: 'Cidade Global',
      definition: 'Centro de poder mundial (econômico, político, cultural)',
      example: 'São Paulo (única na América Latina)',
      icon: 'public',
      color: '#14b8a6'
    }
  ];

  // Urban problems data
  const problems = [
    {
      id: 1,
      name: 'Gentrificação',
      definition: '"Enobrecimento" de uma área, resultando na expulsão da população de baixa renda',
      causes: [
        'Valorização imobiliária',
        'Novos empreendimentos',
        'Infraestrutura melhorada'
      ],
      consequences: [
        'Expulsão de moradores antigos',
        'Perda de identidade local',
        'Aumento do custo de vida'
      ],
      icon: 'home_work',
      color: '#ef4444'
    },
    {
      id: 2,
      name: 'Segregação Espacial',
      definition: 'Divisão social no espaço urbano',
      causes: [
        'Desigualdade de renda',
        'Especulação imobiliária',
        'Falta de políticas habitacionais'
      ],
      consequences: [
        'Favelas e condomínios fechados',
        'Desigualdade de acesso a serviços',
        'Violência urbana'
      ],
      icon: 'split_scene',
      color: '#f59e0b'
    },
    {
      id: 3,
      name: 'Macrocefalia Urbana',
      definition: 'Inchaço e crescimento desordenado da cidade',
      causes: [
        'Êxodo rural',
        'Falta de planejamento',
        'Concentração de oportunidades'
      ],
      consequences: [
        'Infraestrutura insuficiente',
        'Trânsito caótico',
        'Problemas ambientais'
      ],
      icon: 'expand',
      color: '#dc2626'
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: 'O que caracteriza a urbanização?',
      options: [
        'Crescimento da população rural',
        'Crescimento da população urbana maior que a rural',
        'Diminuição das cidades',
        'Êxodo urbano'
      ],
      correct: 1,
      explanation: 'Urbanização é o crescimento da população urbana em ritmo superior ao da população rural.'
    },
    {
      id: 2,
      question: 'Qual o critério para uma cidade ser considerada megacidade?',
      options: [
        'Mais de 5 milhões de habitantes',
        'Mais de 10 milhões de habitantes',
        'Mais de 1 milhão de habitantes',
        'Capital de um país'
      ],
      correct: 1,
      explanation: 'Megacidade é uma cidade com mais de 10 milhões de habitantes.'
    },
    {
      id: 3,
      question: 'O que é gentrificação?',
      options: [
        'Criação de favelas',
        'Enobrecimento de área com expulsão de pobres',
        'Crescimento populacional',
        'Verticalização urbana'
      ],
      correct: 1,
      explanation: 'Gentrificação é o enobrecimento de uma área que resulta na expulsão da população de baixa renda.'
    },
    {
      id: 4,
      question: 'O Plano Diretor é obrigatório para municípios com quantos habitantes?',
      options: [
        'Mais de 10 mil',
        'Mais de 20 mil',
        'Mais de 50 mil',
        'Mais de 100 mil'
      ],
      correct: 1,
      explanation: 'O Plano Diretor é obrigatório para municípios com mais de 20 mil habitantes.'
    },
    {
      id: 5,
      question: 'O que é conurbação?',
      options: [
        'União de países',
        'União física entre cidades',
        'Separação de bairros',
        'Verticalização'
      ],
      correct: 1,
      explanation: 'Conurbação é a união física entre duas ou mais cidades, formando uma continuidade urbana.'
    }
  ];

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const getQuizScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="geography-urbanization-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => handleNavigate('/')} className="breadcrumb-link">
          <span className="material-icons">home</span>
          Terminal
        </button>
        <span className="breadcrumb-separator">/</span>
        <button onClick={() => handleNavigate('/geography')} className="breadcrumb-link">
          <span className="material-icons">public</span>
          Geografia
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Urbanização</span>
      </div>

      {/* Section 1: Introduction */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">location_city</span>
            <h1 className="section-title">Urbanização e Espaço Urbano</h1>
            <p className="section-intro">
              A urbanização transformou radicalmente a forma como vivemos. Hoje, mais da metade da 
              população mundial vive em cidades, criando desafios e oportunidades únicas. Compreender 
              os conceitos urbanos e seus problemas é essencial para construir cidades mais justas e sustentáveis.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="card-title">
              <span className="material-icons">insights</span>
              Contexto Global
            </h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">55%</span>
                <span className="stat-label">População mundial urbana</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">85%</span>
                <span className="stat-label">População urbana no Brasil</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">33</span>
                <span className="stat-label">Megacidades no mundo</span>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 2: Key Concepts */}
      <section id="conceitos" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">book</span>
            <h2 className="section-title">Conceitos-Chave da Urbanização</h2>
          </div>
        </ScrollReveal>

        <div className="concepts-grid">
          {concepts.map((concept, idx) => (
            <ScrollReveal key={concept.id} delay={idx * 50}>
              <GlassCard className="concept-card">
                <div className="concept-header" style={{ '--concept-color': concept.color }}>
                  <span className="material-icons concept-icon">{concept.icon}</span>
                  <h3 className="concept-term">{concept.term}</h3>
                </div>
                <div className="concept-body">
                  <p className="concept-definition">{concept.definition}</p>
                  <div className="concept-example">
                    <span className="material-icons">place</span>
                    <span><strong>Exemplo:</strong> {concept.example}</span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <GlassCard className="hierarchy-card">
            <h3 className="card-title">
              <span className="material-icons">account_tree</span>
              Hierarquia Urbana
            </h3>
            <div className="hierarchy-diagram">
              <div className="hierarchy-level">
                <div className="level-box level-1">
                  <span className="material-icons">apartment</span>
                  <span>Cidade</span>
                </div>
              </div>
              <div className="hierarchy-arrow">↓</div>
              <div className="hierarchy-level">
                <div className="level-box level-2">
                  <span className="material-icons">location_city</span>
                  <span>Metrópole</span>
                </div>
              </div>
              <div className="hierarchy-arrow">↓</div>
              <div className="hierarchy-level">
                <div className="level-box level-3">
                  <span className="material-icons">hub</span>
                  <span>Região Metropolitana</span>
                </div>
              </div>
              <div className="hierarchy-arrow">↓</div>
              <div className="hierarchy-level">
                <div className="level-box level-4">
                  <span className="material-icons">domain</span>
                  <span>Megalópole</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 3: Urban Problems */}
      <section id="problemas" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">warning</span>
            <h2 className="section-title">Problemas Urbanos</h2>
          </div>
        </ScrollReveal>

        {problems.map((problem, idx) => (
          <ScrollReveal key={problem.id} delay={idx * 100}>
            <GlassCard className="problem-card">
              <div className="problem-header" style={{ '--problem-color': problem.color }}>
                <span className="material-icons problem-icon">{problem.icon}</span>
                <div className="problem-info">
                  <h3 className="problem-name">{problem.name}</h3>
                  <p className="problem-definition">{problem.definition}</p>
                </div>
              </div>
              <div className="problem-details">
                <div className="detail-column">
                  <h4>Causas</h4>
                  <ul>
                    {problem.causes.map((cause, i) => (
                      <li key={i}>
                        <span className="material-icons">arrow_right</span>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="detail-column">
                  <h4>Consequências</h4>
                  <ul>
                    {problem.consequences.map((consequence, i) => (
                      <li key={i}>
                        <span className="material-icons">arrow_right</span>
                        {consequence}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </section>

      {/* Section 4: Urban Planning */}
      <section id="planejamento" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">map</span>
            <h2 className="section-title">Planejamento Urbano</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard className="highlight-card">
            <h3 className="card-title">
              <span className="material-icons">gavel</span>
              Plano Diretor
            </h3>
            <div className="plano-diretor-content">
              <p className="definition">
                <strong>Definição:</strong> Lei federal que traça o padrão de ocupação e desenvolvimento 
                da cidade, definindo diretrizes para o crescimento urbano sustentável.
              </p>
              <div className="plano-features">
                <h4>Características:</h4>
                <ul>
                  <li>
                    <span className="material-icons">check_circle</span>
                    Obrigatório para municípios com mais de 20 mil habitantes
                  </li>
                  <li>
                    <span className="material-icons">check_circle</span>
                    Revisado a cada 10 anos
                  </li>
                  <li>
                    <span className="material-icons">check_circle</span>
                    Define zoneamento urbano
                  </li>
                  <li>
                    <span className="material-icons">check_circle</span>
                    Estabelece uso e ocupação do solo
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">construction</span>
              Infraestrutura Urbana
            </h3>
            <div className="infrastructure-grid">
              <div className="infra-item">
                <span className="material-icons">directions_bus</span>
                <h4>Transporte</h4>
                <p>Metrô, ônibus, ciclovias</p>
              </div>
              <div className="infra-item">
                <span className="material-icons">school</span>
                <h4>Educação</h4>
                <p>Escolas, universidades</p>
              </div>
              <div className="infra-item">
                <span className="material-icons">local_hospital</span>
                <h4>Saúde</h4>
                <p>Hospitais, UBSs, clínicas</p>
              </div>
              <div className="infra-item">
                <span className="material-icons">water_drop</span>
                <h4>Saneamento</h4>
                <p>Água, esgoto, coleta de lixo</p>
              </div>
              <div className="infra-item">
                <span className="material-icons">wb_incandescent</span>
                <h4>Energia</h4>
                <p>Eletricidade, iluminação</p>
              </div>
              <div className="infra-item">
                <span className="material-icons">park</span>
                <h4>Lazer</h4>
                <p>Parques, praças, cultura</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 5: Brazil */}
      <section id="brasil" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">flag</span>
            <h2 className="section-title">Urbanização no Brasil</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">timeline</span>
              Histórico da Urbanização Brasileira
            </h3>
            <div className="timeline-brasil">
              <div className="timeline-item-br">
                <div className="timeline-year">1940</div>
                <div className="timeline-content-br">
                  <h4>31% Urbana</h4>
                  <p>Início da industrialização</p>
                </div>
              </div>
              <div className="timeline-item-br">
                <div className="timeline-year">1970</div>
                <div className="timeline-content-br">
                  <h4>56% Urbana</h4>
                  <p>Êxodo rural intenso</p>
                </div>
              </div>
              <div className="timeline-item-br">
                <div className="timeline-year">2000</div>
                <div className="timeline-content-br">
                  <h4>81% Urbana</h4>
                  <p>Consolidação urbana</p>
                </div>
              </div>
              <div className="timeline-item-br">
                <div className="timeline-year">2025</div>
                <div className="timeline-content-br">
                  <h4>87% Urbana</h4>
                  <p>Urbanização consolidada</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">location_on</span>
              Principais Regiões Metropolitanas
            </h3>
            <div className="metropoles-grid">
              <div className="metropole-card">
                <h4>São Paulo</h4>
                <p className="metropole-pop">21,6 milhões</p>
                <p className="metropole-desc">Maior metrópole da América do Sul</p>
              </div>
              <div className="metropole-card">
                <h4>Rio de Janeiro</h4>
                <p className="metropole-pop">13,0 milhões</p>
                <p className="metropole-desc">Segunda maior do país</p>
              </div>
              <div className="metropole-card">
                <h4>Belo Horizonte</h4>
                <p className="metropole-pop">6,0 milhões</p>
                <p className="metropole-desc">Polo do Sudeste</p>
              </div>
              <div className="metropole-card">
                <h4>Brasília</h4>
                <p className="metropole-pop">4,7 milhões</p>
                <p className="metropole-desc">Capital planejada</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard className="highlight-card">
            <h3 className="card-title">
              <span className="material-icons">report_problem</span>
              Desafios Brasileiros
            </h3>
            <div className="challenges-list">
              <div className="challenge-item">
                <span className="material-icons">home</span>
                <div>
                  <h4>Déficit Habitacional</h4>
                  <p>6 milhões de moradias necessárias</p>
                </div>
              </div>
              <div className="challenge-item">
                <span className="material-icons">directions_car</span>
                <div>
                  <h4>Mobilidade Urbana</h4>
                  <p>Trânsito caótico nas grandes cidades</p>
                </div>
              </div>
              <div className="challenge-item">
                <span className="material-icons">water_damage</span>
                <div>
                  <h4>Saneamento</h4>
                  <p>35% sem coleta de esgoto</p>
                </div>
              </div>
              <div className="challenge-item">
                <span className="material-icons">security</span>
                <div>
                  <h4>Segurança</h4>
                  <p>Violência urbana crescente</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 6: Exercises */}
      <section id="exercicios" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">quiz</span>
            <h2 className="section-title">Exercícios de Fixação</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <div className="quiz-header">
              <h3>Teste seus conhecimentos</h3>
              <p>Responda as questões abaixo sobre urbanização:</p>
            </div>

            <div className="quiz-questions">
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="quiz-question">
                  <h4 className="question-text">
                    <span className="question-number">{qIdx + 1}.</span>
                    {q.question}
                  </h4>
                  <div className="question-options">
                    {q.options.map((option, oIdx) => (
                      <button
                        key={oIdx}
                        className={`option-button ${
                          quizAnswers[q.id] === oIdx
                            ? quizAnswers[q.id] === q.correct
                              ? 'correct'
                              : 'incorrect'
                            : ''
                        }`}
                        onClick={() => handleQuizAnswer(q.id, oIdx)}
                        disabled={quizAnswers[q.id] !== undefined}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                        <span className="option-text">{option}</span>
                        {quizAnswers[q.id] === oIdx && (
                          <span className="material-icons option-icon">
                            {quizAnswers[q.id] === q.correct ? 'check_circle' : 'cancel'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {quizAnswers[q.id] !== undefined && (
                    <div className={`explanation ${quizAnswers[q.id] === q.correct ? 'correct-explanation' : 'incorrect-explanation'}`}>
                      <span className="material-icons">info</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {Object.keys(quizAnswers).length === quizQuestions.length && (
              <div className="quiz-results">
                <h3>Resultado Final</h3>
                <div className="score-display">
                  <span className="score-number">{getQuizScore()}</span>
                  <span className="score-total">/ {quizQuestions.length}</span>
                </div>
                <p className="score-message">
                  {getQuizScore() === quizQuestions.length
                    ? '🎉 Perfeito! Você domina o conteúdo!'
                    : getQuizScore() >= quizQuestions.length * 0.7
                    ? '👏 Muito bem! Continue estudando!'
                    : '📚 Revise o conteúdo e tente novamente!'}
                </p>
                <button
                  className="reset-quiz-button"
                  onClick={() => setQuizAnswers({})}
                >
                  <span className="material-icons">refresh</span>
                  Tentar Novamente
                </button>
              </div>
            )}
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default GeographyUrbanization;

