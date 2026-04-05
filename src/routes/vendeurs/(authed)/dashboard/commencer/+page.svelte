<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { useToast } from '$lib/composables/useToast';
	import { confetti } from '@neoconfetti/svelte';

	interface PageData {
		user: any;
		productCount: number;
		progress: number;
		productsNeeded: number;
		setupComplete: boolean;
		setupRequired: boolean;
	}

	let { data }: { data: PageData } = $props();

	const productCount = data.productCount;
	const progress = data.progress;
	const productsNeeded = data.productsNeeded;
	const toast = useToast();

	const stepsCompleted = {
		accountCreated: true,
		storeCreated: true,
		firstProduct: productCount >= 1,
		threeProducts: productCount >= 3,
		shareStore: false
	};

	const allStepsComplete = productCount >= 3;

	let isRedirecting = $state(false);
	let showCelebration = $state(false);
	let showMilestonePopup = $state(false);
	let milestoneMessage = $state('');
	let prevProductCount = $state(0);
	let confettiContainer: HTMLDivElement | null = $state(null);

	// Collection setup form state
	let collectionName = $state(data.user?.name || '');
	let password = $state('');
	let confirmPassword = $state('');
	let isSubmittingSetup = $state(false);
	let setupError = $state('');
	let setupSuccess = $state(false);

	function addProduct() {
		isRedirecting = true;
		goto('/vendeurs/dashboard/produits/ajouter?setup=true');
	}

	async function handleCollectionSetup() {
		try {
			isSubmittingSetup = true;
			setupError = '';
			setupSuccess = false;

			// Validation
			if (!collectionName || collectionName.trim().length < 3) {
				setupError = 'Le nom doit contenir au moins 3 caractères';
				return;
			}

			if (!password || password.length < 6) {
				setupError = 'Le mot de passe doit contenir au least 6 caractères';
				return;
			}

			if (password !== confirmPassword) {
				setupError = 'Les mots de passe ne correspondent pas';
				return;
			}

			// Call API to save collection name and password
			const response = await fetch('/api/auth/setup-collection', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: collectionName,
					password: password
				})
			});

			const result = await response.json();

			if (!response.ok) {
				setupError = result.error || 'Une erreur est survenue';
				return;
			}

			setupSuccess = true;
			toast.show('Votre collection est configurée avec succès!', 'success', 3000);
			
			// Redirect after success
			setTimeout(() => {
				goto('/vendeurs/dashboard');
			}, 1500);
		} catch (error) {
			console.error('Setup error:', error);
			setupError = 'Une erreur est survenue. Veuillez réessayer.';
		} finally {
			isSubmittingSetup = false;
		}
	}
	$effect(() => {
		// First product added!
		if (productCount === 1 && prevProductCount === 0) {
			milestoneMessage = '🔥 Votre premier produit est en ligne !';
			showMilestonePopup = true;
			// Trigger confetti after a slight delay to ensure DOM is ready
			setTimeout(() => {
				if (confettiContainer) {
					try {
						confetti(confettiContainer);
					} catch (e) {
						console.log('Confetti animation skipped');
					}
				}
			}, 100);
			toast.show('Bravo ! Votre boutique est maintenant visible', 'success', 4000);
			setTimeout(() => {
				showMilestonePopup = false;
			}, 3500);
		}
		// Second product added!
		else if (productCount === 2 && prevProductCount === 1) {
			milestoneMessage = '💪 Deux produits ! Vous êtes en lancée !';
			showMilestonePopup = true;
			setTimeout(() => {
				if (confettiContainer) {
					try {
						confetti(confettiContainer);
					} catch (e) {
						console.log('Confetti animation skipped');
					}
				}
			}, 100);
			toast.show('Excellent ! Vous êtes presque au but', 'success', 4000);
			setTimeout(() => {
				showMilestonePopup = false;
			}, 3500);
		}
		// All 3 products added!
		else if (productCount === 3 && prevProductCount === 2) {
			milestoneMessage = '🎉 Produits ajoutés ! Prochaine étape → Sécuriser votre compte';
			showMilestonePopup = true;
			setTimeout(() => {
				if (confettiContainer) {
					try {
						confetti(confettiContainer);
					} catch (e) {
						console.log('Confetti animation skipped');
					}
				}
			}, 100);
			toast.show('🎊 Excellent ! Maintenant sécurisez votre compte', 'success', 5000);
			setTimeout(() => {
				showMilestonePopup = false;
			}, 4000);
		}

		prevProductCount = productCount;
	});

	// Auto-refresh progress every 2 seconds while on this page
	$effect(() => {
		const interval = setInterval(async () => {
			await invalidateAll();
		}, 2000);

		return () => clearInterval(interval);
	});
</script>

