import * as migration_20250915_090005 from './20250915_090005';
import * as migration_20250915_102801 from './20250915_102801';

export const migrations = [
  {
    up: migration_20250915_090005.up,
    down: migration_20250915_090005.down,
    name: '20250915_090005',
  },
  {
    up: migration_20250915_102801.up,
    down: migration_20250915_102801.down,
    name: '20250915_102801'
  },
];
