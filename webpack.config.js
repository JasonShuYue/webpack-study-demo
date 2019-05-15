const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 使用html模板

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: '8080',
        host: 'localhost'
    }

}