<!-- Milestone Popup Modal -->
{#if showMilestonePopup}
	<div class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
		<div
			class="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md mx-4 animate-scale-in"
			style="border: 2px solid var(--color-secondary);"
		>
			<p class="text-6xl mb-6">✨</p>
			<p class="text-3xl font-bold mb-4" style="color: var(--color-heading);">
				{milestoneMessage}
			</p>
			<p class="text-base" style="color: var(--color-gray); margin-bottom: 1.5rem;">
				Vous êtes incroyable ! Continuez comme ça.
			</p>
			<div class="h-1 rounded-full mb-4" style="background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));"></div>
		</div>
	</div>
{/if}

<!-- Confetti container -->
<div bind:this={confettiContainer} class="fixed inset-0 pointer-events-none z-50"></div>

<div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style="background-color: var(--color-back-main);">
	<!-- Main Container -->
	<div class="max-w-2xl mx-auto">
		<!-- Hero Section -->
		<div class="text-center mb-16 animate-fade-in">
			<h1 class="text-5xl sm:text-6xl font-bold mb-4" style="color: var(--color-heading);">
				{productCount === 0 ? 'Démarrez votre collection' : productCount === 3 ? 'Presque fini ! ✨' : 'Vous progressez bien !'}
			</h1>
			<p class="text-lg" style="color: var(--color-gray);">
				{productCount === 0
					? 'Ajoutez vos premiers produits et laissez les acheteurs vous découvrir'
					: productCount === 3 
						? 'Sécurisez votre compte avec un nom et un mot de passe'
						: `${3 - productCount} produit${3 - productCount > 1 ? 's' : ''} restant${3 - productCount > 1 ? 's' : ''}`}
			</p>
		</div>

		<!-- Progress Section -->
		<div class="mb-16 animate-fade-in" style="animation-delay: 100ms;">
			<!-- Progress Percentage -->
			<div class="flex items-baseline justify-between mb-6">
				<h2 class="text-lg font-bold" style="color: var(--color-heading);">Étapes de lancement</h2>
				<div class="text-right">
					<span class="text-4xl font-black transition-all duration-300" style="color: var(--color-secondary);">
						{progress}%
					</span>
				</div>
			</div>

			<!-- Progress Bar with Brand Colors -->
			<div class="w-full rounded-full h-3 overflow-hidden transition-all duration-700" style="background-color: var(--color-card); border: 1px solid var(--color-card);">
				<div
					class="h-full transition-all duration-700 ease-out"
					style="width: {progress}%; background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));"
				></div>
			</div>

			<!-- Progress Steps Visual -->
			<div class="flex justify-between mt-6">
				{#each [
					{ num: 1, label: 'Début', done: productCount >= 0 },
					{ num: 2, label: 'Produit 1', done: productCount >= 1 },
					{ num: 3, label: 'Produit 2', done: productCount >= 2 },
					{ num: 4, label: 'Produit 3', done: productCount >= 3 },
					{ num: 5, label: 'Sécurisé', done: data.user.name && data.user.password }
				] as step (step.num)}
					<div class="flex flex-col items-center animate-fade-in" style="animation-delay: {step.num * 50}ms;">
						<div
							class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 transform hover:scale-110"
							style="
								background-color: {step.done ? 'var(--color-secondary)' : 'var(--color-card)'};
								color: {step.done ? 'white' : 'var(--color-heading)'};
								border: 2px solid {step.done ? 'var(--color-secondary)' : 'var(--color-card)'};
							"
						>
							{step.done ? '✓' : step.num}
						</div>
						<p class="text-xs mt-2 text-center" style="color: var(--color-gray);">
							{step.label}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Current Status Card -->
		{#if productCount === 0}
			<div class="rounded-2xl p-8 mb-12 animate-fade-in border-2" style="background-color: var(--color-card); border-color: var(--color-primary); animation-delay: 200ms;">
				<h3 class="text-2xl font-bold mb-3" style="color: var(--color-heading);">Prêt à lancer ?</h3>
				<p class="mb-2" style="color: var(--color-gray);">
					Votre boutique est prête à accueillir vos produits. Plus vous en ajoutez, plus vous serez visible.
				</p>
				<p class="text-sm" style="color: var(--color-gray);">
					💡 Conseil : Commencez avec vos 3 meilleurs produits pour faire une bonne première impression.
				</p>
			</div>
		{:else if productCount === 1}
			<div class="rounded-2xl p-8 mb-12 animate-fade-in border-2 animate-pulse-glow" style="background-color: var(--color-card); border-color: var(--color-secondary); animation-delay: 200ms;">
				<h3 class="text-2xl font-bold mb-3" style="color: var(--color-secondary);">🔥 Vous êtes en ligne !</h3>
				<p class="mb-4" style="color: var(--color-gray);">
					Votre premier produit est publié. Votre collection existe maintenant et les acheteurs peuvent vous trouver.
				</p>
				<a href="/collections/{data.user.id}">
					<Button variant="sober">Voir votre collection en direct</Button>
				</a>
			</div>
		{:else if productCount === 2}
			<div class="rounded-2xl p-8 mb-12 animate-fade-in border-2" style="background-color: var(--color-card); border-color: var(--color-secondary); animation-delay: 200ms;">
				<h3 class="text-2xl font-bold mb-3" style="color: var(--color-heading);">Presque arrivé ! 💪</h3>
				<p style="color: var(--color-gray);">
					Un seul produit de plus. Votre collection sera alors À PLEINE VISIBILITÉ.
				</p>
			</div>
		{:else if productCount === 3}
			<!-- Show setup form for collection name and password -->
			{#if !setupSuccess}
				<div class="rounded-2xl p-8 mb-12 animate-fade-in border-2" style="background-color: var(--color-secondary); border-color: var(--color-secondary); animation-delay: 200ms;">
					<h3 class="text-2xl font-bold mb-3" style="color: white;">✨ Collection complète !</h3>
					<p class="mb-6" style="color: white;">
						Votre boutique a 3 produits 🎉 Maintenant, sécurisez votre compte avec un nom et un mot de passe.
					</p>

					<div class="space-y-4">
						<!-- Collection Name Input -->
						<div>
							<Input
								type="text"
								minlength="3"
								placeholder="Ex: Boutique Amina, Vêtements Chic..."
								label="Nom de votre Collection"
								bind:value={collectionName}
								class="w-full"
								required
							/>
							<p class="text-xs mt-2" style="color: rgba(255,255,255,0.8);">
								💡 Utilisez un nom que vos clients reconnaîtront
							</p>
						</div>

						<!-- Password Input -->
						<div>
							<Input
								type="password"
								placeholder="Minimum 6 caractères"
								minlength="6"
								maxlength="20"
								label="Mot de passe"
								bind:value={password}
								class="w-full"
								required
							/>
							<p class="text-xs mt-2" style="color: rgba(255,255,255,0.8);">
								🔒 Gardez-le secret et compliqué
							</p>
						</div>

						<!-- Confirm Password Input -->
						<div>
							<Input
								type="password"
								placeholder="Confirmez votre mot de passe"
								minlength="6"
								maxlength="20"
								label="Confirmez le mot de passe"
								bind:value={confirmPassword}
								class="w-full"
								required
							/>
						</div>

						<!-- Error Message -->
						{#if setupError}
							<p class="text-red-200 text-sm font-medium bg-red-900/30 px-4 py-3 rounded-lg w-full text-center">
								❌ {setupError}
							</p>
						{/if}

						<!-- Submit Button -->
						<Button
							onclick={handleCollectionSetup}
							disabled={isSubmittingSetup}
							class="w-full text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
							style="
								background-color: rgba(0, 0, 0, 0.2);
								opacity: {isSubmittingSetup ? 0.7 : 1};
							"
							label={isSubmittingSetup ? 'Configuration en cours...' : 'Sécuriser mon compte'}
						/>
					</div>
				</div>
			{:else}
				<!-- Success Message -->
				<div class="rounded-2xl p-8 mb-12 animate-fade-in border-2" style="background-color: var(--color-secondary); border-color: var(--color-secondary);">
					<h3 class="text-2xl font-bold mb-3" style="color: white;">✅ Accès sécurisé !</h3>
					<p style="color: white;">
						Votre collection est configurée et prête à l'emploi. Redirection en cours...
					</p>
				</div>
			{/if}
		{/if}

		<!-- Action Button -->
		{#if productCount < 3}
			<div class="rounded-2xl p-8 border-2 text-center animate-fade-in" style="border-color: var(--color-secondary); background-color: rgba(242, 235, 205, 0.3); animation-delay: 300ms;">
				<h3 class="text-xl font-bold mb-2" style="color: var(--color-heading);">
					{productCount === 0 ? 'Ajouter le 1er produit' : `Ajouter le produit n°${productCount + 1}`}
				</h3>
				<p class="mb-6 text-sm" style="color: var(--color-gray);">
					{productCount === 0
						? 'Choisissez votre meilleur produit pour faire une excellente première impression'
						: 'Un peu plus et vous aurez une belle collection'}
				</p>
				<Button 
					onclick={addProduct}
					disabled={isRedirecting}
					class="w-full transition-all duration-200 transform hover:scale-105 active:scale-95"
					style="
						background-color: var(--color-secondary);
						color: white;
						border: none;
						opacity: {isRedirecting ? 0.7 : 1};
					"
				>
					{isRedirecting ? 'Redirection...' : '+ Ajouter un produit'}
				</Button>
			</div>
		{/if}

		<!-- Additional Info -->
		{#if productCount < 3}
			<div class="mt-8 text-center text-sm animate-fade-in" style="color: var(--color-gray); animation-delay: 400ms;">
				<p>
					<strong>Produits ajoutés :</strong>
					<span style="color: var(--color-secondary); font-size: 1.25rem; font-weight: bold;">
						{productCount}
					</span>
					/ 3
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes pulseGlow {
		0%, 100% {
			box-shadow: 0 0 0 0 rgba(196, 165, 97, 0.7);
		}
		50% {
			box-shadow: 0 0 0 10px rgba(196, 165, 97, 0);
		}
	}

	:global(.animate-fade-in) {
		animation: fadeIn 0.6s ease-out forwards;
		opacity: 0;
	}

	:global(.animate-scale-in) {
		animation: scaleIn 0.4s ease-out;
	}

	:global(.animate-pulse-glow) {
		animation: pulseGlow 2s infinite;
	}
</style>
