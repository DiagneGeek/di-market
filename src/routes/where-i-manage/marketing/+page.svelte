<script lang="ts">
  import AdminShell from "$lib/components/AdminShell.svelte";
</script>

<AdminShell active="marketing">
  <section class="space-y-6">
    <div class="rounded-3xl border border-gray-200 bg-card p-8 shadow-sm">
      <h1 class="text-3xl font-bold">Marketing</h1>
      <p class="mt-3 text-gray-600 max-w-2xl">Page marketing disponible ici. Nous pouvons y ajouter les campagnes, les performances des affiliés et les actions de communication.</p>
    </div>
  </section>

  <a href="marketing/leads">Leads</a>
</AdminShell>


