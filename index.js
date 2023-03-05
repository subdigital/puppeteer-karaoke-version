import {startBrowser} from "./browser.js";
import {signIn} from "./signIn.js";
import * as dotenv from 'dotenv';

dotenv.config()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const browser = await startBrowser();
const page = await browser.newPage();
await page.setViewport({width: 1080, height: 1024});

await page.goto("https://www.karaoke-version.com")
await signIn(page, 
  process.env.KV_USERNAME,
  process.env.KV_PASSWORD
)

await page.goto("https://www.karaoke-version.com/custombackingtrack/eagles/hotel-california.html")

const soloButtonSelector = ".track__controls.track__solo"
let soloButtons = await page.$$(soloButtonSelector);

page.setDefaultTimeout(120000);

let i = 1;
let downloadButton = await page.waitForSelector("a.download");
for (const soloButton of soloButtons) {
  console.log(`soloing track ${i}`)
  await soloButton.click();
  await sleep(3000);
  await downloadButton.click();
  console.log("Waiting for download...")
  await sleep(3000);
  await page.waitForSelector("text/Your download will begin in a moment");
  await sleep(3000);

  const closeModalButton = await page.waitForSelector("button.js-modal-close");
  console.log("closing modal...");
  await sleep(3000);
  await closeModalButton.click();

  await sleep(10000);

  i += 1;
}

