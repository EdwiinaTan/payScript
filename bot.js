const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
require("dotenv").config()

puppeteer.use(StealthPlugin())
//https://pptr.dev/api/puppeteer.page.__

async function launcher() {
  const browser = await puppeteer.launch({
    headless: "new", // false -> display chrome test
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--enable-webgl",
      "--window-size=800,800",
    ],
  })
  const page = await browser.newPage()
  await page.goto("https://open.spotify.com/playlist/7HuVjioagXVg5iot4VDePx")

  async function getElement(row, element, text) {
    const getElement = await row.$$(element)
    if (getElement && getElement.length !== 0) {
      const textElement = await getElement[0].evaluate((el) => el.textContent)
      console.log(`${text} : ${textElement}`)
    }
  }

  const tracklistRows = await page.$$('[data-testid="tracklist-row"]')

  for (let i = 0; i < tracklistRows.length; i++) {
    const tracklistRow = tracklistRows[i]

    await getElement(
      tracklistRow,
      ".Type__TypeElement-sc-goli3j-0.fZDcWX.t_yrXoUO3qGsJS4Y6iXX.standalone-ellipsis-one-line",
      "Titre"
    )
    await getElement(
      tracklistRow,
      ".Type__TypeElement-sc-goli3j-0.bDHxRN.rq2VQ5mb9SDAFWbBIUIn.standalone-ellipsis-one-line > a",
      "Artiste"
    )
    await getElement(
      tracklistRow,
      ".Type__TypeElement-sc-goli3j-0.bDHxRN.Btg2qHSuepFGBG6X0yEN",
      "Time"
    )
    await getElement(
      tracklistRow,
      ".Type__TypeElement-sc-goli3j-0.ieTwfQ > a",
      "Album"
    )

    const imageElement = await tracklistRow.$("img")
    if (imageElement) {
      const imageURL = await imageElement.evaluate((img) =>
        img.getAttribute("src")
      )
      console.log(`URL de l'image ${i + 1}: ${imageURL}`)
    }
  }
}

launcher()
