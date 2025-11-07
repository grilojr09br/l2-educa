import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NavigationProvider } from './contexts/NavigationContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { AdminProvider } from './contexts/AdminContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AuroraBackground from './components/AuroraBackground';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import AdminGuard from './components/AdminGuard';
import NotificationToast from './components/NotificationToast';
import EmailVerificationBanner from './components/EmailVerificationBanner';
import { updateOrientationClass } from './utils/mobileDetection';
import { autoPreloadMathJax } from './utils/mathJaxPreloader';
import { usePageCache } from './hooks/usePageCache';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load AI Chatbot for performance
const AIChatWidget = lazy(() => import('./components/AIChatWidget'));

// Lazy load pages for better performance and code splitting
const Terminal = lazy(() => import('./pages/Terminal'));
const MathSubject = lazy(() => import('./pages/MathSubject'));
const ComplexNumbers = lazy(() => import('./pages/ComplexNumbers'));
const Polynomials = lazy(() => import('./pages/Polynomials'));
const AnalyticGeometry = lazy(() => import('./pages/AnalyticGeometry'));
const CircleEquation = lazy(() => import('./pages/CircleEquation'));
const Eccentricity = lazy(() => import('./pages/Eccentricity'));
const PhysicsSubject = lazy(() => import('./pages/PhysicsSubject'));
const PhysicsExercises = lazy(() => import('./pages/PhysicsExercises'));
const PhysicsOptics = lazy(() => import('./pages/PhysicsOptics'));
const PhysicsElectromagnetism = lazy(() => import('./pages/PhysicsElectromagnetism'));
const PhysicsTransformers = lazy(() => import('./pages/PhysicsTransformers'));
const PhysicsMagnetism = lazy(() => import('./pages/PhysicsMagnetism'));
const PhysicsPlainMirrors = lazy(() => import('./pages/PhysicsPlainMirrors'));
const PhysicsSphericalMirrors = lazy(() => import('./pages/PhysicsSphericalMirrors'));
const ChemistrySubject = lazy(() => import('./pages/ChemistrySubject'));
const BiologySubject = lazy(() => import('./pages/BiologySubject'));
const BiologyFilos = lazy(() => import('./pages/BiologyFilos'));
const PhilosophySubject = lazy(() => import('./pages/PhilosophySubject'));
const HistorySubject = lazy(() => import('./pages/HistorySubject'));
const FrenchRevolution = lazy(() => import('./pages/FrenchRevolution'));
const NapoleonicEra = lazy(() => import('./pages/NapoleonicEra'));
const PortugueseSubject = lazy(() => import('./pages/PortugueseSubject'));
const PortugueseInterpretacao = lazy(() => import('./pages/PortugueseInterpretacao'));
const PortugueseConcordancia = lazy(() => import('./pages/PortugueseConcordancia'));
const PortugueseRegencia = lazy(() => import('./pages/PortugueseRegencia'));
const PortugueseCrase = lazy(() => import('./pages/PortugueseCrase'));
const PortuguesePontuacao = lazy(() => import('./pages/PortuguesePontuacao'));
const GeographySubject = lazy(() => import('./pages/GeographySubject'));
const GeographyIndustrialization = lazy(() => import('./pages/GeographyIndustrialization'));
const GeographyUrbanization = lazy(() => import('./pages/GeographyUrbanization'));
const GeographyAgriculture = lazy(() => import('./pages/GeographyAgriculture'));
const SociologySubject = lazy(() => import('./pages/SociologySubject'));
const LiteratureSubject = lazy(() => import('./pages/LiteratureSubject'));
const ModernismoPortugues = lazy(() => import('./pages/ModernismoPortugues'));
const ModernismoBrasileiroSegundaFase = lazy(() => import('./pages/ModernismoBrasileiroSegundaFase'));
const ModernismoBrasileiroTerceiraFase = lazy(() => import('./pages/ModernismoBrasileiroTerceiraFase'));
const MovimentosLiterariosPosteriores = lazy(() => import('./pages/MovimentosLiterariosPosteriores'));
const ArtsSubject = lazy(() => import('./pages/ArtsSubject'));
const EnglishSubject = lazy(() => import('./pages/EnglishSubject'));

