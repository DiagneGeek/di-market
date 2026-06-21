<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		slides: {
			title?: string;
			text?: string;
			image?: string;
			alt?: string;
		}[];
		format?: string,
		autoRotate?: boolean;
		autoRotateInterval?: number;
	}

	let { slides, autoRotate = true, autoRotateInterval = 5000, format = "vertical" }: Props = $props();

	let current = $state(0);
	let pauseRotate = $state(false)
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;

	const next = () => {
		current = (current + 1) % slides.length;
	};

	const prev = () => {
		current = (current - 1 + slides.length) % slides.length;
	};

	const goTo = (index: number) => {
		current = index;
		resetAutoplay();
	};

	const resetAutoplay = () => {
		if (autoplayTimer) clearInterval(autoplayTimer);
		if (autoRotate && !pauseRotate) {
			autoplayTimer = setInterval(next, autoRotateInterval);
		}
	};

	const pauseAutoplay = () => {
		pauseRotate = true;
		if (autoplayTimer) clearInterval(autoplayTimer);
	};

	const resumeAutoplay = () => {
		pauseRotate = false;
		resetAutoplay();
	};

	onMount(() => {
		if (autoRotate && !pauseRotate) {
			autoplayTimer = setInterval(next, autoRotateInterval);
		}
		return () => {
			if (autoplayTimer) clearInterval(autoplayTimer);
		};
	});
</script>

<div 
	class="relative {format === "vertical" ? "w-[300px] sm:w-[350px]" : "w-full max-w-2xl"} mx-auto"
	onmouseenter={pauseAutoplay}
	onmouseleave={resumeAutoplay}
	ontouchstart={pauseAutoplay}
	ontouchend={resumeAutoplay}
>
	<!-- Slides Container -->
	<div class="relative w-full h-[600px] sm:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
		{#each slides as slide, index}
			<div
				class="absolute inset-0 transition-opacity duration-500 {index === current
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<!-- Image -->
				{#if slide.image}
					<img
						src={slide.image}
						alt={slide.alt || 'Slide'}
						class="w-full h-full object-cover"
					/>
				{:else}
					<div class="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
						<svg
							class="w-24 h-24 text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				{/if}

				<!-- Text Overlay -->
				{#if slide.title || slide.text}
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
						{#if slide.title}
							<h3 class="text-xl sm:text-2xl font-bold mb-3"><span class="text-white">{slide.title}</span></h3>
						{/if}
						{#if slide.text}
							<p class="text-sm sm:text-base text-gray-200 leading-relaxed">{slide.text}</p>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Navigation Arrows -->
	<button
		onclick={() => {
			prev();
			resetAutoplay();
		}}
		class="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-dark rounded-full p-2 transition-all duration-200 hover:shadow-lg active:scale-95"
		aria-label="Previous slide"
	>
		<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>

	<button
		onclick={() => {
			next();
			resetAutoplay();
		}}
		class="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-dark rounded-full p-2 transition-all duration-200 hover:shadow-lg active:scale-95"
		aria-label="Next slide"
	>
		<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>

	<!-- Indicators -->
	<div class="flex justify-center gap-2 mt-6">
		{#each slides as _, index}
			<button
				onclick={() => goTo(index)}
				class="h-2 rounded-full transition-all duration-300 {index === current
					? 'bg-primary w-8'
					: 'bg-gray-300 w-2 hover:bg-gray-400'}"
				aria-label="Go to slide {index + 1}"
			/>
		{/each}
	</div>

	<!-- Slide Counter -->
	<div class="text-center mt-4 text-sm text-gray-600">
		{current + 1} / {slides.length}
	</div>
</div>
