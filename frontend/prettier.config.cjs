/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-astro', '@ianvs/prettier-plugin-sort-imports'],
  semi: false,
  singleQuote: true,
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
