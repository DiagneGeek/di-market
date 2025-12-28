<script lang="ts">
    interface Props {
        children: any,
        isForLanding?: boolean,
        class?: string,
        id?: string 
    }
    const {children, isForLanding  = false, 'class': _class = "",  id=""} : Props = $props()
</script>

<section
  {id}
  class="flex flex-col items-center w-full *:max-w-3xl my-14 {isForLanding ? '[&>h2]:text-3xl my-24' : ''} {_class}"
>
  {@render children()}
</section>