var browserSync = require('browser-sync');

browserSync({
  server: {
    baseDir: ".",
    directory: true
  },
  port: 3000,
  files: [
    './src/**/*.html',
    './src/**/*.js'
  ]
});
