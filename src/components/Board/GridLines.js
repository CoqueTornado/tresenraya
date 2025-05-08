import React from 'react';
import styles from './GridLines.module.css';

/**
 * Componente que renderiza las líneas de la cuadrícula del tablero de Tres en Raya.
 * Utiliza SVG para dibujar las líneas con gradientes y animaciones.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el elemento SVG.
 * @param {number} [props.size=300] - El tamaño del tablero (ancho y alto).
 * @returns {JSX.Element} El elemento SVG que representa las líneas de la cuadrícula.
 */
const GridLinesComponent = ({ className, size = 300 }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      className={`${styles.grid} ${className || ''}`}
    >
      <defs>
        <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" />
          <stop offset="100%" stopColor="#0066ff" />
        </linearGradient>
        <linearGradient id="horizontalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff00d6" />
          <stop offset="100%" stopColor="#ff0066" />
        </linearGradient>
      </defs>
      
      {/* Trazados de la Cuadrícula Animados */}
      <path
        d={`M${size/3} 0 V${size} M${size/1.5} 0 V${size}`}
        stroke="url(#verticalGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={styles.gridLineVertical}
      />
      <path
        d={`M0 ${size/3} H${size} M0 ${size/1.5} H${size}`}
        stroke="url(#horizontalGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={styles.gridLineHorizontal}
      />
    </svg>
  );
};

const GridLines = React.memo(GridLinesComponent);

export default GridLines;