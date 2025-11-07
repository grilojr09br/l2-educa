import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './MovimentosLiterariosPosteriores.css';

const MovimentosLiterariosPosteriores = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'rocket_launch' },
    { id: 'resumo-rapido', title: 'Resumo Rápido', icon: 'flash_on' },
    { id: 'concretismo', title: 'Concretismo', icon: 'grid_on' },
    { id: 'poesia-marginal', title: 'Poesia Marginal', icon: 'mode_edit' },
    { id: 'comparacao', title: 'Comparação', icon: 'compare' },
    { id: 'fixacao', title: 'Fixação', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="movimentos-posteriores-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Introdução */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Movimentos Literários Posteriores</h1>
            <p className="section-intro">
              Após o Modernismo consolidado, surgem novos movimentos que reagem ao contexto 
              sociocultural brasileiro: o <strong>Concretismo</strong> (anos 50) e a 
              <strong>Poesia Marginal</strong> (anos 70), cada um com propostas estéticas e 
              políticas distintas.
            </p>
          </div>
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
              <div className="summary-item concretismo-item">
                <span className="summary-icon material-icons">grid_on</span>
                <div className="summary-content">
                  <h3>Concretismo</h3>
                  <p>Anos 50 • Valorização gráfica • Poesia visual • Influência da sociedade pós-moderna</p>
                </div>
              </div>
              <div className="summary-item marginal-item">
                <span className="summary-icon material-icons">mode_edit</span>
                <div className="summary-content">
                  <h3>Poesia Marginal</h3>
                  <p>Anos 70 • Geração mimeógrafo • Ditadura militar • Contracultura e resistência</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Concretismo */}
      <section id="concretismo" className="page-section">
        <ScrollReveal>
          <GlassCard className="movement-card concretismo-card">
            <div className="movement-header">
              <span className="material-icons movement-icon">grid_on</span>
              <div>
                <h2 className="subsection-title">Concretismo</h2>
                <p className="movement-period">Década de 1950</p>
              </div>
            </div>

            <div className="movement-content">
              <h3>Contexto Histórico</h3>
              <p className="text-content">
                O Concretismo surge na <strong>década de 1950</strong>, período de 
                crescimento econômico e urbanização acelerada no Brasil (anos JK). 
                Influenciado pelo <strong>capitalismo industrial</strong> e pela emergência 
                da <strong>sociedade pós-moderna</strong>, caracterizada pela fragmentação, 
                multiplicidade e visualidade.
              </p>

              <div className="highlight-box">
                <h3>Influências e Contexto</h3>
                <ul className="content-list">
                  <li><strong>Capitalismo avançado</strong>: Sociedade de consumo, publicidade, mídia de massa</li>
                  <li><strong>Pós-modernidade</strong>: Fragmentação da experiência, multiplicidade de sentidos</li>
                  <li><strong>Vanguardas europeias</strong>: Futurismo, Dadaísmo, Construtivismo russo</li>
                  <li><strong>Arte concreta</strong>: Influência das artes visuais (geometrismo, abstração)</li>
                  <li><strong>Tecnologia</strong>: Fascínio pela máquina, pelo industrial, pelo urbano</li>
                </ul>
              </div>

              <h3>Características Principais</h3>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <span className="material-icons">text_fields</span>
                  <h4>Valorização Gráfica</h4>
                  <p>Disposição visual das palavras no espaço da página é fundamental. 
                  A forma visual comunica tanto quanto o conteúdo verbal.</p>
                </div>

                <div className="feature-card">
                  <span className="material-icons">space_dashboard</span>
                  <h4>Exploração do Espaço</h4>
                  <p>Uso poético do espaço da página. O branco, os vazios, as distâncias 
                  entre palavras criam significado.</p>
                </div>

                <div className="feature-card">
                  <span className="material-icons">palette</span>
                  <h4>Códigos Visuais</h4>
                  <p>Estruturas semelhantes aos códigos de comunicação moderna: cores, 
                  símbolos, tipografia como elementos semânticos.</p>
                </div>

                <div className="feature-card">
                  <span className="material-icons">visibility</span>
                  <h4>Percepção Crítica</h4>
                  <p>Objetivo: criar percepção crítica da sociedade através da forma 
                  poética experimental.</p>
                </div>
              </div>

              <h3>Principais Poetas Concretistas</h3>
              <div className="poets-grid">
                <div className="poet-card">
                  <h4>Augusto de Campos</h4>
                  <p>Cofundador do movimento. Experimenta com cores, tipografia e disposição espacial.</p>
                </div>
                <div className="poet-card">
                  <h4>Haroldo de Campos</h4>
                  <p>Teórico do movimento. Trabalha com tradução criativa e poesia visual.</p>
                </div>
                <div className="poet-card">
                  <h4>Décio Pignatari</h4>
                  <p>Explora a relação entre palavra e imagem, entre som e sentido.</p>
                </div>
              </div>

              <div className="concept-box">
                <h3>Conceito-Chave: Poesia Verbivocovisual</h3>
                <p className="text-content">
                  Os concretistas defendem uma poesia que integra três dimensões:
                </p>
                <ul className="content-list">
                  <li><strong>VERBI</strong> (verbal): O significado das palavras</li>
                  <li><strong>VOCO</strong> (vocal): O som, a sonoridade</li>
                  <li><strong>VISUAL</strong>: A forma gráfica, a disposição espacial</li>
                </ul>
                <p className="text-content">
                  O poema concreto deve funcionar simultaneamente nos três níveis, 
                  criando uma experiência estética total.
                </p>
              </div>

              <div className="example-box">
                <h3>Exemplo de Estrutura Concretista</h3>
                <p className="text-content">
                  Um poema concreto famoso é "Beba Coca Cola" de Décio Pignatari, que 
                  dispõe as palavras de forma a criar crítica visual ao consumismo:
                </p>
                <div className="concrete-example">
                  <p className="concrete-text">
                    beba coca cola<br/>
                    babe cola<br/>
                    beba coca<br/>
                    babe cola caco<br/>
                    caco<br/>
                    cola<br/>
                    c l o a c a
                  </p>
                </div>
                <p className="example-explanation">
                  A decomposição visual das palavras revela "cloaca" (esgoto), 
                  fazendo crítica ao consumismo através da própria forma do poema.
                </p>
              </div>

              <h3>Objetivos do Concretismo</h3>
              <ul className="content-list">
                <li><strong>Renovação radical da linguagem poética</strong></li>
                <li><strong>Integração com outras artes</strong> (design, arquitetura, música)</li>
                <li><strong>Crítica à sociedade de consumo</strong> usando suas próprias ferramentas visuais</li>
                <li><strong>Poesia como objeto</strong>, não como expressão subjetiva</li>
                <li><strong>Internacionalização</strong> da poesia brasileira</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Poesia Marginal */}
      <section id="poesia-marginal" className="page-section">
        <ScrollReveal>
          <GlassCard className="movement-card marginal-card">
            <div className="movement-header">
              <span className="material-icons movement-icon">mode_edit</span>
              <div>
                <h2 className="subsection-title">Poesia Marginal</h2>
                <p className="movement-period">Década de 1970</p>
              </div>
            </div>

            <div className="movement-content">
              <h3>Contexto Histórico</h3>
              <p className="text-content">
                A Poesia Marginal surge na <strong>década de 70</strong>, durante o 
                <strong>auge da ditadura militar</strong> (1968-1978), período de intensa 
                <strong>censura</strong> e <strong>repressão política</strong>. Era o tempo 
                do AI-5 (Ato Institucional nº 5), que suspendia direitos civis e intensificava 
                a perseguição política.
              </p>

              <div className="highlight-box danger">
                <h3>Contexto da Ditadura</h3>
                <ul className="content-list">
                  <li><strong>AI-5</strong> (1968): Auge da repressão, censura total</li>
                  <li><strong>Censura prévia</strong>: Controle de jornais, livros, músicas</li>
                  <li><strong>Perseguição política</strong>: Prisões, torturas, exílios</li>
                  <li><strong>Anos de chumbo</strong>: Período mais violento da ditadura</li>
                  <li><strong>Resistência cultural</strong>: Arte como forma de oposição</li>
                </ul>
              </div>

              <h3>Características Principais</h3>
              
              <div className="feature-grid">
                <div className="feature-card marginal-feature">
                  <span className="material-icons">print</span>
                  <h4>Geração Mimeógrafo</h4>
                  <p>Produção independente usando mimeógrafo (máquina de cópias). 
                  Circulação fora das grandes editoras, distribuição alternativa.</p>
                </div>

                <div className="feature-card marginal-feature">
                  <span className="material-icons">diversity_3</span>
                  <h4>Contracultura</h4>
                  <p>Ligação com movimentos de contracultura, movimento estudantil, 
                  e resistência à ditadura.</p>
                </div>

                <div className="feature-card marginal-feature">
                  <span className="material-icons">chat</span>
                  <h4>Linguagem Coloquial</h4>
                  <p>Uso de linguagem do cotidiano, gírias, humor. Poesia acessível 
                  e próxima do leitor comum.</p>
                </div>

                <div className="feature-card marginal-feature">
                  <span className="material-icons">theater_comedy</span>
                  <h4>Performance</h4>
                  <p>Valorização da oralidade e da performance. Poesia para ser 
                  lida em voz alta, em eventos e saraus.</p>
                </div>
              </div>

              <h3>Temas da Poesia Marginal</h3>
              <div className="themes-grid">
                <div className="theme-tag"><span className="material-icons">location_city</span> Urbanos</div>
                <div className="theme-tag"><span className="material-icons">today</span> Cotidiano</div>
                <div className="theme-tag"><span className="material-icons">favorite</span> Amor</div>
                <div className="theme-tag"><span className="material-icons">sentiment_very_satisfied</span> Humor</div>
                <div className="theme-tag"><span className="material-icons">campaign</span> Crítica Social</div>
                <div className="theme-tag"><span className="material-icons">policy</span> Crítica Política</div>
              </div>

              <h3>Forma e Estilo</h3>
              <div className="style-features">
                <div className="style-item">
                  <h4><span className="material-icons">not_interested</span> Antipoesia</h4>
                  <p>Rejeição da poesia "séria" e hermética. Poesia como algo vivo e cotidiano.</p>
                </div>
                <div className="style-item">
                  <h4><span className="material-icons">emoji_people</span> Performance</h4>
                  <p>Valorização da leitura pública, do corpo, da voz, da presença.</p>
                </div>
                <div className="style-item">
                  <h4><span className="material-icons">school</span> Anti-Academicismo</h4>
                  <p>Rejeição da poesia acadêmica, formal, distante. Busca de democratização.</p>
                </div>
                <div className="style-item">
                  <h4><span className="material-icons">record_voice_over</span> Oralidade</h4>
                  <p>Valorização da fala, do ritmo da conversa, da naturalidade.</p>
                </div>
              </div>

              <h3>Relação com a Música</h3>
              <div className="highlight-box music">
                <h3><span className="material-icons">music_note</span> Aproximação da MPB</h3>
                <p className="text-content">
                  A Poesia Marginal teve forte <strong>aproximação com a Música Popular Brasileira</strong> 
                  (MPB), especialmente com compositores como Chico Buarque, Caetano Veloso, Gilberto Gil. 
                  Muitos poetas marginais também eram músicos ou colaboravam com músicos.
                </p>
                <p className="text-content">
                  Essa fusão criou uma poesia-canção que era ao mesmo tempo literária e musical, 
                  acessível e sofisticada.
                </p>
              </div>

              <h3>Principais Autores</h3>
              <div className="authors-grid">
                <div className="author-tag">
                  <span className="material-icons">person</span>
                  <div>
                    <h4>Chacal</h4>
                    <p>Humor, irreverência, cotidiano urbano</p>
                  </div>
                </div>
                <div className="author-tag">
                  <span className="material-icons">person</span>
                  <div>
                    <h4>Cacaso</h4>
                    <p>Ironia, crítica política velada</p>
                  </div>
                </div>
                <div className="author-tag">
                  <span className="material-icons">person</span>
                  <div>
                    <h4>Ana Cristina César</h4>
                    <p>Intimismo, diário poético, feminino</p>
                  </div>
                </div>
                <div className="author-tag">
                  <span className="material-icons">person</span>
                  <div>
                    <h4>Francisco Alvim</h4>
                    <p>Minimalismo, crítica social sutil</p>
                  </div>
                </div>
                <div className="author-tag">
                  <span className="material-icons">person</span>
                  <div>
                    <h4>Paulo Leminski</h4>
                    <p>Experimentalismo, haicai, humor</p>
                  </div>
                </div>
              </div>

              <div className="concept-box">
                <h3>Conceito-Chave: Poesia da Vida</h3>
                <p className="text-content">
                  A Poesia Marginal propõe uma <strong>"poesia da vida"</strong> - não separada 
                  do cotidiano, mas integrada a ele. O poeta é um cidadão comum que fala de 
                  experiências comuns em linguagem comum. A poesia desce do pedestal e se 
                  mistura à vida urbana, aos bares, às ruas, às conversas.
                </p>
              </div>

              <div className="production-box">
                <h3>Modo de Produção: Independente</h3>
                <p className="text-content">
                  Os poetas marginais criaram um <strong>circuito alternativo</strong> de 
                  produção e distribuição:
                </p>
                <ul className="content-list">
                  <li><strong>Mimeógrafo</strong>: Impressão caseira, artesanal</li>
                  <li><strong>Distribuição própria</strong>: Venda em bares, universidades, na rua</li>
                  <li><strong>Tiragens pequenas</strong>: Edições limitadas, quase artesanais</li>
                  <li><strong>Preços acessíveis</strong>: Livros baratos, para todos</li>
                  <li><strong>Autonomia editorial</strong>: Sem censura de editoras</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Comparação */}
      <section id="comparacao" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">
              <span className="material-icons">compare</span>
              Comparação: Concretismo vs. Poesia Marginal
            </h2>

            <div className="comparison-table">
              <div className="comparison-row header-row">
                <div className="comparison-cell">Aspecto</div>
                <div className="comparison-cell concretismo-cell">Concretismo</div>
                <div className="comparison-cell marginal-cell">Poesia Marginal</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Período</strong></div>
                <div className="comparison-cell">Anos 50</div>
                <div className="comparison-cell">Anos 70</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Contexto</strong></div>
                <div className="comparison-cell">Desenvolvimentismo, otimismo</div>
                <div className="comparison-cell">Ditadura militar, repressão</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Forma</strong></div>
                <div className="comparison-cell">Rigor formal, estrutura planejada</div>
                <div className="comparison-cell">Liberdade formal, espontaneidade</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Linguagem</strong></div>
                <div className="comparison-cell">Experimental, visual, "culta"</div>
                <div className="comparison-cell">Coloquial, acessível, cotidiana</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Foco</strong></div>
                <div className="comparison-cell">Visual, gráfico, espacial</div>
                <div className="comparison-cell">Oral, performático, vivencial</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Produção</strong></div>
                <div className="comparison-cell">Editoras, publicações formais</div>
                <div className="comparison-cell">Mimeógrafo, circuito independente</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Objetivo</strong></div>
                <div className="comparison-cell">Renovação estética radical</div>
                <div className="comparison-cell">Democratização, acessibilidade</div>
              </div>

              <div className="comparison-row">
                <div className="comparison-cell"><strong>Relação com o leitor</strong></div>
                <div className="comparison-cell">Leitor ativo, decifrador</div>
                <div className="comparison-cell">Leitor cúmplice, próximo</div>
              </div>
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
                <h3>1. Em que contexto surge o Concretismo?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Década de 1950, influenciado pelo capitalismo 
                  industrial, sociedade pós-moderna (fragmentação, multiplicidade), e 
                  desenvolvimento econômico (anos JK).
                </p>
              </div>

              <div className="exercise-item">
                <h3>2. Quais são os principais recursos do Concretismo?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Valorização da disposição gráfica das palavras, 
                  exploração poética do espaço da página, uso de estruturas semelhantes aos 
                  códigos de comunicação (cores, símbolos), e objetivo de criar percepção 
                  crítica da sociedade.
                </p>
              </div>

              <div className="exercise-item">
                <h3>3. Em que contexto surge a Poesia Marginal?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Década de 70, durante o auge da ditadura militar 
                  (censura, repressão, AI-5). Período dos "anos de chumbo" da ditadura brasileira.
                </p>
              </div>

              <div className="exercise-item">
                <h3>4. Quais são as características da Poesia Marginal?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Produção independente (geração mimeógrafo), 
                  circulação fora das grandes editoras, ligação com contracultura e movimento 
                  estudantil, linguagem coloquial e acessível, temas urbanos e cotidianos, 
                  humor, crítica social e política.
                </p>
              </div>

              <div className="exercise-item">
                <h3>5. Qual é a forma da Poesia Marginal?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> "Antipoesia", valorização da performance e da 
                  oralidade, rejeição ao academicismo, aproximação da música popular (MPB).
                </p>
              </div>

              <div className="exercise-item">
                <h3>6. Quem são os principais autores da Poesia Marginal?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Chacal, Cacaso, Ana Cristina César, Francisco Alvim 
                  e Paulo Leminski.
                </p>
              </div>

              <div className="exercise-item">
                <h3>7. Compare Concretismo e Poesia Marginal.</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Concretismo (anos 50): rigor formal, visual, 
                  experimental, editoras. Poesia Marginal (anos 70): liberdade formal, oral, 
                  coloquial, mimeógrafo. O Concretismo busca renovação estética radical; 
                  a Poesia Marginal busca democratização e acessibilidade. Ambos representam 
                  formas de resistência e inovação, mas em contextos e com estratégias diferentes.
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

export default MovimentosLiterariosPosteriores;

