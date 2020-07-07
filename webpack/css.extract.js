const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(paths) {
    return {
        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/[name].css',
            }),
        ],
        module: {
            rules: [{
                    test: /\.scss$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            },
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                    ],
                }
            ]
        }
    };
}