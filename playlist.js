import { secrets } from "./secrets.js"

let tokenGenerated

async function getRefreshToken() {
  const tokenUrl1 =
    "https://developers.google.com/oauthplayground/?code=4/0AfJohXnhG5a5sr6U4EpvX5-5TSrTH4B11sGNJ9Bz86JOQd1bsxkzSr4YwD29imKM-0lZqg&scope=https://www.googleapis.com/auth/youtube"
  const tokenUrl2 = "https://developers.google.com/oauthplayground/"

  await fetch(tokenUrl1, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secrets.token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
    cache: "default",
  }).then((res) => console.log("resss", res.json()))
}

async function getPlaylist() {
  const myInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secrets.token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": true,
      // "Access-Control-Allow-Headers": "Content-Type",
      // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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

      const cards = document.getElementById("cards")
      cards.className = "cards"

      const card = document.createElement("div")

      json.items.map((item) => {
        // title.className = "card"
        // title.innerHTML += item.snippet.title
        // date.innerHTML += parseDate(item.snippet.publishedAt)
        // img.setAttribute("src", item.snippet.thumbnails.medium.url)
        card.innerHTML += `
        <div class="card">
          <div>
            <img src=${item.snippet.thumbnails.medium.url} alt="imgg" />
          </div>
          <div class="line">
            <h1>${item.snippet.title}</h1>
            <p>${parseDate(item.snippet.publishedAt)}</p>
          </div>
        </div>`
        // cards.appendChild(date)
        // cards.appendChild(img)
        cards.append(card)
      })
      // const text = document.createTextNode(json.items[0].snippet.title)
      // title.appendChild(text)
    })
}

window.onload = function launch() {
  // const playlist = document.getElementById("container")

  getPlaylist()
  // getRefreshToken()
}
