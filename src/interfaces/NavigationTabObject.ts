export default interface TabObject {
  label: string
  icon: unknown
  to: () => string
  match: string[] | string
  tab: string
}