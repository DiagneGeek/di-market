<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { fade, fly, slide } from 'svelte/transition';
	import { page } from "$app/stores"
    import posthog from 'posthog-js'
    import { browser } from '$app/environment';

	let faqs = [
		{ q: "C'est quoi une Collection ?", a: "Une Collection dans DiMarket, c'est votre propre espace où vous pourrez ajouter vos produits pour pouvoir utiliser les fonctionnalités de DiMarket. Pensez y comme une collection e-commerce", open: false },
		{ q: "Est-ce que vous proposez un essaie gratuit ?", a: "Oui, vous pouvez créer votre Collection et commencer à recevoir des commandes gratuitement pendant 1 mois. Toutes les fonctionnalités seront disponibles", open: false },
		{ q: "Est-ce que DiMarket gère la livraison ?", a: "Non. DiMarket s'occupe uniquement de la présentation des produits et de la gestion des commandes. La livraison reste entre vous et votre client.", open: false },
		{ q: "Mes clients doivent-ils créer un compte pour commander ?", a: "Non. Vos clients peuvent consulter vos produits et passer commande sans créer de compte.", open: false },
		{ q: "Puis-je utiliser DiMarket avec WhatsApp ?", a: "Oui. DiMarket est même pensé pour ça. Vous envoyez simplement le lien de votre Collection sur WhatsApp, et le client commande sans discussion inutile.", open: false },
		{ q: "Est-ce que DiMarket est adapté aux petits commerces ?", a: "Oui. DiMarket est fait aussi bien pour les petits vendeurs que pour ceux qui reçoivent beaucoup de messages chaque jour.", open: false },
		{ q: "Puis-je modifier mes produits après les avoir ajoutés ?", a: "Oui. Vous pouvez modifier vos produits à tout moment : prix, description, etc. Et vous pourrez même faire des réductions", open: false },
		{ q: "Où puis-je voir mes commandes ?", a: "Toutes vos commandes sont regroupées dans un seul espace, clair et organisé, accessible en un clic.", open: false },
		{ q: "DiMarket prend-il une commission sur mes ventes ?", a: "Non. DiMarket ne prend aucune commission sur vos ventes.", open: false },
		{ q: "Est-ce que mes clients verront toutes mes informations ?", a: "Vos clients voient uniquement les informations nécessaires pour commander : produits, prix, descriptions et images. Vos données internes restent privées.", open: false },
		{ q: "Est-ce que DiMarket est fait pour l'Afrique ?", a: "Oui. DiMarket est conçu pour répondre aux réalités locales : vente via WhatsApp, gestion manuelle, manque d'outils adaptés.", open: false },
		{ q: "Que se passe-t-il si j'ai besoin d'aide ?", a: "Un support sera disponible pour vous accompagner et répondre à vos questions", open: false }
	];

	function toggle(i: number) {
		faqs[i].open = !faqs[i].open;
		faqs = [...faqs];
	}

    const addEvent = (name: string, details: object) => {
      posthog.capture(name, details)
	}

	const referer = $page.url.searchParams.get("ref") as string
    if (referer && browser) {
      localStorage.setItem("referred_by", referer)
	}
</script>

<svelte:head>
    <title>Vendez, sans expliquer. — DiMarket</title>
    <meta name="description" content="DiMarket est la solution pour les vendeurs qui veulent vendre mieux, en beaucoup moins de temps">
	<meta name="og:title" content="Vendez, sans devoir engager des discussions inutiles">
	<meta name="og:image" content="https://dimarket.biz/landing/landing-og.jpg">
</svelte:head>

