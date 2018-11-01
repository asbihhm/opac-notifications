/* eslint-disable no-unused-expressions, func-names */

const { expect } = require('chai');
const sinon = require('sinon');
const OPACDriver = require('../src/OPACDriver.js');

const user = {
  id: 'foo',
  pass: 'bar',
};

describe('getShelf', () => {
  describe('onLoan', function () {
    this.timeout(150000);

    let d;
    let clock;

    beforeEach(async () => {
      d = new OPACDriver(user, {
        url: 'http://localhost:3000/on-loan.html',
      });
      await d.build();
      await d.getUrl();
      clock = sinon.useFakeTimers(new Date('2018-01-10'));
    });

    afterEach(async () => {
      await d.quit();
      clock.restore();
    });

    it('.onLoan[0].alert should be false', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.onLoan[0].alert).to.be.false;
      });
    });
  });

  describe('hold', function () {
    this.timeout(150000);

    let d;

    beforeEach(async () => {
      d = new OPACDriver(user, {
        url: 'http://localhost:3000/hold.html',
      });
      await d.build();
      await d.getUrl();
    });

    afterEach(async () => {
      await d.quit();
    });

    it('.hold[0].alert should be true', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.hold[0].alert).to.be.true;
      });
    });
  });

  describe('onLoan and hold', function () {
    this.timeout(150000);

    let d;
    let clock;

    beforeEach(async () => {
      d = new OPACDriver(user, {
        url: 'http://localhost:3000/on-loan-and-hold.html',
      });
      await d.build();
      await d.getUrl();
      clock = sinon.useFakeTimers(new Date('2018-01-18'));
    });

    afterEach(async () => {
      await d.quit();
      clock.restore();
    });

    it('.onLoan[0].alert should be true', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.onLoan[0].alert).to.be.true;
      });
    });

    it('.onLoan[1].alert should be false', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.onLoan[1].alert).to.be.false;
      });
    });

    it('.hold[0].alert should be false', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.hold[0].alert).to.be.false;
      });
    });

    it('.hold[2].alert should be true', async () => {
      await d.getShelf().then((shelf) => {
        expect(shelf.hold[2].alert).to.be.true;
      });
    });
  });
});