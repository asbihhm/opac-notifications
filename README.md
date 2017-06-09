# opac notifications
Send the status of OPAC to a channel in [Slack](https://slack.com).

## requirements
* chrome(chromium) >= 57
* java >= 1.8

## usage
1. touch Config.js
```javascript
export default {
  slack: {
    url: '' // Incoming Webhook URL
  },
  users: [
    {
      id: '',     // OPAC ID
      pass: '',   // OPAC Password
      name: '',   // optional: use in test title
      slackId: '' // optional: use in slack text
    }
  ]
};
```

2. run
```bash
yarn install
yarn start
```
or
```bash
npm install
npm start
```
