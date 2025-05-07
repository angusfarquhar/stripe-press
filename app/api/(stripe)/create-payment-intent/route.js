import { stripe } from "../../../../lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { product } = await request.json();

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: product.amount,
    currency: "aud",
  });

  return NextResponse.json({ clientSecret: clientSecret }, { status: 200 });
}
