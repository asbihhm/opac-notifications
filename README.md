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

## Usage

Run:

```sh
nix-shell
npm install
selenium-server &
./bin/opac-notifications
```

Install:

```sh
nix-env -f . -iA nodePackages.package
opac-selenium-server &
opac-notifications
```

- CLI options are `--headless`, `--preventWebhook` and `--help`
- `opac-selenium-server` is alias for `selenium-server`
- Chromium browser requires `/etc/fonts/fonts.conf`

Environment variables(development purpose only):

```sh
OPAC_REMOTE_URL=http://localhost:4444/wd/hub \
OPAC_DRIVER_BIN=/nix/store/path/to/chromedriver \
OPAC_CHROME_BIN=/nix/store/path/to/chromium \
./bin/opac-notifications
```

Build options:

```sh
nix-build -A nodePackages.package
  --argstr opacRemoteURL http://localhost:4444/wd/hub \
           opacDriverBin /nix/store/path/to/chromedriver \
           opacChromeBin /nix/store/path/to/chromium
```

- `OPAC_REMOTE_URL`, `OPAC_DRIVER_BIN` and `OPAC_CHROME_BIN` are used for the same purpose of `opacRemoteURL`, `opacDriverBin` and `opacChromeBin`, respectively.

Test:

```sh
nix-shell
npm install
selenium-server &
python -m http.server -d test/test-pages/ 3000 &
npm run test
```
