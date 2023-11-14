/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-astro'],
  semi: false,
  singleQuote: true,
  astroAllowShorthand: false,
  trailingComma: 'all',
  importOrder: ['^@', '^[a-zA-Z0-9-]+', '^[./]'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
