// import image from '@rollup/plugin-image';
const images = require('@rollup/plugin-image');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      images({ incude: ['./assets/safepay-logo-blue.png','./assets/safepay-logo-dark.png','./assets/safepay-logo-white.png'] }),
      ...config.plugins,
    ]

    return config
  },
}