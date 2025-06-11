import { defineStore } from 'pinia'
import type { PostType } from '~/models/post'
import type { IPostListParams } from '~/types/post'

export const usePostStore = defineStore('Post', () => {
  const serviceApi = useServiceApi()

  const postList = ref<PostType[]>([])
  const isSubmitDisabled = ref<boolean>(false)
  const isFormPostSubmitting = ref<boolean>(false)

  const setIsSubmitDisabled = (value: boolean) => {
    isSubmitDisabled.value = value
  }

  async function getPostList(params: IPostListParams) {
    try {
      const response = await serviceApi.post.getPostList(params)

      if (response.data && response.data.data) {
        postList.value = response.data.data
      }

      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function getPostsByCategories() {
    try {
      const response = await serviceApi.post.getPostsByCategories()
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function getPostById(id: number) {
    try {
      const response = await serviceApi.post.show(id)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // Reset store
  const resetStore = () => {
    postList.value = []
  }

  return {
    postList,
    getPostList,
    setIsSubmitDisabled,
    resetStore,
    isFormPostSubmitting,
    getPostsByCategories,
    getPostById,
  }
})
