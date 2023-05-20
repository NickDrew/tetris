const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader:'ts-loader',
            options: {
                transpileOnly:true,
                compilerOptions: {
                    noEmit: false,
                },
            },
        }
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            }
          ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
  },
};
