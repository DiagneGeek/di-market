<script lang="ts">
	import { useToast } from '$lib/composables/useToast';
	import Button from './Button.svelte';

	interface Props {
		context: string;
		message: string;
		insight: string;
		whatsappNumber?: string;
		booster?: 'Très utilisé' | 'Convertit bien' | 'Recommandé';
		tags: string[];
	}

	let {
		context,
		message,
		insight,
		whatsappNumber,
		booster,
		tags
	}: Props = $props();

	const toast = useToast();

	let isCopied = $state(false);
	let pressTimer: NodeJS.Timeout | null = null;
	let isPressing = $state(false);

	const boosterConfig = {
		"Très utilisé": { emoji: '🔥', label: 'Très utilisé' },
		"Convertit bien": { emoji: '📈', label: 'Convertit bien' },
		"Recommandé": { emoji: '⭐', label: 'Recommandé' }
	};

	function handleCopy() {
		const textToCopy = `${context}\n\n${message}`;
		navigator.clipboard.writeText(textToCopy);
		isCopied = true;
	    toast.show('Copié ✅', 'success', 2000);
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	function handleWhatsApp() {
		//if (!whatsappNumber) return;
		const text = encodeURIComponent(`${message}`);
		window.open(`https://wa.me?text=${text}`, '_blank');
	}

	function handleMouseDown() {
		isPressing = true;
		pressTimer = setTimeout(() => {
			if (isPressing) {
				handleCopy();
			}
	    },2500);
	}

	function handleMouseUp() {
		isPressing = false;
		if (pressTimer) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}
	}

	function handleTouchStart() {
		isPressing = true;
		pressTimer = setTimeout(() => {
			if (isPressing) {
				handleCopy();
			}
		}, 2500);
	}

	function handleTouchEnd() {
		isPressing = false;
		if (pressTimer) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}
	}
</script>

<!-- CARD CONTAINER -->
<div
	class="flex flex-col h-full max-w-[400px] p-6 rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1 border-slate-100"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	aria-label="Template card"
>
	<!-- BOOSTER BADGE (Optional) - Top Right -->
	{#if booster}
		<div class="mb-2 flex justify-end">
			<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/20 text-sm font-semibold text-t-main border border-secondary/50">
				{boosterConfig[booster]?.emoji}
				<span class="text-xs">{boosterConfig[booster]?.label}</span>
			</span>
		</div>
	{/if}

	<!-- CONTEXT SECTION - Secondary -->
	<div class="mb-2 pb-1 border-b border-gray-200">
		<h4 class="text-xs font-semibold uppercase text-gray-600 tracking-wide mb-2">Quand l'utiliser ?</h4>
		<p class="leading-relaxed max-w-none">{context}</p>
	</div>

	<!-- MESSAGE SECTION - Main Focus (70% attention) -->
	<div class="flex-1 mb-2 w-full">
		<p class="w-full font-fraunces text-base font-semibold text-t-main leading-relaxed max-w-none bg-gradient-to-r from-primary/5 to-secondary/10 p-4 rounded-xl border-l-2 border-primary italic whitespace-pre-wrap">
			{message}
		</p>
	</div>

	<!-- INSIGHT SECTION - Micro teaching -->
	<div class="mb-5 pb-5 border-b border-gray-200">
		<p class="text-sm text-gray-500 leading-relaxed max-w-none">
			<span class="mr-2">💡 effet:</span>
			{insight}
		</p>
	</div>

	<!-- ACTIONS SECTION - Bottom -->
	<div class="flex flex-wrap gap-2">
		<!-- Copy Button -->
		<Button
			variant={isCopied ? "sober" : "primary"}
			size="sm"
			onmousedown|stopPropagation
			onmouseup|stopPropagation
			ontouchstart|stopPropagation
			ontouchend|stopPropagation
			onclick={(e: Event) => {
				e.stopPropagation();
				handleCopy();
			}}
			class="flex items-center gap-2"
			label={isCopied ? "✅️ Copié" : "📑 Copier"}
	    />

		<!-- WhatsApp Button -->
		
			<Button
				variant="neutral"
				size="sm"
				onmousedown|stopPropagation
				onmouseup|stopPropagation
				ontouchstart|stopPropagation
				ontouchend|stopPropagation
				onclick={(e: Event) => {
					e.stopPropagation();
					handleWhatsApp();
				}}
				class="flex items-center gap-2"
			>
				💬 WhatsApp
			</Button>
	</div>
</div>

