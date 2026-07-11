export function getLastEntryForExercise(sessions, exerciseName) {
  const sorted = [...sessions].sort((a, b) => (a.date < b.date ? 1 : -1));
  for (const session of sorted) {
    const found = session.exercises.find((e) => e.name === exerciseName);
    if (found && found.sets.length > 0) {
      return { date: session.date, sets: found.sets, note: found.note };
    }
  }
  return null;
}

export function getAllExerciseNames(sessions) {
  const names = new Set();
  sessions.forEach((s) => s.exercises.forEach((e) => names.add(e.name)));
  return Array.from(names).sort((a, b) => a.localeCompare(b));
}

export function getHistoryForExercise(sessions, exerciseName) {
  return sessions
    .filter((s) => s.exercises.some((e) => e.name === exerciseName))
    .map((s) => ({
      date: s.date,
      day: s.day,
      ...s.exercises.find((e) => e.name === exerciseName),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatSetsSummary(sets) {
  if (!sets || sets.length === 0) return '—';
  return sets.map((s) => `${s.weight || 0}kg×${s.reps || 0}`).join(', ');
}
