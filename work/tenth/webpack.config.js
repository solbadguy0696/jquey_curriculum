// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');

module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: 'development',
  // エントリーポイントの設定
  entry: './js/index.js',
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: 'bundle.js',
    // 出力先のパス（v2系以降は絶対パスを指定する必要がある）
    path: `${__dirname}/js`,
  },
  module: {
    rules: [{
      test: /\.js?$/, // 拡張子がjsで
      use: [{
          // babel-loaderを使って変換する
          loader: 'babel-loader',
          // Babel のオプションを指定する
          options: {
            presets: [
              // babelのbabel-preset-es2015プラグインを使って変換
              'babel-preset-es2015',
            ]
          }
      }]
    }]
  }
};