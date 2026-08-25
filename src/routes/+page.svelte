<script lang="ts">
	import Button from "../lib/components/Button.svelte";

	const focusAreas = [
		{
			number: '01',
			title: 'Find the leak',
			text: 'See where attention, trials, and demand disappear before they become revenue.'
		},
		{
			number: '02',
			title: 'Make it obvious',
			text: 'Give people a clearer path from first impression to the action that matters.'
		},
		{
			number: '03',
			title: 'Keep improving',
			text: 'Build a growth system that gets sharper with every signal and every customer.'
		}
	];

	const capabilities = [
		{
			label: 'Conversion',
			title: 'Turn interest into momentum',
			text: 'Sharper journeys, stronger offers, and fewer moments where good prospects lose their way.',
			icon: '↗'
		},
		{
			label: 'Activation',
			title: 'Help customers reach value sooner',
			text: 'The right message, at the right moment, so new users understand why they should stay.',
			icon: '✦'
		},
		{
			label: 'Clarity',
			title: 'Grow from what already works',
			text: 'A practical view of your funnel, your audience, and the next move worth making.',
			icon: '◌'
		}
	];
</script>

<svelte:head>
	<title>DiMarket — The growth suite for digital businesses</title>
	<meta
		name="description"
		content="DiMarket brings together focused tools and expert services to help digital businesses grow with less guesswork."
	/>
	<meta property="og:title" content="DiMarket — The growth suite for digital businesses" />
	<meta
		property="og:description"
		content="A focused set of tools and services for businesses ready to turn attention into sustainable growth."
	/>
	<meta property="og:image" content="/dimarket-landing.jpg" />
</svelte:head>

