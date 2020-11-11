import { State, fieldsMap, typesMap } from './types'

const initialState: State = {}
;['hubs', 'user', 'companies', 'children'].forEach(
  (e: string) =>
    (initialState[e] = {
      data: null,
      fetching: false,
      fetched: false,
      error: null,
    })
)

export default (
  state = initialState,
  { type, payload }: { type: string; payload: { data: never; error?: string } }
) => {
  const actionHandler = (type: string) => {
    if (type.endsWith('FETCH')) {
      return {
        fetching: true,
        fetched: false,
        error: null,
        data: null,
      }
    } else if (type.endsWith('FULFILLED')) {
      return {
        fetching: false,
        fetched: true,
        error: null,
        data: payload.data,
      }
    } else if (type.endsWith('REJECTED')) {
      return {
        fetching: false,
        fetched: true,
        data: null,
        error: payload.error,
      }
    } else return {}
  }

  const field = fieldsMap[typesMap.findIndex((e) => type.startsWith(e))]
  return Object.assign({}, state, {
    [field]: { ...state[field], ...actionHandler(type) },
  })
}
