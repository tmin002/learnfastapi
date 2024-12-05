const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: './src/javascript/main.js',  // Entry file for JavaScript,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory for all files
    filename: 'index.js',  // Output bundle name for JS
  },

  module: {
    rules: [
      // JavaScript rules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/html', to: '.' },  // Copy all HTML files from src/html to dist/html
        { from: 'src/css', to: '.' },  // Copy all HTML files from src/html to dist/html
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // Replace contentBase with static
    },
    compress: true,
    port: 9000,  // Dev server port
    open: true,  // Automatically open the browser
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        ignored: /node_modules/
      }
    }
  },

  devtool: 'source-map',  // Enable source maps
};