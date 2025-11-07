import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './ModernismoBrasileiroSegundaFase.css';

const ModernismoBrasileiroSegundaFase = () => {
  const sections = [
    { id: 'contexto', title: 'Contexto Histórico', icon: 'timeline' },
    { id: 'resumo-rapido', title: 'Resumo Rápido', icon: 'flash_on' },
    { id: 'caracteristicas', title: 'Características Gerais', icon: 'fact_check' },
    { id: 'cecilia', title: 'Cecília Meireles', icon: 'person' },
    { id: 'vinicius', title: 'Vinicius de Moraes', icon: 'favorite' },
    { id: 'murilo', title: 'Murilo Mendes', icon: 'church' },
    { id: 'drummond', title: 'Carlos Drummond de Andrade', icon: 'star' },
    { id: 'fixacao', title: 'Fixação', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="modernismo-segunda-fase-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Contexto */}
      <section id="contexto" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Modernismo Brasileiro - 2ª Fase</h1>
            <p className="section-subtitle">Geração de 30</p>
            <p className="section-intro">
              Iniciada em 1930 com a publicação de <strong>"Alguma Poesia"</strong> de Carlos Drummond 
              de Andrade, a segunda fase do Modernismo Brasileiro é caracterizada pela 
              <strong> tensão social</strong> e pelo foco em <strong>questões sociais</strong>, 
              mantendo a renovação da linguagem iniciada na primeira fase.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Contexto Histórico</h2>
            <ul className="content-list">
              <li><strong>1930</strong>: Revolução de 30 e chegada de Getúlio Vargas ao poder</li>
              <li><strong>Crise econômica</strong>: Grande Depressão (1929) afeta o Brasil</li>
              <li><strong>Tensões sociais</strong>: Crescimento urbano, industrialização, desigualdade</li>
              <li><strong>Contexto político</strong>: Instabilidade, autoritarismo crescente (Estado Novo em 1937)</li>
              <li><strong>Literatura engajada</strong>: Autores refletem as questões sociais e políticas</li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Resumo Rápido */}
      <section id="resumo-rapido" className="page-section">
        <ScrollReveal>
          <GlassCard className="quick-summary-card">
            <div className="quick-summary-header">
              <span className="material-icons">flash_on</span>
              <h2>Resumo Rápido</h2>
            </div>
            <div className="quick-summary-grid">
              <div className="summary-item">
                <span className="summary-icon material-icons">event</span>
                <div className="summary-content">
                  <h3>Período</h3>
                  <p>1930-1945 (até o fim do Estado Novo)</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">psychology</span>
                <div className="summary-content">
                  <h3>Foco</h3>
                  <p>Questões sociais, tensão política, introspecção</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">groups</span>
                <div className="summary-content">
                  <h3>Principais Autores</h3>
                  <p>Drummond, Cecília Meireles, Vinicius, Murilo Mendes</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">library_books</span>
                <div className="summary-content">
                  <h3>Prosa</h3>
                  <p>Romance regionalista: Rachel de Queiroz, Graciliano Ramos</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Características Gerais */}
      <section id="caracteristicas" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">
              <span className="material-icons">fact_check</span>
              Características Gerais da 2ª Fase
            </h2>

            <div className="characteristics-grid">
              <div className="characteristic-card">
                <h3><span className="material-icons">edit</span> Linguagem</h3>
                <p>Continuidade da renovação linguística iniciada em 1922. Liberdade no uso do verso livre, 
                mas com maior maturidade formal.</p>
              </div>

              <div className="characteristic-card">
                <h3><span className="material-icons">visibility</span> Aceitação Pública</h3>
                <p>Maior aceitação pelo público leitor em relação à primeira fase. O Modernismo se consolida 
                como movimento literário legítimo.</p>
              </div>

              <div className="characteristic-card">
                <h3><span className="material-icons">groups</span> Temática Social</h3>
                <p>Consciência de viver em um mundo multifacetado. Forte presença de temas sociais, 
                políticos e crítica à desigualdade.</p>
              </div>

              <div className="characteristic-card">
                <h3><span className="material-icons">psychology</span> Crítica Introspectiva</h3>
                <p>Além da questão social, há profunda introspecção psicológica e reflexão existencial.</p>
              </div>
            </div>

            <div className="highlight-box">
              <h3>Prosa: Romance Regionalista</h3>
              <p className="text-content">
                Na prosa, a segunda fase é marcada pelo <strong>romance regionalista de denúncia</strong>:
              </p>
              <ul className="content-list">
                <li><strong>Rachel de Queiroz</strong>: "O Quinze" (1930) - Seca no Nordeste</li>
                <li><strong>Graciliano Ramos</strong>: "Vidas Secas" (1938) - Miséria nordestina</li>
                <li><strong>José Lins do Rego</strong>: Ciclo da cana-de-açúcar</li>
                <li><strong>Jorge Amado</strong>: Denúncia social e cultura baiana</li>
              </ul>
            </div>

            <div className="highlight-box">
              <h3>Poesia: Consciência Social e Existencial</h3>
              <p className="text-content">
                A poesia da Geração de 30 combina <strong>consciência social</strong> com 
                <strong>reflexão introspectiva</strong>, explorando tanto o mundo exterior quanto o interior.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Cecília Meireles */}
      <section id="cecilia" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">person</span>
              <div>
                <h2 className="subsection-title">Cecília Meireles</h2>
                <p className="author-dates">(1901-1964)</p>
              </div>
            </div>

            <div className="author-content">
              <div className="highlight-box pioneer">
                <h3>🌟 Primeira Mulher de Grande Destaque na Poesia Brasileira</h3>
                <p className="text-content">
                  Cecília Meireles foi a primeira mulher a conquistar reconhecimento nacional como 
                  poetisa, abrindo caminho para futuras gerações de escritoras brasileiras.
                </p>
              </div>

              <h3>Obra Principal</h3>
              <ul className="content-list">
                <li><strong>"Romanceiro da Inconfidência"</strong> (1953) - Épico histórico sobre a 
                Inconfidência Mineira, com foco na tragédia humana dos inconfidentes</li>
              </ul>

              <h3>Temas Centrais</h3>
              <div className="theme-grid">
                <div className="theme-box">
                  <h4><span className="material-icons">self_improvement</span> Preocupação Espiritual</h4>
                  <p>Reflexão sobre a existência, a morte, o transitório e o eterno.</p>
                </div>

                <div className="theme-box">
                  <h4><span className="material-icons">schedule</span> Fugacidade das Coisas</h4>
                  <p>Compreensão da brevidade da vida, evocando o tema clássico do <em>carpe diem</em> 
                  ("aproveite o dia").</p>
                </div>

                <div className="theme-box">
                  <h4><span className="material-icons">water_drop</span> Lirismo Sensual e Sutil</h4>
                  <p>Poesia delicada, musical, com imagens refinadas e atmosfera onírica.</p>
                </div>
              </div>

              <div className="concept-box">
                <h3>Conceito-Chave: A Efemeridade</h3>
                <p className="text-content">
                  Cecília Meireles explora constantemente a <strong>efemeridade da existência</strong>, 
                  a passagem do tempo e a natureza transitória de todas as coisas. Sua poesia convida 
                  à reflexão sobre o que permanece e o que se perde no fluxo do tempo.
                </p>
              </div>

              <h3>Estilo Poético</h3>
              <ul className="content-list">
                <li><strong>Musicalidade</strong>: Uso sofisticado do ritmo e da sonoridade</li>
                <li><strong>Imagens etéreas</strong>: Atmosfera de sonho e mistério</li>
                <li><strong>Universalismo</strong>: Temas que transcendem o particular</li>
                <li><strong>Contenção emocional</strong>: Sutileza e elegância na expressão dos sentimentos</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Vinicius de Moraes */}
      <section id="vinicius" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">favorite</span>
              <div>
                <h2 className="subsection-title">Vinicius de Moraes</h2>
                <p className="author-dates">(1913-1980)</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Características Gerais</h3>
              <p className="text-content">
                Poeta, dramaturgo, diplomata e compositor, Vinicius de Moraes transitou entre a 
                alta poesia e a música popular, tornando-se um dos fundadores da Bossa Nova.
              </p>

              <div className="highlight-box">
                <h3>Influências</h3>
                <ul className="content-list">
                  <li><strong>Simbolismo</strong>: Influência simbolista em sua fase inicial</li>
                  <li><strong>Religiosidade</strong>: Temas místicos e espirituais na primeira fase</li>
                  <li><strong>Angústia existencial</strong>: Conflito entre matéria e espírito</li>
                </ul>
              </div>

              <h3>Tema Central: O Amor</h3>
              <div className="theme-grid">
                <div className="theme-box love-theme">
                  <h4><span className="material-icons">favorite</span> Natureza do Amor</h4>
                  <p>Busca compreender a essência do amor em suas múltiplas facetas: 
                  espiritual, carnal, platônico, efêmero.</p>
                </div>

                <div className="theme-box love-theme">
                  <h4><span className="material-icons">hourglass_empty</span> Fugacidade do Amor</h4>
                  <p>A consciência de que o amor é transitório, intenso mas passageiro. 
                  A dor de amar e de ser amado.</p>
                </div>
              </div>

              <h3>Forma e Recursos</h3>
              <ul className="content-list">
                <li><strong>Soneto</strong>: Grande domínio da forma clássica do soneto</li>
                <li><strong>Antíteses</strong>: Abuso de oposições (amor/dor, matéria/espírito, eterno/fugaz)</li>
                <li><strong>Lirismo amoroso</strong>: Celebração e lamento do amor</li>
                <li><strong>Musicalidade</strong>: Ritmo e melodia que antecipam sua carreira musical</li>
              </ul>

              <div className="concept-box">
                <h3>Conflito Matéria x Espírito</h3>
                <p className="text-content">
                  Uma tensão fundamental na obra de Vinicius é o conflito entre o <strong>corpo</strong> 
                  (desejo, matéria, sensualidade) e o <strong>espírito</strong> (transcendência, religiosidade, 
                  ideal). Esse conflito permeia sua poesia amorosa, criando uma angústia existencial característica.
                </p>
              </div>

              <h3>Obras Importantes</h3>
              <ul className="content-list">
                <li><strong>"Antologia Poética"</strong> (1954) - Reúne sua melhor poesia</li>
                <li><strong>"Soneto de Fidelidade"</strong> - Um de seus poemas mais famosos</li>
                <li><strong>"Orfeu da Conceição"</strong> (1956) - Peça teatral, base do filme "Orfeu Negro"</li>
                <li><strong>Letras de música</strong>: "Garota de Ipanema", "Chega de Saudade", entre outras</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Murilo Mendes */}
      <section id="murilo" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">church</span>
              <div>
                <h2 className="subsection-title">Murilo Mendes</h2>
                <p className="author-dates">(1901-1975)</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Características Gerais</h3>
              <p className="text-content">
                Poeta de dicção única, Murilo Mendes combina <strong>surrealismo</strong>, 
                <strong>religiosidade católica</strong> e <strong>questionamento existencial</strong> 
                em uma poesia densa e imagética.
              </p>

              <div className="highlight-box">
                <h3>Temas Centrais</h3>
                <ul className="content-list">
                  <li><strong>Religiosidade</strong>: Forte presença do catolicismo e da espiritualidade</li>
                  <li><strong>Espiritualidade</strong>: Busca pelo transcendente e pelo sagrado</li>
                  <li><strong>Relação do eu-lírico consigo mesmo</strong>: Introspecção profunda</li>
                  <li><strong>Relação do eu-lírico com o mundo</strong>: Visão crítica da realidade</li>
                </ul>
              </div>

              <h3>Obras Importantes</h3>
              <ul className="content-list">
                <li><strong>"Poesia em Pânico"</strong> (1938) - Reflexo da tensão pré-Segunda Guerra</li>
                <li><strong>"As Metamorfoses"</strong> (1944) - Transformação e transcendência</li>
                <li><strong>"O Visionário"</strong> (1941) - Poesia mística e visionária</li>
              </ul>

              <div className="analysis-box">
                <h3>Análise: "Poema Espiritual"</h3>
                <p className="text-content">
                  No poema, o eu-lírico se vê como <strong>"fragmento de deus"</strong>. 
                  A matéria <strong>"jorra por ordem de deus"</strong> e, crucialmente, 
                  <strong>"sem ela não há poesia"</strong>.
                </p>
                <div className="interpretation">
                  <h4>Interpretação</h4>
                  <p>
                    Murilo Mendes estabelece uma relação dialética entre o material e o espiritual: 
                    a poesia necessita da matéria (mundo concreto, corpo, experiência) como meio de 
                    expressão do divino. O poeta é um fragmento do divino que se manifesta através 
                    da matéria poética.
                  </p>
                </div>
              </div>

              <h3>Estilo Poético</h3>
              <ul className="content-list">
                <li><strong>Surrealismo</strong>: Imagens insólitas, justaposições inesperadas</li>
                <li><strong>Linguagem concisa</strong>: Economia de palavras, densidade semântica</li>
                <li><strong>Religiosidade moderna</strong>: Fé em diálogo com o mundo contemporâneo</li>
                <li><strong>Visão profética</strong>: Poesia como revelação e testemunho</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Carlos Drummond de Andrade */}
      <section id="drummond" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card drummond-card">
            <div className="author-header">
              <span className="material-icons author-icon">star</span>
              <div>
                <h2 className="subsection-title">Carlos Drummond de Andrade</h2>
                <p className="author-dates">(1902-1987)</p>
                <p className="author-subtitle">Principal nome da Geração de 30</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Importância Histórica</h3>
              <p className="text-content">
                Drummond é considerado o <strong>maior poeta brasileiro do século XX</strong>, 
                aprofundando as questões nacionais e sociais da Geração de 30 e elevando o Modernismo 
                à sua máxima expressão artística.
              </p>

              <div className="highlight-box">
                <h3>Marco Inicial</h3>
                <p className="text-content">
                  <strong>"Alguma Poesia"</strong> (1930) - Livro que marca o início da segunda fase 
                  do Modernismo Brasileiro. Traz poemas como "No Meio do Caminho" e estabelece a voz 
                  poética drummondiana.
                </p>
              </div>

              <h3>Características da Poesia Drummondiana</h3>
              <ul className="content-list">
                <li><strong>Diálogo com o leitor</strong>: Busca estabelecer interlocução direta</li>
                <li><strong>Debate como temática</strong>: A discussão e o questionamento como matéria poética</li>
                <li><strong>Palavra x Mundo</strong>: Reflexão sobre a relação entre linguagem e realidade</li>
                <li><strong>Metalinguagem</strong>: Poesia sobre o próprio fazer poético</li>
                <li><strong>Ironia e humor</strong>: Tom por vezes irônico e autodepreciativo</li>
                <li><strong>Consciência social</strong>: Denúncia das injustiças e da alienação</li>
              </ul>

              <div className="poems-section">
                <h3>Poemas-Chave</h3>

                <div className="poem-card">
                  <h4><span className="material-icons">person_outline</span> "José"</h4>
                  <p className="poem-context">
                    Símbolo do <strong>indivíduo comum</strong> e do <strong>fracasso existencial</strong>. 
                    José representa o homem sem saída, preso em um mundo sem perspectivas.
                  </p>
                  <div className="poem-excerpt">
                    <p><em>"E agora, José? / A festa acabou, / a luz apagou, / o povo sumiu, / 
                    a noite esfriou, / e agora, José? / e agora, você?"</em></p>
                  </div>
                  <p className="poem-analysis">
                    O poema usa a repetição e a estrutura de questionamento para criar um efeito de 
                    angústia crescente, representando a condição existencial do homem moderno.
                  </p>
                </div>

                <div className="poem-card">
                  <h4><span className="material-icons">warning</span> "Morte do Leiteiro"</h4>
                  <p className="poem-context">
                    <strong>Denúncia social</strong>: Um trabalhador morre sem direito a apelo, 
                    vítima da violência urbana e da indiferença social.
                  </p>
                  <p className="poem-analysis">
                    Drummond narra a morte banal de um leiteiro, mostrando como vidas comuns são 
                    descartáveis na sociedade moderna. A poesia torna-se instrumento de denúncia 
                    e memória.
                  </p>
                </div>

                <div className="poem-card highlight">
                  <h4><span className="material-icons">eco</span> "A Rosa do Povo"</h4>
                  <p className="poem-context">
                    Livro-marco (1945) que usa o <strong>cotidiano como matéria-prima</strong> e 
                    concebe a poesia como <strong>resistência ao conformismo</strong>.
                  </p>
                  <p className="poem-analysis">
                    "A Rosa do Povo" representa a solidariedade com os oprimidos e a crença na 
                    função social da poesia. A rosa é símbolo da beleza que resiste em meio às 
                    adversidades do mundo.
                  </p>
                </div>

                <div className="poem-card">
                  <h4><span className="material-icons">create</span> "Consideração do Poema"</h4>
                  <p className="poem-context">
                    <strong>Metalinguagem</strong>: Reflexão sobre o próprio fazer poético e a 
                    relação entre palavra e mundo.
                  </p>
                  <p className="poem-analysis">
                    Drummond questiona o poder da palavra poética: ela pode transformar o mundo ou 
                    apenas representá-lo? O poema é um exercício de autoconsciência literária.
                  </p>
                </div>
              </div>

              <div className="concept-box">
                <h3>O Gauche Drummondiano</h3>
                <p className="text-content">
                  O termo <em>gauche</em> (esquerdo, desajeitado em francês) define a persona poética 
                  de Drummond: o indivíduo que se sente deslocado no mundo, que não se encaixa nas 
                  convenções sociais. Esse desajuste é fonte de crítica social e reflexão existencial.
                </p>
              </div>

              <h3>Fases da Obra Drummondiana</h3>
              <ul className="content-list">
                <li><strong>Fase Inicial</strong> (1930-1934): Ironia, ceticismo, "poesia gauche"</li>
                <li><strong>Fase Social</strong> (1940-1945): Engajamento, "A Rosa do Povo"</li>
                <li><strong>Fase Metafísica</strong> (1951-1962): Reflexão existencial, morte, tempo</li>
                <li><strong>Fase Memorialista</strong> (1968-1987): Recordação, infância, Minas Gerais</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Fixação */}
      <section id="fixacao" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">
              <span className="material-icons">quiz</span>
              Questões de Fixação
            </h2>

            <div className="exercise-list">
              <div className="exercise-item">
                <h3>1. Qual é o marco inicial da segunda fase do Modernismo Brasileiro?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> "Alguma Poesia" (1930) de Carlos Drummond de Andrade, 
                  que inaugura a Geração de 30 com foco em questões sociais e tensão política.
                </p>
              </div>

              <div className="exercise-item">
                <h3>2. Quais são as características gerais da Geração de 30?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Continuidade da renovação linguística, maior aceitação 
                  pelo público, liberdade no verso livre, temática social na poesia, e denúncia 
                  regionalista na prosa.
                </p>
              </div>

              <div className="exercise-item">
                <h3>3. Qual é o tema central de Cecília Meireles?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Preocupação espiritual e compreensão da fugacidade 
                  das coisas (brevidade da vida), evocando o <em>carpe diem</em>. Seu estilo é 
                  marcado pelo lirismo sensual e sutil.
                </p>
              </div>

              <div className="exercise-item">
                <h3>4. O que caracteriza a poesia de Vinicius de Moraes?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Influência do Simbolismo, temas de religiosidade e 
                  angústia (conflito matéria vs. espírito), busca pela natureza do amor, uso do 
                  soneto, e abuso de antíteses. Tema central: fugacidade do amor e de ser amado.
                </p>
              </div>

              <div className="exercise-item">
                <h3>5. Explique o "Poema Espiritual" de Murilo Mendes.</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> O eu-lírico se vê como "fragmento de deus". A matéria 
                  "jorra por ordem de deus" e "sem ela não há poesia". Estabelece relação dialética 
                  entre material e espiritual na criação poética.
                </p>
              </div>

              <div className="exercise-item">
                <h3>6. Quais são os temas principais de Carlos Drummond de Andrade?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Diálogo com o leitor, reflexão sobre palavra x mundo, 
                  metalinguagem (fazer poético), questões sociais e nacionais, o indivíduo comum 
                  (José), denúncia social (Morte do Leiteiro), e poesia como resistência (A Rosa do Povo).
                </p>
              </div>

              <div className="exercise-item">
                <h3>7. O que simboliza o poema "José" de Drummond?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> José simboliza o indivíduo comum e o fracasso existencial, 
                  o homem sem saída preso em um mundo sem perspectivas, representando a condição do 
                  homem moderno.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default ModernismoBrasileiroSegundaFase;

