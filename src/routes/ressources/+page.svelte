<script>
	import Hero from "$lib/components/Hero.svelte";
	import Button from "$lib/components/Button.svelte";

	const resources = [
		{
			id: 1,
			icon: "📚",
			title: "Blog",
			description: "Découvrez nos derniers articles sur les tendances du marché, les conseils pour les vendeurs et les meilleures pratiques.",
			color: "from-blue-100 to-blue-50",
			link: "/blog",
			features: ["Articles mise à jour", "Conseils pratiques", "Tendances du marché"]
		},
		{
			id: 2,
			icon: "🎓",
			title: "Tutoriels",
			description: "Apprenez comment utiliser DiMarket et maximiser votre boutique avec nos tutoriels pas-à-pas.",
			color: "from-purple-100 to-purple-50",
			link: "/tutoriels",
			features: ["Guides complets", "Vidéos explicatives", "FAQ détaillée"]
		},
		{
			id: 3,
			icon: "📖",
			title: "Guides",
			description: "Explorez nos guides complets pour comprendre chaque aspect de la vente et découvrir de nouvelles stratégies.",
			color: "from-green-100 to-green-50",
			link: "/guides",
			features: ["Démarrage rapide", "Gestion des produits", "Stratégies de vente"]
		},
	/*	{
			id: 4,
			icon: "💡",
			title: "Astuces & Conseils",
			description: "Des conseils d'experts pour optimiser vos ventes et augmenter votre visibilité.",
			color: "from-yellow-100 to-yellow-50",
			link: "#",
			features: ["Optimisation SEO", "Marketing tips", "Gestion des stocks"]
		},
		{
			id: 5,
			icon: "🤝",
			title: "Support & Communauté",
			description: "Rejoignez notre communauté active et obtenez de l'aide de la part d'autres vendeurs.",
			color: "from-pink-100 to-pink-50",
			link: "#",
			features: ["Forum actif", "Support 24/7", "Événements"]
		},
		{
			id: 6,
			icon: "🔧",
			title: "Outils & Resources",
			description: "Accédez à nos outils gratuits pour gérer efficacement votre boutique.",
			color: "from-indigo-100 to-indigo-50",
			link: "#",
			features: ["Calculateurs", "Templates", "Modèles"]
		}*/
	];
</script>

<Hero>
	<h1 class="text-4xl sm:text-5xl font-heading font-bold mb-4">Découvrez nos ressources</h1>
	<p class="mb-8 mx-auto">Explorez notre collection complète de ressources pour vous aider à réussir sur DI Market. Du blog aux tutoriels, en passant par les guides pratiques et les conseils d'experts.</p>
	<a href="#ressources" class="flex gap-4 justify-center flex-wrap">
		<Button variant="primary" size="lg">Explorer</Button>
	</a>
</Hero>

<div id="ressources" class="mb-16"></div>

<section class="py-8 sm:py-12">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each resources as resource (resource.id)}
			<div class="group cursor-pointer h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
				<div class="bg-gradient-to-br {resource.color} rounded-2xl p-6 h-full flex flex-col shadow transition-all duration-300 hover:shadow-xl border border-white/50">
					<!-- Icon -->
					<div class="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
						{resource.icon}
					</div>

					<!-- Content -->
					<div class="flex-1">
						<h3 class="text-xl font-bold text-heading mb-3 font-heading">
							{resource.title}
						</h3>
						<p class="text-sm text-t-main/80 mb-4 leading-relaxed">
							{resource.description}
						</p>

						<!-- Features list -->
						<ul class="space-y-2">
							{#each resource.features as feature}
								<li class="text-xs text-t-main/70 flex items-center gap-2">
									<span class="text-primary font-bold">✓</span>
									{feature}
								</li>
							{/each}
						</ul>
					</div>

					<!-- CTA Button -->
					<div class="mt-6 pt-4 border-t border-white/30">
						<a href="/ressources{resource.link}" class="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary-hover transition-colors">
							En savoir plus
							<span class="transform transition-transform group-hover:translate-x-1">→</span>
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- CTA Section -->
<section class="mt-16 py-12 flex flex-col items-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl px-6 sm:px-12 text-center">
	<h2 class="text-2xl sm:text-3xl font-heading font-bold mb-4 text-heading">Besoin d'aide?</h2>
	<p class="mx-auto">
		Notre équipe de support est disponible pour répondre à toutes vos questions. N'hésitez pas à nous contacter.
	</p>
    <a href="/contact?cause=help">
	<Button variant="sober" size="lg">Contacter le Support</Button>
    </a>
</section>

