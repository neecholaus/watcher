const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "index.js"
    },
    module: {
        rules: [
            {test: /\.vue$/, loader:'vue-loader'},
            {test: /\.css$/, loader:['style-laoder','css-loader']}
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}