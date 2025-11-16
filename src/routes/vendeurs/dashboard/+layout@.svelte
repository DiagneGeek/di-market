<script lang="ts">
	import Button from '../../../components/Button.svelte';
	import NavBar from '../../../components/NavBar.svelte';

    const {children, data} = $props()
</script>

<NavBar>
    <Button _class="text-[14px]" variant="neutral">Profile {" "} <span class="bg-secondary/25 p-2 shadow rounded-full font-bold">{data.user.name.slice(0, 2).toUpperCase()}</span></Button>
</NavBar>

{@render children()}