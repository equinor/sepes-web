// babel.config.js
module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
    ignore: ['/node_modules/'],
    babel: { presets: ['react', 'es2015'] }
};
