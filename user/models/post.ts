import CommonModel from './common'

export interface ITagItem {
  id: number
  name: string
}

export type PostType = {
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

export default class CategoryModel extends CommonModel {
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

  constructor(props?: PostType) {
    super()
    this.id = props?.id ?? 0
    this.title = props?.title ?? ''
    ;(this.description = props?.description ?? ''),
      (this.content = props?.content ?? ''),
      (this.view_count = props?.view_count ?? 0),
      (this.category = props?.category ?? {
        id: 0,
        name: '',
      }),
      (this.tabs = props?.tabs ?? [])
    ;(this.created_at = props?.created_at ?? ''),
      (this.image_url = props?.image_url ?? '')
  }
}
