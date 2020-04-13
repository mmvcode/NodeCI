const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");
const baseUrl = "http://localhost:3000";

class Page {
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage(); // puppeteer page
    const customPage = new Page(page); // custom page

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  /**
   *
   * @param {puppeteer.Page} page Puppeteer page instance
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Creates new user, logs in, redirects to /blogs
   */
  async login() {
    // Create user in db
    const user = await userFactory();

    // Create session for user
    const { session, sig } = sessionFactory(user);

    // Login
    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    // Also check for waitFor():
    // await page.waitFor(target)

    // Go to default page after login.
    await this.page.goto(`${baseUrl}/blogs`, { waitUntil: "networkidle2" });
  }

  /**
   * Get the text contents of {selector}'s element
   *
   * @param {String} selector css selector
   */
  async getContentsOf(selector) {
    const text = await this.page.$eval(
      selector,
      (element) => element.innerHTML
    );
    return text;
  }

  get(path) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }, path);
  }

  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_data),
        }).then((res) => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }
}

module.exports = Page;
