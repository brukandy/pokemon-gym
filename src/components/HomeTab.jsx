import { DumbbellIcon, HistoryIcon } from './TabIcons';

export default function HomeTab({ onNavigate, collectionCount, collectionTotal, claimableMissions }) {
  return (
    <div className="tab-content home-screen">
      <button
        type="button"
        className="home-hero"
        onClick={() => onNavigate('cards')}
        style={{ backgroundImage: 'url(/copertina.jpg)' }}
      >
        <div className="home-hero-overlay">
          <span className="home-hero-title">Collezione</span>
          <span className="home-hero-sub">
            {collectionCount}/{collectionTotal} carte Chaos Rising
          </span>
        </div>
      </button>

      <div className="home-split-row">
        <button type="button" className="home-split-card allenamento" onClick={() => onNavigate('register')}>
          <span className="home-split-icon">
            <DumbbellIcon />
          </span>
          <span className="home-split-label">Allenamento</span>
        </button>

        <button type="button" className="home-split-card storico" onClick={() => onNavigate('history')}>
          <span className="home-split-icon">
            <HistoryIcon />
          </span>
          <span className="home-split-label">Storico</span>
        </button>
      </div>

      <button type="button" className="home-missions" onClick={() => onNavigate('missions')}>
        <img src="/clessidra.png" alt="" className="home-missions-icon" />
        <span className="home-missions-text">
          <strong>Missioni</strong>
          <span>Completa obiettivi, ottieni carte</span>
        </span>
        {claimableMissions > 0 && <span className="home-missions-badge">{claimableMissions}</span>}
      </button>
    </div>
  );
}
