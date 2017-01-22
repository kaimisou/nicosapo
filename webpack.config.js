const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        background: "./src/javascripts/background.js",
        content: "./src/javascripts/content.js",
        popup: "./src/javascripts/popup.js",
        options: "./src/javascripts/options.js"
    },
    output: {
        path: './dist/assets/javascripts',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                exclude: /node_modules/,
                test: /\.js[x]?$/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
      new CopyWebpackPlugin([
        // {output}/file.txt
        { from: 'src/html', to: '../html' },
        { from: 'src/images', to: '../images' },
        { from: 'src/octicons', to: '../octicons' },
        { from: 'src/sounds', to: '../sounds' },
        { from: 'src/stylesheets', to: '../stylesheets' }
      ])
    ],
    devtool: 'source-map'
};