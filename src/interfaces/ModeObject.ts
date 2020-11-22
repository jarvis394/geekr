import { Mode } from '../config/constants'

export default interface ModeObject {
  text: string
  switcherText?: string
  /** Describes if the mode is for 'new' category in Switcher */
  isNewMode?: boolean
  to: string
  mode: Mode
}
