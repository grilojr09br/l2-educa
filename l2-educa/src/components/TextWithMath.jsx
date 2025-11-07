import React, { useEffect, useRef, useState } from 'react';
import './TextWithMath.css';

/**
 * Component that renders text containing inline LaTeX formulas
 * Handles text with $ delimiters for inline math (e.g., "text $x^2$ more text")
 */
const TextWithMath = ({ children }) => {
  const mathRef = useRef(null);
  const [isTypeset, setIsTypeset] = useState(false);

  useEffect(() => {
    if (window.MathJax && mathRef.current && !isTypeset) {
      window.MathJax.typesetPromise([mathRef.current])
        .then(() => setIsTypeset(true))
        .catch((err) => console.error('MathJax typeset failed:', err));
    }
  }, [children, isTypeset]);

  // Convert $ delimiters to \( \) for MathJax
  const processedContent = typeof children === 'string' 
    ? children.replace(/\$([^\$]+)\$/g, '\\($1\\)')
    : children;

  return (
    <span 
      ref={mathRef}
      className="text-with-math"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default React.memo(TextWithMath);

