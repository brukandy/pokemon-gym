import { useState } from 'react';

export default function AppMenu({ open, onClose, onResetAll }) {
  const [confirming, setConfirming] = useState(false);

  if (!open) return null;

  function handleClose() {
    setConfirming(false);
    onClose();
  }

  return (
    <div className="menu-overlay" onClick={handleClose}>
      <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="menu-drawer-header">
          <strong>Menu</strong>
          <button type="button" className="btn-icon" onClick={handleClose} title="Chiudi">
            ✕
          </button>
        </div>

        {!confirming ? (
          <button type="button" className="menu-item danger" onClick={() => setConfirming(true)}>
            Reset completo dati
          </button>
        ) : (
          <div className="menu-confirm">
            <p>Sei sicuro? Cancella allenamenti, storico e collezione carte. Non si può annullare.</p>
            <div className="menu-confirm-actions">
              <button type="button" className="btn-secondary" onClick={() => setConfirming(false)}>
                Annulla
              </button>
              <button type="button" className="btn-danger" onClick={onResetAll}>
                Sì, cancella tutto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
