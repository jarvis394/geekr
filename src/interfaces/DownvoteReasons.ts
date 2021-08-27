export interface DownvoteReason {
  id: string
  title: string
  order: number
}

export default interface DownvoteReasons {
  data: Record<number, DownvoteReason>
}
