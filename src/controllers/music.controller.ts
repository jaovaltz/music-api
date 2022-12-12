import { Request, Response } from 'express'

import { Music } from '../models/music.model'
import { getRedis, setRedis } from '../redisConfig'

const createMusic = async (req: Request, res: Response) => {
  const { title, artist, album, genre, year } = req.body

  const music = await Music.create({
    title,
    artist,
    album,
    genre,
    year
  })

  if (music) {
    return res.status(201).json(music)
  } else {
    return res.status(400).json({ error: 'Something went wrong' })
  }
}

const getMusics = async (req: Request, res: Response) => {
  const cachedKey = 'musics:all'

  console.time('All Musics')

  const cachedMusics = await getRedis(cachedKey)

  if (cachedMusics) {
    console.log('cached')
    const parsedMusics = JSON.parse(cachedMusics)
    console.timeEnd('All Musics')
    return res.status(200).json(parsedMusics)
  }

  const musics = await Music.find({})

  console.timeEnd('All Musics')

  await setRedis(cachedKey, JSON.stringify(musics))

  return res.status(200).json(musics)
}

const getMusicById = async (req: Request, res: Response) => {
  const { id } = req.params

  const cachedKey = `music:${id}`

  console.time('music')

  const musicRedis = await getRedis(cachedKey)

  if (musicRedis) {
    const parsedMusic = JSON.parse(musicRedis)
    console.timeEnd('music')
    return res.status(200).json(parsedMusic)
  }

  const music = await Music.findById(id)

  if (music) {
    await setRedis(cachedKey, JSON.stringify(music))
    console.timeEnd('music')
    return res.status(200).json(music)
  }

  return res.status(404).json({ error: 'Music not found' })
}

const updateMusic = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, artist, album, genre, year } = req.body
  const music = await Music.findByIdAndUpdate(
    id,
    {
      title,
      artist,
      album,
      genre,
      year
    },
    { new: true }
  )
  if (music) {
    return res.status(200).json(music)
  } else {
    return res.status(404).json({ error: 'Music not found' })
  }
}

const deleteMusic = async (req: Request, res: Response) => {
  const { id } = req.params
  const music = await Music.findByIdAndDelete(id)
  if (music) {
    return res.status(200).json(music)
  } else {
    return res.status(404).json({ error: 'Music not found' })
  }
}

export { createMusic, getMusics, getMusicById, updateMusic, deleteMusic }
