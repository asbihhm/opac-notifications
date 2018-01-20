/* eslint-disable no-unused-expressions, func-names */

const { expect } = require('chai');
const sinon = require('sinon');
const OPACDriver = require('../OPACDriver.js');

const user = {
  id: 'foo',
  pass: 'bar',
};

describe('getShelf', () => {
  describe('hold', function () {
    this.timeout(150000);

    let d;
    let clock;

    beforeEach(async () => {
      d = new OPACDriver(user, {
        url: 'http://localhost:3000/hold.html',
      });
      await d.getUrl();
      clock = sinon.useFakeTimers(new Date('2018-01-10'));
    });

    afterEach(async () => {
      await d.quit();
      clock.restore();
    });

    it('should be false, .onLoan[0].alert', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.onLoan[0].alert).to.be.false;
      });
    });
  });

  describe('warn-and-notice', function () {
    this.timeout(150000);

    let d;
    let clock;

    beforeEach(async () => {
      d = new OPACDriver(user, {
        url: 'http://localhost:3000/warn-and-notice.html',
      });
      await d.getUrl();
      clock = sinon.useFakeTimers(new Date('2018-01-18'));
    });

    afterEach(async () => {
      await d.quit();
      clock.restore();
    });

    it('shold be true, onLoan[0].alert', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.onLoan[0].alert).to.be.true;
      });
    });

    it('shold be false, onLoan[1].alert', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.onLoan[1].alert).to.be.false;
      });
    });

    it('shold be false, hold[0].alert', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.hold[0].alert).to.be.false;
      });
    });

    it('shold be true, hold[2].alert', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.hold[2].alert).to.be.true;
      });
    });
  });
});
