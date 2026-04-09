<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let countdown = 25;

	onMount(() => {
		const interval = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(interval);
				goto('/vendeurs/dashboard');
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="success-container">
	<div class="success-card">
		<div class="success-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="80"
				height="80"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12" />
			</svg>
		</div>

		<h1>Paiement réussi!</h1>
		<p class="subtitle">Votre abonnement a été activé avec succès</p>

		<div class="details">
			<p>Merci pour votre confiance. Vous pouvez maintenant accéder à tous les avantages de votre plan d'abonnement.</p>
		</div>

		<div class="redirect-info">
			<p>Redirection vers le tableau de bord dans <strong>{countdown}s</strong></p>
		</div>

		<button class="btn-primary" on:click={() => goto('/vendeurs/dashboard')}>
			Aller au tableau de bord
		</button>
	</div>
</div>

<style>
	.success-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
        border-radius: 12px;
	}

	.success-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		padding: 60px 40px;
		text-align: center;
		max-width: 500px;
		animation: slideUp 0.6s ease-out;
	}

	.success-icon {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		color: #10b981;
		animation: scaleIn 0.6s ease-out;
	}

	h1 {
		font-size: 32px;
		color: #1f2937;
		margin-bottom: 10px;
		font-weight: 700;
	}

	.subtitle {
		font-size: 16px;
		color: #6b7280;
		margin-bottom: 30px;
	}

	.details {
		background: #f3f4f6;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;
		line-height: 1.6;
		color: #374151;
	}

	.redirect-info {
		margin-bottom: 30px;
		color: #6b7280;
		font-size: 14px;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 12px 40px;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
	}

	.btn-primary:active {
		transform: translateY(0);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
