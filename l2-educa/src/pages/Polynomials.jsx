import React, { useState, useRef, useEffect } from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './Polynomials.css';

// Clean - no formulaCache - universal hook handles it
const Polynomials = () => {
  const sections = [
    { id: 'intro', title: 'Fundamentos', icon: 'article' },
    { id: 'long-division', title: 'Método da Chave', icon: 'table_chart' },
    { id: 'briot-ruffini', title: 'Briot-Ruffini', icon: 'grid_on' },
    { id: 'tricks', title: 'Macetes', icon: 'lightbulb' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  // Estados para divisão longa
  const [longDiv, setLongDiv] = useState({
    dividend: [1, -5, 6, 0], // x³ - 5x² + 6x
    divisor: [1, -2], // x - 2
    step: 0,
  });

  // Estados para Briot-Ruffini
  const [briotRuffini, setBriotRuffini] = useState({
    coefficients: [1, -5, 6, 0],
    root: 2,
    step: 0,
  });

  // Realizar divisão de polinômios (método da chave)
  const performLongDivision = (dividend, divisor) => {
    const steps = [];
    let currentDividend = [...dividend];
    const quotient = [];
    
    while (currentDividend.length >= divisor.length) {
      // Dividir termo líder
      const coef = currentDividend[0] / divisor[0];
      quotient.push(coef);
      
      // Subtrair
      const subtraction = [];
      for (let i = 0; i < divisor.length; i++) {
        subtraction.push(currentDividend[i] - coef * divisor[i]);
      }
      
      steps.push({
        quotient: [...quotient],
        currentDividend: [...currentDividend],
        coef,
        subtraction,
      });
      
      // Próxima iteração
      currentDividend = subtraction.slice(1);
    }
    
    const remainder = currentDividend;
    
    return { steps, quotient, remainder };
  };

  // Briot-Ruffini
  const performBriotRuffini = (coefficients, root) => {
    const steps = [];
    const result = [coefficients[0]];
    
    steps.push({
      index: 0,
      carry: coefficients[0],
      multiplication: null,
      sum: coefficients[0],
    });
    
    for (let i = 1; i < coefficients.length; i++) {
      const multiplication = result[i - 1] * root;
      const sum = coefficients[i] + multiplication;
      result.push(sum);
      
      steps.push({
        index: i,
        carry: result[i - 1],
        multiplication,
        sum,
      });
    }
    
    const quotient = result.slice(0, -1);
    const remainder = result[result.length - 1];
    
    return { steps, quotient, remainder };
  };

  // Formatar polinômio para exibição
  const formatPolynomial = (coeffs) => {
    const terms = [];
    const degree = coeffs.length - 1;
    
    for (let i = 0; i < coeffs.length; i++) {
      const coef = coeffs[i];
      const power = degree - i;
      
      if (coef === 0) continue;
      
      let term = '';
      
      // Sinal
      if (i > 0) {
        term += coef > 0 ? ' + ' : ' - ';
      } else if (coef < 0) {
        term += '-';
      }
      
      // Coeficiente
      const absCoef = Math.abs(coef);
      if (absCoef !== 1 || power === 0) {
        term += absCoef;
      }
      
      // Variável
      if (power > 0) {
        term += 'x';
        if (power > 1) {
          term += `^${power}`;
        }
      }
      
      terms.push(term);
    }
    
    return terms.length > 0 ? terms.join('') : '0';
  };

  return (
    <div className="polynomials-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Seção 1: Fundamentos */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Divisão de Polinômios</h1>
            <p className="section-intro">
              A divisão de polinômios é uma operação fundamental na álgebra, essencial para fatoração, simplificação de expressões e resolução de equações. Dominar as técnicas de divisão permite manipular expressões complexas com eficiência e elegância.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">O que é um Polinômio?</h2>
            <p className="text-content">
              Um polinômio é uma expressão algébrica formada pela soma de monômios (termos) com coeficientes e variáveis elevadas a expoentes inteiros não negativos:
            </p>
            <MathFormula display>
              {'P(x) = a_nx^n + a_{n-1}x^{n-1} + \\cdots + a_1x + a_0'}
            </MathFormula>
            <ul className="content-list">
              <li><strong>Grau:</strong> O maior expoente da variável (<MathFormula>{'n'}</MathFormula>)</li>
              <li><strong>Coeficientes:</strong> Os números que multiplicam as potências (<MathFormula>{'a_n, a_{n-1}, \\ldots'}</MathFormula>)</li>
              <li><strong>Termo independente:</strong> O termo sem variável (<MathFormula>{'a_0'}</MathFormula>)</li>
              <li><strong>Coeficiente líder:</strong> O coeficiente do termo de maior grau (<MathFormula>{'a_n'}</MathFormula>)</li>
            </ul>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Teoremas Fundamentais</h2>
            
            <div className="theorem-box">
              <h3>Teorema do Resto</h3>
              <p>
                O resto da divisão de um polinômio <MathFormula>{'P(x)'}</MathFormula> por <MathFormula>{'(x - a)'}</MathFormula> é igual a <MathFormula>{'P(a)'}</MathFormula>.
              </p>
              <MathFormula display>
                {'P(x) = (x - a) \\cdot Q(x) + R, \\quad \\text{onde } R = P(a)'}
              </MathFormula>
              <div className="example-box">
                <strong>Exemplo:</strong>
                <p>Qual o resto da divisão de <MathFormula>{'P(x) = x^3 - 2x^2 + 3x - 1'}</MathFormula> por <MathFormula>{'(x - 2)'}</MathFormula>?</p>
                <MathFormula display>
                  {'R = P(2) = 2^3 - 2(2^2) + 3(2) - 1 = 8 - 8 + 6 - 1 = 5'}
                </MathFormula>
              </div>
            </div>

            <div className="theorem-box">
              <h3>Teorema de D'Alembert</h3>
              <p>
                Um polinômio <MathFormula>{'P(x)'}</MathFormula> é divisível por <MathFormula>{'(x - a)'}</MathFormula> se, e somente se, <MathFormula>{'P(a) = 0'}</MathFormula>.
              </p>
              <p className="text-content">
                <strong>Consequência:</strong> Se <MathFormula>{'P(a) = 0'}</MathFormula>, então <MathFormula>{'a'}</MathFormula> é uma raiz de <MathFormula>{'P(x)'}</MathFormula> e <MathFormula>{'(x - a)'}</MathFormula> é um fator de <MathFormula>{'P(x)'}</MathFormula>.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Teorema das Raízes Racionais</h2>
            <p className="text-content">
              Se um polinômio <MathFormula>{'P(x) = a_nx^n + \\cdots + a_1x + a_0'}</MathFormula> com coeficientes inteiros tem uma raiz racional <MathFormula>{'\\frac{p}{q}'}</MathFormula> (em termos mínimos), então:
            </p>
            <ul className="content-list">
              <li><strong>p</strong> é divisor de <MathFormula>{'a_0'}</MathFormula> (termo independente)</li>
              <li><strong>q</strong> é divisor de <MathFormula>{'a_n'}</MathFormula> (coeficiente líder)</li>
            </ul>
            <div className="example-box">
              <strong>Exemplo:</strong>
              <p>Para <MathFormula>{'P(x) = 2x^3 - 3x^2 - 11x + 6'}</MathFormula>:</p>
              <p>Possíveis raízes racionais: <MathFormula>{'\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}'}</MathFormula></p>
              <p>Divisores de 6: <MathFormula>{'\\pm 1, \\pm 2, \\pm 3, \\pm 6'}</MathFormula></p>
              <p>Divisores de 2: <MathFormula>{'\\pm 1, \\pm 2'}</MathFormula></p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 2: Método da Chave */}
      <section id="long-division" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Método da Chave (Divisão Longa)</h1>
            <p className="section-intro">
              O método da chave é o processo mais geral para dividir polinômios, análogo à divisão longa de números. É especialmente útil quando o divisor tem grau maior que 1.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Passo a Passo</h2>
            <ol className="steps-list">
              <li>
                <strong>Organizar:</strong> Escrever ambos os polinômios em ordem decrescente de grau, incluindo termos com coeficiente zero.
              </li>
              <li>
                <strong>Dividir:</strong> Dividir o primeiro termo do dividendo pelo primeiro termo do divisor.
              </li>
              <li>
                <strong>Multiplicar:</strong> Multiplicar todo o divisor pelo resultado obtido.
              </li>
              <li>
                <strong>Subtrair:</strong> Subtrair o resultado da multiplicação do dividendo.
              </li>
              <li>
                <strong>Repetir:</strong> Usar o resto como novo dividendo e repetir até que o grau do resto seja menor que o grau do divisor.
              </li>
            </ol>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Exemplo Detalhado</h2>
            <div className="example-detailed">
              <h4>Dividir: <MathFormula>{'(x^3 - 5x^2 + 6x) \\div (x - 2)'}</MathFormula></h4>
              
              <div className="long-division-visual">
                <div className="division-step">
                  <strong>Passo 1:</strong> Dividir <MathFormula>{'x^3 \\div x = x^2'}</MathFormula>
                  <MathFormula display>
                    {'\\begin{array}{r|l} & x^2 \\\\ \\hline x - 2 & x^3 - 5x^2 + 6x + 0 \\\\ & x^3 - 2x^2 \\\\ \\hline & -3x^2 + 6x \\end{array}'}
                  </MathFormula>
                  <p className="step-explanation">Multiplicamos <MathFormula>{'x^2 \\times (x - 2) = x^3 - 2x^2'}</MathFormula> e subtraímos.</p>
                </div>

                <div className="division-step">
                  <strong>Passo 2:</strong> Dividir <MathFormula>{'-3x^2 \\div x = -3x'}</MathFormula>
                  <MathFormula display>
                    {'\\begin{array}{r|l} & x^2 - 3x \\\\ \\hline x - 2 & x^3 - 5x^2 + 6x + 0 \\\\ & x^3 - 2x^2 \\\\ \\hline & -3x^2 + 6x \\\\ & -3x^2 + 6x \\\\ \\hline & 0 \\end{array}'}
                  </MathFormula>
                  <p className="step-explanation">Multiplicamos <MathFormula>{'-3x \\times (x - 2) = -3x^2 + 6x'}</MathFormula> e subtraímos. Resto = 0.</p>
                </div>

                <div className="result-box">
                  <strong>Resultado Final:</strong>
                  <p>Quociente: <MathFormula>{'Q(x) = x^2 - 3x'}</MathFormula></p>
                  <p>Resto: <MathFormula>{'R(x) = 0'}</MathFormula></p>
                  <MathFormula display>
                    {'x^3 - 5x^2 + 6x = (x - 2)(x^2 - 3x) + 0'}
                  </MathFormula>
                  <p className="verification">✓ Divisão exata! O polinômio é divisível.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Ferramenta Interativa</h2>
            <p className="text-content">
              Configure os polinômios e veja o processo de divisão passo a passo:
            </p>
            
            <div className="polynomial-input">
              <div className="input-section">
                <h4>Dividendo (P(x)):</h4>
                <p className="polynomial-display">{formatPolynomial(longDiv.dividend)}</p>
                <div className="coefficient-inputs">
                  {longDiv.dividend.map((coef, i) => (
                    <div key={i} className="coef-input">
                      <label>x^{longDiv.dividend.length - 1 - i}:</label>
                      <input
                        type="number"
                        value={coef}
                        onChange={(e) => {
                          const newDividend = [...longDiv.dividend];
                          newDividend[i] = parseFloat(e.target.value) || 0;
                          setLongDiv({ ...longDiv, dividend: newDividend, step: 0 });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-section">
                <h4>Divisor (D(x)):</h4>
                <p className="polynomial-display">{formatPolynomial(longDiv.divisor)}</p>
                <div className="coefficient-inputs">
                  {longDiv.divisor.map((coef, i) => (
                    <div key={i} className="coef-input">
                      <label>x^{longDiv.divisor.length - 1 - i}:</label>
                      <input
                        type="number"
                        value={coef}
                        onChange={(e) => {
                          const newDivisor = [...longDiv.divisor];
                          newDivisor[i] = parseFloat(e.target.value) || 0;
                          setLongDiv({ ...longDiv, divisor: newDivisor, step: 0 });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="division-result">
              {(() => {
                const { quotient, remainder } = performLongDivision(longDiv.dividend, longDiv.divisor);
                return (
                  <div className="result-display">
                    <p><strong>Quociente:</strong> {formatPolynomial(quotient)}</p>
                    <p><strong>Resto:</strong> {formatPolynomial(remainder)}</p>
                  </div>
                );
              })()}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 3: Briot-Ruffini */}
      <section id="briot-ruffini" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Dispositivo de Briot-Ruffini</h1>
            <p className="section-intro">
              O dispositivo de Briot-Ruffini é uma técnica prática e eficiente para dividir um polinômio por um binômio da forma (x - a). É muito mais rápido que o método da chave e amplamente usado em problemas de fatoração.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Quando Usar?</h2>
            <p className="text-content">
              Use Briot-Ruffini quando o divisor for um binômio de primeiro grau na forma <MathFormula>{'(x - a)'}</MathFormula> ou <MathFormula>{'(x + a)'}</MathFormula>.
            </p>
            <ul className="content-list">
              <li>Para <MathFormula>{'(x - a)'}</MathFormula>, use a raiz <MathFormula>{'a'}</MathFormula> diretamente</li>
              <li>Para <MathFormula>{'(x + a)'}</MathFormula>, use a raiz <MathFormula>{'-a'}</MathFormula></li>
              <li>Se o coeficiente de x não for 1, como <MathFormula>{'(2x - 3)'}</MathFormula>, reescreva como <MathFormula>{'2(x - \\frac{3}{2})'}</MathFormula></li>
            </ul>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Procedimento</h2>
            
            <div className="procedure-box">
              <ol className="steps-list">
                <li>Monte uma tabela com os coeficientes do polinômio na primeira linha</li>
                <li>Coloque a raiz 'a' à esquerda da tabela</li>
                <li>Baixe o primeiro coeficiente</li>
                <li>Multiplique-o por 'a' e some com o próximo coeficiente</li>
                <li>Repita o processo até o último coeficiente</li>
                <li>A última linha contém os coeficientes do quociente e o resto (último número)</li>
              </ol>
            </div>

            <div className="example-detailed">
              <h4>Exemplo: <MathFormula>{'(x^3 - 5x^2 + 6x + 0) \\div (x - 2)'}</MathFormula></h4>
              
              <div className="briot-ruffini-table">
                <table>
                  <tbody>
                    <tr>
                      <td className="root-cell">2</td>
                      <td>1</td>
                      <td>-5</td>
                      <td>6</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="down-arrow">↓</td>
                      <td className="mult-cell">2</td>
                      <td className="mult-cell">-6</td>
                      <td className="mult-cell">0</td>
                    </tr>
                    <tr className="result-row">
                      <td></td>
                      <td>1</td>
                      <td>-3</td>
                      <td>0</td>
                      <td className="remainder-cell">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="step-explanation">
                <div className="step">
                  <strong>Passo 1:</strong> Baixe o 1 → resultado: <MathFormula>{'1'}</MathFormula>
                </div>
                <div className="step">
                  <strong>Passo 2:</strong> <MathFormula>{'1 \\times 2 = 2'}</MathFormula>, soma com -5 → <MathFormula>{'-5 + 2 = -3'}</MathFormula>
                </div>
                <div className="step">
                  <strong>Passo 3:</strong> <MathFormula>{'-3 \\times 2 = -6'}</MathFormula>, soma com 6 → <MathFormula>{'6 + (-6) = 0'}</MathFormula>
                </div>
                <div className="step">
                  <strong>Passo 4:</strong> <MathFormula>{'0 \\times 2 = 0'}</MathFormula>, soma com 0 → <MathFormula>{'0 + 0 = 0'}</MathFormula> (resto)
                </div>
              </div>

              <div className="result-box">
                <strong>Resultado:</strong>
                <p>Quociente: <MathFormula>{'Q(x) = x^2 - 3x'}</MathFormula></p>
                <p>Resto: <MathFormula>{'R = 0'}</MathFormula></p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Calculadora Interativa</h2>
            
            <div className="briot-calculator">
              <div className="calculator-inputs">
                <div className="input-group">
                  <label>Coeficientes do polinômio:</label>
                  <div className="coefficient-inputs">
                    {briotRuffini.coefficients.map((coef, i) => (
                      <div key={i} className="coef-input">
                        <label>x^{briotRuffini.coefficients.length - 1 - i}:</label>
                        <input
                          type="number"
                          value={coef}
                          onChange={(e) => {
                            const newCoeffs = [...briotRuffini.coefficients];
                            newCoeffs[i] = parseFloat(e.target.value) || 0;
                            setBriotRuffini({ ...briotRuffini, coefficients: newCoeffs, step: 0 });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label>Raiz (a) para dividir por (x - a):</label>
                  <input
                    type="number"
                    value={briotRuffini.root}
                    onChange={(e) => setBriotRuffini({ ...briotRuffini, root: parseFloat(e.target.value) || 0, step: 0 })}
                    className="root-input"
                  />
                </div>
              </div>

              <div className="polynomial-display-section">
                <p><strong>P(x) =</strong> {formatPolynomial(briotRuffini.coefficients)}</p>
                <p><strong>Divisor:</strong> (x - {briotRuffini.root})</p>
              </div>

              <div className="animated-table">
                {(() => {
                  const { steps, quotient, remainder } = performBriotRuffini(briotRuffini.coefficients, briotRuffini.root);
                  
                  return (
                    <>
                      <div className="briot-ruffini-table interactive">
                        <table>
                          <tbody>
                            <tr>
                              <td className="root-cell">{briotRuffini.root}</td>
                              {briotRuffini.coefficients.map((coef, i) => (
                                <td key={i}>{coef}</td>
                              ))}
                            </tr>
                            <tr>
                              <td></td>
                              {steps.map((step, i) => (
                                <td key={i} className={step.multiplication !== null ? 'mult-cell' : ''}>
                                  {step.multiplication !== null ? step.multiplication.toFixed(2) : '↓'}
                                </td>
                              ))}
                            </tr>
                            <tr className="result-row">
                              <td></td>
                              {steps.map((step, i) => (
                                <td key={i} className={i === steps.length - 1 ? 'remainder-cell' : ''}>
                                  {step.sum.toFixed(2)}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="result-display">
                        <p><strong>Quociente:</strong> {formatPolynomial(quotient)}</p>
                        <p><strong>Resto:</strong> {remainder.toFixed(3)}</p>
                        {remainder === 0 && (
                          <p className="success-message">✓ Divisão exata! (x - {briotRuffini.root}) é um fator de P(x)</p>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 4: Macetes e Técnicas */}
      <section id="tricks" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Macetes e Técnicas Avançadas</h1>
            <p className="section-intro">
              Estratégias práticas e atalhos que facilitam a divisão e fatoração de polinômios, economizando tempo e esforço em problemas complexos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Fatoração por Agrupamento</h2>
            <p className="text-content">
              Quando um polinômio pode ser dividido em grupos que compartilham fatores comuns:
            </p>
            <div className="example-detailed">
              <h4>Exemplo: <MathFormula>{'x^3 + 3x^2 + 2x + 6'}</MathFormula></h4>
              <div className="step">
                <strong>Passo 1:</strong> Agrupar termos
                <MathFormula display>
                  {'(x^3 + 3x^2) + (2x + 6)'}
                </MathFormula>
              </div>
              <div className="step">
                <strong>Passo 2:</strong> Fatorar cada grupo
                <MathFormula display>
                  {'x^2(x + 3) + 2(x + 3)'}
                </MathFormula>
              </div>
              <div className="step">
                <strong>Passo 3:</strong> Fatorar o termo comum
                <MathFormula display>
                  {'(x + 3)(x^2 + 2)'}
                </MathFormula>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Produtos Notáveis para Fatoração</h2>
            <div className="notable-products">
              <div className="product-item">
                <MathFormula display>
                  {'a^2 - b^2 = (a + b)(a - b)'}
                </MathFormula>
                <p>Diferença de quadrados</p>
              </div>
              <div className="product-item">
                <MathFormula display>
                  {'a^3 + b^3 = (a + b)(a^2 - ab + b^2)'}
                </MathFormula>
                <p>Soma de cubos</p>
              </div>
              <div className="product-item">
                <MathFormula display>
                  {'a^3 - b^3 = (a - b)(a^2 + ab + b^2)'}
                </MathFormula>
                <p>Diferença de cubos</p>
              </div>
              <div className="product-item">
                <MathFormula display>
                  {'a^2 + 2ab + b^2 = (a + b)^2'}
                </MathFormula>
                <p>Quadrado da soma</p>
              </div>
              <div className="product-item">
                <MathFormula display>
                  {'a^2 - 2ab + b^2 = (a - b)^2'}
                </MathFormula>
                <p>Quadrado da diferença</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Dicas Profissionais</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">💡</div>
                <h4>Teste Raízes Simples Primeiro</h4>
                <p>Sempre teste ±1, ±2 como possíveis raízes antes de tentar valores mais complexos.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">⚡</div>
                <h4>Verifique com o Teorema do Resto</h4>
                <p>Use P(a) = 0 para confirmar se 'a' é raiz antes de fazer a divisão completa.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4>Organize Seus Coeficientes</h4>
                <p>Sempre inclua termos com coeficiente zero para não perder potências intermediárias.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔍</div>
                <h4>Divisões Sucessivas</h4>
                <p>Para polinômios de grau alto, divida sucessivamente por fatores de grau 1 ou 2.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📐</div>
                <h4>Relações de Girard</h4>
                <p>Use as relações entre coeficientes e raízes para encontrar raízes adicionais.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">✅</div>
                <h4>Sempre Verifique</h4>
                <p>Multiplique quociente por divisor e some o resto para verificar o resultado.</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Polynomials;

