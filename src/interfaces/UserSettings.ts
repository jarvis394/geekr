export default interface UserSettings {
  theme: 'light' | 'dark'
  primaryColor: Record<string, string>
  cacheUpdateInterval: number
}
