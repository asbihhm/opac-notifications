'use strict';

import webdriver, {By} from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import assert from 'assert';
import {OPAC, users} from './conf.js';

var d;  // driver
const shelf = {borrow: [], hold: []};
const tomorrow = Date.now() + 86400 * 1000;
const usageStatus = By.xpath('/html/body/table/tbody/tr[1]/td[11]/a');
const statusTable = By.xpath('/html/body/table[2]/tbody/tr/td/'
                             + 'table/tbody/tr[2]/td');

async function borrow (i, detail) {
  let index = await detail[0].getText().then(t => {
    if (t.toString() === ' ' || t.toString() === '') {
      return {b: 3, p: 5, s: 6, t: 7};
    } else {
      return {b: 2, p: 4, s: 5, t: 6};
    }
  });

  let borrowDate = await detail[index.b].getText().then(t => t.toString());
  let period = await detail[index.p].getText().then(t => t.toString());
  let status = await detail[index.s].getText().then(t => t.toString());
  let title = await detail[index.t].getText().then(t => t.toString());
  let periodDate = new Date(period);

  this.push({
    notice: periodDate.getTime() <= tomorrow,
    text: `${i}: ${title}\n   ${borrowDate}  -  ${period}\n   ${status}`
  });
}

async function hold (i, detail) {
  let status = await detail[4].getText().then(t => t.toString());
  let title = await detail[5].getText().then(t => t.toString());
  let rank = await detail[6].getText().then(t => t.toString());

  this.push({
    notice: status === 'Receivable',
    text: `${i}: ${title}\n   ${rank}\n   ${status}`
  });
}

function toShelf (element, f) {
  element.findElements(By.tagName('tr'))
    .then(lis => {
      lis.slice(2).map(b => b.findElements(By.tagName('td')).then(f));
    });
}

function toGather (p, c) {
  return {
    count: p.count + 1,
    noticeText: c.notice ? p.noticeText + '\n\n' + c.text : p.noticeText,
    text: p.text + '\n\n' + c.text
  };
}


test.describe('opac page', function () {
  this.timeout(150000);

  test.before(function () {
    d = new webdriver.Builder()
      .forBrowser('chrome')
      .usingServer('http://localhost:4444/wd/hub')
      .build();
  });
  test.after(function () { d.quit(); });

  test.it('get user1 status', function () {
    var opac = new OPAC(d, users.user1);
    opac.login();

    d.findElement(usageStatus).click();
    d.wait(d.findElement(statusTable).then(element => {
      toShelf(element.findElement(By.name('EXTEND')),
              borrow.bind(shelf.borrow, opac.userInitial));
      toShelf(element.findElement(By.name('DELETE')),
              hold.bind(shelf.hold, opac.userInitial));
    }), 10000);

    opac.logout();
  });

  test.it('get user2 status', function () {
    var opac = new OPAC(d, users.user2);
    opac.login();

    d.findElement(usageStatus).click();
    d.wait(d.findElement(statusTable).then(element => {
      toShelf(element.findElement(By.name('EXTEND')),
              borrow.bind(shelf.borrow, opac.userInitial));
      toShelf(element.findElement(By.name('DELETE')),
              hold.bind(shelf.hold, opac.userInitial));
    }), 10000);

    opac.logout();
  });

  test.it('send mail', function (done) {
    let borrowing =
          shelf.borrow.reduce(toGather, {count: 0, noticeText: '', text: ''});
    let holding =
          shelf.hold.reduce(toGather, {count: 0, noticeText: '', text: ''});

    if (borrowing.noticeText === '' && holding.noticeText === '') {
      done();
    }
    else
    {
      let message = `NOTICE${borrowing.noticeText}${holding.noticeText}\n\n`
            + `------------------------\n\nON LOAN: ${borrowing.count}`
            + `${borrowing.text}\n\n`
            + `------------------------\n\nRESERVATIONS: ${holding.count}`
            + holding.text;

      var payload = OPAC.payload();
      payload.text = message;
      OPAC.sendgrid().send(payload, function (err, json) {
        if (err) { console.log(err); done(); }
        assert.deepStrictEqual(json.message, 'success');
        done();
      });
    }
  });

});
