<script lang="ts">
  import Button from "./Button.svelte";

  interface Props {
    title: string;
    subtitle?: string;
    message: string;
    ctaLabel?: string;
    ctaHref?: string;
  }

  const { 
    title, 
    subtitle = "Prêt à rejoindre notre réseau?",
    message, 
    ctaLabel = "Commencer Maintenant",
    ctaHref = "https://wa.me/781878234?text=Salut%20DiMarket%2C%20je%20suis%20inté ressé%20par%20le%20programme%20d%27affiliation"
  } = $props();
</script>

<section class="my-16 sm:my-20 bg-gradient-to-r from-yellow-100 to-blue-50 rounded-2xl p-8 sm:p-12 border-2 border-yellow-300">
  <div class="max-w-2xl mx-auto text-center">
    <h2 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
      {title}
    </h2>
    {#if subtitle}
      <p class="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8">
        {subtitle}
      </p>
    {/if}
    <p class="text-gray-700 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
      {message}
    </p>
    <a href={ctaHref}>
      <Button size="md" variant="primary" class="text-base sm:text-lg px-8 sm:px-10">
        {ctaLabel}
      </Button>
    </a>
  </div>
</section>
