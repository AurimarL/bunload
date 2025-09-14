import * as migration_20250914_214235 from './20250914_214235';

export const migrations = [
  {
    up: migration_20250914_214235.up,
    down: migration_20250914_214235.down,
    name: '20250914_214235'
  },
];
