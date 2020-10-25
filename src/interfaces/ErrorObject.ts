export default interface ErrorObject {
  code: number | string
  message: string
  stack?: string
}
