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
        primary: "bg-primary text-slate-50 hover:bg-primary-hover transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95",
        secondary: "bg-secondary text-white hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg active:scale-95",
        neutral: "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 border border-gray-200 active:scale-95",
        outline: "bg-transparent text-[13px] text-t-main hover:bg-primary/5 scale-90 transition-all duration-200 active:scale-85",
        outlineSecondary: "border-2 bg-transparent text-[13px] text-t-main hover:bg-secondary/5 transition-all duration-200 active:scale-95",
        danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all duration-200 hover:shadow-lg active:scale-95",
        dangerOutline: "text-red-600 hover:bg-red-50 transition-all duration-200 scale-90 active:scale-85"
    }[variant]

    const padding = variant.includes("outline") ? (size == "lg" ? "py-3 px-5" : size === "sm" ? "p-2" : "p-1") : (size == "lg" ? "py-4 px-6" : size === "sm" ? "py-2 px-4" : "py-3 px-5")
</script>

{#if children}
<button
  class="text-[14px] {padding} rounded-2xl font-semibold {type} {_class} disabled:opacity-50 disabled:cursor-not-allowed"
  {...props}
>
    {@render children()}
</button>
{:else}
<button
  class="text-[14px] {padding} rounded-2xl font-semibold {type} {_class} disabled:opacity-60 disabled:cursor-not-allowed"
  {...props}
 >
        {label}
 </button>
{/if}