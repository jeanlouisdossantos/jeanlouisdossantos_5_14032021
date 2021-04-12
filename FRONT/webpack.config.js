const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const onbuildplugin = require("on-build-webpack");
const {exec} = require("child_process");
const webpack = require("webpack");
const HookShellScriptPlugin  = require('hook-shell-script-webpack-plugin')



module.exports = (env) => {
  console.log(env);
  return {
    mode: env.mode,
    entry:{ index : "./src/js/index.js",
            product : "./src/js/product.js",
            cart : "./src/js/cart.js"},
    plugins: [
      new HtmlWebpackPlugin({
        title: "Orinoco, site de vente en ligne",
        template: "src/views/template.html",
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        title: "produit",
        template: "src/views/template_produit.html",
        filename: "product.html",
        chunks: ['product']
      }),
      new HtmlWebpackPlugin({
        title: "Panier",
        template: "src/views/template_panier.html",
        filename: "panier.html",
        chunks: ['cart']
      }),
      new webpack.DefinePlugin({
        backendurl : JSON.stringify("http://localhost:3000/api/teddies/"),
        backupbackendurl : JSON.stringify("http://localhost:3000/api/teddies/"),
        // backupbackendurl : JSON.stringify("https://ab-p5-api.herokuapp.com/api/teddies")
      }),
      new HookShellScriptPlugin({
        afterEmit: ['npm run css']
      })
      
    ],
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          use: ["style-loader","css-loader","sass-loader", ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {loader: 'url-loader'}
          ]
        },

        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
