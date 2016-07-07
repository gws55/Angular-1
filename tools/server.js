var browserSync = require('browser-sync');

browserSync({
  server: '.',
  port: 3000,
  files: [
    './src/**/*.html',
    './src/**/*.js'
  ]
});
