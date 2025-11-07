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
import './GeographyIndustrialization.css';

const GeographyIndustrialization = () => {
  const { navigateWithTransition } = useNavigation();
  const { markVisited } = useProgress('geography', 'industrializacao');

  // Define sections for navigation
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'revolucoes', title: 'Revoluções Industriais', icon: 'history' },
    { id: 'blocos', title: 'Blocos Econômicos', icon: 'public' },
    { id: 'eua', title: 'Estados Unidos', icon: 'flag' },
    { id: 'china', title: 'China', icon: 'language' },
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
      navigateWithTransition(path, 'green');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = path;
    }
  };

  // State for interactive elements
  const [selectedRevolution, setSelectedRevolution] = useState(1);
  const [selectedTiger, setSelectedTiger] = useState('classic');
  const [selectedUSRegion, setSelectedUSRegion] = useState('manufacturing');
  const [selectedChinaEra, setSelectedChinaEra] = useState('mao');
  const [quizAnswers, setQuizAnswers] = useState({});

  // Industrial Revolutions data
  const revolutions = [
    {
      id: 1,
      name: '1ª Revolução Industrial',
      period: '1760-1840',
      location: 'Inglaterra',
      energy: 'Carvão',
      technology: 'Máquina a vapor',
      sector: 'Indústria têxtil',
      icon: '🏭',
      color: '#8b4513',
      characteristics: [
        'Substituição da manufatura pela maquinofatura',
        'Êxodo rural massivo',
        'Surgimento da classe operária',
        'Desenvolvimento do sistema fabril'
      ]
    },
    {
      id: 2,
      name: '2ª Revolução Industrial',
      period: '1850-1945',
      location: 'Europa e EUA',
      energy: 'Petróleo e Eletricidade',
      technology: 'Motor a combustão',
      sector: 'Aço, química, automotiva',
      icon: '⚙️',
      color: '#4169e1',
      characteristics: [
        'Fordismo: Linha de montagem',
        'Taylorismo: Gerenciamento científico',
        'Expansão do capitalismo',
        'Imperialismo industrial'
      ]
    },
    {
      id: 3,
      name: '3ª Revolução Industrial',
      period: '1945-2000',
      location: 'Países desenvolvidos',
      energy: 'Nuclear e fontes limpas',
      technology: 'Microeletrônica e informática',
      sector: 'Tecnologia e serviços',
      icon: '💻',
      color: '#9370db',
      characteristics: [
        'Toyotismo: Produção flexível',
        'Just in time',
        'Automação industrial',
        'Globalização'
      ]
    },
    {
      id: 4,
      name: '4ª Revolução Industrial',
      period: '2000-Presente',
      location: 'Global',
      energy: 'Renováveis e híbridas',
      technology: 'IA, IoT, Big Data',
      sector: 'Indústria 4.0',
      icon: '🤖',
      color: '#00ced1',
      characteristics: [
        'Internet das Coisas (IoT)',
        'Computação em nuvem',
        'Inteligência Artificial',
        'Automação total'
      ]
    }
  ];

  // Economic blocs data
  const economicBlocs = [
    {
      name: 'OPEP',
      fullName: 'Organização dos Países Exportadores de Petróleo',
      founded: '1960',
      members: 13,
      purpose: 'Controlar produção e preço do petróleo',
      icon: '🛢️',
      keyCountries: ['Arábia Saudita', 'Irã', 'Iraque', 'Venezuela', 'Kuwait']
    },
    {
      name: 'BRICS',
      fullName: 'Brasil, Rússia, Índia, China, África do Sul',
      founded: '2006',
      members: 5,
      purpose: 'Cooperação econômica e crescimento',
      icon: '🌍',
      keyFeatures: ['Economias emergentes', 'Grande população', 'Recursos naturais']
    }
  ];

  // Asian Tigers data
  const asianTigers = {
    classic: {
      name: 'Tigres Asiáticos Clássicos',
      period: 'Década de 1970',
      countries: [
        { name: 'Coreia do Sul', flag: '🇰🇷', capital: 'Seul', specialty: 'Eletrônicos e automóveis' },
        { name: 'Taiwan', flag: '🇹🇼', capital: 'Taipei', specialty: 'Semicondutores' },
        { name: 'Cingapura', flag: '🇸🇬', capital: 'Cingapura', specialty: 'Finanças e tecnologia' },
        { name: 'Hong Kong', flag: '🇭🇰', capital: 'Hong Kong', specialty: 'Centro financeiro' }
      ],
      characteristics: [
        'Forte intervenção estatal',
        'Foco em exportação',
        'Investimento em educação',
        'Mão de obra qualificada'
      ]
    },
    new: {
      name: 'Novos Tigres Asiáticos',
      period: 'Décadas de 1980/90',
      countries: [
        { name: 'Indonésia', flag: '🇮🇩', capital: 'Jacarta', specialty: 'Recursos naturais' },
        { name: 'Malásia', flag: '🇲🇾', capital: 'Kuala Lumpur', specialty: 'Eletrônicos' },
        { name: 'Filipinas', flag: '🇵🇭', capital: 'Manila', specialty: 'Serviços' },
        { name: 'Tailândia', flag: '🇹🇭', capital: 'Bangkok', specialty: 'Turismo e manufatura' }
      ],
      characteristics: [
        'Seguiram modelo dos clássicos',
        'ZPEs (Zonas de Processamento)',
        'Substituição de importação',
        'Incentivos fiscais'
      ]
    }
  };

  // USA regions data
  const usaRegions = {
    manufacturing: {
      name: 'Manufacturing Belt (Cinturão da Manufatura)',
      location: 'Nordeste dos EUA',
      period: 'Indústria tradicional e antiga',
      cities: [
        { name: 'Detroit', state: 'Michigan', specialty: 'Indústria automobilística', icon: '🚗' },
        { name: 'Pittsburgh', state: 'Pensilvânia', specialty: 'Indústria siderúrgica', icon: '⚒️' },
        { name: 'Chicago', state: 'Illinois', specialty: 'Múltiplas indústrias', icon: '🏭' }
      ],
      characteristics: [
        'Indústrias tradicionais em declínio',
        'Alta densidade populacional',
        'Infraestrutura antiga',
        'Desemprego crescente pós-2008'
      ]
    },
    sun: {
      name: 'Sun Belt (Cinturão do Sol)',
      location: 'Sul e Oeste dos EUA',
      period: 'Indústrias modernas (pós-2008)',
      cities: [
        { name: 'Houston', state: 'Texas', specialty: 'Aeroespacial', icon: '🚀' },
        { name: 'Los Angeles', state: 'Califórnia', specialty: 'Tecnologia e entretenimento', icon: '🎬' },
        { name: 'Phoenix', state: 'Arizona', specialty: 'Tecnologia', icon: '💻' }
      ],
      characteristics: [
        'Indústrias de alta tecnologia',
        'Crescimento populacional',
        'Clima favorável',
        'Incentivos fiscais'
      ]
    },
    rust: {
      name: 'Rust Belt (Cinturão da Ferrugem)',
      location: 'Nordeste e Meio-Oeste',
      period: 'Crise pós-2008',
      description: 'Região do Manufacturing Belt que entrou em declínio após a crise de 2008',
      characteristics: [
        'Fábricas abandonadas',
        'Desemprego elevado',
        'Êxodo populacional',
        'Necessidade de revitalização'
      ]
    }
  };

  // China historical eras
  const chinaEras = {
    mao: {
      name: 'Era Mao Tsé-Tung',
      period: '1949-1976',
      events: [
        { year: '1949', event: 'Revolução Comunista', description: 'Proclamação da República Popular da China' },
        { year: 'Anos 50', event: 'Grande Salto Adiante', description: 'Planificação econômica que fracassou. Milhões de mortes por fome.' },
        { year: 'Anos 60', event: 'Revolução Cultural', description: 'Perseguição política e intelectual. Fechamento ao mundo.' }
      ],
      icon: '🚩',
      model: 'Socialismo planificado'
    },
    deng: {
      name: 'Era Deng Xiaoping',
      period: '1978-1997',
      events: [
        { year: '1978', event: 'Abertura Econômica', description: 'Reformas de mercado sob controle do Partido' },
        { year: 'Anos 80', event: 'Criação das ZEEs', description: 'Zonas Econômicas Especiais para atrair capital estrangeiro' },
        { year: 'Anos 90', event: 'Boom Econômico', description: 'China se torna "fábrica do mundo"' }
      ],
      icon: '📈',
      model: 'Socialismo de Mercado'
    },
    modern: {
      name: 'Era Moderna',
      period: '2000-Presente',
      achievements: [
        '2ª maior economia do mundo',
        'Maior industrialização do mundo',
        'Maior exportador global',
        'Maior poluidor do mundo'
      ],
      regions: [
        { name: 'Manchúria', description: 'Antiga base industrial. Carvão e ferro.', icon: '⛏️' },
        { name: 'Xangai', description: 'Centro financeiro e tecnológico.', icon: '🏙️' },
        { name: 'Shenzhen', description: 'Principal ZEE. Hub tecnológico.', icon: '💡' }
      ],
      icon: '🇨🇳',
      model: 'Socialismo de Mercado aprimorado'
    }
  };

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: 'Qual foi a principal fonte de energia da 1ª Revolução Industrial?',
      options: ['Petróleo', 'Carvão', 'Eletricidade', 'Nuclear'],
      correct: 1,
      explanation: 'O carvão foi a principal fonte de energia, utilizado nas máquinas a vapor.'
    },
    {
      id: 2,
      question: 'O Fordismo e o Taylorismo são modelos de produção característicos de qual revolução?',
      options: ['1ª Revolução', '2ª Revolução', '3ª Revolução', '4ª Revolução'],
      correct: 1,
      explanation: 'A 2ª Revolução Industrial implementou a linha de montagem (Fordismo) e o gerenciamento científico (Taylorismo).'
    },
    {
      id: 3,
      question: 'Qual é o principal objetivo da OPEP?',
      options: [
        'Controlar produção e preço do petróleo',
        'Promover livre comércio',
        'Cooperação militar',
        'Integração monetária'
      ],
      correct: 0,
      explanation: 'A OPEP foi criada em 1960 para controlar a produção e os preços do petróleo.'
    },
    {
      id: 4,
      question: 'Quais são os Tigres Asiáticos Clássicos?',
      options: [
        'Indonésia, Malásia, Filipinas, Tailândia',
        'Coreia do Sul, Taiwan, Cingapura, Hong Kong',
        'China, Japão, Vietnã, Camboja',
        'Índia, Bangladesh, Paquistão, Nepal'
      ],
      correct: 1,
      explanation: 'Os Tigres Asiáticos Clássicos são Coreia do Sul, Taiwan, Cingapura e Hong Kong, que se industrializaram na década de 1970.'
    },
    {
      id: 5,
      question: 'O que caracteriza o Sun Belt nos Estados Unidos?',
      options: [
        'Indústrias tradicionais em declínio',
        'Clima frio e úmido',
        'Indústrias modernas no Sul e Oeste',
        'Região agrícola'
      ],
      correct: 2,
      explanation: 'O Sun Belt, localizado no Sul e Oeste dos EUA, é caracterizado por indústrias modernas, especialmente aeroespacial e tecnologia.'
    },
    {
      id: 6,
      question: 'Em que ano Deng Xiaoping iniciou a abertura econômica da China?',
      options: ['1949', '1960', '1978', '1990'],
      correct: 2,
      explanation: 'Em 1978, Deng Xiaoping implementou reformas de abertura econômica, criando o modelo de Socialismo de Mercado.'
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
    <div className="geography-industrialization-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => handleNavigate('/')} className="breadcrumb-link">
          <span className="material-icons">home</span>
          Terminal
        </button>
        <span className="breadcrumb-separator">/</span>
        <button onClick={() => handleNavigate('/geografia')} className="breadcrumb-link">
          <span className="material-icons">public</span>
          Geografia
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Industrialização Mundial</span>
      </div>

      {/* Section 1: Introduction */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">factory</span>
            <h1 className="section-title">Industrialização Mundial</h1>
            <p className="section-intro">
              A industrialização transformou radicalmente a economia, a sociedade e o espaço geográfico mundial. 
              Das máquinas a vapor às fábricas inteligentes, cada revolução industrial trouxe mudanças profundas 
              na forma como produzimos, trabalhamos e vivemos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="card-title">
              <span className="material-icons">insights</span>
              Contexto Histórico
            </h2>
            <div className="intro-content">
              <p>
                A industrialização é um processo de transformação econômica e social marcado pela substituição 
                da produção artesanal e agrícola pela produção mecanizada em larga escala. Este fenômeno, 
                iniciado na Inglaterra no século XVIII, espalhou-se pelo mundo em diferentes ondas.
              </p>
              
              <div className="crisis-timeline">
                <h3>Crises e Respostas Econômicas</h3>
                <div className="crisis-grid">
                  <div className="crisis-item">
                    <div className="crisis-year">1930</div>
                    <div className="crisis-name">Grande Depressão</div>
                    <div className="crisis-response">→ Keynesianismo</div>
                  </div>
                  <div className="crisis-item">
                    <div className="crisis-year">1970</div>
                    <div className="crisis-name">Crise do Petróleo</div>
                    <div className="crisis-response">→ Neoliberalismo</div>
                  </div>
                  <div className="crisis-item">
                    <div className="crisis-year">1990</div>
                    <div className="crisis-name">Fim da URSS</div>
                    <div className="crisis-response">→ Globalização</div>
                  </div>
                  <div className="crisis-item">
                    <div className="crisis-year">2008</div>
                    <div className="crisis-name">Crise Financeira</div>
                    <div className="crisis-response">→ Bolha Imobiliária</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 2: Industrial Revolutions */}
      <section id="revolucoes" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">history</span>
            <h2 className="section-title">As Quatro Revoluções Industriais</h2>
          </div>
        </ScrollReveal>

        {/* Revolution selector */}
        <ScrollReveal delay={100}>
          <div className="revolution-selector">
            {revolutions.map(rev => (
              <button
                key={rev.id}
                className={`revolution-tab ${selectedRevolution === rev.id ? 'active' : ''}`}
                onClick={() => setSelectedRevolution(rev.id)}
                style={{ '--tab-color': rev.color }}
              >
                <span className="tab-icon">{rev.icon}</span>
                <span className="tab-label">{rev.id}ª Rev.</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Revolution details */}
        {revolutions.map(rev => (
          selectedRevolution === rev.id && (
            <ScrollReveal key={rev.id} delay={150}>
              <GlassCard className="revolution-card">
                <div className="revolution-header" style={{ '--rev-color': rev.color }}>
                  <span className="revolution-icon-large">{rev.icon}</span>
                  <div className="revolution-info">
                    <h3 className="revolution-name">{rev.name}</h3>
                    <div className="revolution-meta">
                      <span className="meta-item">
                        <span className="material-icons">schedule</span>
                        {rev.period}
                      </span>
                      <span className="meta-item">
                        <span className="material-icons">location_on</span>
                        {rev.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="revolution-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="material-icons detail-icon">bolt</span>
                      <div className="detail-content">
                        <h4>Energia</h4>
                        <p>{rev.energy}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="material-icons detail-icon">precision_manufacturing</span>
                      <div className="detail-content">
                        <h4>Tecnologia</h4>
                        <p>{rev.technology}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="material-icons detail-icon">business</span>
                      <div className="detail-content">
                        <h4>Setor</h4>
                        <p>{rev.sector}</p>
                      </div>
                    </div>
                  </div>

                  <div className="characteristics">
                    <h4>Características Principais:</h4>
                    <ul className="characteristics-list">
                      {rev.characteristics.map((char, idx) => (
                        <li key={idx}>
                          <span className="material-icons">check_circle</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          )
        ))}

        {/* Timeline visual */}
        <ScrollReveal delay={200}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">timeline</span>
              Linha do Tempo das Revoluções
            </h3>
            <div className="revolution-timeline">
              {revolutions.map((rev, idx) => (
                <div key={rev.id} className="timeline-item">
                  <div className="timeline-marker" style={{ backgroundColor: rev.color }}>
                    {rev.icon}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-period">{rev.period}</div>
                    <div className="timeline-name">{rev.name}</div>
                    <div className="timeline-tech">{rev.technology}</div>
                  </div>
                  {idx < revolutions.length - 1 && <div className="timeline-connector"></div>}
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 3: Economic Blocs */}
      <section id="blocos" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">public</span>
            <h2 className="section-title">Blocos Econômicos e Organizações</h2>
          </div>
        </ScrollReveal>

        {/* OPEP */}
        <ScrollReveal delay={100}>
          <GlassCard className="bloc-card">
            <div className="bloc-header">
              <span className="bloc-icon">🛢️</span>
              <div className="bloc-info">
                <h3>{economicBlocs[0].name}</h3>
                <p className="bloc-fullname">{economicBlocs[0].fullName}</p>
              </div>
            </div>
            <div className="bloc-details">
              <div className="bloc-meta">
                <span className="meta-badge">
                  <span className="material-icons">event</span>
                  Fundada em {economicBlocs[0].founded}
                </span>
                <span className="meta-badge">
                  <span className="material-icons">groups</span>
                  {economicBlocs[0].members} países membros
                </span>
              </div>
              <p className="bloc-purpose">
                <strong>Objetivo:</strong> {economicBlocs[0].purpose}
              </p>
              <div className="bloc-countries">
                <h4>Principais Membros:</h4>
                <div className="countries-list">
                  {economicBlocs[0].keyCountries.map((country, idx) => (
                    <span key={idx} className="country-tag">{country}</span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* BRICS */}
        <ScrollReveal delay={150}>
          <GlassCard className="bloc-card">
            <div className="bloc-header">
              <span className="bloc-icon">🌍</span>
              <div className="bloc-info">
                <h3>{economicBlocs[1].name}</h3>
                <p className="bloc-fullname">{economicBlocs[1].fullName}</p>
              </div>
            </div>
            <div className="bloc-details">
              <div className="bloc-meta">
                <span className="meta-badge">
                  <span className="material-icons">event</span>
                  Formado em {economicBlocs[1].founded}
                </span>
                <span className="meta-badge">
                  <span className="material-icons">groups</span>
                  {economicBlocs[1].members} países
                </span>
              </div>
              <p className="bloc-purpose">
                <strong>Objetivo:</strong> {economicBlocs[1].purpose}
              </p>
              <div className="bloc-features">
                <h4>Características:</h4>
                <ul>
                  {economicBlocs[1].keyFeatures.map((feature, idx) => (
                    <li key={idx}>
                      <span className="material-icons">arrow_right</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Asian Tigers */}
        <ScrollReveal delay={200}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">trending_up</span>
              Tigres Asiáticos
            </h3>
            
            <div className="tigers-selector">
              <button
                className={`tiger-tab ${selectedTiger === 'classic' ? 'active' : ''}`}
                onClick={() => setSelectedTiger('classic')}
              >
                Tigres Clássicos (1970)
              </button>
              <button
                className={`tiger-tab ${selectedTiger === 'new' ? 'active' : ''}`}
                onClick={() => setSelectedTiger('new')}
              >
                Novos Tigres (1980/90)
              </button>
            </div>

            <div className="tigers-content">
              <h4>{asianTigers[selectedTiger].name}</h4>
              <p className="tigers-period">
                <span className="material-icons">schedule</span>
                {asianTigers[selectedTiger].period}
              </p>

              <div className="countries-grid">
                {asianTigers[selectedTiger].countries.map((country, idx) => (
                  <div key={idx} className="country-card">
                    <span className="country-flag">{country.flag}</span>
                    <h5>{country.name}</h5>
                    <p className="country-capital">Capital: {country.capital}</p>
                    <p className="country-specialty">
                      <span className="material-icons">star</span>
                      {country.specialty}
                    </p>
                  </div>
                ))}
              </div>

              <div className="tigers-characteristics">
                <h4>Características do Modelo:</h4>
                <ul>
                  {asianTigers[selectedTiger].characteristics.map((char, idx) => (
                    <li key={idx}>
                      <span className="material-icons">check_circle</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* ZPE */}
        <ScrollReveal delay={250}>
          <GlassCard className="highlight-card">
            <h3 className="card-title">
              <span className="material-icons">dashboard</span>
              ZPE - Zona de Processamento de Exportação
            </h3>
            <div className="zpe-content">
              <p className="zpe-definition">
                <strong>Definição:</strong> Criação de zonas de livre-comércio com incentivos fiscais 
                e isenções para atrair investimentos externos e promover a industrialização orientada 
                para exportação.
              </p>
              <div className="zpe-features">
                <div className="feature-item">
                  <span className="material-icons">import_export</span>
                  <p>Substituição de importação</p>
                </div>
                <div className="feature-item">
                  <span className="material-icons">trending_up</span>
                  <p>Foco em exportação</p>
                </div>
                <div className="feature-item">
                  <span className="material-icons">account_balance</span>
                  <p>Incentivos fiscais</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 4: USA */}
      <section id="eua" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">flag</span>
            <h2 className="section-title">Estados Unidos: Regiões Industriais</h2>
          </div>
        </ScrollReveal>

        {/* Region selector */}
        <ScrollReveal delay={100}>
          <div className="usa-selector">
            <button
              className={`usa-tab ${selectedUSRegion === 'manufacturing' ? 'active' : ''}`}
              onClick={() => setSelectedUSRegion('manufacturing')}
            >
              <span className="material-icons">factory</span>
              Manufacturing Belt
            </button>
            <button
              className={`usa-tab ${selectedUSRegion === 'sun' ? 'active' : ''}`}
              onClick={() => setSelectedUSRegion('sun')}
            >
              <span className="material-icons">wb_sunny</span>
              Sun Belt
            </button>
            <button
              className={`usa-tab ${selectedUSRegion === 'rust' ? 'active' : ''}`}
              onClick={() => setSelectedUSRegion('rust')}
            >
              <span className="material-icons">warning</span>
              Rust Belt
            </button>
          </div>
        </ScrollReveal>

        {/* Region details */}
        <ScrollReveal delay={150}>
          <GlassCard className="usa-region-card">
            <div className="region-header">
              <h3>{usaRegions[selectedUSRegion].name}</h3>
              <div className="region-meta">
                <span className="meta-badge">
                  <span className="material-icons">location_on</span>
                  {usaRegions[selectedUSRegion].location}
                </span>
                {usaRegions[selectedUSRegion].period && (
                  <span className="meta-badge">
                    <span className="material-icons">schedule</span>
                    {usaRegions[selectedUSRegion].period}
                  </span>
                )}
              </div>
            </div>

            {usaRegions[selectedUSRegion].description && (
              <p className="region-description">{usaRegions[selectedUSRegion].description}</p>
            )}

            {usaRegions[selectedUSRegion].cities && (
              <div className="cities-section">
                <h4>Principais Cidades:</h4>
                <div className="cities-grid">
                  {usaRegions[selectedUSRegion].cities.map((city, idx) => (
                    <div key={idx} className="city-card">
                      <span className="city-icon">{city.icon}</span>
                      <h5>{city.name}</h5>
                      <p className="city-state">{city.state}</p>
                      <p className="city-specialty">{city.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="region-characteristics">
              <h4>Características:</h4>
              <ul>
                {usaRegions[selectedUSRegion].characteristics.map((char, idx) => (
                  <li key={idx}>
                    <span className="material-icons">
                      {selectedUSRegion === 'rust' ? 'warning' : 'check_circle'}
                    </span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Comparison Manufacturing vs Sun Belt */}
        <ScrollReveal delay={200}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">compare_arrows</span>
              Comparação: Manufacturing Belt vs Sun Belt
            </h3>
            <div className="comparison-table">
              <div className="comparison-row header-row">
                <div className="comparison-cell">Aspecto</div>
                <div className="comparison-cell">Manufacturing Belt</div>
                <div className="comparison-cell">Sun Belt</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell"><strong>Localização</strong></div>
                <div className="comparison-cell">Nordeste</div>
                <div className="comparison-cell">Sul e Oeste</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell"><strong>Tipo de Indústria</strong></div>
                <div className="comparison-cell">Tradicional (automóveis, aço)</div>
                <div className="comparison-cell">Moderna (tecnologia, aeroespacial)</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell"><strong>Período</strong></div>
                <div className="comparison-cell">Século XIX-XX</div>
                <div className="comparison-cell">Pós-2008</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell"><strong>Situação Atual</strong></div>
                <div className="comparison-cell">Declínio (Rust Belt)</div>
                <div className="comparison-cell">Crescimento</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell"><strong>População</strong></div>
                <div className="comparison-cell">Êxodo</div>
                <div className="comparison-cell">Crescimento</div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 5: China */}
      <section id="china" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <span className="material-icons section-icon">language</span>
            <h2 className="section-title">China: De Revolução a Potência Industrial</h2>
          </div>
        </ScrollReveal>

        {/* Era selector */}
        <ScrollReveal delay={100}>
          <div className="china-selector">
            <button
              className={`china-tab ${selectedChinaEra === 'mao' ? 'active' : ''}`}
              onClick={() => setSelectedChinaEra('mao')}
            >
              <span className="tab-icon">🚩</span>
              Era Mao (1949-1976)
            </button>
            <button
              className={`china-tab ${selectedChinaEra === 'deng' ? 'active' : ''}`}
              onClick={() => setSelectedChinaEra('deng')}
            >
              <span className="tab-icon">📈</span>
              Era Deng (1978-1997)
            </button>
            <button
              className={`china-tab ${selectedChinaEra === 'modern' ? 'active' : ''}`}
              onClick={() => setSelectedChinaEra('modern')}
            >
              <span className="tab-icon">🇨🇳</span>
              Era Moderna (2000+)
            </button>
          </div>
        </ScrollReveal>

        {/* Era details */}
        {(selectedChinaEra === 'mao' || selectedChinaEra === 'deng') && (
          <ScrollReveal delay={150}>
            <GlassCard className="china-era-card">
              <div className="era-header">
                <span className="era-icon">{chinaEras[selectedChinaEra].icon}</span>
                <div className="era-info">
                  <h3>{chinaEras[selectedChinaEra].name}</h3>
                  <p className="era-period">{chinaEras[selectedChinaEra].period}</p>
                  <p className="era-model">
                    <strong>Modelo Econômico:</strong> {chinaEras[selectedChinaEra].model}
                  </p>
                </div>
              </div>

              <div className="era-events">
                <h4>Principais Eventos:</h4>
                <div className="events-timeline">
                  {chinaEras[selectedChinaEra].events.map((event, idx) => (
                    <div key={idx} className="event-item">
                      <div className="event-year">{event.year}</div>
                      <div className="event-content">
                        <h5>{event.event}</h5>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        )}

        {selectedChinaEra === 'modern' && (
          <ScrollReveal delay={150}>
            <GlassCard className="china-modern-card">
              <div className="era-header">
                <span className="era-icon">{chinaEras.modern.icon}</span>
                <div className="era-info">
                  <h3>{chinaEras.modern.name}</h3>
                  <p className="era-period">{chinaEras.modern.period}</p>
                  <p className="era-model">
                    <strong>Modelo Econômico:</strong> {chinaEras.modern.model}
                  </p>
                </div>
              </div>

              <div className="modern-achievements">
                <h4>Situação Atual:</h4>
                <div className="achievements-grid">
                  {chinaEras.modern.achievements.map((achievement, idx) => (
                    <div key={idx} className="achievement-card">
                      <span className="material-icons">emoji_events</span>
                      <p>{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modern-regions">
                <h4>Principais Regiões Industriais:</h4>
                <div className="regions-grid">
                  {chinaEras.modern.regions.map((region, idx) => (
                    <div key={idx} className="region-card">
                      <span className="region-icon">{region.icon}</span>
                      <h5>{region.name}</h5>
                      <p>{region.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        )}

        {/* ZEEs (Special Economic Zones) */}
        <ScrollReveal delay={200}>
          <GlassCard className="highlight-card">
            <h3 className="card-title">
              <span className="material-icons">business_center</span>
              ZEEs - Zonas Econômicas Especiais
            </h3>
            <div className="zee-content">
              <p className="zee-definition">
                <strong>Criadas por Deng Xiaoping</strong> em 1978 como parte da abertura econômica. 
                Funcionam como <strong>plataformas de exportação</strong> com incentivos fiscais para 
                atrair capital e tecnologia estrangeira.
              </p>
              <div className="zee-features">
                <h4>Características das ZEEs:</h4>
                <ul>
                  <li>
                    <span className="material-icons">attach_money</span>
                    Isenções fiscais e incentivos
                  </li>
                  <li>
                    <span className="material-icons">public</span>
                    Abertura ao capital estrangeiro
                  </li>
                  <li>
                    <span className="material-icons">precision_manufacturing</span>
                    Transferência de tecnologia
                  </li>
                  <li>
                    <span className="material-icons">local_shipping</span>
                    Foco em exportação
                  </li>
                </ul>
              </div>
              <div className="zee-example">
                <p>
                  <strong>Exemplo:</strong> Shenzhen, próxima a Hong Kong, tornou-se um dos maiores 
                  hubs tecnológicos do mundo, abrigando empresas como Huawei e Tencent.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Socialismo de Mercado */}
        <ScrollReveal delay={250}>
          <GlassCard>
            <h3 className="card-title">
              <span className="material-icons">balance</span>
              Socialismo de Mercado
            </h3>
            <div className="market-socialism">
              <p>
                O modelo chinês combina elementos do socialismo (controle estatal) com mecanismos 
                de mercado (livre iniciativa). O Partido Comunista mantém o controle político enquanto 
                permite a abertura econômica.
              </p>
              <div className="model-comparison">
                <div className="model-side">
                  <h4>Socialismo</h4>
                  <ul>
                    <li>Partido Único (PC Chinês)</li>
                    <li>Empresas estatais estratégicas</li>
                    <li>Planejamento centralizado</li>
                    <li>Controle social</li>
                  </ul>
                </div>
                <div className="model-divider">+</div>
                <div className="model-side">
                  <h4>Mercado</h4>
                  <ul>
                    <li>Empresas privadas</li>
                    <li>Investimento estrangeiro</li>
                    <li>Economia de mercado</li>
                    <li>Livre comércio (ZEEs)</li>
                  </ul>
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
              <p>Responda as questões abaixo sobre industrialização mundial:</p>
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

export default GeographyIndustrialization;

