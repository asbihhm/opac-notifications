/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const buildMessage = require('../src/buildMessage.js');

const user = {
  id: 'foo',
  pass: 'bar',
};

describe('buildMessage', () => {
  it(".attachments should has 2 items when shelf doesn't have alert items", () => {
    const shelf = {
      onLoan: [{ alert: false, text: 'abc' }],
      hold: [{ alert: false, text: 'def' }],
    };
    expect(buildMessage(shelf, user).attachments.length).to.equal(2);
  });

  it(".attachments should be an empty array when shelf doesn't have any items", () => {
    const shelf = {
      onLoan: [],
      hold: [],
    };
    const { attachments } = buildMessage(shelf, user);
    expect(attachments.length).to.equal(0);
  });

  it('.attachments WARNING should exist when shelf.onLoan has alert items', () => {
    const shelf = {
      onLoan: [{ alert: true, text: 'abc' }],
      hold: [{ alert: false, text: 'def' }],
    };
    const { attachments } = buildMessage(shelf, user);
    expect(attachments.length).to.equal(2);
    expect(attachments[0].title).to.equal('WARNING');
    expect(attachments[0].text).includes('abc');
    expect(attachments[1].title).to.equal('HOLD');
    expect(attachments[1].text).includes('def');
  });

  it('.attachments NOTICE should exist when shelf.hold has alert items', () => {
    const shelf = {
      onLoan: [{ alert: false, text: 'abc' }],
      hold: [{ alert: true, text: 'def' }],
    };
    const { attachments } = buildMessage(shelf, user);
    expect(attachments.length).to.equal(2);
    expect(attachments[0].title).to.equal('NOTICE');
    expect(attachments[0].text).includes('def');
    expect(attachments[1].title).to.equal('ON LOAN');
    expect(attachments[1].text).includes('abc');
  });
});
