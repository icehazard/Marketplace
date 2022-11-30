import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import preprocess from 'svelte-preprocess';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

export default {
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		alias: {
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
				test: /\.(svg|jpg|jpeg|png)$/i,
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
				target: 'http://' + "127.0.0.1:9000",
			},
		},
	},
};
