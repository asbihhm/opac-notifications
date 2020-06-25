/* eslint-disable no-console */

const { IncomingWebhook } = require('@slack/webhook');
const OPACDriver = require('./OPACDriver.js');
const buildMessage = require('./buildMessage.js');

const Config = require('../Config.js');

const webhook = new IncomingWebhook(Config.slack.url);
const errorMessage = 'error occurred';

async function runner(user, idx) {
  let shelf;
  const d = new OPACDriver(user);

  console.log(`Start: ${user.name || idx}`);

  await d.build();
  await d.getUrl();
  await d.login();
  await d.toStatusPage();
  await d.getShelf().then((s) => {
    shelf = s;
  });
  await d.logout();
  await d.quit();

  const message = shelf ? buildMessage(shelf, user) : errorMessage;
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
    return;
  }
  await webhook.send(message);
}

(async () => {
  await Promise.all(Config.users.map((user, idx) => runner(user, idx)));
})();
