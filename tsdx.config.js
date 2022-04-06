const images = require('@rollup/plugin-image');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      images({ incude: ['**/*.png'] }),
      ...config.plugins,
    ]

    return config
  },
}