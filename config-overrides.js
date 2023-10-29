const webpack = require("webpack");

module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  );

  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test?.test?.(".svg")
  );

  config.module.rules.push(
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /url/ }, // exclude if *.svg?url
      use: ["@svgr/webpack"],
    }
  );

  config.resolve = {
    ...config.resolve,
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    fallback: {
      ...config.resolve.fallback,
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
    },
  };

  return config;
};
