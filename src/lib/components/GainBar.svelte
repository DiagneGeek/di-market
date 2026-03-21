<script lang="ts">
  let sellers = $state(1);
  const commissionPerSeller = 10000; // FCFA

  const totalCommission = $derived(sellers * commissionPerSeller);

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-FR');
  };
</script>

<section class="my-16 sm:my-20">
  <div class="max-w-2xl mx-auto px-4 sm:px-6">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900">
      💰 Calculez Vos Gains
    </h2>
    
    <div class="bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-yellow-300 rounded-2xl p-8 sm:p-12 shadow-sm">
      <div class="mb-8 sm:mb-12">
        <label for="sellers-input" class="block text-sm sm:text-base font-semibold text-gray-800 mb-4">
          Combien de vendeurs allez-vous référer chaque mois ?
        </label>
        <div class="flex items-center gap-4">
          <input
            id="sellers-input"
            type="number"
            bind:value={sellers}
            min="1"
            max="1000"
            class="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl font-bold text-center border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          />
          <span class="text-lg sm:text-2xl font-bold text-gray-800 whitespace-nowrap">vendeurs</span>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 sm:p-8 border border-yellow-200">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          <div class="text-center">
            <p class="text-xs sm:text-sm text-gray-600 font-medium mb-2">Commission par vendeur</p>
            <p class="text-2xl sm:text-3xl font-bold text-yellow-600">
              {formatNumber(commissionPerSeller)}
            </p>
            <p class="text-xs text-gray-500 mt-1">FCFA</p>
          </div>
          
          <div class="hidden sm:flex items-center justify-center">
            <div class="text-2xl text-gray-400">×</div>
          </div>
          
          <div class="text-center sm:hidden">
            <p class="text-sm text-gray-400">×</p>
          </div>

          <div class="text-center">
            <p class="text-xs sm:text-sm text-gray-600 font-medium mb-2">Vos référencements</p>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">
              {sellers}
            </p>
          </div>
          
          <div class="hidden sm:flex items-center justify-center">
            <div class="text-2xl text-gray-400">=</div>
          </div>

          <div class="hidden sm:block"></div>
        </div>

        <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-yellow-200">
          <p class="text-xs sm:text-sm text-gray-600 font-medium mb-2 text-center">Vos gains mensuels</p>
          <p class="text-4xl sm:text-5xl font-bold text-center text-yellow-600">
            {formatNumber(totalCommission)}
          </p>
          <p class="text-xs sm:text-sm text-gray-500 text-center mt-2">FCFA/mois</p>
        </div>
      </div>

      <p class="text-xs sm:text-sm text-gray-600 text-center mt-6 sm:mt-8 italic">
        💡 Les gains sont versés mensuellement via Wave après la fin de la période d'essai gratuit (1 mois)
      </p>
    </div>
  </div>
</section>
