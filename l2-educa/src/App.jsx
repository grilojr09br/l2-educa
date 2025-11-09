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
// import EmailVerificationBanner from './components/EmailVerificationBanner'; // ⚠️ DEACTIVATED - Email verification disabled
import { updateOrientationClass } from './utils/mobileDetection';
import { autoPreloadMathJax } from './utils/mathJaxPreloader';
import { usePageCache } from './hooks/usePageCache';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/design-tokens.css';
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
import SuspendedProtectedRoute from './components/auth/SuspendedProtectedRoute';

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
          {/* <EmailVerificationBanner /> */} {/* ⚠️ DEACTIVATED - Email verification disabled */}
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
            <Route path="/verify-email" element={<SuspendedProtectedRoute requireEmailVerification={false}><VerifyEmail /></SuspendedProtectedRoute>} />
            
            {/* Profile - Protected */}
            <Route path="/profile" element={<SuspendedProtectedRoute><Profile /></SuspendedProtectedRoute>} />
            
            {/* Terminal/Hub - Protected */}
            <Route path="/" element={<SuspendedProtectedRoute><Terminal /></SuspendedProtectedRoute>} />
            
            {/* Math Subject - All Protected */}
            <Route path="/math" element={<SuspendedProtectedRoute><MathSubject /></SuspendedProtectedRoute>} />
            <Route path="/math/numeros-complexos" element={<SuspendedProtectedRoute><ComplexNumbers /></SuspendedProtectedRoute>} />
            <Route path="/math/polinomios" element={<SuspendedProtectedRoute><Polynomials /></SuspendedProtectedRoute>} />
            <Route path="/math/geometria-analitica" element={<SuspendedProtectedRoute><AnalyticGeometry /></SuspendedProtectedRoute>} />
            <Route path="/math/equacao-circunferencia" element={<SuspendedProtectedRoute><CircleEquation /></SuspendedProtectedRoute>} />
            <Route path="/math/excentricidade" element={<SuspendedProtectedRoute><Eccentricity /></SuspendedProtectedRoute>} />
            
            {/* Physics Subject - All Protected */}
            <Route path="/physics" element={<SuspendedProtectedRoute><PhysicsSubject /></SuspendedProtectedRoute>} />
            <Route path="/physics/exercicios-enem" element={<SuspendedProtectedRoute><PhysicsExercises /></SuspendedProtectedRoute>} />
            <Route path="/physics/optica" element={<SuspendedProtectedRoute><PhysicsOptics /></SuspendedProtectedRoute>} />
            <Route path="/physics/eletromagnetismo" element={<SuspendedProtectedRoute><PhysicsElectromagnetism /></SuspendedProtectedRoute>} />
            <Route path="/physics/transformadores" element={<SuspendedProtectedRoute><PhysicsTransformers /></SuspendedProtectedRoute>} />
            <Route path="/physics/magnetismo" element={<SuspendedProtectedRoute><PhysicsMagnetism /></SuspendedProtectedRoute>} />
            <Route path="/physics/espelhos-planos" element={<SuspendedProtectedRoute><PhysicsPlainMirrors /></SuspendedProtectedRoute>} />
            <Route path="/physics/espelhos-esfericos" element={<SuspendedProtectedRoute><PhysicsSphericalMirrors /></SuspendedProtectedRoute>} />
            
            {/* Chemistry Subject - Protected */}
            <Route path="/chemistry" element={<SuspendedProtectedRoute><ChemistrySubject /></SuspendedProtectedRoute>} />
            
            {/* Biology Subject - Protected */}
            <Route path="/biology" element={<SuspendedProtectedRoute><BiologySubject /></SuspendedProtectedRoute>} />
            <Route path="/biology/filos-animais" element={<SuspendedProtectedRoute><BiologyFilos /></SuspendedProtectedRoute>} />
            
            {/* Philosophy Subject - Protected */}
            <Route path="/philosophy" element={<SuspendedProtectedRoute><PhilosophySubject /></SuspendedProtectedRoute>} />
            
            {/* History Subject - Protected */}
            <Route path="/history" element={<SuspendedProtectedRoute><HistorySubject /></SuspendedProtectedRoute>} />
            <Route path="/history/revolucao-francesa" element={<SuspendedProtectedRoute><FrenchRevolution /></SuspendedProtectedRoute>} />
            <Route path="/history/era-napoleonica" element={<SuspendedProtectedRoute><NapoleonicEra /></SuspendedProtectedRoute>} />
            
            {/* Portuguese Subject - Protected */}
            <Route path="/portuguese" element={<SuspendedProtectedRoute><PortugueseSubject /></SuspendedProtectedRoute>} />
            <Route path="/portuguese/interpretacao" element={<SuspendedProtectedRoute><PortugueseInterpretacao /></SuspendedProtectedRoute>} />
            <Route path="/portuguese/concordancia" element={<SuspendedProtectedRoute><PortugueseConcordancia /></SuspendedProtectedRoute>} />
            <Route path="/portuguese/regencia" element={<SuspendedProtectedRoute><PortugueseRegencia /></SuspendedProtectedRoute>} />
            <Route path="/portuguese/crase" element={<SuspendedProtectedRoute><PortugueseCrase /></SuspendedProtectedRoute>} />
            <Route path="/portuguese/pontuacao" element={<SuspendedProtectedRoute><PortuguesePontuacao /></SuspendedProtectedRoute>} />
            
            {/* Geography Subject - Protected */}
            <Route path="/geography" element={<SuspendedProtectedRoute><GeographySubject /></SuspendedProtectedRoute>} />
            <Route path="/geografia/industrializacao" element={<SuspendedProtectedRoute><GeographyIndustrialization /></SuspendedProtectedRoute>} />
            <Route path="/geografia/urbanizacao" element={<SuspendedProtectedRoute><GeographyUrbanization /></SuspendedProtectedRoute>} />
            <Route path="/geografia/agricultura" element={<SuspendedProtectedRoute><GeographyAgriculture /></SuspendedProtectedRoute>} />
            
            {/* Sociology Subject - Protected */}
            <Route path="/sociology" element={<SuspendedProtectedRoute><SociologySubject /></SuspendedProtectedRoute>} />
            
            {/* Literature Subject - Protected */}
            <Route path="/literature" element={<SuspendedProtectedRoute><LiteratureSubject /></SuspendedProtectedRoute>} />
            <Route path="/literature/modernismo-portugues" element={<SuspendedProtectedRoute><ModernismoPortugues /></SuspendedProtectedRoute>} />
            <Route path="/literature/modernismo-brasileiro-segunda-fase" element={<SuspendedProtectedRoute><ModernismoBrasileiroSegundaFase /></SuspendedProtectedRoute>} />
            <Route path="/literature/modernismo-brasileiro-terceira-fase" element={<SuspendedProtectedRoute><ModernismoBrasileiroTerceiraFase /></SuspendedProtectedRoute>} />
            <Route path="/literature/movimentos-posteriores" element={<SuspendedProtectedRoute><MovimentosLiterariosPosteriores /></SuspendedProtectedRoute>} />
            
            {/* Arts Subject - Protected */}
            <Route path="/arts" element={<SuspendedProtectedRoute><ArtsSubject /></SuspendedProtectedRoute>} />
            
            {/* English Subject - Protected */}
            <Route path="/english" element={<SuspendedProtectedRoute><EnglishSubject /></SuspendedProtectedRoute>} />
            
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
