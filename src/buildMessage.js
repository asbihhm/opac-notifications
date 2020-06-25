function buildAttachments(shelf, type, obj) {
  return shelf[type].reduce((atta, book) => {
    if (book.alert) {
      if (type === 'onLoan') {
        return {
          ...atta,
          warning: {
            ...atta.warning,
            text: `${atta.warning.text}${book.text}\n`,
          },
        };
      }
      if (type === 'hold') {
        return {
          ...atta,
          notice: {
            ...atta.notice,
            text: `${atta.notice.text}${book.text}\n`,
          },
        };
      }
    }
    return {
      ...atta,
      [type]: {
        ...atta[type],
        text: `${atta[type].text}${book.text}\n`,
      },
    };
  }, obj);
}

function toArrayAttachments(obj) {
  const attachments = [];

  if (obj.notice.text !== '') {
    attachments.push(obj.notice);
  }
  if (obj.warning.text !== '') {
    attachments.push(obj.warning);
  }

  /* eslint-disable no-param-reassign */
  if (obj.onLoan.text == '') {
    obj.onLoan.text = 'Empty';
  }
  if (obj.hold.text == '') {
    obj.hold.text = 'Empty';
  }
  /* eslint-enable no-param-reassign */

  attachments.push(obj.onLoan);
  attachments.push(obj.hold);

  return attachments;
}

function buildMessage(shelf, user) {
  const slackId = user.slackId ? `<@${user.slackId}>` : '';
  const onLoan = buildAttachments.bind(null, shelf, 'onLoan');
  const hold = buildAttachments.bind(null, shelf, 'hold');
  const attachments = toArrayAttachments(
    hold(
      onLoan({
        warning: {
          mrkdwn_in: ['text'],
          fallback: 'Warning.',
          color: '#ff0000',
          title: 'WARNING',
          text: '',
        },
        notice: {
          mrkdwn_in: ['text'],
          fallback: 'Notice.',
          color: '#ffcc00',
          title: 'NOTICE',
          text: '',
        },
        onLoan: {
          mrkdwn_in: ['text'],
          fallback: 'On Loan.',
          color: '#36a64f',
          title: 'ON LOAN',
          text: '',
        },
        hold: {
          mrkdwn_in: ['text'],
          fallback: 'Hold.',
          color: '#764fa5',
          title: 'HOLD',
          text: '',
        },
      }),
    ),
  );
  return {
    text: `${slackId} In your bookbag!`,
    attachments,
  };
}

module.exports = buildMessage;
