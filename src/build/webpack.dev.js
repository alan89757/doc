const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/main.tsx"
    // app: "./src/reducer/index.tsx" // useReducer专用
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 8010
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader:  "css-loader",
            options: {
              modules: {
                localIdentName: '[path][name]__[local]'
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".js", ".json", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../../src/template/index.html")
    })
  ]
}