import React from 'react';
import StickyTopicNav from '../components/StickyTopicNav';
import { useSectionDetection } from '../hooks/useSectionDetection';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import MobileOrientationNotification from '../components/MobileOrientationNotification';
import './CircleEquation.css';

// Clean - no formulaCache - universal hook handles it
const CircleEquation = () => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: 'info' },
    { id: 'theory', title: 'Teoria', icon: 'lightbulb' },
    { id: 'steps', title: 'Passo a Passo', icon: 'list' },
    { id: 'conclusion', title: 'Conclusão', icon: 'check_circle' },
  ];

  // Section detection for navigation
  const sectionIds = sections.map(s => s.id);
  const currentSection = useSectionDetection(sectionIds);

  return (
    <div className="circle-equation-page">
      <MobileOrientationNotification />
      <StickyTopicNav sections={sections} currentSection={currentSection} />

      {/* Seção 1: Introdução */}
      <section id="intro" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Equação da Circunferência</h1>
            <p className="section-intro">
              Análise detalhada da transformação da forma geral para a forma reduzida
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Equação Geral Fornecida</h2>
            <MathFormula display>
              {'x^2 + y^2 + 6x + 14y + K = 0'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Objetivo</h2>
            <p className="text-content">
              Nosso objetivo é transformar essa <strong>Equação Geral</strong> na <strong>Equação Reduzida</strong> da circunferência. 
              Isso nos permitirá identificar facilmente seu centro <MathFormula>{'(h, k)'}</MathFormula> e seu raio <MathFormula>r</MathFormula>.
            </p>
            <div className="formula">
              <strong>Forma Geral (a que temos):</strong>
              <MathFormula display>
                {'x^2 + y^2 + 6x + 14y + K = 0'}
              </MathFormula>
            </div>
            <div className="formula">
              <strong>Forma Reduzida (a que queremos):</strong>
              <MathFormula display>
                {'(x - h)^2 + (y - k)^2 = r^2'}
              </MathFormula>
            </div>
            <p className="text-content">
              Para fazer essa transformação, usamos uma técnica algébrica fundamental chamada <strong>"Completar Quadrados"</strong>.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 2: Teoria */}
      <section id="theory" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">A Lógica: Por que "Completar Quadrados"?</h1>
            <p className="section-intro">
              Entenda o raciocínio matemático por trás da técnica de completar quadrados
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">O Problema</h2>
            <p className="text-content">
              Na nossa equação, temos termos como <MathFormula>{'x^2 + 6x'}</MathFormula>.
              Na equação que queremos, temos termos como <MathFormula>{'(x - h)^2'}</MathFormula>.
              Nosso objetivo é transformar <MathFormula>{'x^2 + 6x'}</MathFormula> em algo parecido com <MathFormula>{'(x - h)^2'}</MathFormula>.
            </p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">A Ferramenta: O "Trinômio Quadrado Perfeito"</h2>
            <p className="text-content">
              Vamos lembrar como um quadrado perfeito se expande (o "produto notável"):
            </p>
            <MathFormula display>
              {'(a + b)^2 = a^2 + 2ab + b^2'}
            </MathFormula>
            <p className="text-content">
              Se usarmos <MathFormula>x</MathFormula> e <MathFormula>h</MathFormula>, fica assim:
            </p>
            <MathFormula display>
              {'(x + h)^2 = x^2 + 2hx + h^2'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">A Descoberta: Por que dividir por 2 e elevar ao quadrado?</h2>
            <p className="text-content">
              Vamos comparar o que <strong>temos</strong> com o que <strong>queremos</strong>:
            </p>
            <ul className="content-list">
              <li>O que temos: <MathFormula>{'x^2 + 6x'}</MathFormula></li>
              <li>O que queremos: <MathFormula>{'x^2 + 2hx + h^2'}</MathFormula></li>
            </ul>
            <p className="text-content">
              Ao comparar os dois, podemos ver que o termo do meio <MathFormula>{'6x'}</MathFormula> deve ser igual ao termo <MathFormula>{'2hx'}</MathFormula>:
            </p>
            <MathFormula display>
              {'6x = 2hx'}
            </MathFormula>
            <p className="text-content">
              Dividindo os dois lados por <MathFormula>x</MathFormula> (e por 2), descobrimos o valor de <MathFormula>h</MathFormula>:
            </p>
            <MathFormula display>
              {'6 = 2h \\implies h = 3'}
            </MathFormula>
            <p className="text-content">
              <strong>É POR ISSO que dividimos o coeficiente (6) por 2!</strong> Fazemos isso para encontrar o número <MathFormula>h</MathFormula> que irá dentro do parêntese <MathFormula>{'(x+h)^2'}</MathFormula>.
            </p>
            <p className="text-content">
              Ótimo, agora sabemos que <MathFormula>{'h=3'}</MathFormula>. Mas para completar o trinômio <MathFormula>{'(x^2 + 2hx + h^2)'}</MathFormula>, precisamos do termo <MathFormula>{'h^2'}</MathFormula>.
            </p>
            <MathFormula display>
              {'h^2 = 3^2 = 9'}
            </MathFormula>
            <p className="text-content">
              <strong>É POR ISSO que elevamos o resultado ao quadrado!</strong> Fazemos isso para encontrar o número "mágico" (o 9) que precisamos adicionar para "completar" o quadrado.
            </p>
            <div className="example-box">
              <strong>Portanto:</strong> <MathFormula>{'x^2 + 6x + 9 = (x + 3)^2'}</MathFormula>. Conseguimos!
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 3: Passo a Passo */}
      <section id="steps" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Resolução Aplicando a Lógica</h1>
            <p className="section-intro">
              Vamos aplicar a técnica passo a passo na nossa equação
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Passo 1: Agrupar os termos</h2>
            <p className="text-content">
              Primeiro, apenas reorganizamos a equação para que os termos <MathFormula>x</MathFormula> e <MathFormula>y</MathFormula> fiquem juntos. 
              Isso facilita a visualização dos quadrados que precisamos completar.
            </p>
            <MathFormula display>
              {'(x^2 + 6x) + (y^2 + 14y) + K = 0'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">Passo 2: Completar o Quadrado para x</h2>
            <p className="text-content">
              Focamos no grupo <MathFormula>{'(x^2 + 6x)'}</MathFormula>. Aplicando a lógica que acabamos de ver:
            </p>
            <ul className="content-list">
              <li>O coeficiente é <strong>6</strong>.</li>
              <li><strong>Por quê?</strong> Para achar o <MathFormula>h</MathFormula> de <MathFormula>{'(x+h)^2'}</MathFormula>.<br/>
                  <strong>Ação:</strong> Dividimos por 2: <MathFormula>{'6 / 2 = 3'}</MathFormula>. (Então <MathFormula>{'h=3'}</MathFormula>)</li>
              <li><strong>Por quê?</strong> Para achar o <MathFormula>{'h^2'}</MathFormula> faltante.<br/>
                  <strong>Ação:</strong> Elevamos ao quadrado: <MathFormula>{'3^2 = 9'}</MathFormula>.</li>
            </ul>
            <p className="text-content">
              Adicionamos <strong>9</strong> dentro do parêntese. Para não alterar a equação, precisamos adicionar <strong>9</strong> ao outro lado também.
            </p>
            <MathFormula display>
              {'(x^2 + 6x + 9) + (y^2 + 14y) + K = 9'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">Passo 3: Completar o Quadrado para y</h2>
            <p className="text-content">
              Agora focamos em <MathFormula>{'(y^2 + 14y)'}</MathFormula>. É exatamente o mesmo processo:
            </p>
            <ul className="content-list">
              <li>O coeficiente é <strong>14</strong>.</li>
              <li><strong>Por quê?</strong> Para achar o <MathFormula>k</MathFormula> de <MathFormula>{'(y+k)^2'}</MathFormula>.<br/>
                  <strong>Ação:</strong> Dividimos por 2: <MathFormula>{'14 / 2 = 7'}</MathFormula>. (Então <MathFormula>{'k=7'}</MathFormula>)</li>
              <li><strong>Por quê?</strong> Para achar o <MathFormula>{'k^2'}</MathFormula> faltante.<br/>
                  <strong>Ação:</strong> Elevamos ao quadrado: <MathFormula>{'7^2 = 49'}</MathFormula>.</li>
            </ul>
            <p className="text-content">
              Adicionamos <strong>49</strong> ao grupo de <MathFormula>y</MathFormula> e também ao lado direito para manter o equilíbrio.
            </p>
            <MathFormula display>
              {'(x^2 + 6x + 9) + (y^2 + 14y + 49) + K = 9 + 49'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <GlassCard>
            <h2 className="subsection-title">Passo 4: Fatorar (Colapsar) e Simplificar</h2>
            <p className="text-content">
              Agora que completamos os quadrados, podemos "colapsar" os trinômios de volta à sua forma fatorada <MathFormula>{'(x+h)^2'}</MathFormula> e <MathFormula>{'(y+k)^2'}</MathFormula>.
            </p>
            <ul className="content-list">
              <li><MathFormula>{'(x^2 + 6x + 9)'}</MathFormula> se torna <MathFormula>{'(x + 3)^2'}</MathFormula></li>
              <li><MathFormula>{'(y^2 + 14y + 49)'}</MathFormula> se torna <MathFormula>{'(y + 7)^2'}</MathFormula></li>
            </ul>
            <p className="text-content">
              Simplificamos o lado direito: <MathFormula>{'9 + 49 = 58'}</MathFormula>.
            </p>
            <MathFormula display>
              {'(x + 3)^2 + (y + 7)^2 + K = 58'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <GlassCard>
            <h2 className="subsection-title">Passo 5: Isolar a Forma Reduzida</h2>
            <p className="text-content">
              Finalmente, movemos o <MathFormula>K</MathFormula> para o lado direito para que a equação fique idêntica à forma reduzida <MathFormula>{'(x - h)^2 + (y - k)^2 = r^2'}</MathFormula>.
            </p>
            <MathFormula display>
              {'(x + 3)^2 + (y + 7)^2 = 58 - K'}
            </MathFormula>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Seção 4: Conclusão */}
      <section id="conclusion" className="page-section">
        <ScrollReveal>
          <div className="section-header">
            <h1 className="section-title">Conclusão: Centro, Raio e Condição</h1>
            <p className="section-intro">
              Identificando as características da circunferência
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <h2 className="subsection-title">Comparação com a Forma Padrão</h2>
            <p className="text-content">
              Agora, comparamos nossa equação final com a forma reduzida padrão:
            </p>
            <div className="formula">
              <strong>Nossa equação:</strong>
              <MathFormula display>
                {'(x + 3)^2 + (y + 7)^2 = 58 - K'}
              </MathFormula>
            </div>
            <div className="formula">
              <strong>Forma padrão:</strong>
              <MathFormula display>
                {'(x - h)^2 + (y - k)^2 = r^2'}
              </MathFormula>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <h2 className="subsection-title">1. O Centro (h, k)</h2>
            <p className="text-content">
              O centro é encontrado comparando os termos (note a inversão do sinal, pois a fórmula é com <MathFormula>{'x - h'}</MathFormula>):
            </p>
            <ul className="content-list">
              <li><MathFormula>{'x - h = x + 3'}</MathFormula> então <MathFormula>{'-h = 3'}</MathFormula> logo <MathFormula>{'h = -3'}</MathFormula></li>
              <li><MathFormula>{'y - k = y + 7'}</MathFormula> então <MathFormula>{'-k = 7'}</MathFormula> logo <MathFormula>{'k = -7'}</MathFormula></li>
            </ul>
            <div className="example-box">
              <strong>Centro:</strong> <MathFormula>{'C = (-3, -7)'}</MathFormula>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <h2 className="subsection-title">2. O Raio r</h2>
            <p className="text-content">
              O raio é encontrado comparando o lado direito da equação:
            </p>
            <ul className="content-list">
              <li><MathFormula>{'r^2 = 58 - K'}</MathFormula></li>
              <li><MathFormula>{'r = \\sqrt{58 - K}'}</MathFormula></li>
            </ul>
            <div className="example-box">
              <strong>Raio:</strong> <MathFormula>{'r = \\sqrt{58 - K}'}</MathFormula>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <GlassCard>
            <h2 className="subsection-title">3. Condição de Existência</h2>
            <p className="text-content">
              Para que esta equação represente uma circunferência real, o raio <MathFormula>r</MathFormula> deve ser um número positivo (<MathFormula>{'r > 0'}</MathFormula>). 
              Isso significa que <MathFormula>{'r^2'}</MathFormula> (o termo à direita) também deve ser maior que zero.
            </p>
            <MathFormula display>
              {'r^2 > 0 \\implies 58 - K > 0'}
            </MathFormula>
            <div className="properties-box">
              <strong>Condição:</strong> <MathFormula>{'K < 58'}</MathFormula>
            </div>
            <p className="text-content">
              <strong>Nota:</strong> Se <MathFormula>{'K = 58'}</MathFormula>, o raio seria zero (a "circunferência" seria apenas um ponto). 
              Se <MathFormula>{'K > 58'}</MathFormula>, teríamos um raio imaginário (a circunferência não existiria no plano real).
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default CircleEquation;
