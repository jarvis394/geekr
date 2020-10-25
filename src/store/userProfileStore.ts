import { observable } from 'mobx'
import { Company, ErrorObject, HubObject } from 'src/interfaces'
import { UserExtended } from 'src/interfaces/User'

interface PromiseItem<T> {
  data: T
  fetching: boolean
  fetched: boolean
  error: null | ErrorObject
}
const promiseItem = {
  data: null,
  fetching: false,
  fetched: false,
  error: null,
}

class UserProfileStore {
  @observable hubs: PromiseItem<HubObject[]> = promiseItem
  @observable user: PromiseItem<UserExtended> = promiseItem
  @observable companies: PromiseItem<Company[]> = promiseItem
  @observable children: PromiseItem<UserExtended[]> = promiseItem
}

export default new UserProfileStore()