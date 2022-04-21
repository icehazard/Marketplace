const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		fallback: {
            url: require.resolve('url/'),
			crypto: require.resolve('crypto-browserify'),
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
						hotReload: !prod
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

	],
	devtool: prod ? false : 'source-map',
	stats: 'errors-warnings',
	devServer: {
		hot: true,
		client: {
			logging: 'warn',
		},
	},
};
