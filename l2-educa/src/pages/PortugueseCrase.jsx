import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import { useProgress } from '../utils/progressTracker';
import './PortugueseInterpretacao.css';

const PortugueseCrase = () => {
  const { markVisited, markCompleted, isCompleted } = useProgress('portuguese', 'crase');
  
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'regra', title: 'Regra Geral', icon: 'rule' },
    { id: 'obrigatorio', title: 'Casos Obrigatórios', icon: 'check_circle' },
    { id: 'proibido', title: 'Casos Proibidos', icon: 'cancel' },
    { id: 'facultativo', title: 'Casos Facultativos', icon: 'help' },
    { id: 'pratica', title: 'Prática', icon: 'edit' },
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
        topicTitle="Crase"
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
        <span className="breadcrumb-current">Crase</span>
      </div>

      <div className="topic-hero">
        <ScrollReveal>
          <div className="topic-badge">
            <span className="material-icons">functions</span>
            CRASE
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="topic-title">
            <span className="gradient-text">Crase</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="topic-subtitle">
            Domine o uso do acento grave indicativo de crase com regras claras e exemplos práticos
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
                A crase é a fusão de duas vogais idênticas, representada pelo acento grave (`). Na prática, 
                indica a junção da preposição "a" com o artigo "a(s)" ou com o "a" inicial dos pronomes 
                demonstrativos "aquele(s)", "aquela(s)", "aquilo".
              </p>
              <p className="intro-text">
                <strong>Fórmula básica:</strong> preposição A + artigo A = À
              </p>
              <div className="example-box">
                <p className="example-text">Vou a + a escola = Vou <strong>à</strong> escola</p>
                <p className="example-text">Refiro-me a + a diretora = Refiro-me <strong>à</strong> diretora</p>
              </div>
            </GlassCard>
          </ScrollReveal>
        </section>

        <section id="regra" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">rule</span>
              Regra Geral
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Para haver crase, é necessário:</p>
              <ul className="summary-list">
                <li><strong>Termo regente</strong> que exija a preposição "A"</li>
                <li><strong>Termo regido</strong> que admita o artigo "A" ou "AS"</li>
                <li><strong>Fusão:</strong> a + a = à</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('regra')}
            >
              <span className="material-icons">
                {expandedSections.regra ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.regra ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.regra && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Como Verificar se Há Crase</h4>
                  <p><strong>Técnica 1: Substituição por "ao"</strong></p>
                  <p>Troque o termo feminino por um masculino. Se aparecer "ao", há crase:</p>
                  <div className="example-box">
                    <p className="example-text">Vou à escola → Vou <strong>ao</strong> colégio (✓ há crase)</p>
                    <p className="example-text">Estou a distância → Estou <strong>a</strong> distância (✗ não há crase)</p>
                    <p className="example-text">Refiro-me à diretora → Refiro-me <strong>ao</strong> diretor (✓ há crase)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Técnica 2: Voltar DE</h4>
                  <p>Se você volta "DA", vá "À". Se volta "DE", vá "A":</p>
                  <div className="example-box">
                    <p className="example-text">Vou à Bahia. (Volto <strong>da</strong> Bahia) ✓</p>
                    <p className="example-text">Vou a Roma. (Volto <strong>de</strong> Roma) ✓</p>
                    <p className="example-text">Cheguei à conclusão. (Vim <strong>da</strong> conclusão) ✓</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Técnica 3: Vir DE ou PARA</h4>
                  <p>Use locuções para identificar:</p>
                  <div className="example-box">
                    <p className="example-text">Vim <strong>da</strong> cidade → Vou <strong>à</strong> cidade ✓</p>
                    <p className="example-text">Vim <strong>de</strong> casa → Vou <strong>a</strong> casa ✗</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="obrigatorio" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">check_circle</span>
              Casos Obrigatórios
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Use crase obrigatoriamente:</p>
              <ul className="summary-list">
                <li>Antes de palavras femininas</li>
                <li>Em locuções femininas (à noite, à toa, à força)</li>
                <li>Com "aquele(s)", "aquela(s)", "aquilo"</li>
                <li>Em horas determinadas (às 10h)</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('obrigatorio')}
            >
              <span className="material-icons">
                {expandedSections.obrigatorio ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.obrigatorio ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.obrigatorio && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">1. Locuções Adverbiais Femininas</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ <strong>À</strong> noite, <strong>à</strong> tarde, <strong>à</strong> direita, <strong>à</strong> esquerda</p>
                    <p className="example-text">✓ <strong>Às</strong> vezes, <strong>às</strong> pressas, <strong>às</strong> escondidas</p>
                    <p className="example-text">✓ <strong>À</strong> toa, <strong>à</strong> vontade, <strong>à</strong> venda</p>
                    <p className="example-text">✓ <strong>À</strong> procura de, <strong>à</strong> espera de</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">2. Locuções Prepositivas</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ <strong>À</strong> frente de, <strong>à</strong> beira de</p>
                    <p className="example-text">✓ <strong>À</strong> procura de, <strong>à</strong> moda de</p>
                    <p className="example-text">✓ <strong>À</strong> custa de, <strong>à</strong> base de</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">3. Locuções Conjuntivas</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ <strong>À</strong> medida que, <strong>à</strong> proporção que</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">4. Horas Determinadas</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Cheguei <strong>às</strong> 10 horas.</p>
                    <p className="example-text">✓ A reunião começa <strong>à</strong> 1 hora.</p>
                    <p className="example-text">✓ Saímos <strong>às</strong> 15h30.</p>
                  </div>
                  <p><strong>Atenção:</strong> Sem hora determinada, não há crase:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Cheguei <strong>a</strong> tempo. (não há hora específica)</p>
                    <p className="example-text">✓ Das 8h <strong>às</strong> 12h. (intervalo)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">5. Pronomes Demonstrativos</h4>
                  <p>Com "aquele(s)", "aquela(s)", "aquilo":</p>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Refiro-me <strong>àquele</strong> caso. (a + aquele)</p>
                    <p className="example-text">✓ Dirigi-me <strong>àquela</strong> mulher.</p>
                    <p className="example-text">✓ Assisti <strong>àquilo</strong> tudo.</p>
                  </div>
                  <div className="tip-box">
                    <span className="material-icons">tips_and_updates</span>
                    <p><strong>Teste:</strong> Troque por "esse(a)". Se precisar "a esse", use crase em "àquele".</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">6. Antes de Nomes de Lugares</h4>
                  <p>Se o lugar admite artigo feminino:</p>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Vou <strong>à</strong> Bahia. (a + a Bahia)</p>
                    <p className="example-text">✓ Fui <strong>à</strong> Itália.</p>
                    <p className="example-text">✓ Cheguei <strong>à</strong> França.</p>
                    <p className="example-text">✗ Vou <strong>a</strong> Brasília. (não usa artigo)</p>
                    <p className="example-text">✗ Fui <strong>a</strong> Roma.</p>
                  </div>
                  <div className="tip-box">
                    <span className="material-icons">tips_and_updates</span>
                    <p><strong>Teste "da/de":</strong> Volto <strong>da</strong> Bahia → Vou <strong>à</strong> Bahia</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={700}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">7. À moda de (subentendido)</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Bife <strong>à</strong> milanesa. (à moda de Milão)</p>
                    <p className="example-text">✓ Gol <strong>à</strong> Pelé. (à moda de Pelé)</p>
                    <p className="example-text">✓ Cabelo <strong>à</strong> Neymar.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="proibido" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">cancel</span>
              Casos Proibidos
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>NÃO use crase:</p>
              <ul className="summary-list">
                <li>Antes de palavras masculinas</li>
                <li>Antes de verbos</li>
                <li>Em expressões com palavras repetidas</li>
                <li>Antes de pronomes (exceto possessivos femininos)</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('proibido')}
            >
              <span className="material-icons">
                {expandedSections.proibido ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.proibido ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.proibido && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">1. Antes de Palavras Masculinas</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Andar <strong>a</strong> cavalo.</p>
                    <p className="example-text">✓ Vendas <strong>a</strong> prazo.</p>
                    <p className="example-text">✓ Escrever <strong>a</strong> lápis.</p>
                    <p className="example-text">✗ Andar <strong>à</strong> cavalo. (ERRADO)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">2. Antes de Verbos</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Começou <strong>a</strong> chover.</p>
                    <p className="example-text">✓ Disposto <strong>a</strong> colaborar.</p>
                    <p className="example-text">✓ Voltei <strong>a</strong> estudar.</p>
                    <p className="example-text">✗ Começou <strong>à</strong> chover. (ERRADO)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">3. Expressões com Palavras Repetidas</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Cara <strong>a</strong> cara.</p>
                    <p className="example-text">✓ Gota <strong>a</strong> gota.</p>
                    <p className="example-text">✓ Frente <strong>a</strong> frente.</p>
                    <p className="example-text">✓ Dia <strong>a</strong> dia.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">4. Antes de Pronomes</h4>
                  <p><strong>Pessoais:</strong></p>
                  <div className="example-box">
                    <p className="example-text">✓ Dirigi-me <strong>a</strong> ela.</p>
                    <p className="example-text">✓ Refiro-me <strong>a</strong> você.</p>
                  </div>
                  <p><strong>Demonstrativos:</strong></p>
                  <div className="example-box">
                    <p className="example-text">✓ Assisti <strong>a</strong> essa peça. (não "àssa")</p>
                    <p className="example-text">✓ Refiro-me <strong>a</strong> esta questão.</p>
                  </div>
                  <p><strong>Indefinidos:</strong></p>
                  <div className="example-box">
                    <p className="example-text">✓ Não vou <strong>a</strong> qualquer festa.</p>
                    <p className="example-text">✓ Falei <strong>a</strong> todas.</p>
                  </div>
                  <p><strong>Relativos:</strong></p>
                  <div className="example-box">
                    <p className="example-text">✓ A mulher <strong>a</strong> que me refiro.</p>
                    <p className="example-text">✓ A cidade <strong>a</strong> cuja história estudamos.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">5. Antes de Artigo Indefinido</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Refiro-me <strong>a</strong> uma aluna.</p>
                    <p className="example-text">✓ Vou <strong>a</strong> uma festa.</p>
                    <p className="example-text">✗ Vou <strong>à</strong> uma festa. (ERRADO)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">6. Antes de Nome de Mulher Famosa</h4>
                  <p>Sem artigo, não há crase:</p>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Refiro-me <strong>a</strong> Madonna.</p>
                    <p className="example-text">✓ Falei <strong>a</strong> Maria (desconhecida).</p>
                  </div>
                  <p>Com artigo (pessoa conhecida), há crase:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Refiro-me <strong>à</strong> Madonna (a cantora famosa).</p>
                    <p className="example-text">✓ Falei <strong>à</strong> Maria (minha colega conhecida).</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={700}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">7. Distância Não Determinada</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Observei o navio <strong>a</strong> distância.</p>
                    <p className="example-text">✓ Fiquei <strong>a</strong> distância de 10 metros. (determinada - com crase)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="facultativo" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">help</span>
              Casos Facultativos
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Crase facultativa em 3 situações:</p>
              <ul className="summary-list">
                <li>Antes de pronomes possessivos femininos (minha, tua, sua, nossa, vossa)</li>
                <li>Antes de nomes próprios femininos</li>
                <li>Depois da preposição "até"</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('facultativo')}
            >
              <span className="material-icons">
                {expandedSections.facultativo ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.facultativo ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.facultativo && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">1. Pronomes Possessivos Femininos</h4>
                  <p>Pode usar ou não o artigo antes do possessivo:</p>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Refiro-me <strong>a</strong> minha irmã. (sem artigo)</p>
                    <p className="example-text">✓ Refiro-me <strong>à</strong> minha irmã. (com artigo)</p>
                    <p className="example-text">✓ Entreguei o livro <strong>a</strong> sua mãe.</p>
                    <p className="example-text">✓ Entreguei o livro <strong>à</strong> sua mãe.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">2. Nomes Próprios Femininos</h4>
                  <p>Depende do grau de intimidade:</p>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Entreguei o presente <strong>a</strong> Carla.</p>
                    <p className="example-text">✓ Entreguei o presente <strong>à</strong> Carla.</p>
                  </div>
                  <div className="tip-box">
                    <span className="material-icons">tips_and_updates</span>
                    <p>Quanto maior a intimidade, mais comum o uso do artigo (e da crase).</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">3. Depois de "Até"</h4>
                  <div className="example-box full-width">
                    <p className="example-text">✓ Fui até <strong>a</strong> escola.</p>
                    <p className="example-text">✓ Fui até <strong>à</strong> escola.</p>
                    <p className="example-text">✓ Andei até <strong>a</strong> praça.</p>
                    <p className="example-text">✓ Andei até <strong>à</strong> praça.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="pratica" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">edit</span>
              Prática
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="content-card">
              <h4 className="detail-title">Exercícios de Fixação</h4>
              <p>Complete com A ou À:</p>
              <div className="fallacy-list">
                <div className="fallacy-item">
                  <h5>1. Fui ___ casa de Maria.</h5>
                  <p className="example-text">Resposta: <strong>à</strong> (vou à casa)</p>
                </div>
                <div className="fallacy-item">
                  <h5>2. Estou ___ procura de emprego.</h5>
                  <p className="example-text">Resposta: <strong>à</strong> (locução feminina)</p>
                </div>
                <div className="fallacy-item">
                  <h5>3. Refiro-me ___ aquele caso.</h5>
                  <p className="example-text">Resposta: <strong>àquele</strong> (a + aquele)</p>
                </div>
                <div className="fallacy-item">
                  <h5>4. Vou ___ pé.</h5>
                  <p className="example-text">Resposta: <strong>a</strong> (palavra masculina)</p>
                </div>
                <div className="fallacy-item">
                  <h5>5. Chegamos ___ tempo.</h5>
                  <p className="example-text">Resposta: <strong>a</strong> (sem hora determinada)</p>
                </div>
                <div className="fallacy-item">
                  <h5>6. A reunião é ___ uma hora.</h5>
                  <p className="example-text">Resposta: <strong>à</strong> (hora determinada)</p>
                </div>
                <div className="fallacy-item">
                  <h5>7. Falei ___ ela ontem.</h5>
                  <p className="example-text">Resposta: <strong>a</strong> (pronome pessoal)</p>
                </div>
                <div className="fallacy-item">
                  <h5>8. Fomos ___ França.</h5>
                  <p className="example-text">Resposta: <strong>à</strong> (volto da França)</p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default PortugueseCrase;

