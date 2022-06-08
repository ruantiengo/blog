import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req:Request, res: Response) => {
    const response = await controller.handle(req)
    if (response.statusCode === 200) {
      res.send(response.body)
    } else {
      res.send({ error: response.body.message })
    }
  }
}
