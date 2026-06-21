import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Product, Event } from '$lib/types';

export const load: PageServerLoad = async ({ parent }) => {
  const { user, products, events, isPremium } = await parent();

  if (!user) {
    throw error(401, 'Unauthorized');
  }

  // Generate suggestions based on data
  const suggestions = [];

  // Check if no products
  if (!products || products.length === 0) {
    suggestions.push({
      title: 'Ajoutez vos premiers produits',
      description: 'Votre boutique est vide. Ajoutez des produits pour que les clients puissent commander.',
      type: 'urgent',
      cta: {
        text: 'Ajouter un produit',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Check products without images
  const productsWithoutImages = products?.filter((p: Product) => !p.image || p.image.length === 0) || [];
  if (productsWithoutImages.length > 0) {
    suggestions.push({
      title: 'Améliorez vos photos de produits',
      description: `${productsWithoutImages.length} produits n'ont pas d'image. Mettez des photos pour que les clients voient le produit.`,
      type: 'normal',
      cta: {
        text: 'Ajouter des images',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Check products without description
  const productsWithoutDesc = products?.filter((p: Product) => !p.description || p.description.trim() === '') || [];
  if (productsWithoutDesc.length > 0) {
    suggestions.push({
      title: 'Ajoutez des descriptions détaillées',
      description: `${productsWithoutDesc.length} produits n'ont pas de description. Écrivez ce que c'est et ses caractéristiques simples.`,
      type: 'normal',
      cta: {
        text: 'Éditer les descriptions',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Check low interest / visibility (for wholesalers we track SKU impressions)
  const totalViews = events?.filter((e: Event) => e.type === 'product_view').length || 0;
  if (totalViews < 200) {
    suggestions.push({
      title: 'Augmentez la visibilité de vos références',
      description: 'Vos produits sont peu vus. Améliorez leurs fiches et indiquez clairement prix et délais pour que les clients commandent.',
      type: 'normal',
      cta: {
        text: 'Voir les statistiques',
        href: '/vendeurs/dashboard'
      }
    });
  }

  // Check B2B order conversion rate (clients place orders)
  const orders = events?.filter((e: Event) => e.type === 'order').length || 0;
  const conversionRate = totalViews > 0 ? (orders / totalViews) * 100 : 0;
  if (conversionRate < 3) {
    suggestions.push({
      title: 'Peu de commandes B2B',
      description: `Seulement ${conversionRate.toFixed(1)}% des visiteurs commandent. Indiquez le prix, la quantité minimale et le délai pour que les clients commandent plus.`,
      type: 'urgent',
      cta: {
        text: 'Améliorer les fiches produits',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Suggest sharing collection if premium and has products
  if (isPremium && products && products.length >= 3) {
    suggestions.push({
      title: 'Partagez votre collection',
      description: 'Vous avez plusieurs produits. Partagez votre boutique pour que plus de clients voient et commandent.',
      type: 'positive',
      cta: {
        text: 'Voir ma collection',
        href: `/collections/${user.id}`
      }
    });
  }

  // If not premium, suggest upgrading
  if (!isPremium) {
    suggestions.length = 0
    suggestions.push({
      title: 'Devenez Premium pour plus de fonctionnalités',
      description: "Passez Premium pour voir plus d'informations et avoir plus de visibilité afin d'obtenir plus de commandes.",
      type: 'normal',
      cta: {
        text: 'Devenir Premium',
        href: '/vendeurs/dashboard' // or wherever premium upgrade is
      }
    });
  }

  // If few SKUs, suggest expanding assortment
  if (products && products.length < 20) {
    suggestions.push({
      title: 'Élargissez votre assortiment B2B',
      description: 'Ajoutez plus de produits et des options par lot. Plus de choix aide les clients à commander.',
      type: 'normal',
      cta: {
        text: 'Ajouter des références',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Generate product-specific suggestions
  const productSuggestions = [];
  if (products && events && isPremium) {
    for (const product of products) {
      const productEvents = events.filter((e: Event) => e.product_id === product.id);
      const views = productEvents.filter((e: Event) => e.type === 'product_view');
      const orders = productEvents.filter((e: Event) => e.type === 'order');
      const conversionRate = views.length > 0 ? (orders.length / views.length) * 100 : 0;

      const productSugs = [];

      if (conversionRate < 3) {
        productSugs.push({
          title: `Peu de commandes pour "${product.title}"`,
          description: `Ce produit reçoit seulement ${conversionRate.toFixed(1)}% de commandes. Indiquez le prix, la quantité minimale et le délai pour aider le client à commander.`,
          type: 'urgent',
          cta: {
            text: 'Modifier le produit',
            href: `/vendeurs/dashboard/produits/${product.slug}`
          }
        });
      }

      if (views.length < 10) {
        productSugs.push({
          title: `Peu d'impressions pour "${product.title}"`,
          description: `Ce produit n'a que ${views.length} vues. Mettez-le en avant pour que plus de clients le voient et commandent.`,
          type: 'normal',
          cta: {
            text: 'Partager le produit',
            href: `/vendeurs/dashboard/produits/${product.slug}`
          }
        });
      }

      if (productSugs.length > 0) {
        productSuggestions.push({
          product: product.title,
          suggestions: productSugs
        });
      }
    }
  }

  return {
    suggestions,
    productSuggestions,
    isPremium,
    user,
    products
  };
};
