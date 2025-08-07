const pkg = require('./package.json');

module.exports = {
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: ['module:react-native-builder-bob/babel-preset'],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
  ],

  plugins: [
    [
      'transform-define',
      {
        __LIB_NAME__: pkg.name,
        __LIB_VERSION__: pkg.version,
      },
    ],
  ],
};
