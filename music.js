import { createInit, generateAccessToken } from "./script.js"
import { secrets } from "./secrets.js"

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id") // idplaylist

let tokenGenerated = ""

async function renderMusics() {
  const tokenGenerateded = await generateAccessToken(tokenGenerated)

  const btn = document.querySelector(".btn")

  btn.addEventListener("click", () => {
    console.log("aaa")
    window.location.href = "index.html"
  })

  const cardContainer = document.getElementById("cardContainer")

  function parseDate(date) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T/
    const match = date.match(regex)

    if (match) {
      const year = match[1]
      const month = match[2]
      const day = match[3]
      const formattedDate = `${day}/${month}/${year}`
      return formattedDate
    }
  }

  await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?mine=true&part=snippet&code=${secrets.code}&redirect_uri=${secrets.redirect_uri}&client_id=${secrets.client_id}&client_secret=${secrets.client_secret}&grant_type=authorization_code&scope=offline_access&playlistId=${id}`,
    createInit(tokenGenerateded)
  )
    .then((res) => res.json())
    .then((res) => {
      res.items.map((item) => {
        console.log("res", item)
        const card = document.createElement("div")
        card.classList.add("cards")

        card.innerHTML += `
          <div class="card">
            <div >
              <img src=${
                item.snippet.thumbnails.medium.url
              } alt="playlist musid img" class="card_img" />
            </div>
            <div class="line">
              <span>${item.snippet.title}</span>
              <span>${parseDate(item.snippet.publishedAt)}</span>
            </div>
          </div>
        `

        cardContainer.appendChild(card)
      })
    })
}

window.onload = function launch() {
  renderMusics()
}
