<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		children?: any;
		class?: string;
		center?: boolean;
		toDark?: boolean;
	}

	let { children, class: _class = '', toDark = false }: Props = $props();

	let element: HTMLElement | null = null;
	let isVisible = $state(false);

	onMount(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						if (toDark) {
							document.body.style.background = 'var(--color-back-dark)';
						}
					} else {
						isVisible = false;
						if (toDark) {
							document.body.style.background = 'var(--color-back-main)';
						}
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: "-50% 0px -40% 0px"
			}
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={element}
	class={`${_class} transition-all duration-700 ${
		isVisible
			? 'scale-110 opacity-100 translate-y-0'
			: 'scale-80 opacity-60 translate-y-2 bg-transparent'
	} px-4 py-3 rounded-lg`}
>
	{@render children?.()}
</div>
