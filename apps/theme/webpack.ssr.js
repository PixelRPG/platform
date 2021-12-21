require('dotenv').config({ path: '../nest/.env' });
const ribaWebpackConfig = require("@ribajs/webpack-config");
const { resolve } = require("path");

const source = resolve(__dirname);
const tsSourceDir = resolve(source, "scripts/ssr");
const assets = resolve(source, "assets");
const outputPath = resolve(assets, "ssr");
const tsIndexPath = resolve(tsSourceDir, "index.ts");

const config = {
  template: "ssr",
  tsSourceDir,
  tsIndexPath,
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
  },
  define: {
    STRAPI_REMOTE_URL: JSON.stringify(process.env.STRAPI_REMOTE_URL),
    STRAPI_LOCAL_URL: JSON.stringify(process.env.STRAPI_LOCAL_URL),
    STRAPI_GRAPHQL_PATH: JSON.stringify(process.env.STRAPI_GRAPHQL_PATH),
    STRAPI_API_TOKEN: JSON.stringify(process.env.STRAPI_API_TOKEN),
    BACKEND_REMOTE_URL: JSON.stringify(process.env.BACKEND_REMOTE_URL),
    BACKEND_LOCAL_URL: JSON.stringify(process.env.BACKEND_LOCAL_URL),
  }
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;
