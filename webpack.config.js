const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
// const sass = require('./webpack/sass');
// const css = require('./webpack/css');
// const extractCSS = require('./webpack/css.extract');
// const images = require('./webpack/images');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = Object.assign({}, {
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
    pug()
);

module.exports = function(env) {
    if (env === 'production') {
        return Object.assign({},
            common, { mode: 'development' }
        );
    }
    if (env === 'development') {
        return Object.assign({},
            common,
            devserver()
        );
    }
}