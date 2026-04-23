<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		checked?: boolean;
		disabled?: boolean;
		name?: string;
		id?: string;
		size?: 'sm' | 'md' | 'lg';
		children?: Snippet;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		name,
		id,
		size = 'md',
		children,
		onchange
	}: Props = $props();

	const handleChange = () => {
		if (!disabled) {
			checked = !checked;
			onchange?.(checked);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			handleChange();
		}
	};
</script>


<div>
<!-- Hidden checkbox for form integration -->
<input type="hidden" {name} value={checked} />

<!-- Toggle button -->
 <div class="rounded-full border-1 border-gray overflow-hidden w-10 h-6 p-0 flex items-center bg-input">
<button
	{id}
	type="button"
	role="switch"
	aria-checked={checked}
	disabled={disabled}		
    aria-label={name || 'Toggle'}	
    class="bg-slate-100 toggle toggle-{size}"
	class:toggle--checked={checked}
	class:toggle--disabled={disabled}
	onclick={handleChange}
	onkeydown={handleKeyDown}
>
	<span class="toggle__slider"></span>
</button>
</div>

{#if children}
	<label for={id} class="toggle__label">
		{@render children()}
	</label>
{/if}
</div>

<style>
	/* Base toggle styles */
	.toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		border: none;
		cursor: pointer;
		padding: 0;
		border-radius: 9999px;
		transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		font-family: inherit;
        width: 100%;
		/* Focus visible styles */
		&:focus-visible {
			box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 2px rgba(59, 130, 246, 0.5);
		}
	}

	/* Disabled state */
	.toggle--disabled {
		opacity: 0.5;
		cursor: not-allowed;

		&:focus-visible {
			box-shadow: none;
		}
	}

	/* Slider */
	.toggle__slider {
		position: absolute;
		border-radius: 9999px;
		background-color: lightgray 
        ;
		transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.toggle__slider::after {
		content: '';
		position: absolute;
		border-radius: 9999px;
		background-color: white;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.toggle--checked .toggle__slider {
		background-color: var(--color-secondary);
	}

	/* Size variants */
	.toggle-sm {
		width: 44px;
		height: 24px;

		.toggle__slider {
			width: 20px;
			height: 20px;

			&::after {
				width: 16px;
				height: 16px;
			}
		}

		&.toggle--checked .toggle__slider {
			left: calc(100% - 20px);
		}
	}

	.toggle-md {
		width: 52px;
		height: 28px;

		.toggle__slider {
			width: 24px;
			height: 24px;

			&::after {
				width: 20px;
				height: 20px;
			}
		}

		&.toggle--checked .toggle__slider {
			left: calc(100% - 24px);
		}
	}

	.toggle-lg {
		width: 60px;
		height: 32px;

		.toggle__slider {
			width: 28px;
			height: 28px;

			&::after {
				width: 24px;
				height: 24px;
			}
		}

		&.toggle--checked .toggle__slider {
			left: calc(100% - 28px);
		}
	}

	/* Label */
	.toggle__label {
		margin-left: 2px;
		cursor: pointer;
		user-select: none;
		font-size: 14px;
		color: #374151;
		font-weight: 500;
	}

	@media (prefers-reduced-motion: reduce) {
		.toggle,
		.toggle__slider,
		.toggle__slider::after {
			transition: none;
		}
	}
</style>
