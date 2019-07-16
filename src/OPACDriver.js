/**
 * OPAC Driver for https://www.tosyokan.city.matsuyama.ehime.jp/opac/
 */

const { Builder, By, promise, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

promise.USE_PROMISE_MANAGER = false;

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(
  process.env.NODE_ENV === 'development'
    ? ['lang=en', 'window-size=1920,1080']
    : ['headless', 'lang=en', 'window-size=1920,1080'],
);
chromeOptions.setUserPreferences({
  credentials_enable_service: false,
  'profile.password_manager_enabled': false,
  'intl.accept_languages': 'en-US',
});

async function books(elem, f) {
  const trs = await elem.findElements(By.tagName('tr'));
  return Promise.all(
    trs
      .slice(1) // remove thead/tr
      .map(tr => tr.findElements(By.tagName('td')).then(f)),
  );
}

async function onLoan(detail) {
  // If there is a renewable book in the table,
  // an empty or a checkbox column appears at leftmost.
  let index = { d: 2, p: 3, t: 4, s: 5 };
  if (detail.length > 6) index = { d: 3, p: 4, t: 5, s: 6 };

  const loanDateAndPlace = await detail[index.d].getText().then(t => t.toString());
  const loanDate = loanDateAndPlace.split('\n')[0];
  const period = await detail[index.p].getText().then(t => t.toString());
  const title = await detail[index.t].getText().then(t => t.toString());
  const status = await detail[index.s].getText().then(t => t.toString());
  const periodDate = new Date(period);
  return {
    alert: periodDate.getTime() <= Date.now() + 86400000,
    text:
    `*${title}*\n${loanDate}〜${period},   _${status.replace(/\n/g, ',  ')}_`,
  };
}

async function hold(detail) {
  // If there is only one recivable book in the table,
  // an select column disappears at leftmost.
  let index = { d: 2, s: 3, t: 4 };
  if (detail.length > 7) index = { d: 3, s: 4, t: 5 };

  const holdDateAndDueDate = await detail[index.d].getText().then(t => t.toString());
  const [holdDate, dueDate] = holdDateAndDueDate.split('\n');
  const statusAndRank = await detail[index.s].getText().then(t => t.toString());
  const [status, rank] = statusAndRank.split('\n');
  const title = await detail[index.t].getText().then(t => t.toString());
  return {
    alert: status === 'Receivable',
    text:
    `*${title}*\n${rank},    _${status}_   ${holdDate}〜${dueDate || ''}`,
  };
}

class OPACDriver {
  constructor(user, { url } = {}) {
    this.id = user.id;
    this.pass = user.pass;
    this.url = url || 'https://www.tosyokan.city.matsuyama.ehime.jp/opac/';
  }

  async build() {
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .usingServer('http://localhost:4444/wd/hub')
      .build();
  }

  async getUrl() {
    await this.driver.get(this.url);
  }

  async quit() {
    await this.driver.quit();
  }

  async login() {
    await this.driver.findElement(By.name('USERID')).sendKeys(this.id);
    await this.driver.findElement(By.name('PASSWORD')).sendKeys(this.pass);
    await this.driver.findElement(By.xpath('//*[@id="loginbtn"]')).click();
    await this.driver.wait(until.elementLocated(By.xpath(
      '//*[@id="logoutbtn"]')), 10000);
  }

  async logout() {
    await this.driver.findElement(By.xpath('//*[@id="logoutbtn"]')).click();
    await this.driver.wait(until.elementLocated(By.xpath(
      '//*[@id="loginbtn"]')), 10000);
  }

  async toStatusPage() {
    await this.driver.findElement(By.xpath(
      '//*[@id="nav_target"]/div[3]/a[6]')).click();
  }

  async getShelf() {
    return this.driver.wait(until.elementLocated(By.xpath(
      '/html/body/article/table/tbody/tr/td/div/div')), 10000)
      .then(elem => Promise.all([
        books(elem.findElement(By.name('EXTEND_F')), onLoan),
        books(elem.findElement(By.name('DELETE')), hold),
      ]))
      .then(arr => ({ onLoan: arr[0], hold: arr[1] }));
  }
}

module.exports = OPACDriver;
