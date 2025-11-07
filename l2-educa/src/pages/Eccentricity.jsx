import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './Eccentricity.css';

// Clean - universal cache handled globally
const Eccentricity = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'definitions', title: 'Definições', icon: 'school' },
    { id: 'ellipse-theory', title: 'Elipse', icon: 'trip_origin' },
    { id: 'hyperbola-theory', title: 'Hipérbole', icon: 'donut_large' },
    { id: 'parabola-theory', title: 'Parábola', icon: 'change_history' },
    { id: 'identify-and-calc', title: 'Identificar e Calcular', icon: 'tune' },
    { id: 'worked-example', title: 'Exemplo Resolvido', icon: 'fact_check' },
    { id: 'pitfalls', title: 'Erros Comuns', icon: 'report_problem' },
    { id: 'exercises', title: 'Exercícios', icon: 'quiz' },
    { id: 'conclusion', title: 'Conclusão', icon: 'check_circle' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="eccentricity-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Intro */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Excentricidade das Cônicas</h1>
            <p className="section-intro">
              A excentricidade <MathFormula>e</MathFormula> quantifica o "quão aberta" é uma cônica. Valores típicos:
              <strong> elipse</strong> (0 &lt; e &lt; 1), <strong>parábola</strong> (e = 1) e <strong>hipérbole</strong> (e &gt; 1).
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Definições */}
      <section id="definitions" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Definições Fundamentais</h2>
            <p className="text-content">
              Para cônicas centradas na origem com eixos alinhados:
            </p>
            <ul className="content-list">
              <li>Elipse: <MathFormula display>{'\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1,\\quad a \\ge b > 0'}</MathFormula></li>
              <li>Hipérbole: <MathFormula display>{'\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1,\\quad a, b > 0'}</MathFormula></li>
              <li>Parábola (eixo x): <MathFormula display>{'y^2 = 4px, \\quad p>0'}</MathFormula></li>
            </ul>
            <div className="formula">
              <strong>Relações com c (distância do centro ao foco):</strong>
              <MathFormula display>{'\\text{Elipse: } c^2 = a^2 - b^2, \\quad e = \\frac{c}{a}'}</MathFormula>
              <MathFormula display>{'\\text{Hipérbole: } c^2 = a^2 + b^2, \\quad e = \\frac{c}{a}'}</MathFormula>
              <MathFormula display>{'\\text{Parábola: } e = 1'}</MathFormula>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Elipse */}
      <section id="ellipse-theory" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Elipse: 0 &lt; e &lt; 1</h2>
            <p className="text-content">
              Na forma reduzida <MathFormula>{'\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1'}</MathFormula>, o eixo maior é associado a <MathFormula>a</MathFormula>.
              Os focos estão em <MathFormula>{'(\\pm c, 0)'}</MathFormula> quando o eixo maior é horizontal.
            </p>
            <div className="example-box">
              <strong>Resumo:</strong> <MathFormula>{'e = \\frac{c}{a},\\quad c = \\sqrt{a^2 - b^2}'}</MathFormula>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Hipérbole */}
      <section id="hyperbola-theory" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Hipérbole: e &gt; 1</h2>
            <p className="text-content">
              Para <MathFormula>{'\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1'}</MathFormula>, os focos estão em <MathFormula>{'(\\pm c, 0)'}</MathFormula> e 
              <MathFormula>{'c = \\sqrt{a^2 + b^2}'}</MathFormula>. Assim, <MathFormula>{'e = \\frac{c}{a} > 1'}</MathFormula>.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Parábola */}
      <section id="parabola-theory" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Parábola: e = 1</h2>
            <p className="text-content">
              Para <MathFormula>{'y^2 = 4px'}</MathFormula>, a excentricidade é sempre 1, por definição geométrica (equidistância de foco e diretriz).
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Identificar e Calcular */}
      <section id="identify-and-calc" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Como identificar a cônica e calcular e</h2>
            <ol className="steps-list">
              <li><strong>Normalizar:</strong> deixe a equação com o lado direito igual a 1.</li>
              <li><strong>Reconhecer o tipo:</strong> soma de frações positivas → elipse; diferença → hipérbole.</li>
              <li><strong>Extrair parâmetros:</strong> identifique <MathFormula>{'a^2'}</MathFormula> e <MathFormula>{'b^2'}</MathFormula>.</li>
              <li><strong>Calcular:</strong> use <MathFormula>{'c^2 = a^2 - b^2'}</MathFormula> (elipse) ou <MathFormula>{'c^2 = a^2 + b^2'}</MathFormula> (hipérbole), depois <MathFormula>{'e = c/a'}</MathFormula>.</li>
            </ol>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Exemplo Resolvido */}
      <section id="worked-example" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Exemplo: 8x^2 + 50y^2 = 200</h1>
            <p className="section-intro">Vamos encontrar a excentricidade e as principais características.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Passo 1: Normalizar</h2>
            <p className="text-content">Dividimos ambos os lados por 200:</p>
            <MathFormula display>{'\\frac{8x^2}{200} + \\frac{50y^2}{200} = 1 \\;\\Rightarrow\\; \\frac{x^2}{25} + \\frac{y^2}{4} = 1'}</MathFormula>
            <p className="text-content">Assim, <MathFormula>{'a^2 = 25'}</MathFormula> e <MathFormula>{'b^2 = 4'}</MathFormula>.</p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Passo 2: Identificar a cônica</h2>
            <p className="text-content">Temos soma de termos positivos igual a 1 ⇒ elipse com eixo maior em x.</p>
            <MathFormula display>{'\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, \\quad a^2=25, \\; b^2=4'}</MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Passo 3: Calcular c e e</h2>
            <p className="text-content">Para elipse, <MathFormula>{'c^2 = a^2 - b^2'}</MathFormula>:</p>
            <MathFormula display>{'c = \\sqrt{a^2 - b^2} = \\sqrt{25 - 4} = \\sqrt{21}'}</MathFormula>
            <p className="text-content">Excentricidade:</p>
            <MathFormula display>{'e = \\frac{c}{a} = \\frac{\\sqrt{21}}{5} \\approx 0{,}9165'}</MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <GlassCard>
            <h2 className="subsection-title">Passo 4: Características Geométricas</h2>
            <ul className="content-list">
              <li>Centro: <MathFormula>{'(0, 0)'}</MathFormula></li>
              <li>Vértices (eixo maior): <MathFormula>{'(\\pm a, 0) = (\\pm 5, 0)'}</MathFormula></li>
              <li>Co-vértices (eixo menor): <MathFormula>{'(0, \\pm b) = (0, \\pm 2)'}</MathFormula></li>
              <li>Focos: <MathFormula>{'(\\pm c, 0) = (\\pm \\sqrt{21}, 0)'}</MathFormula></li>
              <li>Excentricidade: <MathFormula>{'e = \\sqrt{21}/5'}</MathFormula></li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Erros comuns */}
      <section id="pitfalls" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Erros Comuns</h2>
            <ul className="content-list">
              <li>Não normalizar para 1 no lado direito antes de identificar <MathFormula>{'a^2'}</MathFormula> e <MathFormula>{'b^2'}</MathFormula>.</li>
              <li>Confundir fórmulas: elipse usa <MathFormula>{'c^2 = a^2 - b^2'}</MathFormula>; hipérbole usa <MathFormula>{'c^2 = a^2 + b^2'}</MathFormula>.</li>
              <li>Assumir que <MathFormula>a</MathFormula> é sempre o denominador maior quando a elipse pode estar girada (não é o caso aqui).</li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Exercícios */}
      <section id="exercises" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Fixação Rápida</h2>
            <ol className="steps-list">
              <li>Determine <MathFormula>e</MathFormula> para <MathFormula>{'x^2/36 + y^2/9 = 1'}</MathFormula>.</li>
              <li>Classifique e calcule <MathFormula>e</MathFormula> para <MathFormula>{'x^2/9 - y^2/4 = 1'}</MathFormula>.</li>
              <li>Explique por que parábolas têm <MathFormula>e = 1</MathFormula>.</li>
            </ol>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Conclusão */}
      <section id="conclusion" className="page-section">
        <ScrollReveal>
          <GlassCard>
            <h2 className="subsection-title">Conclusão</h2>
            <p className="text-content">
              Identificar o tipo de cônica e normalizar a equação são os passos-chave para calcular a excentricidade de forma segura e eficiente.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Eccentricity;


