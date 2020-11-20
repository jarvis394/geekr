import { Mode as ModeName } from '../api/getPosts'

export default interface Mode {
  text: string
  periodText?: string
  to: string
  mode: ModeName
}
