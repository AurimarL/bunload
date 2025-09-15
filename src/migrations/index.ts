import * as migration_20250915_090005 from './20250915_090005';

export const migrations = [
  {
    up: migration_20250915_090005.up,
    down: migration_20250915_090005.down,
    name: '20250915_090005'
  },
];
