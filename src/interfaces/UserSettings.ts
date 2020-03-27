export default interface UserSettings {
  theme: 'light' | 'dark'
  separateCommentsPage: boolean
  primaryColor: Record<string, string>
  cacheUpdateInterval: number
}