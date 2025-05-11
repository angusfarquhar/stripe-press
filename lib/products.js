import "server-only";

import { stripe } from "./stripe";

export async function getProducts() {
  const products = await stripe.products.list({
    limit: 3,
  });
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.retrieve(product.default_price);
      return {
        id: product.id,
        title: product.name,
        image: product.images[0],
        price: price.unit_amount,
      };
    }),
  );

  return productsWithPrices;
}

export async function getProductsByIds(ids) {
  const products = await getProducts();
  return products.filter((product) => ids.includes(product.id));
}
