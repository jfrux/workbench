const path = require('path');

const webpack = require('webpack');
const Copy = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = [
  {
    name: 'workbench',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './lib/index.js',
    output: {
      path: path.join(__dirname, 'app', 'renderer'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                // Here, we include babel plugins that are only required for the
                // renderer process. The 'transform-*' plugins must be included
                // before react-hot-loader/babel
                'transform-class-properties',
                'transform-es2015-classes',
                'react-hot-loader/babel'
              ]
            }
          }
        },
        {
          test: /\.yaml$/,
          use: 'js-yaml-loader',
        },
        {
          test: /\.global\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /^((?!\.global).)*\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          ]
        },
        // SASS support - compile all .global.scss files and pipe it to style.css
        {
          test: /\.global\.(scss|sass)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        // SASS support - compile all other .scss files and pipe it to style.css
        {
          test: /^((?!\.global).)*\.(scss|sass)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        // WOFF Font
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        },
        // WOFF2 Font
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        },
        // TTF Font
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream'
            }
          }
        },
        // EOT Font
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: 'file-loader'
        },
        // SVG Font
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml'
            }
          }
        },
        // Common Image Formats
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/.*\.js.map$/i),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv)
        }
      }),
      new Copy([
        {
          from: './assets',
          to: './assets'
        }
      ])
    ],
    target: 'electron'
  },
  {
    name: 'workbench-cli',
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    devtool: isProd ? 'none' : 'cheap-module-source-map',
    entry: './cli/index.js',
    output: {
      path: path.join(__dirname, 'bin'),
      filename: 'cli.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /index.js/,
          loader: 'shebang-loader',
          include: [/node_modules\/rc/]
        }
      ]
    },
    plugins: [
      // spawn-sync is required by execa if node <= 0.10
      new webpack.IgnorePlugin(/(.*\.js.map|spawn-sync)$/i),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      })
    ],
    target: 'node'
  }
];
