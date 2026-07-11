import { DumbbellIcon, HistoryIcon, CardsIcon } from './TabIcons';

const OPTIONS = [
  { key: 'register', label: 'Allenamento', hint: 'Registra la sessione di oggi', Icon: DumbbellIcon },
  { key: 'history', label: 'Storico', hint: 'Rivedi le sessioni passate', Icon: HistoryIcon },
  { key: 'cards', label: 'Collezione', hint: 'Le tue carte Chaos Rising', Icon: CardsIcon },
];

export default function HomeTab({ onNavigate }) {
  return (
    <div className="tab-content home-menu">
      {OPTIONS.map(({ key, label, hint, Icon }) => (
        <button
          type="button"
          key={key}
          className="home-option"
          onClick={() => onNavigate(key)}
        >
          <span className="home-option-icon">
            <Icon />
          </span>
          <span className="home-option-text">
            <strong>{label}</strong>
            <span>{hint}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
