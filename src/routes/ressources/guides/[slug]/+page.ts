import { error } from '@sveltejs/kit'

const guides = import.meta.glob('/src/content/guides/*.md')

export async function load({ params }) {
  const guide: any = await guides[`/src/content/guides/${params.slug}.md`]?.()
  if (!guide) {
    return error(404, "Ce guide n'existe pas ou a été supprimé")
  }
  return { 
    post: guide,
    metadata: guide.metadata || {}
  }
}
