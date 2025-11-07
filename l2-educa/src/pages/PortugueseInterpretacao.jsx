import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import { useProgress } from '../utils/progressTracker';
import './PortugueseInterpretacao.css';

const PortugueseInterpretacao = () => {
  const { markVisited, markCompleted, isCompleted } = useProgress('portuguese', 'interpretacao');
  
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'tipos', title: 'Tipos de Textos', icon: 'article' },
    { id: 'estrategias', title: 'Estratégias de Leitura', icon: 'psychology' },
    { id: 'ideias', title: 'Ideias Principais', icon: 'lightbulb' },
    { id: 'argumentacao', title: 'Argumentação', icon: 'forum' },
    { id: 'inferencia', title: 'Inferência', icon: 'search' },
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
        topicTitle="Interpretação de Textos"
      />

      {/* Breadcrumb */}
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
        <span className="breadcrumb-current">Interpretação</span>
      </div>

      {/* Hero */}
      <div className="topic-hero">
        <ScrollReveal>
          <div className="topic-badge">
            <span className="material-icons">book</span>
            INTERPRETAÇÃO DE TEXTOS
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="topic-title">
            <span className="gradient-text">Interpretação de Textos</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="topic-subtitle">
            Desenvolva habilidades essenciais para compreender, analisar e interpretar diferentes tipos de textos
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

      {/* Content */}
      <div className="content-container">
        
        {/* Introdução */}
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
                A interpretação de textos é uma das habilidades mais importantes avaliadas em vestibulares e no ENEM. 
                Vai além da simples leitura, exigindo compreensão profunda, análise crítica e capacidade de fazer 
                inferências baseadas no conteúdo apresentado.
              </p>
              <p className="intro-text">
                Neste módulo, você aprenderá técnicas e estratégias fundamentais para interpretar textos de forma 
                eficiente, identificar ideias principais, analisar argumentos e compreender as intenções do autor.
              </p>
            </GlassCard>
          </ScrollReveal>
        </section>

        {/* Tipos de Textos */}
        <section id="tipos" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">article</span>
              Tipos de Textos
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Existem diferentes tipos textuais, cada um com características e objetivos específicos:</p>
              <ul className="summary-list">
                <li><strong>Narrativo:</strong> Conta uma história com personagens, tempo e espaço</li>
                <li><strong>Descritivo:</strong> Descreve características de pessoas, lugares ou objetos</li>
                <li><strong>Dissertativo:</strong> Defende uma tese com argumentos (argumentativo ou expositivo)</li>
                <li><strong>Injuntivo:</strong> Dá instruções, ordens ou conselhos</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('tipos')}
            >
              <span className="material-icons">
                {expandedSections.tipos ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.tipos ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.tipos && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">auto_stories</span>
                    Texto Narrativo
                  </h4>
                  <p><strong>Características:</strong></p>
                  <ul>
                    <li>Presença de narrador (1ª ou 3ª pessoa)</li>
                    <li>Enredo com começo, meio e fim</li>
                    <li>Personagens que vivenciam acontecimentos</li>
                    <li>Marcação temporal e espacial</li>
                    <li>Uso frequente de verbos no pretérito</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-label">Exemplo:</p>
                    <p className="example-text">
                      "João acordou cedo naquela manhã de domingo. O sol ainda não havia nascido completamente, 
                      mas ele sabia que precisava partir antes que alguém percebesse sua ausência. Pegou a mochila 
                      que havia preparado na noite anterior e saiu pela porta dos fundos..."
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">image</span>
                    Texto Descritivo
                  </h4>
                  <p><strong>Características:</strong></p>
                  <ul>
                    <li>Retrata características físicas e psicológicas</li>
                    <li>Uso abundante de adjetivos</li>
                    <li>Emprego de verbos de ligação e no presente</li>
                    <li>Comparações e metáforas</li>
                    <li>Apelo aos cinco sentidos</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-label">Exemplo:</p>
                    <p className="example-text">
                      "A casa era antiga, com paredes de pedra cobertas por hera verde-escura. As janelas grandes, 
                      com molduras de madeira descascada, permitiam a entrada de uma luz suave. O jardim à frente 
                      estava cheio de flores silvestres de cores vibrantes, e o ar tinha cheiro de jasmim."
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">forum</span>
                    Texto Dissertativo
                  </h4>
                  <p><strong>Características:</strong></p>
                  <ul>
                    <li>Apresenta e defende um ponto de vista</li>
                    <li>Estrutura: introdução, desenvolvimento e conclusão</li>
                    <li>Uso de argumentos lógicos e exemplos</li>
                    <li>Linguagem objetiva e formal</li>
                    <li>Conectivos para articular ideias</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-label">Exemplo:</p>
                    <p className="example-text">
                      "A educação é fundamental para o desenvolvimento de uma nação. Em primeiro lugar, países com 
                      maior investimento em educação apresentam melhores índices de desenvolvimento humano. Além disso, 
                      a educação de qualidade reduz desigualdades sociais e promove a mobilidade social. Portanto, 
                      investir em educação deve ser prioridade de qualquer governo comprometido com o futuro."
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">touch_app</span>
                    Texto Injuntivo (Instrucional)
                  </h4>
                  <p><strong>Características:</strong></p>
                  <ul>
                    <li>Dá instruções, ordens ou conselhos</li>
                    <li>Uso de verbos no imperativo ou infinitivo</li>
                    <li>Linguagem clara e direta</li>
                    <li>Sequência lógica de passos</li>
                    <li>Comum em receitas, manuais e bulas</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-label">Exemplo:</p>
                    <p className="example-text">
                      "Para preparar o bolo: 1) Pré-aqueça o forno a 180°C. 2) Misture os ingredientes secos em uma 
                      tigela. 3) Em outra tigela, bata os ovos com o açúcar. 4) Adicione os ingredientes secos aos 
                      poucos. 5) Despeje a massa em forma untada. 6) Asse por 40 minutos."
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        {/* Estratégias de Leitura */}
        <section id="estrategias" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">psychology</span>
              Estratégias de Leitura
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Técnicas essenciais para leitura eficiente:</p>
              <ul className="summary-list">
                <li><strong>Skimming:</strong> Leitura rápida para captar ideia geral</li>
                <li><strong>Scanning:</strong> Busca de informação específica</li>
                <li><strong>Leitura Crítica:</strong> Análise profunda com questionamento</li>
                <li><strong>Contextualização:</strong> Relacionar texto com conhecimento prévio</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('estrategias')}
            >
              <span className="material-icons">
                {expandedSections.estrategias ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.estrategias ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.estrategias && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">speed</span>
                    Skimming (Leitura Dinâmica)
                  </h4>
                  <p><strong>Quando usar:</strong> Para ter uma visão geral do texto antes de ler detalhadamente</p>
                  <p><strong>Como fazer:</strong></p>
                  <ul>
                    <li>Leia o título e subtítulos</li>
                    <li>Observe imagens, gráficos e legendas</li>
                    <li>Leia o primeiro e último parágrafo</li>
                    <li>Passe os olhos pelas primeiras frases de cada parágrafo</li>
                    <li>Identifique palavras-chave em destaque</li>
                  </ul>
                  <div className="tip-box">
                    <span className="material-icons">tips_and_updates</span>
                    <p><strong>Dica:</strong> Use o skimming em questões de múltipla escolha para decidir rapidamente 
                    se o texto trata do assunto perguntado.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">pageview</span>
                    Scanning (Leitura Seletiva)
                  </h4>
                  <p><strong>Quando usar:</strong> Para encontrar uma informação específica rapidamente</p>
                  <p><strong>Como fazer:</strong></p>
                  <ul>
                    <li>Tenha em mente exatamente o que procura</li>
                    <li>Ignore informações irrelevantes</li>
                    <li>Procure por datas, nomes, números ou palavras-chave</li>
                    <li>Use marcações visuais como negrito ou itálico</li>
                    <li>Pare quando encontrar a informação desejada</li>
                  </ul>
                  <div className="tip-box">
                    <span className="material-icons">tips_and_updates</span>
                    <p><strong>Dica:</strong> Útil em questões que pedem dados específicos como "Em que ano...", 
                    "Segundo o texto, quem..."</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">
                    <span className="material-icons">quiz</span>
                    Leitura Crítica
                  </h4>
                  <p><strong>Quando usar:</strong> Para análise profunda e interpretação de textos argumentativos</p>
                  <p><strong>Como fazer:</strong></p>
                  <ul>
                    <li>Questione as afirmações do autor</li>
                    <li>Identifique pressupostos e valores implícitos</li>
                    <li>Avalie a qualidade dos argumentos</li>
                    <li>Compare com outros pontos de vista</li>
                    <li>Detecte possíveis vieses ou manipulações</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-label">Perguntas para fazer:</p>
                    <ul>
                      <li>Qual é o objetivo do autor?</li>
                      <li>Os argumentos são convincentes?</li>
                      <li>Há evidências suficientes?</li>
                      <li>Existem contradições?</li>
                      <li>O que não foi dito?</li>
                    </ul>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        {/* Identificação de Ideias Principais */}
        <section id="ideias" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">lightbulb</span>
              Identificação de Ideias Principais
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>A ideia principal é o ponto central que o autor quer comunicar. Para identificá-la:</p>
              <ul className="summary-list">
                <li>Pergunte: "Do que o texto trata?"</li>
                <li>Identifique o tema e a tese</li>
                <li>Diferencie ideias principais de secundárias</li>
                <li>Procure por palavras-chave repetidas</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('ideias')}
            >
              <span className="material-icons">
                {expandedSections.ideias ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.ideias ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.ideias && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Tema vs. Ideia Principal</h4>
                  <div className="comparison-box">
                    <div className="comparison-item">
                      <h5>Tema</h5>
                      <p>O assunto geral do texto em poucas palavras</p>
                      <p className="example-text">Exemplo: "Meio ambiente"</p>
                    </div>
                    <div className="comparison-item">
                      <h5>Ideia Principal</h5>
                      <p>O que o autor diz especificamente sobre o tema</p>
                      <p className="example-text">Exemplo: "A preservação do meio ambiente é responsabilidade de todos"</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Técnicas para Identificar</h4>
                  <ol className="technique-list">
                    <li>
                      <strong>Leia o primeiro e último parágrafo</strong>
                      <p>Geralmente contêm a ideia central do texto</p>
                    </li>
                    <li>
                      <strong>Procure por tópicos frasais</strong>
                      <p>Primeira frase de cada parágrafo muitas vezes resume seu conteúdo</p>
                    </li>
                    <li>
                      <strong>Identifique palavras repetidas</strong>
                      <p>Termos que aparecem frequentemente indicam o foco do texto</p>
                    </li>
                    <li>
                      <strong>Elimine detalhes secundários</strong>
                      <p>Exemplos, dados e descrições apoiam mas não são a ideia principal</p>
                    </li>
                    <li>
                      <strong>Faça a pergunta-chave</strong>
                      <p>"Qual é o ponto mais importante que o autor quer transmitir?"</p>
                    </li>
                  </ol>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Exemplo Prático</h4>
                  <div className="example-box full-width">
                    <p className="example-label">Texto:</p>
                    <p className="example-text">
                      "O Brasil possui uma das maiores biodiversidades do planeta, com milhões de espécies animais 
                      e vegetais. A Floresta Amazônica, por exemplo, abriga cerca de 10% de todas as espécies 
                      conhecidas. O Pantanal é considerado uma das maiores planícies alagadas do mundo. No entanto, 
                      o desmatamento e a poluição têm ameaçado seriamente esses ecossistemas. Dados recentes mostram 
                      que o desmatamento na Amazônia aumentou 30% nos últimos anos. Sem ações efetivas de preservação, 
                      corremos o risco de perder esse patrimônio natural de valor inestimável."
                    </p>
                    <p className="example-label">Análise:</p>
                    <ul>
                      <li><strong>Tema:</strong> Biodiversidade brasileira</li>
                      <li><strong>Informações secundárias:</strong> Exemplos da Amazônia e Pantanal, dados de desmatamento</li>
                      <li><strong>Ideia Principal:</strong> A biodiversidade brasileira está ameaçada e precisa de ações de preservação</li>
                    </ul>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        {/* Análise de Argumentação */}
        <section id="argumentacao" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">forum</span>
              Análise de Argumentação
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Analisar argumentos significa avaliar como o autor defende sua tese:</p>
              <ul className="summary-list">
                <li>Identificar a tese (posicionamento do autor)</li>
                <li>Reconhecer os argumentos utilizados</li>
                <li>Avaliar a consistência e relevância dos argumentos</li>
                <li>Detectar falácias e manipulações</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('argumentacao')}
            >
              <span className="material-icons">
                {expandedSections.argumentacao ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.argumentacao ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.argumentacao && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Tipos de Argumentos</h4>
                  <div className="argument-types">
                    <div className="argument-type">
                      <h5><span className="material-icons">fact_check</span> Argumento de Autoridade</h5>
                      <p>Baseia-se na opinião de especialistas ou fontes confiáveis</p>
                      <p className="example-text">"Segundo a OMS, a vacinação é a forma mais eficaz..."</p>
                    </div>
                    <div className="argument-type">
                      <h5><span className="material-icons">bar_chart</span> Argumento por Dados</h5>
                      <p>Utiliza estatísticas, pesquisas e números</p>
                      <p className="example-text">"Pesquisas mostram que 85% dos brasileiros..."</p>
                    </div>
                    <div className="argument-type">
                      <h5><span className="material-icons">history_edu</span> Argumento Histórico</h5>
                      <p>Usa exemplos e fatos históricos</p>
                      <p className="example-text">"Ao longo da história, sociedades que investiram em educação..."</p>
                    </div>
                    <div className="argument-type">
                      <h5><span className="material-icons">compare</span> Argumento por Comparação</h5>
                      <p>Estabelece analogias e comparações</p>
                      <p className="example-text">"Assim como países desenvolvidos fizeram, o Brasil deve..."</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Falácias Comuns</h4>
                  <p>Erros de raciocínio que podem invalidar um argumento:</p>
                  <div className="fallacy-list">
                    <div className="fallacy-item">
                      <h5>Generalização Apressada</h5>
                      <p>Conclusão baseada em amostra insuficiente</p>
                      <p className="wrong-example">❌ "Meu primo fumou a vida toda e viveu até os 90. Logo, fumar não faz mal."</p>
                    </div>
                    <div className="fallacy-item">
                      <h5>Apelo à Emoção</h5>
                      <p>Manipula emoções em vez de usar lógica</p>
                      <p className="wrong-example">❌ "Pense nas crianças pobres! Vote nesta lei!"</p>
                    </div>
                    <div className="fallacy-item">
                      <h5>Falso Dilema</h5>
                      <p>Apresenta apenas duas opções quando há mais</p>
                      <p className="wrong-example">❌ "Ou você apoia esta medida ou é contra o progresso."</p>
                    </div>
                    <div className="fallacy-item">
                      <h5>Ad Hominem</h5>
                      <p>Ataca a pessoa em vez do argumento</p>
                      <p className="wrong-example">❌ "Você não pode falar de economia, nunca foi rico."</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        {/* Inferência e Conclusões */}
        <section id="inferencia" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">search</span>
              Inferência e Conclusões
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Inferir é "ler nas entrelinhas", chegando a conclusões não explícitas:</p>
              <ul className="summary-list">
                <li>Baseie-se em pistas do texto, não em achismos</li>
                <li>Combine informações explícitas com conhecimento prévio</li>
                <li>Cuidado com inferências muito distantes do texto</li>
                <li>Sempre encontre apoio textual para suas conclusões</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('inferencia')}
            >
              <span className="material-icons">
                {expandedSections.inferencia ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.inferencia ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.inferencia && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">O que é Inferência?</h4>
                  <p>
                    Inferência é a habilidade de chegar a conclusões lógicas a partir de informações não declaradas 
                    explicitamente no texto, mas sugeridas por ele. É diferente de "chutar" ou inventar informações.
                  </p>
                  <div className="comparison-box">
                    <div className="comparison-item correct">
                      <h5>✓ Inferência Válida</h5>
                      <p>Baseada em pistas textuais</p>
                      <p className="example-text">
                        Texto: "Maria chegou em casa com os cabelos molhados e uma toalha na mão."<br/>
                        Inferência: Maria provavelmente tomou banho ou estava na chuva.
                      </p>
                    </div>
                    <div className="comparison-item wrong">
                      <h5>✗ Inferência Inválida</h5>
                      <p>Sem suporte no texto</p>
                      <p className="example-text">
                        Texto: "Maria chegou em casa com os cabelos molhados."<br/>
                        Inferência errada: Maria estava nadando na piscina.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Técnicas de Inferência</h4>
                  <ol className="technique-list">
                    <li>
                      <strong>Análise de Contexto</strong>
                      <p>Use o contexto para deduzir significados de palavras desconhecidas</p>
                    </li>
                    <li>
                      <strong>Causa e Efeito</strong>
                      <p>Identifique relações de causalidade implícitas</p>
                    </li>
                    <li>
                      <strong>Tom e Intenção</strong>
                      <p>Perceba a atitude do autor (ironia, crítica, defesa)</p>
                    </li>
                    <li>
                      <strong>Pressupostos</strong>
                      <p>Identifique o que o autor assume que o leitor já sabe</p>
                    </li>
                  </ol>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Exemplo Prático</h4>
                  <div className="example-box full-width">
                    <p className="example-label">Texto:</p>
                    <p className="example-text">
                      "Pedro olhou para o relógio pela quinta vez em dez minutos. Seus dedos tamborilavam 
                      nervosamente na mesa. A porta permanecia fechada, e o corredor, silencioso. 
                      Ele ajeitou a gravata mais uma vez e respirou fundo."
                    </p>
                    <p className="example-label">Inferências Possíveis:</p>
                    <ul>
                      <li>✓ Pedro está esperando alguém ou algo importante</li>
                      <li>✓ Pedro está ansioso ou nervoso</li>
                      <li>✓ Trata-se de uma situação formal (usa gravata)</li>
                      <li>✓ Pedro está impaciente (olha o relógio repetidamente)</li>
                      <li>✗ Pedro vai ser demitido (não há suporte textual suficiente)</li>
                    </ul>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Dicas para Questões de Prova</h4>
                  <div className="tips-list">
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Procure sempre apoio explícito ou implícito no texto</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Desconfie de alternativas que introduzem informações totalmente novas</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>Alternativas com "sempre", "nunca", "todo" geralmente estão erradas</p>
                    </div>
                    <div className="tip-item">
                      <span className="material-icons">check_circle</span>
                      <p>A resposta correta geralmente parafraseia o texto</p>
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

export default PortugueseInterpretacao;

