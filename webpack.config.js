const TerserJSPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: {
    'app': 'src'
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/generated/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:7]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.svg$|\.png$|\.jpe?g$|\.gif$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const info = pathData.module.resourceResolveData;
            const format = path.extname(info.path).split('.').pop()

            return `res/${format}/[name].[hash][ext]`
          }
        }
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const info = pathData.module.resourceResolveData;
            const format = path.extname(info.path).split('.').pop()

            return `res/${format}/[name][ext]`
          }
        }
      },
    ],
  },

  target: 'web',
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  performance: {
    hints: false,
  },
  optimization: {
    runtimeChunk: {
      name: 'commons',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          output: { comments: false },
          compress: { drop_console: true },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
  ],
}