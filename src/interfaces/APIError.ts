interface APIError {
  additional: string[]
  code: number
  data: Record<string, unknown>
  message: string
}

export default APIError
