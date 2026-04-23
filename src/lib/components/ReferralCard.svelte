<script lang="ts">
	interface Props {
		name: string;
		createdAt: string | Date;
		isPaid: boolean;
		ordersCount: number;
		planType?: string;
	}

	const { name, createdAt, isPaid, ordersCount, planType = 'FREE' } = $props();

	const formatDate = (date: string | Date) => {
		const d = new Date(date);
		return d.toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const getDaysAgo = (date: string | Date) => {
		const now = new Date();
		const d = new Date(date);
		const diffTime = Math.abs(now.getTime() - d.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};
</script>

<div
	class="bg-card rounded-2xl border border-gray-100/60 p-5 md:p-6 hover:border-gray-200/80 transition-all duration-300 hover:shadow-sm"
>
	<!-- Header: Name & Status Badge -->
	<div class="flex items-start justify-between gap-4 mb-4">
		<div class="flex-1">
			<h3 class="text-base md:text-lg font-semibold text-gray-900 leading-snug">{name}</h3>
			<p class="text-xs md:text-sm text-gray-500 mt-1">
				Inscrit il y a {getDaysAgo(createdAt)} jour{getDaysAgo(createdAt) > 1 ? 's' : ''}
			</p>
		</div>

		<!-- Status Badge -->
		<div
			class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium {isPaid
				? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
				: 'bg-gray-100 text-gray-600 border border-gray-200'}"
		>
			{isPaid ? '✓ Payant' : 'Gratuit'}
		</div>
	</div>

	<!-- Metadata -->
	<div class="space-y-3">
		<!-- Date Created -->
		<div class="flex items-center justify-between py-2 border-b border-gray-100/50">
			<p class="text-xs md:text-sm text-gray-600">Date d'inscription</p>
			<p class="text-xs md:text-sm font-medium text-gray-900">{formatDate(createdAt)}</p>
		</div>

		<!-- Plan Type -->
		<div class="flex items-center justify-between py-2 border-b border-gray-100/50">
			<p class="text-xs md:text-sm text-gray-600">Plan</p>
			<p
				class="text-xs md:text-sm font-medium {isPaid
					? 'text-emerald-600'
					: 'text-gray-600'}"
			>
				{isPaid ? 'Premium' : 'Gratuit'}
			</p>
		</div>

		<!-- Orders Count -->
		<div class="flex items-center justify-between py-2 pt-3">
			<p class="text-xs md:text-sm text-gray-600">Commandes</p>
			<div class="flex items-baseline gap-1">
				<p class="text-lg md:text-xl font-bold text-primary">{ordersCount}</p>
				<p class="text-xs text-gray-400">cmd{ordersCount !== 1 ? 's' : ''}</p>
			</div>
		</div>
	</div>
</div>
