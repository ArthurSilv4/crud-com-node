import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
  #videos = new Map()

  async listVideos(search) {
    let videos

    if (search) {
      videos = await sql`select * from videos where title like ${'%' + search + '%'}`
    } else {
      videos = await sql`select * from videos`
    }

    return videos
  }

  async createVideo(video) {
    const videoId = randomUUID()
    const { title, description, duration } = video

    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
  }

  async updateVideo(id, video) {
    const { title, description, duration } = video

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
  }

  async deleteVideo(id) {
    await sql`delete from videos where id = ${id}`
  }
}