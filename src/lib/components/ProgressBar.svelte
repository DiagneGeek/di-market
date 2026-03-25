<script lang="ts">
	interface Props {
		percentage: number;
		showLabel?: boolean;
		animate?: boolean;
		height?: string;
		color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
	}

	let {
		percentage,
		showLabel = true,
		animate = true,
		height = 'h-4',
		color = 'primary'
	}: Props = $props();

	const colorMap = {
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		danger: 'bg-red-500'
	};

	const colorClass = colorMap[color];
	const displayPercentage = Math.min(Math.max(percentage, 0), 100);
</script>

<div class="w-full">
	<div class={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
		<div
			class={`h-full ${colorClass} rounded-full transition-all duration-500 ${
				animate ? 'ease-out' : 'ease-linear'
			}`}
			style="width: {displayPercentage}%"
		>
			<div class="h-full bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
		</div>
	</div>
	{#if showLabel}
		<div class="mt-2 text-center text-sm font-semibold text-gray-700">
			{displayPercentage.toFixed(0)}%
		</div>
	{/if}
</div>
