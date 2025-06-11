import { EHttpMethod } from '~/enums/common'
import type { ICategoryListResponse } from '~/types/category'

export interface ICategoryRepo {
  getCategoryList: () => Promise<ICategoryListResponse>
}

export const CategoryRepo = (fetcher: typeof $fetch): ICategoryRepo => {
  return {
    getCategoryList: async (): Promise<ICategoryListResponse> => {
      return await fetcher('/categories', {
        method: EHttpMethod.GET,
      })
    },
  }
}
