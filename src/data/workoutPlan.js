export const WORKOUT_DAYS = {
  G1: {
    label: 'G1 — Petto/Spalle/Tricipiti/Bicipiti',
    exercises: [
      'Panca piana',
      'Military press',
      'Dip',
      'Panca inclinata',
      'Curl EZ + martello',
      'Spider curl',
      'Cable twist',
    ],
  },
  G2: {
    label: 'G2 — Posteriore/Spalle',
    exercises: [
      'Stacco sumo 4x8',
      'Leg curl mono',
      'RDL',
      'Lento avanti',
      'Alzate laterali + posteriori',
      'Leg raise',
    ],
  },
  G3: {
    label: 'G3 — Schiena/Spalle/Tricipiti',
    exercises: [
      'Pull up',
      'Lat machine mono',
      'Pulley mono',
      'Alzate laterali cavo',
      'Pushdown',
      'Distensioni testa drop',
    ],
  },
  G4: {
    label: 'G4 — Gambe/Core',
    exercises: [
      'Squat 4x4-5',
      'Bulgari 4x10',
      'Leg extension mono (sospesa per ginocchio)',
      'Pressa',
      'Chin up',
      'Plank',
    ],
  },
};

export const DAY_KEYS = Object.keys(WORKOUT_DAYS);
