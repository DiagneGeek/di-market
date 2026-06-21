<script lang="ts">
	import { page } from '$app/state';

  const {children} = $props()
  const isInSlug = page.url.pathname.split("/").filter(Boolean).length > 2
</script>

<div class={isInSlug ? "resource-layout" : ""}>
    {@render children()}
</div>
