import { createCard, createInit, generateAccessToken } from "./script.js"
import { secrets } from "./secrets.js"

async function getPlaylist() {
  let tokenGenerated = ""
  const tokenGenerateded = await generateAccessToken(tokenGenerated)

  await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet&code=${secrets.code}&redirect_uri=${secrets.redirect_uri}&client_id=${secrets.client_id}&client_secret=${secrets.client_secret}&grant_type=authorization_code&scope=offline_access`,
    createInit(tokenGenerateded)
  )
    .then((res) => res.json())
    .then((json) => {
      console.log("json", json)
      const cardContainer = document.getElementById("cardContainer")

      const clickModalImg = (clickImgModal, id) => {
        clickImgModal.addEventListener("click", () => {
          window.location.href = `music.html?id=${id}`
          console.log("iddddd", id)
        })
      }

      json.items.map((item) => {
        const card = document.createElement("div")

        card.classList.add("cards")
        card.innerHTML += createCard(item.snippet)

        cardContainer.appendChild(card)

        let handleClickCard = card.querySelector(`.card`)
        clickModalImg(handleClickCard, item.id)
      })
    })
}

window.onload = function launch() {
  getPlaylist()
}
