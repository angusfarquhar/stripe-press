import { NextResponse } from "next/server";

let cart = [];

/**
 * GET /api/v1/carts
 * returns the current cart object.
 * @param {} request
 * @returns {clientSecret, products, totalAmount, currency}
 */
export async function GET() {
  return NextResponse.json(cart, { status: 200 });
}

/**
 * POST /api/v1/carts
 * adds a product and associated quantiity to the cart.
 * It returns the updated cart as a response.
 * @param { productId, quantity } request
 * @returns { cart }
 */
export async function POST(request) {
  const item = await request.json();
  cart.push(item);
  return NextResponse.json(cart, { status: 200 });
}
