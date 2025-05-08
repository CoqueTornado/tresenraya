import React from 'react';
import styles from './Piece.module.css';

// Marcador de posición para el diseño del Núcleo del Reactor - círculo simple por ahora
/**
 * Componente que renderiza la pieza especial 'Núcleo del Reactor'.
 * Presenta animaciones visuales cuando está activo.
 * @param {object} props - Propiedades del componente.
 * @param {number} props.x - La coordenada X central de la celda.
 * @param {number} props.y - La coordenada Y central de la celda.
 * @param {string} [props.className] - Clases CSS adicionales para el elemento SVG del grupo.
 *                                   La clase 'active' dispara la animación de partículas.
 * @returns {JSX.Element} El elemento SVG del grupo que representa el Núcleo del Reactor.
 */
const ReactorCoreComponent = ({ x, y, className }) => {
  const particleRef = React.useRef([]);
  const animationFrameId = React.useRef(null);
  const isActive = className?.includes('active');

  const animateParticles = React.useCallback((startTime) => {
    const animate = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / 600, 1);
      
      particleRef.current.forEach((particle, angle) => {
        if (!particle) return;
        const length = progress * 30;
        const x2 = Math.cos(angle * (Math.PI/180)) * length;
        const y2 = Math.sin(angle * (Math.PI/180)) * length;
        particle.setAttribute('d', `M${x} ${y} l${x2} ${y2}`);
        particle.style.strokeOpacity = 1 - progress;
      });

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        console.timeEnd('particleAnimation');
      }
    };
    animationFrameId.current = requestAnimationFrame(animate);
  }, [x, y]);

  React.useEffect(() => {
    if (!isActive) return;

    console.time('particleAnimation');
    const startTime = performance.now();
    animateParticles(startTime);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        console.timeEnd('particleAnimation');
      }
    };
  }, [isActive, animateParticles]);

  return (
    <g className={`${styles.reactorCore} ${className || ''}`}>
      <defs>
        <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ff5500" />
          <stop offset="100%" stopColor="#ff0000" />
        </radialGradient>
      </defs>
      
      {/* Núcleo animado con efecto de pulso */}
      <circle
        cx={x}
        cy={y}
        r="35"
        stroke="url(#coreGradient)"
        strokeWidth="8"
        fill="var(--background-dark)" // Asumiendo que --background-dark está definido globalmente
        className={styles.coreGlow} // Aplicar clase de módulo
      />
      
      {/* Núcleo de plasma interno */}
      <circle
        cx={x}
        cy={y}
        r="21"
        fill="url(#coreGradient)"
        className={styles.coreOpacity} // Aplicar clase de módulo
      />
      
      {/* Emisiones de partículas */}
      {isActive && (
        <>
          {[0, 90, 180, 270].map((angle) => (
            <path
              key={angle}
              d={`M${x} ${y} l0 0`}
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              className={styles.coreParticle} // Aplicar clase de módulo
              ref={el => particleRef.current[angle] = el}
            />
          ))}
        </>
      )}
    </g>
  );

};

const ReactorCore = React.memo(ReactorCoreComponent);

export default ReactorCore;
