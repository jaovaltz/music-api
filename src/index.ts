import express from 'express'
import mongoose from 'mongoose'

import musicRouter from './routes/music.routes'

mongoose.connect('mongodb://localhost:27017/music').then(() => {
  const app = express()

  app.use(express.json())
  app.use('/musics', musicRouter)

  app.listen(3001, () => {
    console.log('Server is running on port 3001')
  })
})
