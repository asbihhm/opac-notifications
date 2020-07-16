/**
 * OPAC Driver for https://www.tosyokan.city.matsuyama.ehime.jp/opac/
 */

const { Builder, By, promise, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

promise.USE_PROMISE_MANAGER = false;

async function books(elem, f) {
  const trs = await elem.findElements(By.tagName('tr'));
  return Promise.all(
    trs
      .slice(1) // remove thead/tr
      .map((tr) => tr.findElements(By.tagName('td')).then(f)),
  );
}

async function onLoan(detail) {
  // If there is a renewable book in the table,
  // an empty or a checkbox column appears at leftmost.
  let index = { d: 2, p: 3, t: 4, s: 5 };
  if (detail.length > 6) index = { d: 3, p: 4, t: 5, s: 6 };

  const loanDateAndPlace = await detail[index.d]
    .getText()
    .then((t) => t.toString());
  const loanDate = loanDateAndPlace.split('\n')[0];
  const period = await detail[index.p].getText().then((t) => t.toString());
  const title = await detail[index.t].getText().then((t) => t.toString());
  const status = await detail[index.s].getText().then((t) => t.toString());
  const periodDate = new Date(period);
  return {
    alert: periodDate.getTime() <= Date.now() + 86400000,
    text: `*${title}*\n${loanDate}〜${period},   _${status.replace(
      /\n/g,
      ',  ',
    )}_`,
  };
}

async function hold(detail) {
  // If there is only one recivable book in the table,
  // an select column disappears at leftmost.
  let index = { d: 2, s: 3, t: 4 };
  if (detail.length > 7) index = { d: 3, s: 4, t: 5 };

  const holdDateAndDueDate = await detail[index.d]
    .getText()
    .then((t) => t.toString());
  const [holdDate, dueDate] = holdDateAndDueDate.split('\n');
  const statusAndRank = await detail[index.s]
    .getText()
    .then((t) => t.toString());
  const [status, rank] = statusAndRank.split('\n');
  const title = await detail[index.t].getText().then((t) => t.toString());
  return {
    alert: status === 'Receivable',
    text: `*${title}*\n${rank},    _${status}_   ${holdDate}〜${dueDate || ''}`,
  };
}

class OPACDriver {
  constructor(user) {
    this.id = user.id;
    this.pass = user.pass;
  }

  async build({ headless, remoteURL, chromeBin, driverBin } = {}) {
    const chromeOptions = new chrome.Options();

    if (headless) chromeOptions.headless();
    if (chromeBin) chromeOptions.setChromeBinaryPath(chromeBin);

    chromeOptions.windowSize({ width: 1920, height: 1080 }).setUserPreferences({
      credentials_enable_service: false,
      'profile.password_manager_enabled': false,
      'intl.accept_languages': 'en-US',
    });

    const builder = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions);

    if (remoteURL) builder.usingServer(remoteURL);

    if (driverBin) {
      builder.setChromeService(new chrome.ServiceBuilder(driverBin));
    }

    this.driver = await builder.build();
  }

  async getUrl(url) {
    if (!this.driver) return;
    await this.driver.get(
      url || 'https://www.tosyokan.city.matsuyama.ehime.jp/opac/',
    );
  }

  async quit() {
    if (!this.driver) return;
    await this.driver.quit();
  }

  async login() {
    if (!this.driver) return;
    await this.driver.findElement(By.name('USERID')).sendKeys(this.id);
    await this.driver.findElement(By.name('PASSWORD')).sendKeys(this.pass);
    await this.driver.findElement(By.xpath('//*[@id="loginbtn"]')).click();
    await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="logoutbtn"]')),
      10000,
    );
  }

  async logout() {
    if (!this.driver) return;
    await this.driver.findElement(By.xpath('//*[@id="logoutbtn"]')).click();
    await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="loginbtn"]')),
      10000,
    );
  }

  async goToStatusPage() {
    if (!this.driver) return;
    await this.driver
      .findElement(By.xpath('//*[@id="nav_target"]/div[3]/a[6]'))
      .click();
  }

  async getShelf() {
    if (!this.driver) return null;
    return this.driver
      .wait(
        until.elementLocated(
          By.xpath('/html/body/article/table/tbody/tr/td/div/div'),
        ),
        10000,
      )
      .then((elem) =>
        Promise.all([
          books(elem.findElement(By.name('EXTEND_F')), onLoan),
          books(elem.findElement(By.name('DELETE')), hold),
        ]),
      )
      .then((arr) => ({ onLoan: arr[0], hold: arr[1] }));
  }
}

module.exports = OPACDriver;
