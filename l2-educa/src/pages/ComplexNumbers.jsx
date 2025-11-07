import React, { useState, useRef, useEffect } from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './ComplexNumbers.css';

// Clean - no formulaCache - universal hook handles it
const ComplexNumbers = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'home' },
    { id: 'forms', title: 'Formas', icon: 'transform' },
    { id: 'operations', title: 'Operações', icon: 'calculate' },
    { id: 'modulus', title: 'Módulo', icon: 'straighten' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  // Estados para calculadoras
  const [algebraicForm, setAlgebraicForm] = useState({ a: 3, b: 4 });
  const [trigForm, setTrigForm] = useState({ r: 5, theta: 53.13 });
  const [operation, setOperation] = useState({ z1: { a: 3, b: 4 }, z2: { a: 1, b: 2 }, type: 'add' });
  
  const canvasRef = useRef(null);
  const operationCanvasRef = useRef(null);

  // Converter de algébrica para trigonométrica
  const algebraicToTrig = (a, b) => {
    const r = Math.sqrt(a * a + b * b);
    let theta = Math.atan2(b, a) * (180 / Math.PI);
    if (theta < 0) theta += 360;
    return { r: r.toFixed(3), theta: theta.toFixed(2) };
  };

  // Converter de trigonométrica para algébrica
  const trigToAlgebraic = (r, theta) => {
    const thetaRad = (theta * Math.PI) / 180;
    const a = r * Math.cos(thetaRad);
    const b = r * Math.sin(thetaRad);
    return { a: a.toFixed(3), b: b.toFixed(3) };
  };

  // Desenhar número complexo no plano
  const drawComplexPlane = (canvas, a, b) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    // Limpar canvas
    ctx.clearRect(0, 0, width, height);

    // Fundo
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Eixos
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    
    // Eixo real
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Eixo imaginário
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      if (i !== 0) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * scale, 0);
        ctx.lineTo(centerX + i * scale, height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, centerY + i * scale);
        ctx.lineTo(width, centerY + i * scale);
        ctx.stroke();
      }
    }

    // Vetor do número complexo
    const x = centerX + a * scale;
    const y = centerY - b * scale;

    // Linha do vetor
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Ponto
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(`(${a.toFixed(2)}, ${b.toFixed(2)}i)`, x + 15, y - 10);
  };

  // Operações com números complexos
  const performOperation = (z1, z2, type) => {
    const { a: a1, b: b1 } = z1;
    const { a: a2, b: b2 } = z2;

    switch (type) {
      case 'add':
        return { a: a1 + a2, b: b1 + b2 };
      case 'subtract':
        return { a: a1 - a2, b: b1 - b2 };
      case 'multiply':
        return { a: a1 * a2 - b1 * b2, b: a1 * b2 + a2 * b1 };
      case 'divide':
        const denom = a2 * a2 + b2 * b2;
        return { a: (a1 * a2 + b1 * b2) / denom, b: (b1 * a2 - a1 * b2) / denom };
      default:
        return { a: 0, b: 0 };
    }
  };

  // Efeitos para desenhar nos canvas
  useEffect(() => {
    drawComplexPlane(canvasRef.current, algebraicForm.a, algebraicForm.b);
  }, [algebraicForm]);

  useEffect(() => {
    const result = performOperation(operation.z1, operation.z2, operation.type);
    if (operationCanvasRef.current) {
      drawComplexPlane(operationCanvasRef.current, result.a, result.b);
    }
  }, [operation]);

  return (
    <div className="complex-numbers-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Seção 1: Introdução */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Números Complexos</h1>
            <p className="section-intro">
              Os números complexos estendem o sistema dos números reais, permitindo soluções para equações que não têm solução no conjunto dos reais, como x² + 1 = 0. Eles formam um campo fundamental para diversas áreas da matemática, física e engenharia.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Definição e Estrutura</h2>
            <p className="text-content">
              Um número complexo <strong>z</strong> é expresso na forma algébrica:
            </p>
            <MathFormula display>
              {'z = a + bi'}
            </MathFormula>
            <p className="text-content">
              Onde:
            </p>
            <ul className="content-list">
              <li><strong>a</strong> é a parte real: <MathFormula>{'\\text{Re}(z) = a'}</MathFormula></li>
              <li><strong>b</strong> é a parte imaginária: <MathFormula>{'\\text{Im}(z) = b'}</MathFormula></li>
              <li><strong>i</strong> é a unidade imaginária, definida por <MathFormula>{'i^2 = -1'}</MathFormula></li>
            </ul>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Plano de Argand-Gauss</h2>
            <p className="text-content">
              Os números complexos podem ser representados geometricamente no plano complexo (ou plano de Argand-Gauss), onde o eixo horizontal representa a parte real e o eixo vertical representa a parte imaginária.
            </p>
            <div className="interactive-tool">
              <canvas ref={canvasRef} width="600" height="400" className="complex-canvas"></canvas>
              <div className="controls">
                <div className="control-group">
                  <label>Parte Real (a): {algebraicForm.a}</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={algebraicForm.a}
                    onChange={(e) => setAlgebraicForm({ ...algebraicForm, a: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="control-group">
                  <label>Parte Imaginária (b): {algebraicForm.b}</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={algebraicForm.b}
                    onChange={(e) => setAlgebraicForm({ ...algebraicForm, b: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 2: Formas de Representação */}
      <section id="forms" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Formas de Representação</h1>
            <p className="section-intro">
              Um número complexo pode ser representado de três formas principais: algébrica, trigonométrica e exponencial. Cada forma tem suas vantagens dependendo da operação a ser realizada.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Forma Algébrica</h2>
            <MathFormula display>
              {'z = a + bi'}
            </MathFormula>
            <p className="text-content">
              É a forma mais intuitiva, ideal para adição e subtração.
            </p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Forma Trigonométrica (Polar)</h2>
            <MathFormula display>
              {'z = r(\\cos\\theta + i\\sin\\theta)'}
            </MathFormula>
            <p className="text-content">
              Onde:
            </p>
            <ul className="content-list">
              <li><strong>r</strong> é o módulo: <MathFormula>{'r = |z| = \\sqrt{a^2 + b^2}'}</MathFormula></li>
              <li><strong>θ</strong> é o argumento: <MathFormula>{'\\theta = \\arctan\\left(\\frac{b}{a}\\right)'}</MathFormula></li>
            </ul>
            <p className="text-content">
              Esta forma é ideal para multiplicação, divisão e potenciação.
            </p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Forma Exponencial</h2>
            <MathFormula display>
              {'z = re^{i\\theta}'}
            </MathFormula>
            <p className="text-content">
              Baseada na fórmula de Euler: <MathFormula>{'e^{i\\theta} = \\cos\\theta + i\\sin\\theta'}</MathFormula>
            </p>
            <p className="text-content">
              Esta é a forma mais compacta e poderosa para cálculos avançados.
            </p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={350}>
          <GlassCard>
            <h2 className="subsection-title">Da Forma Trigonométrica para Algébrica</h2>
            <p className="text-content">
              Para inverter o processo, partimos de <MathFormula>{'z = r(\\cos\\theta + i\\sin\\theta)'}</MathFormula> e obtemos a forma algébrica calculando as componentes:
            </p>
            <MathFormula display>
              {'a = r\\cos\\theta \\quad \\text{e} \\quad b = r\\sin\\theta'}
            </MathFormula>
            <p className="text-content">
              Assim, <MathFormula>{'z = a + bi'}</MathFormula>.
            </p>

            <div className="example-box">
              <strong>Exemplo:</strong>
              <p>
                Dado <MathFormula>{'z = \\sqrt{2}(\\cos 135^{\\circ} + i\\sin 135^{\\circ})'}</MathFormula>, temos:
              </p>
              <MathFormula display>
                {'\\cos 135^{\\circ} = -\\tfrac{\\sqrt{2}}{2} \\quad \\text{e} \\quad \\sin 135^{\\circ} = \\tfrac{\\sqrt{2}}{2}'}
              </MathFormula>
              <MathFormula display>
                {'a = \\sqrt{2} \\cdot \\left(-\\tfrac{\\sqrt{2}}{2}\\right) = -1 \\\\ b = \\sqrt{2} \\cdot \\tfrac{\\sqrt{2}}{2} = 1'}
              </MathFormula>
              <p>
                Logo, <MathFormula>{'z = -1 + i'}</MathFormula>.
              </p>
            </div>

            <p className="text-content">
              <strong>Dica:</strong> se <MathFormula>{'\\theta'}</MathFormula> estiver em graus, use cosseno e seno em graus; se estiver em radianos, use as funções trigonométricas em radianos.
            </p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <GlassCard>
            <h2 className="subsection-title">Conversor Interativo</h2>
            <div className="converter-grid">
              <div className="converter-section">
                <h3>Forma Algébrica → Trigonométrica</h3>
                <div className="converter-inputs">
                  <div className="input-group">
                    <label>a (parte real):</label>
                    <input
                      type="number"
                      value={algebraicForm.a}
                      onChange={(e) => setAlgebraicForm({ ...algebraicForm, a: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="input-group">
                    <label>b (parte imaginária):</label>
                    <input
                      type="number"
                      value={algebraicForm.b}
                      onChange={(e) => setAlgebraicForm({ ...algebraicForm, b: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="converter-result">
                  <p>z = {algebraicForm.a} + {algebraicForm.b}i</p>
                  <div className="arrow-down">↓</div>
                  {(() => {
                    const trig = algebraicToTrig(algebraicForm.a, algebraicForm.b);
                    return (
                      <>
                        <p>r = {trig.r}</p>
                        <p>θ = {trig.theta}°</p>
                        <p className="formula-small">z = {trig.r}(cos {trig.theta}° + i sen {trig.theta}°)</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="converter-section">
                <h3>Forma Trigonométrica → Algébrica</h3>
                <div className="converter-inputs">
                  <div className="input-group">
                    <label>r (módulo):</label>
                    <input
                      type="number"
                      value={trigForm.r}
                      onChange={(e) => setTrigForm({ ...trigForm, r: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="input-group">
                    <label>θ (graus):</label>
                    <input
                      type="number"
                      value={trigForm.theta}
                      onChange={(e) => setTrigForm({ ...trigForm, theta: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="converter-result">
                  <p>z = {trigForm.r}(cos {trigForm.theta}° + i sen {trigForm.theta}°)</p>
                  <div className="arrow-down">↓</div>
                  {(() => {
                    const alg = trigToAlgebraic(trigForm.r, trigForm.theta);
                    return (
                      <>
                        <p>a = {alg.a}</p>
                        <p>b = {alg.b}</p>
                        <p className="formula-small">z = {alg.a} + {alg.b}i</p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 3: Operações */}
      <section id="operations" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Operações com Números Complexos</h1>
            <p className="section-intro">
              As operações com números complexos seguem regras específicas que combinam as propriedades dos números reais com as propriedades da unidade imaginária i.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Adição e Subtração</h2>
            <p className="text-content">
              Para somar ou subtrair números complexos, basta operar separadamente as partes reais e imaginárias:
            </p>
            <MathFormula display>
              {'(a + bi) \\pm (c + di) = (a \\pm c) + (b \\pm d)i'}
            </MathFormula>
            <div className="example-box">
              <strong>Exemplo:</strong>
              <p><MathFormula>{'(3 + 4i) + (1 + 2i) = (3 + 1) + (4 + 2)i = 4 + 6i'}</MathFormula></p>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Multiplicação</h2>
            <p className="text-content">
              A multiplicação utiliza a propriedade distributiva e <MathFormula>{'i^2 = -1'}</MathFormula>:
            </p>
            <MathFormula display>
              {'(a + bi)(c + di) = (ac - bd) + (ad + bc)i'}
            </MathFormula>
            <div className="example-box">
              <strong>Exemplo:</strong>
              <p><MathFormula>{'(3 + 4i)(1 + 2i) = 3 \\cdot 1 - 4 \\cdot 2 + (3 \\cdot 2 + 4 \\cdot 1)i = -5 + 10i'}</MathFormula></p>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Divisão</h2>
            <p className="text-content">
              Para dividir, multiplicamos numerador e denominador pelo conjugado do denominador:
            </p>
            <MathFormula display>
              {'\\frac{a + bi}{c + di} = \\frac{(a + bi)(c - di)}{c^2 + d^2}'}
            </MathFormula>
            <MathFormula display>
              {'= \\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <GlassCard>
            <h2 className="subsection-title">Calculadora de Operações</h2>
            <div className="operation-calculator">
              <div className="operation-inputs">
                <div className="complex-input">
                  <h4>z₁</h4>
                  <input
                    type="number"
                    placeholder="Parte real"
                    value={operation.z1.a}
                    onChange={(e) => setOperation({ ...operation, z1: { ...operation.z1, a: parseFloat(e.target.value) || 0 } })}
                  />
                  <span>+</span>
                  <input
                    type="number"
                    placeholder="Parte imaginária"
                    value={operation.z1.b}
                    onChange={(e) => setOperation({ ...operation, z1: { ...operation.z1, b: parseFloat(e.target.value) || 0 } })}
                  />
                  <span>i</span>
                </div>

                <div className="operation-selector">
                  <select
                    value={operation.type}
                    onChange={(e) => setOperation({ ...operation, type: e.target.value })}
                  >
                    <option value="add">+</option>
                    <option value="subtract">−</option>
                    <option value="multiply">×</option>
                    <option value="divide">÷</option>
                  </select>
                </div>

                <div className="complex-input">
                  <h4>z₂</h4>
                  <input
                    type="number"
                    placeholder="Parte real"
                    value={operation.z2.a}
                    onChange={(e) => setOperation({ ...operation, z2: { ...operation.z2, a: parseFloat(e.target.value) || 0 } })}
                  />
                  <span>+</span>
                  <input
                    type="number"
                    placeholder="Parte imaginária"
                    value={operation.z2.b}
                    onChange={(e) => setOperation({ ...operation, z2: { ...operation.z2, b: parseFloat(e.target.value) || 0 } })}
                  />
                  <span>i</span>
                </div>
              </div>

              <div className="operation-result">
                <h4>Resultado:</h4>
                {(() => {
                  const result = performOperation(operation.z1, operation.z2, operation.type);
                  return (
                    <div className="result-display">
                      <p className="result-formula">
                        z = {result.a.toFixed(3)} + {result.b.toFixed(3)}i
                      </p>
                    </div>
                  );
                })()}
              </div>

              <div className="operation-visualization">
                <h4>Visualização do Resultado:</h4>
                <canvas ref={operationCanvasRef} width="600" height="400" className="complex-canvas"></canvas>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 4: Módulo e Argumento */}
      <section id="modulus" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Módulo e Argumento</h1>
            <p className="section-intro">
              O módulo e o argumento são conceitos fundamentais que conectam a representação algébrica e trigonométrica dos números complexos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Módulo (ou Valor Absoluto)</h2>
            <p className="text-content">
              O módulo de um número complexo <MathFormula>{'z = a + bi'}</MathFormula> é a distância do ponto (a, b) até a origem no plano complexo:
            </p>
            <MathFormula display>
              {'|z| = \\sqrt{a^2 + b^2}'}
            </MathFormula>
            <div className="properties-box">
              <strong>Propriedades:</strong>
              <ul>
                <li><MathFormula>{'|z| \\geq 0'}</MathFormula>, sendo <MathFormula>{'|z| = 0 \\Leftrightarrow z = 0'}</MathFormula></li>
                <li><MathFormula>{'|z_1 \\cdot z_2| = |z_1| \\cdot |z_2|'}</MathFormula></li>
                <li><MathFormula>{'|z_1 / z_2| = |z_1| / |z_2|'}</MathFormula>, se <MathFormula>{'z_2 \\neq 0'}</MathFormula></li>
                <li><MathFormula>{'|z_1 + z_2| \\leq |z_1| + |z_2|'}</MathFormula> (desigualdade triangular)</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Argumento</h2>
            <p className="text-content">
              O argumento de z é o ângulo θ que o vetor correspondente faz com o eixo real positivo:
            </p>
            <MathFormula display>
              {'\\theta = \\arg(z) = \\arctan\\left(\\frac{b}{a}\\right)'}
            </MathFormula>
            <p className="text-content">
              <strong>Atenção:</strong> É necessário considerar o quadrante em que o número complexo está localizado:
            </p>
            <ul className="content-list">
              <li>1º quadrante (<MathFormula>{'a > 0, b > 0'}</MathFormula>): <MathFormula>{'\\theta = \\arctan(b/a)'}</MathFormula></li>
              <li>2º quadrante (<MathFormula>{'a < 0, b > 0'}</MathFormula>): <MathFormula>{'\\theta = \\pi + \\arctan(b/a)'}</MathFormula></li>
              <li>3º quadrante (<MathFormula>{'a < 0, b < 0'}</MathFormula>): <MathFormula>{'\\theta = \\pi + \\arctan(b/a)'}</MathFormula></li>
              <li>4º quadrante (<MathFormula>{'a > 0, b < 0'}</MathFormula>): <MathFormula>{'\\theta = 2\\pi + \\arctan(b/a)'}</MathFormula></li>
            </ul>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Exemplos Práticos</h2>
            
            <div className="example-detailed">
              <h4>Exemplo 1: Calcular módulo e argumento de <MathFormula>{'z = 3 + 4i'}</MathFormula></h4>
              <div className="step">
                <strong>Passo 1:</strong> Calcular o módulo
                <MathFormula display>
                  {'|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5'}
                </MathFormula>
              </div>
              <div className="step">
                <strong>Passo 2:</strong> Calcular o argumento
                <MathFormula display>
                  {'\\theta = \\arctan\\left(\\frac{4}{3}\\right) \\approx 53.13°'}
                </MathFormula>
                <p>Como <MathFormula>{'a = 3 > 0'}</MathFormula> e <MathFormula>{'b = 4 > 0'}</MathFormula>, o número está no 1º quadrante.</p>
              </div>
              <div className="step">
                <strong>Resultado:</strong>
                <MathFormula display>
                  {'z = 5(\\cos 53.13° + i\\sin 53.13°)'}
                </MathFormula>
              </div>
            </div>

            <div className="example-detailed">
              <h4>Exemplo 2: Calcular módulo e argumento de <MathFormula>{'z = -1 + i'}</MathFormula></h4>
              <div className="step">
                <strong>Passo 1:</strong> Calcular o módulo
                <MathFormula display>
                  {'|z| = \\sqrt{(-1)^2 + 1^2} = \\sqrt{1 + 1} = \\sqrt{2} \\approx 1.414'}
                </MathFormula>
              </div>
              <div className="step">
                <strong>Passo 2:</strong> Calcular o argumento
                <MathFormula display>
                  {'\\arctan\\left(\\frac{1}{-1}\\right) = \\arctan(-1) = -45°'}
                </MathFormula>
                <p>Como <MathFormula>{'a = -1 < 0'}</MathFormula> e <MathFormula>{'b = 1 > 0'}</MathFormula>, o número está no 2º quadrante.</p>
                <MathFormula display>
                  {'\\theta = 180° - 45° = 135°'}
                </MathFormula>
              </div>
              <div className="step">
                <strong>Resultado:</strong>
                <MathFormula display>
                  {'z = \\sqrt{2}(\\cos 135° + i\\sin 135°)'}
                </MathFormula>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default ComplexNumbers;

