import { getUser } from '$lib/server/getUser';
import { isSetupComplete, getSellerProductCount, getProductsNeededForSetup } from '$lib/server/setupCheck';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url, parent }) => {
  const { user, error: userError } = await getUser(cookies);
  const { products } = await parent()
  if (userError || !user) {
    redirect(307, '/vendeurs/connection');
  }

  // Get product count and setup status
  const sellerId = user.id;
  if (!sellerId) {
    redirect(307, '/vendeurs/connection');
  }

  const productCount = await getSellerProductCount(sellerId);
  const setupComplete = await isSetupComplete(user, products);
  const productsNeeded = await getProductsNeededForSetup(sellerId);

  // Calculate progress with bigger jumps per product to feel more rewarding
  // 30% base, then larger increments for each product
  let progress = 30;
  if (productCount >= 1) progress = 55;   // +25% for product 1
  if (productCount >= 2) progress = 80;   // +25% for product 2
  if (productCount >= 3) progress = 100;  // +20% for product 3 (reaching 100%)
  if (setupComplete) progress = 100;

  // If already setup complete, redirect to dashboard
  if (setupComplete) {
    redirect(307, '/vendeurs/dashboard');
  }

  return {
    user,
    productCount,
    setupComplete,
    productsNeeded,
    progress,
    setupRequired: true
  };
};
