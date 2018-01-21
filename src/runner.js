/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { IncomingWebhook } = require('@slack/client');
const OPACDriver = require('./OPACDriver.js');
const buildMessage = require('./buildMessage.js');
const Config = require('../Config.js');

describe('opac page', function runner() {
  this.timeout(150000);

  const webhook = new IncomingWebhook(Config.slack.url);
  const errorMessage = 'error occurred';

  Config.users.forEach((user, idx) => {
    let shelf;
    const d = new OPACDriver(user);
    const userName = user.name || idx;

    it(`build driver: ${userName}`, async () => {
      await d.build();
    });

    it(`get status: ${userName}`, async () => {
      await d.getUrl();
      await d.login();
      await d.toStatusPage();
      await d.getShelf().then((s) => { shelf = s; });
      await d.logout();
    });

    it(`quit driver: ${userName}`, async () => {
      await d.quit();
    });

    it(`send to slack: ${userName}`, (done) => {
      const message = shelf ? buildMessage(shelf, user) : errorMessage;
      if (message.attachments.length > 2 || message === errorMessage) {
        webhook.send(message, (err, res) => {
          expect(err).to.be.null;
          expect(res).to.not.be.null;
          done();
        });
      } else {
        done();
      }
    });
  });
});
