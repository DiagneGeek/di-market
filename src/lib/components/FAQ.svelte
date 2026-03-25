<script lang="ts">
	interface FAQItem {
		question: string;
		answer: string;
	}

	interface Props {
		items: FAQItem[];
	}

	let { items }: Props = $props();

	let openedIndex = $state<number | null>(null);

	const toggle = (index: number) => {
		openedIndex = openedIndex === index ? null : index;
	};
</script>

<div class="w-full max-w-3xl mx-auto space-y-4">
	{#each items as item, index}
		<div
			class="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md"
		>
			<button
				onclick={() => toggle(index)}
				class="w-full flex items-center justify-between p-5 sm:p-6 bg-white hover:bg-gray-50 transition-colors duration-200"
			>
				<h3 class="text-left font-semibold text-gray-900 text-base sm:text-lg flex-1">
					{item.question}
				</h3>
				<svg
					class="w-5 h-5 text-primary flex-shrink-0 ml-4 transition-transform duration-300 {openedIndex ===
					index
						? 'rotate-180'
						: ''}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</button>

			{#if openedIndex === index}
				<div
					class="border-t border-gray-200 bg-gray-50 p-5 sm:p-6 animate-fadeIn text-gray-700 text-sm sm:text-base leading-relaxed"
				>
					{item.answer}
				</div>
			{/if}
		</div>
	{/each}
</div>
