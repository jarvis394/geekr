import makeRequest from './makeRequest'

export default async (id) => (await makeRequest({
  path: `articles/${id}/comments`,
  version: 2
})).data
