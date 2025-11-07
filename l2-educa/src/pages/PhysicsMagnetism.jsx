import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import InlineFormula from '../components/InlineFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import Footer from '../components/Footer';
import './PhysicsMagnetism.css';

const PhysicsMagnetism = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  useEffect(() => {
    const scaleFormulas = () => {
      if (window.innerWidth <= 768) {
        const containers = document.querySelectorAll('.physics-magnetism-container mjx-container');
        containers.forEach(container => {
          const parent = container.parentElement;
          if (parent) {
            const parentWidth = parent.offsetWidth;
            const containerWidth = container.scrollWidth;
            
            if (containerWidth > parentWidth * 1.2) {
              const scale = (parentWidth - 20) / containerWidth;
              container.style.transform = `scale(${Math.max(Math.min(scale, 1), 0.8)})`;
              container.style.transformOrigin = 'left center';
              container.style.marginBottom = `${(1 - scale) * 15}px`;
            } else {
              container.style.transform = 'none';
            }
          }
        });
      }
    };

    const timer = setTimeout(scaleFormulas, 500);
    window.addEventListener('resize', scaleFormulas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', scaleFormulas);
    };
  }, [expandedQuestion]);

  const exercises = [
    {
      id: 1,
      title: "Questão 1 (UNESP) - Campo Magnético e Bússolas",
      source: "UNESP",
      enunciado: "Um ímã em forma de barra, com seus polos Norte e Sul, é colocado sob uma superfície coberta com partículas de limalha de ferro, fazendo com que elas se alinhem segundo seu campo magnético. Se quatro pequenas bússolas, 1, 2, 3 e 4, forem colocadas em repouso nas posições indicadas na figura, no mesmo plano que contém a limalha, suas agulhas magnéticas orientam-se segundo as linhas do campo magnético criado pelo ímã.\n\nDesconsiderando o campo magnético terrestre e considerando que a agulha magnética de cada bússola seja representada por uma seta que se orienta na mesma direção e no mesmo sentido do vetor campo magnético associado ao ponto em que ela foi colocada, como as agulhas se orientam?",
      steps: [
        {
          title: "1. Conceito Fundamental",
          content: "Linhas de campo magnético têm uma direção definida:",
          details: [
            "As linhas SAEM do polo Norte (N)",
            "As linhas ENTRAM no polo Sul (S)",
            "A agulha de uma bússola se alinha tangente às linhas de campo",
            "A ponta Norte da bússola aponta na direção do campo"
          ]
        },
        {
          title: "2. Análise da Bússola 1",
          content: "Bússola posicionada próxima ao polo Norte do ímã:",
          details: [
            "Nesta região, as linhas saem do polo N",
            "As linhas se afastam do polo Norte",
            "A agulha aponta para longe do polo N",
            "Direção: afastando-se horizontalmente do Norte"
          ]
        },
        {
          title: "3. Análise da Bússola 2",
          content: "Bússola posicionada lateralmente ao ímã:",
          details: [
            "As linhas de campo fazem uma curva do N para o S",
            "A bússola se alinha tangente a essa curva",
            "A agulha aponta do Norte em direção ao Sul",
            "Forma um arco curvado entre os polos"
          ]
        },
        {
          title: "4. Análise da Bússola 3",
          content: "Bússola posicionada entre os polos:",
          details: [
            "Nesta região, as linhas vão diretamente de N para S",
            "A agulha se alinha horizontalmente",
            "Aponta do polo N em direção ao polo S",
            "Orientação aproximadamente horizontal"
          ]
        },
        {
          title: "5. Análise da Bússola 4",
          content: "Bússola próxima ao polo Sul:",
          details: [
            "As linhas convergem para o polo Sul",
            "A agulha aponta em direção ao polo S",
            "Direção: apontando para o polo Sul"
          ]
        },
        {
          title: "6. Princípio Geral",
          content: "Todas as bússolas seguem a regra: suas agulhas (polo Norte) apontam na direção em que o campo magnético aponta (de N para S do ímã)."
        }
      ],
      answer: "As agulhas se orientam tangentes às linhas de campo, apontando do polo Norte para o polo Sul do ímã."
    },
    {
      id: 2,
      title: "Questão 2 (IFSP) - Identificação de Ímãs",
      source: "IFSP",
      enunciado: "Um professor de Física mostra aos seus alunos 3 barras de metal AB, CD e EF que podem ou não estar magnetizadas. Com elas, faz três experiências:\n\n1ª) Aproxima A de C: atração\n2ª) Aproxima B de D: atração  \n3ª) Aproxima D de E: repulsão\n\nApós o experimento e admitindo que cada letra pode corresponder a um único polo magnético, os alunos concluíram que:",
      alternativas: [
        "a) somente a barra CD é ímã.",
        "b) somente as barras CD e EF são ímãs.",
        "c) somente as barras AB e EF são ímãs.",
        "d) somente as barras AB e CD são ímãs.",
        "e) AB, CD e EF são ímãs."
      ],
      steps: [
        {
          title: "1. Propriedades Magnéticas",
          content: "Relações entre ímãs e materiais ferromagnéticos:",
          details: [
            "Polos IGUAIS se repelem (N-N ou S-S)",
            "Polos DIFERENTES se atraem (N-S ou S-N)",
            "Um ímã SEMPRE atrai material ferromagnético não-magnetizado",
            "Material não-magnetizado NÃO repele nada"
          ]
        },
        {
          title: "2. Análise da 3ª Experiência",
          content: "D e E se repelem - informação crucial:",
          details: [
            "Repulsão só ocorre entre ímãs",
            "Logo, CD É um ímã",
            "E EF também É um ímã",
            "D e E são polos IGUAIS"
          ]
        },
        {
          title: "3. Análise das Experiências 1 e 2",
          content: "A atrai C, e B atrai D:",
          details: [
            "Sabemos que CD é ímã",
            "AB atrai ambas as extremidades de CD",
            "Se AB fosse ímã, uma extremidade deveria REPELIR",
            "Como há apenas atração, AB NÃO é ímã",
            "AB é apenas material ferromagnético"
          ]
        },
        {
          title: "4. Verificação",
          content: "Confirmando a conclusão:",
          details: [
            "CD é ímã: ✓ (repeliu EF)",
            "EF é ímã: ✓ (repeliu CD)",
            "AB não é ímã: ✓ (só atraiu, nunca repeliu)",
            "AB é apenas ferro não-magnetizado"
          ]
        }
      ],
      answer: "b) somente as barras CD e EF são ímãs."
    },
    {
      id: 3,
      title: "Questão 3 - Propriedades dos Ímãs",
      source: "Exercício Padrão",
      enunciado: "Leia as afirmações a seguir a respeito das propriedades dos ímãs:\n\nI – As linhas de campo magnético dentro de um ímã de barra dirigem-se de sul para norte.\nII – Não existe monopolo magnético.\nIII – Os materiais diamagnéticos são fracamente atraídos por ímãs.\nIV – Ferro, cobalto e alumínio são exemplos de materiais ferromagnéticos, que são fortemente atraídos por ímãs.\n\nÉ verdadeiro o que se afirma em:",
      alternativas: [
        "a) I e II",
        "b) II e III",
        "c) III e IV",
        "d) I e IV",
        "e) I e III"
      ],
      steps: [
        {
          title: "Afirmação I - VERDADEIRA",
          content: "Direção das linhas de campo DENTRO do ímã:",
          details: [
            "Fora do ímã: linhas vão de N → S",
            "Dentro do ímã: linhas vão de S → N",
            "As linhas formam circuitos fechados",
            "Elas são contínuas, sem começo ou fim",
            "Afirmação I está CORRETA ✓"
          ]
        },
        {
          title: "Afirmação II - VERDADEIRA",
          content: "Monopolos magnéticos não existem:",
          details: [
            "Monopolo seria um polo N ou S isolado",
            "Se quebrarmos um ímã, cada pedaço tem N e S",
            "Princípio da inseparabilidade dos polos",
            "Diferente da carga elétrica (que pode ser isolada)",
            "Afirmação II está CORRETA ✓"
          ]
        },
        {
          title: "Afirmação III - FALSA",
          content: "Materiais diamagnéticos são repelidos:",
          details: [
            "Diamagnéticos: REPELIDOS fracamente por ímãs",
            "Exemplos: água, cobre, ouro, carbono",
            "Não são atraídos, são REPELIDOS",
            "A afirmação diz 'atraídos', o que está errado",
            "Afirmação III está INCORRETA ✗"
          ]
        },
        {
          title: "Afirmação IV - FALSA",
          content: "Alumínio não é ferromagnético:",
          details: [
            "Ferromagnéticos: ferro, cobalto, níquel",
            "São fortemente atraídos por ímãs",
            "Alumínio é PARAMAGNÉTICO (fraca atração)",
            "Alumínio não é ferromagnético",
            "Afirmação IV está INCORRETA ✗"
          ]
        }
      ],
      answer: "a) I e II"
    },
    {
      id: 4,
      title: "Questão 4 - Ímã Quebrado",
      source: "Exercício Padrão",
      enunciado: "A imagem mostra um ímã permanente que foi quebrado ao meio. Sabendo que N e S representam, respectivamente, os polos norte e sul do ímã permanente, determine a polaridade dos pontos 1, 2, 3 e 4.",
      alternativas: [
        "a) 1-sul, 2-norte, 3-sul e 4-sul.",
        "b) 1-norte, 2-sul, 3-sul e 4-norte.",
        "c) 1-norte, 2-sul, 3-norte e 4-sul.",
        "d) 1-sul, 2-sul, 3-norte e 4-norte.",
        "e) 1-norte, 2-sul, 3-norte e 4-norte."
      ],
      steps: [
        {
          title: "1. Princípio da Inseparabilidade",
          content: "Lei fundamental do magnetismo:",
          details: [
            "É IMPOSSÍVEL isolar um polo magnético",
            "Todo ímã tem necessariamente polo Norte E polo Sul",
            "Ao quebrar um ímã, cada pedaço forma um novo ímã completo",
            "Cada pedaço terá seus próprios polos N e S"
          ]
        },
        {
          title: "2. Análise do Pedaço Superior",
          content: "Primeira metade do ímã original:",
          details: [
            "O ponto 1 mantém o polo Norte original",
            "Logo: 1 = Norte",
            "Como todo ímã precisa ter ambos os polos",
            "O ponto 2 (extremidade oposta) deve ser Sul",
            "Logo: 2 = Sul"
          ]
        },
        {
          title: "3. Análise do Pedaço Inferior",
          content: "Segunda metade do ímã original:",
          details: [
            "Se juntarmos os pedaços, 2 e 3 se tocarão",
            "O ponto 2 é Sul (da análise anterior)",
            "Para haver atração, polos devem ser opostos",
            "Logo: 3 = Norte (atrai o Sul do ponto 2)",
            "E consequentemente: 4 = Sul"
          ]
        },
        {
          title: "4. Verificação da Atração",
          content: "Os pedaços se atrairiam se reposicionados:",
          details: [
            "Ponto 2 (Sul) atrai ponto 3 (Norte) ✓",
            "A configuração faz sentido",
            "Cada pedaço é um ímã completo",
            "Configuração: 1-N, 2-S | 3-N, 4-S"
          ]
        },
        {
          title: "5. Conclusão",
          content: "A distribuição dos polos no ímã quebrado fica: N-S | N-S"
        }
      ],
      answer: "c) 1-norte, 2-sul, 3-norte e 4-sul."
    },
    {
      id: 5,
      title: "Questão 5 (ENEM) - Campo Magnético Terrestre",
      source: "ENEM",
      enunciado: "A bússola é um instrumento de orientação baseado no campo magnético terrestre. A agulha magnética da bússola aponta aproximadamente para o norte geográfico porque:",
      alternativas: [
        "a) o polo norte geográfico coincide com o polo norte magnético.",
        "b) o polo norte geográfico está próximo ao polo sul magnético terrestre.",
        "c) o polo sul geográfico está próximo ao polo sul magnético terrestre.",
        "d) o campo magnético terrestre é perpendicular ao eixo de rotação da Terra.",
        "e) a agulha magnética não sofre influência do campo magnético terrestre."
      ],
      steps: [
        {
          title: "1. Entendendo a Bússola",
          content: "Como funciona uma agulha magnética:",
          details: [
            "A agulha é um pequeno ímã móvel",
            "O polo Norte da agulha aponta para o norte geográfico",
            "Regra: polos OPOSTOS se atraem",
            "Logo, o norte geográfico deve ter um polo Sul magnético"
          ]
        },
        {
          title: "2. Campo Magnético Terrestre",
          content: "A Terra funciona como um grande ímã:",
          details: [
            "O campo é gerado no núcleo externo (ferro líquido)",
            "O eixo magnético está inclinado ~11° do eixo geográfico",
            "Polo Norte geográfico ≈ Polo Sul magnético",
            "Polo Sul geográfico ≈ Polo Norte magnético"
          ]
        },
        {
          title: "3. Por que a Bússola Aponta para o Norte?",
          content: "Aplicando o princípio de atração:",
          details: [
            "O polo Norte da agulha é atraído por polo Sul magnético",
            "O polo Sul magnético está próximo ao norte geográfico",
            "Por isso a agulha aponta para o norte geográfico",
            "Nota: Os nomes são invertidos propositalmente para facilitar navegação"
          ]
        },
        {
          title: "4. Curiosidade Histórica",
          content: "Por que essa convenção de nomes?",
          details: [
            "Historicamente, chamou-se de 'polo Norte' da agulha o lado que aponta ao norte",
            "Mas fisicamente, este polo Norte é atraído por um polo Sul magnético",
            "O 'polo Norte magnético terrestre' é na verdade um polo Sul magnético",
            "Confuso? Sim! Mas é convenção mantida por tradição"
          ]
        }
      ],
      answer: "b) o polo norte geográfico está próximo ao polo sul magnético terrestre."
    },
    {
      id: 6,
      title: "Questão 6 (VUNESP) - Força Magnética",
      source: "VUNESP",
      enunciado: "Uma partícula com carga elétrica q = 2 × 10⁻⁶ C move-se com velocidade v = 3 × 10⁴ m/s perpendicularmente a um campo magnético uniforme de intensidade B = 0,5 T. A força magnética que age sobre a partícula tem módulo, em newtons, de:",
      alternativas: [
        "a) 0,01",
        "b) 0,03",
        "c) 0,10",
        "d) 0,30",
        "e) 1,00"
      ],
      steps: [
        {
          title: "1. Força Magnética - Força de Lorentz",
          content: "Fórmula da força sobre carga em movimento:",
          details: [
            "$\\vec{F} = q \\vec{v} \\times \\vec{B}$",
            "Módulo: $F = q \\cdot v \\cdot B \\cdot \\sen(\\theta)$",
            "Onde $\\theta$ é o ângulo entre $\\vec{v}$ e $\\vec{B}$"
          ]
        },
        {
          title: "2. Dados do Problema",
          content: "Organizando as informações:",
          details: [
            "Carga: $q = 2 \\times 10^{-6}$ C",
            "Velocidade: $v = 3 \\times 10^4$ m/s",
            "Campo magnético: $B = 0,5$ T",
            "Movimento perpendicular: $\\theta = 90°$, logo $\\sen(90°) = 1$"
          ]
        },
        {
          title: "3. Cálculo da Força",
          content: "Aplicando a fórmula:",
          details: [
            "$F = q \\cdot v \\cdot B \\cdot \\sen(90°)$",
            "$F = 2 \\times 10^{-6} \\cdot 3 \\times 10^4 \\cdot 0,5 \\cdot 1$",
            "$F = 2 \\times 3 \\times 0,5 \\times 10^{-6} \\times 10^4$",
            "$F = 3 \\times 10^{-2}$ N",
            "$F = 0,03$ N"
          ]
        },
        {
          title: "4. Características da Força Magnética",
          content: "Propriedades importantes:",
          details: [
            "A força é perpendicular tanto a $\\vec{v}$ quanto a $\\vec{B}$",
            "Direção dada pela regra da mão direita",
            "A força não realiza trabalho (perpendicular ao movimento)",
            "Modifica apenas a direção da velocidade, não o módulo"
          ]
        }
      ],
      answer: "b) 0,03"
    },
    {
      id: 7,
      title: "Questão 7 (FUVEST) - Espectrômetro de Massa",
      source: "FUVEST",
      enunciado: "Em um espectrômetro de massa, íons de massa m e carga q são acelerados do repouso por uma diferença de potencial V e, em seguida, entram em uma região com campo magnético uniforme B, perpendicular à sua velocidade. Os íons descrevem uma trajetória circular de raio R. A razão massa/carga (m/q) do íon é dada por:",
      alternativas: [
        "a) $\\frac{B^2R^2}{2V}$",
        "b) $\\frac{BR^2}{2V}$",
        "c) $\\frac{B^2R}{2V}$",
        "d) $\\frac{2V}{B^2R^2}$",
        "e) $\\frac{V}{B^2R^2}$"
      ],
      steps: [
        {
          title: "1. Aceleração pela Diferença de Potencial",
          content: "Energia fornecida ao íon:",
          details: [
            "Trabalho elétrico: $W = q \\cdot V$",
            "Este trabalho vira energia cinética:",
            "$q \\cdot V = \\frac{m v^2}{2}$",
            "Isolando v: $v = \\sqrt{\\frac{2qV}{m}}$"
          ]
        },
        {
          title: "2. Movimento Circular no Campo Magnético",
          content: "A força magnética é a força centrípeta:",
          details: [
            "Força magnética: $F_{mag} = q \\cdot v \\cdot B$",
            "Força centrípeta: $F_{cp} = \\frac{m v^2}{R}$",
            "Igualando: $q \\cdot v \\cdot B = \\frac{m v^2}{R}$"
          ]
        },
        {
          title: "3. Simplificando",
          content: "Eliminando v da equação:",
          details: [
            "$q \\cdot B = \\frac{m v}{R}$",
            "$v = \\frac{q \\cdot B \\cdot R}{m}$"
          ]
        },
        {
          title: "4. Combinando as Equações",
          content: "Usando as duas expressões para v:",
          details: [
            "Da energia: $v = \\sqrt{\\frac{2qV}{m}}$",
            "Do movimento circular: $v = \\frac{qBR}{m}$",
            "Igualando: $\\sqrt{\\frac{2qV}{m}} = \\frac{qBR}{m}$"
          ]
        },
        {
          title: "5. Resolvendo para m/q",
          content: "Isolando a razão massa/carga:",
          details: [
            "Elevando ao quadrado: $\\frac{2qV}{m} = \\frac{q^2B^2R^2}{m^2}$",
            "$2qV \\cdot m = q^2B^2R^2$",
            "$\\frac{m}{q} = \\frac{qB^2R^2}{2V}$",
            "$\\frac{m}{q} = \\frac{B^2R^2}{2V}$"
          ]
        },
        {
          title: "6. Aplicação Prática",
          content: "Espectrômetros de massa permitem:",
          details: [
            "Determinar a massa de íons desconhecidos",
            "Separar isótopos de um mesmo elemento",
            "Identificar compostos químicos",
            "Medir abundância relativa de isótopos"
          ]
        }
      ],
      answer: "a) $\\frac{B^2R^2}{2V}$"
    },
    {
      id: 8,
      title: "Questão 8 - Campo Magnético de um Fio",
      source: "Exercício Avançado",
      enunciado: "Um fio retilíneo longo é percorrido por uma corrente elétrica de 10 A. Determine a intensidade do campo magnético a uma distância de 5 cm do fio. (Use μ₀ = 4π × 10⁻⁷ T·m/A)",
      steps: [
        {
          title: "1. Lei de Ampère para Fio Retilíneo",
          content: "Campo magnético gerado por corrente em fio reto:",
          details: [
            "$B = \\frac{\\mu_0 \\cdot i}{2\\pi \\cdot r}$",
            "Onde:",
            "$\\mu_0$ = permeabilidade magnética do vácuo",
            "$i$ = corrente elétrica",
            "$r$ = distância ao fio"
          ]
        },
        {
          title: "2. Dados do Problema",
          content: "Informações fornecidas:",
          details: [
            "$i = 10$ A",
            "$r = 5$ cm $= 0,05$ m",
            "$\\mu_0 = 4\\pi \\times 10^{-7}$ T·m/A"
          ]
        },
        {
          title: "3. Cálculo do Campo",
          content: "Substituindo na fórmula:",
          details: [
            "$B = \\frac{4\\pi \\times 10^{-7} \\times 10}{2\\pi \\times 0,05}$",
            "$B = \\frac{4 \\times 10^{-6}}{2 \\times 0,05}$",
            "$B = \\frac{4 \\times 10^{-6}}{0,1}$",
            "$B = 4 \\times 10^{-5}$ T",
            "$B = 40$ μT"
          ]
        },
        {
          title: "4. Direção do Campo - Regra da Mão Direita",
          content: "Determinando a orientação do campo:",
          details: [
            "Polegar aponta no sentido da corrente",
            "Dedos curvados indicam o sentido do campo",
            "O campo forma círculos concêntricos ao fio",
            "À medida que nos afastamos do fio, B diminui"
          ]
        },
        {
          title: "5. Observações Importantes",
          content: "Características do campo de um fio:",
          details: [
            "O campo é inversamente proporcional à distância: $B \\propto \\frac{1}{r}$",
            "Linhas de campo são circunferências concêntricas",
            "O campo é mais intenso próximo ao fio",
            "Campo magnético terrestre ≈ 50 μT (para comparação)"
          ]
        }
      ],
      answer: "B = 4 × 10⁻⁵ T ou 40 μT"
    }
  ];

  return (
    <div className="physics-magnetism-container">
      <MobileOrientationNotification />
      
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="material-icons">home</span>
          Terminal
        </Link>
        <span className="material-icons breadcrumb-separator">chevron_right</span>
        <Link to="/physics" className="breadcrumb-link">
          Física
        </Link>
        <span className="material-icons breadcrumb-separator">chevron_right</span>
        <span className="breadcrumb-current">Magnetismo</span>
      </div>

      <ScrollReveal>
        <div className="exercises-header">
          <div className="topic-badge">
            <span className="material-icons">radio_button_checked</span>
            MAGNETISMO E ÍMÃS
          </div>
          <h1 className="exercises-title">Magnetismo e Ímãs</h1>
          <p className="exercises-description">
            Explore o fascinante mundo do magnetismo com questões de ENEM, VUNESP e FUVEST. 
            Aprenda sobre propriedades dos ímãs, campo magnético, força magnética e aplicações práticas.
          </p>
          <div className="exercises-stats">
            <div className="stat-item">
              <span className="stat-number">{exercises.length}</span>
              <span className="stat-label">Questões</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">ENEM</span>
              <span className="stat-label">& Vestibulares</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Resolvidas</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="exercises-grid">
        {exercises.map((exercise, index) => (
          <ScrollReveal key={exercise.id} delay={index * 0.1}>
            <div className="exercise-card">
              <div className="exercise-header" onClick={() => toggleQuestion(index)}>
                <div className="exercise-title-section">
                  <h3 className="exercise-title">{exercise.title}</h3>
                  <span className="source-badge">{exercise.source}</span>
                </div>
                <button className="expand-button">
                  <span className="material-icons">
                    {expandedQuestion === index ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              </div>

              <div className="exercise-question">
                <p className="question-text">{exercise.enunciado}</p>
                {exercise.alternativas && (
                  <div className="alternatives-list">
                    {exercise.alternativas.map((alt, i) => (
                      <p key={i} className="alternative-item">{alt}</p>
                    ))}
                  </div>
                )}
              </div>

              {expandedQuestion === index && (
                <div className="exercise-solution">
                  <div className="solution-header">
                    <span className="material-icons">lightbulb</span>
                    <h4>Resolução Passo a Passo</h4>
                  </div>

                  {exercise.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="solution-step">
                      <h5 className="step-title">{step.title}</h5>
                      <p className="step-content">{step.content}</p>
                      {step.details && (
                        <ul className="step-details">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                              <InlineFormula text={detail} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="final-answer">
                    <span className="material-icons">check_circle</span>
                    <strong>Resposta:</strong> <InlineFormula text={exercise.answer} />
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PhysicsMagnetism;

