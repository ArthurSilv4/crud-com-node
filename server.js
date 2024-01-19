import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await database.createVideo({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.listVideos(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body


  await database.updateVideo(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.deleteVideo(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})