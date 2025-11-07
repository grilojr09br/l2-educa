import React, { useEffect, useRef, useState } from 'react';
import './MathFormula.css';
import { formulaCache } from '../utils/formulaCache';
import { errorHandler } from '../utils/errorHandler';

const MathFormula = ({ 
  children, 
  formula,
  display = false, 
  className = '',
  numbered = false
}) => {
  const mathRef = useRef(null);
  const [isTypeset, setIsTypeset] = useState(false);
  
  // Use formula prop if provided, otherwise use children
  const content = formula || children;
  const contentRef = useRef(content);

  useEffect(() => {
    const el = mathRef.current;
    if (!window.MathJax || !el || !content) return;

    // Only update if content actually changed
    if (contentRef.current !== content) {
      contentRef.current = content;
      setIsTypeset(false);
    }

    if (!isTypeset) {
      const processFormula = async () => {
        const formulaText = display ? `\\[${content}\\]` : `\\(${content}\\)`;
        
        // ALWAYS render immediately first (no waiting for cache)
        el.innerHTML = formulaText;
        
        // Try cache in background (non-blocking)
        formulaCache.get(content, display).then(cached => {
          if (cached && cached.html) {
            // If we have cached HTML, use it (will replace the LaTeX)
            el.innerHTML = cached.html;
            setIsTypeset(true);
          } else {
            // No cache, typeset with MathJax
            window.MathJax.typesetPromise([el])
              .then(() => {
                // Cache the result for next time (in background)
                formulaCache.set(content, display, el.innerHTML).catch((err) => {
                  errorHandler.handleCacheError(err, 'MathFormula-cache-set');
                });
                setIsTypeset(true);
              })
              .catch((err) => {
                console.error('MathJax typeset failed:', err);
                errorHandler.handleMathJaxError(err, content);
                setIsTypeset(true); // Mark as done even if failed
              });
          }
        }).catch((err) => {
          // Cache failed, just typeset normally
          errorHandler.handleCacheError(err, 'MathFormula-cache-get');
          window.MathJax.typesetPromise([el])
            .then(() => {
              setIsTypeset(true);
            })
            .catch((err) => {
              console.error('MathJax typeset failed:', err);
              errorHandler.handleMathJaxError(err, content);
              setIsTypeset(true);
            });
        });
      };
      
      processFormula();
    }
  }, [content, display, isTypeset]);

  // Use span for inline, div for display
  const Component = display ? 'div' : 'span';
  
  return (
    <Component 
      ref={mathRef}
      className={`math-formula ${display ? 'display-mode' : 'inline-mode'} ${numbered ? 'numbered' : ''} ${className}`}
    />
  );
};

export default MathFormula;
