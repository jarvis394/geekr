export default () => {
  let data = localStorage.getItem('habra_userSettings')

  if (!data) return null

  try {
    data = JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse user settings:', e, '\nGot:', data)
  }
}
