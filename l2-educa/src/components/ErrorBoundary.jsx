import React from 'react';
import GlassCard from './GlassCard';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('🚨 Error Boundary Caught:', error, errorInfo);
    }

    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Optional: Send to error reporting service
    // this.reportError(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    // Try to recover by reloading the page
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    window.location.href = '#/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <GlassCard className="error-card">
              <div className="error-icon">
                <span className="material-icons">error_outline</span>
              </div>
              
              <h1 className="error-title">Oops! Algo deu errado</h1>
              
              <p className="error-message">
                Encontramos um erro inesperado. Não se preocupe, seus dados estão seguros.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="error-details">
                  <summary>Detalhes do Erro (Dev Mode)</summary>
                  <pre className="error-stack">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="error-actions">
                <button onClick={this.handleReset} className="error-button primary">
                  <span className="material-icons">refresh</span>
                  Recarregar Página
                </button>
                <button onClick={this.handleGoHome} className="error-button secondary">
                  <span className="material-icons">home</span>
                  Ir para Início
                </button>
              </div>

              {this.state.errorCount > 2 && (
                <div className="error-warning">
                  <span className="material-icons">warning</span>
                  <p>
                    Múltiplos erros detectados. Considere limpar o cache do navegador:
                    <br />
                    <kbd>Ctrl+Shift+Delete</kbd> ou <kbd>Cmd+Shift+Delete</kbd>
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

