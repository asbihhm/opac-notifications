/* eslint-disable no-shadow, no-console, consistent-return */

const path = require('path');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const selenium = require('selenium-standalone');
const express = require('express');

function startSelenium(done) {
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
}

function run() {
  return gulp.src('src/runner.js')
    .pipe(mocha())
    .on('error', (err) => {
      console.log(err);
      selenium.child.kill();
    })
    .once('end', () => { selenium.child.kill(); });
}

function test() {
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
}

gulp.task('run', gulp.series(startSelenium, run));
gulp.task('test', gulp.series(startSelenium, test));
