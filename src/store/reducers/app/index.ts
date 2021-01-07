import { APPBAR_STATE_CHANGE, State } from './types'

const initialState: State = {
  appbar: {
    shouldChangeColors: true,
    isHidden: false,
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APPBAR_STATE_CHANGE:
      return { ...state, appbar: { ...payload } }

    default:
      return state
  }
}
