import type { IPostRepo } from '~/repositories/post'
import { ICategoryRepo } from '../repositories/category'

export {}

declare global {
  interface IApiInstance {
    category: ICategoryRepo
    post: IPostRepo
  }
}
