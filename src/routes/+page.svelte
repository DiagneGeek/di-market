<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import ScrollHighlight from '$lib/components/ScrollHighlight.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import DeliveryIllustration from '$lib/components/DeliveryIllustration.svelte';
	import Modal from '$lib/components/Modal.svelte';
    import Hero from "$lib/components/Hero.svelte"
	// State
	let phoneInput = $state('');
	let hoursPerDay = $state(2);
	let showPhoneModal = $state(false);

	// Calculate hours lost stats
	const calculateStats = (hours: number) => {
		const daily = hours;
		const weekly = hours * 5; // assuming 5 business days
		const monthly = weekly * 4;
		const yearly = monthly * 12;
		return { daily, weekly, monthly, yearly };
	};

	const stats = $derived(calculateStats(hoursPerDay));

	// Carousel slides data
	const carouselSlides = [
		{
			title: "Vous méritez mieux que ça",
			text: "Répondre aux mêmes questions chaque jour, gérer les commandes et les clients difficiles… je vous comprends, être vendeur, c'est épuisant.",
			image: "/landing/chat-without-dimarket.jpg",
			alt: "Seller discussing with buyer"
		},
		{
			title: "Juste un message, et voilà",
			text: "DiMarket transforme des dizaines de messages en un seul, centralisé et automatisé.",
			image: "/landing/chat-with-dimarket.jpg",
			alt: "Chat interface"
		},
		{
			title: "Des clients qui comprennent par eux-mêmes",
			text: "Vos clients n'auront plus besoin de vous embêter avec les mêmes questions. Ils verront tous vos produits avec toutes les informations dont ils ont besoin pour commander.",
			image: "/landing/collection-page.jpg",
			alt: "Product collection"
		},
		{
			title: "Gérez vos livraisons, pas les commandes",
			text: "Vous n'aurez plus à utiliser un carnet ou une application pour noter vos commandes. Les commandes s'organiseront automatiquement pour vous, donc vous ne gérez que la livraison.",
			image: "/landing/order-page.jpg",
			alt: "Orders management"
		}
	];

	// FAQ items
	const faqItems = [
		{
			question: "Combien coûte DiMarket ?",
			answer:
				"DiMarket offre un plan freemium avec des fonctionnalités de base gratuites, et des plans premium pour les vendeurs qui veulent plus de fonctionnalités avancées et un support prioritaire. Contactez-nous pour discuter du plan qui convient à votre commerce."
		},
		{
			question: "C'est disponible dans mon pays ?",
			answer:
				"Oui ! DiMarket est disponible dans plus de 50 pays africains, y compris le Sénégal, la Côte d'Ivoire, le Cameroun, le Ghana et bien d'autres. Consultez notre liste complète de pays supportés sur notre page de tarification."
		},
		{
			question: "Vous livrez vraiment partout ?",
			answer:
				"DiMarket n'est pas un service de livraison. DiMarket est une plateforme de gestion de commandes qui vous aide à recevoir et organiser les commandes. Vous pouvez offrir sur votre territoire ou avec vos propres arrangments de livraison. DiMarket organise simplement tout pour vous."
		},
		{
			question: "Combien de temps pour commencer ?",
			answer:
				"Vous pouvez créer votre première collection en moins de 5 minutes. Ajoutez vos produits, copiez le lien, partagez-le avec vos clients via Instagram, WhatsApp, ou Email, et les commandes commenceront à arriver organisées automatiquement."
		},
		{
			question: "Faut-il abandonner WhatsApp ou Instagram ?",
			answer:
				"Non ! DiMarket s'intègre parfaitement avec les plateformes que vous utilisez déjà. Partagez votre lien via WhatsApp, Instagram, Facebook ou Email. Vos clients passeront commande via DiMarket, et vous recevrez les commandes organisées. C'est plus simple pour tous."
		},
		{
			question: "Et si je n'aime pas ?",
			answer:
				"Vous pouvez annuler à tout moment sans engagement. Vos données restent vôtres. Mais nous sommes sûrs qu'une fois que vous verrez le temps que vous récupérez, vous ne voudrez plus revenir à l'ancienne méthode."
		}
	];

	const handlePhoneSubmit = async (e: Event) => {
		// In a real app, you'd send this to a backend
		console.log('Phone submitted:', phoneInput);
		showPhoneModal = false;
		phoneInput = '';
		return 'success';
	};
</script>

