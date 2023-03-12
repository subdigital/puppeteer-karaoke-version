import puppeteer from "puppeteer";

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser...");

    browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true
    });
  } catch (err) {
    console.error("Could not create a browser instance: ", err);
  }
  return browser;
}

export {
  startBrowser
};
