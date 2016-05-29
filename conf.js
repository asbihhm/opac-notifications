import webdriver, {By} from "selenium-webdriver";
import env from "node-env-file";

env(__dirname + '/.env');

class MatsuyamaOPAC {

  constructor(driver, user) {
    this.driver = driver;
    this.userId = user.id;
    this.passWord = user.pass;
    this.userInitial = user.initial;
    this.url = 'http://www.tosyokan.city.matsuyama.ehime.jp/opac/';
  };

  login() {
    var loginBtn = By.xpath('/html/body/form[1]/table/tbody/tr/td[2]'
                            + '/table/tbody/tr/td/table/tbody/tr[2]/td'
                            + '/table/tbody/tr/td[2]/input');

    this.driver.get(this.url);
    this.driver.findElement(By.name('USERID')).sendKeys(this.userId);
    this.driver.findElement(By.name('PASSWORD')).sendKeys(this.passWord);
    this.driver.sleep(1000)
      .then(this.driver.findElement(loginBtn).click());

    return webdriver.promise.fulfilled(true);
  }

  logout() {
    this.driver.findElement(By.name('LOGOFF')).click();

    return webdriver.promise.fulfilled(true);
  }

  static sendgrid() {
    return require('sendgrid')(process.env.SENDGRIDKEY);
  }

  static payload() {
    return {
      to: [process.env.USER1MAIL, process.env.USER2MAIL],
      from: process.env.SENDGRIDMAILFROM,
      subject: 'In your bookbag!',
      text: null
    }
  }
}

const users = {
  user1: {
    id: process.env.USER1ID,
    pass: process.env.USER1PASS,
    initial: process.env.USER1INITIAL
  },
  user2: {
    id: process.env.USER2ID,
    pass: process.env.USER2PASS,
    initial: process.env.USER2INITIAL
  }
}

exports.OPAC = MatsuyamaOPAC;
exports.users = users;
