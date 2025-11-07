import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const topics = [
    {
      id: 'complex-numbers',
      title: 'Números Complexos',
      icon: 'functions',
      description: 'Explore o fascinante mundo dos números complexos, suas formas de representação, conversões entre forma algébrica e trigonométrica, e operações fundamentais.',
      path: '/numeros-complexos',
    },
    {
      id: 'polynomials',
      title: 'Divisão de Polinômios',
      icon: 'calculate',
      description: 'Domine as técnicas de divisão de polinômios, desde o método da chave até o dispositivo de Briot-Ruffini, com visualizações interativas passo a passo.',
      path: '/polinomios',
    },
    {
      id: 'analytic-geometry',
      title: 'Geometria Analítica',
      icon: 'analytics',
      description: 'Compreenda distâncias entre pontos e retas, equações da reta em suas diversas formas, e recapitule conceitos essenciais de matrizes com aplicações práticas.',
      path: '/geometria-analitica',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <ScrollReveal>
          <h1 className="hero-title">Matemática de Nível Mestre</h1>
          <p className="hero-subtitle">
            Uma jornada completa e interativa pelos conceitos fundamentais da matemática avançada.
            Explore, aprenda e domine através de explicações detalhadas e ferramentas visuais.
          </p>
        </ScrollReveal>
      </section>

      <section className="topics-section">
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <ScrollReveal key={topic.id} delay={index * 100}>
              <Link to={topic.path} className="topic-link">
                <GlassCard className="topic-card">
                  <div className="topic-icon-wrapper">
                    <span className="material-icons topic-icon">{topic.icon}</span>
                  </div>
                  <h2 className="topic-title">{topic.title}</h2>
                  <p className="topic-description">{topic.description}</p>
                  <div className="topic-arrow">
                    <span className="material-icons">arrow_forward</span>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

