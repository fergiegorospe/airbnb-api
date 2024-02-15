import express from 'express'

const app = express()

import photosRouter from './ohotos/photosRoutes.js'

app.use(photosRouter)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
