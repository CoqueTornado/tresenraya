import React from 'react';

/**
 * Componente de React que actúa como un límite de error.
 * Captura errores de JavaScript en sus componentes hijos, registra esos errores,
 * y muestra una UI de respaldo en lugar del árbol de componentes que falló.
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Algo salió mal con el juego.</h2>
          <button onClick={() => window.location.reload()}>
            Refrescar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;