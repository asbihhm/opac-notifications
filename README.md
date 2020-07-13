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
selenium-server &
./bin/opac-notifications
```

or

```sh
nix-env -f '<nixpkgs>' -iA selenium-server-standalone chromedriver chromium #(or google-chrome)
nix-env -f . -iA package
selenium-server &
opac-notifications
```

## Test

```sh
nix-shell
selenium-server &
python -m http.server -d test/test-pages/ 3000 &
npm run test
```
