import React from 'react';
import GridLines from './Board/GridLines';
import XPiece from './Pieces/XPiece';
import OPiece from './Pieces/OPiece';
import ReactorCore from './Pieces/ReactorCore';
import styles from './Board.module.css';

// Registro de componentes de piezas para facilitar la extensibilidad
const pieceRegistry = {
  'X': XPiece,
  'O': OPiece,
  'R': ReactorCore,
  // Futuras piezas se añadirían aquí
};

/**
 * Componente que renderiza el tablero del juego Tres en Raya.
 * Gestiona el tamaño del tablero y la representación de las celdas con las piezas.
 * @param {object} props - Propiedades del componente.
 * @param {Array<string|null>} props.squares - Un array que representa el estado de cada celda del tablero (ej: ['X', null, 'O', ...]).
 * @param {function(number): void} props.onClick - Función que se llama cuando se hace clic en una celda. Recibe el índice de la celda como argumento.
 * @returns {JSX.Element} El elemento SVG que representa el tablero del juego.
 */
function BoardComponent({ squares, onClick }) {
  const [boardSize, setBoardSize] = React.useState(300);

  const handleResize = React.useCallback(() => {
    // Intentar seleccionar por la clase del módulo CSS.
    // Esto podría no funcionar como se espera si el componente aún no se ha renderizado
    // o si la referencia al DOM se necesita antes de que los estilos del módulo se apliquen completamente.
    // Una referencia (ref) al elemento SVG sería más robusta aquí.
    const container = document.querySelector(`.${styles.board}`);
    if (container) {
      setBoardSize(Math.min(container.clientWidth, container.clientHeight));
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Llamar una vez para establecer el tamaño inicial
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <svg
      className={styles.board}
      viewBox={`0 0 ${boardSize} ${boardSize}`}
      width="90vmin"
      height="90vmin"
      preserveAspectRatio="xMidYMid meet"
    >
      {squares.map((value, index) => {
        const cellSize = boardSize / 3;
        const cellCenterX = (index % 3) * cellSize + cellSize / 2;
        const cellCenterY = Math.floor(index / 3) * cellSize + cellSize / 2;
        const cellTopLeftX = (index % 3) * cellSize;
        const cellTopLeftY = Math.floor(index / 3) * cellSize;

        // Determinar clases adicionales para la celda (winning, x, o)
        let cellClasses = styles.cell;
        // Aquí necesitaríamos la lógica para determinar si la celda es ganadora.
        // Esta información no está directamente disponible en BoardComponent,
        // tendría que pasarse o calcularse aquí.
        // Por ahora, solo aplicaremos la clase base.
        // Ejemplo: if (isWinningCell(index)) cellClasses += ` ${styles.winning}`;
        // Ejemplo: if (value === 'X') cellClasses += ` ${styles.x}`;
        // Ejemplo: if (value === 'O') cellClasses += ` ${styles.o}`;

        return (
          <g
            key={index}
            onClick={() => {
              if (squares[index] === 'R') {
                return;
              }
              onClick(index);
            }}
            onKeyDown={(e) => e.key === 'Enter' && onClick(index)}
            role="button"
            aria-label={`${value || 'Vacía'} celda, fila ${Math.floor(index / 3) + 1}, columna ${(index % 3) + 1}`}
            tabIndex="0"
            /* className={cellClasses} */ // Remove className from <g> wrapper
          >
            <rect
              className={styles.cellBackgroundRect} // Apply specific class for background styling
              x={cellTopLeftX}
              y={cellTopLeftY}
              width={cellSize}
              height={cellSize}
              fill="transparent" // Ensure fill is transparent, CSS handles border/hover fill
              pointerEvents="visible"
            />
            {(() => {
              // Obtener el componente de pieza del registro
              const PieceComponent = pieceRegistry[value];

              // Si no hay un componente para el valor actual (ej. celda vacía o tipo desconocido), no renderizar nada
              if (!PieceComponent) {
                return null;
              }

              // Determinar las props específicas para el tipo de pieza
              let pieceSpecificProps = {};
              if (value === 'X' || value === 'O') {
                pieceSpecificProps = {
                  x: cellTopLeftX,
                  y: cellTopLeftY,
                  cellSize: cellSize,
                };
              } else if (value === 'R') { // Asumimos que si PieceComponent existe y no es X u O, es R (u otro tipo futuro)
                pieceSpecificProps = {
                  x: cellCenterX,
                  y: cellCenterY,
                  // cellSize no se pasa a ReactorCore según el código original
                };
              }
              // Para futuras piezas, se añadirían aquí las condiciones para sus props específicas:
              // else if (value === 'NUEVO_TIPO_DE_PIEZA') { ... }
              
              return (
                <PieceComponent
                  {...pieceSpecificProps}
                  // className="reactor-ttt__hover-scale" // Eliminado, el hover se maneja en styles.cell
                />
              );
            })()}
          </g>
        );
      })}
      <GridLines size={boardSize} />
    </svg>
  );
}

const Board = React.memo(BoardComponent);

export default Board;