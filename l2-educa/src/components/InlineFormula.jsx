import React, { useEffect, useRef } from 'react';
import './InlineFormula.css';

/**
 * Component that renders text with inline LaTeX formulas
 * Handles mixed text like: "Velocidade: $v = 5$ m/s"
 * Splits by $ and renders math with MathJax
 * Accepts either 'children' or 'formula' prop
 */
const InlineFormula = ({ children, formula }) => {
  const containerRef = useRef(null);
  
  // Use formula prop if provided, otherwise use children
  const content = formula || children;

  useEffect(() => {
    if (window.MathJax && containerRef.current && content) {
      window.MathJax.typesetPromise([containerRef.current]).catch((err) => 
        console.error('MathJax typeset failed:', err)
      );
    }
  }, [content]);

  // Return null if no content
  if (!content) {
    return null;
  }

  // Check if content has $ delimiters
  const hasDollarDelimiters = (text) => {
    return typeof text === 'string' && text.includes('$');
  };

  // If no $ delimiters, treat entire content as math formula
  if (!hasDollarDelimiters(content)) {
    return (
      <span 
        ref={containerRef} 
        className="inline-formula-container"
        dangerouslySetInnerHTML={{ __html: `\\(${content}\\)` }}
      />
    );
  }

  // Split text by $ delimiters and process
  const processText = (text) => {
    // Handle edge cases
    if (!text) return [];
    if (typeof text !== 'string') {
      console.warn('InlineFormula: content is not a string', text);
      return [{ type: 'text', content: String(text) }];
    }
    
    const parts = [];
    let current = '';
    let inMath = false;
    let i = 0;
    
    while (i < text.length) {
      if (text[i] === '$') {
        if (inMath) {
          // End of math mode
          parts.push({ type: 'math', content: current });
          current = '';
          inMath = false;
        } else {
          // Start of math mode
          if (current) {
            parts.push({ type: 'text', content: current });
          }
          current = '';
          inMath = true;
        }
        i++;
      } else {
        current += text[i];
        i++;
      }
    }
    
    // Add remaining text
    if (current) {
      parts.push({ type: inMath ? 'math' : 'text', content: current });
    }
    
    return parts;
  };

  const parts = processText(content);

  // If no valid content, return null
  if (!parts || parts.length === 0) {
    return null;
  }

  return (
    <span ref={containerRef} className="inline-formula-container">
      {parts.map((part, index) => {
        if (part.type === 'math') {
          return (
            <span
              key={index}
              className="math-part"
              dangerouslySetInnerHTML={{ __html: `\\(${part.content}\\)` }}
            />
          );
        } else {
          return (
            <span key={index} className="text-part">
              {part.content}
            </span>
          );
        }
      })}
    </span>
  );
};

export default React.memo(InlineFormula);

