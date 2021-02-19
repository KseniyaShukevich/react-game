const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry: {
        app: './index.tsx'
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 9000,
    //     open: true,
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 8000,
        //     openAnalyzer: false
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader',
                  'sass-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
}