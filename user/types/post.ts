interface ITagItem {
  id: number
  name: string
}

interface IPostItem {
  id: number | null
  title: string
  description: string
  content: string
  category: {
    id: number
    name: string
  }
  view_count: number
  tabs: ITagItem[]
  created_at: string
  image_url: string | null
}

interface IPostListResponse {
  data: {
    meta: any
    data: IPostItem[]
  }
}

interface IPostResponse {
  data: IPostItem
}

interface IPostListParams {
  category_id?: number | null
  keyword?: string | null
  page?: number
}

export type { IPostListResponse, IPostItem, IPostListParams, IPostResponse }
