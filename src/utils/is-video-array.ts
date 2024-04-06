import { Video } from "@/interfaces/video"

export function isVideoArray(response: Response | Video[]): response is Video[] {
  const isArray = Array.isArray(response) 
  if (!isArray) {
    return false
  }
  let eachIsVideo = true
  response.forEach((item) => {
      if (
        typeof item.id !== "number"
        || typeof item.name !== "string"
        || typeof item.duration !== "number"
        || typeof item.description !== "string"
        || typeof item.thumbnail !== "string"
      ) {
        eachIsVideo = false
      } 
  })
  return eachIsVideo
}