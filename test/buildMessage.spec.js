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

  it('.attachments WARNING should exist when shelf.onLoan has alert items', () => {
    const shelf = {
      onLoan: [{ alert: true, text: 'abc' }],
      hold: [{ alert: false, text: 'def' }],
    };
    const { attachments } = buildMessage(shelf, user);
    expect(attachments.length).to.equal(3);
    expect(attachments[0].title).to.equal('WARNING');
  });

  it('.attachments NOTICE should exist when shelf.hold has alert items', () => {
    const shelf = {
      onLoan: [{ alert: false, text: 'abc' }],
      hold: [{ alert: true, text: 'def' }],
    };
    const { attachments } = buildMessage(shelf, user);
    expect(attachments.length).to.equal(3);
    expect(attachments[0].title).to.equal('NOTICE');
  });
});
