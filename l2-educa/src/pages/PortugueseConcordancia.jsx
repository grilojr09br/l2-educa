import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import { useProgress } from '../utils/progressTracker';
import './PortugueseInterpretacao.css';

const PortugueseConcordancia = () => {
  const { markVisited, markCompleted, isCompleted } = useProgress('portuguese', 'concordancia');
  
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'verbal', title: 'Concordância Verbal', icon: 'record_voice_over' },
    { id: 'nominal', title: 'Concordância Nominal', icon: 'text_fields' },
    { id: 'especiais', title: 'Casos Especiais', icon: 'star' },
    { id: 'erros', title: 'Erros Comuns', icon: 'warning' },
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
        topicTitle="Concordância"
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
        <span className="breadcrumb-current">Concordância</span>
      </div>

      <div className="topic-hero">
        <ScrollReveal>
          <div className="topic-badge">
            <span className="material-icons">check_circle</span>
            CONCORDÂNCIA VERBAL E NOMINAL
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="topic-title">
            <span className="gradient-text">Concordância</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="topic-subtitle">
            Domine as regras de concordância entre sujeito e verbo, e entre substantivos e seus modificadores
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
                A concordância é a relação de harmonia entre termos da oração. Existem dois tipos principais: 
                concordância verbal (entre sujeito e verbo) e concordância nominal (entre substantivo e seus 
                modificadores como adjetivos, pronomes, numerais e artigos).
              </p>
              <p className="intro-text">
                Dominar as regras de concordância é essencial para a escrita correta e é frequentemente cobrado 
                em vestibulares e concursos públicos.
              </p>
            </GlassCard>
          </ScrollReveal>
        </section>

        <section id="verbal" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">record_voice_over</span>
              Concordância Verbal
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Regra geral: o verbo concorda com o sujeito em número (singular/plural) e pessoa (1ª, 2ª, 3ª)</p>
              <ul className="summary-list">
                <li><strong>Sujeito simples:</strong> "O aluno estuda" / "Os alunos estudam"</li>
                <li><strong>Sujeito composto:</strong> "João e Maria estudam" (verbo no plural)</li>
                <li><strong>Sujeito coletivo:</strong> "A multidão gritava" (singular) ou "gritavam" (plural)</li>
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
                  <h4 className="detail-title">Sujeito Simples</h4>
                  <p>O verbo concorda com o núcleo do sujeito:</p>
                  <div className="example-box">
                    <p className="example-text">✓ A professora <strong>explicou</strong> a matéria.</p>
                    <p className="example-text">✓ As professoras <strong>explicaram</strong> a matéria.</p>
                    <p className="example-text">✓ O grupo de alunos <strong>chegou</strong> atrasado. (núcleo: grupo)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Sujeito Composto</h4>
                  <p><strong>Antes do verbo:</strong> verbo no plural</p>
                  <div className="example-box">
                    <p className="example-text">✓ Pedro e Paulo <strong>viajaram</strong> ontem.</p>
                    <p className="example-text">✓ O pai e a mãe <strong>conversaram</strong> com o professor.</p>
                  </div>
                  <p><strong>Depois do verbo:</strong> plural ou singular (com o núcleo mais próximo)</p>
                  <div className="example-box">
                    <p className="example-text">✓ <strong>Viajou</strong> Pedro e Paulo. (menos comum)</p>
                    <p className="example-text">✓ <strong>Viajaram</strong> Pedro e Paulo. (mais comum)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Sujeito Coletivo</h4>
                  <p>Substantivo no singular que representa um grupo:</p>
                  <div className="example-box">
                    <p className="example-text">✓ A multidão <strong>gritava</strong>. (concordância gramatical)</p>
                    <p className="example-text">✓ A multidão <strong>gritavam</strong>. (concordância ideológica - menos formal)</p>
                  </div>
                  <p><strong>Com especificador:</strong></p>
                  <div className="example-box">
                    <p className="example-text">✓ Um bando de pássaros <strong>voou</strong>. (singular)</p>
                    <p className="example-text">✓ Um bando de pássaros <strong>voaram</strong>. (plural - concordância com "pássaros")</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Expressões Partitivas</h4>
                  <p>A maioria de, grande parte de, metade de...</p>
                  <div className="example-box">
                    <p className="example-text">✓ A maioria dos alunos <strong>passou</strong>. (singular)</p>
                    <p className="example-text">✓ A maioria dos alunos <strong>passaram</strong>. (plural)</p>
                    <p className="example-text">✓ Grande parte das pessoas <strong>compareceu</strong>/<strong>compareceram</strong>.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Pronomes Relativos "que" e "quem"</h4>
                  <p><strong>Que:</strong> verbo concorda com o antecedente</p>
                  <div className="example-box">
                    <p className="example-text">✓ Fui eu que <strong>fiz</strong> o trabalho. (eu fiz)</p>
                    <p className="example-text">✓ Fomos nós que <strong>fizemos</strong> o trabalho. (nós fizemos)</p>
                  </div>
                  <p><strong>Quem:</strong> verbo na 3ª pessoa do singular</p>
                  <div className="example-box">
                    <p className="example-text">✓ Fui eu quem <strong>fez</strong> o trabalho.</p>
                    <p className="example-text">✓ Fomos nós quem <strong>fez</strong> o trabalho.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Verbos Impessoais</h4>
                  <p>Ficam sempre no singular (não têm sujeito):</p>
                  <ul>
                    <li><strong>Haver</strong> (sentido de existir): "Havia muitas pessoas."</li>
                    <li><strong>Fazer</strong> (tempo decorrido): "Faz dois anos que não o vejo."</li>
                    <li><strong>Fenômenos da natureza:</strong> "Choveu muito ontem."</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ <strong>Havia</strong> várias opções. (não "haviam")</p>
                    <p className="example-text">✓ <strong>Faz</strong> dez anos que nos conhecemos. (não "fazem")</p>
                    <p className="example-text">✗ <strong>Haviam</strong> várias opções. (ERRADO)</p>
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
              Concordância Nominal
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Adjetivos, pronomes, artigos e numerais concordam com o substantivo em gênero e número:</p>
              <ul className="summary-list">
                <li><strong>Adjetivo após substantivos:</strong> concorda com o mais próximo ou com todos</li>
                <li><strong>Adjetivo antes:</strong> concorda com o mais próximo</li>
                <li><strong>Um adjetivo, vários substantivos:</strong> regras específicas</li>
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
                  <h4 className="detail-title">Adjetivo Após Substantivos</h4>
                  <p><strong>Opção 1:</strong> Plural (concordância com todos)</p>
                  <div className="example-box">
                    <p className="example-text">✓ Casa e carro <strong>novos</strong>.</p>
                    <p className="example-text">✓ Livro e caderno <strong>vermelhos</strong>.</p>
                  </div>
                  <p><strong>Opção 2:</strong> Concordância com o mais próximo</p>
                  <div className="example-box">
                    <p className="example-text">✓ Casa e carro <strong>novo</strong>.</p>
                    <p className="example-text">✓ Carro e casa <strong>nova</strong>.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Adjetivo Antes de Substantivos</h4>
                  <p>Concorda obrigatoriamente com o mais próximo:</p>
                  <div className="example-box">
                    <p className="example-text">✓ <strong>Belo</strong> jardim e casa.</p>
                    <p className="example-text">✓ <strong>Bela</strong> casa e jardim.</p>
                    <p className="example-text">✓ <strong>Velha</strong> mesa e cadeiras.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Casos Especiais</h4>
                  <p><strong>É proibido, é necessário, é bom:</strong></p>
                  <ul>
                    <li>Sem artigo: invariável → "É proibido entrada."</li>
                    <li>Com artigo: variável → "É proibida a entrada."</li>
                  </ul>
                  <div className="example-box">
                    <p className="example-text">✓ É <strong>proibido</strong> entrada.</p>
                    <p className="example-text">✓ É <strong>proibida</strong> a entrada.</p>
                    <p className="example-text">✓ É <strong>necessário</strong> paciência.</p>
                    <p className="example-text">✓ É <strong>necessária</strong> a paciência.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Bastante, Meio, Caro, Barato</h4>
                  <p><strong>Como adjetivo:</strong> varia</p>
                  <div className="example-box">
                    <p className="example-text">✓ Comprei livros <strong>caros</strong>. (adjetivo)</p>
                    <p className="example-text">✓ Ela está <strong>meia</strong> cansada. (adjetivo = um pouco)</p>
                    <p className="example-text">✓ Elas estão <strong>bastante</strong> felizes. (advérbio - não varia)</p>
                  </div>
                  <p><strong>Como advérbio:</strong> invariável</p>
                  <div className="example-box">
                    <p className="example-text">✓ Eles estudaram <strong>bastante</strong>. (advérbio)</p>
                    <p className="example-text">✓ Os produtos custam <strong>caro</strong>. (advérbio)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Menos, Alerta, Pseudo</h4>
                  <p>São sempre invariáveis:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Comprei <strong>menos</strong> roupas.</p>
                    <p className="example-text">✓ Os soldados estão <strong>alerta</strong>.</p>
                    <p className="example-text">✓ Eram <strong>pseudo</strong> especialistas.</p>
                    <p className="example-text">✗ Comprei <strong>menas</strong> roupas. (ERRADO)</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="especiais" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">star</span>
              Casos Especiais
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="summary-card">
              <h3 className="card-title">Resumo</h3>
              <p>Situações que exigem atenção especial:</p>
              <ul className="summary-list">
                <li><strong>Porcentagem:</strong> concordância com o número ou com o termo seguinte</li>
                <li><strong>Anexo, incluso, obrigado:</strong> variam conforme o contexto</li>
                <li><strong>Bastante, meio:</strong> adjetivo (varia) ou advérbio (invariável)</li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button 
              className="expand-button"
              onClick={() => toggleSection('especiais')}
            >
              <span className="material-icons">
                {expandedSections.especiais ? 'expand_less' : 'expand_more'}
              </span>
              {expandedSections.especiais ? 'Ver Menos' : 'Ver Detalhes'}
            </button>
          </ScrollReveal>

          {expandedSections.especiais && (
            <div className="expanded-content">
              <ScrollReveal delay={100}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Porcentagem</h4>
                  <p>Pode concordar com o número ou com o especificador:</p>
                  <div className="example-box">
                    <p className="example-text">✓ 1% dos alunos <strong>faltou</strong>. (singular)</p>
                    <p className="example-text">✓ 1% dos alunos <strong>faltaram</strong>. (plural)</p>
                    <p className="example-text">✓ 50% da população <strong>aprovou</strong>. (concordância com "população")</p>
                    <p className="example-text">✓ 50% da população <strong>aprovaram</strong>. (concordância com "50%")</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Anexo, Incluso, Junto</h4>
                  <p>Variam em gênero e número:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Segue <strong>anexo</strong> o documento.</p>
                    <p className="example-text">✓ Seguem <strong>anexos</strong> os documentos.</p>
                    <p className="example-text">✓ Segue <strong>anexa</strong> a foto.</p>
                    <p className="example-text">✓ As fotos vão <strong>inclusas</strong>.</p>
                  </div>
                  <p><strong>Em anexo:</strong> locução invariável</p>
                  <div className="example-box">
                    <p className="example-text">✓ Seguem <strong>em anexo</strong> os documentos.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Obrigado, Mesmo, Próprio</h4>
                  <p>Concordam com quem fala ou com o referente:</p>
                  <div className="example-box">
                    <p className="example-text">✓ Muito <strong>obrigado</strong>, disse o rapaz.</p>
                    <p className="example-text">✓ Muito <strong>obrigada</strong>, disse a moça.</p>
                    <p className="example-text">✓ Elas <strong>mesmas</strong> fizeram o trabalho.</p>
                    <p className="example-text">✓ Os <strong>próprios</strong> alunos resolveram.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <GlassCard className="detail-card">
                  <h4 className="detail-title">Só, A Sós, Sós</h4>
                  <p><strong>Só = sozinho:</strong> varia</p>
                  <div className="example-box">
                    <p className="example-text">✓ Ela está <strong>só</strong>. (sozinha)</p>
                    <p className="example-text">✓ Elas estão <strong>sós</strong>. (sozinhas)</p>
                  </div>
                  <p><strong>Só = somente:</strong> invariável</p>
                  <div className="example-box">
                    <p className="example-text">✓ <strong>Só</strong> elas sabem a verdade. (somente)</p>
                  </div>
                  <p><strong>A sós:</strong> sempre invariável</p>
                  <div className="example-box">
                    <p className="example-text">✓ Eles ficaram <strong>a sós</strong>.</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          )}
        </section>

        <section id="erros" className="content-section">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="material-icons">warning</span>
              Erros Comuns
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="content-card">
              <div className="fallacy-list">
                <div className="fallacy-item">
                  <h5>1. Haver no sentido de existir</h5>
                  <p className="wrong-example">✗ Haviam muitas pessoas na festa.</p>
                  <p className="example-text">✓ Havia muitas pessoas na festa.</p>
                </div>
                <div className="fallacy-item">
                  <h5>2. Fazer indicando tempo</h5>
                  <p className="wrong-example">✗ Fazem dois anos que não o vejo.</p>
                  <p className="example-text">✓ Faz dois anos que não o vejo.</p>
                </div>
                <div className="fallacy-item">
                  <h5>3. "Menas" não existe</h5>
                  <p className="wrong-example">✗ Comprei menas roupas.</p>
                  <p className="example-text">✓ Comprei menos roupas.</p>
                </div>
                <div className="fallacy-item">
                  <h5>4. A maioria + verbo</h5>
                  <p className="example-text">✓ A maioria dos alunos passou. (singular)</p>
                  <p className="example-text">✓ A maioria dos alunos passaram. (plural)</p>
                  <p>Ambas corretas! Prefira o singular em contextos formais.</p>
                </div>
                <div className="fallacy-item">
                  <h5>5. "Houveram" pessoas</h5>
                  <p className="wrong-example">✗ Houveram muitos problemas.</p>
                  <p className="example-text">✓ Houve muitos problemas.</p>
                  <p><strong>Exceção:</strong> Como auxiliar, haver varia: "Eles haviam chegado."</p>
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

export default PortugueseConcordancia;

