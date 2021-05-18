const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (_env, argv) => ({
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    background: './src/background.ts',
    popup: './src/popup/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        'src/manifest.json',
        'src/popup/popup.html',
        // TODO 'src/_locales'
        { from: 'src/_locales', to: '_locales' },
        // TODO 'src/icons'
        { from: 'src/icons', to: 'icons' },
      ],
    }),
  ],
});
