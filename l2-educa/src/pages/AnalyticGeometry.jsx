import React, { useState, useRef, useEffect } from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './AnalyticGeometry.css';

// Clean - no formulaCache - universal hook handles it
const AnalyticGeometry = () => {
  const sections = [
    { id: 'distance-points', title: 'Distância entre Pontos', icon: 'straighten' },
    { id: 'line-equation', title: 'Equação da Reta', icon: 'show_chart' },
    { id: 'point-line-distance', title: 'Ponto-Reta', icon: 'square_foot' },
    { id: 'line-line-distance', title: 'Reta-Reta', icon: 'compare_arrows' },
    { id: 'matrices', title: 'Matrizes', icon: 'grid_on' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  // Estados para distância entre pontos
  const [pointsDistance, setPointsDistance] = useState({
    p1: { x: 1, y: 2 },
    p2: { x: 4, y: 6 },
  });

  // Estados para equação da reta
  const [linePoints, setLinePoints] = useState({
    p1: { x: 1, y: 2 },
    p2: { x: 3, y: 5 },
  });

  // Estados para distância ponto-reta
  const [pointLine, setPointLine] = useState({
    point: { x: 2, y: 3 },
    line: { a: 3, b: 4, c: -10 }, // 3x + 4y - 10 = 0
  });

  // Estados para distância reta-reta
  const [lineLine, setLineLine] = useState({
    line1: { a: 2, b: -1, c: 3 },
    line2: { a: 2, b: -1, c: 7 },
  });

  // Estados para matrizes
  const [matrix2x2, setMatrix2x2] = useState([[2, 3], [1, 4]]);
  const [matrix3x3, setMatrix3x3] = useState([[2, 3, 1], [1, -1, 2], [3, 2, -1]]);

  const canvasPointsRef = useRef(null);
  const canvasLineRef = useRef(null);
  const canvasPointLineRef = useRef(null);
  const canvasLineLineRef = useRef(null);

  // Calcular distância entre dois pontos
  const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // Calcular coeficiente angular
  const calculateSlope = (p1, p2) => {
    if (p2.x === p1.x) return null; // Reta vertical
    return (p2.y - p1.y) / (p2.x - p1.x);
  };

  // Obter equação da reta (y = mx + b)
  const getLineEquation = (p1, p2) => {
    const m = calculateSlope(p1, p2);
    if (m === null) return { type: 'vertical', x: p1.x };
    const b = p1.y - m * p1.x;
    return { type: 'normal', m, b };
  };

  // Converter para forma geral Ax + By + C = 0
  const toGeneralForm = (p1, p2) => {
    const m = calculateSlope(p1, p2);
    if (m === null) return { a: 1, b: 0, c: -p1.x };
    const b_intercept = p1.y - m * p1.x;
    // y = mx + b -> mx - y + b = 0
    return { a: m, b: -1, c: b_intercept };
  };

  // Calcular distância de ponto a reta
  const pointToLineDistance = (point, line) => {
    const { a, b, c } = line;
    return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b);
  };

  // Verificar tipo de relação entre retas
  const classifyLines = (line1, line2) => {
    const { a: a1, b: b1, c: c1 } = line1;
    const { a: a2, b: b2, c: c2 } = line2;

    // Calcular determinante para verificar se são paralelas
    const det = a1 * b2 - a2 * b1;

    if (det === 0) {
      // Paralelas ou coincidentes
      if (a1 * c2 === a2 * c1 && b1 * c2 === b2 * c1) {
        return 'coincident';
      }
      return 'parallel';
    }
    return 'intersecting';
  };

  // Calcular distância entre retas paralelas
  const parallelLinesDistance = (line1, line2) => {
    const { a, b, c: c1 } = line1;
    const { c: c2 } = line2;
    return Math.abs(c2 - c1) / Math.sqrt(a * a + b * b);
  };

  // Calcular determinante 2x2
  const det2x2 = (matrix) => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  };

  // Calcular determinante 3x3 (Regra de Sarrus)
  const det3x3 = (matrix) => {
    const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
    const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
    const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

    return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
  };

  // Desenhar plano cartesiano com pontos
  const drawPointsCanvas = (canvas, p1, p2) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    // Limpar
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Eixos
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
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

    // Pontos
    const x1 = centerX + p1.x * scale;
    const y1 = centerY - p1.y * scale;
    const x2 = centerX + p2.x * scale;
    const y2 = centerY - p2.y * scale;

    // Linha entre pontos
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);

    // P1
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x1, y1, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // P2
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x2, y2, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(`P1(${p1.x}, ${p1.y})`, x1 + 15, y1 - 10);
    ctx.fillText(`P2(${p2.x}, ${p2.y})`, x2 + 15, y2 - 10);
  };

  // Desenhar reta no plano
  const drawLineCanvas = (canvas, p1, p2) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    // Limpar e desenhar base
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Eixos e grid (mesmo código anterior)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

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

    // Desenhar reta
    const eq = getLineEquation(p1, p2);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.beginPath();

    if (eq.type === 'vertical') {
      const x = centerX + eq.x * scale;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    } else {
      const y1 = eq.m * (-width / (2 * scale)) + eq.b;
      const y2 = eq.m * (width / (2 * scale)) + eq.b;
      ctx.moveTo(0, centerY - y1 * scale);
      ctx.lineTo(width, centerY - y2 * scale);
    }
    ctx.stroke();

    // Pontos
    const x1 = centerX + p1.x * scale;
    const y1 = centerY - p1.y * scale;
    const x2 = centerX + p2.x * scale;
    const y2 = centerY - p2.y * scale;

    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x1, y1, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x2, y2, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(`P1(${p1.x}, ${p1.y})`, x1 + 15, y1 - 10);
    ctx.fillText(`P2(${p2.x}, ${p2.y})`, x2 + 15, y2 - 10);
  };

  // Desenhar ponto e reta com distância
  const drawPointLineCanvas = (canvas, point, line) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Eixos
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Desenhar reta: ax + by + c = 0 -> y = (-a/b)x - c/b
    if (line.b !== 0) {
      const m = -line.a / line.b;
      const b_intercept = -line.c / line.b;

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const y1 = m * (-width / (2 * scale)) + b_intercept;
      const y2 = m * (width / (2 * scale)) + b_intercept;
      ctx.moveTo(0, centerY - y1 * scale);
      ctx.lineTo(width, centerY - y2 * scale);
      ctx.stroke();
    } else {
      // Reta vertical
      const x = -line.c / line.a;
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX + x * scale, 0);
      ctx.lineTo(centerX + x * scale, height);
      ctx.stroke();
    }

    // Ponto
    const px = centerX + point.x * scale;
    const py = centerY - point.y * scale;

    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Perpendicular (aproximação visual)
    if (line.b !== 0) {
      const m_line = -line.a / line.b;
      const m_perp = line.b / line.a; // Perpendicular
      const b_perp = point.y - m_perp * point.x;

      // Encontrar ponto de interseção
      const x_intersect = (b_perp + line.c / line.b) / (m_line - m_perp);
      const y_intersect = m_perp * x_intersect + b_perp;

      const ix = centerX + x_intersect * scale;
      const iy = centerY - y_intersect * scale;

      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(ix, iy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ponto de interseção
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(ix, iy, 6, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.fillStyle = '#fff';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(`P(${point.x}, ${point.y})`, px + 15, py - 10);
  };

  // Desenhar duas retas
  const drawLineLineCanvas = (canvas, line1, line2) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Eixos
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Desenhar linha 1
    if (line1.b !== 0) {
      const m1 = -line1.a / line1.b;
      const b1 = -line1.c / line1.b;
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const y1_start = m1 * (-width / (2 * scale)) + b1;
      const y1_end = m1 * (width / (2 * scale)) + b1;
      ctx.moveTo(0, centerY - y1_start * scale);
      ctx.lineTo(width, centerY - y1_end * scale);
      ctx.stroke();
    }

    // Desenhar linha 2
    if (line2.b !== 0) {
      const m2 = -line2.a / line2.b;
      const b2 = -line2.c / line2.b;
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const y2_start = m2 * (-width / (2 * scale)) + b2;
      const y2_end = m2 * (width / (2 * scale)) + b2;
      ctx.moveTo(0, centerY - y2_start * scale);
      ctx.lineTo(width, centerY - y2_end * scale);
      ctx.stroke();
    }
  };

  // Effects para desenhar nos canvas
  useEffect(() => {
    drawPointsCanvas(canvasPointsRef.current, pointsDistance.p1, pointsDistance.p2);
  }, [pointsDistance]);

  useEffect(() => {
    drawLineCanvas(canvasLineRef.current, linePoints.p1, linePoints.p2);
  }, [linePoints]);

  useEffect(() => {
    drawPointLineCanvas(canvasPointLineRef.current, pointLine.point, pointLine.line);
  }, [pointLine]);

  useEffect(() => {
    drawLineLineCanvas(canvasLineLineRef.current, lineLine.line1, lineLine.line2);
  }, [lineLine]);

  return (
    <div className="analytic-geometry-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Seção 1: Distância entre Pontos */}
      <section id="distance-points" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Distância entre Dois Pontos</h1>
            <p className="section-intro">
              A distância entre dois pontos no plano cartesiano é uma das fórmulas mais fundamentais da geometria analítica, derivada diretamente do Teorema de Pitágoras.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Fórmula e Dedução</h2>
            <p className="text-content">
              Dados dois pontos <MathFormula>{'P_1(x_1, y_1)'}</MathFormula> e <MathFormula>{'P_2(x_2, y_2)'}</MathFormula>, a distância d entre eles é:
            </p>
            <MathFormula display>
              {'d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}'}
            </MathFormula>
            <div className="derivation-box">
              <strong>Dedução:</strong>
              <p>
                Imagine um triângulo retângulo onde a hipotenusa conecta <MathFormula>{'P_1'}</MathFormula> e <MathFormula>{'P_2'}</MathFormula>. Os catetos têm comprimentos <MathFormula>{'|x_2 - x_1|'}</MathFormula> e <MathFormula>{'|y_2 - y_1|'}</MathFormula>.
              </p>
              <p>
                Pelo Teorema de Pitágoras: <MathFormula>{'d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2'}</MathFormula>
              </p>
              <p>
                Portanto: <MathFormula display>{'d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}'}</MathFormula>
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Calculadora Interativa</h2>
            <div className="geometry-calculator">
              <canvas ref={canvasPointsRef} width="600" height="400" className="geometry-canvas"></canvas>
              
              <div className="point-controls">
                <div className="point-control-group">
                  <h4>Ponto P₁</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>x₁:</label>
                      <input
                        type="number"
                        value={pointsDistance.p1.x}
                        onChange={(e) => setPointsDistance({
                          ...pointsDistance,
                          p1: { ...pointsDistance.p1, x: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>y₁:</label>
                      <input
                        type="number"
                        value={pointsDistance.p1.y}
                        onChange={(e) => setPointsDistance({
                          ...pointsDistance,
                          p1: { ...pointsDistance.p1, y: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="point-control-group">
                  <h4>Ponto P₂</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>x₂:</label>
                      <input
                        type="number"
                        value={pointsDistance.p2.x}
                        onChange={(e) => setPointsDistance({
                          ...pointsDistance,
                          p2: { ...pointsDistance.p2, x: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>y₂:</label>
                      <input
                        type="number"
                        value={pointsDistance.p2.y}
                        onChange={(e) => setPointsDistance({
                          ...pointsDistance,
                          p2: { ...pointsDistance.p2, y: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="result-display">
                <h4>Distância:</h4>
                <p className="result-value">
                  d = {calculateDistance(pointsDistance.p1, pointsDistance.p2).toFixed(3)} unidades
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 2: Equação da Reta */}
      <section id="line-equation" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Equação da Reta</h1>
            <p className="section-intro">
              Uma reta no plano cartesiano pode ser representada por diferentes formas de equação, cada uma adequada para contextos específicos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Formas da Equação da Reta</h2>
            
            <div className="equation-forms">
              <div className="form-item">
                <h4>Forma Reduzida</h4>
                <MathFormula display>{'y = mx + b'}</MathFormula>
                <p>Onde m é o coeficiente angular e b é o coeficiente linear (intercepto em y)</p>
              </div>

              <div className="form-item">
                <h4>Forma Geral</h4>
                <MathFormula display>{'Ax + By + C = 0'}</MathFormula>
                <p>Forma mais geral, válida para todas as retas</p>
              </div>

              <div className="form-item">
                <h4>Forma Segmentária</h4>
                <MathFormula display>{'\\frac{x}{p} + \\frac{y}{q} = 1'}</MathFormula>
                <p>Onde p e q são os interceptos nos eixos x e y respectivamente</p>
              </div>

              <div className="form-item">
                <h4>Forma Ponto-Inclinação</h4>
                <MathFormula display>{'y - y_1 = m(x - x_1)'}</MathFormula>
                <p>Útil quando conhecemos um ponto e a inclinação</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Coeficiente Angular (Inclinação)</h2>
            <p className="text-content">
              O coeficiente angular m representa a inclinação da reta e é calculado por:
            </p>
            <MathFormula display>
              {'m = \\frac{y_2 - y_1}{x_2 - x_1}'}
            </MathFormula>
            <ul className="content-list">
              <li><MathFormula>{'m > 0'}</MathFormula>: reta crescente</li>
              <li><MathFormula>{'m < 0'}</MathFormula>: reta decrescente</li>
              <li><MathFormula>{'m = 0'}</MathFormula>: reta horizontal</li>
              <li>m indefinido: reta vertical (<MathFormula>{'x_2 = x_1'}</MathFormula>)</li>
            </ul>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Ferramenta: Equação da Reta por Dois Pontos</h2>
            
            <div className="geometry-calculator">
              <canvas ref={canvasLineRef} width="600" height="400" className="geometry-canvas"></canvas>
              
              <div className="point-controls">
                <div className="point-control-group">
                  <h4>Ponto P₁</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>x₁:</label>
                      <input
                        type="number"
                        value={linePoints.p1.x}
                        onChange={(e) => setLinePoints({
                          ...linePoints,
                          p1: { ...linePoints.p1, x: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>y₁:</label>
                      <input
                        type="number"
                        value={linePoints.p1.y}
                        onChange={(e) => setLinePoints({
                          ...linePoints,
                          p1: { ...linePoints.p1, y: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="point-control-group">
                  <h4>Ponto P₂</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>x₂:</label>
                      <input
                        type="number"
                        value={linePoints.p2.x}
                        onChange={(e) => setLinePoints({
                          ...linePoints,
                          p2: { ...linePoints.p2, x: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>y₂:</label>
                      <input
                        type="number"
                        value={linePoints.p2.y}
                        onChange={(e) => setLinePoints({
                          ...linePoints,
                          p2: { ...linePoints.p2, y: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="equations-display">
                {(() => {
                  const eq = getLineEquation(linePoints.p1, linePoints.p2);
                  const general = toGeneralForm(linePoints.p1, linePoints.p2);
                  const m = calculateSlope(linePoints.p1, linePoints.p2);

                  return (
                    <>
                      <div className="equation-result">
                        <strong>Coeficiente Angular:</strong>
                        <p>{m !== null ? `m = ${m.toFixed(3)}` : 'Indefinido (reta vertical)'}</p>
                      </div>
                      <div className="equation-result">
                        <strong>Forma Reduzida:</strong>
                        <p>
                          {eq.type === 'vertical'
                            ? `x = ${eq.x}`
                            : `y = ${eq.m.toFixed(3)}x ${eq.b >= 0 ? '+' : ''} ${eq.b.toFixed(3)}`}
                        </p>
                      </div>
                      <div className="equation-result">
                        <strong>Forma Geral:</strong>
                        <p>
                          {`${general.a.toFixed(3)}x ${general.b >= 0 ? '+' : ''} ${general.b.toFixed(3)}y ${general.c >= 0 ? '+' : ''} ${general.c.toFixed(3)} = 0`}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 3: Distância Ponto-Reta */}
      <section id="point-line-distance" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Distância entre Ponto e Reta</h1>
            <p className="section-intro">
              A distância de um ponto a uma reta é o comprimento do segmento perpendicular que liga o ponto à reta.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Fórmula</h2>
            <p className="text-content">
              Dada uma reta <MathFormula>{'r: Ax + By + C = 0'}</MathFormula> e um ponto <MathFormula>{'P(x_0, y_0)'}</MathFormula>, a distância d é:
            </p>
            <MathFormula display>
              {'d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Calculadora Interativa</h2>
            
            <div className="geometry-calculator">
              <canvas ref={canvasPointLineRef} width="600" height="400" className="geometry-canvas"></canvas>
              
              <div className="point-line-controls">
                <div className="control-section">
                  <h4>Ponto P</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>x:</label>
                      <input
                        type="number"
                        value={pointLine.point.x}
                        onChange={(e) => setPointLine({
                          ...pointLine,
                          point: { ...pointLine.point, x: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>y:</label>
                      <input
                        type="number"
                        value={pointLine.point.y}
                        onChange={(e) => setPointLine({
                          ...pointLine,
                          point: { ...pointLine.point, y: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="control-section">
                  <h4>Reta (Ax + By + C = 0)</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>A:</label>
                      <input
                        type="number"
                        value={pointLine.line.a}
                        onChange={(e) => setPointLine({
                          ...pointLine,
                          line: { ...pointLine.line, a: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>B:</label>
                      <input
                        type="number"
                        value={pointLine.line.b}
                        onChange={(e) => setPointLine({
                          ...pointLine,
                          line: { ...pointLine.line, b: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>C:</label>
                      <input
                        type="number"
                        value={pointLine.line.c}
                        onChange={(e) => setPointLine({
                          ...pointLine,
                          line: { ...pointLine.line, c: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="result-display">
                <h4>Distância:</h4>
                <p className="result-value">
                  d = {pointToLineDistance(pointLine.point, pointLine.line).toFixed(3)} unidades
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 4: Distância Reta-Reta */}
      <section id="line-line-distance" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Distância entre Duas Retas</h1>
            <p className="section-intro">
              A relação entre duas retas no plano pode ser de três tipos: concorrentes (se intersectam), paralelas ou coincidentes.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Classificação</h2>
            <p className="text-content">
              Dadas duas retas <MathFormula>{'r_1: A_1x + B_1y + C_1 = 0'}</MathFormula> e <MathFormula>{'r_2: A_2x + B_2y + C_2 = 0'}</MathFormula>:
            </p>
            
            <div className="classification-box">
              <div className="class-item">
                <h4>Retas Concorrentes</h4>
                <MathFormula display>{'\\frac{A_1}{A_2} \\neq \\frac{B_1}{B_2}'}</MathFormula>
                <p>As retas se intersectam em um ponto. Distância = 0</p>
              </div>

              <div className="class-item">
                <h4>Retas Paralelas</h4>
                <MathFormula display>{'\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\neq \\frac{C_1}{C_2}'}</MathFormula>
                <p>As retas nunca se encontram. Distância &gt; 0</p>
                <MathFormula display>{'d = \\frac{|C_2 - C_1|}{\\sqrt{A^2 + B^2}}'}</MathFormula>
              </div>

              <div className="class-item">
                <h4>Retas Coincidentes</h4>
                <MathFormula display>{'\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}'}</MathFormula>
                <p>As retas são idênticas. Distância = 0</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Calculadora Interativa</h2>
            
            <div className="geometry-calculator">
              <canvas ref={canvasLineLineRef} width="600" height="400" className="geometry-canvas"></canvas>
              
              <div className="two-lines-controls">
                <div className="control-section">
                  <h4>Reta 1 (A₁x + B₁y + C₁ = 0)</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>A₁:</label>
                      <input
                        type="number"
                        value={lineLine.line1.a}
                        onChange={(e) => setLineLine({
                          ...lineLine,
                          line1: { ...lineLine.line1, a: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>B₁:</label>
                      <input
                        type="number"
                        value={lineLine.line1.b}
                        onChange={(e) => setLineLine({
                          ...lineLine,
                          line1: { ...lineLine.line1, b: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>C₁:</label>
                      <input
                        type="number"
                        value={lineLine.line1.c}
                        onChange={(e) => setLineLine({
                          ...lineLine,
                          line1: { ...lineLine.line1, c: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="control-section">
                  <h4>Reta 2 (A₂x + B₂y + C₂ = 0)</h4>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>A₂:</label>
                      <input
                        type="number"
                        value={lineLine.line2.a}
                        onChange={(e) => setLineLine({
                          ...lineLine,
                          line2: { ...lineLine.line2, a: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>B₂:</label>
                      <input
                        type="number"
                        value={lineLine.line2.b}
                        onChange={(e) => setLineLine({
                          ...lineLine,
                          line2: { ...lineLine.line2, b: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="coord-input">
                      <label>C₂:</label>
                      <input
                        type="number"
                        value={lineLine.line2.c}
                        onChange={(e) => setLineLine({
                          ...lineLine,
                          line2: { ...lineLine.line2, c: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="classification-result">
                {(() => {
                  const classification = classifyLines(lineLine.line1, lineLine.line2);
                  const distance = classification === 'parallel'
                    ? parallelLinesDistance(lineLine.line1, lineLine.line2)
                    : 0;

                  return (
                    <>
                      <div className="result-item">
                        <strong>Classificação:</strong>
                        <p className={`classification-${classification}`}>
                          {classification === 'intersecting' && 'Retas Concorrentes (se intersectam)'}
                          {classification === 'parallel' && 'Retas Paralelas (não se intersectam)'}
                          {classification === 'coincident' && 'Retas Coincidentes (idênticas)'}
                        </p>
                      </div>
                      <div className="result-item">
                        <strong>Distância:</strong>
                        <p className="result-value">
                          {classification === 'parallel'
                            ? `d = ${distance.toFixed(3)} unidades`
                            : 'd = 0 (retas se encontram ou são coincidentes)'}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 5: Matrizes */}
      <section id="matrices" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Recapitulação: Matrizes e Determinantes</h1>
            <p className="section-intro">
              As matrizes e seus determinantes têm aplicações fundamentais em geometria analítica, como calcular áreas, verificar colinearidade de pontos e resolver sistemas lineares.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Determinante 2×2</h2>
            <p className="text-content">
              Para uma matriz 2×2:
            </p>
            <MathFormula display>
              {'\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}'}
            </MathFormula>
            <MathFormula display>
              {'\\det(A) = ad - bc'}
            </MathFormula>
            
            <div className="matrix-calculator">
              <h4>Calculadora 2×2</h4>
              <div className="matrix-input-grid">
                {matrix2x2.map((row, i) => (
                  <div key={i} className="matrix-row">
                    {row.map((val, j) => (
                      <input
                        key={j}
                        type="number"
                        value={val}
                        onChange={(e) => {
                          const newMatrix = [...matrix2x2];
                          newMatrix[i][j] = parseFloat(e.target.value) || 0;
                          setMatrix2x2(newMatrix);
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="determinant-result">
                <strong>Determinante:</strong>
                <p className="result-value">{det2x2(matrix2x2).toFixed(3)}</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Determinante 3×3 (Regra de Sarrus)</h2>
            <p className="text-content">
              Para uma matriz 3×3, usamos a Regra de Sarrus:
            </p>
            <MathFormula display>
              {'\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix}'}
            </MathFormula>
            <MathFormula display>
              {'\\det(A) = aei + bfg + cdh - ceg - bdi - afh'}
            </MathFormula>
            
            <div className="sarrus-explanation">
              <strong>Método:</strong>
              <ol className="steps-list">
                <li>Repita as duas primeiras colunas à direita da matriz</li>
                <li>Some os produtos das diagonais descendentes (→)</li>
                <li>Subtraia os produtos das diagonais ascendentes (↗)</li>
              </ol>
            </div>

            <div className="matrix-calculator">
              <h4>Calculadora 3×3</h4>
              <div className="matrix-input-grid matrix-3x3">
                {matrix3x3.map((row, i) => (
                  <div key={i} className="matrix-row">
                    {row.map((val, j) => (
                      <input
                        key={j}
                        type="number"
                        value={val}
                        onChange={(e) => {
                          const newMatrix = [...matrix3x3];
                          newMatrix[i][j] = parseFloat(e.target.value) || 0;
                          setMatrix3x3(newMatrix);
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="determinant-result">
                <strong>Determinante:</strong>
                <p className="result-value">{det3x3(matrix3x3).toFixed(3)}</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Aplicações em Geometria Analítica</h2>
            
            <div className="applications-grid">
              <div className="application-item">
                <h4>Área de Triângulo</h4>
                <p>
                  Dados três vértices <MathFormula>{'A(x_1, y_1)'}</MathFormula>, <MathFormula>{'B(x_2, y_2)'}</MathFormula>, <MathFormula>{'C(x_3, y_3)'}</MathFormula>:
                </p>
                <MathFormula display>
                  {'\\text{Área} = \\frac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right|'}
                </MathFormula>
              </div>

              <div className="application-item">
                <h4>Colinearidade de Pontos</h4>
                <p>
                  Três pontos são colineares se, e somente se:
                </p>
                <MathFormula display>
                  {'\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix} = 0'}
                </MathFormula>
              </div>

              <div className="application-item">
                <h4>Equação da Reta por Determinante</h4>
                <p>
                  A equação da reta que passa por <MathFormula>{'(x_1, y_1)'}</MathFormula> e <MathFormula>{'(x_2, y_2)'}</MathFormula>:
                </p>
                <MathFormula display>
                  {'\\begin{vmatrix} x & y & 1 \\\\ x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\end{vmatrix} = 0'}
                </MathFormula>
              </div>

              <div className="application-item">
                <h4>Sistemas Lineares (Cramer)</h4>
                <p>
                  Resolver sistemas de equações usando determinantes:
                </p>
                <MathFormula display>
                  {'x = \\frac{\\det(A_x)}{\\det(A)}, \\quad y = \\frac{\\det(A_y)}{\\det(A)}'}
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

export default AnalyticGeometry;

