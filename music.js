import { createCard, createInit, generateAccessToken } from "./script.js"
import { secrets } from "./secrets.js"

async function renderMusics() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id") // idplaylist
  let tokenGenerated = ""

  const tokenGenerateded = await generateAccessToken(tokenGenerated)

  const btn = document.querySelector(".btn")

  btn.addEventListener("click", () => {
    window.location.href = "index.html"
  })

  const cardContainer = document.getElementById("cardContainer")

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
        card.innerHTML += createCard(item.snippet)

        cardContainer.appendChild(card)
      })
    })
}

window.onload = function launch() {
  renderMusics()
}
