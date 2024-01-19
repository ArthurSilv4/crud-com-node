import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
  #videos = new Map()

  listVideos(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter(video => {
        if (search) {
          return video.title.includes(search)
        }
        return true
      })
  }

  createVideo(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  updateVideo(id, video) {
    this.#videos.set(id, video)
  }

  deleteVideo(id) {
    this.#videos.delete(id)
  }
}