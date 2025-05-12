import { NextResponse } from "next/server";

// cart is a an array of products and quantities [{product, quantiity}]
let cart = [];

/**
 * GET /api/v1/carts
 * returns the current cart object.
 * @param {} request
 * @returns { cart }
 */
export async function GET() {
  return NextResponse.json(cart, { status: 200 });
}

/**
 * POST /api/v1/carts
 * adds a product and associated quantity to the cart.
 * It returns the updated cart as a response.
 * @param { product, quantity } request
 * @returns { cart }
 */
export async function POST(request) {
  const { product, quantity } = await request.json();

  // if there is an existing cart item we need to incrememt quantitiy
  const existingItem = cart.find(
    (cartItem) => cartItem.product.id === product.id,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  return NextResponse.json(cart, { status: 200 });
}
