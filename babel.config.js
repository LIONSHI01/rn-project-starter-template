// Specify app folder location is inside /src
// process.env.EXPO_ROUTER_APP_ROOT = 'src/app';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@src': './src',
          },
        },
      ],
    ],
  };
};
