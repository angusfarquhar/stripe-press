import { NextResponse } from "next/server";
import { products } from "./data";

export async function GET(request) {
  return NextResponse.json(Object.values(products), { status: 200 });
}
