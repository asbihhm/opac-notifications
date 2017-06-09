/**
 * OPAC Driver for https://www.tosyokan.city.matsuyama.ehime.jp/opac/
 */

'use strict';

import {Builder, By, promise, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const chromeOptions = new chrome.Options().setUserPreferences({
  credentials_enable_service: false,
  'profile.password_manager_enabled': false,
  'intl.accept_languages': 'en-us'
});

async function books(elem, f) {
  return elem.findElements(By.tagName('tr'))
    .then(l => promise.map(l.slice(2),
                           b => b.findElements(By.tagName('td')).then(f)));
}

async function onLoan(detail) {
  // If there is a renewable book in the table,
  // an empty or a checkbox column appears at leftmost.
  const index = await detail[0].getText().then(t => {
    if (t.toString() === ' ' || t.toString() === '') {
      return {d: 3, p: 5, s: 6, t: 7};
    }
    return {d: 2, p: 4, s: 5, t: 6};
  });
  const onLoanDate = await detail[index.d].getText().then(t => t.toString());
  const period = await detail[index.p].getText().then(t => t.toString());
  const status = await detail[index.s].getText().then(t => t.toString());
  const title = await detail[index.t].getText().then(t => t.toString());
  const periodDate = new Date(period);
  return {
    alert: periodDate.getTime() <= Date.now()+86400000,
    text: `*${title}*\n${onLoanDate}〜${period},   _${status}_`
  };
}

async function hold(detail) {
  const status = await detail[4].getText().then(t => t.toString());
  const title = await detail[5].getText().then(t => t.toString());
  const rank = await detail[6].getText().then(t => t.toString());
  return {
    alert: status === 'Receivable',
    text: `*${title}*\n${rank},    _${status}_`
  };
}

class OPACDriver {
  constructor(user) {
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .usingServer('http://localhost:4444/wd/hub')
      .build();
    this.userId = user.id;
    this.userPass = user.pass;
  }

  login() {
    this.driver.get('https://www.tosyokan.city.matsuyama.ehime.jp/opac/');
    this.driver.findElement(By.name('USERID')).sendKeys(this.userId);
    this.driver.findElement(By.name('PASSWORD')).sendKeys(this.userPass);
    this.driver.findElement(By.xpath(
      '/html/body/form[1]/table/tbody/tr/td[2]/table/tbody/tr/td/'
      + 'table/tbody/tr[2]/td/table/tbody/tr/td[2]/input')).click();
  }

  logout() {
    this.driver.findElement(By.name('LOGOFF')).click();
  }

  quit() {
    this.driver.quit();
  }

  shelf() {
    this.driver.findElement(By.xpath(
      '/html/body/table/tbody/tr[1]/td[11]/a')).click();
    return this.driver.wait(until.elementLocated(By.xpath(
      '/html/body/table[2]/tbody/tr/td/table/tbody/tr[2]/td')), 10000)
      .then(elem => promise.all([
        books(elem.findElement(By.name('EXTEND')), onLoan),
        books(elem.findElement(By.name('DELETE')), hold)
      ]))
      .then(arr => ({onLoan: arr[0], hold: arr[1]}));
  }
}

export default OPACDriver;
