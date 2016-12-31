const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const cssnext = require('postcss-cssnext')
const precss = require('precss')
const atImport = require("postcss-import")
const breakpoints = require("postcss-breakpoints")
const nano= require('cssnano')
const colors= require('postcss-color-function')
const rucksack = require('rucksack-css')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const lost = require('lost')

const cssLoaders = [
  'css-loader',
  'postcss-loader',
  //'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src')
]

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.NamedModulesPlugin(),
  new ExtractTextPlugin('[name].css')
];


if (isProd) {
  plugins.push(
    /*new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),*/
    new webpack.optimize.UglifyJsPlugin({
      /*compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },*/
       sourceMap: true,
      compress: {
        warnings: false
      }
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

const config = {
  entry: {
    app: ['./src/index.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
      },
      /*{
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }*/
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          //name: '[name].[ext]?[hash]'
          name: '[name].[ext]'
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  },
  /*plugins: [
    new ExtractTextPlugin('[name].css')
  ],*/ 
  plugins,
  postcss: [
    atImport({}),
    //cssnext({}),
    breakpoints({}),
  	precss({}),
    //colors({}),
    rucksack({}),
  	lost({}),
  	autoprefixer({
      browsers: ['last 2 versions']
    }),
    //nano({}),
  ],
  resolve: {
    /*extensions: ['', '.js', '.css'],
    root: [path.join(__dirname, './src')]
    */
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}

module.exports = config