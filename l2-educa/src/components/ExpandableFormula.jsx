import React, { useState, useMemo } from 'react';
import TextWithMath from './TextWithMath';
import FormulaModal from './FormulaModal';
import './ExpandableFormula.css';

const ExpandableFormula = ({ children, display = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Memoize the formula components to prevent re-renders
  const mainFormula = useMemo(() => (
    <TextWithMath>{children}</TextWithMath>
  ), [children]);

  const modalFormula = useMemo(() => (
    <TextWithMath>{children}</TextWithMath>
  ), [children]);

  return (
    <>
      <div className={`expandable-formula-wrapper ${display ? 'display-mode' : 'inline-mode'}`}>
        {mainFormula}
        <button 
          className="formula-expand-btn" 
          onClick={handleExpand}
          title="Expandir fórmula"
          aria-label="Expandir fórmula"
        >
          <span className="material-icons">open_in_full</span>
        </button>
      </div>

      <FormulaModal 
        formula={modalFormula}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default React.memo(ExpandableFormula);

