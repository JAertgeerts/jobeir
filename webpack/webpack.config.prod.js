const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const path = require('path');

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [path.join(__dirname, '../client/index.js')],
    vendor: ['react', 'react-dom'],
  },

  output: {
    path: path.join(__dirname, '../build/client'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?localIdentName=[hash:base64]&modules&importLoaders=1!postcss-loader',
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js',
    }),
    new ExtractTextPlugin({
      filename: 'app.[chunkhash].css',
      disable: false,
      allChunks: true,
    }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),
  ],
};
