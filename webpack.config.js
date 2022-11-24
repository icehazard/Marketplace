const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const preprocess = require("svelte-preprocess")
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const { API_URL } = require('./src/server/Config.json')

module.exports = {
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		fallback: {
			url: require.resolve('url/'),
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
			http: require.resolve('stream-http'),
			os: require.resolve('os-browserify/browser'),
			https: require.resolve('https-browserify'),
			path: require.resolve('path-browserify'),
		},
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json')),
			'@': path.resolve(__dirname, 'src/'),
			comp: path.resolve(__dirname, 'src/components/'),
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js',
		assetModuleFilename: '[name][ext]'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
						preprocess: preprocess()
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				},
			},
			{
				test: /\.(svg|jpg|jpeg)$/i,
				type: 'asset/resource'
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new NodePolyfillPlugin()

	],
	devtool: prod ? false : 'source-map',
	stats: 'errors-warnings',
	devServer: {
		historyApiFallback: {
			index: 'index.html'
		},
		hot: true,
		client: {
			logging: 'warn',
			overlay: {
				errors: true,
				warnings: false,
			},
		},

		proxy: {
			'/api': {
				target: 'http://' + API_URL,
			},
		},
	},
};
