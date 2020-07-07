module.exports = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.scss$/,
                include: paths,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }]
        }
    }
};