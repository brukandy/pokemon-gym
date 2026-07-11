import { getLastEntryForExercise, formatSetsSummary } from '../utils/sessionStats';

export default function ExerciseEntry({ exercise, sessions, onChange, onRemove }) {
  const lastEntry = getLastEntryForExercise(sessions, exercise.name);

  function updateSet(index, field, value) {
    const newSets = exercise.sets.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    onChange({ ...exercise, sets: newSets });
  }

  function duplicateSet(index) {
    const newSets = [...exercise.sets];
    newSets.splice(index + 1, 0, { ...exercise.sets[index] });
    onChange({ ...exercise, sets: newSets });
  }

  function removeSet(index) {
    const newSets = exercise.sets.filter((_, i) => i !== index);
    onChange({ ...exercise, sets: newSets });
  }

  function addSet() {
    onChange({ ...exercise, sets: [...exercise.sets, { weight: '', reps: '' }] });
  }

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <h3>{exercise.name}</h3>
        <button type="button" className="btn-icon danger" onClick={onRemove} title="Rimuovi esercizio">
          ✕
        </button>
      </div>

      {lastEntry && (
        <p className="last-entry">
          Ultima volta ({lastEntry.date}): {formatSetsSummary(lastEntry.sets)}
        </p>
      )}

      <div className="sets-list">
        {exercise.sets.map((set, index) => (
          <div className="set-row" key={index}>
            <span className="set-index">#{index + 1}</span>
            <input
              type="number"
              inputMode="decimal"
              placeholder="kg"
              value={set.weight}
              onChange={(e) => updateSet(index, 'weight', e.target.value)}
            />
            <span className="set-x">×</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="rep"
              value={set.reps}
              onChange={(e) => updateSet(index, 'reps', e.target.value)}
            />
            <button type="button" className="btn-icon" onClick={() => duplicateSet(index)} title="Duplica serie">
              ⧉
            </button>
            <button type="button" className="btn-icon danger" onClick={() => removeSet(index)} title="Rimuovi serie">
              −
            </button>
          </div>
        ))}
      </div>

      <button type="button" className="btn-secondary" onClick={addSet}>
        + Aggiungi serie
      </button>

      <textarea
        className="note-field"
        placeholder="Nota (opzionale)"
        value={exercise.note}
        onChange={(e) => onChange({ ...exercise, note: e.target.value })}
      />
    </div>
  );
}
