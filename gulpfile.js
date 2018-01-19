/* eslint-disable no-shadow, no-console, consistent-return */

const path = require('path');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const selenium = require('selenium-standalone');
const express = require('express');

gulp.task('selenium', (done) => {
  selenium.install((err) => {
    if (err) { return done(err); }
    selenium.start((err, child) => {
      if (err) { return done(err); }
      setTimeout(() => {
        selenium.child = child;
        done();
      }, 1000);
    });
  });
});

gulp.task('default', ['selenium'], () => (
  gulp.src('src/runner.js')
    .pipe(mocha())
    .on('error', (err) => {
      console.log(err);
      selenium.child.kill();
    })
    .once('end', () => selenium.child.kill())
));

gulp.task('test', ['selenium'], () => {
  const server = express();
  server.use(express.static(path.resolve(__dirname, 'mock')));
  server.listen(3000);

  return gulp.src('src/__tests__/*.spec.js')
    .pipe(mocha())
    .on('error', (err) => {
      console.log(err);
      selenium.child.kill();
    })
    .once('end', () => {
      selenium.child.kill();
      process.exit(0);
    });
});
