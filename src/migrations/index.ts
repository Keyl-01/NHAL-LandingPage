import * as migration_20260921_085422_initial from './20260921_085422_initial';

export const migrations = [
  {
    up: migration_20260921_085422_initial.up,
    down: migration_20260921_085422_initial.down,
    name: '20260921_085422_initial'
  },
];
