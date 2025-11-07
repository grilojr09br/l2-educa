import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import InlineFormula from '../components/InlineFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import Footer from '../components/Footer';
import './PhysicsSphericalMirrors.css';

const PhysicsSphericalMirrors = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  useEffect(() => {
    const scaleFormulas = () => {
      if (window.innerWidth <= 768) {
        const containers = document.querySelectorAll('.physics-spherical-mirrors-container mjx-container');
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
      title: "Questão 1 (ENEM 2024) - Mirascópio 3D",
      source: "ENEM 2024",
      enunciado: "O mirascópio é um dispositivo óptico constituído por dois espelhos esféricos côncavos de mesmo raio de curvatura. Um objeto é colocado embaixo do espelho inferior, sobre seu centro de curvatura. A imagem desse objeto se forma acima da abertura do espelho superior e fica flutuando no ar. A natureza da imagem formada e a distância vertical entre cada ponto-objeto e seu correspondente ponto-imagem são:",
      alternativas: [
        "a) real e igual ao raio de curvatura.",
        "b) real e igual ao dobro do raio de curvatura.",
        "c) virtual e igual ao raio de curvatura.",
        "d) virtual e igual ao dobro do raio de curvatura.",
        "e) real e igual à metade do raio de curvatura."
      ],
      steps: [
        {
          title: "1. Entendendo o Mirascópio",
          content: "Como funciona este dispositivo fascinante:",
          details: [
            "Dois espelhos côncavos idênticos, face a face",
            "Objeto colocado no centro de curvatura (C) do espelho inferior",
            "Os espelhos formam duas reflexões sucessivas",
            "Cria ilusão de holograma flutuando"
          ]
        },
        {
          title: "2. Primeira Reflexão - Espelho Inferior",
          content: "Objeto no centro de curvatura:",
          details: [
            "Objeto está em $p = R$ (raio de curvatura)",
            "Para espelho côncavo, foco: $f = \\frac{R}{2}$",
            "Equação de Gauss: $\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
            "$\\frac{1}{R/2} = \\frac{1}{R} + \\frac{1}{p'}$",
            "$\\frac{2}{R} = \\frac{1}{R} + \\frac{1}{p'}$",
            "$\\frac{1}{p'} = \\frac{1}{R}$, logo $p' = R$",
            "Imagem real, invertida, mesmo tamanho, no centro C"
          ]
        },
        {
          title: "3. Segunda Reflexão - Espelho Superior",
          content: "A imagem do primeiro espelho vira objeto do segundo:",
          details: [
            "Esta imagem também está no centro C do espelho superior",
            "Mesma situação: objeto em C",
            "Forma nova imagem em C do espelho superior",
            "Imagem real, direita (duas inversões = direita)"
          ]
        },
        {
          title: "4. Distância Total",
          content: "Do objeto original até a imagem final:",
          details: [
            "Objeto no centro C do espelho inferior",
            "Imagem final no centro C do espelho superior",
            "Se os espelhos estão separados por altura $h$",
            "E sabemos que $C$ está a $R$ do vértice",
            "Distância vertical = $2R$"
          ]
        },
        {
          title: "5. Natureza da Imagem Final",
          content: "A imagem é REAL:",
          details: [
            "Pode ser projetada em uma tela",
            "Raios de luz realmente convergem",
            "Por isso parece flutuar no ar",
            "É uma imagem tridimensional observável de vários ângulos"
          ]
        }
      ],
      answer: "b) real e igual ao dobro do raio de curvatura."
    },
    {
      id: 2,
      title: "Questão 2 (VUNESP) - Espelho Côncavo",
      source: "VUNESP",
      enunciado: "Um objeto está a 30 cm de um espelho côncavo de distância focal 10 cm. A distância da imagem ao espelho e o aumento linear são, respectivamente:",
      alternativas: [
        "a) 15 cm e 0,5",
        "b) 15 cm e -0,5",
        "c) 20 cm e 2,0",
        "d) 20 cm e -2,0",
        "e) 60 cm e -2,0"
      ],
      steps: [
        {
          title: "1. Dados do Problema",
          content: "Informações fornecidas:",
          details: [
            "Distância do objeto: $p = 30$ cm",
            "Distância focal: $f = 10$ cm",
            "Espelho côncavo: $f > 0$",
            "Procuramos: $p'$ e $A$"
          ]
        },
        {
          title: "2. Equação de Gauss",
          content: "Relaciona objeto, imagem e foco:",
          details: [
            "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
            "$\\frac{1}{10} = \\frac{1}{30} + \\frac{1}{p'}$",
            "$\\frac{1}{p'} = \\frac{1}{10} - \\frac{1}{30}$",
            "$\\frac{1}{p'} = \\frac{3 - 1}{30} = \\frac{2}{30} = \\frac{1}{15}$",
            "$p' = 15$ cm"
          ]
        },
        {
          title: "3. Aumento Linear",
          content: "Relação entre tamanhos e distâncias:",
          details: [
            "$A = -\\frac{p'}{p}$",
            "$A = -\\frac{15}{30}$",
            "$A = -0,5$"
          ]
        },
        {
          title: "4. Interpretação do Resultado",
          content: "Características da imagem:",
          details: [
            "$p' = 15$ cm positivo → imagem REAL",
            "$A = -0,5$ negativo → imagem INVERTIDA",
            "$|A| = 0,5$ → imagem tem METADE do tamanho do objeto",
            "$|A| < 1$ → imagem MENOR que o objeto"
          ]
        },
        {
          title: "5. Diagrama de Raios",
          content: "Verificação gráfica:",
          details: [
            "Objeto está além do centro C ($p > 2f$)",
            "Imagem se forma entre F e C",
            "Imagem é real, invertida e menor",
            "Usado em telescópios refletores"
          ]
        }
      ],
      answer: "b) 15 cm e -0,5"
    },
    {
      id: 3,
      title: "Questão 3 (FUVEST) - Espelho Convexo",
      source: "FUVEST",
      enunciado: "Um espelho convexo tem raio de curvatura de 40 cm. Um objeto de 10 cm de altura é colocado a 60 cm do espelho. A altura da imagem vale:",
      alternativas: [
        "a) 2,5 cm",
        "b) 5,0 cm",
        "c) 7,5 cm",
        "d) 10 cm",
        "e) 15 cm"
      ],
      steps: [
        {
          title: "1. Convenção de Sinais",
          content: "Para espelho CONVEXO:",
          details: [
            "Raio de curvatura: $R = -40$ cm (negativo!)",
            "Distância focal: $f = \\frac{R}{2} = -20$ cm",
            "Distância do objeto: $p = 60$ cm (positivo)",
            "Altura do objeto: $h = 10$ cm"
          ]
        },
        {
          title: "2. Posição da Imagem",
          content: "Usando a equação de Gauss:",
          details: [
            "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
            "$\\frac{1}{-20} = \\frac{1}{60} + \\frac{1}{p'}$",
            "$\\frac{1}{p'} = -\\frac{1}{20} - \\frac{1}{60}$",
            "$\\frac{1}{p'} = \\frac{-3 - 1}{60} = -\\frac{4}{60} = -\\frac{1}{15}$",
            "$p' = -15$ cm (negativo = virtual)"
          ]
        },
        {
          title: "3. Aumento Linear",
          content: "Calculando o aumento:",
          details: [
            "$A = -\\frac{p'}{p} = -\\frac{(-15)}{60}$",
            "$A = \\frac{15}{60} = 0,25$"
          ]
        },
        {
          title: "4. Altura da Imagem",
          content: "Aplicando o aumento:",
          details: [
            "$A = \\frac{h'}{h}$",
            "$0,25 = \\frac{h'}{10}$",
            "$h' = 0,25 \\times 10$",
            "$h' = 2,5$ cm"
          ]
        },
        {
          title: "5. Características da Imagem",
          content: "Propriedades de espelhos convexos:",
          details: [
            "$p' < 0$ → imagem VIRTUAL",
            "$A > 0$ → imagem DIREITA",
            "$|A| < 1$ → imagem MENOR que objeto",
            "Espelhos convexos SEMPRE formam imagens virtuais, direitas e menores",
            "Usados em retrovisores (campo de visão amplo)"
          ]
        }
      ],
      answer: "a) 2,5 cm"
    },
    {
      id: 4,
      title: "Questão 4 (ENEM) - Refletor Parabólico",
      source: "ENEM",
      enunciado: "Refletores parabólicos são utilizados em telescópios, antenas e faróis. Uma fonte luminosa colocada no foco de um espelho côncavo parabólico emite raios que, após a reflexão:",
      alternativas: [
        "a) convergem para o centro de curvatura.",
        "b) divergem como se viessem do foco.",
        "c) propagam-se paralelos ao eixo principal.",
        "d) convergem para um ponto entre o foco e o vértice.",
        "e) propagam-se sem direção definida."
      ],
      steps: [
        {
          title: "1. Propriedade do Foco",
          content: "Definição de foco em espelhos parabólicos:",
          details: [
            "O foco é o ponto onde raios paralelos convergem",
            "Pela reversibilidade da luz:",
            "Se raios paralelos → foco",
            "Então: foco → raios paralelos",
            "É uma propriedade recíproca"
          ]
        },
        {
          title: "2. Princípio de Reversibilidade",
          content: "Trajetória da luz é reversível:",
          details: [
            "Se A → B é um caminho óptico possível",
            "Então B → A também é",
            "Raios paralelos que chegam convergem no foco",
            "Raios que saem do foco ficam paralelos"
          ]
        },
        {
          title: "3. Aplicação em Faróis",
          content: "Como funcionam os faróis de carros:",
          details: [
            "Lâmpada colocada no foco do refletor",
            "Luz emitida em todas as direções",
            "Após reflexão, raios ficam paralelos",
            "Feixe de luz bem direcionado",
            "Maior alcance e eficiência"
          ]
        },
        {
          title: "4. Aplicação em Telescópios",
          content: "Funcionamento inverso:",
          details: [
            "Raios paralelos vêm de estrelas distantes",
            "Espelho parabólico os reflete",
            "Todos convergem para o foco",
            "Detector/olho posicionado no foco",
            "Concentra luz de área grande em ponto pequeno"
          ]
        },
        {
          title: "5. Vantagem da Parábola",
          content: "Por que formato parabólico?",
          details: [
            "Espelho esférico tem aberração (raios não convergem exatamente no foco)",
            "Parábola elimina aberração esférica",
            "TODOS os raios paralelos passam pelo foco",
            "Imagem mais nítida e precisa",
            "Essencial para telescópios profissionais"
          ]
        }
      ],
      answer: "c) propagam-se paralelos ao eixo principal."
    },
    {
      id: 5,
      title: "Questão 5 - Equação dos Pontos Conjugados",
      source: "Exercício Padrão",
      enunciado: "Um objeto está a 15 cm de um espelho côncavo. A imagem formada é real e tem o dobro do tamanho do objeto. Determine a distância focal do espelho.",
      steps: [
        {
          title: "1. Dados do Problema",
          content: "Informações fornecidas:",
          details: [
            "Distância do objeto: $p = 15$ cm",
            "Imagem é REAL → $p' > 0$",
            "Aumento: $|A| = 2$ (dobro do tamanho)",
            "Como imagem real tem $A < 0$: $A = -2$"
          ]
        },
        {
          title: "2. Usando a Fórmula do Aumento",
          content: "Relacionar p e p':",
          details: [
            "$A = -\\frac{p'}{p}$",
            "$-2 = -\\frac{p'}{15}$",
            "$p' = 2 \\times 15$",
            "$p' = 30$ cm"
          ]
        },
        {
          title: "3. Aplicando Equação de Gauss",
          content: "Encontrar a distância focal:",
          details: [
            "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
            "$\\frac{1}{f} = \\frac{1}{15} + \\frac{1}{30}$",
            "$\\frac{1}{f} = \\frac{2 + 1}{30} = \\frac{3}{30} = \\frac{1}{10}$",
            "$f = 10$ cm"
          ]
        },
        {
          title: "4. Verificação",
          content: "Conferindo a resposta:",
          details: [
            "Raio de curvatura: $R = 2f = 20$ cm",
            "Centro de curvatura: $C = 20$ cm",
            "Objeto em $p = 15$ cm (entre F e C)",
            "Imagem em $p' = 30$ cm (além de C)",
            "Coerente: objeto entre F e C → imagem real, invertida, aumentada ✓"
          ]
        },
        {
          title: "5. Diagrama de Raios",
          content: "Construção gráfica:",
          details: [
            "Raio paralelo ao eixo → reflete passando por F",
            "Raio passando por F → reflete paralelo ao eixo",
            "Raio passando por C → reflete sobre si mesmo",
            "Intersecção dos raios = posição da imagem"
          ]
        }
      ],
      answer: "f = 10 cm"
    },
    {
      id: 6,
      title: "Questão 6 (VUNESP) - Imagem Virtual",
      source: "VUNESP",
      enunciado: "Um objeto de 5 cm de altura está a 8 cm de um espelho côncavo de distância focal 12 cm. A natureza, posição e tamanho da imagem são:",
      alternativas: [
        "a) real, 24 cm do espelho, 15 cm",
        "b) virtual, 24 cm do espelho, 15 cm",
        "c) real, 12 cm do espelho, 7,5 cm",
        "d) virtual, 12 cm do espelho, 7,5 cm",
        "e) real, 16 cm do espelho, 10 cm"
      ],
      steps: [
        {
          title: "1. Análise Inicial",
          content: "Comparando posições:",
          details: [
            "Distância do objeto: $p = 8$ cm",
            "Distância focal: $f = 12$ cm",
            "Note que $p < f$ !",
            "Objeto está ANTES do foco",
            "Isso já indica que a imagem será VIRTUAL"
          ]
        },
        {
          title: "2. Cálculo da Posição",
          content: "Usando equação de Gauss:",
          details: [
            "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
            "$\\frac{1}{12} = \\frac{1}{8} + \\frac{1}{p'}$",
            "$\\frac{1}{p'} = \\frac{1}{12} - \\frac{1}{8}$",
            "$\\frac{1}{p'} = \\frac{2 - 3}{24} = -\\frac{1}{24}$",
            "$p' = -24$ cm (negativo = virtual)"
          ]
        },
        {
          title: "3. Aumento Linear",
          content: "Calculando aumento:",
          details: [
            "$A = -\\frac{p'}{p} = -\\frac{(-24)}{8}$",
            "$A = \\frac{24}{8} = 3$"
          ]
        },
        {
          title: "4. Altura da Imagem",
          content: "Tamanho da imagem:",
          details: [
            "$A = \\frac{h'}{h}$",
            "$3 = \\frac{h'}{5}$",
            "$h' = 15$ cm"
          ]
        },
        {
          title: "5. Características da Imagem",
          content: "Resumo das propriedades:",
          details: [
            "Natureza: VIRTUAL ($p' < 0$)",
            "Posição: 24 cm atrás do espelho",
            "Orientação: DIREITA ($A > 0$)",
            "Tamanho: AUMENTADA (15 cm > 5 cm)",
            "Uso: espelhos de aumento (maquiagem, dentista)"
          ]
        }
      ],
      answer: "b) virtual, 24 cm do espelho, 15 cm"
    },
    {
      id: 7,
      title: "Questão 7 (FUVEST) - Aberração Esférica",
      source: "FUVEST",
      enunciado: "A aberração esférica em espelhos esféricos é um defeito que ocorre porque:",
      alternativas: [
        "a) o espelho não é perfeitamente polido.",
        "b) raios que incidem longe do eixo não passam exatamente pelo foco.",
        "c) a luz sofre dispersão no espelho.",
        "d) o espelho absorve parte da luz.",
        "e) ocorre interferência entre os raios refletidos."
      ],
      steps: [
        {
          title: "1. O que é Aberração Esférica",
          content: "Defeito em espelhos esféricos:",
          details: [
            "Raios paralelos próximos ao eixo convergem no foco F",
            "Raios paralelos longe do eixo convergem ANTES de F",
            "Não há um único ponto focal",
            "Imagem fica desfocada/borrada"
          ]
        },
        {
          title: "2. Causa Geométrica",
          content: "Por que acontece:",
          details: [
            "A superfície esférica não é a ideal para focar luz",
            "Parábola seria a superfície ideal",
            "Na esfera, a curvatura varia com a distância ao eixo",
            "Raios marginais (longe do eixo) são mais desviados"
          ]
        },
        {
          title: "3. Aproximação de Gauss",
          content: "Quando as fórmulas funcionam:",
          details: [
            "Fórmulas $\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$ são aproximações",
            "Válidas para raios PARAXIAIS (próximos ao eixo)",
            "Ângulos pequenos: $\\sen(\\theta) \\approx \\theta$ (em radianos)",
            "Quanto maior a abertura, maior o erro"
          ]
        },
        {
          title: "4. Soluções Práticas",
          content: "Como minimizar o defeito:",
          details: [
            "1) Usar apenas a região central (diafragma)",
            "2) Usar espelho parabólico (telescópios)",
            "3) Combinar lentes (sistemas compostos)",
            "4) Polimento especial (asférico)"
          ]
        },
        {
          title: "5. Impacto na Prática",
          content: "Onde é importante:",
          details: [
            "Telescópios: crucial ter imagem nítida",
            "Faróis: menos crítico",
            "Espelhos de banheiro: imperceptível",
            "Câmeras: combinação de lentes corrige",
            "Microscópios: usa correções ópticas"
          ]
        }
      ],
      answer: "b) raios que incidem longe do eixo não passam exatamente pelo foco."
    },
    {
      id: 8,
      title: "Questão 8 - Campo Visual",
      source: "Exercício Avançado",
      enunciado: "Um espelho côncavo tem raio de curvatura de 60 cm. Uma pessoa está a 90 cm do espelho. Se ela se aproximar do espelho com velocidade de 3 m/s, qual a velocidade de aproximação da imagem (em módulo) no instante considerado?",
      steps: [
        {
          title: "1. Situação Inicial",
          content: "Dados do problema:",
          details: [
            "Raio: $R = 60$ cm $= 0,6$ m",
            "Foco: $f = \\frac{R}{2} = 30$ cm $= 0,3$ m",
            "Posição inicial: $p = 90$ cm $= 0,9$ m",
            "Velocidade do objeto: $v_p = -3$ m/s (aproximando)"
          ]
        },
        {
          title: "2. Posição Inicial da Imagem",
          content: "Usando Gauss:",
          details: [
            "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
            "$\\frac{1}{0,3} = \\frac{1}{0,9} + \\frac{1}{p'}$",
            "$\\frac{1}{p'} = \\frac{1}{0,3} - \\frac{1}{0,9} = \\frac{3 - 1}{0,9} = \\frac{2}{0,9}$",
            "$p' = 0,45$ m $= 45$ cm"
          ]
        },
        {
          title: "3. Derivando a Equação de Gauss",
          content: "Relação entre velocidades:",
          details: [
            "Derivando $\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$ em relação ao tempo:",
            "$0 = -\\frac{1}{p^2}\\frac{dp}{dt} - \\frac{1}{p'^2}\\frac{dp'}{dt}$",
            "$\\frac{v_{p'}}{p'^2} = -\\frac{v_p}{p^2}$",
            "$v_{p'} = -\\frac{p'^2}{p^2} v_p$"
          ]
        },
        {
          title: "4. Cálculo da Velocidade",
          content: "Substituindo os valores:",
          details: [
            "$v_{p'} = -\\frac{(0,45)^2}{(0,9)^2} \\times (-3)$",
            "$v_{p'} = -\\frac{0,2025}{0,81} \\times (-3)$",
            "$v_{p'} = -0,25 \\times (-3)$",
            "$v_{p'} = 0,75$ m/s"
          ]
        },
        {
          title: "5. Interpretação",
          content: "Análise do resultado:",
          details: [
            "Objeto se aproxima a 3 m/s",
            "Imagem se aproxima a 0,75 m/s (mais devagar)",
            "Ambos se aproximam do espelho",
            "Velocidade relativa depende das posições",
            "Quanto mais perto do foco, maior a velocidade da imagem"
          ]
        }
      ],
      answer: "|v| = 0,75 m/s"
    }
  ];

  return (
    <div className="physics-spherical-mirrors-container">
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
        <span className="breadcrumb-current">Espelhos Esféricos</span>
      </div>

      <ScrollReveal>
        <div className="exercises-header">
          <div className="topic-badge">
            <span className="material-icons">lens</span>
            ESPELHOS ESFÉRICOS
          </div>
          <h1 className="exercises-title">Espelhos Esféricos</h1>
          <p className="exercises-description">
            Domine espelhos côncavos e convexos com questões de ENEM, VUNESP e FUVEST. 
            Aprenda equação de Gauss, aumento linear, formação de imagens e aplicações tecnológicas.
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

export default PhysicsSphericalMirrors;

