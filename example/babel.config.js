const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

const base = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
  },
  { root, pkg }
);

base.plugins = [
  ...(base.plugins || []),
  [
    'transform-define',
    {
      __LIB_NAME__: pkg.name,
      __LIB_VERSION__: pkg.version,
    },
  ],
];

module.exports = base;
