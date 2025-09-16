import * as migration_20250915_090005 from './20250915_090005';
import * as migration_20250915_102801 from './20250915_102801';
import * as migration_20250916_171241 from './20250916_171241';
import * as migration_20250916_172856 from './20250916_172856';
import * as migration_20250916_172942 from './20250916_172942';
import * as migration_20250916_173111 from './20250916_173111';

export const migrations = [
  {
    up: migration_20250915_090005.up,
    down: migration_20250915_090005.down,
    name: '20250915_090005',
  },
  {
    up: migration_20250915_102801.up,
    down: migration_20250915_102801.down,
    name: '20250915_102801',
  },
  {
    up: migration_20250916_171241.up,
    down: migration_20250916_171241.down,
    name: '20250916_171241',
  },
  {
    up: migration_20250916_172856.up,
    down: migration_20250916_172856.down,
    name: '20250916_172856',
  },
  {
    up: migration_20250916_172942.up,
    down: migration_20250916_172942.down,
    name: '20250916_172942',
  },
  {
    up: migration_20250916_173111.up,
    down: migration_20250916_173111.down,
    name: '20250916_173111'
  },
];
