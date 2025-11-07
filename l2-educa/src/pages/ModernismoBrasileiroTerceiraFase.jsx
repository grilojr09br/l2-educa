import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './ModernismoBrasileiroTerceiraFase.css';

const ModernismoBrasileiroTerceiraFase = () => {
  const sections = [
    { id: 'contexto', title: 'Contexto Histórico', icon: 'timeline' },
    { id: 'resumo-rapido', title: 'Resumo Rápido', icon: 'flash_on' },
    { id: 'caracteristicas', title: 'Características Gerais', icon: 'fact_check' },
    { id: 'joao-cabral', title: 'João Cabral de Melo Neto', icon: 'architecture' },
    { id: 'guimaraes', title: 'Guimarães Rosa', icon: 'landscape' },
    { id: 'clarice', title: 'Clarice Lispector', icon: 'favorite_border' },
    { id: 'fixacao', title: 'Fixação', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="modernismo-terceira-fase-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Contexto */}
      <section id="contexto" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Modernismo Brasileiro - 3ª Fase</h1>
            <p className="section-subtitle">Geração de 45</p>
            <p className="section-intro">
              A terceira fase do Modernismo Brasileiro apresenta um <strong>retorno à regra formal</strong> 
              e uma <strong>linguagem mais objetiva</strong>, em contraste com o experimentalismo das 
              fases anteriores. É marcada pela busca da perfeição formal e pela universalização dos temas.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Contexto Histórico</h2>
            <ul className="content-list">
              <li><strong>Fim do Estado Novo</strong> (1945): Queda de Getúlio Vargas e redemocratização</li>
              <li><strong>Pós-Segunda Guerra Mundial</strong>: Reflexão sobre humanidade e existência</li>
              <li><strong>Desenvolvimentismo</strong>: Anos JK (1956-1961), modernização do Brasil</li>
              <li><strong>Guerra Fria</strong>: Tensão ideológica entre capitalismo e socialismo</li>
              <li><strong>Existencialismo</strong>: Influência filosófica europeia (Sartre, Camus)</li>
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
                  <p>1945-1978 (até surgimento da Poesia Marginal)</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">edit</span>
                <div className="summary-content">
                  <h3>Forma</h3>
                  <p>Retorno à regra formal, estrutura rigorosa</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">language</span>
                <div className="summary-content">
                  <h3>Linguagem</h3>
                  <p>Objetiva, impessoal, contida</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">public</span>
                <div className="summary-content">
                  <h3>Temas</h3>
                  <p>Universais: tempo, morte, linguagem</p>
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
              Características Gerais da 3ª Fase
            </h2>

            <div className="characteristics-grid">
              <div className="characteristic-card">
                <h3><span className="material-icons">rule</span> Retorno à Regra Formal</h3>
                <p>Valorização da estrutura do poema (arte-conceito). Rigor formal e arquitetura 
                textual planejada, em contraste com o verso livre da fase anterior.</p>
              </div>

              <div className="characteristic-card">
                <h3><span className="material-icons">workspace_premium</span> Linguagem Objetiva</h3>
                <p>Estilo impessoal e contido. Afastamento do sentimentalismo em favor da precisão 
                e da clareza expressiva.</p>
              </div>

              <div className="characteristic-card">
                <h3><span className="material-icons">explore</span> Temas Universais</h3>
                <p>Reflexão sobre tempo, morte, linguagem e existência humana. Transcendência do 
                particular para o universal.</p>
              </div>

              <div className="characteristic-card">
                <h3><span className="material-icons">campaign</span> Poesia Social</h3>
                <p>Apesar do rigor formal, mantém-se a crítica social e a oposição ao sistema, mas 
                de forma mais contida e elaborada.</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* João Cabral de Melo Neto */}
      <section id="joao-cabral" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card main-author">
            <div className="author-header">
              <span className="material-icons author-icon">architecture</span>
              <div>
                <h2 className="subsection-title">João Cabral de Melo Neto</h2>
                <p className="author-dates">(1920-1999)</p>
                <p className="author-subtitle">Principal nome da Geração de 45</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Perfil do Poeta</h3>
              <p className="text-content">
                João Cabral é considerado o <strong>poeta da anti-sentimentalidade</strong> e da 
                <strong>razão concreta</strong>. Sua poesia é marcada pelo rigor construtivo e pela 
                recusa ao sentimentalismo, criando uma <strong>poesia de denúncia sem ornamentos sentimentais</strong>.
              </p>

              <div className="highlight-box">
                <h3>Características do Estilo Cabralino</h3>
                <ul className="content-list">
                  <li><strong>Anti-sentimentalidade</strong>: Recusa do lirismo tradicional e do sentimentalismo</li>
                  <li><strong>Razão concreta</strong>: Poesia construída pela razão, não pela emoção</li>
                  <li><strong>Linguagem seca</strong>: Estilo descritivo, objetivo e impessoal</li>
                  <li><strong>Denúncia social</strong>: Crítica à miséria sem apelo emocional fácil</li>
                  <li><strong>Arquitetura textual</strong>: Poemas como construções rigorosas</li>
                </ul>
              </div>

              <h3>Obras Principais</h3>
              <ul className="content-list">
                <li><strong>"Pedra do Sono"</strong> (1942) - Estreia, ainda com influências surrealistas</li>
                <li><strong>"O Engenheiro"</strong> (1945) - Definição do estilo "construtivo"</li>
                <li><strong>"O Cão sem Plumas"</strong> (1950) - Marco da poesia social despojada</li>
                <li><strong>"Morte e Vida Severina"</strong> (1955) - Auto de Natal nordestino</li>
                <li><strong>"A Educação pela Pedra"</strong> (1966) - Maturidade poética</li>
              </ul>

              <div className="major-work-section">
                <h3><span className="material-icons">star</span> Análise: "O Cão sem Plumas" (1950)</h3>
                
                <div className="work-context">
                  <h4>Contexto da Obra</h4>
                  <p className="text-content">
                    "O Cão sem Plumas" é um longo poema que retrata o <strong>Rio Capibaribe</strong> 
                    (rio que corta Recife) como <strong>metáfora da degradação social</strong>. 
                    É uma poesia da vida social, completamente despojada de lirismo tradicional.
                  </p>
                </div>

                <div className="themes-section">
                  <h4>Temas Principais</h4>
                  <div className="theme-cards-grid">
                    <div className="theme-mini-card">
                      <span className="material-icons">warning</span>
                      <p><strong>Miséria</strong></p>
                    </div>
                    <div className="theme-mini-card">
                      <span className="material-icons">person_off</span>
                      <p><strong>Exclusão</strong></p>
                    </div>
                    <div className="theme-mini-card">
                      <span className="material-icons">sick</span>
                      <p><strong>Insalubridade</strong></p>
                    </div>
                    <div className="theme-mini-card">
                      <span className="material-icons">volume_off</span>
                      <p><strong>Silêncio</strong></p>
                    </div>
                    <div className="theme-mini-card">
                      <span className="material-icons">campaign</span>
                      <p><strong>Denúncia Social</strong></p>
                    </div>
                  </div>
                </div>

                <div className="analysis-box">
                  <h4>Personagem Principal: Rio Capibaribe</h4>
                  <p className="text-content">
                    O rio não é apenas cenário, mas <strong>personagem central</strong> que representa 
                    a própria miséria nordestina. Um "cão sem plumas" - despojado de beleza, reduzido 
                    à funcionalidade mínima, símbolo da desumanização.
                  </p>
                </div>

                <div className="structure-box">
                  <h4>Estrutura: Epopeia da Miséria</h4>
                  <p className="text-content">
                    João Cabral constrói uma <strong>"epopeia da miséria"</strong>, usando a forma 
                    épica tradicional não para celebrar heróis, mas para denunciar a condição dos 
                    excluídos. É um anti-épico que eleva os marginalizados à condição de protagonistas.
                  </p>
                </div>

                <div className="quote-section">
                  <h4>Trecho Emblemático</h4>
                  <div className="poem-excerpt">
                    <p><em>
                      "A cidade é passada pelo rio<br/>
                      como uma rua<br/>
                      é passada por um cachorro;<br/>
                      uma fruta<br/>
                      por uma espada."
                    </em></p>
                  </div>
                  <p className="quote-analysis">
                    Note a comparação seca, objetiva, quase brutal. O rio "passa" pela cidade como 
                    um cão passa por uma rua - imagem de abandono, de presença ignorada.
                  </p>
                </div>
              </div>

              <div className="concept-box">
                <h3>Conceito-Chave: Poesia Construtiva</h3>
                <p className="text-content">
                  João Cabral concebe a poesia como <strong>construção</strong>, não como inspiração. 
                  O poema é resultado de trabalho intelectual rigoroso, cada palavra pesada e medida. 
                  Comparação frequente: o poeta como engenheiro ou arquiteto da linguagem.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Guimarães Rosa */}
      <section id="guimaraes" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">landscape</span>
              <div>
                <h2 className="subsection-title">Guimarães Rosa</h2>
                <p className="author-dates">(1908-1967)</p>
                <p className="author-subtitle">Melhor Romancista do Modernismo Brasileiro</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Perfil do Autor</h3>
              <p className="text-content">
                João Guimarães Rosa é considerado o <strong>melhor romancista do Modernismo Brasileiro</strong>, 
                revolucionando a prosa com sua linguagem inovadora e profundidade filosófica.
              </p>

              <div className="highlight-box">
                <h3>Características Principais</h3>
                <ul className="content-list">
                  <li><strong>Regionalismo + Psicologia</strong>: Combina o sertão brasileiro com questões existenciais universais</li>
                  <li><strong>Relação com o metafísico</strong>: Busca tratar do "ser" e sua dimensão transcendente</li>
                  <li><strong>Fluxo de consciência</strong>: Técnica narrativa que expõe o pensamento em seu fluxo natural</li>
                  <li><strong>Invenção linguística</strong>: Criação de neologismos e reinvenção do português</li>
                  <li><strong>Universalização do regional</strong>: O sertão como metáfora da condição humana</li>
                </ul>
              </div>

              <h3>Obras Principais</h3>
              <ul className="content-list">
                <li><strong>"Sagarana"</strong> (1946) - Contos que revolucionam a prosa regionalista</li>
                <li><strong>"Grande Sertão: Veredas"</strong> (1956) - Obra-prima da literatura brasileira</li>
                <li><strong>"Corpo de Baile"</strong> (1956) - Novelas poéticas do sertão</li>
                <li><strong>"Primeiras Estórias"</strong> (1962) - Contos filosóficos e existenciais</li>
              </ul>

              <div className="concept-box">
                <h3>O Ser e o Metafísico</h3>
                <p className="text-content">
                  Guimarães Rosa busca tratar do <strong>"ser"</strong> em sua relação conflituosa com 
                  o <strong>metafísico</strong>. Suas narrativas transcendem o realismo regionalista 
                  para explorar questões fundamentais: Quem somos? O que é o bem e o mal? Existe destino 
                  ou livre-arbítrio?
                </p>
              </div>

              <div className="language-box">
                <h4>Inovação Linguística</h4>
                <p className="text-content">
                  Rosa inventa uma língua própria, misturando:
                </p>
                <ul className="content-list">
                  <li>Arcaísmos (palavras antigas do português)</li>
                  <li>Neologismos (criação de novas palavras)</li>
                  <li>Sintaxe regional (estrutura frasal do sertão)</li>
                  <li>Etimologias (origem das palavras)</li>
                  <li>Sons e ritmos da fala sertaneja</li>
                </ul>
                <p className="text-content">
                  Exemplo: <em>"Nonada. Tiros que o senhor ouviu foram de briga de homem não."</em> 
                  (abertura de "Grande Sertão: Veredas")
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Clarice Lispector */}
      <section id="clarice" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">favorite_border</span>
              <div>
                <h2 className="subsection-title">Clarice Lispector</h2>
                <p className="author-dates">(1920-1977)</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Perfil da Autora</h3>
              <p className="text-content">
                Clarice Lispector revolucionou a prosa brasileira com sua escrita introspectiva e 
                filosófica, explorando a consciência humana com profundidade inédita.
              </p>

              <div className="highlight-box">
                <h3>Características Principais</h3>
                <ul className="content-list">
                  <li><strong>Fluxo de consciência</strong>: Narração que segue o pensamento em tempo real</li>
                  <li><strong>Introspecção profunda</strong>: Mergulho na psique e na subjetividade</li>
                  <li><strong>Linguagem poética</strong>: Prosa com qualidade lírica</li>
                  <li><strong>Existencialismo</strong>: Questões sobre ser, existir, identidade</li>
                  <li><strong>Epifania</strong>: Momentos de revelação súbita da verdade</li>
                </ul>
              </div>

              <h3>Obra de Estreia</h3>
              <div className="work-highlight">
                <h4><span className="material-icons">auto_stories</span> "Perto do Coração Selvagem" (1943)</h4>
                <p className="text-content">
                  Romance de estreia que causou impacto imediato pela inovação formal. Narra a 
                  trajetória interior de Joana, explorando sua consciência desde a infância até a 
                  vida adulta.
                </p>
                <p className="text-content">
                  O título vem de James Joyce ("Portrait of the Artist as a Young Man"), e a obra 
                  mostra clara influência do escritor irlandês no uso do fluxo de consciência.
                </p>
              </div>

              <h3>Outras Obras Importantes</h3>
              <ul className="content-list">
                <li><strong>"A Paixão Segundo G.H."</strong> (1964) - Monólogo interior filosófico</li>
                <li><strong>"A Hora da Estrela"</strong> (1977) - Última obra, sobre Macabéa</li>
                <li><strong>"Laços de Família"</strong> (1960) - Contos sobre relações humanas</li>
                <li><strong>"Água Viva"</strong> (1973) - Prosa experimental</li>
              </ul>

              <div className="concept-box">
                <h3>Linguagem Poética e Temores</h3>
                <p className="text-content">
                  Clarice utiliza uma <strong>linguagem poética</strong> que busca 
                  <strong>"falar de seus temores"</strong> - medos existenciais, angústias da 
                  consciência, o terror da liberdade e da responsabilidade de ser.
                </p>
                <p className="text-content">
                  Sua prosa não conta histórias no sentido tradicional; ela <strong>investiga</strong> 
                  a experiência de estar vivo, de ser consciente.
                </p>
              </div>

              <div className="theme-grid">
                <div className="theme-box">
                  <h4><span className="material-icons">psychology</span> Introspecção</h4>
                  <p>Exploração profunda dos estados interiores da consciência.</p>
                </div>

                <div className="theme-box">
                  <h4><span className="material-icons">lightbulb</span> Epifania</h4>
                  <p>Momentos de súbita revelação sobre a natureza da existência.</p>
                </div>

                <div className="theme-box">
                  <h4><span className="material-icons">face</span> Identidade Feminina</h4>
                  <p>Questões sobre ser mulher, feminilidade, papéis sociais.</p>
                </div>

                <div className="theme-box">
                  <h4><span className="material-icons">alarm</span> Tempo e Memória</h4>
                  <p>O tempo subjetivo, não cronológico, da consciência.</p>
                </div>
              </div>

              <div className="style-box">
                <h4>Estilo Narrativo</h4>
                <p className="text-content">
                  Clarice abandona o enredo linear em favor de uma narrativa que acompanha o 
                  <strong>pensamento em sua forma natural</strong>: fragmentada, associativa, 
                  cheia de digressões e retornos. O leitor é convidado a entrar na mente da 
                  personagem e experimentar sua consciência.
                </p>
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
                <h3>1. Quais são as características gerais da Geração de 45?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Retorno à regra formal e à estrutura do poema (arte-conceito), 
                  linguagem objetiva, impessoal e contida, temas universais (tempo, morte, linguagem), 
                  e poesia social em oposição ao sistema.
                </p>
              </div>

              <div className="exercise-item">
                <h3>2. Por que João Cabral de Melo Neto é chamado de "poeta da anti-sentimentalidade"?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Porque sua poesia é marcada pela razão concreta e pela 
                  recusa ao sentimentalismo. Sua linguagem é seca, descritiva e impessoal, criando 
                  uma poesia de denúncia sem ornamentos sentimentais.
                </p>
              </div>

              <div className="exercise-item">
                <h3>3. Analise "O Cão sem Plumas" de João Cabral.</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> É uma poesia da vida social despojada de lirismo. 
                  O Rio Capibaribe é usado como metáfora da degradação social. Temas: miséria, 
                  exclusão, insalubridade, silêncio e denúncia social. Estrutura: "Epopeia da Miséria".
                </p>
              </div>

              <div className="exercise-item">
                <h3>4. O que caracteriza a obra de Guimarães Rosa?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Combinação de regionalismo e psicologia, busca por 
                  tratar do "ser" e sua relação conflituosa com o metafísico, uso do fluxo de 
                  consciência, e inovação linguística radical com criação de neologismos e reinvenção 
                  do português.
                </p>
              </div>

              <div className="exercise-item">
                <h3>5. Qual é a obra de estreia de Clarice Lispector?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> "Perto do Coração Selvagem" (1943), romance que 
                  revolucionou a prosa brasileira com uso de fluxo de consciência e introspecção profunda.
                </p>
              </div>

              <div className="exercise-item">
                <h3>6. O que caracteriza o estilo de Clarice Lispector?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Uso de fluxo de consciência, introspecção profunda, 
                  linguagem poética que busca "falar de seus temores", exploração de questões 
                  existenciais, e momentos de epifania (revelação súbita).
                </p>
              </div>

              <div className="exercise-item">
                <h3>7. Compare João Cabral, Guimarães Rosa e Clarice Lispector.</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> João Cabral: poesia objetiva, anti-sentimental, denúncia 
                  social com rigor formal. Guimarães Rosa: prosa regionalista universalizada, inovação 
                  linguística, questões metafísicas. Clarice Lispector: prosa introspectiva, fluxo de 
                  consciência, existencialismo. Todos três renovam suas respectivas áreas (poesia e prosa) 
                  e elevam a literatura brasileira a novo patamar.
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

export default ModernismoBrasileiroTerceiraFase;

