/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const { dependencies: possibleExternals } = require('./package.json');

// Find all the dependencies without a `main` property and add them as webpack externals
function filterDepWithoutEntryPoints(dep) {
  // Return true if we want to add a dependency to externals
  try {
    // If the root of the dependency has an index.js, return true
    if (fs.existsSync(path.join(__dirname, `node_modules/${dep}/index.js`))) {
      return false;
    }
    const pgkString = fs
      .readFileSync(path.join(__dirname, `node_modules/${dep}/package.json`))
      .toString();
    const pkg = JSON.parse(pgkString);
    const fields = ['main', 'module', 'jsnext:main', 'browser'];
    return !fields.some(field => field in pkg);
  } catch (e) {
    console.log(e);
    return true;
  }
}

module.exports = {
  externals: [
    ...[
      'amcharts3',
      'ethereumjs-tx',
      'ethereumjs-util',
      'ethereumjs-wallet',
      'sha3',
      'ssb-ws',
      'ut_message',
      'ut_metadata',
      'ut_pex',
      'web3',
      'webtorrent'
    ],
    ...Object.keys(possibleExternals || {}).filter(filterDepWithoutEntryPoints)
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  optimization: {
    moduleIds: 'named',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
  ]
};
