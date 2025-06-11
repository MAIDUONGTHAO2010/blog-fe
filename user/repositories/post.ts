import { EHttpMethod } from '~/enums/common'
import type {
  IPostListParams,
  IPostListResponse,
  IPostResponse,
} from '~/types/post'

export interface IPostRepo {
  getPostList: (params: IPostListParams) => Promise<IPostListResponse>
  getPostsByCategories: () => Promise<IPostListResponse>
  show(id: number): Promise<IPostResponse>
}

export const PostRepo = (fetcher: typeof $fetch): IPostRepo => {
  return {
    getPostList: async (params): Promise<IPostListResponse> => {
      return await fetcher('/posts', {
        method: EHttpMethod.GET,
        params,
      })
    },
    getPostsByCategories: async (): Promise<IPostListResponse> => {
      return await fetcher('/get-posts-by-categories', {
        method: EHttpMethod.GET,
      })
    },
    show: async (id: number): Promise<IPostResponse> => {
      return await fetcher(`/posts/${id}`, {
        method: EHttpMethod.GET,
      })
    },
  }
}
