const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        port: 4800
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: [nodeExternals()],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    target: 'node',
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ]
};