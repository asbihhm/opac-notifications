# opac notifications

Send the status of Matsuyama OPAC to a channel in [Slack](https://slack.com).

Create `${XDG_CONFIG_HOME}/opac-notifications/config.json`

```json
{
  "slack": {
    "url": "Incoming Webhook URL"
  },
  "users": [
    {
      "id": "OPAC ID",
      "pass": "OPAC Password",
      "name": "optional",
      "slackId": "optional"
    }
  ]
}
```

## Run

```sh
nix-shell
npm install
selenium-server &
npm run start
```

or

```sh
nix-env -f . -iA package
opac-selenium-server &
opac-notifications
```

Note:

- `opac-selenium-server` is alias for `selenium-server`
- Chromium browser requires `/etc/fonts/fonts.conf`

## Test

```sh
nix-shell
selenium-server &
python -m http.server -d test/test-pages/ 3000 &
npm run test
```
