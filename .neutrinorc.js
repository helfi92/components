const { join } = require('path');

require('babel-register')({
  plugins: [
    [require.resolve('babel-plugin-transform-es2015-modules-commonjs'), {
      useBuiltIns: true
    }],
    require.resolve('babel-plugin-transform-object-rest-spread'),
  ],
  cache: false,
});

const theme = require('./src/theme').default;

module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/styleguide', {
      components: 'src/components/**/index.jsx',
      theme: theme.styleguide,
      styleguideComponents: {
        Wrapper: join(__dirname, 'src/styleguide/ThemeWrapper.jsx'),
        StyleGuideRenderer: join(__dirname, 'src/styleguide/StyleGuideRenderer.jsx'),
      },
    }],
    (neutrino) => {
      if (neutrino.options.command === 'start') {
        neutrino.config.module.rules.delete('lint');
      }
    },
    ['neutrino-preset-mozilla-frontend-infra/react-components', {
      style: {
        extract: false,
      },
      eslint: {
        rules: {
          // This has been set in the latest Airbnb preset, but has not been
          // released yet.
          'react/no-did-mount-set-state': 'off',
        }
      },
    }],
  ],
};
