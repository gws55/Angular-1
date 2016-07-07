var browserSync = require('browser-sync');

browserSync({
  server: {
    baseDir: ".",
    directory: true
    // index: "src/index.html#/"
  },
  port: 3000,
  files: [
    './src/**/*.html',
    './src/**/*.js'
  ]
});
