export default () => {
  const modes = {
    all: 'all',
    day: 'top/day',
    week: 'top/week',
    month: 'top/month',
  }
  const mode = localStorage.getItem('mode')

  if (!mode) {
    localStorage.setItem('mode', 'all')
    return 'all'
  } else return modes[mode]
}
