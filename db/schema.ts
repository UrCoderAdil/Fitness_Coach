/**
 * Offline DB schema (SQLite via WatermelonDB when wired — see README Phase 9).
 * Plain TS mirrors Watermelon `tableSchema` for codegen-free tooling & docs.
 */
export const SCHEMA_VERSION = 1;

export const WORKOUT_SESSION_COLUMNS = [
  'started_at',
  'ended_at',
  'exercise_id',
  'total_reps',
  'total_sets',
  'avg_form_score',
  'notes',
  'synced',
] as const;

export const EXERCISE_SET_COLUMNS = [
  'session_id',
  'set_number',
  'reps_completed',
  'weight_kg',
  'form_score',
  'rpe',
  'faults_json',
  'duration_seconds',
] as const;

export const PERSONAL_RECORD_COLUMNS = [
  'exercise_id',
  'weight_kg',
  'reps',
  'form_score',
  'achieved_at',
] as const;
