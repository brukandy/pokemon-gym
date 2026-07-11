import { useState } from 'react';
import { getAllExerciseNames, getHistoryForExercise, formatSetsSummary } from '../utils/sessionStats';
import Calendar from './Calendar';
import DayDetail from './DayDetail';

export default function HistoryTab({ sessions }) {
  const [expanded, setExpanded] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const exerciseNames = getAllExerciseNames(sessions);

  const sessionsByDate = sessions.reduce((acc, s) => {
    (acc[s.date] = acc[s.date] || []).push(s);
    return acc;
  }, {});

  if (exerciseNames.length === 0) {
    return (
      <div className="tab-content">
        <p className="empty-state">Nessuna sessione registrata ancora.</p>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <Calendar
        sessionsByDate={sessionsByDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {selectedDate && sessionsByDate[selectedDate] && (
        <DayDetail
          date={selectedDate}
          sessions={sessionsByDate[selectedDate]}
          onClose={() => setSelectedDate(null)}
        />
      )}

      <h2 className="history-section-title">Storico per esercizio</h2>

      {exerciseNames.map((name) => {
        const isOpen = expanded === name;
        const history = getHistoryForExercise(sessions, name);
        return (
          <div className="history-exercise" key={name}>
            <button
              type="button"
              className="history-exercise-header"
              onClick={() => setExpanded(isOpen ? null : name)}
            >
              <span>{name}</span>
              <span className="history-count">{history.length} sessioni {isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
              <div className="history-sessions">
                {history.map((h, i) => (
                  <div className="history-session-row" key={i}>
                    <div className="history-session-meta">
                      <strong>{h.date}</strong> <span className="badge">{h.day}</span>
                    </div>
                    <div className="history-session-sets">{formatSetsSummary(h.sets)}</div>
                    {h.note && <div className="history-session-note">{h.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
