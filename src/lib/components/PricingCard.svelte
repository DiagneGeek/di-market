<script>
    import Button from "./Button.svelte"
      const {
        title = "Pro",
        price = "10 000 FCFA",
        period = "/month",
        features = [],
        freeTrial = false,
        highlighted = false,
        children
      } = $props();
  </script>

<div class="w-[295px] p-4 rounded-2xl bg-card shadow {highlighted ? "border border-secondary bg-neutral-900 text-t-white" : ""}" class:highlighted>
      <h3 class="text-xl flex justify-center items-center gap-4">
        <span class={highlighted && "text-white"}>{title}</span>
        {#if highlighted}
          <span class="bg-secondary p-2 rounded-full text-xs">
            Recommendé
          </span>
        {/if}
      </h3>

      <div class="mb-4">
        <span class="text-xl font-bold italic">{price}</span>
        <span class="period">{period}</span>
        <p class="mb-1 text-secondary text-shadow">{freeTrial ? "Fait pour les professionnels en ventes !" : ""}</p>
        <p class="highlight">{freeTrial ? "Les 2 premières semaines offertes" : ""}</p>
      </div>

      <ul class="flex flex-col gap-2 px-4 mb-4">
         {#each features as feature}
            <li class="text-left">✓ {feature}</li>
         {/each}
      </ul>

     {@render children()}
  </div>
