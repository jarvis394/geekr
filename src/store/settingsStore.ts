import { observable } from 'mobx'
import generateTheme from 'src/config/theme'

class SettingsStore {
  @observable theme = generateTheme()
}

export default new SettingsStore()