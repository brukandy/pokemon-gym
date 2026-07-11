import { useLocalStorage } from './useLocalStorage';
import { WORKOUT_DAYS as DEFAULT_PLAN } from '../data/workoutPlan';

export function useWorkoutPlan() {
  const [plan, setPlan] = useLocalStorage('gym_workout_plan', DEFAULT_PLAN);

  function addExerciseToDay(day, name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setPlan((prev) => {
      if (prev[day].exercises.includes(trimmed)) return prev;
      return {
        ...prev,
        [day]: { ...prev[day], exercises: [...prev[day].exercises, trimmed] },
      };
    });
  }

  function removeExerciseFromDay(day, name) {
    setPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], exercises: prev[day].exercises.filter((e) => e !== name) },
    }));
  }

  return { plan, addExerciseToDay, removeExerciseFromDay };
}
