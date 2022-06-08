import { Express, Router } from 'express'
import postRouter from '../routes/post-router'

export default (app: Express) => {
  const router = Router()
  app.use('/api', router)
  router.get('/post')
  postRouter(router)
}
