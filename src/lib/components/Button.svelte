<script lang="ts">
    let {children, label, variant = "primary", size = "lg", "class": _class, ...props} : {
        children?: any,
        label?:any,
        variant?: string,
        class?: string,
        size?: "md" | "sm" | "lg",
        [key: string]: any
    } = $props()

    variant ||= "primary"

    const type = {
        primary: "bg-primary text-t-ligher hover:bg-primary-hover hover:scale-105",
        secondary: "bg-secondary text-light hover:bg-secondary-hover text-light",
        neutral: "bg-gray-200 hover:bg-gray-300",
        outline: "bg-transparent hover:bg-gray-200",
        danger: "bg-red-100 border border-red-500 text-red-400 hover:bg-red-200",
        dangerOutline: "border border-red-50 text-red-400 hover:bg-red-100"
    }[variant]

    const padding = size == "lg" ? "py-4 px-6" : size === "sm" ? "py-2 px-4" : "py-3 px-5"
</script>

{#if children}
<button
  class="text-[14px] {padding} rounded-3xl font-semibold {type} {_class}"
  {...props}
>
    {@render children()}
</button>
{:else}
<button
  class="text-[14px] {padding} disabled:opacity-50 rounded-3xl font-semibold {type} {_class}"
  {...props}
 >
        {label}
 </button>
{/if}