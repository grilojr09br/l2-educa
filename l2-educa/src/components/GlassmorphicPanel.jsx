import { useState, useRef, useEffect } from 'react';
import GlassShader from './GlassShader';
import './GlassmorphicPanel.css';

/**
 * GlassmorphicPanel - Easy-to-use glassmorphic effect component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display inside the glass panel
 * @param {number} props.width - Width of the glass effect in pixels (default: 300)
 * @param {number} props.height - Height of the glass effect in pixels (default: 120)
 * @param {number} props.blur - Blur intensity (0-5, default: 2.5)
 * @param {number} props.distortion - Glass distortion effect (0-5, default: 2.5)
 * @param {string} props.tint - Tint color in hex format (default: '#f8fff0')
 * @param {number} props.cornerRadius - Border radius in pixels (default: 24)
 * @param {string} props.backgroundImage - URL of background image (optional)
 * @param {boolean} props.showShadow - Show drop shadow (default: true)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
export default function GlassmorphicPanel({
  children,
  width = 300,
  height = 120,
  blur = 2.5,
  distortion = 2.5,
  tint = '#f8fff0',
  cornerRadius = 24,
  backgroundImage = null,
  showShadow = true,
  className = '',
  style = {},
  onClick = null,
  onHover = null
}) {
  const containerRef = useRef(null);
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0.98, g: 1.0, b: 0.95 };
  };

  const tintRgb = hexToRgb(tint);

  // Center the glass effect on mount and when container resizes
  useEffect(() => {
    const updateGlassPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setGlassPosition({
          x: rect.width / 2,
          y: rect.height / 2
        });
      }
    };

    updateGlassPosition();

    const resizeObserver = new ResizeObserver(updateGlassPosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const uniforms = {
    width,
    height,
    mouseX: glassPosition.x,
    mouseY: glassPosition.y,
    tintR: tintRgb.r,
    tintG: tintRgb.g,
    tintB: tintRgb.b,
    saturation: 1.0,
    distortion,
    blur,
    cornerRadius,
    chromaticAberration: 1.0,
    shadowIntensity: showShadow ? 0.2 : 0,
    shadowOffsetX: 0,
    shadowOffsetY: showShadow ? 8 : 0,
    shadowBlur: showShadow ? 20 : 0,
  };

  const handleReady = () => {
    setTimeout(() => setIsReady(true), 100);
  };

  return (
    <div
      ref={containerRef}
      className={`glassmorphic-panel ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {/* WebGL Canvas Background */}
      <div className="glassmorphic-panel__canvas">
        <GlassShader
          backgroundImage={backgroundImage}
          uniforms={uniforms}
          onReady={handleReady}
        />
      </div>

      {/* Content Overlay */}
      <div 
        className={`glassmorphic-panel__content ${isReady ? 'visible' : ''}`}
        style={{
          left: glassPosition.x,
          top: glassPosition.y,
          width: width * 2,
          height: height * 2,
          borderRadius: cornerRadius,
        }}
      >
        {children}
      </div>
    </div>
  );
}

