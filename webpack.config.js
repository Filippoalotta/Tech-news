const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      outputPath: 'images', // Cartella di output per le immagini
                    },
                  },
                ],
            }
        ]
    }
};