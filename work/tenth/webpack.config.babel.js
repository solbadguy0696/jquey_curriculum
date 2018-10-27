import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './dist');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
console.log('nodeEnv ==> ', nodeEnv);
console.log('isDev ==> ', isDev);

const config = {
  mode: nodeEnv,
  devtool: isDev ? 'source-map' : 'eval',
  entry: {
    bundle: `${src}/index.js`,
  },
  output: {
    path: dist,
    filename: `[name].js`,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${src}/index.html`
    })
  ],
  resolve: {
    extensions: ['*', '.js']
  },
  serve: {
    port: 8080,
    reload: true,
    config: `${src}/webpack.config.babel.js`,
    content: './dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};

export default config;