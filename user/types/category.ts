interface ICategoryItem {
  id: number
  name: string
  sort_order: number
}

interface ICategoryListResponse {
  data: ICategoryItem[]
}

export type { ICategoryListResponse, ICategoryItem }
