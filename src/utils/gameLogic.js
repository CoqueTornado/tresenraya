/**
 * Determina el ganador en un tablero de N x N.
 * Se necesita una línea de N piezas idénticas ('X' o 'O') en horizontal, vertical o diagonal para ganar.
 * Las piezas 'R' (Núcleo del Reactor) se ignoran y no contribuyen a una línea ganadora.
 * El tamaño del tablero (N) se infiere de la longitud del array `squares`.
 * @param {Array<string|null>} squares - Un array 1D que representa el estado de cada celda del tablero N x N.
 *                                       Los elementos se leen de izquierda a derecha, de arriba abajo.
 *                                       Cada elemento puede ser 'X', 'O', 'R', o null si está vacía.
 * @returns {string|null} Retorna el símbolo del jugador ganador ('X' o 'O') si hay uno,
 *                        o `null` si no hay ganador (puede ser un empate o el juego continúa).
 */
export const calculateWinner = (squares) => {
  if (!squares || squares.length === 0) {
    return null; // Tablero vacío o inválido
  }

  const n = Math.sqrt(squares.length);
  if (!Number.isInteger(n) || n === 0) {
    // No se puede determinar ganador en un tablero no válido o de tamaño cero
    return null;
  }

  // Función auxiliar para comprobar una línea de N celdas
  const checkLine = (lineIndices) => {
    const firstCellIndex = lineIndices[0];
    const potentialWinner = squares[firstCellIndex];

    // Una línea ganadora debe empezar con 'X' o 'O'
    if (!potentialWinner || potentialWinner === 'R') {
      return null;
    }

    // Todas las celdas de la línea deben coincidir con potentialWinner
    for (let i = 1; i < n; i++) {
      const currentCellIndex = lineIndices[i];
      if (squares[currentCellIndex] !== potentialWinner) {
        return null;
      }
    }
    return potentialWinner; // Se encontró un ganador en esta línea
  };

  // Comprobar filas
  for (let i = 0; i < n; i++) {
    const rowIndices = [];
    for (let j = 0; j < n; j++) {
      rowIndices.push(i * n + j);
    }
    const winner = checkLine(rowIndices);
    if (winner) return winner;
  }

  // Comprobar columnas
  for (let j = 0; j < n; j++) {
    const colIndices = [];
    for (let i = 0; i < n; i++) {
      colIndices.push(i * n + j);
    }
    const winner = checkLine(colIndices);
    if (winner) return winner;
  }

  // Comprobar diagonal principal (de arriba-izquierda a abajo-derecha)
  const diag1Indices = [];
  for (let i = 0; i < n; i++) {
    diag1Indices.push(i * n + i);
  }
  const winnerDiag1 = checkLine(diag1Indices);
  if (winnerDiag1) return winnerDiag1;

  // Comprobar anti-diagonal (de arriba-derecha a abajo-izquierda)
  const diag2Indices = [];
  for (let i = 0; i < n; i++) {
    // Índice para la anti-diagonal: fila i, columna (n - 1 - i)
    diag2Indices.push(i * n + (n - 1 - i));
  }
  const winnerDiag2 = checkLine(diag2Indices);
  if (winnerDiag2) return winnerDiag2;

  // Si no se encuentra ningún ganador
  return null;
};