<script lang="ts">
    interface Props {
        children: any,
        isForLanding?: boolean,
        class?: string
    }
    const {children, isForLanding  = false, 'class': _class = ""} : Props = $props()
</script>

<section
  class="flex flex-col items-center w-full *:max-w-3xl my-14 {isForLanding ? '[&>h2]:text-3xl' : ''} {_class}"
>
  {@render children()}
</section>