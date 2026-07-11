import { formatSetsSummary } from '../utils/sessionStats';

export default function DayDetail({ date, sessions, onClose }) {
  return (
    <div className="day-detail">
      <div className="day-detail-header">
        <div>
          <strong>{date}</strong>
        </div>
        <button type="button" className="btn-icon" onClick={onClose} title="Chiudi">
          ✕
        </button>
      </div>

      {sessions.map((session) => (
        <div key={session.id} className="day-detail-session">
          <span className="badge">{session.day}</span>
          {session.exercises.map((exercise, i) => (
            <div key={i} className="day-detail-exercise">
              <p className="day-detail-exercise-name">{exercise.name}</p>
              <p className="day-detail-exercise-sets">{formatSetsSummary(exercise.sets)}</p>
              {exercise.note && <p className="day-detail-exercise-note">{exercise.note}</p>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
