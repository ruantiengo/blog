import { ServerError } from '../errors/server-error'

export const created = (data: any) => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error
})

export const serverError = () => ({
  statusCode: 500,
  body: new ServerError()
})
