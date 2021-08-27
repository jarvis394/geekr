import { Post } from 'src/interfaces'
import { SchemaJsonLd } from 'src/interfaces/Post'
import getPostLink from './getPostLink'
import getPostSocialImage from './getPostSocialImage'
import safeJSONParse from './safeJSONParse'

export default (post: Post) => {
  if (!post) return ''

  const { schemaJsonLd } = post.metadata
  const schema = safeJSONParse<SchemaJsonLd, Partial<SchemaJsonLd>>(schemaJsonLd, {})
  schema.mainEntityOfPage['@id'] = process.env.PUBLIC_URL + getPostLink(post)
  schema.url = process.env.PUBLIC_URL + getPostLink(post)
  schema.image = schema.image.filter(
    (e) => !e.startsWith('https://habr.com/share/publication')
  )
  schema.image.unshift(getPostSocialImage(post))

  return JSON.stringify(schema)
}
