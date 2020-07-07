const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const sourceMapLoader = require('./webpack/source-map-loader');
const fileLoader = require('./webpack/fileloader');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([{
        entry: {
            index: PATHS.src + '/index/index.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.src + '/index/index.pug'
            })
        ]
    }, {
        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 1,
                minChunks: 2
            }
        }
    },
    pug(),
    fileLoader(),
    sourceMapLoader(),
]);

module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            { mode: 'development' }
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            extractCSS(),
            // sass(),
            // css()
        ]);
    }
}