// Admin Panel - DEV ONLY (excluded from production builds)
const AdminPanel = import.meta.env.MODE === 'development' 
  ? lazy(() => import('./pages/AdminPanel'))
  : null;

// Authentication pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));

// Import ProtectedRoute - NOT LAZY (needs to check auth immediately)
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  
  // Universal page cache hook - handles all cache management automatically
  usePageCache();
  
  // Check sessionStorage ONCE at initialization - synchronously
  const hasSeenLoadingBefore = sessionStorage.getItem('hasSeenLoading') === 'true';
  
  // If never seen loading, start with loading screen visible
  const [loadingComplete, setLoadingComplete] = useState(hasSeenLoadingBefore);

  useEffect(() => {
    if (!hasSeenLoadingBefore) {
      console.log('🎬 First visit - showing L2 EDUCA loading screen');
      // Mark as seen AFTER component mounts to ensure loading screen shows
      sessionStorage.setItem('hasSeenLoading', 'true');
    } else {
      console.log('⚡ Return visit - skipping loading screen');
    }
  }, [hasSeenLoadingBefore]);

  useEffect(() => {
    console.log('📍 Current route:', location.pathname);
    // Auto-preload MathJax if navigating to math/physics pages
    autoPreloadMathJax(location.pathname);
  }, [location.pathname]);

  // Setup orientation detection
  useEffect(() => {
    // Set initial orientation class
    updateOrientationClass();
    
    // Listen for orientation changes
    const handleOrientationChange = () => {
      updateOrientationClass();
    };
    
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <>
      {!loadingComplete && (
        <LoadingScreen onComplete={() => {
          console.log('✅ Loading screen complete - showing app');
          setLoadingComplete(true);
        }} />
      )}
      {loadingComplete && (
        <>
          <AuroraBackground />
          <PageTransition />
          <ScrollToTop />
          <Sidebar />
          <EmailVerificationBanner />
          <NotificationToast />
          {/* Hide AI chatbot on auth pages */}
          {!location.pathname.match(/^\/(login|register|forgot-password|reset-password|verify-email)$/) && (
            <Suspense fallback={null}>
              <AIChatWidget />
            </Suspense>
          )}
        </>
      )}
      <div id="main-content" className={loadingComplete ? 'loaded' : ''}>
        <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            color: '#fff',
            fontSize: '1.2rem'
          }}>
            Carregando...
          </div>
        }>
          <Routes>
            {/* Authentication Routes - Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={
              <Suspense fallback={<div>Carregando...</div>}>
                <ProtectedRoute requireEmailVerification={false}>
                  <VerifyEmail />
                </ProtectedRoute>
              </Suspense>
            } />
            
            {/* Profile - Protected */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Suspense fallback={<div>Carregando...</div>}>
                  <Profile />
                </Suspense>
              </ProtectedRoute>
            } />
            
            {/* Terminal/Hub - Protected */}
            <Route path="/" element={
              <ProtectedRoute>
                <Suspense fallback={<div>Carregando...</div>}>
                  <Terminal />
                </Suspense>
              </ProtectedRoute>
            } />
            
            {/* Math Subject - All Protected */}
            <Route path="/math" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><MathSubject /></ProtectedRoute></Suspense>} />
            <Route path="/math/numeros-complexos" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><ComplexNumbers /></ProtectedRoute></Suspense>} />
            <Route path="/math/polinomios" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><Polynomials /></ProtectedRoute></Suspense>} />
            <Route path="/math/geometria-analitica" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><AnalyticGeometry /></ProtectedRoute></Suspense>} />
            <Route path="/math/equacao-circunferencia" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><CircleEquation /></ProtectedRoute></Suspense>} />
            <Route path="/math/excentricidade" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><Eccentricity /></ProtectedRoute></Suspense>} />
            
            {/* Physics Subject - All Protected */}
            <Route path="/physics" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsSubject /></ProtectedRoute></Suspense>} />
            <Route path="/physics/exercicios-enem" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsExercises /></ProtectedRoute></Suspense>} />
            <Route path="/physics/optica" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsOptics /></ProtectedRoute></Suspense>} />
            <Route path="/physics/eletromagnetismo" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsElectromagnetism /></ProtectedRoute></Suspense>} />
            <Route path="/physics/transformadores" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsTransformers /></ProtectedRoute></Suspense>} />
            <Route path="/physics/magnetismo" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsMagnetism /></ProtectedRoute></Suspense>} />
            <Route path="/physics/espelhos-planos" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsPlainMirrors /></ProtectedRoute></Suspense>} />
            <Route path="/physics/espelhos-esfericos" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhysicsSphericalMirrors /></ProtectedRoute></Suspense>} />
            
            {/* Chemistry Subject - Protected */}
            <Route path="/chemistry" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><ChemistrySubject /></ProtectedRoute></Suspense>} />
            
            {/* Biology Subject - Protected */}
            <Route path="/biology" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><BiologySubject /></ProtectedRoute></Suspense>} />
            <Route path="/biology/filos-animais" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><BiologyFilos /></ProtectedRoute></Suspense>} />
            
            {/* Philosophy Subject - Protected */}
            <Route path="/philosophy" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PhilosophySubject /></ProtectedRoute></Suspense>} />
            
            {/* History Subject - Protected */}
            <Route path="/history" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><HistorySubject /></ProtectedRoute></Suspense>} />
            <Route path="/history/revolucao-francesa" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><FrenchRevolution /></ProtectedRoute></Suspense>} />
            <Route path="/history/era-napoleonica" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><NapoleonicEra /></ProtectedRoute></Suspense>} />
            
            {/* Portuguese Subject - Protected */}
            <Route path="/portuguese" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PortugueseSubject /></ProtectedRoute></Suspense>} />
            <Route path="/portuguese/interpretacao" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PortugueseInterpretacao /></ProtectedRoute></Suspense>} />
            <Route path="/portuguese/concordancia" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PortugueseConcordancia /></ProtectedRoute></Suspense>} />
            <Route path="/portuguese/regencia" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PortugueseRegencia /></ProtectedRoute></Suspense>} />
            <Route path="/portuguese/crase" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PortugueseCrase /></ProtectedRoute></Suspense>} />
            <Route path="/portuguese/pontuacao" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><PortuguesePontuacao /></ProtectedRoute></Suspense>} />
            
            {/* Geography Subject - Protected */}
            <Route path="/geography" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><GeographySubject /></ProtectedRoute></Suspense>} />
            <Route path="/geografia/industrializacao" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><GeographyIndustrialization /></ProtectedRoute></Suspense>} />
            <Route path="/geografia/urbanizacao" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><GeographyUrbanization /></ProtectedRoute></Suspense>} />
            <Route path="/geografia/agricultura" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><GeographyAgriculture /></ProtectedRoute></Suspense>} />
            
            {/* Sociology Subject - Protected */}
            <Route path="/sociology" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><SociologySubject /></ProtectedRoute></Suspense>} />
            
            {/* Literature Subject - Protected */}
            <Route path="/literature" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><LiteratureSubject /></ProtectedRoute></Suspense>} />
            <Route path="/literature/modernismo-portugues" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><ModernismoPortugues /></ProtectedRoute></Suspense>} />
            <Route path="/literature/modernismo-brasileiro-segunda-fase" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><ModernismoBrasileiroSegundaFase /></ProtectedRoute></Suspense>} />
            <Route path="/literature/modernismo-brasileiro-terceira-fase" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><ModernismoBrasileiroTerceiraFase /></ProtectedRoute></Suspense>} />
            <Route path="/literature/movimentos-posteriores" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><MovimentosLiterariosPosteriores /></ProtectedRoute></Suspense>} />
            
            {/* Arts Subject - Protected */}
            <Route path="/arts" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><ArtsSubject /></ProtectedRoute></Suspense>} />
            
            {/* English Subject - Protected */}
            <Route path="/english" element={<Suspense fallback={<div>Carregando...</div>}><ProtectedRoute><EnglishSubject /></ProtectedRoute></Suspense>} />
            
            {/* Admin Panel - DEV ONLY */}
            {import.meta.env.MODE === 'development' && AdminPanel && (
              <Route 
                path="/dev-admin" 
                element={
                  <AdminGuard>
                    <AdminPanel />
                  </AdminGuard>
                } 
              />
            )}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <AdminProvider>
              <PerformanceProvider>
                <NavigationProvider>
                  <ChatbotProvider>
                    <AppContent />
                  </ChatbotProvider>
                </NavigationProvider>
              </PerformanceProvider>
            </AdminProvider>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
