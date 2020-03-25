import makeRequest from './makeRequest'

export default async (query, page) =>
  (
    await makeRequest({
      path: 'articles',
      version: 1,
      params: {
        query,
        page,
      },
    })
  ).data
