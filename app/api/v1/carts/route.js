import { NextResponse } from "next/server";

let cart = [];

export async function GET() {
  return NextResponse.json(cart, { status: 200 });
}

export async function POST(request) {
  const item = await request.json();
  cart.push(item);
  return NextResponse.json(cart, { status: 200 });
}
