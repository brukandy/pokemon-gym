import { useRef, useState } from 'react';

const MAX_TILT = 16;
const SWIPE_DISTANCE = 40;
const SWIPE_TIME_MS = 250;

export default function InteractiveCard({ card, flipped, onFlip, badge, backHint }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const gestureRef = useRef(null);

  function triggerFlip() {
    if (!flipped) onFlip();
  }

  function handlePointerDown(e) {
    gestureRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!gestureRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: relY * -2 * MAX_TILT, y: relX * 2 * MAX_TILT });

    if (!flipped) {
      const dx = e.clientX - gestureRef.current.x;
      const dy = e.clientY - gestureRef.current.y;
      const elapsed = Date.now() - gestureRef.current.time;
      if (Math.hypot(dx, dy) > SWIPE_DISTANCE && elapsed < SWIPE_TIME_MS) {
        triggerFlip();
      }
    }
  }

  function endGesture() {
    gestureRef.current = null;
    setDragging(false);
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      className={`card-flip ${flipped ? 'is-flipped' : ''}`}
      onClick={triggerFlip}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endGesture}
      onPointerLeave={endGesture}
      onPointerCancel={endGesture}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      <div className="card-face card-back">
        <img src="/back-card.png" alt="Retro carta" />
        {backHint && <p className="card-back-hint">{backHint}</p>}
      </div>
      <div className="card-face card-front">
        {flipped && badge && <span className={`ribbon-badge ${badge.type}`}>{badge.text}</span>}
        <img src={card.imageUrl} alt={card.name} loading="lazy" />
        {flipped && (
          <div
            className="card-shine"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(255,255,255,0.35), transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
