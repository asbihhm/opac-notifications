/* eslint-disable no-unused-expressions, func-names */

const { expect } = require('chai');
const sinon = require('sinon');
const OPACDriver = require('../src/OPACDriver.js');

const user = {
  id: 'foo',
  pass: 'bar',
};

describe('getShelf', () => {
  const options = {
    headless: true,
    driverBin: process.env.OPAC_DRIVER_BIN,
    chromeBin: process.env.OPAC_CHROME_BIN,
  };

  describe('onLoan', function () {
    this.timeout(150000);

    let d;
    let clock;

    beforeEach(async () => {
      d = new OPACDriver(user);
      await d.build(options);
      await d.getUrl('http://localhost:3000/on-loan.html');
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
      d = new OPACDriver(user);
      await d.build(options);
      await d.getUrl('http://localhost:3000/hold.html');
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
      d = new OPACDriver(user);
      await d.build(options);
      await d.getUrl('http://localhost:3000/on-loan-and-hold.html');
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
