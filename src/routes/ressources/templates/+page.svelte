<script>
  import TemplateCard from '$lib/components/TemplateCard.svelte';
  import Hero from "$lib/components/Hero.svelte"
  import Input from "$lib/components/Input.svelte"
  import Button from "$lib/components/Button.svelte"

  export let data;

  function handleEditTemplate() {
      console.log('Edit mode activated');
  }
 </script>

 <Hero>
  <h1>
   <span class="bg-secondary">Copiez</span><br>
   <span class="bg-gradient-tr from-primary/10 to-purple-400">Collez</span><br>
   <span class="bg-primary">Gagnez !</span>
  </h1>

  <p>Pour vendre ou convaincre, vous aurez forcément besoin de communiquer, que vous soyez vendeur ou partenaire. Nous vous facilitons la tâche avec nos scripts qui suivent des lois précis pour convaincre et instaurer la confiance</p>
 </Hero>


 <!-- ======== Search Bar ========= -->
 <div class="flex flex-col items-center gap-2 w-full mx-auto mb-2 max-w-[500px]">
  <div class="flex items-center gap-2">
    <Input 
      type="search"
      placeholder="Rechercher..."
    />
    <Button>
      Rechercher
    </Button>
  </div>

  <div class="overflow-x-auto rounded-full flex items-center max-w-[90%] gap-2 py-2">
     {#each ["Tout", "Affliers", "Vendeurs", "Poste", "Facebook"] as tag}
       <Button
         size="sm"
         variant="neutral"
        >
          {tag}
        </Button>
     {/each}
  </div>
</div>

<section class="mx-auto p-4 flex gap-4 flex-wrap">
  {#each data.templates as template (template.id)}
    <TemplateCard
        context={template.context}
        message={template.content}
        insight={template.effect}
        tags={template.tags}
    />
  {/each}
</section>