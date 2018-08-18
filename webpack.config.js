var path = require('path')

module.exports = {
    entry:{
        'entry':path.resolve(__dirname, './src/entry.ts'),
        'task.worker':path.resolve(__dirname, './src/task.worker.ts'),
        
        'app':path.resolve(__dirname, './src/app.ts'),
        '_task.worker':path.resolve(__dirname, './src/_task.worker.ts')
    },
    output:{
        path: path.resolve(__dirname, './dist'),
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
            }
        ]
    },
    resolve:{
        "extensions":['.js','.css','.ts']
    }
}