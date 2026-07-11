import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { drawRandomCard, SET_TOTAL } from './data/criCards';
import { MISSIONS } from './data/missions';
import SplashScreen from './components/SplashScreen';
import HomeTab from './components/HomeTab';
import RegisterTab from './components/RegisterTab';
import HistoryTab from './components/HistoryTab';
import CardsTab from './components/CardsTab';
import MissionsTab from './components/MissionsTab';
import AppMenu from './components/AppMenu';
import { HomeIcon, DumbbellIcon, HistoryIcon, CardsIcon, MissionsIcon, MenuIcon } from './components/TabIcons';
import './App.css';

const TABS = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'register', label: 'Allenamento', Icon: DumbbellIcon },
  { key: 'history', label: 'Storico', Icon: HistoryIcon },
  { key: 'missions', label: 'Missioni', Icon: MissionsIcon },
  { key: 'cards', label: 'Carte', Icon: CardsIcon },
];

const RESET_KEYS = [
  'gym_sessions',
  'gym_card_collection',
  'gym_pending_draws',
  'gym_workout_plan',
  'gym_claimed_missions',
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessions, setSessions] = useLocalStorage('gym_sessions', []);
  const [collection, setCollection] = useLocalStorage('gym_card_collection', {});
  const [pendingDraws, setPendingDraws] = useLocalStorage('gym_pending_draws', []);
  const [claimedMissions, setClaimedMissions] = useLocalStorage('gym_claimed_missions', []);

  const claimableMissions = MISSIONS.filter(
    (m) => m.isComplete(sessions) && !claimedMissions.includes(m.id)
  ).length;

  function handleSaveSession(session) {
    setSessions((prev) => [...prev, session]);
  }

  function handleCardDrawn() {
    const card = drawRandomCard();
    setPendingDraws((prev) => [...prev, card.id]);
    setTimeout(() => setActiveTab('cards'), 650);
  }

  function handleRevealDraw(cardId) {
    setCollection((prev) => ({ ...prev, [cardId]: (prev[cardId] || 0) + 1 }));
    setPendingDraws((prev) => prev.slice(1));
  }

  function handleClaimMission(missionId) {
    setClaimedMissions((prev) => (prev.includes(missionId) ? prev : [...prev, missionId]));
    handleCardDrawn();
  }

  function handleResetAll() {
    RESET_KEYS.forEach((key) => window.localStorage.removeItem(key));
    window.location.reload();
  }

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <button
          type="button"
          className="menu-trigger"
          onClick={() => setMenuOpen(true)}
          aria-label="Apri menu"
        >
          <MenuIcon />
        </button>
        <img src="/logo.png" alt="Bruno Gym Card Game" className="app-logo" />
      </header>

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} onResetAll={handleResetAll} />

      <main className="app-main">
        {activeTab === 'home' && (
          <HomeTab
            onNavigate={setActiveTab}
            collectionCount={Object.keys(collection).length}
            collectionTotal={SET_TOTAL}
            claimableMissions={claimableMissions}
          />
        )}
        {activeTab === 'register' && (
          <RegisterTab
            sessions={sessions}
            onSaveSession={handleSaveSession}
            onCardDrawn={handleCardDrawn}
          />
        )}
        {activeTab === 'history' && <HistoryTab sessions={sessions} />}
        {activeTab === 'missions' && (
          <MissionsTab
            sessions={sessions}
            claimedMissions={claimedMissions}
            onClaim={handleClaimMission}
          />
        )}
        {activeTab === 'cards' && (
          <CardsTab
            collection={collection}
            pendingDraws={pendingDraws}
            onRevealDraw={handleRevealDraw}
          />
        )}
      </main>

      <nav className="tab-bar">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            className={`tab-button ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <span className="tab-icon">
              <Icon />
            </span>
            {key === 'missions' && claimableMissions > 0 && (
              <span className="tab-badge">{claimableMissions}</span>
            )}
            <span className="tab-label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
