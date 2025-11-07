import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import { useProgress } from '../utils/progressTracker';
import './BiologyFilos.css';

const BiologyFilos = () => {
  const { navigateWithTransition } = useNavigation();
  const { markVisited, markCompleted, isCompleted } = useProgress('biology', 'filos-animais');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  const [expandedPhylum, setExpandedPhylum] = useState(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Define sections for navigation
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'tabela', title: 'Tabela Comparativa', icon: 'table_chart' },
    { id: 'poriferos', title: 'Poríferos', icon: 'filter_alt' },
    { id: 'cnidarios', title: 'Cnidários', icon: 'water' },
    { id: 'platelmintos', title: 'Platelmintos', icon: 'straighten' },
    { id: 'nematelmintos', title: 'Nematelmintos', icon: 'show_chart' },
    { id: 'moluscos', title: 'Moluscos', icon: 'bubble_chart' },
    { id: 'anelidos', title: 'Anelídeos', icon: 'tune' },
    { id: 'conclusao', title: 'Conclusão', icon: 'check_circle' },
  ];

  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  useEffect(() => {
    markVisited();
    
    // Check initial orientation
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 768;
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && isPortraitMode);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Handle scroll for navigation bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        // Always show at top
        setShowNav(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigate = (path) => {
    navigateWithTransition(path, 'green');
  };

  // Phyla data with all information
  const phylaData = [
    {
      id: 'poriferos',
      name: 'Poríferos',
      commonName: 'Esponjas',
      etymology: 'Portadores de poros (do latim porus = poro)',
      icon: 'filter_alt',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/YellowTubeSponge.jpg',
      imageCaption: 'Espécie de esponja marinha do gênero Aplysina, comum em recifes de corais tropicais.',
      characteristics: {
        simetria: 'Assimétrica ou radial',
        ambiente: 'Aquático (principalmente marinho)',
        folhetos: 'Ausentes (parazoários)',
        blastoporo: 'Indeterminado',
        celoma: 'Ausente (acelomados)',
        digestao: 'Intracelular (filtração)',
        respiracao: 'Difusão',
        circulacao: 'Ausente',
        excrecao: 'Difusão',
        nervoso: 'Rede nervosa simples',
        reproducao: 'Sexuada e assexuada (brotamento, gemulação)',
        classes: 'Asconoide, Siconoide, Leuconoide',
        destaque: 'Filtradores; presença de poros, coanócitos e espículas'
      }
    },
    {
      id: 'cnidarios',
      name: 'Cnidários',
      commonName: 'Águas-vivas, Anêmonas',
      etymology: 'Urtiga (do latim cnidos = urtiga)',
      icon: 'water',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Portuguese_man_o%27_war.jpg',
      imageCaption: 'Physalia physalis, conhecida como caravela-portuguesa, uma espécie de água-viva com tentáculos venenosos.',
      characteristics: {
        simetria: 'Radial (pólipo ou medusa)',
        ambiente: 'Aquático (principalmente marinho)',
        folhetos: 'Diblásticos (ectoderme e endoderme)',
        blastoporo: 'Indeterminado',
        celoma: 'Ausente (acelomados)',
        digestao: 'Cavidade gastrovascular (incompleta)',
        respiracao: 'Difusão',
        circulacao: 'Ausente',
        excrecao: 'Difusão',
        nervoso: 'Rede nervosa ou gânglios',
        reproducao: 'Sexuada e assexuada (alternância de gerações)',
        classes: 'Hydrozoa, Scyphozoa, Anthozoa, Cubozoa',
        destaque: 'Cnidócitos (nematocistos); formas pólipo/medusa; mesogléia'
      }
    },
    {
      id: 'platelmintos',
      name: 'Platelmintos',
      commonName: 'Vermes achatados',
      etymology: 'Vermes achatados (do grego platy = plano)',
      icon: 'straighten',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Planaria_2.jpg',
      imageCaption: 'Planaria, um tipo de verme achatado de água doce, conhecida por sua capacidade de regeneração.',
      characteristics: {
        simetria: 'Bilateral',
        ambiente: 'Aquático, terrestre e parasitário',
        folhetos: 'Triblásticos (ectoderme, mesoderme e endoderme)',
        blastoporo: 'Protostômio',
        celoma: 'Ausente (acelomados)',
        digestao: 'Cavidade gastrovascular (incompleta)',
        respiracao: 'Difusão',
        circulacao: 'Ausente',
        excrecao: 'Protonefrídios (células-flama)',
        nervoso: 'Gânglios cerebrais e cordão nervoso ventral',
        reproducao: 'Sexuada e assexuada (regeneração)',
        classes: 'Turbellaria, Trematoda, Cestoda',
        destaque: 'Corpo achatado; muitos parasitas; regeneração'
      }
    },
    {
      id: 'nematelmintos',
      name: 'Nematelmintos',
      commonName: 'Vermes cilíndricos',
      etymology: 'Vermes cilíndricos (do grego nema = fio)',
      icon: 'show_chart',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Ascaris_lumbricoides.jpg',
      imageCaption: 'Ascaris lumbricoides, um verme cilíndrico parasita do intestino humano.',
      characteristics: {
        simetria: 'Bilateral',
        ambiente: 'Aquático, terrestre e parasitário',
        folhetos: 'Triblásticos (ectoderme, mesoderme e endoderme)',
        blastoporo: 'Protostômio',
        celoma: 'Pseudoceloma (cavidade corporal falsa)',
        digestao: 'Digestão completa (boca e ânus)',
        respiracao: 'Difusão',
        circulacao: 'Ausente',
        excrecao: 'Renetes ou ductos excretores',
        nervoso: 'Gânglios cerebrais e cordão nervoso ventral',
        reproducao: 'Sexuada (dióicos ou hermafroditas)',
        classes: 'Nematoda',
        destaque: 'Cutícula resistente; movimento ondulatório; parasitas importantes'
      }
    },
    {
      id: 'moluscos',
      name: 'Moluscos',
      commonName: 'Caracóis, Polvos, Ostras',
      etymology: 'Corpo mole (do latim mollis = mole)',
      icon: 'bubble_chart',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Octopus_vulgaris.jpg',
      imageCaption: 'Octopus vulgaris, o polvo comum, conhecido por sua inteligência e camuflagem.',
      characteristics: {
        simetria: 'Bilateral',
        ambiente: 'Aquático e terrestre',
        folhetos: 'Triblásticos (ectoderme, mesoderme e endoderme)',
        blastoporo: 'Protostômio',
        celoma: 'Celoma verdadeiro',
        digestao: 'Digestão completa (boca e ânus)',
        respiracao: 'Brânquias ou respiração cutânea',
        circulacao: 'Aberta ou fechada (dependendo da classe)',
        excrecao: 'Nefrídios',
        nervoso: 'Gânglios cerebrais e cordão nervoso ventral',
        reproducao: 'Sexuada (dióicos ou hermafroditas)',
        classes: 'Gastropoda, Bivalvia, Cephalopoda, Polyplacophora',
        destaque: 'Pé, manto, massa visceral; rádula (em muitos)'
      }
    },
    {
      id: 'anelidos',
      name: 'Anelídeos',
      commonName: 'Minhocas, Sanguessugas',
      etymology: 'Vermes segmentados (do latim anellus = anel)',
      icon: 'tune',
      color: '#14b8a6',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Lumbricus_terrestris.jpg',
      imageCaption: 'Lumbricus terrestris, a minhoca de jardim, essencial para a aeração do solo.',
      characteristics: {
        simetria: 'Bilateral',
        ambiente: 'Aquático e terrestre',
        folhetos: 'Triblásticos (ectoderme, mesoderme e endoderme)',
        blastoporo: 'Protostômio',
        celoma: 'Celoma verdadeiro',
        digestao: 'Digestão completa (boca e ânus)',
        respiracao: 'Brânquias ou respiração cutânea',
        circulacao: 'Fechada',
        excrecao: 'Metanefrídios',
        nervoso: 'Gânglios cerebrais e cordão nervoso ventral',
        reproducao: 'Sexuada (dióicos ou hermafroditas)',
        classes: 'Polychaeta, Oligochaeta, Hirudinea',
        destaque: 'Metameria (segmentação); celoma como esqueleto hidroestático; sistema circulatório fechado'
      }
    }
  ];

  // Characteristics list for filtering
  const characteristicsList = [
    { id: 'simetria', label: 'Simetria' },
    { id: 'ambiente', label: 'Ambiente' },
    { id: 'folhetos', label: 'Folhetos Embrionários' },
    { id: 'celoma', label: 'Celoma' },
    { id: 'digestao', label: 'Digestão' },
    { id: 'circulacao', label: 'Circulação' },
    { id: 'nervoso', label: 'Sistema Nervoso' },
    { id: 'reproducao', label: 'Reprodução' },
  ];

  // Filter phyla based on search
  const filteredPhyla = phylaData.filter(phylum => 
    phylum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phylum.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phylum.etymology.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Object.values(phylum.characteristics).some(val => 
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Toggle characteristic filter
  const toggleCharacteristic = (charId) => {
    setSelectedCharacteristics(prev => 
      prev.includes(charId) 
        ? prev.filter(id => id !== charId)
        : [...prev, charId]
    );
  };

  return (
    <div className="biology-filos-page">
      <MobileOrientationNotification />
      
      {/* Sticky Navigation */}
      <div className={`sticky-nav-wrapper ${showNav ? 'visible' : 'hidden'}`}>
        <StickyTopicNav 
          sections={sections}
          currentSection={currentSection}
          accentColor="#22c55e"
        />
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => handleNavigate('/')} className="breadcrumb-link">
          <span className="material-icons">home</span>
          Início
        </button>
        <span className="breadcrumb-separator">›</span>
        <button onClick={() => handleNavigate('/biology')} className="breadcrumb-link">
          Biologia
        </button>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Filos Animais</span>
      </div>

      {/* Hero Section */}
      <section className="filos-hero">
        <ScrollReveal>
          <div className="topic-badge">
            <span className="material-icons">pets</span>
            BIOLOGIA
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="filos-title">
            <span className="gradient-text">Filos Animais</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="filos-subtitle">
            Comparação detalhada dos principais filos do reino animal
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="stats-row">
            <div className="stat-item">
              <span className="material-icons">category</span>
              <span>{phylaData.length} Filos</span>
            </div>
            <div className="stat-item">
              <span className="material-icons">compare</span>
              <span>Comparação Completa</span>
            </div>
            <div className="stat-item">
              <span className="material-icons">filter_list</span>
              <span>Filtros Interativos</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Introduction */}
      <section id="intro" className="content-section">
        <ScrollReveal>
          <GlassCard>
            <div className="section-header">
              <span className="material-icons">info</span>
              <h2>Introdução à Classificação Animal</h2>
            </div>
            <div className="intro-content">
              <p>
                Os animais são classificados em diferentes <strong>filos</strong> com base em características 
                anatômicas, fisiológicas e evolutivas. Compreender essas classificações é fundamental para 
                entender a diversidade e a evolução da vida animal no planeta.
              </p>
              <p>
                Nesta página, exploraremos 6 filos principais: <strong>Poríferos</strong>, <strong>Cnidários</strong>, 
                <strong>Platelmintos</strong>, <strong>Nematelmintos</strong>, <strong>Moluscos</strong> e <strong>Anelídeos</strong>. 
                Cada filo possui características únicas que os diferenciam e adaptações especializadas para seus ambientes.
              </p>
              <div className="key-concepts">
                <h3><span className="material-icons">lightbulb</span> Conceitos-chave</h3>
                <ul>
                  <li><strong>Simetria:</strong> Organização do corpo do animal</li>
                  <li><strong>Folhetos embrionários:</strong> Camadas celulares formadas durante o desenvolvimento</li>
                  <li><strong>Celoma:</strong> Cavidade corporal preenchida com fluido</li>
                  <li><strong>Protostômios:</strong> Animais onde o blastóporo origina a boca</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Interactive Filters */}
      <section id="tabela" className="content-section">
        <ScrollReveal>
          <GlassCard className="filter-card">
            <div className="section-header">
              <span className="material-icons">filter_list</span>
              <h2>Filtros e Busca</h2>
            </div>
            
            <div className="filter-controls">
              {/* Search Bar */}
              <div className="search-bar">
                <span className="material-icons">search</span>
                <input
                  type="text"
                  placeholder="Buscar por filo ou característica..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpar busca"
                  >
                    <span className="material-icons">close</span>
                  </button>
                )}
              </div>

              {/* Characteristic Filters */}
              <div className="characteristic-filters">
                <p className="filter-label">Destacar características:</p>
                <div className="filter-chips">
                  {characteristicsList.map(char => (
                    <button
                      key={char.id}
                      className={`filter-chip ${selectedCharacteristics.includes(char.id) ? 'active' : ''}`}
                      onClick={() => toggleCharacteristic(char.id)}
                    >
                      {char.label}
                    </button>
                  ))}
                </div>
                {selectedCharacteristics.length > 0 && (
                  <button 
                    className="reset-filters"
                    onClick={() => setSelectedCharacteristics([])}
                  >
                    <span className="material-icons">restart_alt</span>
                    Limpar filtros
                  </button>
                )}
              </div>

              {/* Results count */}
              {searchTerm && (
                <div className="results-count">
                  <span className="material-icons">check_circle</span>
                  {filteredPhyla.length} de {phylaData.length} filos encontrados
                </div>
              )}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal delay={100}>
          <GlassCard className="table-card">
            <div className="table-container">
              {/* Portrait Orientation Blocker */}
              {isPortrait && (
                <div className="orientation-blocker">
                  <span className="material-icons">screen_rotation</span>
                  <p>Rotacione o celular para ver a tabela</p>
                </div>
              )}
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="sticky-col">Característica</th>
                    {filteredPhyla.map(phylum => (
                      <th key={phylum.id} style={{ borderTop: `3px solid ${phylum.color}` }}>
                        <span className="material-icons" style={{ color: phylum.color }}>
                          {phylum.icon}
                        </span>
                        <span>{phylum.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sticky-col characteristic-label">Origem do nome</td>
                    {filteredPhyla.map(phylum => (
                      <td key={phylum.id}>{phylum.etymology}</td>
                    ))}
                  </tr>
                  {characteristicsList.map(char => (
                    <tr 
                      key={char.id}
                      className={selectedCharacteristics.includes(char.id) ? 'highlighted' : ''}
                    >
                      <td className="sticky-col characteristic-label">{char.label}</td>
                      {filteredPhyla.map(phylum => (
                        <td key={phylum.id}>
                          {phylum.characteristics[char.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className={selectedCharacteristics.includes('destaque') ? 'highlighted' : ''}>
                    <td className="sticky-col characteristic-label">Características Relevantes</td>
                    {filteredPhyla.map(phylum => (
                      <td key={phylum.id} className="highlight-cell">
                        {phylum.characteristics.destaque}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-hint">
              <span className="material-icons">swipe</span>
              Deslize horizontalmente para ver todas as colunas
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Individual Phylum Sections */}
      {phylaData.map((phylum, index) => (
        <section key={phylum.id} id={phylum.id} className="content-section">
          <ScrollReveal delay={index * 50}>
            <GlassCard className="phylum-card">
              <div className="phylum-header" style={{ background: phylum.gradient }}>
                <div className="phylum-icon">
                  <span className="material-icons">{phylum.icon}</span>
                </div>
                <div className="phylum-title-group">
                  <h2>{phylum.name}</h2>
                  <p className="phylum-common-name">{phylum.commonName}</p>
                  <p className="phylum-etymology">
                    <span className="material-icons">translate</span>
                    {phylum.etymology}
                  </p>
                </div>
              </div>

              <div className="phylum-content">
                {/* Characteristics Grid */}
                <div className="characteristics-grid">
                  <div className="characteristic-item">
                    <span className="material-icons">sync</span>
                    <div>
                      <strong>Simetria</strong>
                      <p>{phylum.characteristics.simetria}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">public</span>
                    <div>
                      <strong>Ambiente</strong>
                      <p>{phylum.characteristics.ambiente}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">layers</span>
                    <div>
                      <strong>Folhetos</strong>
                      <p>{phylum.characteristics.folhetos}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">circle</span>
                    <div>
                      <strong>Celoma</strong>
                      <p>{phylum.characteristics.celoma}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">restaurant</span>
                    <div>
                      <strong>Digestão</strong>
                      <p>{phylum.characteristics.digestao}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">air</span>
                    <div>
                      <strong>Respiração</strong>
                      <p>{phylum.characteristics.respiracao}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">favorite</span>
                    <div>
                      <strong>Circulação</strong>
                      <p>{phylum.characteristics.circulacao}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">cleaning_services</span>
                    <div>
                      <strong>Excreção</strong>
                      <p>{phylum.characteristics.excrecao}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">psychology</span>
                    <div>
                      <strong>Sistema Nervoso</strong>
                      <p>{phylum.characteristics.nervoso}</p>
                    </div>
                  </div>
                  <div className="characteristic-item">
                    <span className="material-icons">child_care</span>
                    <div>
                      <strong>Reprodução</strong>
                      <p>{phylum.characteristics.reproducao}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <button
                  className="expand-button"
                  onClick={() => setExpandedPhylum(expandedPhylum === phylum.id ? null : phylum.id)}
                >
                  <span className="material-icons">
                    {expandedPhylum === phylum.id ? 'expand_less' : 'expand_more'}
                  </span>
                  {expandedPhylum === phylum.id ? 'Ver Menos' : 'Ver Mais Detalhes'}
                </button>

                {expandedPhylum === phylum.id && (
                  <div className="expanded-details">
                    <div className="detail-section">
                      <h4>
                        <span className="material-icons">category</span>
                        Classes Principais
                      </h4>
                      <p>{phylum.characteristics.classes}</p>
                    </div>
                    <div className="detail-section highlight-section">
                      <h4>
                        <span className="material-icons">star</span>
                        Destaques do Filo
                      </h4>
                      <p>{phylum.characteristics.destaque}</p>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </ScrollReveal>
        </section>
      ))}

      {/* Conclusion */}
      <section id="conclusao" className="content-section">
        <ScrollReveal>
          <GlassCard className="conclusion-card">
            <div className="section-header">
              <span className="material-icons">check_circle</span>
              <h2>Conclusão</h2>
            </div>
            <div className="conclusion-content">
              <p>
                Os filos animais representam a incrível <strong>diversidade evolutiva</strong> do reino animal. 
                Desde os simples Poríferos até os complexos Anelídeos, cada grupo desenvolveu adaptações 
                únicas que permitiram sua sobrevivência e proliferação em diversos ambientes.
              </p>
              
              <div className="key-takeaways">
                <h3><span className="material-icons">emoji_objects</span> Pontos-chave para lembrar</h3>
                <div className="takeaways-grid">
                  <div className="takeaway-item">
                    <span className="material-icons">trending_up</span>
                    <p><strong>Complexidade crescente:</strong> De Poríferos para Anelídeos, observamos aumento na complexidade dos sistemas.</p>
                  </div>
                  <div className="takeaway-item">
                    <span className="material-icons">hub</span>
                    <p><strong>Simetria:</strong> Evolução de assimetria para simetria bilateral.</p>
                  </div>
                  <div className="takeaway-item">
                    <span className="material-icons">account_tree</span>
                    <p><strong>Sistemas especializados:</strong> Desenvolvimento de sistemas circulatórios, nervosos e excretores.</p>
                  </div>
                  <div className="takeaway-item">
                    <span className="material-icons">spa</span>
                    <p><strong>Adaptações:</strong> Cada filo possui adaptações específicas para seu modo de vida.</p>
                  </div>
                </div>
              </div>

              {/* Progress Button */}
              <div className="completion-section">
                <button 
                  className={`completion-button ${isCompleted ? 'completed' : ''}`}
                  onClick={() => markCompleted(!isCompleted)}
                >
                  <span className="material-icons">
                    {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  {isCompleted ? 'Tópico Concluído!' : 'Marcar como Concluído'}
                </button>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default BiologyFilos;

