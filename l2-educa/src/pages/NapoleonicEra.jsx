import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './NapoleonicEra.css';

const NapoleonicEra = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'brumario', title: '18 Brumário', icon: 'gavel' },
    { id: 'consulado', title: 'Consulado', icon: 'account_balance' },
    { id: 'imperio', title: 'Império', icon: 'military_tech' },
    { id: 'guerras', title: 'Campanhas', icon: 'campaign' },
    { id: 'queda', title: 'Queda', icon: 'trending_down' },
    { id: 'viena', title: 'Congresso de Viena', icon: 'groups' },
    { id: 'legado', title: 'Legado', icon: 'stars' },
    { id: 'fixacao', title: 'Fixação', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="napoleonic-era-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Intro */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Era Napoleônica (1799–1815)</h1>
            <p className="section-intro">
              Da Revolução ao Império: como <strong>Napoleão Bonaparte</strong> consolidou os ideais de 1789, conquistou a Europa e, paradoxalmente, restaurou a <strong>monarquia</strong> enquanto espalhava os princípios revolucionários. Do golpe do <strong>18 Brumário</strong> à derrota em <strong>Waterloo</strong>.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Quem Foi Napoleão Bonaparte?</h2>
            <ul className="content-list">
              <li>Nascido em <strong>1769</strong> na <strong>Córsega</strong> (recém-anexada pela França)</li>
              <li>Oficial de artilharia, destacou-se no <strong>cerco de Toulon</strong> (1793)</li>
              <li>Herói em <strong>13 Vendemiário</strong> (1795): reprimiu insurreição monarquista em Paris</li>
              <li><strong>Campanha da Itália</strong> (1796-1797): vitórias contra austríacos o tornaram celebridade nacional</li>
              <li><strong>Campanha do Egito</strong> (1798-1799): militarmente mista, mas reforçou imagem de conquistador</li>
              <li>Combinação de <strong>gênio militar</strong>, ambição política e carisma popular</li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* 18 Brumário */}
      <section id="brumario" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">O Golpe do 18 Brumário (9 novembro 1799)</h2>
            
            <div className="context-box">
              <h3><strong>Contexto</strong></h3>
              <ul>
                <li>O <strong>Diretório</strong> (1795-1799) estava em crise terminal: inflação, corrupção, instabilidade</li>
                <li>Ameaças de <strong>monarquistas</strong> (direita) e <strong>jacobinos</strong> (esquerda)</li>
                <li>Burguesia ansiava por <strong>ordem e estabilidade</strong> para proteger suas propriedades</li>
                <li>Dependência do exército para reprimir insurreições</li>
              </ul>
            </div>

            <div className="conspiracy-box">
              <h3><strong>A Conspiração</strong></h3>
              <p>
                O Abade <strong>Sieyès</strong> (um dos Diretores, teórico de 1789) planejou um golpe para criar um executivo forte. Precisava de uma <strong>"espada"</strong> – um general popular. Napoleão, retornando do Egito em outubro de 1799, era o candidato perfeito.
              </p>
            </div>

            <div className="execution-box">
              <h3><strong>Execução</strong></h3>
              <p>
                <strong>9 novembro 1799</strong> (18 Brumário, Ano VIII): Com apoio do exército, Napoleão invadiu as assembleias legislativas, dissolveu o <strong>Conselho dos Quinhentos</strong> e o <strong>Conselho dos Anciãos</strong>, e pôs fim ao Diretório.
              </p>
              <p className="quote">
                <em>"A Revolução está fixada nos princípios que a começaram: ela está acabada."</em> – Proclamação de Napoleão
              </p>
            </div>

            <div className="outcome-box">
              <h3><strong>Resultado</strong></h3>
              <p>
                Novo regime: o <strong>Consulado</strong>, teoricamente governado por três cônsules (Napoleão, Sieyès, Ducos). Na prática, Napoleão concentrou todo o poder, tornando-se <strong>Primeiro-Cônsul</strong>. O golpe marcou o <strong>fim da Revolução Francesa</strong>.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Consulado */}
      <section id="consulado" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Consulado (1799–1804): Consolidação e Reformas</h2>
            
            <div className="consulate-intro">
              <p>
                O Consulado foi o período de <strong>estabilização</strong> e <strong>institucionalização</strong> das conquistas revolucionárias. Napoleão buscava reconciliar a França, modernizar o Estado e consolidar seu próprio poder.
              </p>
            </div>

            <div className="reform-cards">
              <div className="reform-card code">
                <h3><strong>Código Civil Napoleônico (1804)</strong></h3>
                <p className="reform-subtitle">Sua realização mais duradoura</p>
                <div className="principles-box">
                  <p><strong>Princípios:</strong></p>
                  <ul>
                    <li><strong>Igualdade perante a lei</strong>: abolição definitiva de privilégios feudais</li>
                    <li><strong>Liberdade de consciência</strong> religiosa</li>
                    <li><strong>Direito à propriedade privada</strong> sagrado e inviolável</li>
                    <li><strong>Laicidade do Estado</strong>: casamento civil, divórcio permitido</li>
                    <li><strong>Unificação jurídica</strong>: substituiu 360+ sistemas legais locais</li>
                  </ul>
                </div>
                <div className="contradictions-box">
                  <p><strong>Contradições:</strong></p>
                  <ul>
                    <li><strong>Autoridade patriarcal</strong>: mulheres subordinadas aos maridos, sem direitos políticos</li>
                    <li><strong>Proibição de greves</strong> e sindicatos: proteção burguesa contra trabalhadores</li>
                    <li>Restaurou <strong>escravidão nas colônias</strong> (1802), revertendo abolição de 1794</li>
                  </ul>
                </div>
                <div className="impact-box">
                  <p><strong>Impacto:</strong></p>
                  <p>Exportado para territórios conquistados e copiado por dezenas de países. Base do direito civil de grande parte da Europa e América Latina até hoje.</p>
                </div>
              </div>

              <div className="reform-card concordat">
                <h3><strong>Concordata de 1801</strong></h3>
                <p className="reform-subtitle">Paz com a Igreja</p>
                <ul>
                  <li>Acordo com <strong>Papa Pio VII</strong></li>
                  <li>Reconheceu catolicismo como <strong>"religião da maioria dos franceses"</strong> (não religião de Estado)</li>
                  <li>Estado nomeava bispos, pagava clero (tornando-os funcionários públicos)</li>
                  <li><strong>Reconciliação nacional</strong>: acalmou oposição católica e monarquista</li>
                  <li>Manteve <strong>subordinação da Igreja ao Estado</strong></li>
                </ul>
              </div>

              <div className="reform-card admin">
                <h3><strong>Reformas Administrativas</strong></h3>
                <ul>
                  <li><strong>Centralização</strong>: departamentos sob controle de prefeitos nomeados</li>
                  <li><strong>Banco da França</strong> (1800): estabilizou moeda, financiamento público</li>
                  <li><strong>Liceus</strong>: escolas secundárias estatais, formação de elite</li>
                  <li><strong>Légion d'Honneur</strong> (1802): ordem de mérito baseada em serviço, não nascimento</li>
                  <li>Reforma tributária: coleta eficiente, fim da corrupção</li>
                </ul>
              </div>

              <div className="reform-card power">
                <h3><strong>Concentração de Poder</strong></h3>
                <ul>
                  <li><strong>Constituição do Ano VIII</strong>: poderes quase ditatoriais ao Primeiro-Cônsul</li>
                  <li><strong>Plebiscito de 1802</strong>: torna-se <strong>Cônsul vitalício</strong></li>
                  <li>Censura, polícia secreta, repressão a oposição</li>
                  <li><strong>2 dezembro 1804</strong>: coroação como <strong>Imperador dos Franceses</strong></li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Império */}
      <section id="imperio" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Primeiro Império (1804–1814/1815)</h2>
            
            <div className="coronation-box">
              <h3><strong>A Coroação (2 dezembro 1804)</strong></h3>
              <p>
                Na Catedral de Notre-Dame, Napoleão <strong>coroou a si mesmo</strong> na presença do Papa, simbolizando que seu poder vinha da nação, não de Deus. O gesto chocou a Europa monárquica mas consolidou a ideia de <strong>soberania popular</strong> combinada com governo forte.
              </p>
            </div>

            <div className="imperial-system">
              <h3><strong>Sistema Imperial</strong></h3>
              <ul className="content-list">
                <li><strong>Nova nobreza imperial</strong>: títulos baseados em mérito militar e serviço (não hereditários inicialmente)</li>
                <li><strong>Dinastia Bonaparte</strong>: familiares colocados em tronos europeus (irmãos reis da Espanha, Nápoles, Holanda)</li>
                <li><strong>Sistema Continental</strong>: bloqueio econômico contra a Grã-Bretanha</li>
                <li>França no auge: 130 departamentos, 44 milhões de habitantes</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Guerras */}
      <section id="guerras" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Guerras Napoleônicas: Conquista e Hegemonia</h2>
            
            <div className="wars-intro">
              <p>
                De 1803 a 1815, Napoleão travou uma série de guerras contra <strong>coalizões</strong> de potências europeias (Áustria, Prússia, Rússia, Grã-Bretanha). Suas vitórias estabeleceram a <strong>hegemonia francesa</strong> sobre o continente.
              </p>
            </div>

            <div className="battles-timeline">
              <h3><strong>Principais Batalhas e Campanhas</strong></h3>
              
              <div className="battle-card victory">
                <div className="battle-header">
                  <strong>Austerlitz (2 dez 1805)</strong>
                  <span className="battle-result victory-badge">Vitória Decisiva</span>
                </div>
                <p>
                  <strong>"Batalha dos Três Imperadores"</strong>: Napoleão derrota Áustria e Rússia. Considerada sua maior vitória tática. Fim da Terceira Coalizão. Tratado de Pressburg: <strong>dissolução do Sacro Império Romano-Germânico</strong> (1806).
                </p>
              </div>

              <div className="battle-card victory">
                <div className="battle-header">
                  <strong>Jena-Auerstedt (14 out 1806)</strong>
                  <span className="battle-result victory-badge">Vitória Esmagadora</span>
                </div>
                <p>
                  Destruição do exército prussiano em um dia. <strong>Ocupação de Berlim</strong>. Imposição do <strong>Sistema Continental</strong> (bloqueio à Grã-Bretanha).
                </p>
              </div>

              <div className="battle-card victory">
                <div className="battle-header">
                  <strong>Friedland (14 jun 1807)</strong>
                  <span className="battle-result victory-badge">Vitória</span>
                </div>
                <p>
                  Derrota da Rússia. <strong>Tratado de Tilsit</strong>: França e Rússia dividem Europa Oriental, Prússia humilhada. <strong>Apogeu do poder napoleônico</strong>.
                </p>
              </div>

              <div className="battle-card defeat">
                <div className="battle-header">
                  <strong>Guerra Peninsular (1808–1814)</strong>
                  <span className="battle-result defeat-badge">Desastre Prolongado</span>
                </div>
                <p>
                  Invasão da <strong>Espanha</strong> e <strong>Portugal</strong>. Guerrilha espanhola, apoio britânico (Wellington). <strong>"Úlcera espanhola"</strong>: sangrou 300.000 soldados franceses, desgaste moral e militar contínuo.
                </p>
              </div>

              <div className="battle-card defeat">
                <div className="battle-header">
                  <strong>Campanha da Rússia (1812)</strong>
                  <span className="battle-result defeat-badge">Catástrofe</span>
                </div>
                <p>
                  <strong>Grande Armée</strong>: 600.000 homens invadem a Rússia. <strong>Borodino</strong> (7 set): vitória pírrica, 70.000 baixas. <strong>Moscou</strong>: cidade incendiada, sem suprimentos. <strong>Retirada no inverno</strong>: apenas 100.000 sobrevivem. <strong>Ponto de virada</strong>: destruiu o mito da invencibilidade.
                </p>
              </div>

              <div className="battle-card defeat">
                <div className="battle-header">
                  <strong>Leipzig (16-19 out 1813)</strong>
                  <span className="battle-result defeat-badge">Derrota Decisiva</span>
                </div>
                <p>
                  <strong>"Batalha das Nações"</strong>: coalizão de Rússia, Prússia, Áustria, Suécia derrota Napoleão. Maior batalha das Guerras Napoleônicas (500.000+ combatentes). França perde Alemanha, recua para fronteiras nacionais.
                </p>
              </div>

              <div className="battle-card defeat">
                <div className="battle-header">
                  <strong>Waterloo (18 jun 1815)</strong>
                  <span className="battle-result defeat-badge">Derrota Final</span>
                </div>
                <p>
                  Após retorno de Elba (<strong>Cem Dias</strong>), Napoleão enfrenta Wellington (britânico) e Blücher (prussiano) na Bélgica. Derrota definitiva. Fim do Império Napoleônico. Exílio para <strong>Santa Helena</strong>.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Queda */}
      <section id="queda" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">A Queda do Império</h2>
            
            <div className="fall-timeline">
              <div className="fall-stage">
                <h3><strong>1. Campanha da Rússia (1812)</strong></h3>
                <p>
                  O desastre russo destruiu a <strong>Grande Armée</strong> e o prestígio de Napoleão. Encorajou inimigos derrotados a se rebelarem.
                </p>
              </div>

              <div className="fall-stage">
                <h3><strong>2. Guerra de Libertação (1813)</strong></h3>
                <p>
                  Prússia, Áustria, Rússia formam <strong>Sexta Coalizão</strong>. Batalha de Leipzig: Napoleão perde Alemanha e aliados. Recua para França.
                </p>
              </div>

              <div className="fall-stage">
                <h3><strong>3. Invasão da França (1814)</strong></h3>
                <p>
                  Coalizão invade França. Apesar de resistência brilhante de Napoleão, <strong>Paris capitula</strong> (31 março 1814). Marechais forçam sua abdicação.
                </p>
              </div>

              <div className="fall-stage">
                <h3><strong>4. Primeira Abdicação (6 abril 1814)</strong></h3>
                <p>
                  Napoleão abdica, exilado em <strong>Elba</strong> (ilha italiana). Bourbons restaurados: <strong>Luís XVIII</strong> rei da França. <strong>Tratado de Paris</strong>: França reduzida às fronteiras de 1792.
                </p>
              </div>

              <div className="fall-stage">
                <h3><strong>5. Os Cem Dias (março-junho 1815)</strong></h3>
                <p>
                  Napoleão <strong>escapa de Elba</strong> (26 fev 1815), desembarca na França (1 março). Sem disparar um tiro, retoma o poder – tropas enviadas para prendê-lo se juntam a ele. <strong>"Voo da Águia"</strong>: marcha triunfal até Paris (20 março). Luís XVIII foge.
                </p>
              </div>

              <div className="fall-stage">
                <h3><strong>6. Waterloo e Exílio Final (junho 1815)</strong></h3>
                <p>
                  Europa declara Napoleão <strong>"fora da lei"</strong>, forma Sétima Coalizão. <strong>18 junho 1815</strong>: derrota em Waterloo. Segunda abdicação (22 junho). Exílio em <strong>Santa Helena</strong> (ilha remota no Atlântico Sul), onde morre em <strong>5 maio 1821</strong>.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Congresso de Viena */}
      <section id="viena" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Congresso de Viena (1814-1815)</h2>
            
            <div className="congress-intro">
              <p>
                Após a derrota de Napoleão, as grandes potências europeias reuniram-se em Viena para <strong>redesenhar o mapa da Europa</strong> e restaurar a ordem anterior à Revolução.
              </p>
            </div>

            <div className="congress-leaders">
              <h3><strong>Principais Líderes</strong></h3>
              <ul className="content-list">
                <li><strong>Klemens von Metternich</strong> (Áustria): chanceler conservador, arquiteto do Congresso</li>
                <li><strong>Talleyrand</strong> (França): ex-ministro de Napoleão, hábil negociador que salvou França de punição severa</li>
                <li>Representantes de Rússia, Prússia, Grã-Bretanha</li>
              </ul>
            </div>

            <div className="congress-principles">
              <h3><strong>Princípios</strong></h3>
              <div className="principle-cards">
                <div className="principle-card">
                  <h4><strong>Legitimidade</strong></h4>
                  <p>Restauração de monarquias "legítimas" (dinastias pré-napoleônicas). Bourbons na França e Espanha.</p>
                </div>
                <div className="principle-card">
                  <h4><strong>Equilíbrio de Poder</strong></h4>
                  <p>Nenhuma potência pode dominar Europa. França contida mas não humilhada (para evitar vingança).</p>
                </div>
                <div className="principle-card">
                  <h4><strong>Compensação</strong></h4>
                  <p>Territórios redistribuídos entre vencedores. Rússia ganha Polônia, Prússia terras alemãs, Áustria domina Itália.</p>
                </div>
                <div className="principle-card">
                  <h4><strong>Contenção da Revolução</strong></h4>
                  <p><strong>Santa Aliança</strong> (Rússia, Áustria, Prússia): pacto para suprimir movimentos liberais e nacionalistas.</p>
                </div>
              </div>
            </div>

            <div className="congress-results">
              <h3><strong>Resultados</strong></h3>
              <ul className="content-list">
                <li><strong>Paz duradoura</strong>: evitou guerras gerais europeias por quase um século (até 1914)</li>
                <li><strong>Ordem conservadora</strong>: tentativa de "des-revolucionar" Europa</li>
                <li><strong>Nacionalismos reprimidos</strong>: mas não extintos – explodiriam em 1830, 1848</li>
                <li><strong>Redesenho territorial</strong>: criou ressentimentos (Polônia dividida, Itália fragmentada, Alemanha sem unidade)</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Legado */}
      <section id="legado" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">O Legado Contraditório de Napoleão</h2>
            
            <div className="legacy-intro">
              <p>
                Napoleão foi simultaneamente <strong>filho da Revolução</strong> e seu <strong>coveiro</strong>. Espalhou ideais iluministas enquanto estabelecia ditadura. Libertou povos do feudalismo enquanto os conquistava.
              </p>
            </div>

            <div className="legacy-grid">
              <div className="legacy-card positive">
                <h3><strong>Legado Positivo</strong></h3>
                <ul>
                  <li><strong>Código Civil</strong>: base jurídica de dezenas de países até hoje</li>
                  <li><strong>Fim do feudalismo</strong>: aboliu servidão, privilégios nas terras conquistadas</li>
                  <li><strong>Meritocracia</strong>: "carreiras abertas aos talentos", não ao nascimento</li>
                  <li><strong>Modernização administrativa</strong>: estado centralizado eficiente, modelo seguido</li>
                  <li><strong>Educação</strong>: liceus, universidades, foco em ciência e engenharia</li>
                  <li><strong>Nacionalismo</strong>: ao despertar resistência, ironicamente estimulou movimentos nacionais</li>
                </ul>
              </div>

              <div className="legacy-card negative">
                <h3><strong>Legado Negativo</strong></h3>
                <ul>
                  <li><strong>Ditadura</strong>: destruiu liberdades políticas conquistadas em 1789</li>
                  <li><strong>Guerras</strong>: 3-6 milhões de mortos, devastação continental</li>
                  <li><strong>Escravidão</strong>: restaurou nas colônias (1802), causou guerra no Haiti</li>
                  <li><strong>Censura</strong>: repressão à imprensa, arte, oposição</li>
                  <li><strong>Subordinação feminina</strong>: Código Civil retrocedeu direitos das mulheres</li>
                  <li><strong>Imperialismo</strong>: conquista brutal, exploração de territórios</li>
                </ul>
              </div>
            </div>

            <div className="legacy-international">
              <h3><strong>Impacto Internacional</strong></h3>
              <div className="impact-cards">
                <div className="impact-card">
                  <h4><strong>América Latina</strong></h4>
                  <p>Invasão da Espanha (1808) e deposição de Fernando VII criaram <strong>vácuo de poder</strong> que permitiu independência das colônias (1810-1825). Bolívar, San Martín lideraram libertação.</p>
                </div>
                <div className="impact-card">
                  <h4><strong>Nacionalismo Alemão</strong></h4>
                  <p>Ocupação francesa despertou sentimento nacional alemão. Dissolução do Sacro Império abriu caminho para <strong>unificação</strong> (1871 sob Prússia).</p>
                </div>
                <div className="impact-card">
                  <h4><strong>Nacionalismo Italiano</strong></h4>
                  <p>Napoleão unificou Itália pela primeira vez desde Roma. Após sua queda, movimento <strong>Risorgimento</strong> buscou unificação (alcançada 1861-1870).</p>
                </div>
                <div className="impact-card">
                  <h4><strong>Código Civil</strong></h4>
                  <p>Adotado ou imitado por: Bélgica, Holanda, Itália, Espanha, Portugal, América Latina, Egito, Japão (Meiji). Influência até hoje em <strong>sistemas de direito civil</strong> (vs. common law anglo-saxão).</p>
                </div>
              </div>
            </div>

            <div className="legacy-paradox">
              <h3><strong>O Grande Paradoxo</strong></h3>
              <p className="paradox-text">
                Napoleão consolidou e espalhou os princípios da <strong>Revolução Francesa</strong> (igualdade jurídica, meritocracia, laicidade, propriedade) enquanto destruía seus <strong>ideais políticos</strong> (liberdade, democracia, soberania popular deliberativa). Foi simultaneamente <strong>libertador</strong> (do feudalismo) e <strong>opressor</strong> (conquistador). Seu legado é inseparável desta contradição fundamental: a Revolução sobreviveu em suas instituições, mas morreu em seu espírito.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Fixação */}
      <section id="fixacao" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Fixação e Revisão</h2>
            <ol className="steps-list">
              <li>
                O que foi o <strong>18 Brumário</strong> e por que marca o fim da Revolução Francesa?
                <p className="answer"><em>Resposta: Golpe de Napoleão em 9 nov 1799 que dissolveu o Diretório e instaurou o Consulado, concentrando poder em suas mãos. Marca fim da revolução porque encerrou fase de transformações políticas populares e estabeleceu ditadura militar.</em></p>
              </li>
              <li>
                Quais os principais pontos do <strong>Código Civil Napoleônico</strong>?
                <p className="answer"><em>Resposta: Igualdade perante lei, propriedade privada sagrada, laicidade (casamento civil), liberdade de consciência, unificação jurídica. Mas também: autoridade patriarcal, subordinação feminina, proibição de greves.</em></p>
              </li>
              <li>
                Explique a importância da <strong>Concordata de 1801</strong>.
                <p className="answer"><em>Resposta: Acordo com Papa que reconciliou França com Igreja Católica após anos de conflito. Reconheceu catolicismo como religião majoritária mas manteve subordinação ao Estado (governo nomeia bispos, paga clero). Trouxe estabilidade social.</em></p>
              </li>
              <li>
                Por que a <strong>Campanha da Rússia (1812)</strong> foi decisiva?
                <p className="answer"><em>Resposta: Desastre militar (600.000 invadem, 100.000 retornam). Destruiu Grande Armée e mito de invencibilidade. Encorajou inimigos a formarem coalizão que derrotaria Napoleão definitivamente.</em></p>
              </li>
              <li>
                O que foram os <strong>Cem Dias</strong>?
                <p className="answer"><em>Resposta: Março-junho 1815. Napoleão escapa de Elba, retoma poder na França sem luta. Europa forma nova coalizão, derrota-o em Waterloo. Exílio final em Santa Helena.</em></p>
              </li>
              <li>
                Quais os princípios do <strong>Congresso de Viena</strong>?
                <p className="answer"><em>Resposta: Legitimidade (restaurar monarquias), equilíbrio de poder (conter França), compensação territorial (redistribuir conquistas), contenção da revolução (Santa Aliança). Trouxe paz por quase um século mas reprimiu nacionalismos.</em></p>
              </li>
              <li>
                Como Napoleão influenciou a independência da <strong>América Latina</strong>?
                <p className="answer"><em>Resposta: Invasão da Espanha (1808) e deposição do rei Fernando VII criaram vácuo de poder. Colônias formaram juntas autônomas que levaram à independência completa (1810-1825).</em></p>
              </li>
            </ol>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default NapoleonicEra;

