const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve = {
    modules: [
      path.resolve(__dirname, './src')
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  };
  return config;
};
