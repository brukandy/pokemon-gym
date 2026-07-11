import InteractiveCard from './InteractiveCard';

export default function CardViewer({ card, count, onClose }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="card-flip-wrapper" onClick={(e) => e.stopPropagation()}>
        <InteractiveCard card={card} flipped onFlip={() => {}} />
        <div className="card-reveal-info">
          <p>{card.name}</p>
          {count > 1 && <span className="lightbox-count">Possedute: ×{count}</span>}
          <button type="button" className="btn-secondary" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
