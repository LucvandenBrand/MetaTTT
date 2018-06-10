const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    target: 'web',
    entry: './src/app/main.js',
    output: {
        filename: 'metaTTT.js',
        path: path.resolve(__dirname, 'pack')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/views/main.html'
        }),
        new ExtractTextPlugin('style.css')
    ]
};