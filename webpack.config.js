const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  // TODO: figure out chunking to reduce file sizes
  const config = await createExpoWebpackConfigAsync(env, argv);
  return config;
};
