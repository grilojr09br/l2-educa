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
import './PhysicsOptics.css';

const PhysicsOptics = () => {
  const { navigateWithTransition } = useNavigation();
  const { markVisited, markCompleted, isCompleted } = useProgress('physics', 'optica');
  
  // Define sections for navigation
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'lightbulb' },
    { id: 'reflexao', title: 'Reflexão', icon: 'compare_arrows' },
    { id: 'refracao', title: 'Refração', icon: 'waves' },
    { id: 'lentes', title: 'Lentes', icon: 'remove_red_eye' },
    { id: 'espelhos', title: 'Espelhos', icon: 'flip' },
    { id: 'exercicios', title: 'Exercícios', icon: 'quiz' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  // Mark as visited when component mounts
  useEffect(() => {
    markVisited();
  }, []);

  const handleNavigate = (path) => {
    navigateWithTransition(path, 'red');
  };

  // Calculator states
  const [lensCalc, setLensCalc] = useState({ f: 10, p: 30 });
  const [mirrorCalc, setMirrorCalc] = useState({ f: 15, p: 45 });
  const [snellCalc, setSnellCalc] = useState({ n1: 1.0, theta1: 30, n2: 1.5 });
  
  // Canvas refs
  const reflectionCanvasRef = useRef(null);
  const refractionCanvasRef = useRef(null);

  // Lens equation calculator
  const calculateLens = () => {
    const { f, p } = lensCalc;
    if (f === 0 || p === 0) return { q: 0, A: 0 };
    
    // 1/f = 1/p + 1/q => q = (f*p)/(p-f)
    const q = (f * p) / (p - f);
    const A = -q / p; // Amplification
    
    return { q: q.toFixed(2), A: A.toFixed(2) };
  };

  // Mirror equation calculator
  const calculateMirror = () => {
    const { f, p } = mirrorCalc;
    if (f === 0 || p === 0) return { q: 0, A: 0 };
    
    const q = (f * p) / (p - f);
    const A = -q / p;
    
    return { q: q.toFixed(2), A: A.toFixed(2) };
  };

  // Snell's Law calculator
  const calculateSnell = () => {
    const { n1, theta1, n2 } = snellCalc;
    if (n1 === 0 || n2 === 0) return { theta2: 0, critical: 0 };
    
    // n1 * sin(theta1) = n2 * sin(theta2)
    const sinTheta2 = (n1 * Math.sin((theta1 * Math.PI) / 180)) / n2;
    
    if (sinTheta2 > 1) {
      return { theta2: 'Reflexão Total', critical: 0 };
    }
    
    const theta2 = (Math.asin(sinTheta2) * 180) / Math.PI;
    const criticalAngle = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;
    
    return { 
      theta2: theta2.toFixed(2), 
      critical: criticalAngle ? criticalAngle.toFixed(2) : 'N/A' 
    };
  };

  // Draw reflection diagram
  useEffect(() => {
    const canvas = reflectionCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);
    
    // Mirror surface (vertical line)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2, 50);
    ctx.lineTo(width / 2, height - 50);
    ctx.stroke();
    
    // Normal line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2 - 100, height / 2);
    ctx.lineTo(width / 2 + 100, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Incident ray
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(width / 2, height / 2);
    ctx.stroke();
    
    // Reflected ray
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width - 50, 100);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px sans-serif';
    ctx.fillText('Raio Incidente', 60, 90);
    ctx.fillText('Raio Refletido', width - 150, 90);
    ctx.fillText('θi = θr', width / 2 + 10, height / 2 - 10);
  }, []);

  // Draw refraction diagram
  useEffect(() => {
    const canvas = refractionCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Upper medium (air)
    ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
    ctx.fillRect(0, 0, width, height / 2);
    
    // Lower medium (water/glass)
    ctx.fillStyle = 'rgba(30, 144, 255, 0.3)';
    ctx.fillRect(0, height / 2, width, height / 2);
    
    // Interface
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Normal
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Incident ray
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(width / 2, height / 2);
    ctx.stroke();
    
    // Refracted ray
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2 + 80, height - 50);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px sans-serif';
    ctx.fillText('n₁ (ar)', 20, 30);
    ctx.fillText('n₂ (meio)', 20, height - 20);
    ctx.fillText('θ₁', width / 2 - 40, height / 2 - 20);
    ctx.fillText('θ₂', width / 2 + 20, height / 2 + 40);
  }, []);

  const lensResult = calculateLens();
  const mirrorResult = calculateMirror();
  const snellResult = calculateSnell();

  return (
    <div className="physics-optics-page">
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
        <span className="breadcrumb-current">Óptica Completa</span>
      </div>

      {/* Hero Section */}
      <section className="optics-hero">
        <ScrollReveal>
          <div className="subject-badge">
            <span className="material-icons">visibility</span>
            ÓPTICA
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="optics-title">
            <span className="gradient-text">Óptica Completa</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="optics-subtitle">
            Compreenda os fenômenos da luz: reflexão, refração, lentes e instrumentos ópticos. 
            Da física geométrica à ondulatória.
          </p>
        </ScrollReveal>

        {/* Completion Button */}
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
      <div className="optics-content">
        
        {/* Section 1: Reflexão da Luz */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">wb_twilight</span>
              <h2>Reflexão da Luz</h2>
            </div>

            <div className="section-body">
              <h3>Leis da Reflexão</h3>
              <p>
                Quando a luz incide sobre uma superfície polida, ela é refletida de acordo 
                com duas leis fundamentais:
              </p>

              <div className="law-box">
                <strong>1ª Lei da Reflexão:</strong> O raio incidente, a normal e o raio 
                refletido estão no mesmo plano.
              </div>

              <div className="law-box">
                <strong>2ª Lei da Reflexão:</strong> O ângulo de incidência é igual ao 
                ângulo de reflexão.
                <MathFormula formula="\theta_i = \theta_r" />
              </div>

              <canvas
                ref={reflectionCanvasRef}
                width={600}
                height={300}
                className="physics-canvas"
              />

              <h3>Espelhos Planos</h3>
              <p>
                Nos espelhos planos, a imagem formada é virtual, direita e do mesmo tamanho 
                do objeto. A distância do objeto ao espelho é igual à distância da imagem ao espelho.
              </p>

              <h3>Espelhos Esféricos</h3>
              <p>Existem dois tipos principais:</p>
              <ul>
                <li><strong>Côncavo:</strong> Convergente - pode formar imagens reais e virtuais</li>
                <li><strong>Convexo:</strong> Divergente - forma apenas imagens virtuais</li>
              </ul>

              <div className="formula-box">
                <h4>Equação de Gauss (Espelhos)</h4>
                <MathFormula formula="\frac{1}{f} = \frac{1}{p} + \frac{1}{q}" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="f" />: distância focal</li>
                  <li><InlineFormula formula="p" />: distância do objeto</li>
                  <li><InlineFormula formula="q" />: distância da imagem</li>
                </ul>
              </div>

              {/* Mirror Calculator */}
              <div className="calculator-section">
                <h4>Calculadora de Espelhos</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Distância Focal (f) [cm]:</label>
                    <input
                      type="number"
                      value={mirrorCalc.f}
                      onChange={(e) => setMirrorCalc({ ...mirrorCalc, f: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Distância do Objeto (p) [cm]:</label>
                    <input
                      type="number"
                      value={mirrorCalc.p}
                      onChange={(e) => setMirrorCalc({ ...mirrorCalc, p: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Distância da Imagem (q):</strong> {mirrorResult.q} cm
                  </div>
                  <div className="result-item">
                    <strong>Amplificação (A):</strong> {mirrorResult.A}x
                  </div>
                  <div className="result-note">
                    {parseFloat(mirrorResult.A) < 0 ? 
                      '(Imagem invertida)' : 
                      '(Imagem direita)'}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 2: Refração */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">water</span>
              <h2>Refração da Luz</h2>
            </div>

            <div className="section-body">
              <h3>Lei de Snell-Descartes</h3>
              <p>
                Quando a luz passa de um meio para outro, sua velocidade muda, causando 
                uma mudança de direção (exceto em incidência normal).
              </p>

              <div className="formula-box highlight">
                <h4>Lei de Snell</h4>
                <MathFormula formula="n_1 \cdot \sin(\theta_1) = n_2 \cdot \sin(\theta_2)" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="n_1, n_2" />: índices de refração</li>
                  <li><InlineFormula formula="\theta_1" />: ângulo de incidência</li>
                  <li><InlineFormula formula="\theta_2" />: ângulo de refração</li>
                </ul>
              </div>

              <canvas
                ref={refractionCanvasRef}
                width={600}
                height={400}
                className="physics-canvas"
              />

              <h3>Índice de Refração</h3>
              <p>
                O índice de refração relaciona a velocidade da luz no vácuo com sua 
                velocidade no meio:
              </p>
              <MathFormula formula="n = \frac{c}{v}" />

              <div className="data-table">
                <h4>Índices de Refração (λ = 589 nm)</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Índice (n)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Vácuo</td><td>1.0000</td></tr>
                    <tr><td>Ar</td><td>1.0003</td></tr>
                    <tr><td>Água</td><td>1.33</td></tr>
                    <tr><td>Vidro comum</td><td>1.50</td></tr>
                    <tr><td>Diamante</td><td>2.42</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Reflexão Total</h3>
              <p>
                Ocorre quando a luz tenta passar de um meio mais refringente para um menos 
                refringente, com ângulo maior que o ângulo limite:
              </p>
              <MathFormula formula="\sin(\theta_L) = \frac{n_2}{n_1}" />

              {/* Snell Calculator */}
              <div className="calculator-section">
                <h4>Calculadora de Refração</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Índice n₁:</label>
                    <input
                      type="number"
                      value={snellCalc.n1}
                      onChange={(e) => setSnellCalc({ ...snellCalc, n1: parseFloat(e.target.value) || 0 })}
                      step="0.1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Ângulo θ₁ [graus]:</label>
                    <input
                      type="number"
                      value={snellCalc.theta1}
                      onChange={(e) => setSnellCalc({ ...snellCalc, theta1: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Índice n₂:</label>
                    <input
                      type="number"
                      value={snellCalc.n2}
                      onChange={(e) => setSnellCalc({ ...snellCalc, n2: parseFloat(e.target.value) || 0 })}
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Ângulo de Refração (θ₂):</strong> {snellResult.theta2}°
                  </div>
                  <div className="result-item">
                    <strong>Ângulo Limite:</strong> {snellResult.critical}°
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 3: Lentes */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">lens</span>
              <h2>Lentes Esféricas</h2>
            </div>

            <div className="section-body">
              <h3>Tipos de Lentes</h3>
              <div className="two-columns">
                <div className="column">
                  <h4>Lentes Convergentes</h4>
                  <ul>
                    <li>Biconvexa</li>
                    <li>Plano-convexa</li>
                    <li>Menisco convergente</li>
                  </ul>
                  <p>Focal positiva, formam imagens reais e virtuais.</p>
                </div>
                <div className="column">
                  <h4>Lentes Divergentes</h4>
                  <ul>
                    <li>Bicôncava</li>
                    <li>Plano-côncava</li>
                    <li>Menisco divergente</li>
                  </ul>
                  <p>Focal negativa, formam apenas imagens virtuais.</p>
                </div>
              </div>

              <div className="formula-box">
                <h4>Equação dos Fabricantes de Lentes</h4>
                <MathFormula formula="\frac{1}{f} = (n - 1) \left( \frac{1}{R_1} - \frac{1}{R_2} \right)" />
              </div>

              <div className="formula-box">
                <h4>Equação de Gauss (Lentes)</h4>
                <MathFormula formula="\frac{1}{f} = \frac{1}{p} + \frac{1}{q}" />
                <MathFormula formula="A = \frac{q}{p} = \frac{i}{o}" />
                <p>Onde <InlineFormula formula="A" /> é a amplificação linear transversal.</p>
              </div>

              {/* Lens Calculator */}
              <div className="calculator-section">
                <h4>Calculadora de Lentes</h4>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Distância Focal (f) [cm]:</label>
                    <input
                      type="number"
                      value={lensCalc.f}
                      onChange={(e) => setLensCalc({ ...lensCalc, f: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                  <div className="input-group">
                    <label>Distância do Objeto (p) [cm]:</label>
                    <input
                      type="number"
                      value={lensCalc.p}
                      onChange={(e) => setLensCalc({ ...lensCalc, p: parseFloat(e.target.value) || 0 })}
                      step="1"
                    />
                  </div>
                </div>
                <div className="calculator-results">
                  <div className="result-item">
                    <strong>Distância da Imagem (q):</strong> {lensResult.q} cm
                  </div>
                  <div className="result-item">
                    <strong>Amplificação (A):</strong> {lensResult.A}x
                  </div>
                </div>
              </div>

              <h3>Construção Geométrica de Imagens</h3>
              <p>Para construir a imagem em lentes, usamos três raios principais:</p>
              <ol>
                <li>Raio paralelo ao eixo → passa pelo foco</li>
                <li>Raio que passa pelo centro óptico → não desvia</li>
                <li>Raio que passa pelo foco → sai paralelo ao eixo</li>
              </ol>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 4: Instrumentos Ópticos */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">camera</span>
              <h2>Instrumentos Ópticos</h2>
            </div>

            <div className="section-body">
              <h3>Olho Humano</h3>
              <p>
                O olho humano funciona como uma câmera fotográfica natural:
              </p>
              <ul>
                <li><strong>Córnea e Cristalino:</strong> Lentes convergentes</li>
                <li><strong>Retina:</strong> Anteparo onde a imagem se forma</li>
                <li><strong>Íris:</strong> Controla a quantidade de luz (pupila)</li>
              </ul>

              <div className="info-box">
                <h4>Principais Defeitos de Visão</h4>
                <ul>
                  <li><strong>Miopia:</strong> Imagem se forma antes da retina → corrigida com lente divergente</li>
                  <li><strong>Hipermetropia:</strong> Imagem se forma depois da retina → corrigida com lente convergente</li>
                  <li><strong>Astigmatismo:</strong> Defeito na curvatura da córnea → corrigido com lentes cilíndricas</li>
                  <li><strong>Presbiopia:</strong> Perda de elasticidade do cristalino → corrigida com lentes convergentes</li>
                </ul>
              </div>

              <h3>Lupa (Lente de Aumento)</h3>
              <p>
                Lente convergente que forma imagem virtual, direita e ampliada. 
                O objeto deve estar entre o foco e a lente.
              </p>
              <MathFormula formula="A = \frac{25}{f}" />
              <p>Onde 25 cm é a distância mínima de visão distinta.</p>

              <h3>Microscópio Composto</h3>
              <p>
                Sistema de duas lentes convergentes:
              </p>
              <ul>
                <li><strong>Objetiva:</strong> Forma imagem real e ampliada</li>
                <li><strong>Ocular:</strong> Funciona como lupa, aumentando mais</li>
              </ul>
              <MathFormula formula="A_{total} = A_{objetiva} \times A_{ocular}" />

              <h3>Luneta (Telescópio Refrator)</h3>
              <p>
                Usada para observar objetos distantes. A objetiva tem focal longa e 
                a ocular tem focal curta.
              </p>
              <MathFormula formula="A = \frac{f_{objetiva}}{f_{ocular}}" />

              <h3>Câmera Fotográfica</h3>
              <p>
                Possui uma lente convergente (objetiva) que projeta imagem real, 
                invertida e reduzida sobre o sensor (ou filme).
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Section 5: Interferência e Difração */}
        <ScrollReveal>
          <GlassCard className="content-section">
            <div className="section-header">
              <span className="material-icons section-icon">waves</span>
              <h2>Fenômenos Ondulatórios da Luz</h2>
            </div>

            <div className="section-body">
              <h3>Interferência da Luz</h3>
              <p>
                Quando duas ondas de luz se encontram, elas podem interferir 
                construtivamente (aumentando a intensidade) ou destrutivamente 
                (diminuindo ou anulando).
              </p>

              <div className="formula-box">
                <h4>Experimento de Young (Fenda Dupla)</h4>
                <MathFormula formula="\Delta x = \frac{n \lambda D}{d}" />
                <p>Onde:</p>
                <ul>
                  <li><InlineFormula formula="\Delta x" />: distância entre franjas</li>
                  <li><InlineFormula formula="n" />: ordem da franja (0, 1, 2...)</li>
                  <li><InlineFormula formula="\lambda" />: comprimento de onda</li>
                  <li><InlineFormula formula="D" />: distância até o anteparo</li>
                  <li><InlineFormula formula="d" />: distância entre as fendas</li>
                </ul>
              </div>

              <h3>Difração</h3>
              <p>
                Desvio da luz ao passar por obstáculos ou fendas estreitas. 
                Quanto menor a abertura, maior a difração.
              </p>

              <div className="info-box">
                <h4>Condição para Difração Observável</h4>
                <p>
                  A abertura ou obstáculo deve ter dimensões comparáveis ao 
                  comprimento de onda da luz (ordem de 500 nm).
                </p>
              </div>

              <h3>Polarização</h3>
              <p>
                Processo que seleciona vibrações de luz em uma única direção. 
                Comprova que a luz é uma onda transversal.
              </p>

              <div className="law-box">
                <strong>Lei de Malus:</strong> Quando luz polarizada atravessa um 
                polarizador rotacionado de ângulo θ:
                <MathFormula formula="I = I_0 \cos^2(\theta)" />
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Summary Section */}
        <ScrollReveal>
          <GlassCard className="summary-section">
            <div className="section-header">
              <span className="material-icons section-icon">checklist</span>
              <h2>Resumo - Óptica</h2>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <h4>Reflexão</h4>
                <p><InlineFormula formula="\theta_i = \theta_r" /></p>
                <p>Espelhos planos, côncavos e convexos</p>
              </div>

              <div className="summary-card">
                <h4>Refração</h4>
                <p><InlineFormula formula="n_1 \sin \theta_1 = n_2 \sin \theta_2" /></p>
                <p>Lei de Snell e reflexão total</p>
              </div>

              <div className="summary-card">
                <h4>Lentes</h4>
                <p><InlineFormula formula="\frac{1}{f} = \frac{1}{p} + \frac{1}{q}" /></p>
                <p>Convergentes e divergentes</p>
              </div>

              <div className="summary-card">
                <h4>Instrumentos</h4>
                <p>Olho, lupa, microscópio, telescópio</p>
                <p>Aplicações práticas da óptica</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

      </div>

      <Footer />
    </div>
  );
};

export default PhysicsOptics;

