import { selectTable, updateRow } from './supabase';
import type { User, Product } from '../types';

const SETUP_PRODUCT_REQUIREMENT = 3;

/**
 * Check if a seller has completed the setup process
 * Returns true if seller has >= 3 products, false otherwise
 */
export const isSetupComplete = async (seller: User, products: Product[]): Promise<boolean> => {
  const setup_complete = ( (products.length >= SETUP_PRODUCT_REQUIREMENT && seller.name && seller.password) || seller.setupping == false ) as boolean;
  if (setup_complete && seller.setupping) {
    await updateRow("Sellers", {
     where: ["id", seller.id],
    value: {"setupping": false}
  })
  }
  return setup_complete
};

/**
 * Get the current product count for a seller
 */
export const getSellerProductCount = async (sellerId: number | string): Promise<number> => {
  const { data: products, error } = await selectTable('Products', 'id')
    .eq('seller_id', sellerId);

  if (error || !products) {
    console.error('Error getting product count:', error);
    return 0;
  }

  return products.length;
};

/**
 * Get products needed to complete setup
 */
export const getProductsNeededForSetup = async (sellerId: number | string): Promise<number> => {
  const count = await getSellerProductCount(sellerId);
  return Math.max(0, SETUP_PRODUCT_REQUIREMENT - count);
};

/**
 * Mark seller as having completed setup (store in session/metadata if needed)
 * Currently based on product count, but can be extended
 */
export const markSetupComplete = async (sellerId: number | string): Promise<void> => {
  // For now, setup is determined by product count
  // If you want to add a setup_complete flag in Sellers table, do it here
  console.log(`Setup complete for seller ${sellerId}`);
};
