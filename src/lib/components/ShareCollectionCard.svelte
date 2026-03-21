<script lang="ts">
  import Button from "./Button.svelte";
  import { useToast } from "$lib/composables/useToast";
  
  interface Props {
    sellerId: number;
    sellerName: string;
    productCount?: number;
    compact?: boolean;
  }

  const { sellerId, sellerName, productCount = 0, compact = false } = $props();

  const collectionUrl = `https://dimarket.biz/collections/${sellerId}`;
  const toast = useToast();

  const copyUrl = () => {
    navigator.clipboard.writeText(collectionUrl);
    toast.show("Lien copié! Partagez-le maintenant 📋", "success", 2000);
  };
</script>

<div 
  class="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary rounded-xl p-6 {compact ? 'md:col-span-2' : ''}"
>
  <div class="flex flex-col gap-4">
    <div>
      <h3 class="text-2xl font-bold text-primary mb-2">🎉 Partagez votre Collection!</h3>
      <p class="text-secondary mb-1">Votre collection est prête à être découverte</p>
      <p class="text-sm text-gray-600">
        {productCount > 0 
          ? `Vous avez ${productCount} produit${productCount > 1 ? 's' : ''} en ligne. Partagez votre collection avec vos clients !` 
          : 'Commencez à partager votre collection dès maintenant.'}
      </p>
    </div>

    <!-- Copy URL Section -->
    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200 flex gap-2 items-center">
      <p class="text-xs text-gray-600 font-medium flex-1 truncate">{collectionUrl}</p>
      <Button 
        size="sm"
        variant="primary" 
        onclick={copyUrl}
        class="whitespace-nowrap"
      >
        📋 Copier
      </Button>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 flex-col sm:flex-row">
      <a href={collectionUrl} class="flex-1">
        <Button variant="neutral" class="w-full">
          👁️ Voir ma Collection
        </Button>
      </a>
      <a href="/ressources" class="flex-1">
        <Button variant="neutral" class="w-full">
          Comment ça marche ?
        </Button>
      </a>
    </div>

    <div class="text-xs text-gray-500 border-t pt-3">
      <p>💡 <strong>Conseil:</strong> Partagez le lien de votre collection sur vos réseaux sociaux pour attirer plus de clients</p>
    </div>
  </div>
</div>
