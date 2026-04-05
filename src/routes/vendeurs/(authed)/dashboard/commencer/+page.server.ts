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

  // Check if user has completed the onboarding (3 products + name + password)
  const onboardingComplete = productCount >= 3 && user.name && user.password;

  // Calculate progress for the onboarding journey
  // 20% per product (3 products = 60%) + 40% for securing account
  let progress = 0;
  if (productCount >= 1) progress = 20;   // + 20% for product 1
  if (productCount >= 2) progress = 40;   // + 20% for product 2
  if (productCount >= 3) progress = 60;   // + 20% for product 3
  if (onboardingComplete) progress = 100; // + 40% for secured account

  // If already completed full onboarding, redirect to dashboard
  if (onboardingComplete) {
    console.log("ggg")
    redirect(307, '/vendeurs/dashboard');
  }

  const productsNeeded = 3 - productCount;

  return {
    user,
    productCount,
    setupComplete,
    productsNeeded,
    progress,
    onboardingComplete,
    setupRequired: true
  };
};
