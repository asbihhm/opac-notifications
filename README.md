# opac notifications
Send the status of Matsuyama OPAC to a channel in [Slack](https://slack.com).

## Run
1. Create `./Config.js`
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

2. Run
```sh
selenium-server &
npm run start
```

## Test
```sh
selenium-server &
python -m http.server -d test/test-pages/ 3000 &
npm run test
```
