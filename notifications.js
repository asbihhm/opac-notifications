import test from 'selenium-webdriver/testing';
import assert from 'assert';
import {IncomingWebhook} from '@slack/client';
import OPACDriver from './OPACDriver.js';
import Config from './Config.js';

function buildAttachments(shelf, type, obj) {
  return shelf[type].reduce((atta, book) => {
    if (book.alert) {
      if (type === 'onLoan') {
        atta.warning.text += book.text + '\n';
      } else if (type === 'hold') {
        atta.notice.text += book.text + '\n';
      }
    } else {
      atta[type].text += book.text + '\n';
    }
    return atta;
  }, obj);
}

function toArrayAttachments(obj) {
  const attachments = [obj.onLoan, obj.hold];
  if (obj.notice.text !== '') { attachments.unshift(obj.notice); }
  if (obj.warning.text !== '') { attachments.unshift(obj.warning); }
  return attachments;
}

function buildMessage(shelf, user) {
  const slackId = user.slackId ? `<@${user.slackId}>` : '';
  const onLoan = buildAttachments.bind(null, shelf, 'onLoan');
  const hold = buildAttachments.bind(null, shelf, 'hold');
  const attachments = toArrayAttachments(hold(onLoan({
    warning: {
      mrkdwn_in: ['text'],
      fallback: 'Warning.',
      color: '#ff0000',
      title: 'WARNING',
      text: ''
    },
    notice: {
      mrkdwn_in: ['text'],
      fallback: 'Notice.',
      color: '#ffcc00',
      title: 'NOTICE',
      text: ''
    },
    onLoan: {
      mrkdwn_in: ['text'],
      fallback: 'On Loan.',
      color: '#36a64f',
      title: 'ON LOAN',
      text: ''
    },
    hold: {
      mrkdwn_in: ['text'],
      fallback: 'Hold.',
      color: '#764fa5',
      title: 'HOLD',
      text: ''
    }
  })));
  return {
    text: slackId + ' In your bookbag!',
    attachments: attachments
  };
}

test.describe('opac page', function() {
  this.timeout(150000);

  const webhook = new IncomingWebhook(Config.slack.url);
  const errorMessage = 'error occurred';

  Config.users.forEach((user, idx) => {
    let shelf;
    const d = new OPACDriver(user);
    const userName = user.name || idx;

    test.it('get status: ' + userName, () => {
      d.login();
      d.shelf().then(s => { shelf = s; });
      d.logout();
    });

    test.it('quit driver: ' + userName, () => {
      d.quit();
    });

    test.it('send to slack: ' + userName, done => {
      const message = shelf ? buildMessage(shelf, user) : errorMessage;
      if (message.attachments.length > 2 || message === errorMessage) {
        webhook.send(message, (err, res) => {
          console.log(res);
          console.log(err);
          assert.strictEqual(err, null);
          assert.notStrictEqual(res, null);
          done();
        });
      } else {
        done();
      }
    });
  });
});
