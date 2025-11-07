import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './FormulaModal.css';

const FormulaModal = ({ formula, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="formula-modal-overlay" onClick={onClose}>
      <div className="formula-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="formula-modal-close" onClick={onClose}>
          <span className="material-icons">close</span>
        </button>
        
        <div className="formula-modal-header">
          <span className="material-icons">functions</span>
          <h3>Fórmula Expandida</h3>
        </div>
        
        <div className="formula-modal-body">
          <div className="expanded-formula">
            {formula}
          </div>
        </div>
        
        <div className="formula-modal-footer">
          <p className="modal-hint">
            <span className="material-icons">info</span>
            Toque fora da caixa ou pressione ESC para fechar
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FormulaModal;

