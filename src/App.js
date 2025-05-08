import Game from './components/Game';
import './App.css'; // Import global styles
import styles from './App.module.css';

/**
 * Componente principal de la aplicación Tres en Raya.
 * Renderiza el título del juego y el componente Game.
 * @returns {JSX.Element} El elemento JSX que representa la aplicación.
 */
function App() {
  return (
    <div className={styles.app}>
      <h1>Tres en Raya</h1>
      <Game />
    </div>
  );
}

export default App;