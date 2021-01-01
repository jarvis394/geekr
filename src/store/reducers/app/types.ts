export const PREFIX = 'APP_'
export const APPBAR_STATE_CHANGE = PREFIX + 'APPBAR_STATE_CHANGE'
export interface AppBarState {
  shouldChangeColors: boolean
  isHidden: boolean
}
export interface State {
  appbar: AppBarState
}
