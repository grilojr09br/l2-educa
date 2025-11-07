import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import InlineFormula from '../components/InlineFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './PhysicsExercises.css';

const PhysicsExercises = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  // Scale down formulas that are too wide on mobile (only if really necessary)
  useEffect(() => {
    const scaleFormulas = () => {
      if (window.innerWidth <= 768) {
        const containers = document.querySelectorAll('.physics-exercises-container mjx-container');
        containers.forEach(container => {
          const parent = container.parentElement;
          if (parent) {
            const parentWidth = parent.offsetWidth;
            const containerWidth = container.scrollWidth;
            
            // Only scale if significantly too wide (more than 20% overflow)
            if (containerWidth > parentWidth * 1.2) {
              const scale = (parentWidth - 20) / containerWidth;
              // Don't scale below 0.8 (80%)
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

    // Run after MathJax renders
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
      title: "Questão 1 (ENEM 2024) - Maratona Aquática",
      enunciado: "Para os circuitos de maratonas aquáticas, um nadador percorre um trajeto retangular anti-horário (1-2-3-4-1). Velocidade do nadador: 50 m/min, velocidade da correnteza: 30 m/min (apontando de 3 para 2). Distâncias: 1→2 e 3→4 = 400m, 2→3 e 4→1 = 800m.",
      steps: [
        {
          title: "1. Trecho 1 → 2 (400 m)",
          content: "O nadador sobe contra a correnteza.",
          details: [
            "Velocidade resultante: $v_r = v_n - v_c = 50 - 30 = 20$ m/min",
            "Tempo: $t = d/v_r = 400 / 20 = 20$ minutos"
          ]
        },
        {
          title: "2. Trecho 2 → 3 (800 m)",
          content: "Perpendicular à correnteza. As velocidades formam um triângulo retângulo.",
          details: [
            "$v_r^2 + v_c^2 = v_n^2 \\implies v_r^2 + 30^2 = 50^2 \\implies v_r^2 = 1600$",
            "Velocidade resultante: $v_r = 40$ m/min",
            "Tempo: $t = 800 / 40 = 20$ minutos"
          ]
        },
        {
          title: "3. Trecho 3 → 4 (400 m)",
          content: "O nadador desce a favor da correnteza.",
          details: [
            "Velocidade resultante: $v_r = v_n + v_c = 50 + 30 = 80$ m/min",
            "Tempo: $t = 400 / 80 = 5$ minutos"
          ]
        },
        {
          title: "4. Trecho 4 → 1 (800 m)",
          content: "Perpendicular à correnteza (idêntico ao trecho 2→3).",
          details: [
            "Velocidade resultante: $v_r = 40$ m/min",
            "Tempo: $t = 800 / 40 = 20$ minutos"
          ]
        },
        {
          title: "5. Tempo Total",
          content: "$T = 20 + 20 + 5 + 20 = 65$ minutos"
        }
      ],
      answer: "b) 65 minutos"
    },
    {
      id: 2,
      title: "Questão 2 (ENEM/PPL 2023) - Pista Retilínea",
      enunciado: "Duas pessoas saem de suas casas para se exercitarem numa pista retilínea de comprimento D. A primeira caminha com velocidade v, e a segunda corre com velocidade 2v. Partem do mesmo ponto e instante. Qual a distância percorrida pela segunda pessoa até o primeiro encontro?",
      steps: [
        {
          title: "1. Cenário",
          content: "O encontro ocorre enquanto P1 está indo e P2 está voltando (P2 é mais rápida)."
        },
        {
          title: "2. Posição de P1",
          content: "No instante t do encontro: $S_1 = v \\times t$"
        },
        {
          title: "3. Posição de P2",
          content: "P2 foi até D e está voltando. Posição: $S_2 = 2D - 2vt$"
        },
        {
          title: "4. Instante do Encontro",
          content: "No encontro $S_1 = S_2$:",
          details: [
            "$vt = 2D - 2vt$",
            "$3vt = 2D$",
            "$t = \\frac{2D}{3v}$"
          ]
        },
        {
          title: "5. Distância de P2",
          content: "$Dist_2 = 2v \\times \\frac{2D}{3v} = \\frac{4D}{3}$"
        }
      ],
      answer: "c) 4D/3"
    },
    {
      id: 3,
      title: "Questão 3 (ENEM 2023) - Concessionária",
      enunciado: "Uma concessionária é responsável por 480 km com 10 praças de pedágio. Tempo médio de passagem: 3 minutos. Carro leve (sem serviço automático): v_max = 100 km/h. Caminhão (com serviço automático): v_max = 80 km/h. Quantos minutos a menos o carro leva comparado ao caminhão?",
      steps: [
        {
          title: "1. Tempo do Caminhão",
          content: "Com serviço automático (sem paradas):",
          details: [
            "$T_{cam} = \\frac{480 \\text{ km}}{80 \\text{ km/h}} = 6$ horas",
            "$T_{cam} = 360$ minutos"
          ]
        },
        {
          title: "2. Tempo do Carro",
          content: "Sem serviço automático (com paradas):",
          details: [
            "Tempo de percurso: $T_{perc} = \\frac{480}{100} = 4,8$ h = 288 min",
            "Tempo nos pedágios: $T_{ped} = 10 \\times 3 = 30$ min",
            "Tempo total: $T_c = 288 + 30 = 318$ min"
          ]
        },
        {
          title: "3. Diferença",
          content: "$\\Delta T = 360 - 318 = 42$ minutos"
        }
      ],
      answer: "b) 42 minutos"
    },
    {
      id: 4,
      title: "Questão 4 (ENEM 2022) - Sinal Sonoro no Gelo",
      enunciado: "O sinal sonoro da queda de um bloco de gelo é detectado por dois dispositivos: A (imerso na água) e B (no ar). v_som,água = 1.540 m/s e v_som,ar = 340 m/s. Tempos: t_A = 220s, t_B = 232s. Qual a distância L?",
      steps: [
        {
          title: "1. Análise dos Tempos",
          content: "Som chega primeiro na água (é mais rápido):",
          details: [
            "Diferença de tempo: $\\Delta t = 232 - 220 = 12$ s"
          ]
        },
        {
          title: "2. Equações",
          content: "A distância L é a mesma:",
          details: [
            "$t_{ar} = L / 340$",
            "$t_{agua} = L / 1540$"
          ]
        },
        {
          title: "3. Cálculo de L",
          content: "$\\Delta t = t_{ar} - t_{agua}$:",
          details: [
            "$12 = \\frac{L}{340} - \\frac{L}{1540}$",
            "$12 = L \\left( \\frac{1200}{523600} \\right)$",
            "$L = \\frac{12 \\times 523600}{1200} = 5236$ m"
          ]
        }
      ],
      answer: "d) 5.240 m"
    },
    {
      id: 5,
      title: "Questão 5 (ENEM 2022) - Mangueira",
      enunciado: "Mangueira posicionada horizontalmente a 1m de altura. Jato atinge o chão a 3m de distância. Calcular o alcance vertical quando a mangueira é posicionada verticalmente. (g = 10 m/s²)",
      steps: [
        {
          title: "1. Lançamento Horizontal",
          content: "Achar velocidade inicial:",
          details: [
            "Queda vertical: $h = \\frac{1}{2}gt^2 \\implies 1 = 5t^2 \\implies t^2 = 0,2$ s²",
            "Horizontal: $d = v_0 t \\implies 3 = v_0 \\sqrt{0,2}$",
            "$v_0^2 = 9 / 0,2 = 45$ (m/s)²"
          ]
        },
        {
          title: "2. Lançamento Vertical",
          content: "Achar altura máxima com v_f = 0:",
          details: [
            "Torricelli: $v_f^2 = v_0^2 - 2gh_{max}$",
            "$0 = 45 - 20h_{max}$",
            "$h_{max} = 45 / 20 = 2,25$ m"
          ]
        }
      ],
      answer: "b) 2,25 m"
    },
    {
      id: 6,
      title: "Questão 6 (ENEM 2024) - Crumple Zone",
      enunciado: "Zona de deformação em carros modernos. Por que aumenta a segurança durante uma colisão?",
      steps: [
        {
          title: "1. Teorema do Impulso",
          content: "$I = F \\times \\Delta t = \\Delta p$",
          details: [
            "A variação $\\Delta p$ é a mesma (ir de v até 0)",
            "Crumple zone aumenta $\\Delta t$ (tempo de colisão)",
            "Se $\\Delta t$ aumenta, força média F diminui"
          ]
        },
        {
          title: "2. Trabalho-Energia",
          content: "$W = F \\times d = \\Delta E_c$",
          details: [
            "Energia cinética a dissipar é a mesma",
            "Crumple zone aumenta distância d (deformação)",
            "Se d aumenta, força F diminui",
            "Deformação converte E_c em calor/som"
          ]
        }
      ],
      answer: "b) Absorve a energia cinética do sistema"
    },
    {
      id: 7,
      title: "Questão 7 (ENEM/PPL 2022) - Rampa",
      enunciado: "Revestir piso de rampa para cadeira de rodas. Força motora: 200 N, força normal: 800 N. Qual material de menor custo garante não escorregamento?",
      steps: [
        {
          title: "1. Condição de Não Deslizamento",
          content: "$F_{at,e} \\leq F_{at,e,max} = \\mu_e \\times N$"
        },
        {
          title: "2. Coeficiente Mínimo",
          content: "$200 \\leq \\mu_e \\times 800 \\implies \\mu_e \\geq 0,25$"
        },
        {
          title: "3. Seleção",
          content: "Materiais que atendem (μ_e ≥ 0,25):",
          details: [
            "❌ Cimento (μ_e = 0,20)",
            "Mármore (μ_e = 0,30) - Custo: $$$$$",
            "✅ Madeira (μ_e = 0,35) - Custo: $$ (MENOR)",
            "Carpete (μ_e = 0,45) - Custo: $$$$",
            "Lona (μ_e = 0,55) - Custo: $$$"
          ]
        }
      ],
      answer: "c) Madeira"
    },
    {
      id: 8,
      title: "Questão 8 (ENEM/PPL 2020) - Bomba de Água",
      enunciado: "Bombear água para reservatório a 30m de altura. Vazão: 3.600 L/h. Densidade: 1 kg/L, g = 10 m/s². Qual a potência mínima do motor?",
      steps: [
        {
          title: "1. Conceito",
          content: "$P = \\frac{W}{t} = \\frac{mgh}{t} = \\left(\\frac{m}{t}\\right) gh$"
        },
        {
          title: "2. Vazão Mássica",
          content: "$\\frac{m}{t} = \\frac{3600 \\text{ kg}}{3600 \\text{ s}} = 1$ kg/s"
        },
        {
          title: "3. Potência",
          content: "$P = 1 \\times 10 \\times 30 = 300$ W = $3,0 \\times 10^2$ W"
        }
      ],
      answer: "c) 3,0×10² W"
    },
    {
      id: 9,
      title: "Questão 9 (ENEM 2022) - Balanço",
      enunciado: "Pai faz balanço com ângulo máximo de 90°. Filho: 24 kg, g = 10 m/s². Tensão de ruptura deve ser 25% superior à tensão máxima. Qual a tensão de ruptura?",
      steps: [
        {
          title: "1. Velocidade Máxima",
          content: "Conservação de energia (h=L até h=0):",
          details: [
            "$mgL = \\frac{1}{2}mv^2 \\implies v^2 = 2gL$"
          ]
        },
        {
          title: "2. Tensão Máxima",
          content: "No ponto mais baixo (força centrípeta):",
          details: [
            "$T_{max} - P = F_c = \\frac{mv^2}{L}$",
            "$T_{max} = \\frac{m(2gL)}{L} + mg = 3mg$",
            "$T_{max} = 3 \\times 24 \\times 10 = 720$ N"
          ]
        },
        {
          title: "3. Tensão de Ruptura",
          content: "$T_{rup} = T_{max} \\times 1,25 = 720 \\times 1,25 = 900$ N"
        }
      ],
      answer: "e) 900 N"
    },
    {
      id: 10,
      title: "Questão 10 (ENEM/PPL 2015) - Bomba Solar",
      enunciado: "Um produtor rural construiu um reservatório a 20 metros de altura. Para alimentar o motor elétrico, instalou um painel fotovoltaico que, entre 11h30 e 12h30, disponibiliza potência média de 50 W. g = 10 m/s², eficiência de 100%. Qual o volume de água bombeado (em litros)?",
      steps: [
        {
          title: "1. Energia Total Gerada",
          content: "Potência P = 50 W (J/s), Tempo Δt = 1 hora = 3600 s",
          details: [
            "$E = P \\times \\Delta t = 50 \\times 3600 = 180.000$ J"
          ]
        },
        {
          title: "2. Converter Energia em Massa",
          content: "Com eficiência 100%, $E = PE = mgh$:",
          details: [
            "$180.000 = m \\times 10 \\times 20$",
            "$m = 180.000 / 200 = 900$ kg"
          ]
        },
        {
          title: "3. Converter Massa em Volume",
          content: "Densidade da água: 1 kg/L",
          details: [
            "$V = 900$ kg / (1 kg/L) = 900 L"
          ]
        }
      ],
      answer: "d) 900 L"
    },
    {
      id: 11,
      title: "Questão 11 (ENEM/PPL 2016) - Elevador",
      enunciado: "Para reciclar um motor de potência elétrica de 200 W, um estudante verificou que ele ergue uma massa de 80 kg a 3 metros de altura durante 1 minuto. g = 10 m/s². Qual a eficiência aproximada do sistema?",
      steps: [
        {
          title: "1. Potência Total (Entrada)",
          content: "$P_{total} = 200$ W (potência elétrica do motor)"
        },
        {
          title: "2. Potência Útil (Saída)",
          content: "Potência usada para erguer a massa:",
          details: [
            "Trabalho $W = mgh = 80 \\times 10 \\times 3 = 2400$ J",
            "Tempo $\\Delta t = 1$ min = 60 s",
            "$P_{util} = W/\\Delta t = 2400 / 60 = 40$ W"
          ]
        },
        {
          title: "3. Eficiência",
          content: "$\\eta = \\frac{P_{util}}{P_{total}} = \\frac{40}{200} = 0,20 = 20\\%$"
        }
      ],
      answer: "b) 20%"
    },
    {
      id: 12,
      title: "Questão 12 (ENEM/PPL 2022) - Esteira",
      enunciado: "Esteiras e escadas rolantes deslocam-se a velocidade constante. A massa total diminui de 1.200 kg para 1.000 kg em 0,10 s. Aplica-se força impulsiva constante de 250 N para manter a velocidade constante. Qual o valor da velocidade?",
      steps: [
        {
          title: "1. Conceito (Massa Variável)",
          content: "2ª Lei de Newton: $F = \\frac{\\Delta p}{\\Delta t}$, onde $p = mv$",
          details: [
            "$F = \\frac{m_f v_f - m_i v_i}{\\Delta t}$"
          ]
        },
        {
          title: "2. Aplicando a Fórmula",
          content: "Velocidade constante: $v_f = v_i = v$",
          details: [
            "$F = \\frac{(m_f - m_i) v}{\\Delta t}$"
          ]
        },
        {
          title: "3. Substituindo Valores",
          content: "F = 250 N, m_f = 1000 kg, m_i = 1200 kg, Δt = 0,10 s",
          details: [
            "$250 = \\frac{(1000 - 1200) v}{0,10}$",
            "$250 = -2000v$",
            "$v = \\frac{250}{2000} = 0,125$ m/s"
          ]
        }
      ],
      answer: "d) 0,125 m/s"
    },
    {
      id: 13,
      title: "Questão 13 (ENEM/PPL 2021) - Colisão",
      enunciado: "Carro colide com van em cruzamento a 90°. Van tem massa 2x maior que o carro. Após colisão, veículos grudados deslocam-se a 45°. Velocidade da van antes da colisão: 40 km/h. Qual a velocidade do carro?",
      steps: [
        {
          title: "1. Dados e Eixos",
          content: "Van: $m_v = 2m_c$, $v_v = 40$ km/h (Eixo Y). Carro: $m_c$, $v_c = ?$ (Eixo X)"
        },
        {
          title: "2. Conservação do Momento",
          content: "$p_{antes} = p_{depois}$:",
          details: [
            "$p_{antes,X} = m_c v_c$",
            "$p_{antes,Y} = 2m_c \\times 40 = 80m_c$"
          ]
        },
        {
          title: "3. Ângulo de 45°",
          content: "Destroços saem a 45°, logo componentes X e Y são iguais:",
          details: [
            "$p_{depois,X} = p_{depois,Y}$",
            "$p_{antes,X} = p_{antes,Y}$"
          ]
        },
        {
          title: "4. Resolução",
          content: "$m_c v_c = 80m_c \\implies v_c = 80$ km/h"
        }
      ],
      answer: "e) 80 km/h"
    },
    {
      id: 14,
      title: "Questão 14 (ENEM 2022) - Placa Solar",
      enunciado: "Uma pessoa instala uma placa fotovoltaica em sua residência. O gráfico mostra produção máxima de energia em 10/01 (Janeiro) e mínima em 10/07 (Julho). Próximo a que região se situa a residência?",
      steps: [
        {
          title: "1. Análise do Gráfico",
          content: "Máxima energia em Janeiro, mínima em Julho"
        },
        {
          title: "2. Relação com Estações",
          content: "Produção solar é máxima no verão e mínima no inverno:",
          details: [
            "Verão da residência: Janeiro",
            "Inverno da residência: Julho"
          ]
        },
        {
          title: "3. Localização",
          content: "Estações invertidas em relação ao Hemisfério Norte. Logo, está no Hemisfério Sul."
        },
        {
          title: "4. Região Específica",
          content: "No diagrama (21 de Dezembro), o sol incide diretamente sobre o Trópico de Capricórnio no Hemisfério Sul."
        }
      ],
      answer: "a) Trópico de Capricórnio"
    }
  ];

  return (
    <div className="physics-exercises-container">
      <MobileOrientationNotification />
      {/* Breadcrumb */}
      <ScrollReveal>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Terminal</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/physics" className="breadcrumb-link">Física</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Exercícios ENEM</span>
        </div>
      </ScrollReveal>

      {/* Header */}
      <ScrollReveal delay={100}>
        <div className="physics-header">
          <div className="physics-icon">📐</div>
          <h1 className="physics-title">Exercícios de Física - ENEM</h1>
          <p className="physics-subtitle">
            Resoluções detalhadas passo a passo das questões mais desafiadoras
          </p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal delay={150}>
        <div className="exercises-stats">
          <div className="stat-card">
            <div className="stat-number">{exercises.length}</div>
            <div className="stat-label">Questões</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">ENEM</div>
            <div className="stat-label">2020-2024</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Resolvidas</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Exercises List */}
      <div className="exercises-list">
        {exercises.map((exercise, index) => (
          <ScrollReveal key={exercise.id} delay={200 + index * 50}>
            <div className={`exercise-card ${expandedQuestion === index ? 'expanded' : ''}`}>
              {/* Question Header */}
              <div 
                className="exercise-header"
                onClick={() => toggleQuestion(index)}
              >
                <div className="exercise-number">#{exercise.id}</div>
                <div className="exercise-header-content">
                  <h3 className="exercise-title">{exercise.title}</h3>
                  <p className="exercise-enunciado">{exercise.enunciado}</p>
                </div>
                <button className="expand-btn">
                  {expandedQuestion === index ? '−' : '+'}
                </button>
              </div>

              {/* Solution (Expanded) */}
              {expandedQuestion === index && (
                <div className="exercise-solution">
                  <div className="solution-steps">
                    {exercise.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="solution-step">
                        <h4 className="step-title">{step.title}</h4>
                        <p className="step-content">
                          <InlineFormula>{step.content}</InlineFormula>
                        </p>
                        {step.details && (
                          <ul className="step-details">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex}>
                                <InlineFormula>{detail}</InlineFormula>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="final-answer">
                    <span className="answer-label">Resposta:</span>
                    <span className="answer-text">
                      <InlineFormula>{exercise.answer}</InlineFormula>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default PhysicsExercises;