<div class="overflow-hidden">
	<header class="sticky top-0 z-50 border-b border-foreground/10 bg-background/85 backdrop-blur-xl">
		<nav
			class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10"
			aria-label="Main navigation"
		>
			<a class="flex items-center gap-3 text-foreground" href="/" aria-label="DiMarket home">
				<span
					class="grid size-10 place-items-center rounded-xl bg-primary font-heading text-lg font-bold text-primary-foreground"
					>D</span
				>
				<span class="font-heading text-lg font-semibold tracking-tight">DiMarket</span>
			</a>
			<div class="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
				<a class="transition-colors hover:text-foreground" href="#why">Why DiMarket</a>
				<a class="transition-colors hover:text-foreground" href="#suite">Tripo</a>
				<a class="transition-colors hover:text-foreground" href="/partenaires">For partners</a>
			</div>
			<a
				class="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
				href="/partenaires">Start a conversation <span aria-hidden="true">↗</span></a
			>
		</nav>
	</header>

	<main>
		<section
			class="relative mx-auto grid max-w-7xl gap-12 px-5 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-10 lg:pt-28 lg:pb-32"
		>
			<div
				class="pointer-events-none absolute top-10 -left-48 -z-10 size-96 rounded-full bg-primary/20 blur-3xl"
			></div>
			<div class="hero-sequence-item">
				<p
					class="mb-7 flex items-center gap-3 text-xs font-bold tracking-[.18em] text-muted-foreground uppercase"
				>
					<span class="size-2 rounded-full bg-primary"></span> A growth suite by DiMarket
				</p>
				<h1 class="max-w-3xl text-5xl leading-[1.03] font-bold sm:text-6xl lg:text-7xl">
					Build growth that <span class="relative inline-block"
						><span class="relative z-10">keeps moving.</span><span
							class="absolute inset-x-0 bottom-1 -z-0 h-4 rounded-sm bg-primary/70 sm:h-5"
						></span></span
					>
				</h1>
				<p class="hero-subtext mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
					DiMarket brings together focused tools, sharp thinking, and the people you need to turn
					digital attention into durable business.
				</p>
				<div class="hero-cta mt-9 flex flex-col gap-3 sm:flex-row">
					<a
						class="bg-primary inline-flex h-14 items-center justify-center gap-3 rounded-full border border-foreground/15 px-7 font-semibold text-foreground transition-colors hover:bg-primary/80"
						href="#suite">Discover Tripo <span aria-hidden="true">↓</span></a
					>
				</div>
				<p class="mt-6 text-sm text-muted-foreground">
					<span class="mr-2 text-primary">●</span>One ecosystem. Better decisions. More momentum.
				</p>
			</div>
			<div class="hero-sequence-item relative lg:pl-8">
				<div class="absolute -top-12 -right-16 size-40 rounded-full border border-primary/40"></div>
				<div
					class="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-secondary p-4 shadow-soft sm:p-6"
				>
					<div
						class="flex items-center justify-between border-b border-foreground/10 pb-4 text-xs font-semibold tracking-[.14em] text-muted-foreground uppercase"
					>
						<span>DiMarket / Growth map</span><span class="text-primary">Live system</span>
					</div>
					<div class="grid gap-3 py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
						<div class="rounded-2xl bg-background p-5">
							<p class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
								Attention
							</p>
							<p class="mt-5 font-heading text-2xl font-semibold text-foreground">People notice</p>
							<div class="mt-4 h-2 rounded-full bg-primary/25">
								<div class="h-2 w-4/5 rounded-full bg-primary"></div>
							</div>
						</div>
						<div
							class="mx-auto grid size-12 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
						>
							→
						</div>
						<div class="rounded-2xl bg-foreground p-5 text-background">
							<p class="text-xs font-bold tracking-widest text-background/60 uppercase">Momentum</p>
							<p class="mt-5 font-heading text-2xl font-semibold">People act</p>
							<div class="mt-4 h-2 rounded-full bg-background/20">
								<div class="h-2 w-3/5 rounded-full bg-primary"></div>
							</div>
						</div>
					</div>
					<div
						class="flex items-end justify-between rounded-2xl bg-primary p-5 text-primary-foreground"
					>
						<div>
							<p class="text-xs font-bold tracking-widest uppercase opacity-70">
								The DiMarket approach
							</p>
							<p class="mt-2 max-w-xs font-heading text-2xl leading-tight font-semibold">
								Less noise. More useful growth.
							</p>
						</div>
						<span class="text-4xl">✦</span>
					</div>
				</div>
			</div>
		</section>

		<div class="border-y border-foreground/10 bg-secondary/60 py-5">
			<div
				class="animate-marquee flex w-max gap-12 text-sm font-semibold whitespace-nowrap text-muted-foreground"
			>
				<span>Strategy that compounds</span><span class="text-primary">●</span><span
					>Better customer journeys</span
				><span class="text-primary">●</span><span>Tools with a point of view</span><span
					class="text-primary">●</span
				><span>Strategy that compounds</span><span class="text-primary">●</span><span
					>Better customer journeys</span
				><span class="text-primary">●</span><span>Tools with a point of view</span>
			</div>
		</div>

		<section id="why" class="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-36">
			<div class="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
				<div>
					<p class="mb-5 text-sm font-bold tracking-[.18em] text-primary uppercase">Why DiMarket</p>
					<h2 class="text-4xl leading-tight font-semibold sm:text-5xl">
						Growth should feel clearer, not louder.
					</h2>
				</div>
				<div>
					<p class="max-w-2xl text-xl leading-8 text-muted-foreground">
						Most businesses do not need more disconnected tactics. They need a better read on what
						is happening, and a focused way to act on it.
					</p>
					<div class="mt-12 grid gap-8 border-t border-foreground/10 pt-8 sm:grid-cols-3">
						{#each focusAreas as area}<div>
								<p class="font-heading text-sm font-bold text-primary">{area.number}</p>
								<h3 class="mt-5 text-xl font-semibold">{area.title}</h3>
								<p class="mt-3 text-sm leading-6 text-muted-foreground">{area.text}</p>
							</div>{/each}
					</div>
				</div>
			</div>
		</section>

		<section id="suite" class="bg-foreground px-5 py-24 text-background lg:px-10 lg:py-32">
			<div class="mx-auto max-w-7xl">
				<div class="flex flex-col justify-between gap-8">
					<div>
						<p class="mb-5 text-sm font-bold tracking-[.18em] text-primary uppercase">
							Discover Tripo
						</p>
						<h2 class="max-w-2xl text-4xl leading-tight font-semibold text-background sm:text-5xl">
							<span class="text-muted">Introducing Tripo</span>
						</h2>
					</div>
					<p class="max-w-sm text-base leading-7 text-background/60">
						Start with the challenge in front of you. Build from there. 
						<a href="https://tripo.dimarket.biz/?utm-source=dimarket" class="text-[#6ce5b5] underline font-medium">Tripo</a> grows with the
						business you are building.
					</p>
				</div>
				<a href="https://tripo.dimarket.biz/?utm-source=dimarket">
				   <Button class="text-foreground mt-6 flex items-center gap-3">Learn more about Tripo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Button>
				</a>
				<div
					class="mt-16 grid gap-px overflow-hidden rounded-3xl border border-background/15 bg-background/15 md:grid-cols-3"
				>
					{#each capabilities as capability}<article
							class="bg-foreground p-7 transition-colors hover:bg-background/10 sm:p-9"
						>
							<span
								class="grid size-12 place-items-center rounded-full bg-primary font-heading text-xl font-bold text-primary-foreground"
								>{capability.icon}</span
							>
							<p class="mt-16 text-xs font-bold tracking-[.18em] text-primary uppercase">
								{capability.label}
							</p>
							<h3 class="mt-4 text-2xl font-semibold text-background"><span class="text-muted">{capability.title}</span></h3>
							<p class="mt-4 leading-7 text-background/60">{capability.text}</p>
						</article>{/each}
				</div>
			</div>
		</section>

		<section class="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-36">
			<div
				class="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-14 sm:px-14 lg:px-20 lg:py-20"
			>
				<div
					class="pointer-events-none absolute -top-28 -right-10 size-80 rounded-full border-[30px] border-primary-foreground/10"
				></div>
				<p class="relative text-sm font-bold tracking-[.18em] text-primary-foreground/70 uppercase">
					Your next move
				</p>
				<h2
					class="relative mt-5 max-w-3xl text-4xl leading-tight font-semibold text-primary-foreground sm:text-6xl"
				>
					Good growth starts with a clear direction.
				</h2>
				<p>Request a free audit of your website to see how you can optimize conversions</p>
				<div class="relative mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
					<a
						class="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-foreground px-7 font-semibold text-background transition-transform hover:-translate-y-1"
						href="https://tripo.dimarket.biz/free-audit?utm-source=dimarket">Get my free audit </a
					>
				</div>
			</div>
		</section>
	</main>

	<footer class="border-t border-foreground/10 px-5 py-10 lg:px-10">
		<div class="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-center">
			<a class="font-heading text-lg font-semibold text-foreground" href="/"
				>DiMarket<span class="text-primary">.</span></a
			>
			<div class="flex flex-wrap gap-6 text-sm text-muted-foreground">
				<a
					class="hover:text-foreground"
					href="https://tripo.dimarket.biz/?utm-source=dimarket">Tripo agency</a
				>
				<a class="hover:text-foreground" href="https://tripo.dimarket.biz/resources?utm-source=dimarket">Resources</a>
			</div>
			<p class="text-sm text-muted-foreground">© {new Date().getFullYear()} DiMarket</p>
		</div>
	</footer>
</div>
