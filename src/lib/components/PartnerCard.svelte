<script lang="ts">
  import Button from "./Button.svelte";

  interface Props {
    title: string;
    description: string;
    features: string[];
    icon: string;
    link: string;
  }

  const { title, description, features, icon, link } = $props();
</script>

<div class="bg-white border-2 border-yellow-200 rounded-xl overflow-hidden hover:border-yellow-300 hover:shadow-lg transition-all duration-300 group">
  <!-- Header -->
  <div class="bg-gradient-to-r from-yellow-50 to-blue-50 p-6 sm:p-8 border-b border-yellow-200">
    <div class="text-5xl sm:text-6xl mb-3">{icon}</div>
    <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
      {title}
    </h3>
    <p class="text-gray-700 text-sm sm:text-base">
      {description}
    </p>
  </div>

  <!-- Features -->
  <div class="p-6 sm:p-8">
    <h4 class="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
      ✓ Inclus
    </h4>
    <ul class="space-y-3 mb-8">
      {#each features as feature (feature)}
        <li class="flex items-start gap-3 text-sm sm:text-base text-gray-700">
          <span class="text-yellow-500 font-bold flex-shrink-0 mt-0.5">✓</span>
          <span>{feature}</span>
        </li>
      {/each}
    </ul>

    <!-- CTA -->
    <a href={link} class="block">
      <Button variant="primary" class="w-full">
        En Savoir Plus →
      </Button>
    </a>
  </div>
</div>
