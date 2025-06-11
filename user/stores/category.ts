import { defineStore } from 'pinia'
import type { CategoryType } from '~/models/category'

export const useCategoryStore = defineStore('Category', () => {
  const serviceApi = useServiceApi()

  const categoryList = ref<CategoryType[]>([])
  const isSubmitDisabled = ref<boolean>(false)
  const isFormCategorySubmitting = ref<boolean>(false)

  const setIsSubmitDisabled = (value: boolean) => {
    isSubmitDisabled.value = value
  }

  async function getCategoryList() {
    try {
      const response = await serviceApi.category.getCategoryList()
      categoryList.value = [
        { id: null, name: 'Tất cả các danh mục', sort_order: 0 },
        ...response.data,
      ]
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // Reset store
  const resetStore = () => {
    categoryList.value = []
  }

  return {
    categoryList,
    getCategoryList,
    setIsSubmitDisabled,
    resetStore,
    isFormCategorySubmitting,
  }
})
