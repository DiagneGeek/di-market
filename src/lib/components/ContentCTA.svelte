<script lang="ts">
    import Section from "$lib/components/Section.svelte"
    import Button from "$lib/components/Button.svelte"
    const { 
        title = "Vous n’avez <span class='text-red-400'>pas encore</span> de compte DiMarket ?", 
        description = "<b>Quel dommage</b> ! DiMarket vous permettrez de gagner tellement de temps. Vous n'aurez même plus besoin d'ouvrir WhatsApp. <br>Vous ne nous croyez pas ? Essayez pour voir.", 
        ctaText = "Essayer DiMarket", 
        ctaLink = "/vendeurs/dashboard"} = $props();
</script>

<Section 
  isForLanding={true}
  class="rounded-2xl shadow-4 bg-gradient-to-r from-primary/10 to-secondary/40 py-15">
 <div class="max-w-2xl mx-auto px-4 text-center">
   	<h2 
      class="text-white text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
      {@html title}
 </h2>
   	<p class="text-gray text-left mx-auto mb-8 leading-relaxed">
      {@html description}
   	</p>

   <a href={ctaLink}>
    <Button 
      size="lg"
    >
     {ctaText}
    </Button>
   </a>
 </div>
</Section>
