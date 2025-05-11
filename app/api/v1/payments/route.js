import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

export async function POST(request) {
  const { paymentIntentId } = await request.json();

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: "Missing paymentIntentId in request body" },
      { status: 400 },
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log(paymentIntent);
    return NextResponse.json(
      {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        amount_received: paymentIntent.amount_received,
        status: paymentIntent.status,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to retrieve payment intent" },
      { status: 500 },
    );
  }
}
