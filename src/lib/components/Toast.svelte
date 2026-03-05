<script lang="ts">
    import { useToast } from '$lib/composables/useToast'
	type ToastType = 'success' | 'error' | 'warning' | 'info';

	interface ToastMessage {
		id: string;
		message: string;
		type: ToastType;
		duration?: number;
	}

	let toasts: ToastMessage[] = $state([]);

	const typeStyles: Record<ToastType, string> = {
		success: 'bg-green-50 border-l-4 border-green-500 text-green-700',
		error: 'bg-red-50 border-l-4 border-red-500 text-red-800',
		warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800',
		info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-800'
	};

	const typeIcons: Record<ToastType, string> = {
		success: '✓',
		error: '✕',
		warning: '⚠',
		info: 'ℹ'
	};

	export function showToast(message: string, type: ToastType = 'info', duration: number = 3000) {
		const id = Math.random().toString(36);
		const toast: ToastMessage = { id, message, type, duration };

		toasts = [...toasts, toast];

		if (duration) {
			setTimeout(() => {
				removeToast(id);
			}, duration);
		}
	}

	function removeToast(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}

    useToast.init(showToast as (message: string, type?: string, duration?: number) => void)
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-md">
	{#each toasts as toast (toast.id)}
		<div
			class="rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-auto {typeStyles[
				toast.type
			]}"
			role="status"
			aria-live="polite"
		>
			<div class="flex items-center gap-3">
				<span class="text-xl font-bold flex-shrink-0">{typeIcons[toast.type]}</span>
				<p class="text-sm font-medium flex-1">{toast.message}</p>
				<button
					onclick={() => removeToast(toast.id)}
					class="text-lg font-bold opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
					aria-label="Close toast"
				>
					×
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	@keyframes slideInFromRight {
		from {
			transform: translateX(400px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	:global(.animate-in) {
		animation: slideInFromRight 0.3s ease-out;
	}
</style>
