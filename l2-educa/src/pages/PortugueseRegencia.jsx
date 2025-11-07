import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import { useProgress } from '../utils/progressTracker';
import './PortugueseInterpretacao.css';

const PortugueseRegencia = () => {
  const { markVisited, markCompleted, isCompleted } = useProgress('portuguese', 'regencia');
  
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'verbal', title: 'Regência Verbal', icon: 'record_voice_over' },
    { id: 'nominal', title: 'Regência Nominal', icon: 'text_fields' },
    { id: 'principais', title: 'Verbos Principais', icon: 'list' },
    { id: 'mudanca', title: 'Mudança de Sentido', icon: 'swap_horiz' },
  ];

  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  useEffect(() => {
    markVisited();
  }, []);

  return (
    <div className="portuguese-interpretacao-page">
      <StickyTopicNav 
        sections={sections}
        currentSection={currentSection}
        subjectPath="/portuguese"
        subjectName="Português"
        topicTitle="Regência"
      />

      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="material-icons">home</span>
          Início
        </Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/portuguese" className="breadcrumb-link">
          Português
        </Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Regência</span>
      </div>

      <div className="topic-hero">
        <ScrollReveal>
          <div className="topic-badge">
            <span className="material-icons">arrow_forward</span>
            REGÊNCIA VERBAL E NOMINAL
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="topic-title">
            <span className="gradient-text">Regência</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="topic-subtitle">
            Aprenda a relação entre verbos e seus complementos e o uso correto das preposições
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <button 
            onClick={() => markCompleted(!isCompleted)}
            className={`completion-button ${isCompleted ? 'completed' : ''}`}
          >
            <span className="material-icons">
              {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            {isCompleted ? 'Tópico Completo' : 'Marcar como Completo'}
          </button>
        </ScrollReveal>
      </div>

      <div className="content-container">
        
        <section id="intro" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">info</span>
              Introdução
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="content-card">
              <p className="intro-text">
                Regência é a relação de dependência entre termos da oração. Na regência verbal, estudamos a relação 
                entre o verbo e seus complementos. Na regência nominal, analisamos a relação entre nomes (substantivos, 
                adjetivos, advérbios) e seus complementos.
              </p>
              <p className="intro-text">
                O domínio da regência é fundamental para o uso correto das preposições e é amplamente cobrado em provas.
              </p>
            </GlassCard>
          </ScrollReveal>
        </section>

        <section id="verbal" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">record_voice_over</span>
              Regência Verbal
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Estuda a relação entre o verbo e seus complementos (objeto direto e indireto):</p>
              <ul className="summary-list">
                <li><strong>Verbo Transitivo Direto (VTD):</strong> não exige preposição</li>
                <li><strong>Verbo Transitivo Indireto (VTI):</strong> exige preposição</li>
                <li><strong>Verbo Transitivo Direto e Indireto (VTDI):</strong> tem os dois complementos</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('verbal')}
            >
              <span className="material-icons">
                {expandedSections.verbal ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.verbal ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.verbal && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Objeto Direto vs. Indireto</h4>
                  <p><strong>Objeto Direto:</strong> complemento sem preposição obrigatória</p>
                  <div className="example-box">
                    <p className="example-text">✓ Comprei <strong>um livro</strong>. (o quê? - sem preposição)</p>
                    <p className="example-text">✓ Vi <strong>meu amigo</strong> ontem.</p>
                  </div>
                  <p><strong>Objeto Indireto:</strong> complemento com preposição obrigatória</p>
                  <div className="example-box">
                    <p className="example-text">✓ Gosto <strong>de chocolate</strong>. (gostar DE)</p>
                    <p className="example-text">✓ Preciso <strong>de ajuda</strong>. (precisar DE)</p>
                    <p className="example-text">✓ Assisti <strong>ao filme</strong>. (assistir A)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Verbos com Dois Complementos</h4>
                  <p>Alguns verbos exigem objeto direto E indireto:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Dei <strong>o livro</strong> (OD) <strong>ao professor</strong> (OI).</p>
                    <p className="example-text">✓ Informei <strong>o resultado</strong> (OD) <strong>aos alunos</strong> (OI).</p>
                    <p className="example-text">✓ Paguei <strong>a conta</strong> (OD) <strong>ao garçom</strong> (OI).</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Dica para Identificar</h4>
                  <div className="tip-box">
                    <span className="material-icons">tips_and_updates</span>
                    <div>
                      <p><strong>Faça perguntas ao verbo:</strong></p>
                      <ul>
                        <li>Quem? O quê? → Objeto Direto</li>
                        <li>De quê? A quem? Para quem? Em quê? → Objeto Indireto</li>
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="nominal" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">text_fields</span>
              Regência Nominal
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Relação entre nomes (substantivos, adjetivos, advérbios) e seus complementos:</p>
              <ul className="summary-list">
                <li><strong>Acessível A:</strong> acessível ao público</li>
                <li><strong>Apto A/PARA:</strong> apto para o cargo</li>
                <li><strong>Contrário A:</strong> contrário à proposta</li>
                <li><strong>Fiel A:</strong> fiel aos princípios</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('nominal')}
            >
              <span className="material-icons">
                {expandedSections.nominal ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.nominal ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.nominal && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Principais Regências Nominais</h4>
                  <div className="argument-types">
                    <div className="argument-type">
                      <h5>Preposição A</h5>
                      <ul>
                        <li>Acostumado <strong>a</strong></li>
                        <li>Atento <strong>a</strong></li>
                        <li>Benéfico <strong>a</strong></li>
                        <li>Contrário <strong>a</strong></li>
                        <li>Favorável <strong>a</strong></li>
                        <li>Fiel <strong>a</strong></li>
                        <li>Grato <strong>a</strong></li>
                        <li>Paralelo <strong>a</strong></li>
                        <li>Posterior <strong>a</strong></li>
                        <li>Semelhante <strong>a</strong></li>
                      </ul>
                    </div>
                    <div className="argument-type">
                      <h5>Preposição DE</h5>
                      <ul>
                        <li>Ansioso <strong>de/por</strong></li>
                        <li>Capaz <strong>de</strong></li>
                        <li>Cheio <strong>de</strong></li>
                        <li>Consciente <strong>de</strong></li>
                        <li>Desejoso <strong>de</strong></li>
                        <li>Fácil <strong>de</strong></li>
                        <li>Incapaz <strong>de</strong></li>
                        <li>Natural <strong>de</strong></li>
                        <li>Orgulhoso <strong>de</strong></li>
                        <li>Possível <strong>de</strong></li>
                      </ul>
                    </div>
                    <div className="argument-type">
                      <h5>Preposição COM</h5>
                      <ul>
                        <li>Compatível <strong>com</strong></li>
                        <li>Conforme <strong>com</strong></li>
                        <li>Cuidadoso <strong>com</strong></li>
                        <li>Descontente <strong>com</strong></li>
                        <li>Impaciente <strong>com</strong></li>
                        <li>Incompatível <strong>com</strong></li>
                        <li>Parecido <strong>com</strong></li>
                        <li>Preocupado <strong>com</strong></li>
                        <li>Satisfeito <strong>com</strong></li>
                        <li>Semelhante <strong>com/a</strong></li>
                      </ul>
                    </div>
                    <div className="argument-type">
                      <h5>Preposição EM</h5>
                      <ul>
                        <li>Firme <strong>em</strong></li>
                        <li>Forte <strong>em</strong></li>
                        <li>Hábil <strong>em</strong></li>
                        <li>Interessado <strong>em</strong></li>
                        <li>Lento <strong>em</strong></li>
                        <li>Perito <strong>em</strong></li>
                        <li>Pronto <strong>em</strong></li>
                        <li>Rico <strong>em</strong></li>
                        <li>Sábio <strong>em</strong></li>
                        <li>Versado <strong>em</strong></li>
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Exemplos de Uso</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Sou <strong>grato a</strong> você pela ajuda.</p>
                    <p className="example-text">✓ Ele é <strong>capaz de</strong> qualquer coisa.</p>
                    <p className="example-text">✓ Estou <strong>satisfeito com</strong> o resultado.</p>
                    <p className="example-text">✓ Ela é <strong>perita em</strong> matemática.</p>
                    <p className="example-text">✓ Estamos <strong>aptos para</strong> o desafio.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="principais" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">list</span>
              Verbos Principais
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Verbos mais cobrados em provas:</p>
              <ul className="summary-list">
                <li><strong>Assistir:</strong> A (ver) / -- (ajudar)</li>
                <li><strong>Aspirar:</strong> A (desejar) / -- (cheirar)</li>
                <li><strong>Visar:</strong> A (objetivar) / -- (mirar)</li>
                <li><strong>Obedecer/Desobedecer:</strong> A (sempre)</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('principais')}
            >
              <span className="material-icons">
                {expandedSections.principais ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.principais ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.principais && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">ASSISTIR</h4>
                  <p><strong>Assistir A</strong> (ver, presenciar) - VTI</p>
                  <div className="example-box">
                    <p className="example-text">✓ Assisti <strong>ao</strong> filme ontem.</p>
                    <p className="example-text">✓ Assistimos <strong>à</strong> peça de teatro.</p>
                    <p className="example-text">✗ Assisti <strong>o</strong> jogo. (popular, mas incorreto formalmente)</p>
                  </div>
                  <p><strong>Assistir</strong> (ajudar, prestar assistência) - VTD ou VTI</p>
                  <div className="example-box">
                    <p className="example-text">✓ O médico assistiu <strong>o</strong> paciente. (sem preposição)</p>
                    <p className="example-text">✓ O médico assistiu <strong>ao</strong> paciente. (com preposição)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">ASPIRAR</h4>
                  <p><strong>Aspirar A</strong> (desejar, pretender) - VTI</p>
                  <div className="example-box">
                    <p className="example-text">✓ Aspiro <strong>a</strong> uma vida melhor.</p>
                    <p className="example-text">✓ Ele aspira <strong>ao</strong> cargo de diretor.</p>
                    <p className="example-text">✗ Aspiro <strong>o</strong> cargo. (ERRADO)</p>
                  </div>
                  <p><strong>Aspirar</strong> (inalar, respirar) - VTD</p>
                  <div className="example-box">
                    <p className="example-text">✓ Aspirei <strong>o</strong> ar puro da montanha. (sem preposição)</p>
                    <p className="example-text">✓ Aspirou <strong>o</strong> perfume das flores.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">VISAR</h4>
                  <p><strong>Visar A</strong> (ter como objetivo) - VTI</p>
                  <div className="example-box">
                    <p className="example-text">✓ O projeto visa <strong>ao</strong> bem comum.</p>
                    <p className="example-text">✓ Visamos <strong>à</strong> melhoria da educação.</p>
                  </div>
                  <p><strong>Visar</strong> (mirar, apontar / dar visto) - VTD</p>
                  <div className="example-box">
                    <p className="example-text">✓ O atirador visou <strong>o</strong> alvo.</p>
                    <p className="example-text">✓ O gerente visou <strong>o</strong> documento.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">OBEDECER / DESOBEDECER</h4>
                  <p>Sempre VTI (exigem A):</p>
                  <div className="example-box">
                    <p className="example-text">✓ Obedeço <strong>às</strong> leis.</p>
                    <p className="example-text">✓ Ele desobedeceu <strong>ao</strong> pai.</p>
                    <p className="example-text">✗ Obedeço <strong>as</strong> leis. (ERRADO)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">PREFERIR</h4>
                  <p><strong>Preferir A</strong> (nunca "do que"):</p>
                  <div className="example-box">
                    <p className="example-text">✓ Prefiro café <strong>a</strong> chá.</p>
                    <p className="example-text">✓ Prefiro estudar <strong>a</strong> trabalhar.</p>
                    <p className="example-text">✗ Prefiro café <strong>do que</strong> chá. (ERRADO)</p>
                    <p className="example-text">✗ Prefiro <strong>mais</strong> café. (ERRADO - redundância)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">IMPLICAR</h4>
                  <p><strong>Implicar</strong> (acarretar) - VTD</p>
                  <div className="example-box">
                    <p className="example-text">✓ Essa decisão implica <strong>consequências</strong> graves.</p>
                    <p className="example-text">✗ Implica <strong>em</strong> consequências. (ERRADO)</p>
                  </div>
                  <p><strong>Implicar COM</strong> (antipatizar):</p>
                  <div className="example-box">
                    <p className="example-text">✓ Ele implica <strong>com</strong> tudo.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={700}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">PAGAR / PERDOAR</h4>
                  <p>VTD com coisa, VTI com pessoa:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Paguei <strong>a conta</strong>. (VTD - coisa)</p>
                    <p className="example-text">✓ Paguei <strong>ao garçom</strong>. (VTI - pessoa)</p>
                    <p className="example-text">✓ Paguei <strong>a conta</strong> <strong>ao garçom</strong>. (VTDI - coisa + pessoa)</p>
                    <p className="example-text">✓ Perdoei <strong>o erro</strong>. (VTD - coisa)</p>
                    <p className="example-text">✓ Perdoei <strong>ao amigo</strong>. (VTI - pessoa)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={800}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">QUERER</h4>
                  <p><strong>Querer</strong> (desejar) - VTD</p>
                  <div className="example-box">
                    <p className="example-text">✓ Quero <strong>um presente</strong>.</p>
                  </div>
                  <p><strong>Querer A</strong> (estimar, gostar) - VTI</p>
                  <div className="example-box">
                    <p className="example-text">✓ Quero <strong>aos</strong> meus amigos. (estimo)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="mudanca" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">swap_horiz</span>
              Mudança de Sentido
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Alguns verbos mudam de sentido conforme a regência:</p>
              <ul className="summary-list">
                <li><strong>Assistir:</strong> A (ver) / -- (ajudar)</li>
                <li><strong>Aspirar:</strong> A (desejar) / -- (cheirar)</li>
                <li><strong>Visar:</strong> A (objetivar) / -- (mirar/vistar)</li>
                <li><strong>Proceder:</strong> A (realizar) / DE (originar-se) / -- (ter fundamento)</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('mudanca')}
            >
              <span className="material-icons">
                {expandedSections.mudanca ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.mudanca ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.mudanca && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">PROCEDER</h4>
                  <div className="comparison-box">
                    <div className="comparison-item">
                      <h5>Proceder A (realizar)</h5>
                      <p className="example-text">✓ Vamos proceder <strong>à</strong> votação.</p>
                    </div>
                    <div className="comparison-item">
                      <h5>Proceder DE (originar-se)</h5>
                      <p className="example-text">✓ Ele procede <strong>de</strong> família humilde.</p>
                    </div>
                    <div className="comparison-item">
                      <h5>Proceder (ter fundamento)</h5>
                      <p className="example-text">✓ Seu argumento não procede.</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">AGRADAR</h4>
                  <div className="comparison-box">
                    <div className="comparison-item">
                      <h5>Agradar A (satisfazer)</h5>
                      <p className="example-text">✓ O filme agradou <strong>ao</strong> público.</p>
                    </div>
                    <div className="comparison-item">
                      <h5>Agradar (acariciar)</h5>
                      <p className="example-text">✓ Ela agradou <strong>o</strong> cachorro.</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">CUSTAR</h4>
                  <div className="comparison-box">
                    <div className="comparison-item">
                      <h5>Custar (ter preço)</h5>
                      <p className="example-text">✓ O livro custou <strong>cinquenta reais</strong>.</p>
                    </div>
                    <div className="comparison-item">
                      <h5>Custar A (ser difícil)</h5>
                      <p className="example-text">✓ Custou-me <strong>a</strong> entender.</p>
                      <p className="example-text">✗ Eu custei <strong>a</strong> entender. (ERRADO)</p>
                      <p><small>Sujeito deve ser a coisa difícil, não a pessoa</small></p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">LEMBRAR / ESQUECER</h4>
                  <p><strong>Sem pronome:</strong> VTD (sem preposição)</p>
                  <div className="example-box">
                    <p className="example-text">✓ Lembrei <strong>o</strong> compromisso.</p>
                    <p className="example-text">✓ Esqueci <strong>o</strong> nome dele.</p>
                  </div>
                  <p><strong>Com pronome (SE):</strong> VTI (com preposição DE)</p>
                  <div className="example-box">
                    <p className="example-text">✓ Lembrei-me <strong>do</strong> compromisso.</p>
                    <p className="example-text">✓ Esqueci-me <strong>do</strong> nome dele.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default PortugueseRegencia;

