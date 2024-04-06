import { Playlist } from "@/interfaces/playlist";

export function isPlaylistArray(response: Response | Playlist[]): response is Playlist[] {
  const isArray = Array.isArray(response) 
  if (!isArray) {
    return false
  }
  let eachIsPlaylist = true
  response.forEach((item) => {
      if (
        typeof item.description !== "string"
        || typeof item.id !== "number"
        || typeof item.name !== "string"
        || !Array.isArray(item.videoIds)
        || !item.videoIds.every((videoId) => typeof videoId === 'number')
      ) {
        eachIsPlaylist = false
      } 
  })
  return eachIsPlaylist
}