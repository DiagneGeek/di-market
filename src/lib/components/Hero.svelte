<script lang="ts">
    const  {children} = $props()
</script>

<div class="relative w-full min-h-[40vh] sm:min-h-[50vh] my-6 sm:my-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl overflow-hidden">
    <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,%3Csvg width=%22120%22 height=%22120%22 viewBox=%220%200%20120%20120%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2260%22 cy=%2260%22 r=%2252%22/%3E%3Ccircle cx=%2260%22 cy=%2260%22 r=%2240%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'); background-size: 120px 120px;"></div>
    <div class="relative z-10 text-center max-w-4xl px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
        {@render children()}
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-back-main to-transparent"></div>
</div>
