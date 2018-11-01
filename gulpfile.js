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
  const app = express();
  app.use(express.static(path.resolve(__dirname, 'test/test-pages')));
  const server = app.listen(3000);

  return gulp.src('test/*.spec.js')
    .pipe(mocha())
    .on('error', (err) => {
      console.log(err);
      selenium.child.kill();
    })
    .once('end', () => {
      selenium.child.kill();
      server.close();
    });
}

gulp.task('run', gulp.series(startSelenium, run));
gulp.task('test', gulp.series(startSelenium, test));
