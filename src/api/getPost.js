import makeRequest from './makeRequest'

export default async (id) => (await makeRequest({
  path: `articles/${id}`,
  version: 1
})).data
