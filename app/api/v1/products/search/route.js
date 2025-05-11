import { NextResponse } from "next/server";

/**
 * POST /api/v1/products/search
 * products API takes in a list of product Ids and returns the products for those ids.
 * It will return all products if no request data is given.
 * @param {[productIds]} request
 * @returns a list of products
 */
export async function POST(request) {
  const { productIds } = await request.json();

  if (!productIds) {
    return NextResponse.json(
      { error: "request body is empty" },
      { status: 400 },
    );
  }

  if (!Array.isArray(productIds)) {
    return NextResponse.json(
      { error: "request must be an array of productIds" },
      { status: 400 },
    );
  }

  // if request array is empty return empty array back
  if (Array.isArray(productIds).length === 0) {
    return NextResponse.json([], { status: 200 });
  }

  for (const productId of productIds) {
    if (typeof productId !== "string") {
      return NextResponse.json(
        { error: "productIds must all be strings" },
        { status: 400 },
      );
    }
  }

  const products = await getProductsByIds(productIds);

  return NextResponse.json(products, { status: 200 });
}
