const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const onbuildplugin = require("on-build-webpack");
const {exec} = require("child_process");
const webpack = require("webpack");


module.exports = (env) => {
  console.log(env);
  return {
    mode: env.mode,
    entry: "./src/js/index.js",
    plugins: [
      new HtmlWebpackPlugin({
        title: "Orinoco, site de vente en ligne",
        template: "src/views/template.html",
      }),
      new HtmlWebpackPlugin({
        title: "produit",
        template: "src/views/template_produit.html",
        filename: "product.html"
      }
      
      ),
      new webpack.DefinePlugin({
        backendurl : JSON.stringify("http://localhost:3000/api/teddies/")
      })
      
    ],
    output: {
      filename: "bundle.js",
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
