import { Post } from 'src/interfaces'
import { SchemaJsonLd } from 'src/interfaces/Post'
import getPostLink from './getPostLink'
import getPostSocialImage from './getPostSocialImage'
import safeJSONParse from './safeJSONParse'

export default (post: Post) => {
  if (!post) return ''

  const { schemaJsonLd } = post.metadata
  const schema = safeJSONParse<SchemaJsonLd, Partial<SchemaJsonLd>>(
    schemaJsonLd || '{}',
    {}
  )

  if (!schema.mainEntityOfPage) return

  schema.mainEntityOfPage['@id'] = window.location.origin + getPostLink(post)
  schema.url = window.location.origin + getPostLink(post)
  schema.image = schema.image?.filter(
    (e) => !e.startsWith('https://habr.com/share/publication')
  )
  schema.image?.unshift(getPostSocialImage(post))

  return JSON.stringify(schema)
}
