import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './ModernismoPortugues.css';

const ModernismoPortugues = () => {
  const sections = [
    { id: 'contexto', title: 'Contexto Histórico', icon: 'timeline' },
    { id: 'resumo-rapido', title: 'Resumo Rápido', icon: 'flash_on' },
    { id: 'orpheu', title: 'Revista Orpheu', icon: 'book' },
    { id: 'sa-carneiro', title: 'Mário de Sá-Carneiro', icon: 'person' },
    { id: 'pessoa-ortonimo', title: 'Fernando Pessoa (Ortônimo)', icon: 'face' },
    { id: 'caeiro', title: 'Alberto Caeiro', icon: 'nature' },
    { id: 'citacoes', title: 'Citações Importantes', icon: 'format_quote' },
    { id: 'fixacao', title: 'Fixação', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="modernismo-portugues-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Contexto */}
      <section id="contexto" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Modernismo Português</h1>
            <p className="section-intro">
              O Modernismo Português marca uma ruptura radical com as formas tradicionais da literatura, 
              iniciando-se com a <strong>Revista Orpheu</strong> em 1915 e tendo como figura central 
              <strong>Fernando Pessoa</strong> e seus heterônimos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Contexto Histórico e Cultural</h2>
            <p className="text-content">
              O início do século XX em Portugal foi marcado por profundas transformações:
            </p>
            <ul className="content-list">
              <li><strong>Crise política</strong>: Fim da monarquia (1910) e instauração da República</li>
              <li><strong>Questionamento dos valores tradicionais</strong>: Busca por uma identidade cultural moderna</li>
              <li><strong>Influências europeias</strong>: Futurismo italiano, Surrealismo francês</li>
              <li><strong>Superação do Saudosismo</strong>: Movimento a ir além da nostalgia do passado glorioso</li>
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
                  <h3>Marco Inicial</h3>
                  <p>Revista Orpheu (1915) - ruptura com a tradição</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">psychology</span>
                <div className="summary-content">
                  <h3>Tema Central</h3>
                  <p>Fragmentação da identidade e o drama do "eu"</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">groups</span>
                <div className="summary-content">
                  <h3>Figuras Principais</h3>
                  <p>Fernando Pessoa, Mário de Sá-Carneiro, Almada Negreiros</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon material-icons">auto_awesome</span>
                <div className="summary-content">
                  <h3>Inovação</h3>
                  <p>Criação de heterônimos como multiplicação do "eu"</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Revista Orpheu */}
      <section id="orpheu" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">
              <span className="material-icons">book</span>
              Revista Orpheu (1915)
            </h2>
            <p className="text-content">
              A <strong>Revista Orpheu</strong> é considerada o marco inaugural do Modernismo Português, 
              publicada em dois números em 1915.
            </p>
            <div className="highlight-box">
              <h3>Características da Orpheu</h3>
              <ul className="content-list">
                <li><strong>Ruptura formal</strong>: Quebra com as formas tradicionais de composição poética</li>
                <li><strong>Escândalo cultural</strong>: Causou polêmica na sociedade conservadora portuguesa</li>
                <li><strong>Superação do Saudosismo</strong>: Ir além da mera nostalgia do passado glorioso</li>
                <li><strong>Experimentação linguística</strong>: Uso inovador da linguagem e das formas</li>
                <li><strong>Colaboradores principais</strong>: Fernando Pessoa, Mário de Sá-Carneiro, Almada Negreiros</li>
              </ul>
            </div>
            <p className="text-content">
              A revista representou o desejo de modernizar a cultura portuguesa e alinhá-la com as 
              vanguardas europeias, especialmente o Futurismo e o Sensacionismo.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Mário de Sá-Carneiro */}
      <section id="sa-carneiro" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">person</span>
              <div>
                <h2 className="subsection-title">Mário de Sá-Carneiro</h2>
                <p className="author-dates">(1890-1916)</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Biografia e Contexto</h3>
              <p className="text-content">
                Poeta e escritor português, amigo próximo de Fernando Pessoa. Viveu grande parte de sua 
                vida em Paris, onde teve contato direto com as vanguardas europeias. Suicidou-se aos 26 anos.
              </p>

              <div className="highlight-box">
                <h3>Temas e Características</h3>
                <ul className="content-list">
                  <li><strong>Fragmentação da identidade</strong>: O "eu" dividido, múltiplo e contraditório</li>
                  <li><strong>Drama do "eu" no século XX</strong>: Crise existencial do indivíduo moderno</li>
                  <li><strong>Sensacionismo</strong>: Valorização das sensações e da subjetividade</li>
                  <li><strong>Poeta-Orfeu</strong>: Aquele que tem visão genial, mas se inicia "preso no 'eu' e 'morre'"</li>
                  <li><strong>Angústia existencial</strong>: Sentimento de inadequação e incapacidade de ser</li>
                </ul>
              </div>

              <h3>Obras Principais</h3>
              <ul className="content-list">
                <li><strong>"Dispersão"</strong> (1914) - Poesia que explora a fragmentação do eu</li>
                <li><strong>"Céu em Fogo"</strong> (1915) - Prosa poética experimental</li>
                <li><strong>"A Confissão de Lúcio"</strong> (1914) - Novela que aborda identidade e duplicidade</li>
                <li><strong>Associação ao "Ultimatum Futurista"</strong> - Manifesto de ruptura</li>
              </ul>

              <div className="concept-box">
                <h3>Conceito-Chave: O Poeta-Orfeu</h3>
                <p className="text-content">
                  Sá-Carneiro desenvolve a ideia do "poeta-Orfeu", aquele que, como o personagem mitológico, 
                  desce aos abismos da consciência em busca de algo perdido. Porém, ao contrário de Orfeu, 
                  ele nasce "preso no 'eu'" e não consegue transcender sua própria fragmentação, 
                  terminando por "morrer" nessa busca.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Fernando Pessoa (Ortônimo) */}
      <section id="pessoa-ortonimo" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card">
            <div className="author-header">
              <span className="material-icons author-icon">face</span>
              <div>
                <h2 className="subsection-title">Fernando Pessoa (Ortônimo)</h2>
                <p className="author-dates">(1888-1935)</p>
              </div>
            </div>

            <div className="author-content">
              <h3>Quem é o Ortônimo?</h3>
              <p className="text-content">
                O <strong>ortônimo</strong> é o próprio Fernando Pessoa escrevendo sob seu nome real, 
                em contraste com seus heterônimos (personalidades literárias distintas). O Pessoa ortônimo 
                é marcado pela <strong>fragmentação do "eu"</strong> e pela consciência dessa multiplicidade.
              </p>

              <div className="highlight-box">
                <h3>Características do Ortônimo</h3>
                <ul className="content-list">
                  <li><strong>Fragmentação do "eu"</strong>: A identidade como algo múltiplo e instável</li>
                  <li><strong>Convivência do fragmento</strong>: Aceitação da multiplicidade do ser</li>
                  <li><strong>Consciência da cisão</strong>: Percepção clara da própria fragmentação</li>
                  <li><strong>Linguagem complexa</strong>: Uso de paradoxos e contradições</li>
                  <li><strong>Metalinguagem</strong>: Reflexão sobre o próprio ato de escrever</li>
                </ul>
              </div>

              <h3>Temas Centrais</h3>
              
              <div className="theme-card">
                <h4><span className="material-icons">explore</span> O Destino e o Sebastianismo</h4>
                <p className="text-content">
                  Pessoa explora o <strong>mito do "Encoberto"</strong>, figura messiânica ligada ao 
                  Sebastianismo (crença no retorno de D. Sebastião). Representa a esperança de um 
                  destino glorioso para Portugal.
                </p>
              </div>

              <div className="theme-card">
                <h4><span className="material-icons">sailing</span> Os Portugueses e o Mar</h4>
                <p className="text-content">
                  Em <strong>"Mensagem"</strong> (1934), sua única obra publicada em vida, Pessoa 
                  celebra a epopeia dos Descobrimentos, ligando a identidade portuguesa ao mar e 
                  à expansão marítima.
                </p>
              </div>

              <div className="quote-box large">
                <span className="material-icons quote-icon">format_quote</span>
                <p className="quote-text">
                  "Tudo vale a pena se a alma não é pequena."
                </p>
                <p className="quote-author">— Fernando Pessoa, "Mensagem"</p>
                <div className="quote-explanation">
                  <p>
                    Citação emblemática que sintetiza a visão de Pessoa sobre o destino português: 
                    os sacrifícios da expansão marítima se justificam pela grandeza da alma e do 
                    empreendimento espiritual.
                  </p>
                </div>
              </div>

              <h3>Obras Principais (Ortônimo)</h3>
              <ul className="content-list">
                <li><strong>"Mensagem"</strong> (1934) - Épico moderno sobre a história de Portugal</li>
                <li><strong>Poesias ortônimas</strong> - Publicadas postumamente em "Cancioneiro"</li>
                <li><strong>"Livro do Desassossego"</strong> - Prosa fragmentária (semi-heterônimo Bernardo Soares)</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Alberto Caeiro */}
      <section id="caeiro" className="page-section">
        <ScrollReveal>
          <GlassCard className="author-card heteronimo-card">
            <div className="author-header">
              <span className="material-icons author-icon">nature</span>
              <div>
                <h2 className="subsection-title">Alberto Caeiro</h2>
                <p className="author-dates">(Heterônimo de Fernando Pessoa)</p>
              </div>
            </div>

            <div className="author-content">
              <h3>O Mestre dos Heterônimos</h3>
              <p className="text-content">
                Alberto Caeiro é considerado o <strong>"mestre"</strong> dos outros heterônimos 
                (Ricardo Reis e Álvaro de Campos), tendo influência sobre ambos. Representa a 
                tentativa de uma visão objetiva e simples da realidade.
              </p>

              <div className="highlight-box">
                <h3>Características de Caeiro</h3>
                <ul className="content-list">
                  <li><strong>Homem do campo</strong>: Vida simples, próxima à natureza</li>
                  <li><strong>"Guardador de rebanhos"</strong>: Símbolo de sua conexão com o natural</li>
                  <li><strong>Poesia objetiva</strong>: Busca ver as coisas "como elas são"</li>
                  <li><strong>Rejeição à metafísica</strong>: Nega o pensamento filosófico e abstrato</li>
                  <li><strong>Aparente simplicidade</strong>: Linguagem direta, mas filosoficamente complexa</li>
                </ul>
              </div>

              <div className="concept-box">
                <h3>A Multiplicidade de Identidade</h3>
                <p className="text-content">
                  Caeiro reflete a <strong>multiplicidade de identidade</strong> de Pessoa e a angústia 
                  do <strong>"desdobramento do eu"</strong>. Embora pareça simples e direto, Caeiro 
                  representa uma filosofia complexa que questiona a própria natureza da percepção e da 
                  existência.
                </p>
              </div>

              <h3>Poesia Interior e Objetividade</h3>
              <p className="text-content">
                Caeiro busca uma <strong>"poesia interior"</strong> que seja, paradoxalmente, totalmente 
                objetiva. Ele tenta ver sem interpretar, sentir sem pensar, ser sem questionar. Essa 
                postura filosófica é, em si mesma, profundamente sofisticada.
              </p>

              <div className="philosophy-box">
                <h4>A Filosofia de Caeiro</h4>
                <ul className="content-list">
                  <li><strong>Sensacionismo puro</strong>: As coisas existem apenas enquanto sensações</li>
                  <li><strong>Anti-pensamento</strong>: "Pensar é estar doente dos olhos"</li>
                  <li><strong>Paganismo natural</strong>: Retorno a uma visão pré-cristã da natureza</li>
                  <li><strong>Complexidade na simplicidade</strong>: A aparente ingenuidade esconde profundidade filosófica</li>
                </ul>
              </div>

              <h3>Obras Principais</h3>
              <ul className="content-list">
                <li><strong>"O Guardador de Rebanhos"</strong> (1911-1912) - Poesia bucólica e filosófica</li>
                <li><strong>"O Pastor Amoroso"</strong> (1914) - Poemas de amor simples</li>
                <li><strong>"Poemas Inconjuntos"</strong> - Poesias não reunidas em livro específico</li>
              </ul>

              <div className="insight-box">
                <h4>Por que Caeiro é o "Mestre"?</h4>
                <p className="text-content">
                  Caeiro é o mestre porque representa o grau zero da consciência reflexiva, a pura 
                  sensação sem o peso do pensamento. Os outros heterônimos (Reis e Campos) partem 
                  dessa base e adicionam suas próprias complexidades: Reis adiciona a forma clássica 
                  e o estoicismo; Campos adiciona o futurismo e a angústia moderna.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Citações Importantes */}
      <section id="citacoes" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">
              <span className="material-icons">format_quote</span>
              Citações Importantes
            </h2>

            <div className="quotes-grid">
              <div className="quote-box">
                <span className="material-icons quote-icon">format_quote</span>
                <p className="quote-text">
                  "Tudo vale a pena se a alma não é pequena."
                </p>
                <p className="quote-author">— Fernando Pessoa, "Mensagem"</p>
              </div>

              <div className="quote-box">
                <span className="material-icons quote-icon">format_quote</span>
                <p className="quote-text">
                  "Não sou nada. Nunca serei nada. Não posso querer ser nada. À parte isso, 
                  tenho em mim todos os sonhos do mundo."
                </p>
                <p className="quote-author">— Fernando Pessoa (Álvaro de Campos)</p>
              </div>

              <div className="quote-box">
                <span className="material-icons quote-icon">format_quote</span>
                <p className="quote-text">
                  "Pensar é estar doente dos olhos."
                </p>
                <p className="quote-author">— Alberto Caeiro</p>
              </div>

              <div className="quote-box">
                <span className="material-icons quote-icon">format_quote</span>
                <p className="quote-text">
                  "Perdi-me dentro de mim / Porque eu era labirinto."
                </p>
                <p className="quote-author">— Mário de Sá-Carneiro, "Dispersão"</p>
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
                <h3>1. Qual é o marco inicial do Modernismo Português?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> A Revista Orpheu, publicada em 1915, que promoveu a 
                  ruptura com as formas tradicionais e superou o Saudosismo.
                </p>
              </div>

              <div className="exercise-item">
                <h3>2. Explique o conceito de "poeta-Orfeu" em Mário de Sá-Carneiro.</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> O "poeta-Orfeu" é aquele que possui visão genial mas 
                  nasce "preso no 'eu'" e acaba por "morrer" nessa fragmentação, sem conseguir 
                  transcender sua própria multiplicidade identitária.
                </p>
              </div>

              <div className="exercise-item">
                <h3>3. Qual é o tema central do Fernando Pessoa ortônimo?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> A fragmentação do "eu" e a convivência dos fragmentos. 
                  Pessoa explora também o destino português, o mito do Encoberto e a relação dos 
                  portugueses com o mar.
                </p>
              </div>

              <div className="exercise-item">
                <h3>4. Por que Alberto Caeiro é considerado o "mestre" dos heterônimos?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Caeiro representa o grau zero da reflexão, a pura 
                  objetividade sensorial. Os outros heterônimos (Ricardo Reis e Álvaro de Campos) 
                  partem dessa base e adicionam suas complexidades próprias.
                </p>
              </div>

              <div className="exercise-item">
                <h3>5. Qual é a aparente contradição na poesia de Alberto Caeiro?</h3>
                <p className="exercise-answer">
                  <strong>Resposta:</strong> Apesar da aparente simplicidade (linguagem direta, 
                  temas bucólicos), Caeiro possui profunda complexidade filosófica, representando 
                  uma sofisticada crítica à metafísica e ao pensamento abstrato.
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

export default ModernismoPortugues;

