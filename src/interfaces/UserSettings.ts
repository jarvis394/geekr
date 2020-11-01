export default interface UserSettings {
  theme: 'light' | 'dark' | 'oled' | 'sepia'
  primaryColor?: Record<string, string>
  cacheUpdateInterval?: number
}
