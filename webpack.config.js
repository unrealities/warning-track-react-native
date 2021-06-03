const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = webpackConfig = async function(env, argv) {
  // TODO: figure out chunking to reduce file sizes
  // TODO: anything to help Android here?
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      offline: false,
    },
    argv
  );

  return merge(config, {
    plugins: [
      new ManifestPlugin({
        fileName: "manifest.json",
      }),
      new webpack.HashedModuleIdsPlugin(),
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace("@","")}`
            },
          },
        },
      },
    },
    resolve: {
      alias: {
        "react-native": "react-native-web"
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: "babel-loader",
            options: {
              preset: ["babel-preset-expo"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-modules-commonjs",
              ],
              cacheDirectory: true,
            },
          },
          include: [
            path.resolve("node_modules/react-navigation")
          ]
        }
      ]
    },
  })
};
