import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './FrenchRevolution.css';

const FrenchRevolution = () => {
  const sections = [
    { id: 'contexto', title: 'Contexto', icon: 'timeline' },
    { id: 'causas', title: 'Causas', icon: 'psychology' },
    { id: 'linha-do-tempo', title: 'Linha do Tempo', icon: 'schedule' },
    { id: 'fases', title: 'Fases', icon: 'layers' },
    { id: 'documentos', title: 'Documentos', icon: 'description' },
    { id: 'personagens', title: 'Personagens', icon: 'groups' },
    { id: 'consequencias', title: 'Consequências', icon: 'public' },
    { id: 'fixacao', title: 'Fixação', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="french-revolution-page">
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Contexto */}
      <section id="contexto" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Revolução Francesa (1789–1799)</h1>
            <p className="section-intro">
              Um dos marcos mais decisivos da história humana. A transformação que encerrou a <strong>Idade Moderna</strong> e inaugurou a <strong>Contemporaneidade</strong>, derrubando o <strong>Antigo Regime</strong> e criando um novo mundo político baseado em <strong>Liberté, Égalité, Fraternité</strong>.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Antigo Regime e Sociedade Estamental</h2>
            <p className="text-content">
              A França pré-revolucionária era dividida em <strong>três Estados</strong> (ordens), uma estrutura anacrônica herdada da Idade Média:
            </p>
            <div className="estates-grid">
              <div className="estate-card first-estate">
                <h3><strong>1º Estado: Clero</strong></h3>
                <p><strong>~100.000 pessoas</strong> (0,5% da população)</p>
                <ul>
                  <li>Detinha <strong>10% das terras</strong></li>
                  <li><strong>Isenção de impostos</strong></li>
                  <li>Alto clero (aristocrático) vs. baixo clero (pobre)</li>
                </ul>
              </div>
              <div className="estate-card second-estate">
                <h3><strong>2º Estado: Nobreza</strong></h3>
                <p><strong>~400.000 pessoas</strong> (menos de 2%)</p>
                <ul>
                  <li><strong>Privilégios</strong>: isenção fiscal, direitos senhoriais</li>
                  <li>Monopólio de altos cargos</li>
                  <li>Nobreza da espada vs. nobreza de toga</li>
                </ul>
              </div>
              <div className="estate-card third-estate">
                <h3><strong>3º Estado: O Resto</strong></h3>
                <p><strong>~26,5 milhões</strong> (97% da população)</p>
                <ul>
                  <li><strong>Burguesia</strong>: comerciantes, advogados, financistas</li>
                  <li><strong>Sans-culottes</strong>: trabalhadores urbanos, artesãos</li>
                  <li><strong>Campesinato</strong>: 80% da população (~23 milhões)</li>
                  <li>Pagavam <strong>todos os impostos</strong>, ficavam com apenas 20% do que produziam</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">A Crise Fiscal Terminal</h2>
            <p className="text-content">
              O Estado francês estava à beira da <strong>bancarrota</strong>:
            </p>
            <ul className="content-list">
              <li><strong>Dívida pública massiva</strong>: herança de guerras (Guerra dos Sete Anos, apoio à independência americana)</li>
              <li><strong>Sistema tributário disfuncional</strong>: clero e nobreza isentos, carga sobre o Terceiro Estado</li>
              <li><strong>Ferme Générale</strong>: arrendamento corrupto da coleta de impostos</li>
              <li><strong>Impostos odiados</strong>: <em>taille</em> (terra), <em>gabelle</em> (sal), <em>corvée</em> (trabalho forçado)</li>
              <li>Receita mal cobria os <strong>juros da dívida</strong></li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Causas */}
      <section id="causas" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Causas Estruturais</h2>
            <ul className="content-list">
              <li><strong>Contradição social</strong>: burguesia econômica vs. aristocracia política</li>
              <li><strong>Iluminismo</strong>: Montesquieu (separação de poderes), Voltaire (tolerância), Rousseau (soberania popular)</li>
              <li><strong>Privilégios insustentáveis</strong>: resistência da nobreza a reformas tributárias</li>
              <li><strong>Paralisia política</strong>: <em>Parlements</em> bloqueavam reformas</li>
            </ul>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Causas Imediatas (1788-1789)</h2>
            <ul className="content-list">
              <li><strong>Colheitas desastrosas</strong> (1788): inverno rigoroso, fome</li>
              <li><strong>Preço do pão</strong>: consumia 88% do salário de um trabalhador em 1789</li>
              <li><strong>Revolta Aristocrática</strong> (1787-1788): nobreza exige Estados Gerais</li>
              <li><strong>Convocação dos Estados Gerais</strong> (maio 1789): primeira reunião desde 1614</li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Linha do Tempo */}
      <section id="linha-do-tempo" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Cronologia dos Eventos-Chave</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date"><strong>5 maio 1789</strong></div>
                <div className="timeline-content">
                  <strong>Abertura dos Estados Gerais</strong> em Versalhes. Impasse sobre voto por ordem vs. voto por cabeça.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>17 junho 1789</strong></div>
                <div className="timeline-content">
                  Terceiro Estado declara-se <strong>Assembleia Nacional</strong> (Sieyès).
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>20 junho 1789</strong></div>
                <div className="timeline-content">
                  <strong>Juramento do Jogo da Péla</strong>: não dispersar até dar constituição à França.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>14 julho 1789</strong></div>
                <div className="timeline-content">
                  <strong>Queda da Bastilha</strong>: símbolo da revolução popular, salvou a Assembleia.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>4 agosto 1789</strong></div>
                <div className="timeline-content">
                  <strong>Abolição do feudalismo</strong>: fim de privilégios, dízimos, direitos senhoriais.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>26 agosto 1789</strong></div>
                <div className="timeline-content">
                  <strong>Declaração dos Direitos do Homem e do Cidadão</strong>: liberdade, igualdade, propriedade.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>5-6 outubro 1789</strong></div>
                <div className="timeline-content">
                  <strong>Marcha sobre Versalhes</strong>: mulheres forçam rei a ir para Paris.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>20-21 junho 1791</strong></div>
                <div className="timeline-content">
                  <strong>Fuga para Varennes</strong>: rei capturado tentando fugir, perde credibilidade.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>10 agosto 1792</strong></div>
                <div className="timeline-content">
                  <strong>Insurreição</strong>: derrubada da monarquia, família real aprisionada.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>21 setembro 1792</strong></div>
                <div className="timeline-content">
                  <strong>Proclamação da República</strong>: fim oficial da monarquia.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>21 janeiro 1793</strong></div>
                <div className="timeline-content">
                  <strong>Execução de Luís XVI</strong>: guilhotinado na Praça da Revolução.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>2 junho 1793</strong></div>
                <div className="timeline-content">
                  <strong>Queda dos Girondinos</strong>: Montanheses assumem o controle.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>1793-1794</strong></div>
                <div className="timeline-content">
                  <strong>O Terror</strong>: ~17.000 guilhotinados, repressão massiva sob Robespierre.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>27 julho 1794</strong></div>
                <div className="timeline-content">
                  <strong>9 Termidor</strong>: queda e execução de Robespierre, fim do Terror.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>1795-1799</strong></div>
                <div className="timeline-content">
                  <strong>Diretório</strong>: república burguesa instável, golpes frequentes.
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date"><strong>9 novembro 1799</strong></div>
                <div className="timeline-content">
                  <strong>18 Brumário</strong>: golpe de Napoleão, fim da Revolução.
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Fases */}
      <section id="fases" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Fases da Revolução</h2>
            <div className="phases-detailed">
              <div className="phase-card phase-1">
                <h3><strong>Monarquia Constitucional (1789–1792)</strong></h3>
                <p className="phase-subtitle">Assembleia Nacional Constituinte</p>
                <ul>
                  <li><strong>Reformas</strong>: abolição feudalismo, Declaração de Direitos, reorganização administrativa</li>
                  <li><strong>Constituição de 1791</strong>: separação de poderes, voto censitário</li>
                  <li><strong>Tensões</strong>: fuga do rei (Varennes), divisão política</li>
                  <li><strong>Grupos</strong>: Feuillants (moderados), Jacobinos (radicais)</li>
                </ul>
              </div>
              
              <div className="phase-card phase-2">
                <h3><strong>Convenção Nacional (1792–1795)</strong></h3>
                <p className="phase-subtitle">República Radical</p>
                <div className="sub-phases">
                  <div className="sub-phase">
                    <h4><strong>Girondinos (1792-1793)</strong></h4>
                    <p>Alta burguesia provinciana, federalistas, moderados economicamente</p>
                  </div>
                  <div className="sub-phase">
                    <h4><strong>Montanheses/Jacobinos (1793-1794)</strong></h4>
                    <p><strong>Comitê de Salvação Pública</strong>: Robespierre, Saint-Just, Danton</p>
                    <p><strong>O Terror</strong>: tribunal revolucionário, Lei dos Suspeitos, guilhotina</p>
                    <p><strong>Políticas</strong>: controle de preços (Lei do Máximo), descristianização, Calendário Revolucionário</p>
                  </div>
                  <div className="sub-phase">
                    <h4><strong>Termidorianos (1794-1795)</strong></h4>
                    <p>Reação ao Terror, Terror Branco, fechamento do Clube Jacobino</p>
                  </div>
                </div>
              </div>
              
              <div className="phase-card phase-3">
                <h3><strong>Diretório (1795–1799)</strong></h3>
                <p className="phase-subtitle">República Burguesa</p>
                <ul>
                  <li><strong>Constituição do Ano III</strong>: cinco diretores, duas câmaras, voto censitário restaurado</li>
                  <li><strong>Instabilidade crônica</strong>: golpes, inflação, corrupção</li>
                  <li><strong>Ameaças</strong>: monarquistas (direita), jacobinos e Conspiração dos Iguais/Babeuf (esquerda)</li>
                  <li><strong>Dependência militar</strong>: exército reprime insurreições, Napoleão emerge</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Documentos */}
      <section id="documentos" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Documentos Fundamentais</h2>
            
            <div className="document-box">
              <h3><strong>Declaração dos Direitos do Homem e do Cidadão (1789)</strong></h3>
              <p className="doc-intro">Documento fundador da nova ordem, inspirado no Iluminismo.</p>
              <div className="principles">
                <p><strong>Princípios-chave:</strong></p>
                <ul>
                  <li><strong>Artigo 1:</strong> "Os homens nascem e permanecem livres e iguais em direitos"</li>
                  <li><strong>Direitos naturais:</strong> liberdade, propriedade, segurança, resistência à opressão</li>
                  <li><strong>Soberania nacional:</strong> poder emana da nação</li>
                  <li><strong>Lei:</strong> expressão da vontade geral</li>
                  <li><strong>Limites:</strong> omissão de mulheres, escravos; ênfase burguesa na propriedade</li>
                </ul>
              </div>
            </div>

            <div className="document-box">
              <h3><strong>Constituição de 1791</strong></h3>
              <ul>
                <li><strong>Monarquia constitucional</strong>: rei com veto suspensivo</li>
                <li><strong>Separação de poderes</strong> (Montesquieu)</li>
                <li><strong>Voto censitário</strong>: cidadãos "ativos" vs. "passivos"</li>
              </ul>
            </div>

            <div className="document-box">
              <h3><strong>Declaração dos Direitos da Mulher e da Cidadã (1791)</strong></h3>
              <p>Por <strong>Olympe de Gouges</strong>: denúncia da exclusão das mulheres, demanda de igualdade política e jurídica.</p>
            </div>

            <div className="document-box">
              <h3><strong>Constituição de 1793</strong></h3>
              <p><strong>Sufrágio universal masculino</strong>, mais democrática, mas suspensa durante o Terror.</p>
            </div>

            <div className="document-box">
              <h3><strong>Constituição do Ano III (1795)</strong></h3>
              <p>Institui o <strong>Diretório</strong>, restaura voto censitário, limita poder popular.</p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Personagens */}
      <section id="personagens" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Personagens Centrais</h2>
            <div className="people-detailed-grid">
              <div className="person-detailed">
                <h4><strong>Luís XVI</strong></h4>
                <p>Rei indeciso, tentou fugir (Varennes), executado em <strong>21 jan 1793</strong>.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Maria Antonieta</strong></h4>
                <p>Rainha, símbolo do desperdício aristocrático, executada em <strong>out 1793</strong>.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Emmanuel Sieyès</strong></h4>
                <p>Autor de <em>"O que é o Terceiro Estado?"</em>, teórico da soberania nacional.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Marquês de La Fayette</strong></h4>
                <p>General moderado, comandante da Guarda Nacional, herói das duas revoluções.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Georges Danton</strong></h4>
                <p>Líder revolucionário, fundador dos Cordeliers, executado por Robespierre em <strong>1794</strong>.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Jean-Paul Marat</strong></h4>
                <p>Jornalista radical (<em>L'Ami du Peuple</em>), assassinado por Charlotte Corday em <strong>jul 1793</strong>.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Maximilien Robespierre</strong></h4>
                <p><strong>"O Incorruptível"</strong>: líder jacobino, arquiteto do Terror, executado em <strong>28 jul 1794</strong> (9 Termidor).</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Louis de Saint-Just</strong></h4>
                <p>"Anjo do Terror", aliado de Robespierre, executado junto com ele.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Olympe de Gouges</strong></h4>
                <p>Feminista, autora da Declaração dos Direitos da Mulher, executada em <strong>1793</strong>.</p>
              </div>
              <div className="person-detailed">
                <h4><strong>Napoleão Bonaparte</strong></h4>
                <p>General, salvador da República (13 Vendemiário), golpista do <strong>18 Brumário</strong>.</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Consequências */}
      <section id="consequencias" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Legado e Consequências</h2>
            
            <div className="consequences-grid">
              <div className="consequence-card political">
                <h3><strong>Políticas</strong></h3>
                <ul>
                  <li>Fim do <strong>absolutismo</strong> e privilégios feudais</li>
                  <li>Conceitos: <strong>soberania popular, cidadania, direitos humanos</strong></li>
                  <li>Espectro político: <strong>esquerda vs. direita</strong> (da disposição na Assembleia)</li>
                  <li>Modelo de <strong>revolução popular</strong></li>
                </ul>
              </div>
              
              <div className="consequence-card social">
                <h3><strong>Sociais</strong></h3>
                <ul>
                  <li><strong>Igualdade jurídica</strong> (fim da sociedade estamental)</li>
                  <li>Ascensão da <strong>burguesia</strong></li>
                  <li>Secularização: <strong>separação Igreja-Estado</strong></li>
                  <li>Debate sobre direitos das mulheres iniciado</li>
                </ul>
              </div>
              
              <div className="consequence-card economic">
                <h3><strong>Econômicas</strong></h3>
                <ul>
                  <li>Abolição de restrições feudais ao comércio</li>
                  <li>Proteção da <strong>propriedade privada</strong></li>
                  <li>Liberalismo econômico</li>
                  <li>Redistribuição de terras (bens nacionais)</li>
                </ul>
              </div>
              
              <div className="consequence-card international">
                <h3><strong>Internacionais</strong></h3>
                <ul>
                  <li><strong>Guerras Revolucionárias</strong>: França vs. coalizões europeias</li>
                  <li><strong>Revolução Haitiana</strong> (1791-1804): única revolta escrava bem-sucedida</li>
                  <li><strong>Independência América Latina</strong>: inspiração e vácuo de poder (invasão napoleônica da Espanha)</li>
                  <li><strong>Nacionalismo moderno</strong>: "nação em armas"</li>
                  <li>Difusão de ideais iluministas pela Europa</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Debates Historiográficos</h2>
            <div className="historiography-boxes">
              <div className="interpretation-box marxist">
                <h3><strong>Interpretação Marxista/Clássica</strong></h3>
                <p><em>Georges Lefebvre, Albert Soboul</em></p>
                <p><strong>Revolução burguesa</strong>: luta de classes, transição feudalismo → capitalismo, burguesia derruba aristocracia.</p>
              </div>
              
              <div className="interpretation-box revisionist">
                <h3><strong>Interpretação Revisionista/Liberal</strong></h3>
                <p><em>Alfred Cobban, François Furet</em></p>
                <p>Não foi luta de classes (nobreza + burguesia já formavam elite mista). Fenômeno <strong>político-ideológico</strong>. Tese da <strong>"derrapagem"</strong> (dérapage): revolução liberal de 1789 desviada pelo Terror, prenúncio de totalitarismos.</p>
              </div>
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
                Explique a estrutura dos <strong>três Estados</strong> do Antigo Regime e por que ela era insustentável.
                <p className="answer"><em>Resposta: 1º Estado (clero, 0,5%), 2º Estado (nobreza, 2%), 3º Estado (97%) pagava todos impostos mas não tinha poder político; burguesia economicamente forte mas excluída politicamente.</em></p>
              </li>
              <li>
                Qual a importância da <strong>Queda da Bastilha</strong> (14 julho 1789)?
                <p className="answer"><em>Resposta: Símbolo da queda do despotismo, salvou a Assembleia Nacional da repressão militar real, marcou intervenção popular decisiva.</em></p>
              </li>
              <li>
                Diferencie <strong>Girondinos</strong> e <strong>Montanheses</strong>.
                <p className="answer"><em>Resposta: Girondinos (alta burguesia, federalistas, moderados) vs. Montanheses (jacobinos, centralizadores, radicais, controle de preços).</em></p>
              </li>
              <li>
                O que foi o <strong>Terror</strong> e quem o liderou?
                <p className="answer"><em>Resposta: 1793-1794, governo de exceção sob Robespierre e Comitê de Salvação Pública, ~17.000 guilhotinados, repressão massiva contra "inimigos da Revolução".</em></p>
              </li>
              <li>
                Qual o significado do <strong>9 Termidor</strong>?
                <p className="answer"><em>Resposta: 27 julho 1794, queda e execução de Robespierre, fim do Terror, início da Reação Termidoriana.</em></p>
              </li>
              <li>
                Como a Revolução Francesa influenciou a <strong>América Latina</strong>?
                <p className="answer"><em>Resposta: Difusão de ideais iluministas e republicanos; invasão napoleônica da Espanha (1808) criou vácuo de poder que levou à independência das colônias.</em></p>
              </li>
            </ol>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default FrenchRevolution;
