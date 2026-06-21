<script lang="ts">
	import Hero from "$lib/components/Hero.svelte";
	import Input from "$lib/components/Input.svelte";
	import Button from "$lib/components/Button.svelte";

    const { form } = $props()

	let password = $state("");
	let isLoading = $state(false);

	const handleAdminAccess = async () => {
		isLoading = true;
		// Add your admin authentication logic here
		console.log("Attempting to access admin dashboard with password");
		// Simulate API call
		setTimeout(() => {
			isLoading = false;
		}, 1000);
	};
</script>

<div class="flex flex-col items-center justify-center">
	<Hero>
			<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
				🎭 Welcome Back, <br> Mystery Admin! 🎭
			</h1>
			<p class="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto">
				We don't know who you are, but we know you're supposed to be here... probably.
			</p>

			
			<form method="POST" class="flex flex-col items-center justify-center gap-4 mt-8 max-w-md mx-auto">
				<Input
					type="password"
					label="Your Secret"
					bind:value={password}
					placeholder="Enter the magic words..."
					class="w-[280px]"
                    name="password"
				/>
				<Button
					variant="primary"
					size="lg"
                    type="submit"
					class="w-full"
					disabled={!password || isLoading}
				>
					{isLoading ? "Unlocking..." : "Access Dashboard"}
				</Button>
			</form>
           <p class="text-sm mt-2 p-4 bg-card rounded-2xl">{form?.error}</p>
	</Hero>
</div>