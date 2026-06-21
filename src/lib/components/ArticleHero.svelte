<script lang="ts">
	interface Props {
		title: string;
    subtitle?: string;
		description?: string;
		date?: string;
		image: string;
	}

	const { title, subtitle = undefined, date = undefined, image }: Props = $props();

	// Format date in a SEO-friendly way (e.g., "6 March 2026")
	function formatDate(dateStr: string): string {
		const dateObj = new Date(dateStr);
		return dateObj.toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div
	class="relative mx-[-16px] overflow-hidden bg-gradient-to-tr from-secondary/20 via-secondary/20 to-primary/10 px-4 py-12 sm:px-6 lg:px-8"
>
	<div class="mx-auto max-w-7xl">
		<div class="flex flex-col items-center gap-4 md:flex-row">
			<div>
				<!-- Title -->
				<h1 class="font-fraunces text-4xl leading-tight font-bold text-slate-900 sm:text-5xl">
					{title}
				</h1>
        {#if subtitle}
          <p class="text-xl text-gray-800">{subtitle}</p>
        {/if}
				<!-- Metadata Footer -->
				<div class="border-t border-slate-200 pt-4">
					<div class="flex flex-wrap gap-6 text-sm text-slate-500">
						<div>
							{#if date}
								<span class="font-semibold text-slate-700">Date de publication:</span>
								{formatDate(date)}
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Image Section -->
			<div
				class="hover:shadow-3xl aspect-video overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 lg:aspect-auto"
			>
				<img
					src={image}
					alt={title}
					class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		/* Ensure smooth transitions */
	}
</style>
