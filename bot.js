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

  //https://pptr.dev/api/puppeteer.page.__
  const tracklistRows = await page.$$('[data-testid="tracklist-row"]')

  for (let i = 0; i < tracklistRows.length; i++) {
    const tracklistRow = tracklistRows[i]

    const titleElement = await tracklistRow.$$(
      ".Type__TypeElement-sc-goli3j-0.fZDcWX.t_yrXoUO3qGsJS4Y6iXX.standalone-ellipsis-one-line"
    )
    if (titleElement && titleElement.length !== 0) {
      const text = await titleElement[0].evaluate((el) => el.textContent)
      console.log(`Titre de l'élément ${i + 1}: ${text}`)
    }

    const artistElement = await tracklistRow.$$(
      ".Type__TypeElement-sc-goli3j-0.bDHxRN.rq2VQ5mb9SDAFWbBIUIn.standalone-ellipsis-one-line > a"
    )
    if (artistElement && artistElement.length !== 0) {
      const text = await artistElement[0].evaluate((el) => el.textContent)
      console.log(`Artiste de l'élément ${i + 1}: ${text}`)
    }

    const timeElement = await tracklistRow.$$(
      ".Type__TypeElement-sc-goli3j-0.bDHxRN.Btg2qHSuepFGBG6X0yEN"
    )
    if (timeElement && timeElement.length !== 0) {
      const text = await timeElement[0].evaluate((el) => el.textContent)
      console.log(`Temps de l'élément ${i + 1}: ${text}`)
    }

    const albumElement = await tracklistRow.$$(
      ".Type__TypeElement-sc-goli3j-0.ieTwfQ > a"
    )
    if (albumElement && albumElement.length !== 0) {
      const text = await albumElement[0].evaluate((el) => el.textContent)
      console.log(`Album de l'élément ${i + 1}: ${text}`)
    }

    const imageElement = await tracklistRow.$("img")
    if (imageElement) {
      const imageURL = await imageElement.evaluate((img) =>
        img.getAttribute("src")
      )
      console.log(`URL de l'image pour l'élément ${i + 1}: ${imageURL}`)
    }
  }
}

launcher()
