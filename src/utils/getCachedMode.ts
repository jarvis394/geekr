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
    localStorage.setItem('mode', modes.all)
    return modes.all
  } else if (modes[mode]) return modes[mode]
  else return modes.all
}
