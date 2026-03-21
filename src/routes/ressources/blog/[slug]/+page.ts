import { error } from '@sveltejs/kit'

const posts = import.meta.glob('/src/content/blog/*.md')

export async function load({ params }) {
  const post: any = await posts[`/src/content/blog/${params.slug}.md`]?.()
  if (!post) {
    return error(404, "Cette publication n'existe pas ou a été supprimée")
  }
  return { 
    post,
    metadata: post.metadata || {}
  }
}