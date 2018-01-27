# opac notifications
Send the status of Matsuyama OPAC to a channel in [Slack](https://slack.com).

## requirements
* chrome(chromium) >= 60
* java >= 8
* Node >= 8.9

## usage
1. touch Config.js
```javascript
module.exports = {
  slack: {
    url: '', // Incoming Webhook URL
  },
  users: [
    {
      id: '',      // OPAC ID
      pass: '',    // OPAC Password
      name: '',    // optional: use in test title
      slackId: '', // optional: use in slack text
    },
  ],
};
```

2. run
```bash
yarn install
yarn start
```
