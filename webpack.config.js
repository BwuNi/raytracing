var path = require('path')
var webpack = require('webpack')

module.exports = {
    // entry:'./entry.js',
    
    entry:{
        'entry':path.resolve(__dirname, './src/entry.js'),
        // 'app':path.resolve(__dirname, './src/app.ts'),
        'worker':path.resolve(__dirname, './src/worker.js')
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        // publicPath: process.env.NODE_ENV === 'production' ? './dist/' : '/dist/',
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: 'chunk/[id]_[chunkhash:8].chunk.js'
    },
	devServer:{
        port: 8888,
    },
    devtool:"source-map",
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    resolve:{
        "extensions":['.js','.css','.ts']
    }
}