import { secrets } from "./secrets.js"

const myInit = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer ya29.a0AfB_byAKst_O-bz0gWCCFxG0qEX1VkMPPtyesYN_geRwPzpJJd1FTaILMR4Ln4-mV072sbpUZLcPMVxBxMz5ljjXnoEWKRJ64CsMdnS-dkCyGSmw-vu_UtmkgJQn_aS8KWQpT8keziQ1wKiaR7x2m2uNewfvGfdcVLu_aCgYKAeMSARESFQGOcNnC-dzI6OdKIo_NqaikNziuuA0171",
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

async function getPlaylist() {
  await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet&code=${secrets.code}&redirect_uri=${secrets.redirect_uri}&client_id=${secrets.client_id}&client_secret=${secrets.client_secret}&grant_type=authorization_code`,
    myInit
  )
    .then((res) => res.json())
    .then((json) => console.log("json", json))
}

window.onload = function launch() {
  const playlist = document.getElementById("container")
  const text = document.createTextNode("Coucou")

  playlist.appendChild(text)
  getPlaylist()
}