{#snippet heroInfos(big: string,  small: string)}
 <div class="flex flex-col items-center gap-1">
	<span class="text-3xl font-[900] text-dark">{big}</span>
	<span class="text-sm text-slate-500">{small}</span>
 </div>
{/snippet}

	<!-- HERO -->
	<section class="relative overflow-hidden pb-32 pt-24 px-4 bg-gradient-to-b from-teal-50 via-blue-50 to-purple-50" in:fly={{ y: 20, duration: 400 }}>
		<!-- Animated shapes -->
		<div class="absolute top-10 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
		<div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="animation-delay: 2s;"></div>
		<div class="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="animation-delay: 4s;"></div>
		
		<div class="relative max-w-4xl mx-auto text-center">
			<div class="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full border border-teal-300">
				<span class="text-sm text-teamax-w-2xl">Pour les vendeurs d'Afrique</span>
			</div>
			<h1 class="w-full" in:fade={{ delay: 100 }}>
        <span class="text-4xl mx-auto font-medium inline-block leading-snug text-left font-bold text-slate-900">Vendez <span class="text-red-600">sans</span> devoir <span class="text-red-400">expliquer.</span><br><span class="text-teal-500">DiMarket</span> s'occupe de tout</span></h1>
			<p class="mb-10 font-semibold max-w-2xl mx-auto" in:fade={{ delay: 200 }}>Ne perdez plus des  heures à repondre aux messages WhatsApp. DiMarket fait comprendre vos produits aux curieux sans la moindre intervention de votre part</p>
			<div class="flex gap-4 justify-center flex-wrap" in:fade={{ delay: 300 }}>
				<a href="/vendeurs/inscription">
                 <Button 
                   on:click={() => addEvent("cta-click", {
                      from: "Vendeurs Hero"
                   })}>🚀 Commencer</Button></a>
				<a 
                   on:click={() => addEvent("hero-how-it-works-btn", {})}
                   href="#how"><Button variant="neutral">📖 Comment ça marche</Button></a>
			</div>
			<div class="mt-16 bg-primary mx-[-16px] p-4 text-dark md:rounded-xl flex gap-4 flex-wrap justify-center" in:fade={{ delay: 400 }}>
			  {#each [
				{ big: "2x", small: "Moins de temps à consacrer à vendre" },
				{ big: "8x", small: "Moins de messages à traiter" },
				{ big: "4x", small: "Moins de stress" }
			  ] as info}
				{@render heroInfos(info.big, info.small)}
			  {/each}
			</div>
		</div>
	</section>

	<!-- PROBLEM -->
	<section class="py-20 px-4 bg-gradient-to-br from-slate-950 to-slate-800" in:fade>
		<div class="max-w-2xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">
        <span class="text-slate-50">C'est dur de gérer chaque client potentiel</span></h2>
			<p class="text-[17px] text-slate-300 font-semibold mb-4">En tant que vendeurs, vous passez sûrement beaucoup de temps à expliquer, convaincre et essayer de gérer les commandes. Je me trompe ?</p>
			<p class="mb-4 text-slate-200">Et pire, certains n'ont même pas l'intention d'acheter. Au cas où vous ne le sauriez pas, vous perdez chaque jour beaucoup de temps qui pourrait être investi dans le développement de votre business.</p>
			<p class="text-base bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold">Le problème, ce n'est pas les clients. <br>👉 C'est votre processus de vente.</p>
		</div>
	</section>

	<!-- BENEFITS -->
	<section class="py-20 px-4 bg-gradient-to-b from-white via-blue-50 to-white" in:fade>
		<div class="max-w-4xl mx-auto">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">Transformez des intéressés en clients, avec 4x moins de stress</h2>
					<p class="text-base text-slate-700 mb-4">DiMarket transforme des dizaines de messages journaliers en un seul lien. Plus besoin d'expliquer encore et encore, plus besoin de négocier encore et encore, et surtout plus besoin de gérer vos commandes sur WhatsApp ou, pire, dans un cahier.</p>
					<p class="text-base text-slate-700">Vous n'aurez plus besoin de vous souvenir des commandes : on vous les affiche quand vous voulez.</p>
				</div>
				<div class="relative h-80">
					<div class="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 rounded-2xl shadow-2xl opacity-75"></div>
					<div class="absolute inset-2 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl overflow-hidden ">
						<img src="/landing/chat-demo.jpg" alt="Demo" class="w-full h-full object-cover rounded-2xl scale-110" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- RESULTS COMPARISON -->
	<section class="py-20 px-4 bg-gradient-to-b from-slate-50 to-slate-100" in:fade>
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2 text-center">Est-ce que DiMarket va vraiment améliorer mon commerce ?</h2>
			<p class="text-2xl bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent font-bold mb-8 text-center">Oui.</p>
			<div class="grid md:grid-cols-2 gap-6">
				<div class="bg-red-50 p-8 rounded-xl border-2 border-red-500 shadow-md hover:shadow-lg transition">
					<h3 class="text-xl font-bold text-red-600 mb-4">❌ Sans DiMarket:</h3>
					<ul class="space-y-3 text-slate-700">
						<li class="flex items-start"><span class="mr-3">•</span><span>Créer des discussions avec tous les clients</span></li>
						<li class="flex items-start"><span class="mr-3">•</span><span>Donner à chaque fois les informations du produit</span></li>
						<li class="flex items-start"><span class="mr-3">•</span><span>Des négociations interminables</span></li>
						<li class="flex items-start"><span class="mr-3">•</span><span>Demander l'adresse pour chaque livraison</span></li>
						<li class="flex items-start"><span class="mr-3">•</span><span>Gérer les commandes manuellement (Whatsapp, cahier…)</span></li>
						<li class="flex items-start"><span class="mr-3">•</span><span>Une organisation qui provoque parfois de la confusion</span></li>
					</ul>
				</div>
				<div class="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border-2 border-green-400 shadow-md hover:shadow-lg transition">
					<h3 class="text-xl font-bold text-green-600 mb-4">✅ Avec DiMarket:</h3>
					<ul class="space-y-3 text-slate-700">
						<li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Un seul message à envoyer aux clients (automatisable)</span></li>
						<li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Un client ravi de voir toutes les infos dont il a besoin (images, nom, description, prix, réduction…)</span></li>
						<li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Vous, ravi de ne plus répéter la même chose</span></li>
						<li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Plus besoin de demander l'adresse</span></li>
						<li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Accès à toutes les commandes en un clic</span></li>
						<li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Beaucoup de temps gagné et moins de stress 😉</span></li>
					    <li class="flex items-start"><span class="mr-3 text-green-500">✓</span><span>Un business plus mature et organisé</span></li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- HOW IT WORKS -->
	<section class="py-20 px-4 bg-gradient-to-b from-white to-purple-50" id="how" in:fade>
		<div class="max-w-3xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2 text-center">Comment ça marche ?</h2>
			<p class="mb-4">Plus simple que de gérer les commandes avec un cahier en tout cas :)</p>
			<ol class="space-y-4">
				<li class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-purple-500 hover:border-purple-600">
					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
						<div>
							<strong class="text-lg text-slate-900">Ajoutez vos produits</strong>
							<p class="text-slate-700 mt-1">Une fois connecté, ajoutez les produits que vous vendez en définissant image, titre, description, prix... Ce sera la dernière fois que vous devrez expliquer ces produits.
              </p>
						</div>
					</div>
				</li>
				<li class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-blue-500 hover:border-blue-600">
					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">2</div>
						<div>
							<strong class="text-lg text-slate-900">Montrez votre Collection</strong>
							<p class="text-slate-700 mt-1">
                Votre Collection est désormais remplie. Vous n’avez qu’à envoyer le lien de cette Collection à un client. Il pourra voir tous vos produits, leurs informations et, s’il est réellement intéressé, commander directement via DiMarket.
              </p>
						</div>
					</div>
				</li>
				<li class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-teal-500 hover:border-teal-600">
					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
						<div>
							<strong class="text-lg text-slate-900">Consultez vos commandes</strong>
							<p class="text-slate-700 mt-1">En un clic, vous pourrez accéder à toutes vos commandes, affichées clairement : produits, dates, adresses, noms et numéros de téléphone <br>Mieux qu'un cahier, non ?</p>
						</div>
					</div>
				</li>
			</ol>
			<p class="text-sm text-amber-800 bg-amber-50 p-4 rounded-lg mt-8 border-l-4 border-amber-400">⚠️ Note : DiMarket ne gère pas la livraison.</p>
		</div>
	</section>

	<!-- PRICING -->
	<section class="py-20 px-4 bg-gradient-to-b from-white via-indigo-50 to-white">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-3">Investissez pour atteindre un business plus autonome</h2>
				<p class=" mx-auto">Et parce que nous savons que DiMarket va changer votre business, nous vous offrons 1 mois pour que vous aussi, vous sachez que nous sommes des anges venus du ciel, sinon, ne nous donnez même pas 1 centime</p>
			</div>
			<div class="grid md:grid-cols-3 gap-6">
				<!-- Basic Plan -->
				<div class="bg-white rounded-xl shadow-md border border-slate-200 p-8 transition hover:shadow-xl hover:-translate-y-1">
					<div class="mb-6">
						<h3 class="text-2xl font-bold text-slate-900 mb-2">Amateur</h3>
						<p class="text-slate-600">Pour les vendeurs occasionnelles</p>
					</div>
					<div class="mb-6">
						<span class="text-4xl font-bold text-teal-600">0</span>
						<span class="text-slate-600"> fcfa</span>
					</div>
					<ul class="space-y-3 mb-8 text-slate-700">
						<li class="flex items-start"><span class="mr-3 text-teal-500">✓</span><span>Créez votre Collection</span></li>
						<li class="flex items-start"><span class="mr-3 text-teal-500">✓</span><span>Ajoutez jusqu'à 15 produits</span></li>
						<li class="flex items-start"><span class="mr-3 text-teal-500">✓</span><span>Partagez sur vos réseaux</span></li>
					</ul>
					<a href="/vendeurs/inscription">
                    <Button
                     on:click={() => addEvent("cta-click", {
                      from: "Vendeurs Pricing Card",
                      plan: "free"
                   })}
                    class="w-full">Commencer</Button></a>
					<p class="text-sm text-slate-500 mt-4 font-semibold">1 mois gratuit du Premium</p>
				</div>

				<!-- Premium Plan (Featured) -->
				<div class="md:scale-105 relative">
					<div class="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition"></div>
					<div class="bg-white rounded-xl shadow-xl border-2 border-purple-500 p-8 relative">
						<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
							<span class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">⭐ Recommendé</span>
						</div>
						<div class="mb-6 pt-2">
							<h3 class="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
							<p class="text-slate-600">Pour les vendeurs serieux</p>
						</div>
						<div class="mb-6">
							<span class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">7.000</span>
							<span class="text-slate-600"> fcfa/mois</span>
						</div>
						<ul class="space-y-3 mb-8 text-slate-700">
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Tout sur plan Amateur</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Produits illimités</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Badge vendeur vérifié</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Confiance des acheteurs</span></li>
						    <li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Conseils personnalisés pour ameliorer les ventes</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Analyses de performance</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Gestion des commandes</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Suivi des ventes</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Promotions & réductions</span></li>
							<li class="flex items-start"><span class="mr-3 text-purple-500">✓</span><span>Support prioritaire</span></li>
						</ul>
						<a href="/vendeurs/inscription"><Button on:click={() => addEvent("cta-click", {
                      from: "Vendeurs Pricing Card",
plan: "Premium"
                   })} variant="secondary" class="w-full">Essayer 1 mois gratuit</Button></a>
					</div>
				</div>

				<!-- Enterprise Plan -->
				<div class="bg-white rounded-xl shadow-md border border-slate-200 p-8 transition hover:shadow-xl hover:-translate-y-1">
					<div class="mb-6">
						<h3 class="text-2xl font-bold text-slate-900 mb-2">Entreprise</h3>
						<p class="text-slate-600">Sur mesure</p>
					</div>
					<div class="mb-6">
						<span class="text-4xl font-bold text-slate-900">+99.000</span>
						<span class="text-slate-600"> fcfa/mois</span>
					</div>
					<ul class="space-y-3 mb-8 text-slate-700">
						<li class="flex items-start"><span class="mr-3 text-slate-400">✓</span><span>Tout du Premium</span></li>
						<li class="flex items-start"><span class="mr-3 text-slate-400">✓</span><span>Accompagnement dédié</span></li>
						<li class="flex items-start"><span class="mr-3 text-slate-400">✓</span><span>Services additionnels</span></li>
						<li class="flex items-start"><span class="mr-3 text-slate-400">✓</span><span>Support 24/7</span></li>
					</ul>
					<a href="https://wa.me/781878234?text=Salut l'équipe DiMarket. J'aimerais créer une collection chez vous. Peut on en discuter ?">
						<Button on:click={() => addEvent("cta-click", {
                      from: "Vendeurs Pricing Card",
                      plan: "Premium"
                   })} class="w-full">Nous contacter</Button>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="py-20 px-4 bg-gradient-to-b from-slate-50 via-pink-50 to-white" in:fade>
		<div class="max-w-3xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-8 text-center">Vos potentielles questions, répondues !</h2>
			<div class="space-y-0 border-2 border-gradient rounded-xl overflow-hidden bg-white shadow-lg divide-y divide-slate-100">
				{#each faqs as faq, i}
					<div class="faq-item group">
						<button 
							class="w-full text-left px-6 py-5 font-semibold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-pink-50 transition-all flex justify-between items-center"
							aria-expanded={faq.open} 
							on:click={() => toggle(i)}
						>
							<span>{faq.q}</span>
							<span class="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent transition-transform transition-colors" class:rotate-45={faq.open}>+</span>
						</button>
						{#if faq.open}
							<div class="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 text-slate-700 border-t border-slate-100" transition:slide>
								{faq.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-teal-900 via-slate-900 to-purple-900 text-white" in:fade>
		<!-- Animated background elements -->
		<div class="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style="animation-delay: 2s;"></div>
		
		<div class="relative max-w-3xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl mb-6 leading-tight">
				<span class="text-slate-100">
					Sortez de la moyenne,<br></span>
			 <span class="text-secondary">Devenez le meilleur</span>
			</h2>
			<p class="text-slate-200 mb-10">DiMarket n'est pas seulement un outil, c'est la solution à un problème purement Africain qui ralentit votre progression.</p>
			<a href="/vendeurs/inscription"><Button on:click={() => addEvent("cta-click", {
                      from: "Vendeurs Final CTA"
                   })}>🚀 Créer ma Collection!</Button></a>
		</div>
	</section>

<style>
	.faq-item {
		transition: background-color 0.2s ease;
	}

	:global(.rotate-45) {
		transform: rotate(45deg);
	}

	@keyframes blob {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(20px, -50px) scale(1.1);
		}
		50% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		75% {
			transform: translate(50px, 50px) scale(1.05);
		}
	}

	:global(.animate-blob) {
		animation: blob 7s infinite;
	}
</style>
