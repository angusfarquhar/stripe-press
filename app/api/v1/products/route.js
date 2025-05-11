import { NextResponse } from "next/server";
import { getProducts } from "../../../../lib/products";

/**
 * GET /api/v1/products
 * @returns a list of products
 */
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
