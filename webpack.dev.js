const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    devtool: 'inline-source-map'
});