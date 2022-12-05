import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import preprocess from 'svelte-preprocess';
import config from "./src/config.js";

const dirname = new URL('./', import.meta.url).pathname;
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

export default {
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		alias: {
			'@': `${dirname}src/`,
			"#": `${dirname}src/components`,
			'%': `${dirname}src/components/atoms`,
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: `${dirname}public/dist/`,
		filename: '[name].js',
		chunkFilename: '[name].js',
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
				target: `http://${config.API_URL}:9000`,
			},
		},
	},
};
