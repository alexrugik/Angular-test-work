var path = require('path');
var zlib = require('zlib');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var autoprefixer = require('autoprefixer');

var ENV = process.env.NODE_ENV || 'dev';
var isProd = /^(prod|live|test)$/.test(ENV);

var config = new WebpackConfig().extend('./config/config.json').extend('./config/config.' + ENV + '.json');
var metadata = Object.assign(JSON.parse(JSON.stringify(config.config)), {
  host: 'localhost',
  port: '8080',
  ENV: ENV
});

config.config.env = ENV;

var webpackConfig = {
  common: {
    metadata: metadata,
    devtool: 'source-map',
    debug: false,
    entry: {
      // Base App scripts entry point
      app: './app',

      // Base App styles entry point
      main: './resources/sass/main.scss',

      // Vendor JS entry point
      'vendor.js': config.vendor,

      // Vendor CSS entry point
      'vendor.css': './resources/sass/vendor.scss'
    },
    output: {
      path: root('web'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['', '.js', '.json', '.css', '.html'],
      modulesDirectories: ['node_modules', 'vendor']
    },
    module: {
      preLoaders: [],
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.s?css$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!postcss!sass?sourceMap')
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          test: /\.(woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader',
          query: {
            limit: 30000,
            name: 'img/[name]-[hash].[ext]'
          }
        }
      ]
    },
    postcss: function () {
      return [
        autoprefixer({
          browsers: [
            'last 2 versions',
            '> 5%',
            'Firefox ESR'
          ]
        })
      ]
    },
    devServer: {
      port: metadata.port,
      host: metadata.host,
      historyApiFallback: true,
      inline: true,
      outputPath: root('web'),
      contentBase: '/'
    },
    plugins: [
      new ExtractTextPlugin('css/[name].css'),
      new OccurenceOrderPlugin(true),
      new CopyWebpackPlugin([
        {
          from: 'assets/img',
          to: 'img/'
        }, {
          from: 'assets/views/',
          to: 'views/'
        }
      ]),
      new HtmlWebpackPlugin({
        template: 'template.html',
        minify: isProd ? {
          collapseWhitespace: true
        } : false,
        filename: 'index.html',
        excludeChunks: [
          // Exclude vendor.css from autoinserting to generated web/index.html
          'vendor.css'
        ],
        inject: false
      }),
      new DefinePlugin({
        'process.env': {
          CONFIG: JSON.stringify(config),
          ENV: JSON.stringify(ENV),
          NODE_ENV: JSON.stringify(ENV)
        }
      }),
      new ProvidePlugin(config.global),
      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
      )
    ]
  },
  dev: {
    debug: true,
    output: {
      filename: 'js/[name].bundle.js',
      sourceMapFilename: 'js/[name].map',
      chunkFilename: 'js/[id].chunk.js'
    },
    plugins: [
      new CommonsChunkPlugin({
        name: 'vendor.js',
        filename: 'js/vendor.bundle.js',
        minChunks: Infinity
      })
    ]
  }
};

if (isProd) {
  webpackConfig[ENV] = {
    debug: false,
    output: {
      filename: 'js/[name].[chunkhash].bundle.js',
      sourceMapFilename: 'js/[name].[chunkhash].bundle.map',
      chunkFilename: 'js/[id].[chunkhash].chunk.js'
    },
    resolve: {
      cache: false
    },
    plugins: [
      new WebpackMd5Hash(),
      new DedupePlugin(),
      new CommonsChunkPlugin({
        name: 'vendor.js',
        filename: 'js/vendor.[chunkhash].bundle.js',
        minChunks: Infinity
      }),
      new UglifyJsPlugin({
        beautify: true,
        mangle: false,
        comments: false,
        compress: {
          screw_ie8: true
        }
      }),
      new CompressionPlugin({
        algorithm: gzipMaxLevel,
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      })
    ]
  };
}

module.exports = new WebpackConfig().merge(webpackConfig.common).merge(webpackConfig[ENV]);

// =================== Helper Functions ===================

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function gzipMaxLevel(buffer, callback) {
  return zlib.gzip(buffer, { level: 9 }, callback);
}
