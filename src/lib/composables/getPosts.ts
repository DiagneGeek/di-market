const modules = import.meta.glob('/src/content/blog/*.md', { eager: true })

export function getPosts() {
  return Object.entries(modules)
      .map(([path, post] : [string, any]) => {
        if (!path) return null
        const slug = path ? path?.split('/')?.pop().replace('.md', '') : ""

        return {
            slug,
            ...post.metadata
        }
    })
    .filter((post: any) => post != null)
    .sort((a: { date: string }, b: { date: string }) => parseInt(new Date(b.date).toISOString()) - parseInt(new Date(a.date).toISOString()))
}