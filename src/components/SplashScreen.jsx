import { CRI_CARDS } from '../data/criCards';

const FLOATING_CARDS = [
  { number: 4, top: '4%', left: '3%', rotate: -12, width: 84 },
  { number: 96, top: '2%', right: '6%', rotate: 10, width: 78 },
  { number: 33, top: '16%', left: '32%', rotate: -6, width: 96 },
  { number: 71, top: '20%', right: '10%', rotate: 14, width: 110 },
  { number: 12, top: '38%', left: '2%', rotate: 8, width: 90 },
  { number: 108, top: '42%', right: '2%', rotate: -10, width: 100 },
  { number: 57, bottom: '20%', left: '6%', rotate: -8, width: 112 },
  { number: 45, bottom: '16%', right: '4%', rotate: 12, width: 118 },
  { number: 88, bottom: '2%', left: '28%', rotate: -14, width: 88 },
];

export default function SplashScreen({ onStart }) {
  return (
    <div className="splash-screen" onClick={onStart}>
      <div className="splash-cards">
        {FLOATING_CARDS.map((c) => {
          const card = CRI_CARDS[c.number - 1];
          return (
            <img
              key={c.number}
              src={card.imageUrl}
              alt=""
              className="splash-card"
              style={{
                top: c.top,
                bottom: c.bottom,
                left: c.left,
                right: c.right,
                width: c.width,
                '--r': `${c.rotate}deg`,
              }}
            />
          );
        })}
      </div>

      <div className="splash-center">
        <img src="/logo.png" alt="Bruno Gym Card Game" className="splash-logo" />
        <p className="splash-cta">Tocca per iniziare</p>
      </div>
    </div>
  );
}
