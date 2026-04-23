<script lang="ts">
  import { onMount } from "svelte";

  let headings: { id: string; level: number; title: string }[] = [];
  let activeId = "";

  onMount(() => {
    // Extract headings from the page
    const elements = document.querySelectorAll("h2");
    
    headings = Array.from(elements)
      .filter((el, idx) => el.textContent?.trim() && idx != -1)
      .map((el, index) => {
        const id = el.id || `heading-${index}`;
        el.id = id;
        return {
          id,
          level: parseInt(el.tagName.substring(1)),
          title: el.textContent || "",
        };
      });

    // Set up scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  function scrollToHeading(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function getIndentClass(level: number): string {
    const indents: { [key: number]: string } = {
      1: "pl-0",
      2: "pl-4",
      3: "pl-8",
      4: "pl-12",
      5: "pl-16",
      6: "pl-20",
    };
    return indents[level] || "pl-0";
  }
</script>

<nav class=" top-8 max-h-[calc(100vh-4rem)] overflow-y-auto max-w-2xl">
  <div class="bg-card rounded-2xl p-5 border border-gray-100/60 shadow-lg backdrop-blur-sm">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-gradient-to-b from-primary to-primary/60 rounded-full" />
      <h3 class="text-lg font-bold text-gray-900">Contenu</h3>
    </div>

    {#if headings.length > 0}
    <!-- svelte-ignore unknown-prop -->
      <ul class="space-y-2" nobullet="true">
        {#each headings as heading (heading.id)}
          <li>
            <button
              on:click={() => scrollToHeading(heading.id)}
              class={`w-full text-left px-4 py-1 rounded-xl transition-all duration-300 font-medium text-sm relative group overflow-hidden ${getIndentClass(
                heading.level
              )} ${
                activeId === heading.id
                  ? "text-primary bg-gradient-to-r from-primary/15 to-transparent shadow-md"
                  : "text-gray-700 hover:text-primary hover:bg-gray-50/80"
              }`}
            >
              {#if activeId === heading.id}
                <div
                  class="absolute py-2 left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full"
                ></div>
              {/if}
              <div class="flex items-center gap-2">
                <span class="text-xs opacity-50">
                  {#if heading.level === 2}
                    ◆
                  {:else if heading.level === 3}
                    ○
                  {:else if heading.level === 4}
                    ▪
                  {:else}
                    •
                  {/if}
                </span>
                <span class="line-clamp-2">{heading.title}</span>
              </div>
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-sm text-gray-400 italic px-4 py-2">Aucun titre trouvé</p>
    {/if}
  </div>
</nav>

<style>
  nav::-webkit-scrollbar {
    width: 6px;
  }

  nav::-webkit-scrollbar-track {
    background: transparent;
  }

  nav::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  nav::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
</style>
