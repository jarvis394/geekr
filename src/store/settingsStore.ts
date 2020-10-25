import { observable, action } from 'mobx'
import generateTheme from 'src/config/theme'

class SettingsStore {
  @observable theme = generateTheme()
  @observable themeType = this.theme.palette.type
  
  @action
  setTheme() {
    this.themeType = this.themeType === 'light' ? 'dark' : 'light'
    this.theme = generateTheme(this.themeType)
  }
}

export default new SettingsStore()