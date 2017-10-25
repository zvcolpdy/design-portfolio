var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InlineSvgPlugin = require('inline-svg-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

var extractLESS = new ExtractTextPlugin({
    filename: '../dist/css/style.css',
    allChunks: true,
});
var extractHTML = new ExtractTextPlugin({
    allChunks: true,
})

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: __dirname,
        entry: "./index",
    output: {
        path: __dirname + "/dist",
        filename: "js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    cacheDirectory: true,
                    presets: ['es2017']
                }
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract({
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        'less-loader',
                    ]
                })
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                options: {
                    limit: 10485760,
                    mimetype: 'image/svg+xml'
                }
            },
            {
                test: /\.html$/,
                use: [
                    'file-loader?name=../dist/[name].[ext]',
                    'extract-loader',
                    // 'html-loader?minimize=true'
                    'html-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=../dist/img/[name].[ext]',
            }
        ]
    },
    plugins: [
        extractLESS,
        extractHTML,
        new InlineSvgPlugin({
            test: /\.html$/
        })
    ],
}