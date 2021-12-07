// import { renderSync } from "sass";
// import type { Options } from "sass";

const bootstrapPath = require.resolve('bootstrap/scss/bootstrap.scss');
const bootstrapDarkPath = require.resolve('bootstrap-dark/scss/bootstrap-dark.scss');

// const options: Options = {
//     includePaths: []
// }

// renderSync(options)

console.debug("bootstrapPath", bootstrapPath);
console.debug("bootstrapDarkPath", bootstrapDarkPath);