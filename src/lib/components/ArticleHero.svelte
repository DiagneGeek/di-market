<script lang="ts">
  interface Props {
    title: string
    description?: string
    date: string
    image: string
  }

  const { title, date, image }: Props = $props()

  // Format date in a SEO-friendly way (e.g., "6 March 2026")
  function formatDate(dateStr: string): string {
    const dateObj = new Date(dateStr)
    return dateObj.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
</script>

<div class="relative bg-gradient-to-tr from-secondary/20 via-secondary/20 to-primary/10 mx-[-16px] overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Image Section -->
      <div class="order-2 lg:order-1">
        <div class="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 aspect-video lg:aspect-auto">
          <img
            src={image}
            alt={title}
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl font-fraunces font-bold text-slate-900 leading-tight">
          {title}
        </h1>

        <!-- Metadata Footer -->
        <div class="pt-4 border-t border-slate-200">
          <div class="flex flex-wrap gap-6 text-sm text-slate-500">
            <div>
              <span class="font-semibold text-slate-700">Date de publication:</span> {formatDate(date)}
            </div>
          
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    /* Ensure smooth transitions */
  }
</style>
