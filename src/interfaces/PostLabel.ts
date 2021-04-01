export default interface PostLabel {
  data: Record<string, string>
  type: 'technotext2020' | 'translation' | 'sandbox' | 'recovery' | 'tutorial'
}