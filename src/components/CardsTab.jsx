import { useState } from 'react';
import { CRI_CARDS, SET_TOTAL } from '../data/criCards';
import CardFlip from './CardFlip';
import CardViewer from './CardViewer';

export default function CardsTab({ collection, pendingDraws, onRevealDraw }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const ownedCount = Object.keys(collection).length;
  const currentDraw = pendingDraws[0];
  const alreadyOwnedBeforeThisDraw = currentDraw ? (collection[currentDraw] || 0) > 0 : false;

  return (
    <div className="tab-content">
      {currentDraw && (
        <div className="draw-overlay">
          <h2>Nuova carta pescata!</h2>
          <CardFlip
            cardId={currentDraw}
            isDuplicate={alreadyOwnedBeforeThisDraw}
            onRevealed={() => onRevealDraw(currentDraw)}
          />
        </div>
      )}

      {selectedCard && (
        <CardViewer
          card={selectedCard}
          count={collection[selectedCard.id] || 0}
          onClose={() => setSelectedCard(null)}
        />
      )}

      <div className="collection-header">
        <h2>Collezione Chaos Rising</h2>
        <p className="progress-counter">
          {ownedCount}/{SET_TOTAL} carte
        </p>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(ownedCount / SET_TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <div className="collection-grid">
        {CRI_CARDS.map((card) => {
          const count = collection[card.id] || 0;
          const owned = count > 0;
          return (
            <button
              type="button"
              key={card.id}
              className={`collection-card ${owned ? 'owned' : 'locked'}`}
              onClick={() => owned && setSelectedCard(card)}
              disabled={!owned}
            >
              {owned ? (
                <img src={card.imageUrl} alt={card.name} loading="lazy" />
              ) : (
                <div className="collection-card-placeholder">
                  <img src="/back-card.png" alt="" loading="lazy" />
                  <div className="locked-overlay">
                    <span>{String(card.number).padStart(3, '0')}</span>
                  </div>
                </div>
              )}
              {count > 1 && <span className="dup-badge">×{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
