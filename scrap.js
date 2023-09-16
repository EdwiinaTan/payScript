// Fonction pour extraire l'ID "tracklist-row" de l'URL
function extractPlaylistIDFromURL(url) {
  const segments = url.split("/")
  for (let i = 0; i < segments.length; i++) {
    if (segments[i] === "playlist") {
      return segments[i + 1] // L'ID de la playlist se trouve après "playlist" dans l'URL
    }
  }
  return null // Si l'ID n'est pas trouvé
}

// URL de la page Spotify
const spotifyURL = "https://open.spotify.com/playlist/7HuVjioagXVg5iot4VDePx"

// Appel de la fonction pour extraire l'ID
const playlistID = extractPlaylistIDFromURL(spotifyURL)

if (playlistID) {
  console.log("ID de la playlist :", playlistID)
} else {
  console.log("ID de la playlist non trouvé.")
}
