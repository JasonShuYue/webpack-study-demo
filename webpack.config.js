const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 使用html模板


const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 用于压缩JS

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 用于分离CSS

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
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            plugins: [
                                [require("@babel/plugin-proposal-decorators"), { "legacy": true }]
                            ]
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
        ],

    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: 4,
            }),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/hello.css'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: '8080',
        host: 'localhost'
    },

}
