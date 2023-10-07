import { secrets } from "./secrets.js"

export const generateAccessToken = async (tokenGenerated) => {
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
    return tokenGenerated
  } else {
    console.error(
      "Failed to obtain access token:",
      response.status,
      response.statusText
    )
  }
}

export const createInit = (tokenGenerated) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenGenerated}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
    cache: "default",
  }
}

export const parseDate = (date) => {
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
