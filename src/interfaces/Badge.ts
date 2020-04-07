export default interface Badge {
  id: string | number
  title: string
  alias: string
  description: string
  url: null | string
  is_removable: boolean
  is_disabled: boolean
}
