<script lang="ts">
  import Button from "$lib/components/Button.svelte";

  interface Props {
    title: string;
    subtitle: string;
    ctaLabel?: string;
    ctaHref?: string;
  }

  const { title, subtitle, ctaLabel = "Devenir Partenaire", ctaHref = "/partenaires/communautés" } = $props();
</script>

<div class="min-h-[60vh] sm:min-h-[70vh] relative w-full flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden border-b-4 border-yellow-300 my-6 sm:my-8">
  <div class="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50 rounded-2xl sm:rounded-3xl"></div>
  <div class="absolute inset-0 rounded-xl ring-1 ring-yellow-200/50"></div>
  
  <div class="relative z-10 text-center max-w-3xl px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
      {title}
    </h1>
    <p class="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed">
      {subtitle}
    </p>
    <a href={ctaHref}>
      <Button size="md" variant="primary" class="text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4">
        {ctaLabel}
      </Button>
    </a>
  </div>
  
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-back-main to-transparent"></div>
</div>
