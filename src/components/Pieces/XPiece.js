import React from 'react';
import styles from './Piece.module.css';

/**
 * Componente que renderiza la pieza 'X' (cruz) del Tres en Raya.
 * @param {object} props - Propiedades del componente.
 * @param {number} props.x - La coordenada X de la esquina superior izquierda de la celda.
 * @param {number} props.y - La coordenada Y de la esquina superior izquierda de la celda.
 * @param {number} props.cellSize - El tamaño de la celda.
 * @param {string} [props.className] - Clases CSS adicionales para el elemento SVG.
 * @returns {JSX.Element} El elemento SVG que representa la pieza 'X'.
 */
const XPieceComponent = ({ x, y, cellSize, className }) => {
  return (
    <svg
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--color-x)" /* Restore CSS variable */
      /* visibility="visible" */ /* Remove explicit visibility */
      className={`${styles.pieceSvg} ${styles.xPiece} ${className || ''}`} /* Restore classes */
    >
      <rect x="15" y="42.5" width="70" height="15" rx="7.5" ry="7.5" transform="rotate(45 50 50)" />
      <rect x="15" y="42.5" width="70" height="15" rx="7.5" ry="7.5" transform="rotate(-45 50 50)" />
    </svg>
  );
};

const XPiece = React.memo(XPieceComponent);

export default XPiece;