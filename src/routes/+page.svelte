<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import ScrollHighlight from '$lib/components/ScrollHighlight.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Modal from '$lib/components/Modal.svelte';
    import Hero from "$lib/components/Hero.svelte"
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

   if (browser) {
	  const ref = $page.url.searchParams.get('ref');
	  if (ref && !localStorage.getItem('referred_by')) localStorage.setItem('referred_by', ref);
   }
	// State
	let phoneInput = $state('');
	let customerPerDay = $state(10);
	let showPhoneModal = $state(false);

	// Calculate hours lost stats
	const calculateStats = () => {
		const timePerCustomer = 0.3
		const daily = customerPerDay * timePerCustomer;
		const weekly = customerPerDay * 6 * timePerCustomer; // assuming 5 business days
		const monthly = weekly * 4;
		const yearly = monthly * 12;
		return { daily: formatHours(daily), weekly, monthly, yearly };
	};

	function formatHours(decimal: number) {
		const totalMinutes = Math.round(decimal * 60);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

	    if (hours === 0) return `${minutes}min`;
	    if (minutes === 0) return `${hours}h`;
		return `${hours}h ${minutes}min`;
	} 

	const stats = $derived(calculateStats());

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

	const steps = [
      {
		title: "Créez votre Collection",
		text: "Ajoutez facilement vos produits et toutes les infos importantes en quelques minutes. Vos clients auront tout ce qu’ils cherchent dès le départ",
		icon: "🗂️",
		img: "collection-page",
		tip: "Une Collection est l'endroit où tout vos produits sont regroupés"
	  },
	  {
		title: "Envoyez le lien de votre Collection",
        text: "Partagez le lien de votre Collection à chaque nouveau client — sur WhatsApp, Instagram, Facebook ou où vous voulez. Ainsi vos clients verront tout vos produits et pourront commander sans vous déranger",
	    icon: "🔗",
		img: "chat-with-dimarket",
		tip: "Conseil: Pour envoyer le lien de votre Collection, vous pouvez utiliser les messages automatiques."
	 },
	 {
		title: "Délivrez les produits",
		icon: "📦",
		img: "order-page",
		text: "Vous verrez toutes les commandes en un seul lieu. Fini les carnets ou le besoin de noter les commandes. Après vous n'aurait qu'à livrer ou appeler le client pour qu'il cherche sa commande"
	 }
	]

	// FAQ items
	const faqItems = [
		{
			question: "Puis-je essayer DiMarket avant de payer ?",
			answer:
				`Oui. Vous pouvez utiliser DiMarket gratuitement pendant 1 mois.
				Testez toutes les fonctionnalités, recevez vos premières commandes et voyez si ça correspond à votre business.
				Si DiMarket vous aide vraiment à gagner du temps et à vendre plus, vous pourrez ensuite débloquer un accès à vie avec un paiement unique, adapté aux réalités des vendeurs africains.`
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
				"Vous pouvez créer votre première collection en moins de 5 minutes. Ajoutez vos produits, copiez le lien, partagez-le avec vos clients via Instagram, WhatsApp..., et les commandes commenceront à arriver organisées automatiquement."
		},
		{
			question: "Faut-il abandonner WhatsApp ou Instagram ?",
			answer:
				"Non ! DiMarket s'intègre parfaitement avec les plateformes que vous utilisez déjà. Partagez votre lien via WhatsApp, Instagram, Facebook etc. Vos clients passeront commande via DiMarket, et vous recevrez les commandes organisées. C'est plus simple pour tous."
		},
		{
			question: "Et si je n'aime pas ?",
			answer:
				"Vous pouvez annuler à tout moment sans engagement. Vos données restent vôtres. Mais nous sommes sûrs qu'une fois que vous verrez le temps que vous récupérez, vous ne voudrez plus revenir à l'ancienne méthode."
		}
	];

	let isLoading = $state(false);
	let errorMessage = $state('');

	const handlePhoneSubmit = async (e: Event) => {
		try {
			isLoading = true;
			errorMessage = '';

			// Validate phone
			if (!phoneInput || phoneInput.trim().length < 7) {
				errorMessage = 'Veuillez entrer un numéro valide';
				return;
			}

			const response = await fetch('/api/auth/register-phone', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phone: phoneInput })
			});

			const result = await response.json();

			if (!response.ok) {
				errorMessage = result.error || 'Une erreur est survenue';
				return;
			}

			showPhoneModal = false;
			phoneInput = '';

			// Redirect to commencer page
			window.location.href = '/commencer';
		} catch (error) {
			errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
		} finally {
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>DiMarket - Ne perdez plus de temps à gérer vos commandes</title>
	<meta name="description" content="DiMarket est une plateforme conçue pour aider les vendeurs africains à gérer leurs commandes, répondre aux questions fréquentes et augmenter leurs ventes sans stress." />
</svelte:head>

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
			<div class="bg-white rounded-2xl flex flex-col gap-2 p-8 mb-12 max-w-md mx-auto">
				<div class="flex gap-1 flex-col">
					<Input
						bind:value={phoneInput}
						type="tel"
						placeholder="77 123 45 67"
						class="flex-1"
						label="Votre numero (sans le +XXX)"
					/>
					<Button
						variant="sober"
						label="Commencer"
						onclick={() => (showPhoneModal = true)}
					/>
				</div>
			
	       	 <a class="text-sm my-4 hover:underline" href="vendeurs/connection">
			   <Button 
			     variant="outlineBorder"
				 class="flex gap-2 justify-center items-center w-full"
			   >	
				
				 J'ai dejà un compte
				 <img class="w-4 h-4" src="/icons/arrow-right.svg" alt="Arrow right">
			   </Button>
			 </a>

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
						Le pire ? Vous pensez que vous ne perdez pas beaucoup trop de temps, mais mis ensemble, ces petites interruptions deviennent des heures perdues chaque jour
					</p>
				</ScrollHighlight>

				<ScrollHighlight>
					<p class="text-lg">
						Sans compter le nombre de fois que vous allez vérifier s'il y'a de nouveaux messages, ou le stress de devoir repondre rapidement, ou la galère de devoir noter chaque commande.
					</p>
				</ScrollHighlight>

				<ScrollHighlight>
				  <p class="text-lg text-secondary">
				   Mais pourquoi continuer comme ça s'il existe un moyen de supprimer toute cette charge ?
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
						<strong>DiMarket</strong> vous permet d'avoir exactement cette vie de <strong>calme total</strong>
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

			<div class="max-w-4xl mx-auto">
				<div class="grid grid-colss-1 gap-12">
					{#each steps as step, index}
					<ScrollHighlight once>
					<div class="flex border-2 border-card p-4 rounded-2xl border-content flex-col-reverse md:flex-row gap-2 w-full max-w-[700px] mx-[-16px]">
					  <img
					    src="/landing/{step.img}.jpg"
						alt="{step.title} étape illustration"
						class="saturate-100 rounded-2xl w-full w-1/3 md:w-1/3 object-cover shadow shadow-gray-300 "
					/>
                      <div class="mx-auto shadow shadow-secondary bg-card/20 p-4 rounded-2xl relative w-full max-w-[400px]">
						<span class="inline-block p-0 text-[6rem] font-fraunces font-bold z-[0] text-gray/20 absolute top-[0px] right-[8px]">0{index + 1}</span>
						<span class="block text-3xl mb-4">{step.icon}</span>
						<h3>{step.title}</h3>
					    <p>{step.text}</p>
						{#if step.tip}
							<div class="my-2 text-xs bg-secondary/10 p-2 rounded-xl border-l-4 border-secondary">💡 {step.tip}</div>
						{/if}
					 </div>
					 </div>
					 </ScrollHighlight>
					 <ScrollHighlight once>
					  {#if index != steps.length - 1}
					   <img src="/icons/curved-arrow.svg" alt="|" class="rotate-[90deg] w-16 mx-auto" />
					   {/if}
					 </ScrollHighlight>
					{/each}
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

			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto p-4">
				{#each ['WhatsApp', 'Instagram', 'Facebook', 'etc.'] as platform}
					<div
						class="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center hover:border-primary hover:shadow-md transition-all duration-300"
					>
						<p class="font-semibold text-gray-900">
						   {#if platform === 'etc.'}
								<img src="/icons/plus.svg" alt="Plus logo" class="mx-auto mb-2 w-9 h-9 object-contain" />
							{:else}
								<img src="/landing/{platform.toLowerCase()}.png" alt="{platform} logo" class="mx-auto mb-2 w-8 h-8 object-contain" />
							{/if}
							{platform}
						</p>
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
						🇸🇳 🇨🇮 🇨🇲 🇧🇯 🇨🇬 🇬🇭 🇬🇼 🇱🇷 🇲🇱 🇲🇦 🇳🇬 🇺🇬 🇹🇿 🇳🇲 🇱🇲 🇧🇫
					</p>
					<p class="text-lg text-gray-600">+ 30 pays africains</p>
				</div>
		</Section>
	{/snippet}

	<!-- AGITATE SECTION -->
	{#snippet agitateSection()}
		<Section id="agitate" isForLanding={true} class="bg-gray-50 py-20">
			<h2>
				⏳ Des heures <span class="font-fraunces bg-red-400">perdues</span> chaque semaine…
			</h2>
			<p class="text-center text-gray-600 mb-2 text-lg">
				…pour quelque chose qui pourrait être évité
			</p>

			<div class="max-w-2xl mx-auto">
			  <p>
					Le temps est précieux, et il l'est encore plus pour un business. 
					<br>Imaginez ce que vous
					pourriez faire avec tout ce temps récupéré : <strong
						>développer votre business, créer de nouvelles Collections, ou simplement se reposer un
						peu</strong
					>. Avec DiMarket, vos ventes avancent pendant que vous vous concentrez sur l'essentiel.
				</p>
				<br>

				<!-- Hours Calculator -->
				<div class="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8">
					<h3 class="text-xl font-bold text-gray-900 mb-6">Calculons ce que vous perdez</h3>

					<div class="mb-6">
						<label for="hours" class="block text-sm font-semibold text-gray-700 mb-3">
							Nombre de personnes qui vous contactent par jour :
						</label>
						<input
							id="hours"
							type="range"
							bind:value={customerPerDay}
							min="3"
							max="50"
							step="1"
							class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
						<div class="text-center mt-2 text-lg font-bold">
							<span class="text-primary">{customerPerDay}</span> personne{customerPerDay > 1 ? 's' : ''}
						</div>
					</div>

					<!-- Stats Grid -->
					<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
						<div class="bg-gradient-to-br from-orange-400/5 to-orange-400/20 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-orange-300 mb-1">
						    {stats.daily}
							</p>
							<p class="text-xs text-gray-600">Par jour</p>
						</div>
						<div class="bg-gradient-to-br from-orange-400/5 to-orange-400/20 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-pink-500 mb-1">
								{stats.weekly.toFixed(0)}h
							</p>
							<p class="text-xs text-gray-600">Par semaine</p>
						</div>
						<div class="bg-gradient-to-br from-purple-500/5 to-green-500/20 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-fuchsia-800 mb-1">
								{stats.monthly.toFixed(0)}h
							</p>
							<p class="text-xs text-gray-600">Par mois</p>
						</div>
						<div class="bg-gradient-to-br from-red-500/5 to-red-500/20 rounded-lg p-4 text-center">
							<p class="text-2xl font-bold text-red-600 mb-1">
								{stats.yearly.toFixed(0)}h
							</p>
							<p class="text-xs text-gray-600">Par an</p>
						</div>
					</div>

					<p class="text-sm text-gray-600 mt-6 text-center italic">
						Avec DiMarket, ces heures ne seront pas source de stress mais au contraire, ces heures vous permettront de progresser ou juste de vous reposer.
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
					<p class="leading-relaxed">
						Imaginez vos clients vous voyant agir intelligemment.
					</p>
				</div>

				<div class="bg-gradient-to-r from-secondary/5 to-primary/5 border-l-4 border-secondary rounded-lg p-6">
					<p class="leading-relaxed">
						Ils ne voient pas juste quelqu\'un qui suit les autres… Ils voient un vendeur qui
						<strong>sait ce qu'il fait</strong>, qui choisit de <strong>leur faciliter la vie</strong>, et qui
						<strong>délivre des résultats</strong>.
					</p>
				</div>

				<div class="bg-gradient-to-r from-green-500/5 to-primary/5 border-l-4 border-green-500 rounded-lg p-6">
					<p class="leading-relaxed">
						C'est cette image qui fait la différence :
						<strong>crédible, fiable, professionnel</strong>.
					</p>
				</div>

				<div class="bg-gradient-to-r from-primary/5 to-green-500/5 border-l-4 border-primary rounded-lg p-6">
					<p class="leading-relaxed">
						Vos clients le remarquent. Et ceux qui hésitaient… <strong>passent à l'action avec vous</strong>.
					</p>
				</div>
			</div>

			<div class="mt-12 text-center">
				<p class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
					C'est la crédibilité qui vend.
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
		<Section id="final-cta" isForLanding={true} class="rounded-2xl shadow-4 bg-gradient-to-r from-primary/10 to-secondary/40 py-20">
			<div class="max-w-2xl mx-auto px-4 text-center">
				<h2 class="text-white text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
					Vous avez choisi de vendre <span class='text-red-500'>comme les autres</span>.<br />
					Il est désormais temps de vendre
					<span class="font-fraunces bg-primary">comme les meilleurs</span>.
				</h2>

				<p class="text-gray mx-auto mb-8 leading-relaxed">
					La vraie question n'est pas si ça marche. C'est :
					<strong
						>êtes-vous quelqu'un qui copie sans réfléchir… ou quelqu'un qui cherche la manière la plus
						simple et efficace de vendre — et qui passe à l'action ?</strong
					>
				</p>

				<Button
					variant="primary"
					label="Je passe à l'action"
					size="lg"
					onclick={() => (showPhoneModal = true)}
				/>
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
	btnLabel={isLoading ? 'Chargement...' : 'Commencer'}
>
	<div class="text-center">
		<h3 class="text-xl font-bold text-gray-900 mb-2">Commencez gratuitement</h3>
		<Input
			bind:value={phoneInput}
			type="tel"
			placeholder="77 123 45 67"
			label="Numéro de téléphone"
			disabled={isLoading}
		/>
		{#if errorMessage}
			<p class="text-red-600 text-sm mt-4 bg-red-50 p-2 rounded">{errorMessage}</p>
		{/if}
	</div>
</Modal>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	
	h1, h2, h3 {
		font-weight: 800;
	}
</style>
