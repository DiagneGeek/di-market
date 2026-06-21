<script lang="ts">
  import AdminShell from "$lib/components/AdminShell.svelte";
  const { children } = $props();
</script>

<AdminShell active="dashboard">
  {@render children()}
</AdminShell>