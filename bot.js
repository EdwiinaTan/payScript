const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
require("dotenv").config()

puppeteer.use(StealthPlugin())

async function launcher() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--enable-webgl",
      "--window-size=800,800",
    ],
  })
  const page = await browser.newPage()
  await page.goto("https://open.spotify.com/playlist/7HuVjioagXVg5iot4VDePx")

  // const cookies = await page.cookies()
  // await page.setCookie(...cookies)

  // GOOD
  // await page.goto("https://open.spotify.com/playlist/7HuVjioagXVg5iot4VDePx")
  // await page.goto("https://music.youtube.com/")
  // await page.waitForSelector(
  //   '.WpHeLc.VfPpkd-mRLv6.VfPpkd-RLmnJb[aria-label="Sign in"]'
  // )
  // await page.click('.WpHeLc.VfPpkd-mRLv6.VfPpkd-RLmnJb[aria-label="Sign in"]')
  // await page.waitForSelector('input[type="email"]')
  // await page.type('input[type="email"]', process.env.EMAIL)

  // WIP
  // await page.type('input[type="password"]', "votre_mot_de_passe")
  // await page.click("#identifierNext")
  // await page.waitForNavigation({ waitUntil: "domcontentloaded" })

  // await page.waitForSelector(
  //   "#buttons > yt-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
  // )
  // await page.click("#buttons")
  // await browser.close()
}

launcher()
