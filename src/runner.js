/* eslint-disable no-console */

const os = require('os');
const fs = require('fs');
const path = require('path');
const { IncomingWebhook } = require('@slack/webhook');
const OPACDriver = require('./OPACDriver.js');
const buildMessage = require('./buildMessage.js');

exports.run = () => {
  let configHomePath = process.env.XDG_CONFIG_HOME;
  if (!configHomePath) {
    const homedir = os.homedir();
    if (!homedir) throw new Error("Couldn't locate a home directory");

    configHomePath = path.join(homedir, '.config');
  }

  const configPath = path.join(
    configHomePath,
    'opac-notifications',
    'config.json',
  );

  fs.readFile(configPath, async (err, configRaw) => {
    if (err) throw err;

    let config;
    try {
      config = JSON.parse(configRaw);
    } catch (e) {
      throw new Error(`Failed to parse ${configPath}`);
    }

    const slackURL = config.slack?.url;
    if (!slackURL) {
      throw new Error("Missing 'slack.url'");
    }

    const { users } = config;
    if (!Array.isArray(users)) {
      throw new Error("Invalid type of 'users'");
    }

    const webhook = new IncomingWebhook(slackURL);

    const runDriver = async (user, idx) => {
      let shelf;

      const d = new OPACDriver(user);
      await d.build();
      await d.getUrl();
      await d.login();
      await d.toStatusPage();
      await d.getShelf().then((s) => {
        shelf = s;
      });
      await d.logout();
      await d.quit();

      const message = shelf ? buildMessage(shelf, user) : 'error occurred';
      if (process.env.NODE_ENV === 'development') {
        console.log(`Result(${user.name || idx}):`);
        console.log(message);
        return;
      }
      await webhook.send(message);
    };

    await users.reduce((past, user, idx) => {
      if (!user.id || !user.pass) {
        console.error(
          `Missing 'users[${idx}].id' or 'users[${idx}].pass', Skip`,
        );
        return Promise.resolve();
      }
      return past.then(() => runDriver(user, idx));
    }, Promise.resolve());
  });
};
