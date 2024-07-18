import puppeteer from "puppeteer";

async function setDownloadPath(page, path) {
  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: path,
  });
}

async function startBrowser(options) {
  let browser;
  try {
    console.log("Opening the browser...");
    browser = await puppeteer.launch({
      headless: options.headless,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.error("Could not create a browser instance: ", err);
  }
  return browser;
}

export { startBrowser, setDownloadPath };
