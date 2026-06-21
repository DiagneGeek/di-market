<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Hero from "$lib/components/Hero.svelte"
	import ScrollHighlight from "$lib/components/ScrollHighlight.svelte";
    import Section from "$lib/components/Section.svelte"
</script>

<Hero>
 
    <h1 class="text-4xl text-center">
      Passer à une manière 
      <span class="bg-primary font-fraunces">plus simple</span> 
       de vendre <span class="highlight">dès aujourd'hui</span>
    </h1>
  
    <p class="mx-auto mb-4">
      Commencez à vendre de manière simple et efficace.
    </p>
    <a href="/vendeurs/inscription">
      <Button class="mx-auto">Commencer</Button>
    </a>
</Hero>

<ScrollHighlight once={true}>
<Section isForLanding={true}>
  <div class="px-4 py-2 mb-4 rounded-full bg-gradient bg-secondary/20 to-secondary/20">Moins de 2 jours pour faire comme les meilleurs</div>
  <h2 class="text-2xl text-center">
    Créez votre collection en <span class="text-secondary">moins d'une semaine</span>
  </h2>
  <p class="text-center">
    Ajoutez vos produits, leurs prix et leurs photos dans un espace propre et organisé, sans compétences techniques.
  </p>

  <img src="/collection.png" class="border-2 border-primary shadow-2xl shadow-primary/80 rounded-3xl my-3" alt="Collection DiMarket" />
  
</Section>
</ScrollHighlight>
<br>

<Section isForLanding={true}>
 <h2 class="text-2xl text-center">Partagez votre Collection</h2>
 <ScrollHighlight once={true}>
 <p class="text-center">
   Envoyez votre lien sur WhatsApp, Facebook ou Instagram et laissez vos clients découvrir vos produits plus facilement.
 </p>
 </ScrollHighlight>
  <img src="/contents/share-collection.jpg" class="border-2 border-primary shadow-2xl shadow-primary/80 rounded-3xl my-3" alt="Collection DiMarket" />
</Section>


<Section isForLanding>

 <h2 class="text-2xl text-center">Recevez vos premiers commandes</h2>
 
<ScrollHighlight once={true}>
 <p class="text-center">
   Recevez des commandes plus organisées avec toutes les informations nécessaires pour mieux gérer vos clients et vos livraisons.
 </p>
 </ScrollHighlight>
<ScrollHighlight once={true}>
  <img src="/order-page.png" class="border-2 border-primary shadow-2xl shadow-primary/80 rounded-3xl my-3" alt="Collection DiMarket" />
  </ScrollHighlight>
</Section>

<Section isForLanding>
 <h2 class="text-2xl text-center">Concentrez-vous sur votre croissance</h2>
 <p class="text-center">
   Vous pouvez maintenant vous concentrez sur l'agrandissement de votre business 
 </p>

  <ScrollHighlight once={true}>
  <img src="/growing.png" class="border-2 border-primary shadow-2xl shadow-primary/80 rounded-3xl my-3" alt="Collection DiMarket" />
  </ScrollHighlight>
</Section>


<Section isForLanding={true}>
  <h2 class="text-2xl text-center mb-8"><span class="text-red-400">Avant</span> et <span class="text-green-400">Après</span> DiMarket</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mt-3">
    <div class="p-6 rounded-2xl border-2 border-red-200 bg-red-50/50">
      <h3 class="text-xl font-bold text-red-600 mb-4">❌ Avant DiMarket</h3>
      <ul class="space-y-3 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span>Perdre des heures à gérer les commandes</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span>Noter manuellment les commandes</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span>Des erreurs à repetition</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span>Pas de suivi des paiements</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span>Des clients qui vous contactent pour chaque commande</span>
        </li>
      </ul>
    </div>
    <div class="p-6 rounded-2xl border-2 border-green-200 bg-green-50/50">
      <h3 class="text-xl font-bold text-green-600 mb-4">✅ Après DiMarket</h3>
      <ul class="space-y-3 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Toutes les commandes en un seul endroit</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Suivi clair et organisé de chaque commande</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Des commandes créées automatiquement</span>
        </li>
         <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Savoir combien vous doit chaque client</span>
        </li>
         <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Des commandes plus rapides pour vos clients</span>
        </li>
         <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Fidelisation des clients</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Plus de temps pour développer votre business</span>
        </li>
      </ul>
    </div>
  </div>
</Section>

<Section isForLanding={true} class="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 rounded-3xl shadow-3xl shadow-primary/50">
  <h2 class="text-2xl text-center mb-8">Prêt à faire le <span class="text-green-400">grand saut</span> ?</h2>
  <p class="text-center mb-6">  
    Rejoignez les centaines de vendeurs qui ont déjà transformé leur manière de vendre avec DiMarket.
  </p>
  <div class="flex justify-center">
    <a href="/vendeurs/inscription">
      <Button class="px-8">Commencer Maintenant</Button>
    </a>
  </div>
</Section>