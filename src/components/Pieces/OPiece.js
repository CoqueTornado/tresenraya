import React from 'react';
import styles from './Piece.module.css';

/**
 * Componente que renderiza la pieza 'O' (círculo) del Tres en Raya.
 * @param {object} props - Propiedades del componente.
 * @param {number} props.x - La coordenada X de la esquina superior izquierda de la celda.
 * @param {number} props.y - La coordenada Y de la esquina superior izquierda de la celda.
 * @param {number} props.cellSize - El tamaño de la celda.
 * @param {string} [props.className] - Clases CSS adicionales para el elemento SVG.
 * @returns {JSX.Element} El elemento SVG que representa la pieza 'O'.
 */
const OPieceComponent = ({ x, y, cellSize, className }) => {
  return (
    <svg
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      /* stroke="var(--color-o)" */ /* Remove stroke attribute, apply via CSS class */
      strokeWidth="12"
      /* visibility="visible" */ /* Remove explicit visibility */
      className={`${styles.pieceSvg} ${styles.oPiece} ${className || ''}`} /* Restore classes */
    >
      <circle cx="50" cy="50" r="35" />
    </svg>
  );
};

const OPiece = React.memo(OPieceComponent);

export default OPiece;