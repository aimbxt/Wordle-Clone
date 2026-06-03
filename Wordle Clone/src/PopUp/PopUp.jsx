import React, { useEffect, useRef } from 'react';
import './Popup.css';

export default function PopUp({isOpen, onClose, children}) {
    useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (<div className="overlay" onClick={onClose}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>)

}