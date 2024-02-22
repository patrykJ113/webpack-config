module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'prefers-color-scheme-query': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    }),
  ],
};