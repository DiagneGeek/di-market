import { error } from '@sveltejs/kit'

const tutorials = import.meta.glob('/src/content/tutoriels/*.md')

export async function load({ params }) {
  const tutorial: any = await tutorials[`/src/content/tutoriels/${params.slug}.md`]?.()
  if (!tutorial) {
    return error(404, "Ce tutoriel n'existe pas ou a été supprimé")
  }
  return { 
    post: tutorial,
    metadata: tutorial.metadata || {}
  }
}
