<script lang="ts">
  interface Props {
    title: string;
    content: string;
  }

  const { title, content } = $props();
</script>

<section class="my-16 sm:my-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-gray-900">
      {title}
    </h2>
    
    <div class="bg-white border border-yellow-200 rounded-xl p-6 sm:p-10 shadow-sm">
      <div class="prose prose-sm sm:prose max-w-none">
        <p class="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
          {@html content}
        </p>
      </div>
    </div>
  </div>
</section>
