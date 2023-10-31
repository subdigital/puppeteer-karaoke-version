import puppeteer from "puppeteer";

async function signIn(page, domain, user, pass) {
  await page.goto(`https://${domain}/my/login.html`);
  await page.type('#frm_login', user);
  await page.type('#frm_password', pass);
  await Promise.all([
    page.click("#sbm"),
    page.waitForNavigation({
      waitUntil: 'networkidle0'
    })
  ])
}

export { signIn }
