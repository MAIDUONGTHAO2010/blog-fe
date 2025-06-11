export default class CommonModel {
  // Cover warning `Cannot stringify arbitrary non-POJOs`
  toJSON() {
    return { ...this }
  }
}
