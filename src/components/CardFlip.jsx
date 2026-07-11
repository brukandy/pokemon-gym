import { useState } from 'react';
import { CRI_CARDS } from '../data/criCards';
import InteractiveCard from './InteractiveCard';

export default function CardFlip({ cardId, isDuplicate, onRevealed }) {
  const [flipped, setFlipped] = useState(false);
  const card = CRI_CARDS.find((c) => c.id === cardId);

  if (!card) return null;

  return (
    <div className="card-flip-wrapper">
      <InteractiveCard
        card={card}
        flipped={flipped}
        onFlip={() => setFlipped(true)}
        backHint="Tocca o scorri per scoprire"
        badge={{
          type: isDuplicate ? 'duplicate' : 'new',
          text: isDuplicate ? 'DOPPIONE' : 'NEW',
        }}
      />
      {flipped && (
        <div className="card-reveal-info">
          <p>{card.name}</p>
          <button type="button" className="btn-secondary" onClick={onRevealed}>
            Continua
          </button>
        </div>
      )}
    </div>
  );
}
