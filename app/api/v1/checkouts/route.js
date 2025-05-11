import { stripe } from "../../../../lib/stripe";
import { getProductsByIds } from "../../../../lib/products";
import { NextResponse } from "next/server";

// request body: { items: [{ productId, quantity }], idempotencyKey: string }
export async function POST(request) {
  const { items, idempotencyKey } = await request.json();
  console.log("Idempotency Key:", idempotencyKey); // Debugging log

  if (!Array.isArray(items)) {
    return NextResponse.json(
      { error: "Request must be an array of products and quantities" },
      { status: 400 },
    );
  }

  try {
    const productIds = items.map((item) => item.productId);
    const products = await getProductsByIds(productIds);

    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    let totalAmount = 0;
    // add quantites so we can return
    // it in the response.
    const productsWithQuantities = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (product) {
        totalAmount += product.price * item.quantity;
        productsWithQuantities.push({ ...product, quantity: item.quantity });
      } else {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 404 },
        );
      }
    }

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalAmount,
        currency: "aud",
        automatic_payment_methods: { enabled: true },
      },
      {
        idempotencyKey: idempotencyKey,
      },
    );
    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        products: productsWithQuantities,
        totalAmount: totalAmount,
        currency: "aud",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "error creating payment intent" },
      { status: 500 },
    );
  }
}
