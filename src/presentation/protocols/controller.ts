import { HttpResponse } from './http-methods'

export interface Controller{
    handle(httpRequest: any): Promise<HttpResponse>
}
