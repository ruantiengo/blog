
import { Router } from 'express'
import { makeBlogController } from '../factory/blog-controller-factory'
import { adaptRoute } from '../adapters/adapt-route'
export default (router: Router) => {
  router.post('/create', adaptRoute(makeBlogController()))
}
