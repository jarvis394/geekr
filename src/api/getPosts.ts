import makeRequest from './makeRequest'

const modeParams = {
  all: { sort: 'rating' },
  day: { date: 'day', sort: 'date' },
  week: { date: 'week', sort: 'date' },
  month: { date: 'month', sort: 'date' },
}

export default async (mode, page) =>
  (
    await makeRequest({
      path: 'articles',
      version: 1,
      params: {
        date: modeParams[mode].date,
        sort: modeParams[mode].sort,
        page,
      },
    })
  ).data
