<script lang="ts">
	import { page } from '$app/stores';
    import Button from "$lib/components/Button.svelte"
    import { useCart } from "$lib/composables/useCart.svelte"

	const sellerId = $page.params.seller_id;
	const orderNumber = $page.url.searchParams.get("order_number")
	const sellerName = $page.url.searchParams.get("seller_name") ?? 'collection';
	const total = $page.url.searchParams.get("total");

	const {removeSubcart} = useCart()

	if (sellerId) {
		removeSubcart(parseInt(sellerId))
	}
</script>

<section class="success-page" aria-labelledby="success-title">
	<div class="card">
		<div class="icon" aria-hidden="true">
			<svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="12" cy="12" r="10" fill="#E6FFED"/>
				<path d="M7.5 12.5l2.5 2.5L16.5 9" stroke="#059669" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>

		<h1 id="success-title">Commande confirmée</h1>

		<p class="text-gray">
            Félicitations! Votre commande a été confirmée et le vendeur à été informé de votre commande. Il peut vous envoyer un message pour régler les dernières details</p>

		<dl class="order-meta">
			<div>
				<dt>Numéro de commande</dt>
				<dd>{orderNumber}</dd>
			</div>
			<div>
				<dt>collection</dt>
				<dd>{sellerName}</dd>
			</div>
			{#if total}
				<div>
					<dt>Montant</dt>
					<dd>{parseInt(total).toLocaleString('fr-FR')} fcfa</dd>
				</div>
			{/if}
		</dl>

		<div class="actions">
			<a href="/">
              <Button>
                Retour au magasin
              </Button>
            </a>
			<a href="/collections/{sellerId}">
              <Button variant="outlineSecondary">
                Voir la collection
              </Button>
            </a>
			<a href="/panier">
              <Button variant="ghost">
                Voir mon panier
              </Button>
            </a>
		</div>

		<p class="note">Si vous avez des questions, contactez la collection.</p>
	</div>
</section>

<style>
	.success-page{min-height:60vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;background:linear-gradient(180deg,#F6FFFA 0%, #FFFFFF 100%)}
	.card{max-width:720px;width:100%;background:#fff;border-radius:12px;padding:2rem;box-shadow:0 6px 20px rgba(4,17,29,0.08);text-align:center}
	.icon{display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}
	h1{font-size:1.5rem;margin:.25rem 0;color:#064E3B}
	.lead{color:#065F46;margin-bottom:1rem}
	.order-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.75rem;margin:1rem 0 1.25rem;text-align:left}
	dt{font-size:.875rem;color:#6B7280}
	dd{font-weight:600;color:#0F172A;margin-top:.25rem}
	.actions{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;margin-top:1rem}

	.note{font-size:.9rem;color:#4B5563;margin-top:1rem}

	@media (max-width:520px){
		.card{padding:1.25rem}
		h1{font-size:1.25rem}
		.actions{flex-direction:column}
		.btn{width:100%}
	}
</style>