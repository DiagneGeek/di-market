import { writable } from "svelte/store"

export const useCart = () => {
    const initialCart = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : []
    const cart = writable(initialCart)

    const saveCart = (cartData: any) => {
        localStorage.setItem("cart", JSON.stringify(cartData))
    }

    const addItem = (item: {
        product: any,
        quantity: number,
        seller_id: number, 
        sellerName?: string
    }) => {
        cart.update(currentCart => {
            const sellersCart = currentCart.findIndex((subCart: any) => subCart.seller_id === item.seller_id)
            if (sellersCart === -1) {
                item.product = {
                    id: item.product.id,
                    name: item.product.name,
                    price: item.product.discount ? item.product.discount_type === "percentage" ? (Number(item.product.price) - (Number(item.product.price) * item.product.discount / 100)) * item.quantity : (Number(item.product.price) - item.product.discount) * item.quantity : item.product.price,
                    image: item.product.image,
                    title: item.product.title
                }
                const sellerName = item.sellerName
                delete item.sellerName
                currentCart.push({
                    seller_id: item.seller_id,
                    sellerName,
                    items: [item]
                })
            } else {
                currentCart[sellersCart].items.push(item)
            }
            saveCart(currentCart)
            return currentCart
        })
    }

    const changeQuantity = (seller_id: number, index: number, quantity: number) => {
        cart.update(currentCart => {
            const sellersCart = currentCart.findIndex((subCart: any) => subCart.seller_id === seller_id)
            if (sellersCart !== -1) {
                currentCart[sellersCart].items[index].quantity = quantity
                saveCart(currentCart)
            }
            return currentCart

        })
    }

    const removeItem = (seller_id: number, index: number) => {
        cart.update(currentCart => {
            const sellersCart = currentCart.findIndex((subCart: any) => subCart.seller_id === seller_id)
            if (sellersCart !== -1) {
                currentCart[sellersCart].items.splice(index, 1)
                if (currentCart[sellersCart].items.length === 0) {
                    currentCart.splice(sellersCart, 1)
                }
                saveCart(currentCart)
            }
            return currentCart
        })
    }

    const removeSubcart = (seller_id: number) => {
        cart.update(currentCart => {
            const sellersCart = currentCart.findIndex((subCart: any) => subCart.seller_id === seller_id)
            if (sellersCart !== -1) {
                currentCart.splice(sellersCart, 1)
                saveCart(currentCart)
            }
            return currentCart
        })
    }

    const clearCart = () => {
        cart.set([])
        saveCart([])
    }

    return {
        cart,
        addItem,
        removeItem,
        removeSubcart,
        changeQuantity,
        clearCart
    }
}