import { NextResponse } from "next/server";
import { products } from "../data";

export async function GET(request, { params }) {
  const id = params.id;

  if (products[id]) {
    return NextResponse.json(products[id], { status: 200 });
  } else {
    return NextResponse.json({ message: "Product not found" });
  }
}
