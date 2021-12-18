require('dotenv').config({ path: '../backend/.env' });
const ribaWebpackConfig = require("@ribajs/webpack-config");
const { resolve } = require("path");

const source = resolve(__dirname);
const tsSourceDir = resolve(source, "scripts/csr");
const assets = resolve(source, "assets");
const outputPath = resolve(assets, "csr");
const scssSourceDir = resolve(source, "styles");
const tsIndexPath = resolve(tsSourceDir, "index.ts");
const scssIndexPath = resolve(scssSourceDir, "main.scss");

const config = {
  template: "local",
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: assets,
  },
  tsSourceDir,
  scssSourceDir,
  tsIndexPath,
  scssIndexPath,
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
  },
  styles: {
    build: true,
    extract: true,
    resolveUrl: "onlyImports",
  },
  define: {
    STRAPI_REMOTE_URL: JSON.stringify(process.env.STRAPI_REMOTE_URL),
    STRAPI_LOCAL_URL: JSON.stringify(process.env.STRAPI_LOCAL_URL),
    STRAPI_GRAPHQL_PATH: JSON.stringify(process.env.STRAPI_GRAPHQL_PATH),
    // Do not use the backend api token in CSR
    // STRAPI_API_TOKEN: JSON.stringify(process.env.STRAPI_API_TOKEN),
    BACKEND_REMOTE_URL: JSON.stringify(process.env.BACKEND_REMOTE_URL),
    BACKEND_LOCAL_URL: JSON.stringify(process.env.BACKEND_LOCAL_URL),
  }
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;
