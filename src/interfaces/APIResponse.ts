export default interface APIResponse<T> {
  data: T
  server_time: string
  next_link?: string
  pages?: number
}
