import { DAY_KEYS } from './workoutPlan';

function distinctDates(sessions) {
  return new Set(sessions.map((s) => s.date));
}

function maxWeightInExercise(exercise) {
  return exercise.sets.reduce((max, set) => {
    const w = parseFloat(set.weight);
    return Number.isFinite(w) && w > max ? w : max;
  }, 0);
}

// True if, for at least one exercise, a later session logged a heavier top weight
// than an earlier session for the same exercise (i.e. the user beat a previous PR).
function hasBeatenPR(sessions) {
  const sorted = [...sessions].sort((a, b) => (a.date < b.date ? -1 : 1));
  const bestByExercise = {};
  for (const session of sorted) {
    for (const exercise of session.exercises) {
      const top = maxWeightInExercise(exercise);
      if (top <= 0) continue;
      const prev = bestByExercise[exercise.name];
      if (prev !== undefined && top > prev) return true;
      if (prev === undefined || top > prev) bestByExercise[exercise.name] = top;
    }
  }
  return false;
}

function hasConsecutiveDays(sessions) {
  const dates = Array.from(distinctDates(sessions)).sort();
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays = Math.round((curr - prev) / 86400000);
    if (diffDays === 1) return true;
  }
  return false;
}

function coversAllSplitDays(sessions) {
  const days = new Set(sessions.map((s) => s.day));
  return DAY_KEYS.every((key) => days.has(key));
}

export const MISSIONS = [
  {
    id: 'tre-giorni',
    title: 'Costanza',
    description: 'Allenati in 3 giorni diversi',
    progress: (sessions) => ({ current: Math.min(distinctDates(sessions).size, 3), target: 3 }),
    isComplete: (sessions) => distinctDates(sessions).size >= 3,
  },
  {
    id: 'nuovo-massimale',
    title: 'Nuovo massimale',
    description: 'Supera un tuo record di peso su un esercizio',
    progress: (sessions) => ({ current: hasBeatenPR(sessions) ? 1 : 0, target: 1 }),
    isComplete: (sessions) => hasBeatenPR(sessions),
  },
  {
    id: 'due-consecutivi',
    title: 'Doppietta',
    description: 'Allenati 2 giorni di fila',
    progress: (sessions) => ({ current: hasConsecutiveDays(sessions) ? 1 : 0, target: 1 }),
    isComplete: (sessions) => hasConsecutiveDays(sessions),
  },
  {
    id: 'split-completo',
    title: 'Split completo',
    description: 'Completa almeno una sessione per ogni giorno (G1-G4)',
    progress: (sessions) => ({
      current: new Set(sessions.map((s) => s.day)).size,
      target: DAY_KEYS.length,
    }),
    isComplete: (sessions) => coversAllSplitDays(sessions),
  },
];
