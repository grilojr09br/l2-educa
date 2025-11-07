import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import InlineFormula from '../components/InlineFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import Footer from '../components/Footer';
import './PhysicsPlainMirrors.css';

const PhysicsPlainMirrors = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  useEffect(() => {
    const scaleFormulas = () => {
      if (window.innerWidth <= 768) {
        const containers = document.querySelectorAll('.physics-plain-mirrors-container mjx-container');
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
      title: "Questão 1 (ENEM) - Reflexão em Espelho Plano",
      source: "ENEM",
      enunciado: "Uma pessoa de 1,70 m de altura está a 2,0 m de um espelho plano vertical. A distância entre a pessoa e sua imagem e a altura da imagem são, respectivamente:",
      alternativas: [
        "a) 2,0 m e 1,70 m",
        "b) 2,0 m e 3,40 m",
        "c) 4,0 m e 1,70 m",
        "d) 4,0 m e 3,40 m",
        "e) 2,0 m e 0,85 m"
      ],
      steps: [
        {
          title: "1. Propriedades do Espelho Plano",
          content: "Características fundamentais da imagem formada:",
          details: [
            "Imagem é VIRTUAL (atrás do espelho)",
            "Imagem tem o MESMO TAMANHO do objeto",
            "Imagem está à MESMA DISTÂNCIA do espelho",
            "Imagem é DIREITA (não invertida verticalmente)",
            "Imagem é ENANTIOMORFA (invertida lateralmente)"
          ]
        },
        {
          title: "2. Altura da Imagem",
          content: "A imagem tem o mesmo tamanho do objeto:",
          details: [
            "Altura do objeto: $h_{objeto} = 1,70$ m",
            "Altura da imagem: $h_{imagem} = h_{objeto}$",
            "$h_{imagem} = 1,70$ m"
          ]
        },
        {
          title: "3. Posição da Imagem",
          content: "A imagem fica à mesma distância do espelho:",
          details: [
            "Distância objeto-espelho: $d_{objeto} = 2,0$ m",
            "Distância imagem-espelho: $d_{imagem} = 2,0$ m",
            "A imagem está 2,0 m ATRÁS do espelho"
          ]
        },
        {
          title: "4. Distância Objeto-Imagem",
          content: "Somando as duas distâncias:",
          details: [
            "$D = d_{objeto} + d_{imagem}$",
            "$D = 2,0 + 2,0 = 4,0$ m",
            "A distância entre a pessoa e sua imagem é 4,0 m"
          ]
        }
      ],
      answer: "c) 4,0 m e 1,70 m"
    },
    {
      id: 2,
      title: "Questão 2 (VUNESP) - Campo Visual",
      source: "VUNESP",
      enunciado: "Para que uma pessoa de 1,80 m de altura veja sua imagem completa em um espelho plano vertical, o comprimento mínimo do espelho deve ser de:",
      alternativas: [
        "a) 0,45 m",
        "b) 0,60 m",
        "c) 0,90 m",
        "d) 1,20 m",
        "e) 1,80 m"
      ],
      steps: [
        {
          title: "1. Campo Visual em Espelho Plano",
          content: "Princípio da reflexão e geometria:",
          details: [
            "Para ver a imagem completa, os raios de luz devem:",
            "1) Sair do topo da cabeça e chegar aos olhos refletidos",
            "2) Sair dos pés e chegar aos olhos refletidos",
            "A altura mínima do espelho é METADE da altura da pessoa"
          ]
        },
        {
          title: "2. Demonstração Geométrica",
          content: "Por que metade da altura?",
          details: [
            "Os olhos estão aproximadamente no topo da cabeça",
            "O raio que vem dos pés percorre o DOBRO da distância vertical",
            "Por simetria da reflexão (ângulo incidente = ângulo refletido)",
            "O espelho precisa ter metade da altura do observador"
          ]
        },
        {
          title: "3. Cálculo",
          content: "Aplicando a regra:",
          details: [
            "Altura da pessoa: $h = 1,80$ m",
            "Altura mínima do espelho: $H = \\frac{h}{2}$",
            "$H = \\frac{1,80}{2} = 0,90$ m"
          ]
        },
        {
          title: "4. Observações Importantes",
          content: "Detalhes sobre o campo visual:",
          details: [
            "A altura do espelho não depende da distância pessoa-espelho",
            "A posição do espelho importa: deve estar na altura certa",
            "A borda inferior deve estar na metade da distância olhos-pés",
            "A borda superior deve estar na metade da distância olhos-topo da cabeça"
          ]
        }
      ],
      answer: "c) 0,90 m"
    },
    {
      id: 3,
      title: "Questão 3 (FUVEST) - Múltiplas Imagens",
      source: "FUVEST",
      enunciado: "Dois espelhos planos estão dispostos de modo que suas superfícies refletoras formem um ângulo de 60°. Um objeto é colocado entre os espelhos. O número de imagens formadas é:",
      alternativas: [
        "a) 3",
        "b) 4",
        "c) 5",
        "d) 6",
        "e) infinito"
      ],
      steps: [
        {
          title: "1. Fórmula para Espelhos Angulares",
          content: "Número de imagens formadas por dois espelhos:",
          details: [
            "$N = \\frac{360°}{\\theta} - 1$",
            "Onde:",
            "$N$ = número de imagens",
            "$\\theta$ = ângulo entre os espelhos",
            "Esta fórmula vale quando $\\frac{360°}{\\theta}$ é inteiro"
          ]
        },
        {
          title: "2. Aplicando no Problema",
          content: "Com ângulo de 60°:",
          details: [
            "$N = \\frac{360°}{60°} - 1$",
            "$N = 6 - 1$",
            "$N = 5$ imagens"
          ]
        },
        {
          title: "3. Verificação",
          content: "Confirmando que a fórmula se aplica:",
          details: [
            "$\\frac{360°}{60°} = 6$ (número inteiro ✓)",
            "A fórmula é válida para este caso",
            "Serão formadas 5 imagens do objeto"
          ]
        },
        {
          title: "4. Entendendo o Fenômeno",
          content: "Por que múltiplas imagens?",
          details: [
            "1ª imagem: reflexão no espelho 1",
            "2ª imagem: reflexão no espelho 2",
            "3ª, 4ª, 5ª imagens: reflexões sucessivas",
            "A luz 'pula' de um espelho para outro",
            "Quanto menor o ângulo, mais imagens são formadas"
          ]
        },
        {
          title: "5. Casos Especiais",
          content: "Outros ângulos interessantes:",
          details: [
            "90°: $N = \\frac{360°}{90°} - 1 = 3$ imagens",
            "45°: $N = \\frac{360°}{45°} - 1 = 7$ imagens",
            "180° (paralelos): $N = \\infty$ imagens",
            "0° (coincidentes): $N = 1$ imagem"
          ]
        }
      ],
      answer: "c) 5"
    },
    {
      id: 4,
      title: "Questão 4 - Translação de Espelho",
      source: "Exercício Padrão",
      enunciado: "Um objeto está parado a 3,0 m de um espelho plano. Se o espelho se aproximar do objeto com velocidade constante de 2,0 m/s, com que velocidade a imagem se aproxima do objeto?",
      alternativas: [
        "a) 1,0 m/s",
        "b) 2,0 m/s",
        "c) 3,0 m/s",
        "d) 4,0 m/s",
        "e) 6,0 m/s"
      ],
      steps: [
        {
          title: "1. Situação Inicial",
          content: "Posições antes do movimento:",
          details: [
            "Distância objeto-espelho: $d = 3,0$ m",
            "Distância objeto-imagem: $D = 2d = 6,0$ m",
            "A imagem está 3,0 m atrás do espelho"
          ]
        },
        {
          title: "2. Movimento do Espelho",
          content: "O espelho se aproxima do objeto:",
          details: [
            "Velocidade do espelho: $v_{espelho} = 2,0$ m/s (em direção ao objeto)",
            "O objeto está parado: $v_{objeto} = 0$",
            "A imagem também se move!"
          ]
        },
        {
          title: "3. Velocidade da Imagem",
          content: "Relação entre as velocidades:",
          details: [
            "A imagem está sempre à mesma distância do espelho que o objeto",
            "Se o espelho se move 2,0 m/s em direção ao objeto",
            "A distância objeto-espelho diminui 2,0 m/s",
            "A distância imagem-espelho TAMBÉM diminui 2,0 m/s"
          ]
        },
        {
          title: "4. Velocidade Relativa",
          content: "Aproximação objeto-imagem:",
          details: [
            "Objeto está parado",
            "Imagem se aproxima pelo lado oposto",
            "Velocidade da imagem em relação ao espelho: 2,0 m/s",
            "Velocidade do espelho em relação ao objeto: 2,0 m/s",
            "$v_{imagem-objeto} = 2,0 + 2,0 = 4,0$ m/s"
          ]
        },
        {
          title: "5. Regra Geral",
          content: "Para movimento perpendicular ao espelho:",
          details: [
            "Se o objeto se move com velocidade $v$ em direção ao espelho",
            "A imagem se move com velocidade $v$ em sentido oposto",
            "Velocidade relativa imagem-objeto: $v_{rel} = 2v$"
          ]
        }
      ],
      answer: "d) 4,0 m/s"
    },
    {
      id: 5,
      title: "Questão 5 (ENEM) - Ambulância e Espelho Retrovisor",
      source: "ENEM",
      enunciado: "A palavra AMBULÂNCIA é escrita de forma invertida nos capôs desses veículos para que:",
      alternativas: [
        "a) seja facilmente identificada como veículo de emergência.",
        "b) possa ser lida corretamente através do espelho retrovisor dos carros à frente.",
        "c) cause maior impacto visual aos pedestres.",
        "d) seja mais difícil de ser copiada por outros veículos.",
        "e) fique mais visível durante a noite."
      ],
      steps: [
        {
          title: "1. Propriedade do Espelho Plano",
          content: "Enantiomorfismo - inversão lateral:",
          details: [
            "Espelhos planos invertem lateralmente (esquerda ↔ direita)",
            "Não invertem verticalmente (cima continua em cima)",
            "Uma palavra normal fica invertida no espelho",
            "Uma palavra já invertida fica normal no espelho!"
          ]
        },
        {
          title: "2. Aplicação Prática",
          content: "Como funciona na ambulância:",
          details: [
            "AMBULÂNCIA é escrita invertida: AICNÂLUBMA",
            "Motorista à frente olha pelo retrovisor",
            "O retrovisor inverte a imagem",
            "A inversão dupla resulta em AMBULÂNCIA legível",
            "Permite identificação rápida em emergências"
          ]
        },
        {
          title: "3. Por que isso é importante?",
          content: "Vantagens do sistema:",
          details: [
            "Identificação instantânea da ambulância",
            "Motorista não precisa virar a cabeça",
            "Reduz tempo de reação para dar passagem",
            "Funciona mesmo em alta velocidade",
            "Universal - reconhecido internacionalmente"
          ]
        },
        {
          title: "4. Física dos Espelhos",
          content: "Demonstrando matematicamente:",
          details: [
            "Seja $\\vec{P}$ um ponto no espaço",
            "Reflexão: $\\vec{P'} = (-P_x, P_y, P_z)$",
            "Inverte apenas a coordenada horizontal ($x$)",
            "Mantém vertical ($y$) e profundidade ($z$)",
            "Por isso textos ficam espelhados lateralmente"
          ]
        }
      ],
      answer: "b) possa ser lida corretamente através do espelho retrovisor dos carros à frente."
    },
    {
      id: 6,
      title: "Questão 6 (VUNESP) - Raio de Luz",
      source: "VUNESP",
      enunciado: "Um raio de luz incide sobre um espelho plano formando um ângulo de 35° com a superfície do espelho. O ângulo entre o raio incidente e o raio refletido é de:",
      alternativas: [
        "a) 35°",
        "b) 55°",
        "c) 70°",
        "d) 110°",
        "e) 125°"
      ],
      steps: [
        {
          title: "1. Lei da Reflexão",
          content: "Leis fundamentais da reflexão:",
          details: [
            "1ª Lei: Raio incidente, raio refletido e normal estão no mesmo plano",
            "2ª Lei: Ângulo de incidência = Ângulo de reflexão",
            "$\\theta_i = \\theta_r$",
            "IMPORTANTE: Ângulos medidos em relação à NORMAL (perpendicular)"
          ]
        },
        {
          title: "2. Cuidado com o Enunciado",
          content: "O ângulo dado é com a SUPERFÍCIE:",
          details: [
            "Ângulo com a superfície: $\\alpha = 35°$",
            "Ângulo com a normal: $\\theta = 90° - \\alpha$",
            "$\\theta_i = 90° - 35° = 55°$",
            "Este é o verdadeiro ângulo de incidência"
          ]
        },
        {
          title: "3. Ângulo de Reflexão",
          content: "Pela lei da reflexão:",
          details: [
            "$\\theta_r = \\theta_i = 55°$",
            "O raio refletido também faz 55° com a normal"
          ]
        },
        {
          title: "4. Ângulo Entre os Raios",
          content: "Calculando o ângulo pedido:",
          details: [
            "O ângulo entre incidente e refletido é:",
            "$\\beta = \\theta_i + \\theta_r$",
            "$\\beta = 55° + 55°$",
            "$\\beta = 110°$"
          ]
        },
        {
          title: "5. Regra Prática",
          content: "Fórmula rápida:",
          details: [
            "Se $\\alpha$ é o ângulo com a superfície:",
            "Ângulo entre raios: $\\beta = 180° - 2\\alpha$",
            "$\\beta = 180° - 2(35°) = 180° - 70° = 110°$ ✓"
          ]
        }
      ],
      answer: "d) 110°"
    },
    {
      id: 7,
      title: "Questão 7 - Periscópio",
      source: "Exercício Padrão",
      enunciado: "Um periscópio simples é constituído por dois espelhos planos paralelos, cada um inclinado 45° em relação à horizontal. Se um raio de luz horizontal entra no periscópio, após as duas reflexões ele emerge:",
      alternativas: [
        "a) na vertical, para cima.",
        "b) na vertical, para baixo.",
        "c) na horizontal, no mesmo sentido inicial.",
        "d) na horizontal, em sentido oposto.",
        "e) inclinado 45° em relação à horizontal."
      ],
      steps: [
        {
          title: "1. Estrutura do Periscópio",
          content: "Como funciona:",
          details: [
            "Dois espelhos planos paralelos",
            "Cada espelho inclinado 45° com a horizontal",
            "Espelhos separados por uma distância vertical",
            "Permite ver 'por cima' de obstáculos"
          ]
        },
        {
          title: "2. Primeira Reflexão",
          content: "Raio horizontal encontra espelho inferior:",
          details: [
            "Raio entra horizontalmente",
            "Espelho inclinado 45°",
            "Normal ao espelho: também 45° com a horizontal",
            "Ângulo de incidência: 45°",
            "Raio refletido sobe verticalmente (90° com a horizontal)"
          ]
        },
        {
          title: "3. Segunda Reflexão",
          content: "Raio vertical encontra espelho superior:",
          details: [
            "Raio chega verticalmente ao espelho superior",
            "Espelho também inclinado 45°",
            "Ângulo de incidência: 45°",
            "Raio refletido emerge horizontalmente"
          ]
        },
        {
          title: "4. Direção Final",
          content: "Analisando o sentido:",
          details: [
            "O raio entra pela esquerda (horizontal →)",
            "Sobe verticalmente (↑)",
            "Emerge pela direita (horizontal →)",
            "MESMA direção horizontal inicial",
            "Deslocado verticalmente para cima"
          ]
        },
        {
          title: "5. Propriedade Geral",
          content: "Característica dos periscópios:",
          details: [
            "Preservam a direção do raio",
            "Deslocam a altura da observação",
            "Usados em submarinos, tanques, trincheiras",
            "Dois espelhos a 45° sempre mantêm direção paralela"
          ]
        }
      ],
      answer: "c) na horizontal, no mesmo sentido inicial."
    },
    {
      id: 8,
      title: "Questão 8 (FUVEST) - Rotação de Espelho",
      source: "FUVEST",
      enunciado: "Um espelho plano gira de um ângulo α em torno de um eixo perpendicular ao plano de incidência da luz. O raio refletido gira de um ângulo:",
      alternativas: [
        "a) α/2",
        "b) α",
        "c) 2α",
        "d) 3α",
        "e) 4α"
      ],
      steps: [
        {
          title: "1. Situação Inicial",
          content: "Antes da rotação:",
          details: [
            "Raio de luz incide no espelho",
            "Ângulo de incidência: $\\theta_i$",
            "Ângulo de reflexão: $\\theta_r = \\theta_i$",
            "Raio refletido forma ângulo conhecido"
          ]
        },
        {
          title: "2. Rotação do Espelho",
          content: "O que acontece ao girar o espelho de α:",
          details: [
            "O espelho (e sua normal) giram α",
            "O raio incidente não muda (vem da mesma fonte)",
            "Mas agora incide em ângulo diferente"
          ]
        },
        {
          title: "3. Novo Ângulo de Incidência",
          content: "Após rotação:",
          details: [
            "Normal girou α",
            "Novo ângulo de incidência: $\\theta_i' = \\theta_i + \\alpha$",
            "Novo ângulo de reflexão: $\\theta_r' = \\theta_i' = \\theta_i + \\alpha$"
          ]
        },
        {
          title: "4. Rotação do Raio Refletido",
          content: "Variação total do raio refletido:",
          details: [
            "Variação no lado da incidência: $+\\alpha$",
            "Variação no lado da reflexão: $+\\alpha$",
            "Variação total: $\\Delta = \\alpha + \\alpha = 2\\alpha$",
            "O raio refletido gira o DOBRO do espelho"
          ]
        },
        {
          title: "5. Demonstração Geométrica",
          content: "Visualização:",
          details: [
            "Imagine um relógio:",
            "Se o espelho gira 15° (1 hora)",
            "O raio refletido gira 30° (2 horas)",
            "Esta propriedade é usada em galvanômetros",
            "Pequenas rotações do espelho → grandes desvios do raio"
          ]
        }
      ],
      answer: "c) 2α"
    }
  ];

  return (
    <div className="physics-plain-mirrors-container">
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
        <span className="breadcrumb-current">Espelhos Planos</span>
      </div>

      <ScrollReveal>
        <div className="exercises-header">
          <div className="topic-badge">
            <span className="material-icons">flip</span>
            ESPELHOS PLANOS
          </div>
          <h1 className="exercises-title">Espelhos Planos</h1>
          <p className="exercises-description">
            Domine a óptica geométrica com questões de ENEM, VUNESP e FUVEST sobre espelhos planos. 
            Aprenda sobre formação de imagens, campo visual, reflexão e aplicações práticas.
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

export default PhysicsPlainMirrors;

