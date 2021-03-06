module.exports = {
    mode: 'development',
    entry: {
        portfolio: './src/js/apps/Portfolio/Portfolio.js',
        watcher: './src/js/apps/Watcher/Watcher.js'
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        {
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    ]
                }
            },
            {
                test: /\.s?css$/, 
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}