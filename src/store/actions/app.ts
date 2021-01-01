import { AppBarState, APPBAR_STATE_CHANGE } from '../reducers/app/types'

export const changeAppBarState = (newState: Partial<AppBarState>) => (
  dispatch
) =>
  dispatch({
    type: APPBAR_STATE_CHANGE,
    payload: newState,
  })
