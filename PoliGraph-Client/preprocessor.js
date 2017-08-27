const tsc = require('typescript');
const tsConfig = require('./tsconfig.json');

/* Used to enable testing of typescript code */

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      console.log(src,path)
      return tsc.transpile(src, tsConfig.compilerOptions, path, []);
    }
    return src;
  },
};
