'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const selenium = require('selenium-standalone');

gulp.task('selenium', done => {
  selenium.install(err => {
    if (err) { return done(err); }
    /* eslint-disable  no-shadow */
    selenium.start((err, child) => {
      if (err) { return done(err); }
      setTimeout(() => {
        selenium.child = child;
        done();
      }, 1000);
    });
    /* eslint-enable  no-shadow */
  });
});

gulp.task('default', ['selenium'], () => {
  return gulp.src('notifications.js')
    .pipe(mocha({
      require: ['babel-polyfill'],
      compilers: 'js:babel-register'
    }))
    .on('error', err => {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-enable no-console */
      selenium.child.kill();
    })
    .once('end', () => selenium.child.kill());
});
