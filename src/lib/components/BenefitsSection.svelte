<script lang="ts">
  interface Benefit {
    icon: string;
    title: string;
    description: string;
  }

  interface Props {
    benefits: Benefit[];
    title?: string;
  }

  const { benefits, title = "Pourquoi Devenir Partenaire ?" } = $props();
</script>

<section class="my-16 sm:my-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900">
      {title}
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {#each benefits as benefit (benefit.title)}
        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div class="text-4xl sm:text-5xl mb-4">{benefit.icon}</div>
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {benefit.title}
          </h3>
          <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
            {benefit.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
