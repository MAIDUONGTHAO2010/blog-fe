import CommonModel from './common'

export type CategoryType = {
  id: number | null
  name: string
  sort_order: number
}

export default class CategoryModel extends CommonModel {
  id: number | null | undefined
  name: string
  sort_order: number

  constructor(props?: CategoryType) {
    super()
    this.id = props?.id ?? 0
    this.name = props?.name ?? ''
    this.sort_order = props?.sort_order ?? 0
  }
}
