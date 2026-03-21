import type { PageServerLoad } from './$types';
import { getUser } from '$lib/server/getUser';
import { selectTable } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';
import type { Article, Event } from '$lib/types';

export const load: PageServerLoad = async ({ cookies, parent }) => {
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
      description: 'Votre collection semble vide. Commencez par ajouter des produits pour attirer des clients.',
      type: 'urgent',
      cta: {
        text: 'Ajouter un produit',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Check products without images
  const productsWithoutImages = products?.filter((p: Article) => !p.image || p.image.length === 0) || [];
  if (productsWithoutImages.length > 0) {
    suggestions.push({
      title: 'Améliorez vos photos de produits',
      description: `${productsWithoutImages.length} de vos produits n'ont pas d'images. Des photos de qualité augmentent les ventes de 30%.`,
      type: 'normal',
      cta: {
        text: 'Ajouter des images',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Check products without description
  const productsWithoutDesc = products?.filter((p: Article) => !p.description || p.description.trim() === '') || [];
  if (productsWithoutDesc.length > 0) {
    suggestions.push({
      title: 'Ajoutez des descriptions détaillées',
      description: `${productsWithoutDesc.length} produits manquent de description. Une bonne description convainc les acheteurs.`,
      type: 'normal',
      cta: {
        text: 'Éditer les descriptions',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Check low views
  const totalViews = events?.filter((e: Event) => e.type === 'product_view').length || 0;
  if (totalViews < 100) {
    suggestions.push({
      title: 'Augmentez la visibilité de vos produits',
      description: 'Vos produits ont peu de vues. Optimisez vos titres et descriptions pour le SEO, partagez sur vos réseaux et faites des publicités si possible.',
      type: 'normal',
      cta: {
        text: 'Voir les statistiques',
        href: '/vendeurs/dashboard'
      }
    });
  }

  // Check conversion rate
  const wsappOpens = events?.filter((e: Event) => e.type === 'wsapp_open').length || 0;
  const conversionRate = totalViews > 0 ? (wsappOpens / totalViews) * 100 : 0;
  if (conversionRate < 5) {
    suggestions.push({
      title: 'Votre taux de conversion est faible',
      description: `Seulement ${conversionRate.toFixed(1)}% de vos visiteurs contactent via WhatsApp. Améliorez vos descriptions et prix.`,
      type: 'urgent',
      cta: {
        text: 'Fixer le problème',
        href: '/vendeurs/dashboard/produits'
      }
    });
  }

  // Suggest sharing collection if premium and has products
  if (isPremium && products && products.length >= 3) {
    suggestions.push({
      title: 'Partagez votre collection',
      description: 'Vous avez une belle collection ! Partagez-la sur vos réseaux sociaux pour attirer plus de clients.',
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
      description: 'Accédez à des analyses avancées, plus de produits et une meilleure visibilité.',
      type: 'normal',
      cta: {
        text: 'Devenir Premium',
        href: '/vendeurs/dashboard' // or wherever premium upgrade is
      }
    });
  }

  // If few products, suggest adding more
  if (products && products.length < 10) {
    suggestions.push({
      title: 'Élargissez votre catalogue',
      description: 'Plus vous avez de produits, plus vous avez de chances de vendre. Ajoutez-en plus.',
      type: 'normal',
      cta: {
        text: 'Ajouter des produits',
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
      const opens = productEvents.filter((e: Event) => e.type === 'wsapp_open');
      const conversionRate = views.length > 0 ? (opens.length / views.length) * 100 : 0;

      const productSugs = [];

      if (conversionRate < 5) {
        productSugs.push({
          title: `Taux de conversion faible pour "${product.title}"`,
          description: `Le taux de conversion de ce produit est de ${conversionRate.toFixed(1)}%. Améliorez la description ou les photos.`,
          type: 'urgent',
          cta: {
            text: 'Modifier le produit',
            href: `/vendeurs/dashboard/produits/${product.slug}`
          }
        });
      }

      if (views.length < 10) {
        productSugs.push({
          title: `Peu de vues pour "${product.title}"`,
          description: `Ce produit n'a que ${views.length} vues. Promouvez-le davantage.`,
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
