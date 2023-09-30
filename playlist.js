import { secrets } from "./secrets.js"

let tokenGenerated = ""

async function generateAccessToken() {
  const tokenUrl = "https://oauth2.googleapis.com/token"

  const requestBody = {
    client_id: secrets.client_id,
    client_secret: secrets.client_secret,
    refresh_token: secrets.refresh_token,
    grant_type: "refresh_token",
    access_type: "offline",
  }

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(requestBody),
  })

  if (response.ok) {
    const data = await response.json()
    tokenGenerated = data.access_token
    console.log("Access token:", data)
    console.log("aaaa", tokenGenerated)
  } else {
    console.error(
      "Failed to obtain access token:",
      response.status,
      response.statusText
    )
  }
}

async function getPlaylist() {
  await generateAccessToken()

  const myInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenGenerated}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
    cache: "default",
  }

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
    `https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet&code=${secrets.code}&redirect_uri=${secrets.redirect_uri}&client_id=${secrets.client_id}&client_secret=${secrets.client_secret}&grant_type=authorization_code&scope=offline_access`,
    myInit
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
        // title.innerHTML += item.snippet.title
        // img.setAttribute("src", item.snippet.thumbnails.medium.url)
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

        let handleClickCard = card.querySelector(`.card`)
        clickModalImg(handleClickCard, item.id)
      })
    })
}

window.onload = function launch() {
  getPlaylist()
}
