import {startBrowser} from "./browser.js";
import {signIn} from "./signIn.js";
import util from "./util.js";
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.KV_USERNAME || !process.env.KV_PASSWORD) {
  console.error("Missing KV_USERNAME or KV_PASSWORD in environment. Did you create a .env file in this directory and include these?");
  process.exit(1);
}

let args = process.argv;
if (args[0] =~ /node$/) {
  args = args.slice(2);
} else if (args[0] =~ /npm$/) {
  args = args.slice(3);
}
const songUrl = args[0];
if (!songUrl) {
  console.error("Usage: npm run start <song url>")
  process.exit(1);
}

// PARSE OPTIONS

let downloadPath = util.getArgValue(args, "-d");

const browser = await startBrowser();
const page = await browser.newPage();
if (downloadPath) {
  console.log("Using download path ", downloadPath);
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath
  });
}

// SIGN IN 
console.log("Signing in...");
const domain = new URL(songUrl).hostname;
await page.setViewport({width: 1080, height: 1024});

await signIn(page, 
  domain,
  process.env.KV_USERNAME,
  process.env.KV_PASSWORD
)

// LOAD SONG

console.log(`Starting for song page: ${songUrl}`);
await page.goto(songUrl);

await util.sleep(6000);

page.setDefaultTimeout(120000);


const soloButtonSelector = ".track__controls.track__solo"
let soloButtons = await page.$$(soloButtonSelector);
let trackNames = await page.$$(".mixer .track .track__caption");

let i = 1;
let downloadButton = await page.waitForSelector("a.download");
for (const soloButton of soloButtons) {
  // the click track also has the intro element, so we need to extract just the text
  const trackName = await trackNames[i].evaluate(el => el.lastChild.nodeValue.trim());
  console.log(`soloing track ${i} of ${soloButtons.length} (${trackName})`);
  await soloButton.click();
  await util.sleep(3000);
  await downloadButton.click();
  console.log("Waiting for download...")
  await util.sleep(3000);
  await page.waitForSelector("text/Your download will begin in a moment");
  await util.sleep(3000);

  const closeModalButton = await page.waitForSelector("button.js-modal-close");
  console.log("closing modal...");
  await util.sleep(3000);
  await closeModalButton.click();

  await util.sleep(10000);

  i += 1;
}

console.log("Done!");
await browser.close();
