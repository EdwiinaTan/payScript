const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
require("dotenv").config()

puppeteer.use(StealthPlugin())

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
  await page.goto(
    "https://drive.google.com/drive/u/1/folders/1sr3-8XLD9Dw0OSLLW2OCakV4CUp5xoRB"
  )

  await page.waitForSelector('input[type="email"]', { visible: true })
  await page.type('input[type="email"]', process.env.EMAIL)
  await page.click("#identifierNext")

  // await page.waitForSelector('input[type="password"]', { visible: true })
  // await page.type('input[type="password"]', process.env.PASSWORD)
  // await page.click("#passwordNext")

  wait(6000)

  const elements = await page.$$eval(
    '[aria-label="Autres actions"]',
    (elements) => {
      return elements.map((element) => element.textContent)
    }
  )

  // Affichez les textes des éléments récupérés
  elements.forEach((text, index) => {
    console.log(`Élément ${index + 1}: ${text}`)
  })

  // const cookies = await page.cookies()
  // await page.setCookie(...cookies)

  // GOOD
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
