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
import './GeographyAgriculture.css';

const GeographyAgriculture = () => {
  const { navigateWithTransition } = useNavigation();
  const { markVisited } = useProgress('geography', 'agricultura');

  // Define sections for navigation
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'agriculture' },
    { id: 'sistemas', title: 'Sistemas Agrícolas', icon: 'eco' },
    { id: 'revolucao-verde', title: 'Revolução Verde', icon: 'spa' },
    { id: 'brasil', title: 'Brasil', icon: 'flag' },
    { id: 'conflitos', title: 'Conflitos', icon: 'report' },
    { id: 'exercicios', title: 'Exercícios', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  // Tab states
  const [selectedSystem, setSelectedSystem] = useState('extensivo');
  const [selectedCinturao, setSelectedCinturao] = useState('soja');

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
      navigateWithTransition(path, 'green');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = path;
    }
  };

  // State for quiz
  const [quizAnswers, setQuizAnswers] = useState({});

  // Agricultural systems data
  const systems = {
    extensivo: {
      name: 'Extensivo',
      icon: 'landscape',
      color: '#f59e0b',
      characteristics: [
        'Baixa produtividade por hectare',
        'Técnicas rudimentares',
        'Pouca ou nenhuma mecanização',
        'Grandes áreas de cultivo',
        'Mão de obra pouco qualificada'
      ],
      examples: 'Agricultura de subsistência, pequenos produtores',
      advantages: ['Menor investimento inicial', 'Menor impacto ambiental inicial'],
      disadvantages: ['Baixa produtividade', 'Vulnerável a intempéries']
    },
    intensivo: {
      name: 'Intensivo',
      icon: 'precision_manufacturing',
      color: '#10b981',
      characteristics: [
        'Alta produtividade por hectare',
        'Uso intensivo de tecnologia',
        'Mecanização avançada',
        'Uso de fertilizantes e agrotóxicos',
        'Irrigação e controle climático'
      ],
      examples: 'Agronegócio moderno, agricultura de precisão',
      advantages: ['Alta produtividade', 'Maior rentabilidade'],
      disadvantages: ['Alto custo', 'Impacto ambiental significativo']
    },
    jardinagem: {
      name: 'Jardinagem',
      icon: 'yard',
      color: '#14b8a6',
      characteristics: [
        'Sudeste Asiático',
        'Uso intensivo de mão de obra',
        'Técnicas de irrigação (terraços)',
        'Pequenas propriedades',
        'Cultivo de arroz principalmente'
      ],
      examples: 'Arrozais em terraços (China, Japão, Tailândia)',
      advantages: ['Alta produtividade por área', 'Aproveitamento de relevos'],
      disadvantages: ['Trabalho intenso', 'Dependência de mão de obra']
    },
    plantation: {
      name: 'Plantation',
      icon: 'forest',
      color: '#dc2626',
      characteristics: [
        'Latifúndio (grandes propriedades)',
        'Monocultura',
        'Voltado para exportação',
        'Mão de obra barata',
        'Herança colonial'
      ],
      examples: 'Café, cana-de-açúcar, cacau, banana',
      advantages: ['Economia de escala', 'Integração ao mercado global'],
      disadvantages: ['Degradação ambiental', 'Desigualdade social', 'Dependência externa']
    }
  };

  // Revolução Verde data
  const revolucaoVerdeImpacts = {
    positive: [
      { icon: 'trending_up', text: 'Aumento da produção de alimentos', color: '#10b981' },
      { icon: 'science', text: 'Avanços tecnológicos agrícolas', color: '#14b8a6' },
      { icon: 'reduce_capacity', text: 'Redução da fome em algumas regiões', color: '#06b6d4' }
    ],
    negative: [
      { icon: 'bug_report', text: 'Dependência de sementes transgênicas', color: '#f59e0b' },
      { icon: 'precision_manufacturing', text: 'Aumento da mecanização (desemprego)', color: '#ef4444' },
      { icon: 'water_damage', text: 'Degradação ambiental e contaminação', color: '#dc2626' },
      { icon: 'attach_money', text: 'Endividamento de pequenos produtores', color: '#991b1b' }
    ]
  };

  // Cinturões brasileiros
  const cinturoes = {
    soja: {
      name: 'Cinturão da Soja',
      regions: ['Mato Grosso', 'Goiás', 'Paraná', 'Mato Grosso do Sul'],
      icon: 'grain',
      color: '#f59e0b',
      description: 'Principal commodity agrícola brasileira',
      stats: { production: '154 milhões ton/ano', area: '41 milhões ha', export: '2º maior exportador' }
    },
    cana: {
      name: 'Cinturão da Cana',
      regions: ['São Paulo', 'Goiás', 'Minas Gerais', 'Paraná'],
      icon: 'local_florist',
      color: '#10b981',
      description: 'Produção de açúcar e etanol',
      stats: { production: '620 milhões ton/ano', area: '8,4 milhões ha', export: '1º maior produtor' }
    },
    gado: {
      name: 'Pecuária',
      regions: ['Mato Grosso', 'Pará', 'Goiás', 'Mato Grosso do Sul'],
      icon: 'pets',
      color: '#8b5cf6',
      description: 'Maior rebanho comercial do mundo',
      stats: { production: '224 milhões cabeças', area: '159 milhões ha', export: '1º maior exportador' }
    }
  };

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: 'Qual sistema agrícola caracteriza-se por latifúndio, monocultura e voltado para exportação?',
      options: [
        'Sistema Extensivo',
        'Sistema Intensivo',
        'Plantation',
        'Jardinagem'
      ],
      correct: 2,
      explanation: 'Plantation é o sistema caracterizado por latifúndio, monocultura e produção voltada para o mercado externo, com herança colonial.'
    },
    {
      id: 2,
      question: 'A Revolução Verde resultou em:',
      options: [
        'Apenas benefícios para a agricultura',
        'Aumento da produção e dependência de sementes',
        'Redução do uso de agrotóxicos',
        'Fortalecimento da agricultura familiar'
      ],
      correct: 1,
      explanation: 'A Revolução Verde aumentou a produção, mas criou dependência de sementes transgênicas, aumentou a mecanização e gerou impactos ambientais.'
    },
    {
      id: 3,
      question: 'O Estatuto da Terra (1964) tinha como objetivo principal:',
      options: [
        'Reforma agrária',
        'Mecanização do campo',
        'Criação do MST',
        'Abolição da escravidão'
      ],
      correct: 0,
      explanation: 'O Estatuto da Terra foi criado para regulamentar o uso da terra e prever a reforma agrária, embora na prática tenha focado na mecanização.'
    },
    {
      id: 4,
      question: 'Qual é o principal conflito no espaço rural brasileiro?',
      options: [
        'Urbano vs Rural',
        'Norte vs Sul',
        'Latifundiários vs Camponeses',
        'Agricultores vs Pecuaristas'
      ],
      correct: 2,
      explanation: 'O principal conflito é entre latifundiários (grandes proprietários) e camponeses (pequenos produtores e sem-terra), destacando-se o MST.'
    },
    {
      id: 5,
      question: 'O sistema de Jardinagem é característico de qual região?',
      options: [
        'América Latina',
        'África',
        'Sudeste Asiático',
        'Europa'
      ],
      correct: 2,
      explanation: 'O sistema de Jardinagem é característico do Sudeste Asiático, com uso intensivo de mão de obra e técnicas de irrigação em terraços.'
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
    <div className="geography-agriculture-page">
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
        <span className="breadcrumb-current">Espaço Agrário</span>
      </div>

      {/* Section 1: Introduction */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">agriculture</span>
            <h1 className="section-title">Espaço Agrário</h1>
            <p className="section-intro">
              O espaço rural é fundamental para a economia global e a segurança alimentar. Diferentes 
              sistemas de produção agrícola moldaram paisagens e sociedades ao longo da história, 
              criando desafios e oportunidades que persistem até hoje.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="card-title">
              <span className="material-icons">insights</span>
              Agricultura Global
            </h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">38%</span>
                <span className="stat-label">Da terra é usada na agricultura</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">26%</span>
                <span className="stat-label">Das emissões de CO₂</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">1.3B</span>
                <span className="stat-label">Pessoas dependem da agricultura</span>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 2: Agricultural Systems */}
      <section id="sistemas" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">eco</span>
            <h2 className="section-title">Sistemas Agrícolas</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <div className="systems-tabs">
              {Object.keys(systems).map(key => (
                <button
                  key={key}
                  className={`tab-button ${selectedSystem === key ? 'active' : ''}`}
                  onClick={() => setSelectedSystem(key)}
                  style={{ '--tab-color': systems[key].color }}
                >
                  <span className="material-icons">{systems[key].icon}</span>
                  {systems[key].name}
                </button>
              ))}
            </div>

            <div className="system-content">
              <div className="system-header" style={{ '--system-color': systems[selectedSystem].color }}>
                <span className="material-icons system-icon">{systems[selectedSystem].icon}</span>
                <h3>{systems[selectedSystem].name}</h3>
              </div>

              <div className="system-details">
                <div className="detail-section">
                  <h4>Características</h4>
                  <ul className="characteristics-list">
                    {systems[selectedSystem].characteristics.map((char, idx) => (
                      <li key={idx}>
                        <span className="material-icons">check_circle</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h4>Exemplos</h4>
                  <p className="examples-text">{systems[selectedSystem].examples}</p>
                </div>

                <div className="pros-cons-grid">
                  <div className="pros-section">
                    <h4><span className="material-icons">thumb_up</span> Vantagens</h4>
                    <ul>
                      {systems[selectedSystem].advantages.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons-section">
                    <h4><span className="material-icons">thumb_down</span> Desvantagens</h4>
                    <ul>
                      {systems[selectedSystem].disadvantages.map((dis, idx) => (
                        <li key={idx}>{dis}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 3: Revolução Verde */}
      <section id="revolucao-verde" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">spa</span>
            <h2 className="section-title">Revolução Verde</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard className="highlight-card">
            <h3 className="card-title">
              <span className="material-icons">history_edu</span>
              O que foi?
            </h3>
            <p className="revolution-description">
              A Revolução Verde foi um conjunto de transformações tecnológicas na agricultura, 
              principalmente entre as décadas de 1960-1970, que aumentou drasticamente a produção 
              de alimentos através do uso de sementes melhoradas, fertilizantes, agrotóxicos e 
              mecanização. Teve grande impacto na Ásia e América Latina.
            </p>
          </GlassCard>
        </ScrollReveal>

        <div className="impacts-container">
          <ScrollReveal delay={150}>
            <GlassCard className="impacts-positive">
              <h3 className="impacts-title positive">
                <span className="material-icons">add_circle</span>
                Impactos Positivos
              </h3>
              <div className="impacts-list">
                {revolucaoVerdeImpacts.positive.map((impact, idx) => (
                  <div key={idx} className="impact-item" style={{ '--impact-color': impact.color }}>
                    <span className="material-icons">{impact.icon}</span>
                    <span>{impact.text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <GlassCard className="impacts-negative">
              <h3 className="impacts-title negative">
                <span className="material-icons">remove_circle</span>
                Impactos Negativos
              </h3>
              <div className="impacts-list">
                {revolucaoVerdeImpacts.negative.map((impact, idx) => (
                  <div key={idx} className="impact-item" style={{ '--impact-color': impact.color }}>
                    <span className="material-icons">{impact.icon}</span>
                    <span>{impact.text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Brazil */}
      <section id="brasil" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">flag</span>
            <h2 className="section-title">Espaço Rural Brasileiro</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">timeline</span>
              Modernização da Agricultura (1970s)
            </h3>
            <div className="modernization-content">
              <p className="modernization-text">
                Na década de 1970, o Brasil passou por intenso processo de mecanização do campo, 
                impulsionado por políticas governamentais e investimentos em tecnologia agrícola. 
                Isso resultou em aumento da produtividade, mas também intensificou o êxodo rural 
                e a concentração fundiária.
              </p>
              <div className="modernization-effects">
                <div className="effect-item positive">
                  <span className="material-icons">trending_up</span>
                  <div>
                    <h4>Aumento da produtividade</h4>
                    <p>Brasil se tornou potência agrícola</p>
                  </div>
                </div>
                <div className="effect-item negative">
                  <span className="material-icons">group_remove</span>
                  <div>
                    <h4>Êxodo rural intenso</h4>
                    <p>Milhões migraram para cidades</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">map</span>
              Cinturões Agrícolas do Brasil
            </h3>
            
            <div className="cinturao-tabs">
              {Object.keys(cinturoes).map(key => (
                <button
                  key={key}
                  className={`cinturao-tab ${selectedCinturao === key ? 'active' : ''}`}
                  onClick={() => setSelectedCinturao(key)}
                  style={{ '--cinturao-color': cinturoes[key].color }}
                >
                  <span className="material-icons">{cinturoes[key].icon}</span>
                  {cinturoes[key].name}
                </button>
              ))}
            </div>

            <div className="cinturao-content">
              <div className="cinturao-header" style={{ '--cinturao-color': cinturoes[selectedCinturao].color }}>
                <span className="material-icons">{cinturoes[selectedCinturao].icon}</span>
                <div>
                  <h4>{cinturoes[selectedCinturao].name}</h4>
                  <p>{cinturoes[selectedCinturao].description}</p>
                </div>
              </div>

              <div className="cinturao-regions">
                <h5>Principais Regiões:</h5>
                <div className="regions-list">
                  {cinturoes[selectedCinturao].regions.map((region, idx) => (
                    <span key={idx} className="region-badge">{region}</span>
                  ))}
                </div>
              </div>

              <div className="cinturao-stats">
                <div className="stat-item">
                  <span className="stat-label">Produção</span>
                  <span className="stat-value">{cinturoes[selectedCinturao].stats.production}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Área</span>
                  <span className="stat-value">{cinturoes[selectedCinturao].stats.area}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Ranking</span>
                  <span className="stat-value">{cinturoes[selectedCinturao].stats.export}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard className="highlight-card">
            <h3 className="card-title">
              <span className="material-icons">gavel</span>
              Estatuto da Terra (1964)
            </h3>
            <div className="estatuto-content">
              <p className="estatuto-definition">
                Lei federal que regulamenta o uso da terra no Brasil, prevendo a reforma agrária 
                como mecanismo de redistribuição fundiária.
              </p>
              <div className="estatuto-details">
                <div className="detail-box">
                  <h4>Objetivo Teórico</h4>
                  <p>Reforma agrária e distribuição de terras</p>
                </div>
                <div className="detail-box">
                  <h4>Realidade Prática</h4>
                  <p>Focou na mecanização e modernização</p>
                </div>
              </div>
              <div className="estatuto-note">
                <span className="material-icons">info</span>
                <p>Apesar da previsão de reforma agrária, o Estatuto na prática priorizou a modernização 
                tecnológica, mantendo a estrutura fundiária concentrada.</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 5: Conflicts */}
      <section id="conflitos" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">report</span>
            <h2 className="section-title">Conflitos pela Terra</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard className="conflict-card">
            <h3 className="card-title">
              <span className="material-icons">groups</span>
              Latifundiários vs Camponeses
            </h3>
            <div className="conflict-content">
              <div className="conflict-side latifundiarios">
                <div className="side-header">
                  <span className="material-icons">business</span>
                  <h4>Latifundiários</h4>
                </div>
                <ul>
                  <li>Grandes proprietários de terra</li>
                  <li>Poder econômico e político</li>
                  <li>Agricultura comercial em larga escala</li>
                  <li>Resistência à reforma agrária</li>
                </ul>
              </div>

              <div className="conflict-vs">
                <span className="material-icons">compare_arrows</span>
              </div>

              <div className="conflict-side camponeses">
                <div className="side-header">
                  <span className="material-icons">agriculture</span>
                  <h4>Camponeses</h4>
                </div>
                <ul>
                  <li>Pequenos produtores e sem-terra</li>
                  <li>Agricultura familiar</li>
                  <li>Luta por acesso à terra</li>
                  <li>Movimentos sociais (MST)</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <GlassCard className="mst-card">
            <h3 className="card-title">
              <span className="material-icons">flag</span>
              Movimento dos Trabalhadores Rurais Sem Terra (MST)
            </h3>
            <div className="mst-content">
              <p className="mst-description">
                Criado em 1984, o MST é o principal movimento social de luta pela reforma agrária 
                no Brasil. Organiza ocupações de terras improdutivas, acampamentos e assentamentos, 
                defendendo a redistribuição fundiária e a agricultura familiar.
              </p>
              <div className="mst-objectives">
                <h4>Principais Objetivos:</h4>
                <div className="objectives-grid">
                  <div className="objective-item">
                    <span className="material-icons">landscape</span>
                    <span>Reforma agrária</span>
                  </div>
                  <div className="objective-item">
                    <span className="material-icons">groups</span>
                    <span>Justiça social</span>
                  </div>
                  <div className="objective-item">
                    <span className="material-icons">eco</span>
                    <span>Agricultura sustentável</span>
                  </div>
                  <div className="objective-item">
                    <span className="material-icons">school</span>
                    <span>Educação no campo</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard className="problema-card">
            <h3 className="card-title">
              <span className="material-icons">warning</span>
              Estrutura Fundiária: Má Distribuição de Terras
            </h3>
            <div className="problema-content">
              <div className="concentracao-stats">
                <div className="stat-big">
                  <span className="number">1%</span>
                  <span className="label">Dos proprietários detêm</span>
                  <span className="number">45%</span>
                  <span className="label">Das terras agricultáveis</span>
                </div>
              </div>
              <p className="problema-text">
                A concentração fundiária no Brasil é uma das maiores do mundo, resultado de 
                herança colonial, políticas fundiárias excludentes e poder econômico concentrado. 
                Isso gera desigualdade, conflitos e ineficiência na produção de alimentos básicos.
              </p>
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
              <p>Responda as questões abaixo sobre o espaço agrário:</p>
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

export default GeographyAgriculture;