<section class="w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
	<!-- HERO SECTION -->
	{#snippet heroSection()}
		<Hero>

			<p class="mx-auto text-xs text-center h-full mb-4 border border-card bg-primary/50 py-2 rounded-full">
				<span class="scale-[2] h-full mr-2 animate-pulse inline-block">●</span>Fait UNIQUEMENT pour les vendeurs Africains
			</p>
			<!-- Card Questions -->
			<div
				class="px-8 max-w-[700px] grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4 mx-auto rounded-3xl bg-slate-50 border border-card shadow"
			>
				{#each ['💰 Le prix ?', '🔁 C\'est disponible ?', '📦 Vous livrez ? Quand ?'] as question}
						<p class="w-full text-left font-light text-gray-900">{question}</p>
				{/each}
			</div>
           <br><br>
			<!-- Title -->
			<h1 class="text-cente mb-6 leading-tight">
				<span class="font-fraunces">14 heures</span> perdues<br />
				<span class="font-fraunces bg-primary">chaque semaine</span> à répondre aux mêmes questions
			</h1>

			<!-- Subheading -->
			<p class="leading-relaxed mx-auto">
				Vos clients posent ces questions pour <strong>comprendre avant d'acheter</strong>. DiMarket
				permet à vos clients de <strong>passer commande… sans engager de discussions</strong>.
			</p>

			<!-- CTA Section -->
			<div class="bg-white rounded-2xl p-8 mb-12 max-w-md mx-auto">
				<div class="flex gap-1 flex-col">
					<Input
						bind:value={phoneInput}
						type="tel"
						placeholder="+221 77 123 45 67"
						class="flex-1"
					/>
					<Button
						variant="sober"
						label="Commencer"
						onclick={() => (showPhoneModal = true)}
					/>
				</div>
				<p class="text-xs text-gray-500 mt-2">
				Commencez gratuitement en quelques minutes
				</p>
			</div>

			<!-- Trust Badges -->
			<div class="flex flex-wrap justify-center gap-8 text-center">
				{#each [
					{ icon: '⏱️', text: '<strong class="font-fraunces text-lg">2 heures</strong><br> gagnées chaque jour' },
					{
						icon: '📋',
						text: '<strong class="font-fraunces text-lg">Gestion des commandes</strong><br> (plus besoin de noter)'
					},
					{ icon: '🌍', text: '<strong class="font-fraunces text-lg">Fait en Afrique</strong><br> pour l\'Afrique' }
				] as badge}
					<div class="flex items-center flex-col gap-2">
						<span class="">{badge.icon}</span>
						<p class="text-sm sm:text-base text-gray-700">
							{@html badge.text}
						</p>
					</div>
				{/each}
			</div>
		</Hero>

		<!-- Carousel Section -->
		<Section isForLanding={true} class="pb-20">
			<Carousel slides={carouselSlides} autoRotate={true} autoRotateInterval={6000} />
		</Section>
	{/snippet}

	<!-- INTRO SECTION with scroll highlights -->
	{#snippet introSection()}
		<Section id="intro" isForLanding={true} class="mx-[-16px] py-20">
			<h2 class="text-3xl font-bold text-center mb-4 text-gray-900">Votre vie <span class="font-fraunces opacity-70">en ce moment</span></h2>
			<p class="text-center text-gray-600 mb-12">
				Reconnaissez-vous cette situation ?
			</p>

			<div class="max-w-2xl mx-auto space-y-4 px-4">
				<ScrollHighlight>
					<p class="text-lg">
						Vous venez de finir une commande… et votre téléphone vibre déjà.
					</p>
				</ScrollHighlight>

				<ScrollHighlight>
					<p class="text-lg">
						Encore une question sur le prix, encore une sur la livraison.
					</p>
				</ScrollHighlight>

				<ScrollHighlight>
					<p class="text-lg">
						Vous tapez la réponse, puis la même question revient quelques minutes plus tard.
					</p>
				</ScrollHighlight>

				<ScrollHighlight>
					<p class="text-lg">
						Vos clients veulent juste comprendre, mais vous êtes coincé dans la boucle.
					</p>
				</ScrollHighlight>

				<ScrollHighlight>
					<p class="text-lg">
						Pendant ce temps, vos autres ventes attendent, vos heures s'évaporent.
					</p>
				</ScrollHighlight>
			</div>

			<!-- Solution Introduction -->
			<div class="mt-16 max-w-2xl mx-auto px-4">
				<div class="border-2 border-card rounded-2xl p-8">
					<h3 class="text-2xl font-bold text-gray-900 mb-4">Et si c'était différent ?</h3>
					<p class="text-md text-gray-700 mb-4 leading-relaxed">
						Imaginez un instant que vos clients trouvent
						<strong>toutes les réponses… sans vous déranger</strong>.
					</p>
					<p class="text-lg text-secondary leading-relaxed">
						<strong>DiMarket</strong> transforme ce problème
						en véritable force. 
					</p>
				</div>

				<!-- Outcome -->
				<div class="mt-8 space-y-4 text-center">
					<p class="font-semibold">
						✨ Vous n'avez plus à répéter, vous voyez juste les commandes arriver.
					</p>
					<p class="font-semibold">
						✨ Chaque client comprend, commande et tout est prêt à gérer.
					</p>
					<p class="font-semibold">
						✨ Vous vous concentrez sur la livraison, le reste se fait tout seul.
					</p>
				</div>
			</div>
		</Section>
	{/snippet}

	<!-- HOW IT WORKS SECTION -->
	{#snippet howItWorksSection()}
		<Section id="how-it-works" isForLanding={true} class="bg-gray-50 py-20">
			<h2 class="text-3xl font-bold text-center mb-4 text-gray-900">Comment ça marche ?</h2>
			<p class="text-center text-gray-600 mb-16 text-lg">
				<strong>Simple</strong>. <strong>Rapide</strong>. <strong>Efficace</strong>.
			</p>

			<div class="max-w-4xl mx-auto px-4">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<!-- Step 1 -->
					<div class="flex flex-col items-center text-center">
						<div
							class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6"
						>
							1
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-3">Créez votre Collection</h3>
						<p class="text-gray-700 mb-4 leading-relaxed">
							Ajoutez facilement vos produits et toutes les infos importantes en quelques minutes.
							Vos clients auront tout ce qu\'ils cherchent dès le départ.
						</p>
						<p class="text-sm text-gray-600 italic">
							💡 Une <strong>Collection</strong> est l\'endroit où tous vos produits sont regroupés
						</p>
						<div
							class="mt-6 w-full h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30"
						>
							<svg
								class="w-12 h-12 text-primary/40"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M20 7l-8-4m0 0L4 7m16 0v10l-8 4m0-4v4m0-4L4 7m8 4v10m8-10l-8 4M4 7l8 4"
								/>
							</svg>
						</div>
					</div>

					<!-- Step 2 -->
					<div class="flex flex-col items-center text-center">
						<div
							class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6"
						>
							2
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-3">Envoyez le lien</h3>
						<p class="text-gray-700 mb-4 leading-relaxed">
							Une fois votre Collection créée, vous pouvez envoyer à chaque nouveau client le lien de
							votre collection.
						</p>
						<p class="text-sm text-gray-600 italic">
							💡 <strong>Conseil</strong> : utilisez les messages automatiques pour supprimer complètement le
							besoin d\'écrire aux clients
						</p>
						<div
							class="mt-6 w-full h-32 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-secondary/30"
						>
							<svg
								class="w-12 h-12 text-secondary/40"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
						</div>
					</div>

					<!-- Step 3 -->
					<div class="flex flex-col items-center text-center">
						<div
							class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6"
						>
							3
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-3">Livrez</h3>
						<p class="text-gray-700 mb-4 leading-relaxed">
							DiMarket s\'occupe de vous montrer toutes les commandes avec les produits, les prix, les
							coordonnées du client et l\'adresse. Vous n\'avez qu\'à livrer.
						</p>
						<p class="text-sm text-gray-600 italic">
							✅ <strong>Et voilà !</strong> Vos commandes arrivent organisées automatiquement.
						</p>
						<div class="mt-6 w-full h-32">
							<DeliveryIllustration />
						</div>
					</div>
				</div>
			</div>
		</Section>
	{/snippet}

	<!-- INTEGRATIONS SECTION -->
	{#snippet integrationsSection()}
		<Section id="integrations" isForLanding={true} class="py-20">
			<h2 class="text-3xl font-bold text-center mb-8 text-gray-900">
				Continuez avec les plateformes
				<span class="font-fraunces opacity-50">que vous utilisez déjà</span>
			</h2>
				<p class="leading-relaxed">
					DiMarket s'intègre parfaitement à ce que vous utilisez déjà pour vendre.
					La différence? À quel point
					vous allez <strong>perdre du temps sans DiMarket</strong>.
				</p>

			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto px-4">
				{#each ['💚 WhatsApp', '📱 Instagram', '👍 Facebook', '📧 Email'] as platform}
					<div
						class="bg-white border-2 border-gray-200 rounded-full p-4 text-center hover:border-primary hover:shadow-md transition-all duration-300"
					>
						<p class="font-semibold text-gray-900">{platform}</p>
					</div>
				{/each}
			</div>
		</Section>
	{/snippet}

	<!-- AFRICA SECTION -->
	{#snippet africaSection()}
		<Section id="africa" isForLanding={true} class="relative w-full rounded-2xl bg-primary py-20">
		        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#000 2px, transparent 2px); background-size: 30px 30px;"></div>
			<h2 class="">
				Fait par l'Afrique<br><span class="font-fraunces opacity-60">Pour l'Afrique</span>
			</h2>

		
				<p class="px-4 leading-relaxed mb-6">
					<span class="text-lg opacity-50">
						DiMarket est né au Sénégal pour répondre à un 
						problème qui dépasse les frontières du
					    <strong>Pays de la Teranga</strong>.
					</span><br> 
					Nous ne sommes pas une entreprise étrangère faite pour
					l'Europe ; au contraire, nous comprennons les 
					défis d'être vendeur et nous sommes là pour
					vous aider à rendre la vie plus facile, 
					pour vous et vos clients.
				</p>

				<p class="text-center text-xl font-bold text-gray-900 mb-6">
					Disponible dans des dizaines de pays
				</p>

				<div class="text-5xl text-center space-y-4">
					<p>
						🇸🇳 🇨🇮 🇨🇲 🇧🇯 🇨🇬 🇬🇭 🇬🇼 🇱🇷 🇲🇦 🇳🇬 🇺🇬 🇹🇿 🇳🇲 🇱🇲 🇧🇫
					</p>
					<p class="text-lg text-gray-600">+ 30 pays africains</p>
				</div>
		</Section>
	{/snippet}

	<!-- AGITATE SECTION -->
	{#snippet agitateSection()}
		<Section id="agitate" isForLanding={true} class="bg-gray-50 py-20">
			<h2 class="text-3xl font-bold text-center mb-4 text-gray-900">
				⏳ Des heures perdues chaque semaine…
			</h2>
			<p class="text-center text-gray-600 mb-12 text-lg">
				…pour quelque chose qui pourrait être évité
			</p>

			<div class="max-w-2xl mx-auto px-4">
				<p class="text-lg text-gray-700 mb-8 text-center leading-relaxed">
					Le temps est précieux, et il l\'est encore plus pour un business. Imaginez ce que vous
					pourriez faire avec tout ce temps récupéré : <strong
						>développer votre business, créer de nouvelles Collections, ou simplement se reposer un
						peu</strong
					>. Avec DiMarket, vos ventes avancent pendant que vous vous concentrez sur l\'essentiel.
				</p>

				<!-- Hours Calculator -->
				<div class="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8">
					<h3 class="text-xl font-bold text-gray-900 mb-6">Calculons ce que vous perdez</h3>

					<div class="mb-6">
						<label for="hours" class="block text-sm font-semibold text-gray-700 mb-3">
							Heures perdues par jour à répondre aux questions :
						</label>
						<input
							id="hours"
							type="range"
							bind:value={hoursPerDay}
							min="0.5"
							max="8"
							step="0.5"
							class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
						<div class="text-center mt-2 text-lg font-bold text-primary">
							{hoursPerDay} heure{hoursPerDay > 1 ? 's' : ''}
						</div>
					</div>

					<div class="mb-6">
						<ProgressBar percentage={Math.min((hoursPerDay / 8) * 100, 100)} color="primary" />
					</div>

					<!-- Stats Grid -->
					<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
						<div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-primary mb-1">
								{stats.daily.toFixed(1)}h
							</p>
							<p class="text-xs text-gray-600">Par jour</p>
						</div>
						<div class="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-secondary mb-1">
								{stats.weekly.toFixed(0)}h
							</p>
							<p class="text-xs text-gray-600">Par semaine</p>
						</div>
						<div class="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-green-600 mb-1">
								{stats.monthly.toFixed(0)}h
							</p>
							<p class="text-xs text-gray-600">Par mois</p>
						</div>
						<div class="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-yellow-600 mb-1">
								{stats.yearly.toFixed(0)}h
							</p>
							<p class="text-xs text-gray-600">Par an</p>
						</div>
					</div>

					<p class="text-sm text-gray-600 mt-6 text-center italic">
						Avec DiMarket, ces heures seraient automatisées et vous seriez libre de vous concentrer sur la livraison.
					</p>
				</div>

				<div class="text-center">
					<Button
						variant="primary"
						label="Changer ma manière de vendre"
						size="lg"
						onclick={() => (showPhoneModal = true)}
					/>
				</div>
			</div>
		</Section>
	{/snippet}

	<!-- CLIENTS FEELING SECTION -->
	{#snippet clientsFeelingsSection()}
		<Section id="clients-feelings" isForLanding={true} class="bg-white py-20">
			<h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
				Et vos clients, que penseraient-ils ?
			</h2>

			<div class="max-w-2xl mx-auto px-4 space-y-6">
				<div class="bg-gradient-to-r from-primary/5 to-secondary/5 border-l-4 border-primary rounded-lg p-6">
					<p class="text-lg text-gray-700 leading-relaxed">
						Imaginez vos clients vous voyant agir intelligemment.
					</p>
				</div>

				<div class="bg-gradient-to-r from-secondary/5 to-primary/5 border-l-4 border-secondary rounded-lg p-6">
					<p class="text-lg text-gray-700 leading-relaxed">
						Ils ne voient pas juste quelqu\'un qui suit les autres… Ils voient un vendeur qui
						<strong>sait ce qu\'il fait</strong>, qui choisit de <strong>leur faciliter la vie</strong>, et qui
						<strong>délivre des résultats</strong>.
					</p>
				</div>

				<div class="bg-gradient-to-r from-green-500/5 to-primary/5 border-l-4 border-green-500 rounded-lg p-6">
					<p class="text-lg text-gray-700 leading-relaxed">
						C\'est cette image qui fait la différence :
						<strong>crédible, fiable, professionnel</strong>.
					</p>
				</div>

				<div class="bg-gradient-to-r from-primary/5 to-green-500/5 border-l-4 border-primary rounded-lg p-6">
					<p class="text-lg text-gray-700 leading-relaxed">
						Vos clients le remarquent. Et ceux qui hésitaient… <strong>passent à l\'action avec vous</strong>.
					</p>
				</div>
			</div>

			<div class="mt-12 text-center">
				<p class="text-xl font-bold text-primary">
					C\'est la crédibilité qui vend.
				</p>
			</div>
		</Section>
	{/snippet}

	<!-- FAQ SECTION -->
	{#snippet faqSection()}
		<Section id="faq" isForLanding={true} class="bg-gray-50 py-20">
			<h2 class="text-3xl font-bold text-center mb-4 text-gray-900">
				Questions fréquemment posées
			</h2>
			<p class="text-center text-gray-600 mb-12">
				Des réponses à vos préoccupations communes
			</p>

			<FAQ items={faqItems} />
		</Section>
	{/snippet}

	<!-- FINAL CTA SECTION -->
	{#snippet finalCtaSection()}
		<Section id="final-cta" isForLanding={true} class="bg-white py-20">
			<div class="max-w-2xl mx-auto px-4 text-center">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
					Vous avez choisi de vendre comme les autres,<br />il est désormais temps de vendre
					<span class="text-primary">comme les meilleurs</span>.
				</h2>

				<p class="text-lg text-gray-600 mb-12 leading-relaxed">
					La vraie question n\'est pas si ça marche. C\'est :
					<strong
						>êtes-vous quelqu\'un qui copie sans réfléchir… ou quelqu\'un qui cherche la manière la plus
						simple et efficace de vendre — et qui passe à l\'action ?</strong
					>
				</p>

				<Button
					variant="primary"
					label="Je passe à l'action"
					size="lg"
					onclick={() => (showPhoneModal = true)}
				/>

				<p class="text-sm text-gray-500 mt-6">
					Aucune carte bancaire requise. Configuration en moins de 5 minutes.<br />Rejoignez des centaines
					de vendeurs qui gagnent déjà du temps chaque jour.
				</p>
			</div>
		</Section>
	{/snippet}

	<!-- Render all sections -->
	{@render heroSection()}
	{@render introSection()}
	{@render howItWorksSection()}
	{@render integrationsSection()}
	{@render africaSection()}
	{@render agitateSection()}
	{@render clientsFeelingsSection()}
	{@render faqSection()}
	{@render finalCtaSection()}
</section>

<!-- Phone Modal -->
<Modal
	open={showPhoneModal}
	close={() => (showPhoneModal = false)}
	onSubmit={handlePhoneSubmit}
	btnLabel="Commencer"
>
	<div class="text-center">
		<h3 class="text-xl font-bold text-gray-900 mb-2">Commencez gratuitement</h3>
		<p class="text-gray-600 mb-4">Nous vous enverrons un lien pour démarrer</p>
		<Input
			bind:value={phoneInput}
			type="tel"
			placeholder="+221 77 123 45 67"
			label="Numéro de téléphone"
		/>
	</div>
</Modal>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	
	h1, h2, h3, h4 {
		font-weight: 800;
	}
</style>
