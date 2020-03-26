import makeRequest from './makeRequest'

type Mode = 'all' | 'day' | 'week' | 'month'

const modeParams = {
  all: { sort: 'rating', date: '' },
  day: { date: 'day', sort: 'date' },
  week: { date: 'week', sort: 'date' },
  month: { date: 'month', sort: 'date' },
}

// TODO: Needs an interface for the returning data
export default async (mode: Mode, page: number): Promise<unknown> =>
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
