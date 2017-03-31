// webpack.config.js
var webpack = require('webpack');

module.exports = {

    entry: {
        'main': './src/main/page.js',
        'login': './src/login/page.js'
    },

    output: {
        path: 'src/__build__/',
        filename: '[name].js',
        publicPath: '/__build__/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
    },

    resolve: {
        // 现在可以写 require('file') 代替 require('file.examples')
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};