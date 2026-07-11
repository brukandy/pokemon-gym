import { useState } from 'react';
import { DAY_KEYS } from '../data/workoutPlan';
import { useWorkoutPlan } from '../hooks/useWorkoutPlan';
import ExerciseEntry from './ExerciseEntry';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function emptyExercise(name) {
  return { name, sets: [{ weight: '', reps: '' }], note: '' };
}

export default function RegisterTab({ sessions, onSaveSession, onCardDrawn }) {
  const { plan, addExerciseToDay, removeExerciseFromDay } = useWorkoutPlan();
  const [date, setDate] = useState(todayISO());
  const [day, setDay] = useState(DAY_KEYS[0]);
  const [exercises, setExercises] = useState(
    plan[DAY_KEYS[0]].exercises.map(emptyExercise)
  );
  const [customName, setCustomName] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  function handleDayChange(newDay) {
    setDay(newDay);
    setExercises(plan[newDay].exercises.map(emptyExercise));
  }

  function updateExercise(index, updated) {
    setExercises((prev) => prev.map((e, i) => (i === index ? updated : e)));
  }

  function removeExercise(index) {
    const exercise = exercises[index];
    setExercises((prev) => prev.filter((_, i) => i !== index));
    removeExerciseFromDay(day, exercise.name);
  }

  function addCustomExercise() {
    const name = customName.trim();
    if (!name) return;
    setExercises((prev) => [...prev, emptyExercise(name)]);
    addExerciseToDay(day, name);
    setCustomName('');
  }

  function handleSave() {
    const cleanedExercises = exercises
      .map((e) => ({
        ...e,
        sets: e.sets.filter((s) => s.weight !== '' || s.reps !== ''),
      }))
      .filter((e) => e.sets.length > 0 || e.note.trim() !== '');

    if (cleanedExercises.length === 0) {
      setSavedMessage('Aggiungi almeno una serie prima di salvare.');
      return;
    }

    const session = {
      id: `${date}-${Date.now()}`,
      date,
      day,
      exercises: cleanedExercises,
    };
    onSaveSession(session);
    setExercises(plan[day].exercises.map(emptyExercise));
    setSavedMessage('Sessione salvata!');
    onCardDrawn();
    setTimeout(() => setSavedMessage(''), 3000);
  }

  return (
    <div className="tab-content">
      <div className="session-header">
        <label>
          Data
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Giorno
          <select value={day} onChange={(e) => handleDayChange(e.target.value)}>
            {DAY_KEYS.map((key) => (
              <option key={key} value={key}>
                {plan[key].label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {exercises.map((exercise, index) => (
        <ExerciseEntry
          key={`${exercise.name}-${index}`}
          exercise={exercise}
          sessions={sessions}
          onChange={(updated) => updateExercise(index, updated)}
          onRemove={() => removeExercise(index)}
        />
      ))}

      <div className="add-custom-exercise">
        <input
          type="text"
          placeholder="Aggiungi esercizio (es. sostituzione per infortunio)"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCustomExercise()}
        />
        <button type="button" className="btn-secondary" onClick={addCustomExercise}>
          + Aggiungi
        </button>
      </div>
      <p className="plan-hint">
        Aggiungere o rimuovere un esercizio aggiorna la scheda di questo giorno anche per la prossima volta.
      </p>

      <button type="button" className="btn-primary" onClick={handleSave}>
        Salva sessione
      </button>

      {savedMessage && <p className="save-message">{savedMessage}</p>}
    </div>
  );
}
