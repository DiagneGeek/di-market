<script lang="ts">
  import ArticleHero from "$lib/components/ArticleHero.svelte";
  const { data } = $props();
</script>

<ArticleHero 
  title={data.metadata.title}
  description={data.metadata.description}
  date={data.metadata.date}
  image={data.metadata.image}
/>

<div class="max-w-4xl mx-auto px-4 py-12">
  <article class="prose prose-lg max-w-none">
    <data.post.default />
  </article>
</div>
