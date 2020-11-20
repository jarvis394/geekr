export default () => {
  const modes = {
    all: 'all',
    daily: 'top/daily',
    weekly: 'top/weekly',
    monthly: 'top/monthly',
    yearly: 'top/yearly',
    alltime: 'top/alltime',
  }
  const mode = localStorage.getItem('mode')

  if (!mode) {
    localStorage.setItem('mode', 'all')
    return 'all'
  } else return modes[mode]
}
