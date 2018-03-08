var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InlineSvgPlugin = require('inline-svg-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var TARGET = process.env.npm_lifecycle_event;

var extractLESS = new ExtractTextPlugin({
    filename: '../dist/css/style.css',
    allChunks: true
});
var extractHTML = new ExtractTextPlugin({
    allChunks: true
});

module.exports = {
    context: __dirname,
    entry: "./index",
    output: {
        path: __dirname + "/dist",
        filename: "js/bundle.js",
        // publicPath: '../dist/'
    },
    module: {
        loaders: [
            {
                test: /\.less$/i,
                use: extractLESS.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: TARGET === 'build'
                            }
                        },
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
                    // 'html-loader?minimize=true',
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
    ]
};