const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*creamos un modulo con la configuración de los elementos que necesitamos*/
module.exports = {
    entry: './src/index.js',/*indicamos el archivo de entrada*/
    output: {/*indicamos donde se guardaran los archivos resultantes cuando compile*/ 
        path: path.resolve(__dirname, 'dist'),/*resolve detecta la carpeta donde nos encontramos y pasarle un lugar para guardar los archivos*/
        filename: 'bundle.js'/*para ponerle nombre al archivo principal*/
    },
    resolve:    {
        extensions: ['.js', '.jsx']/*este elemento es para resolver las entensiones del proyecto*/
    },
    /*ahora crearemos un módulo con las reglas   necesarias para nuestro proyecto*/
    /*en este caso es la identificación de los archivos JS y JSX*/
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,/*expresión regular para identificarlos*/
                exclude: /node_modules/,/*exclución de la carpeta node_modules*/
                use: {/*hora de usar el loader para usar babel*/
                    loader: "babel-loader"
                }
            },
            /*ahora creamos la regla para trabajar con los archivos de html*/
            /*nuevamente creamos ese test con la expresión regular para html*/
            /*esta vez no excluimos nada sino que vamos a usar el loader que instalamos*/
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(s*)css$/,//regla que identifica los archivos scss o css
                use: [{
                    //para pasarle los elementos de loader
                    loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            //esta regla es para tratar archivos multimedia 
            {
              test:  /\.(png|jpe?g|gif)$/i,
              use: [
                {
                  'loader': 'file-loader',
                  options: {
                      name:'assets/[hash].[ext]'
                  }
                }
              ]
            }
        ]
    },
    /*finalmente añadimos los plugins que necesitamos*/
    /*creamos una nueva referencia al html webpack plugin, al cual le pasamos un objeto con la configuración necesaria (ubicación del template y filename que va a tener)*/ 
    plugins: [
        new HtmlWebPackPlugin({
            template:'./public/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({
              filename: 'assets/[name].css'//el primer parámetro es como se llama el archivo resultante
        }),
    ]
};
/*por último en package.json creamos el script que compilará nuestro proyecto
"build": "wenpack --mode production",
luego corremos el compilado desde la terminal
*/