<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import Textarea from "$lib/components/Textarea.svelte";
    import Button from "$lib/components/Button.svelte";
    import { useToast } from "$lib/composables/useToast";
    import { page } from "$app/stores"
    import { goto, invalidateAll } from "$app/navigation"
    import {productCatagories} from "../categories"
    
    interface Detail {
        name: string,
        value: string
    }

    interface FormData {
        title: string
        price: string
        description: string
        category: string
        image: File | null
    }

    interface Errors {
        title?: string 
        price?: string
        description?: string
        category?: string
        image?: string
        submit?: string
    }

    const {data} = $props()

    const isSetup = $page.url.searchParams.get("setup") === "true"
    const toast = useToast()
    
    let form = $state<FormData>({
        title: "",
        price: "",
        description: "",
        category: "",
        image: null
    })

    let errors = $state<Errors>({})
    let isSubmitting = $state(false)
    let filePreview = $state<string>("")
    let details: Detail[] = $state([])
    let fileAdded = $state(false)

    function handleImageChange(e: Event) {
        const input = e.target as HTMLInputElement
        const file = input.files?.[0]
        
        if (file) {
            form.image = file
            filePreview = URL.createObjectURL(file)
            errors.image = ""
        }
    }
   
    function validateForm(): boolean {
        const newErrors: Errors = {}
        if (!form.title || form.title.trim().length < 5) {
            newErrors.title = "Le nom du produit est requis"
            toast.show("Veuillez remplir un nom valide de produit", "error", 4000)
        }
        
        if (!form.price || form.price.trim().length === 0) {
            newErrors.price = "Le prix est requis"
            toast.show("Veuillez remplir un prix valide", "error", 4000)
        } else if (!Number.isInteger(parseFloat(form.price)) || parseFloat(form.price) <= 0) {
            newErrors.price = "Le prix ne doit pas contenir de virgule et doit être supérieur à zéro"
            toast.show("Le prix doit être un nombre sans virgule supérieur à zéro", "error", 4000)
        }
        
        if (!form.image) {
            newErrors.image = "L'image du produit est requise"
            toast.show("Veuillez ajouter une image pour votre produit", "error", 4000)
        }
        
        if (!isSetup && (!form.description || form.description.trim().length === 0)) {
            newErrors.description = "La description du produit est requise"
            toast.show("Veuillez remplir une description valide", "error", 4000)
        }
        
        errors = newErrors
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e: Event) {
        e.preventDefault()
        isSubmitting = true
        if (!validateForm()) {
            toast.show("Veuillez corriger les erreurs", "error", 4000)
            isSubmitting = false
            return
        }

        errors = {}

        try {
            const formData = new FormData()
            formData.append("title", form.title)
            formData.append("price", form.price)
            formData.append("description", form.description || "")
            formData.append("category", form.category)
            formData.append("image", form.image!)
            
            // Get user and existing products from page data
            formData.append("user", JSON.stringify(data.user))
            formData.append("products", JSON.stringify(data.products || []))

            const response = await fetch("/vendeurs/dashboard/api/add", {
                method: "POST",
                body: formData
            })

            const result = await response.json()

            if (!response.ok) {
                errors.submit = result.message || "Une erreur est survenue lors de l'ajout du produit"
                toast.show(errors.submit, "error", 4000)
                return
            }

            // Success!
            toast.show("Produit ajouté avec succès!", "success", 3000)
            goto(`/vendeurs/dashboard/produits?reload=true`)
            
            // Reset form
            form = {
                title: "",
                price: "",
                description: "",
                category: "",
                image: null
            }
            filePreview = ""
            details = []

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erreur réseau"
            errors.submit = errorMessage
            toast.show(errorMessage, "error", 4000)
        } finally {
            isSubmitting = false
        }
    }
