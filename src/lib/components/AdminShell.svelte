<script lang="ts">
  import NavBar from "$lib/components/NavBar.svelte";
  export let active: string = "dashboard";

  const links = [
    { label: "dashboard", href: "/where-i-manage/dashboard", key: "dashboard" },
    { label: "utilisateurs", href: "/where-i-manage/utilisateurs", key: "utilisateurs" },
    { label: "transactions", href: "/where-i-manage/transactions", key: "transactions" },
    { label: "affliers", href: "/where-i-manage/affliers", key: "affliers" },
    { label: "marketing", href: "/where-i-manage/marketing", key: "marketing" }
  ];
</script>

<NavBar>
  {#each links as link}
    <a
      href={link.href}
      class={`text-sm px-3 py-2 rounded-2xl transition ${active === link.key ? "bg-secondary/10 text-secondary font-semibold" : "text-gray-700 hover:text-secondary"}`}
      aria-current={active === link.key ? "page" : undefined}
    >
      {link.label}
    </a>
  {/each}
</NavBar>

<main class="pt-[110px] px-4 sm:px-6 lg:px-10 pb-10 max-w-screen-2xl mx-auto">
  <slot />
</main>
