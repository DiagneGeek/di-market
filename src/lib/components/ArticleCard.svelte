<script lang="ts">
  import { trimText } from "../composables/trim";
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte"
  import Input from "./Input.svelte"
  import Textarea from "./Textarea.svelte"
	import Error from "../../routes/+error.svelte";

  let modalIsOpen = $state(false)
  let modal2IsOpen = $state(false)

  const {title, seller, price, slug, img: imgSrc, id = null, description = null} = $props()

  const deleteProduct = async (e: Event) => {
     e.preventDefault()
     const form = new FormData()
     form.append("productId", id)
     try {
      const res = await fetch("/vendeurs/dashboard/api/delete", {
        method: "DELETE",
        body: form
	  })
     } catch (err) {
       alert(`Erreur: ${err}`)
	 }
   modalIsOpen = false
   window.location.reload()
  }

  const updateProduct = async (e: Event) => {
    e.preventDefault()

    const form = new FormData(e.target as HTMLFormElement)
    form.append("id", id as string)

    try {
      const res = await fetch("/vendeurs/dashboard/api/update", {
        method: "PUT",
        body: form
      })
    } catch (err) {
      alert(`Erreur: ${err}`)
    }

    modal2IsOpen = false
    window.location.reload()
  }
</script>

<article
  class="flex flex-col justify-between p-3 rounded-3xl bg-card gap-2 w-[280px] {id ? "h-[400px]" : "h-[350px]"} border-red-400"
>
 <div class="flex flex-col gap-2">
   <img 
     src={imgSrc} 
     alt={title} 
     class="w-full h-[180px] rounded-2xl object-cover"
    />
    <h2 class="text-2xl font-bold text-red-400">{trimText(title, 35)}</h2>
</div>
    <div class="flex flex-col justify-start mt-1 *:w-full">
      
        <div class="flex justify-between items-center">
          <p>{price}fcfa</p>
          <a href={`/products/${slug}`}>
            <Button variant="neutral">Voir plus</Button>
          </a>
        </div>
       {#if id}
       <div class="flex justify-between p-2 my-2 items-center">
        <Button 
          class="flex gap-2"
          onclick={() => modal2IsOpen = true}
          variant="outline">
          <img src="/edit.svg" alt="edit" class="w-4"/>
          Modifier</Button>
         <Button
          class="flex gap-2"
          onclick={() => modalIsOpen = true}
          variant="dangerOutline">
          <img class="w-4 text-red-500" src="/trash.svg" alt="trash" />
          Supprimer</Button>
        </div>

         <Modal onSubmit={deleteProduct} open={modalIsOpen} close={() => modalIsOpen = false}>
          <p>
            Êtes vous sure de vouloir supprimer le produit "{title}" ?
          </p>
         </Modal>
       {/if}
    </div>
</article>

<Modal onSubmit={updateProduct} open={modal2IsOpen} close={() => modal2IsOpen = false}>
    <div class="flex flex-col items-center gap-4">
        <Input 
          label="Nom du produit" 
          name="title"
          minlength="5"
          placeholder="Nom de votre produits"
          value={title}
          required 
         />
         <Input 
          label="Prix" 
          name="price"
          type="number"
          value={price}
          placeholder="Prix de votre produits"
          required 
        />                                                                                                                                                 

        <Textarea 
           placeholder="Decrivez votre produit"
           name="description"
           class="w-full"
           value={description}
        />
      </div>
</Modal>
