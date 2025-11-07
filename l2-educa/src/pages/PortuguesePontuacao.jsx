import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import { useProgress } from '../utils/progressTracker';
import './PortugueseInterpretacao.css';

const PortuguesePontuacao = () => {
  const { markVisited, markCompleted, isCompleted } = useProgress('portuguese', 'pontuacao');
  
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'virgula', title: 'Vírgula', icon: 'more_horiz' },
    { id: 'ponto', title: 'Pontos', icon: 'circle' },
    { id: 'outros', title: 'Outros Sinais', icon: 'text_format' },
    { id: 'impacto', title: 'Impacto no Sentido', icon: 'psychology' },
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
        topicTitle="Pontuação"
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
        <span className="breadcrumb-current">Pontuação</span>
      </div>

      <div className="topic-hero">
        <ScrollReveal>
          <div className="topic-badge">
            <span className="material-icons">edit</span>
            PONTUAÇÃO
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="topic-title">
            <span className="gradient-text">Pontuação</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="topic-subtitle">
            Aprenda o uso correto dos sinais de pontuação e como eles modificam o sentido do texto
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
                A pontuação é fundamental para a clareza e compreensão do texto. Os sinais de pontuação 
                marcam pausas, entonações e organizam as ideias, tornando a comunicação escrita mais eficiente. 
                O uso incorreto pode alterar completamente o sentido de uma frase.
              </p>
              <div className="example-box">
                <p className="example-label">Exemplo do impacto da pontuação:</p>
                <p className="example-text">"Não, espere!" (ordem para esperar)</p>
                <p className="example-text">"Não espere!" (ordem para não esperar)</p>
              </div>
            </GlassCard>
          </ScrollReveal>
        </section>

        <section id="virgula" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">more_horiz</span>
              Vírgula
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>A vírgula marca pequenas pausas e separa elementos da oração:</p>
              <ul className="summary-list">
                <li><strong>Use:</strong> para separar termos de mesma função, isolar aposto, vocativo, expressões explicativas</li>
                <li><strong>NÃO use:</strong> entre sujeito e verbo, entre verbo e complemento</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('virgula')}
            >
              <span className="material-icons">
                {expandedSections.virgula ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.virgula ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.virgula && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">USOS OBRIGATÓRIOS</h4>
                  
                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>1. Separar elementos de mesma função</h5>
                  <div className="example-box">
                    <p className="example-text">✓ Comprei maçãs, bananas, laranjas e uvas.</p>
                    <p className="example-text">✓ O menino correu, pulou, brincou e descansou.</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>2. Isolar vocativo</h5>
                  <div className="example-box">
                    <p className="example-text">✓ Maria, venha aqui.</p>
                    <p className="example-text">✓ Bom dia, senhores.</p>
                    <p className="example-text">✓ Você, sim, você mesmo!</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>3. Isolar aposto explicativo</h5>
                  <div className="example-box">
                    <p className="example-text">✓ São Paulo, a maior cidade do Brasil, é muito populosa.</p>
                    <p className="example-text">✓ Machado de Assis, grande escritor brasileiro, nasceu no Rio.</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>4. Isolar adjunto adverbial deslocado</h5>
                  <div className="example-box">
                    <p className="example-text">✓ Ontem, fui ao cinema.</p>
                    <p className="example-text">✓ Com muito esforço, consegui a aprovação.</p>
                    <p className="example-text">✓ Na sala, todos esperavam ansiosamente.</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>5. Separar orações coordenadas</h5>
                  <div className="example-box">
                    <p className="example-text">✓ Estudei muito, mas não passei.</p>
                    <p className="example-text">✓ Cheguei cedo, porém a porta estava fechada.</p>
                    <p className="example-text">✓ Terminei o trabalho, logo posso descansar.</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>6. Isolar expressões explicativas</h5>
                  <div className="example-box">
                    <p className="example-text">✓ Ele não virá, ou seja, desistiu.</p>
                    <p className="example-text">✓ O resultado, isto é, a nota final, sai amanhã.</p>
                    <p className="example-text">✓ Todos, inclusive eu, concordaram.</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>7. Indicar elipse (omissão de termo)</h5>
                  <div className="example-box">
                    <p className="example-text">✓ Alguns estudam; outros, trabalham. (vírgula substitui "estudam")</p>
                    <p className="example-text">✓ Ela gosta de café; eu, de chá.</p>
                  </div>

                  <h5 style={{color: '#06b6d4', marginTop: '1rem', marginBottom: '0.5rem'}}>8. Separar orações adjetivas explicativas</h5>
                  <div className="example-box">
                    <p className="example-text">✓ O homem, que é mortal, deve viver bem. (explicativa)</p>
                    <p className="example-text">✗ O homem que chegou é meu pai. (restritiva - sem vírgula)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">USOS PROIBIDOS</h4>
                  
                  <h5 style={{color: '#ef4444', marginTop: '1rem', marginBottom: '0.5rem'}}>1. Entre sujeito e verbo</h5>
                  <div className="example-box">
                    <p className="wrong-example">✗ Os alunos da turma, estudaram muito.</p>
                    <p className="example-text">✓ Os alunos da turma estudaram muito.</p>
                  </div>

                  <h5 style={{color: '#ef4444', marginTop: '1rem', marginBottom: '0.5rem'}}>2. Entre verbo e complemento</h5>
                  <div className="example-box">
                    <p className="wrong-example">✗ Comprei, um livro novo.</p>
                    <p className="example-text">✓ Comprei um livro novo.</p>
                  </div>

                  <h5 style={{color: '#ef4444', marginTop: '1rem', marginBottom: '0.5rem'}}>3. Entre nome e complemento nominal</h5>
                  <div className="example-box">
                    <p className="wrong-example">✗ Tenho necessidade, de estudar.</p>
                    <p className="example-text">✓ Tenho necessidade de estudar.</p>
                  </div>

                  <h5 style={{color: '#ef4444', marginTop: '1rem', marginBottom: '0.5rem'}}>4. Entre nome e adjunto adnominal</h5>
                  <div className="example-box">
                    <p className="wrong-example">✗ O livro, de Pedro está aqui.</p>
                    <p className="example-text">✓ O livro de Pedro está aqui.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="ponto" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">circle</span>
              Pontos
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Diferentes tipos de pontos e suas funções:</p>
              <ul className="summary-list">
                <li><strong>Ponto final (.)</strong> - Encerra frases declarativas</li>
                <li><strong>Ponto e vírgula (;)</strong> - Pausa maior que vírgula, menor que ponto</li>
                <li><strong>Dois pontos (:)</strong> - Introduz enumeração, citação ou explicação</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('ponto')}
            >
              <span className="material-icons">
                {expandedSections.ponto ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.ponto ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.ponto && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Ponto Final (.)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Encerrar frases declarativas</li>
                    <li>Separar períodos</li>
                    <li>Indicar abreviações</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ O sol nasceu cedo hoje.</p>
                    <p className="example-text">✓ Gostaria de um café. Você também quer?</p>
                    <p className="example-text">✓ Dr. Silva chegou às 10h.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Ponto e Vírgula (;)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Separar orações coordenadas mais longas</li>
                    <li>Separar itens de enumeração complexa</li>
                    <li>Antes de conjunções adversativas em frases longas</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Alguns preferem trabalhar de manhã; outros, à noite.</p>
                    <p className="example-text">✓ Comprei: maçãs, que são doces; bananas, que são nutritivas; laranjas, que são cítricas.</p>
                    <p className="example-text">✓ Estudei muito para a prova; no entanto, não consegui a nota que esperava.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Dois Pontos (:)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Introduzir enumeração</li>
                    <li>Introduzir citação ou fala</li>
                    <li>Introduzir explicação ou esclarecimento</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Comprei três frutas: maçã, banana e laranja. (enumeração)</p>
                    <p className="example-text">✓ Ele disse: "Voltarei amanhã." (citação)</p>
                    <p className="example-text">✓ Tenho certeza de uma coisa: você vai passar. (explicação)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="outros" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">text_format</span>
              Outros Sinais de Pontuação
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Sinais especiais de pontuação:</p>
              <ul className="summary-list">
                <li><strong>Ponto de interrogação (?)</strong> - Perguntas</li>
                <li><strong>Ponto de exclamação (!)</strong> - Emoções, surpresa, ordem</li>
                <li><strong>Reticências (...)</strong> - Interrupção, dúvida, suspense</li>
                <li><strong>Travessão (—)</strong> - Diálogo, intercalação</li>
                <li><strong>Parênteses ()</strong> - Informações adicionais</li>
                <li><strong>Aspas ("")</strong> - Citações, ironia, estrangeirismos</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('outros')}
            >
              <span className="material-icons">
                {expandedSections.outros ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.outros ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.outros && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Ponto de Interrogação (?)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Encerrar perguntas diretas</li>
                    <li>Expressar dúvida (entre parênteses)</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Você vai à festa?</p>
                    <p className="example-text">✓ Como você se chama?</p>
                    <p className="example-text">✓ Ele teria 30 (?) anos.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Ponto de Exclamação (!)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Expressar emoções (surpresa, alegria, raiva)</li>
                    <li>Dar ênfase</li>
                    <li>Indicar ordem ou chamamento</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Que linda!</p>
                    <p className="example-text">✓ Socorro!</p>
                    <p className="example-text">✓ Cuidado!</p>
                    <p className="example-text">✓ Nossa, que surpresa!</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Reticências (...)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Indicar interrupção ou hesitação</li>
                    <li>Criar suspense</li>
                    <li>Sugerir continuação</li>
                    <li>Indicar supressão em citação</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Eu queria dizer que...</p>
                    <p className="example-text">✓ Ele abriu a porta e...</p>
                    <p className="example-text">✓ Comprei frutas, verduras, legumes...</p>
                    <p className="example-text">✓ "No meio do caminho [...] tinha uma pedra"</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Travessão (—)</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Indicar mudança de interlocutor em diálogos</li>
                    <li>Isolar expressões explicativas (substitui vírgulas ou parênteses)</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ — Você vai? — perguntou ela.</p>
                    <p className="example-text">✓ — Claro! — respondeu ele.</p>
                    <p className="example-text">✓ A moça — muito bonita, por sinal — entrou na sala.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Parênteses ( )</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Incluir informações complementares</li>
                    <li>Fazer observações</li>
                    <li>Indicar siglas ou traduções</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Machado de Assis (1839-1908) foi um grande escritor.</p>
                    <p className="example-text">✓ A USP (Universidade de São Paulo) é renomada.</p>
                    <p className="example-text">✓ Ele era muito "smart" (esperto).</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Aspas (" ")</h4>
                  <p><strong>Usos:</strong></p>
                  <ul>
                    <li>Indicar citações diretas</li>
                    <li>Destacar palavras estrangeiras, gírias ou neologismos</li>
                    <li>Indicar ironia</li>
                    <li>Títulos de obras</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ Ele disse: "Voltarei logo."</p>
                    <p className="example-text">✓ Vamos fazer um "brainstorm".</p>
                    <p className="example-text">✓ Que "gentileza" a sua! (ironia)</p>
                    <p className="example-text">✓ Li "Dom Casmurro" ontem.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="impacto" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">psychology</span>
              Impacto no Sentido
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>A pontuação pode mudar completamente o sentido da frase. Veja exemplos:</p>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('impacto')}
            >
              <span className="material-icons">
                {expandedSections.impacto ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.impacto ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.impacto && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Exemplos Clássicos</h4>
                  
                  <div className="comparison-box">
                    <div className="comparison-item">
                      <h5>Vírgula antes de "mas"</h5>
                      <p className="example-text">"Não queremos saber, mas vamos ouvir."</p>
                      <p><small>(não queremos, porém vamos)</small></p>
                    </div>
                    <div className="comparison-item">
                      <h5>Sem vírgula</h5>
                      <p className="example-text">"Não queremos saber mas vamos ouvir."</p>
                      <p><small>(confuso, pouco claro)</small></p>
                    </div>
                  </div>

                  <div className="comparison-box" style={{marginTop: '1rem'}}>
                    <div className="comparison-item correct">
                      <h5>"Vamos comer, crianças!"</h5>
                      <p><small>Chamado para as crianças comerem</small></p>
                    </div>
                    <div className="comparison-item wrong">
                      <h5>"Vamos comer crianças!"</h5>
                      <p><small>Sentido de canibalismo!</small></p>
                    </div>
                  </div>

                  <div className="comparison-box" style={{marginTop: '1rem'}}>
                    <div className="comparison-item">
                      <h5>"Não, espere!"</h5>
                      <p><small>Ordem para esperar</small></p>
                    </div>
                    <div className="comparison-item">
                      <h5>"Não espere!"</h5>
                      <p><small>Ordem para NÃO esperar</small></p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Testamento Famoso</h4>
                  <div className="example-box full-width">
                    <p className="example-label">Texto original (ambíguo):</p>
                    <p className="example-text">
                      "Deixo meus bens a minha irmã não a meu sobrinho jamais será paga a conta do padeiro nada dou aos pobres."
                    </p>
                  </div>

                  <div className="comparison-box" style={{marginTop: '1rem'}}>
                    <div className="comparison-item">
                      <h5>Versão 1 (sobrinho herda)</h5>
                      <p className="example-text">
                        "Deixo meus bens a minha irmã? Não! A meu sobrinho. Jamais será paga a conta do padeiro. Nada dou aos pobres."
                      </p>
                    </div>
                    <div className="comparison-item">
                      <h5>Versão 2 (irmã herda)</h5>
                      <p className="example-text">
                        "Deixo meus bens a minha irmã. Não a meu sobrinho. Jamais será paga a conta do padeiro. Nada dou aos pobres."
                      </p>
                    </div>
                  </div>

                  <div className="comparison-box" style={{marginTop: '1rem'}}>
                    <div className="comparison-item">
                      <h5>Versão 3 (padeiro herda)</h5>
                      <p className="example-text">
                        "Deixo meus bens a minha irmã? Não! A meu sobrinho? Jamais! Será paga a conta do padeiro. Nada dou aos pobres."
                      </p>
                    </div>
                    <div className="comparison-item">
                      <h5>Versão 4 (pobres herdam)</h5>
                      <p className="example-text">
                        "Deixo meus bens a minha irmã? Não! A meu sobrinho? Jamais! Será paga a conta do padeiro? Nada! Dou aos pobres."
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Orações Restritivas vs. Explicativas</h4>
                  
                  <div className="comparison-box">
                    <div className="comparison-item">
                      <h5>Restritiva (sem vírgula)</h5>
                      <p className="example-text">"Os alunos que estudaram passaram."</p>
                      <p><small>Só os que estudaram passaram (nem todos)</small></p>
                    </div>
                    <div className="comparison-item">
                      <h5>Explicativa (com vírgula)</h5>
                      <p className="example-text">"Os alunos, que estudaram, passaram."</p>
                      <p><small>Todos os alunos estudaram e passaram</small></p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Dicas para Provas</h4>
                  <div className="tips-list">
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Leia em voz alta mentalmente para perceber pausas naturais</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Identifique a função de cada termo antes de pontuar</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Nunca separe sujeito de verbo ou verbo de complemento</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Use vírgula antes de "mas", "porém", "contudo", "todavia"</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Vírgula é opcional antes de "e" quando muda o sujeito</p>
                    </div>
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

export default PortuguesePontuacao;

