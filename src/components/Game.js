import { useReducer, useCallback } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/gameLogic';
import styles from './Game.module.css';

const initialState = {
  board: Array(9).fill(null),
  isXNext: true
};

/**
 * Reductor para gestionar el estado del juego.   
 * @param {object} state - El estado actual del juego.
 * @param {Array<string|null>} state.board - El tablero actual.
 * @param {boolean} state.isXNext - Indica si el siguiente jugador es 'X'.
 * @param {object} action - La acción a realizar.
 * @param {string} action.type - El tipo de acción (ej: 'MAKE_MOVE', 'RESET').
 * @param {number} [action.index] - El índice de la celda para la acción 'MAKE_MOVE'.
 * @returns {object} El nuevo estado del juego.
 */
function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE':
      if (calculateWinner(state.board) || state.board[action.index]) {
        return state;
      }
      const newBoard = [...state.board];
      newBoard[action.index] = state.isXNext ? 'X' : 'O';
      return {
        board: newBoard,
        isXNext: !state.isXNext
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/**
 * Componente principal del juego Tres en Raya.
 * Gestiona la lógica del juego, el estado del tablero, el jugador actual,  
 * y determina el ganador o si hay un empate.
 * @returns {JSX.Element} El elemento JSX que representa la interfaz del juego.
 */
function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleClick = useCallback((i) => {
    dispatch({ type: 'MAKE_MOVE', index: i });
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const winner = calculateWinner(state.board);
  const isBoardFull = state.board.every(square => square);
  const status = winner
    ? `Ganador: ${winner}`
    : isBoardFull
    ? '¡Empate!'
    : `Siguiente jugador: ${state.isXNext ? 'X' : 'O'}`;

  return (
    <div className={styles.game}>
      <div className={styles.status}>{status}</div>
      <Board squares={state.board} onClick={handleClick} />
      <button className={styles.resetBtn} onClick={resetGame}>Nueva Partida</button>
    </div>
  );
}

export default Game;