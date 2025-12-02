<script>
	import Button from "$lib/components/Button.svelte";
	import Section from "$lib/components/Section.svelte";
    const {data} = $props()
</script>

<h1>Profile</h1>

<Section class="border-2 border-card py-12">
  <div class="flex justify-around w-full items-center">
    <div class="bg-secondary/25 p-4 text-2xl shadow rounded-full font-bold">
      {data.user.name.slice(0, 2).toUpperCase()}
    </div>
    <form action="?/disconnect">
    <Button type="submit" variant="danger">Se deconnecter</Button>
    </form>
  </div>
  <br>
  <h2 class="text-2xl mt-4">Informations</h2>

  <div class="flex w-full max-w-xl justify-between flex-wrap items-center p-2 px-4 rounded-3xl bg-card my-4">
    <p>nom de la boutique:</p>
    <p>{data.user.name}</p>
  </div>
  <div class="flex w-full max-w-xl justify-between flex-wrap items-center p-2 px-4 rounded-3xl bg-card my-4">
    <p>Numero de telehone:</p>
    <p>{data.user.phone}</p>
  </div>
</Section>