</script>
<h1 class="text-center">{isSetup ? "Ajoutez vos premiers produits" : "Ajoutez un produit !"} </h1>
<p class="text-center text-gray-500">{isSetup ? "Commencez par vos meilleurs produits" : "Ajoutez un produit à votre boutique"}</p>
<form 
 onsubmit={handleSubmit}
 class="my-8 flex flex-col gap-5 max-w-[500px] mx-auto bg-card p-4 rounded-3xl"
 >
  <Input
    type="text"
    name="title"
    label="Nom de votre produit (necessaire)"
    placeholder="Nom du produit"
    validity={{
      when: (value) => value.trim().length >= 5,
      message: "Le nom du produit doit contenir au moins 5 caractères",
    }}
    oninput={(e: Event) => form.title = (e.target as HTMLInputElement).value }
  />
  
  <input 
    onchange={(e: Event) => {
      const input = e.target as HTMLInputElement
      const file = input.files?.[0]
      if (file) {
        form.image = file
        fileAdded = true
        if (errors.image) delete errors.image
      }
    }}
    id="image-input" type="file" name="image" class="hidden" accept="image/*" />
  <div class="w-full flex flex-col items-center gap-4">
   {#if fileAdded}
    <img src={URL.createObjectURL((document.querySelector("#image-input") as HTMLInputElement)?.files?.[0] as File)} class="max-w-[280px] mx-auto my-2 " alt="Preview"/>
    {/if}
    <Button
      variant="sober"
      class="mx-auto"
      type="button"
      onclick={() => {
        fileAdded = false
        const el = document.querySelector("#image-input") as HTMLInputElement
        if (el) {
            el.value = ""
            el.click()
        }
      }}
      label={fileAdded ? "Modifier" : "Ajouter une image (nécessaire)"}
    />
    {#if errors.image}
      <p class="text-red-500 text-sm">{errors.image}</p>
    {/if}
  </div>
  <Input
    type="number"
    name="price"
    label="Prix du produit (nécessaire)"
    placeholder="Prix du produit"
    validity={{
      when: value => Number.isInteger(parseFloat(value)) && parseFloat(value) > 0,
      message: errors.price || "Le prix ne doit pas contenir de virgule et doit être supérieur à zéro"
    }}
    oninput={(e: Event) => form.price = (e.target as HTMLInputElement).value }
  />

  {#if !isSetup}
  <Textarea 
    name="description" 
    label="Décrivez votre produit (nécessaire)"
    placeholder="Description du produit"   
     oninput={(e: Event) => form.description = (e.target as HTMLInputElement).value }
    class="w-full h-[150px] resize-none"
  />
  {#if errors.description}
    <p class="text-red-500 text-sm">{errors.description}</p>
  {/if}
  <div>
   <Input 
     list="categories"
     name="category"
     oninput={(e: Event) => form.category = (e.target as HTMLInputElement).value }
     value=""
     label="Categorie du produit (optionnel)"
     placeholder="Choisir une categorie"></Input>
   <datalist id="categories">
     {#each productCatagories as category}
       <option value={category}></option>
     {/each}
  </datalist>
  </div>

  <div class="p-2 rounded-2xl shadow">
    <h3>Details (optionnels)</h3>
    <p class="text-gray-500 text-[13px]">
       Vous pouvez ajouter des détails à votre produit (marque, etat, model, taille etc) pour répondre aux questions et augmenter vos chances de ventes
    </p>

    {#each details as detail, index}
       <div class="flex gap-1 flex-wrap my-4 w-full max-w-[400px]">
         <Input 
          placeholder="Nom du detail"
          name={`detail-${index}-name`}
          value={detail.name}
          oninput={(e: Event) => {
            details[index].name = (e.target as HTMLInputElement).value
          }}
          />
  
          <Input
            placeholder="Valeur du détail"
            name={`detail-${index}-value`}
            value={detail.value}
            oninput={(e: Event) => {
              details[index].value = (e.target as HTMLInputElement).value
            }}
            />
       </div>
         <hr class="w-full border-gray-300 ">
    {/each}
    <Button
      type="button"
      variant="sober"
      onclick={() => {
        details.push({name: "", value: ""})
      }}
      label="Ajouter un detail"
      class="mt-2"
    />
  </div>
  {/if}
  <Button type="submit">Ajouter</Button>
</form>