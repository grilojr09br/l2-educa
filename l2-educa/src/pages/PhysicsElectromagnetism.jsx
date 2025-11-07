import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import InlineFormula from '../components/InlineFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import { useProgress } from '../utils/progressTracker';
import './PhysicsElectromagnetism.css';

const PhysicsElectromagnetism = () => {
  const { navigateWithTransition } = useNavigation();
  const { markVisited, markCompleted, isCompleted } = useProgress('physics', 'eletromagnetismo');
  
  // Define sections for navigation
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'bolt' },
    { id: 'campo-eletrico', title: 'Campo Elétrico', icon: 'flash_on' },
    { id: 'corrente', title: 'Corrente Elétrica', icon: 'electrical_services' },
    { id: 'circuitos', title: 'Circuitos', icon: 'settings_ethernet' },
    { id: 'magnetismo', title: 'Magnetismo', icon: 'radio_button_checked' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  useEffect(() => {
    markVisited();
  }, [markVisited]);

  const handleNavigate = (path) => {
    navigateWithTransition(path, 'red');
  };

  // Calculator states
  const [ohmCalc, setOhmCalc] = useState({ U: 12, R: 4 });
  const [powerCalc, setPowerCalc] = useState({ U: 120, I: 10 });
  const [seriesCalc, setSeriesCalc] = useState({ R1: 10, R2: 20, R3: 30 });
  const [parallelCalc, setParallelCalc] = useState({ R1: 6, R2: 12 });
  const [coulombCalc, setCoulombCalc] = useState({ q1: 1, q2: 1, r: 1 });

  // Canvas refs
  const circuitCanvasRef = useRef(null);
  const fieldCanvasRef = useRef(null);

  // Ohm's Law Calculator
  const calculateOhm = () => {
    const { U, R } = ohmCalc;
    if (R === 0) return { I: 0, P: 0 };
    
    const I = U / R;
    const P = U * I;
    
    return { I: I.toFixed(2), P: P.toFixed(2) };
  };

  // Power Calculator
  const calculatePower = () => {
    const { U, I } = powerCalc;
    const P = U * I;
    const R = I !== 0 ? U / I : 0;
    
    return { P: P.toFixed(2), R: R.toFixed(2) };
  };

  // Series Resistance Calculator
  const calculateSeries = () => {
    const { R1, R2, R3 } = seriesCalc;
    const Req = R1 + R2 + R3;
    
    return { Req: Req.toFixed(2) };
  };

  // Parallel Resistance Calculator
  const calculateParallel = () => {
    const { R1, R2 } = parallelCalc;
    if (R1 === 0 || R2 === 0) return { Req: 0 };
    
    const Req = (R1 * R2) / (R1 + R2);
    
    return { Req: Req.toFixed(2) };
  };

  // Coulomb's Law Calculator
  const calculateCoulomb = () => {
    const { q1, q2, r } = coulombCalc;
    if (r === 0) return { F: 'Indefinido' };
    
    const k = 9e9; // N·m²/C²
    const F = (k * Math.abs(q1) * Math.abs(q2)) / (r * r);
    
    const notation = F >= 1e6 || F <= 1e-6 ? F.toExponential(2) : F.toFixed(2);
    
    return { F: notation };
  };

  // Draw circuit diagram
  useEffect(() => {
    const canvas = circuitCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);
    
    // Circuit elements
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    
    // Battery
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 150);
    ctx.stroke();
    
    // Battery symbol
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, 150);
    ctx.lineTo(120, 150);
    ctx.stroke();
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(90, 170);
    ctx.lineTo(110, 170);
    ctx.stroke();
    
    // Wire from battery to resistor
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 170);
    ctx.lineTo(100, 220);
    ctx.lineTo(width / 2, 220);
    ctx.stroke();
    
    // Resistor
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    const resistorX = width / 2;
    const resistorY = 220;
    ctx.beginPath();
    ctx.moveTo(resistorX, resistorY);
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(resistorX + 15 + i * 30, resistorY + (i % 2 === 0 ? -15 : 15));
    }
    ctx.lineTo(resistorX + 120, resistorY);
    ctx.stroke();
    
    // Wire from resistor back
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(resistorX + 120, 220);
    ctx.lineTo(width - 100, 220);
    ctx.lineTo(width - 100, 100);
    ctx.lineTo(100, 100);
    ctx.stroke();
    
    // Current arrows
    ctx.strokeStyle = '#10b981';
    ctx.fillStyle = '#10b981';
    ctx.lineWidth = 2;
    
    // Arrow 1
    ctx.beginPath();
    ctx.moveTo(150, 220);
    ctx.lineTo(180, 220);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 220);
    ctx.lineTo(175, 215);
    ctx.lineTo(175, 225);
    ctx.closePath();
    ctx.fill();
    
    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px sans-serif';
    ctx.fillText('Bateria', 105, 140);
    ctx.fillText('Resistor', resistorX + 30, resistorY - 25);
    ctx.fillText('i', 190, 215);
    
  }, []);

  // Draw electric field
  useEffect(() => {
    const canvas = fieldCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);
    
    // Positive charge
    const posX = width / 3;
    ctx.beginPath();
    ctx.arc(posX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#ef4444';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('+', posX - 8, centerY + 8);
    
    // Negative charge
    const negX = (2 * width) / 3;
    ctx.beginPath();
    ctx.arc(negX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('−', negX - 8, centerY + 8);
    
    // Field lines from positive
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const startX = posX + 25 * Math.cos(rad);
      const startY = centerY + 25 * Math.sin(rad);
      const endX = posX + 80 * Math.cos(rad);
      const endY = centerY + 80 * Math.sin(rad);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Arrow
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 8 * Math.cos(rad - 0.3), endY - 8 * Math.sin(rad - 0.3));
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 8 * Math.cos(rad + 0.3), endY - 8 * Math.sin(rad + 0.3));
      ctx.stroke();
    }
    
    // Field lines to negative
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const endX = negX - 25 * Math.cos(rad);
      const endY = centerY - 25 * Math.sin(rad);
      const startX = negX - 80 * Math.cos(rad);
      const startY = centerY - 80 * Math.sin(rad);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Arrow
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX + 8 * Math.cos(rad - 0.3), endY + 8 * Math.sin(rad - 0.3));
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX + 8 * Math.cos(rad + 0.3), endY + 8 * Math.sin(rad + 0.3));
      ctx.stroke();
    }
    
  }, []);

  const ohmResult = calculateOhm();
  const powerResult = calculatePower();
  const seriesResult = calculateSeries();
  const parallelResult = calculateParallel();
  const coulombResult = calculateCoulomb();

  return (
    <div className="physics-electromagnetism-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => handleNavigate('/')} className="breadcrumb-link">
          <span className="material-icons">home</span>
          Início
        </button>
        <span className="breadcrumb-separator">›</span>
        <button onClick={() => handleNavigate('/physics')} className="breadcrumb-link">
          Física
        </button>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Eletromagnetismo</span>
      </div>

      {/* Hero Section */}
      <section id="intro" className="electromagnetism-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">flash_on</span>
            ELETROMAGNETISMO
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="electromagnetism-title">
            <span className="gradient-text">Eletromagnetismo</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="electromagnetism-subtitle">
            Domine a eletricidade e o magnetismo: de circuitos simples à indução eletromagnética. 
            A física que move o mundo moderno.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <button
            className={`completion-button ${isCompleted ? 'completed' : ''}`}
            onClick={() => markCompleted(!isCompleted)}
          >
            <span className="material-icons">
              {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            {isCompleted ? 'Tópico Completo' : 'Marcar como Completo'}
          </button>
        </ScrollReveal>
      </section>

      {/* Content Sections */}
      <div className="electromagnetism-content">
        
        {/* Section 1: Eletrostática */}
        <ScrollReveal>
          <GlassCard id="campo-eletrico" className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">bolt</span>
              <h2>Eletrostática</h2>
            </div>

            <div className="section-body">
              <h3>Carga Elétrica</h3>
              <p>
                Toda matéria é composta por átomos, que contêm partículas carregadas:
              </p>
              <ul>
                <li><strong>Prótons:</strong> Carga positiva (+), localizados no núcleo</li>
                <li><strong>Elétrons:</strong> Carga negativa (−), na eletrosfera</li>
                <li><strong>Nêutrons:</strong> Sem carga, localizados no núcleo</li>
              </ul>

              <div className="law-box">
                <strong>Princípios Fundamentais:</strong>
                <ul>
                  <li>Cargas de mesmo sinal se repelem</li>
                  <li>Cargas de sinais opostos se atraem</li>
                  <li>A carga elétrica é quantizada: <InlineFormula formula="Q = n \cdot e" />, onde <InlineFormula formula="e = 1,6 \times 10^{-19}" /> C</li>
                </ul>
              </div>

              <h3>Processos de Eletrização</h3>
              <div className="electrization-grid">
                <div className="process-card">
                  <h4>Atrito</h4>
                  <p>Transferência de elétrons por fricção entre materiais diferentes. Os corpos ficam com cargas opostas e de mesmo módulo.</p>
                </div>
                <div className="process-card">
                  <h4>Contato</h4>
                  <p>Corpo eletrizado toca corpo neutro. Ambos ficam com cargas de mesmo sinal após o contato.</p>
                </div>
                <div className="process-card">
                  <h4>Indução</h4>
                  <p>Eletrização sem contato direto. O corpo induzido fica com carga oposta ao indutor.</p>
                </div>
              </div>

              <h3>Lei de Coulomb</h3>
              <p>
                A força elétrica entre duas cargas puntiformes é diretamente proporcional 
                ao produto das cargas e inversamente proporcional ao quadrado da distância:
              </p>

              <div className="formula-box highlight">
                <MathFormula formula="F = k \frac{|q_1 \cdot q_2|}{r^2}" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="F" />: Força elétrica (N)</li>
                  <li><InlineFormula formula="k = 9 \times 10^9" /> N·m²/C² (constante eletrostática no vácuo)</li>
                  <li><InlineFormula formula="q_1, q_2" />: Cargas elétricas (C)</li>
                  <li><InlineFormula formula="r" />: Distância entre as cargas (m)</li>
                </ul>
              </div>

              <canvas
                ref={fieldCanvasRef}
                width={600}
                height={300}
                className="physics-canvas"
              />

              <h3>Campo Elétrico</h3>
              <p>
                Região do espaço ao redor de uma carga elétrica onde outra carga sofre 
                influência de uma força elétrica:
              </p>
              <MathFormula formula="\vec{E} = \frac{\vec{F}}{q}" />
              <p>Para uma carga puntiforme:</p>
              <MathFormula formula="E = k \frac{|Q|}{r^2}" />

              {/* Coulomb Calculator */}
              <div className="calculator-section">
                <h4>Calculadora - Lei de Coulomb</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Carga q₁ [µC]:</label>
                    <input
                      type="number"
                      value={coulombCalc.q1}
                      onChange={(e) => setCoulombCalc({ ...coulombCalc, q1: parseFloat(e.target.value) || 0 })}
                      step="0.1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Carga q₂ [µC]:</label>
                    <input
                      type="number"
                      value={coulombCalc.q2}
                      onChange={(e) => setCoulombCalc({ ...coulombCalc, q2: parseFloat(e.target.value) || 0 })}
                      step="0.1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Distância r [cm]:</label>
                    <input
                      type="number"
                      value={coulombCalc.r}
                      onChange={(e) => setCoulombCalc({ ...coulombCalc, r: parseFloat(e.target.value) || 0 })}
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Força Elétrica:</strong> {coulombResult.F} N
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 2: Corrente Elétrica */}
        <ScrollReveal>
          <GlassCard id="corrente" className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">cable</span>
              <h2>Corrente Elétrica</h2>
            </div>

            <div className="section-body">
              <h3>O que é Corrente Elétrica?</h3>
              <p>
                É o movimento ordenado de portadores de carga elétrica (geralmente elétrons) 
                através de um condutor. Medida em <strong>Ampère (A)</strong>.
              </p>

              <div className="formula-box">
                <MathFormula formula="i = \frac{\Delta Q}{\Delta t}" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="i" />: Intensidade da corrente elétrica (A)</li>
                  <li><InlineFormula formula="\Delta Q" />: Quantidade de carga (C)</li>
                  <li><InlineFormula formula="\Delta t" />: Intervalo de tempo (s)</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Sentidos da Corrente</h4>
                <ul>
                  <li><strong>Sentido Real:</strong> Movimento dos elétrons (do − para o +)</li>
                  <li><strong>Sentido Convencional:</strong> Sentido adotado nas análises (do + para o −)</li>
                </ul>
                <p>Usamos o sentido convencional na maioria dos cálculos e diagramas.</p>
              </div>

              <h3>Condutores e Isolantes</h3>
              <div className="two-columns">
                <div className="column">
                  <h4>Condutores</h4>
                  <p>Materiais que permitem a passagem fácil de corrente elétrica.</p>
                  <ul>
                    <li>Metais (cobre, alumínio, ouro)</li>
                    <li>Soluções iônicas</li>
                    <li>Grafite</li>
                  </ul>
                </div>
                <div className="column">
                  <h4>Isolantes</h4>
                  <p>Materiais que dificultam a passagem de corrente.</p>
                  <ul>
                    <li>Borracha</li>
                    <li>Plástico</li>
                    <li>Vidro</li>
                    <li>Ar seco</li>
                  </ul>
                </div>
              </div>

              <h3>Efeitos da Corrente Elétrica</h3>
              <ul>
                <li><strong>Efeito Joule (Térmico):</strong> Aquecimento (chuveiros, ferros de passar)</li>
                <li><strong>Efeito Luminoso:</strong> Emissão de luz (lâmpadas, LEDs)</li>
                <li><strong>Efeito Magnético:</strong> Campo magnético (motores, transformadores)</li>
                <li><strong>Efeito Químico:</strong> Reações químicas (eletrólise, baterias)</li>
                <li><strong>Efeito Fisiológico:</strong> Ação sobre seres vivos (choque elétrico)</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 3: Lei de Ohm e Resistência */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">electrical_services</span>
              <h2>Tensão e Resistência</h2>
            </div>

            <div className="section-body">
              <h3>Tensão Elétrica (Diferença de Potencial)</h3>
              <p>
                É a "pressão" que faz os elétrons se moverem no circuito. Medida em <strong>Volt (V)</strong>.
              </p>
              <MathFormula formula="U = \frac{W}{Q}" />
              <p>Onde <InlineFormula formula="W" /> é a energia (trabalho) e <InlineFormula formula="Q" /> é a carga.</p>

              <h3>Resistência Elétrica</h3>
              <p>
                É a oposição que um material oferece à passagem da corrente elétrica. 
                Medida em <strong>Ohm (Ω)</strong>.
              </p>

              <div className="formula-box">
                <h4>2ª Lei de Ohm (Resistência de um Condutor)</h4>
                <MathFormula formula="R = \rho \frac{L}{A}" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="R" />: Resistência (Ω)</li>
                  <li><InlineFormula formula="\rho" />: Resistividade do material (Ω·m)</li>
                  <li><InlineFormula formula="L" />: Comprimento do condutor (m)</li>
                  <li><InlineFormula formula="A" />: Área da seção transversal (m²)</li>
                </ul>
              </div>

              <h3>1ª Lei de Ohm</h3>
              <p>
                Para resistores ôhmicos (que mantêm resistência constante), a tensão 
                é diretamente proporcional à corrente:
              </p>

              <div className="formula-box highlight">
                <MathFormula formula="U = R \cdot i" />
                <p>Ou reescrevendo:</p>
                <MathFormula formula="i = \frac{U}{R}" />
              </div>

              <canvas
                ref={circuitCanvasRef}
                width={600}
                height={300}
                className="physics-canvas"
              />

              {/* Ohm's Law Calculator */}
              <div className="calculator-section">
                <h4>Calculadora - Lei de Ohm</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Tensão U [V]:</label>
                    <input
                      type="number"
                      value={ohmCalc.U}
                      onChange={(e) => setOhmCalc({ ...ohmCalc, U: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Resistência R [Ω]:</label>
                    <input
                      type="number"
                      value={ohmCalc.R}
                      onChange={(e) => setOhmCalc({ ...ohmCalc, R: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Corrente (i):</strong> {ohmResult.I} A
                  </div>
                  <div className="result-item">
                    <strong>Potência (P):</strong> {ohmResult.P} W
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 4: Potência e Energia */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">power</span>
              <h2>Potência e Energia Elétrica</h2>
            </div>

            <div className="section-body">
              <h3>Potência Elétrica</h3>
              <p>
                É a taxa de conversão de energia elétrica em outra forma de energia. 
                Medida em <strong>Watt (W)</strong>.
              </p>

              <div className="formula-box">
                <h4>Fórmulas da Potência</h4>
                <MathFormula formula="P = U \cdot i" />
                <MathFormula formula="P = R \cdot i^2" />
                <MathFormula formula="P = \frac{U^2}{R}" />
              </div>

              <h3>Energia Elétrica</h3>
              <p>
                É a potência consumida durante um intervalo de tempo. Medida em <strong>Joule (J)</strong> 
                ou <strong>quilowatt-hora (kWh)</strong>.
              </p>

              <div className="formula-box">
                <MathFormula formula="E = P \cdot \Delta t" />
                <p>Para calcular o consumo em kWh:</p>
                <MathFormula formula="E_{(kWh)} = \frac{P_{(W)} \cdot t_{(h)}}{1000}" />
              </div>

              <div className="info-box">
                <h4>Exemplo Prático</h4>
                <p>
                  Um chuveiro de 5000 W ligado por 20 minutos (1/3 de hora) consome:
                </p>
                <MathFormula formula="E = \frac{5000 \times \frac{1}{3}}{1000} = 1,67 \text{ kWh}" />
              </div>

              {/* Power Calculator */}
              <div className="calculator-section">
                <h4>Calculadora de Potência</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Tensão U [V]:</label>
                    <input
                      type="number"
                      value={powerCalc.U}
                      onChange={(e) => setPowerCalc({ ...powerCalc, U: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Corrente i [A]:</label>
                    <input
                      type="number"
                      value={powerCalc.I}
                      onChange={(e) => setPowerCalc({ ...powerCalc, I: parseFloat(e.target.value) || 0 })}
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Potência (P):</strong> {powerResult.P} W
                  </div>
                  <div className="result-item">
                    <strong>Resistência (R):</strong> {powerResult.R} Ω
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 5: Circuitos */}
        <ScrollReveal>
          <GlassCard id="circuitos" className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">account_tree</span>
              <h2>Circuitos Elétricos</h2>
            </div>

            <div className="section-body">
              <h3>Elementos de um Circuito</h3>
              <ul>
                <li><strong>Gerador:</strong> Fornece energia (pilha, bateria, fonte)</li>
                <li><strong>Condutores:</strong> Fios que transportam a corrente</li>
                <li><strong>Receptores:</strong> Consomem energia (lâmpadas, motores, resistores)</li>
                <li><strong>Dispositivos de controle:</strong> Interruptores, chaves</li>
              </ul>

              <h3>Associação em Série</h3>
              <p>
                Resistores conectados em sequência, um após o outro. A corrente é a mesma 
                em todos os resistores.
              </p>

              <div className="formula-box">
                <MathFormula formula="R_{eq} = R_1 + R_2 + R_3 + ..." />
                <p>Propriedades:</p>
                <ul>
                  <li>Corrente constante: <InlineFormula formula="i_{total} = i_1 = i_2 = i_3" /></li>
                  <li>Tensão dividida: <InlineFormula formula="U_{total} = U_1 + U_2 + U_3" /></li>
                </ul>
              </div>

              {/* Series Calculator */}
              <div className="calculator-section">
                <h4>Calculadora - Associação em Série</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>R₁ [Ω]:</label>
                    <input
                      type="number"
                      value={seriesCalc.R1}
                      onChange={(e) => setSeriesCalc({ ...seriesCalc, R1: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>R₂ [Ω]:</label>
                    <input
                      type="number"
                      value={seriesCalc.R2}
                      onChange={(e) => setSeriesCalc({ ...seriesCalc, R2: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>R₃ [Ω]:</label>
                    <input
                      type="number"
                      value={seriesCalc.R3}
                      onChange={(e) => setSeriesCalc({ ...seriesCalc, R3: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Resistência Equivalente:</strong> {seriesResult.Req} Ω
                  </div>
                </div>
              </div>

              <h3>Associação em Paralelo</h3>
              <p>
                Resistores conectados com as extremidades em comum. A tensão é a mesma 
                em todos os resistores.
              </p>

              <div className="formula-box">
                <MathFormula formula="\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ..." />
                <p>Para dois resistores:</p>
                <MathFormula formula="R_{eq} = \frac{R_1 \cdot R_2}{R_1 + R_2}" />
                <p>Propriedades:</p>
                <ul>
                  <li>Tensão constante: <InlineFormula formula="U_{total} = U_1 = U_2 = U_3" /></li>
                  <li>Corrente dividida: <InlineFormula formula="i_{total} = i_1 + i_2 + i_3" /></li>
                </ul>
              </div>

              {/* Parallel Calculator */}
              <div className="calculator-section">
                <h4>Calculadora - Associação em Paralelo</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>R₁ [Ω]:</label>
                    <input
                      type="number"
                      value={parallelCalc.R1}
                      onChange={(e) => setParallelCalc({ ...parallelCalc, R1: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>R₂ [Ω]:</label>
                    <input
                      type="number"
                      value={parallelCalc.R2}
                      onChange={(e) => setParallelCalc({ ...parallelCalc, R2: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Resistência Equivalente:</strong> {parallelResult.Req} Ω
                  </div>
                </div>
              </div>

              <h3>Leis de Kirchhoff</h3>
              <div className="law-box">
                <h4>1ª Lei (Lei dos Nós ou das Correntes)</h4>
                <p>A soma das correntes que chegam a um nó é igual à soma das que saem:</p>
                <MathFormula formula="\sum i_{entrada} = \sum i_{saída}" />
              </div>

              <div className="law-box">
                <h4>2ª Lei (Lei das Malhas ou das Tensões)</h4>
                <p>A soma algébrica das tensões em uma malha fechada é zero:</p>
                <MathFormula formula="\sum U = 0" />
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 6: Magnetismo */}
        <ScrollReveal>
          <GlassCard id="magnetismo" className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">attractions</span>
              <h2>Magnetismo</h2>
            </div>

            <div className="section-body">
              <h3>Campo Magnético</h3>
              <p>
                Região do espaço onde forças magnéticas atuam. Representado por linhas 
                de campo que saem do polo Norte e entram no polo Sul.
              </p>

              <div className="info-box">
                <h4>Propriedades dos Ímãs</h4>
                <ul>
                  <li>Polos iguais se repelem, polos diferentes se atraem</li>
                  <li>Não existem monopolos magnéticos isolados</li>
                  <li>Campo magnético medido em Tesla (T) ou Gauss (G): 1 T = 10⁴ G</li>
                </ul>
              </div>

              <h3>Campo Magnético de um Condutor</h3>
              <p>
                Toda corrente elétrica gera um campo magnético ao seu redor. Para um fio reto:
              </p>
              <MathFormula formula="B = \frac{\mu_0 \cdot i}{2\pi \cdot r}" />
              <p>Onde <InlineFormula formula="\mu_0 = 4\pi \times 10^{-7}" /> T·m/A (permeabilidade magnética do vácuo)</p>

              <h3>Força Magnética</h3>
              <p>
                Força sobre uma carga em movimento num campo magnético:
              </p>
              <MathFormula formula="F = q \cdot v \cdot B \cdot \sin(\theta)" />
              
              <p>
                Força sobre um condutor com corrente num campo magnético:
              </p>
              <MathFormula formula="F = B \cdot i \cdot L \cdot \sin(\theta)" />
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 7: Indução Eletromagnética */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">auto_mode</span>
              <h2>Indução Eletromagnética</h2>
            </div>

            <div className="section-body">
              <h3>Lei de Faraday-Neumann</h3>
              <p>
                Uma variação do fluxo magnético através de um circuito induz uma 
                força eletromotriz (fem) no circuito:
              </p>

              <div className="formula-box highlight">
                <MathFormula formula="\varepsilon = -\frac{d\Phi_B}{dt}" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="\varepsilon" />: Força eletromotriz induzida (V)</li>
                  <li><InlineFormula formula="\Phi_B" />: Fluxo magnético (Wb = Weber)</li>
                  <li>O sinal negativo representa a Lei de Lenz</li>
                </ul>
              </div>

              <h3>Lei de Lenz</h3>
              <p>
                A corrente induzida tem um sentido tal que se opõe à variação do fluxo 
                magnético que a originou. É uma consequência da conservação de energia.
              </p>

              <div className="info-box">
                <h4>Aplicações da Indução</h4>
                <ul>
                  <li><strong>Geradores:</strong> Convertem energia mecânica em elétrica</li>
                  <li><strong>Transformadores:</strong> Alteram tensão e corrente alternadas</li>
                  <li><strong>Motores elétricos:</strong> Convertem energia elétrica em mecânica</li>
                  <li><strong>Carregamento sem fio:</strong> Transferência de energia por indução</li>
                </ul>
              </div>

              <h3>Transformadores</h3>
              <p>
                Dispositivos que alteram tensão e corrente em circuitos AC:
              </p>
              <MathFormula formula="\frac{U_p}{U_s} = \frac{N_p}{N_s} = \frac{i_s}{i_p}" />
              <p>Onde:</p>
              <ul>
                <li><InlineFormula formula="U_p, U_s" />: Tensões no primário e secundário</li>
                <li><InlineFormula formula="N_p, N_s" />: Número de espiras no primário e secundário</li>
                <li><InlineFormula formula="i_p, i_s" />: Correntes no primário e secundário</li>
              </ul>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Summary Section */}
        <ScrollReveal>
          <GlassCard className="summary-section">
            <div className="section-header">
              <span className="material-icons section-icon">checklist</span>
              <h2>Resumo - Eletromagnetismo</h2>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <h4>Eletrostática</h4>
                <p><InlineFormula formula="F = k\frac{q_1 q_2}{r^2}" /></p>
                <p>Lei de Coulomb e campo elétrico</p>
              </div>

              <div className="summary-card">
                <h4>Lei de Ohm</h4>
                <p><InlineFormula formula="U = R \cdot i" /></p>
                <p>Relação tensão-corrente-resistência</p>
              </div>

              <div className="summary-card">
                <h4>Potência</h4>
                <p><InlineFormula formula="P = U \cdot i" /></p>
                <p>Energia elétrica consumida</p>
              </div>

              <div className="summary-card">
                <h4>Circuitos</h4>
                <p>Série: <InlineFormula formula="R_{eq} = R_1 + R_2" /></p>
                <p>Paralelo: <InlineFormula formula="\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2}" /></p>
              </div>

              <div className="summary-card">
                <h4>Indução</h4>
                <p><InlineFormula formula="\varepsilon = -\frac{d\Phi_B}{dt}" /></p>
                <p>Lei de Faraday e geradores</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

      </div>

      <Footer />
    </div>
  );
};

export default PhysicsElectromagnetism;

