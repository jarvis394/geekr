import { PaletteType } from 'src/config/constants'

export interface CustomTheme {
  name: string
  type: 'dark' | 'light'
  primary: {
    main: string
    light: string
    dark: string
  }
  background: {
    paper: string
    default: string
  }
  text: {
    primary: string
    secondary: string
    disabled: string
    hint: string
  }
}

export default interface UserSettings {
  themeType: PaletteType | string
  customThemes: CustomTheme[]
  hiddenAuthors: string[]
  hiddenCompanies: string[]
  autoChangeTheme: boolean
  preferredLightTheme: PaletteType | string
  preferredDarkTheme: PaletteType | string
}
