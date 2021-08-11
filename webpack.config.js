const { resolve } = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const UglifyjWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
	mode:"production",
	target:"web",
  entry:{
		popup:resolve(__dirname,'src/js/popup.js'),
		content_script:resolve(__dirname,'src/js/content_script.js'),
		background:resolve(__dirname,'src/js/background.js'),
	},
	module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      }
    ]
  },
	plugins:[
		new HtmlWebpackPlugin({
      filename: "page/popup.html",
      template: resolve(__dirname, "src/page/popup.html"),
      chunks: ["popup"]
    }),
		new MiniCssExtractPlugin({
			filename:"css/[name].css"
		}),
		new CopyPlugin({
			patterns:[{
				from:resolve(__dirname,'src/manifest.json'),
				to:resolve(__dirname,'dist')
			},{
				from:resolve(__dirname,'src/icons'),
				to:resolve(__dirname,'dist/icons')
			},{
				from:resolve(__dirname,'src/js/jquery.js'),
				to:resolve(__dirname,'dist/js/jquery.js')
			}]
		}),
	],
	optimization: {
		minimize: true,
		providedExports: true,
		usedExports: true,
		removeEmptyChunks: true,
		minimizer: [
			new UglifyjWebpackPlugin({
				sourceMap: false,
			}),
		],
		splitChunks: {
			maxSize: 20 * 1024,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true,
				},
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2,
				},
			},
		},
	},
	output:{
		path:resolve(__dirname,'dist'),
		filename:'js/[name].js',
		publicPath: "/",
    clean: true
	}
}