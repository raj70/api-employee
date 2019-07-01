const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const auth_Service = {
    entry: {
        auth_service: ['@babel/polyfill', './src/authentication_service/server.ts']
    },
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: [nodeExternals()],
    output: {
        /* this name is coming from entry, above (server). the file will be named auth_service.js*/
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    target: 'node',
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ]
};

const emp_Service = {
    entry: {
        employee_service: ['@babel/polyfill', './src/employee_service/server.ts']
    },
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: [nodeExternals()],
    output: {
        /* this name is coming from entry, above (server) */
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    target: 'node',
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ]
};

module.exports = [auth_Service, emp_Service];