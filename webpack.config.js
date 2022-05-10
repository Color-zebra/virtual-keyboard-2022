const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = (env, options) => {

	const config = {
		mode: 'development',
		entry: './task/pages/js.js',
		watch: true,
		output: {
			path: path.join(__dirname, './dist'),
			filename: 'script.js',
		},
		devtool: 'source-map',
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: 'styles.css',

			}),
			new HtmlWebpackPlugin(),
		],
		module: {
			rules: [
					{
						test: /\.scss$/,
						use: [
						MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
						],
					},
			]
		}
	}

	return config
}