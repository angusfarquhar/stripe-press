import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

/**
 * POST /api/v1/payments
 * takes a paymentIntentId as input and returns PaymentIntent
 * data from Stripe's Payment Intent API
 * @param {paymentIntentId} request
 * @returns {id, amount, amount_received, currency, status}
 */
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
    return NextResponse.json(
      {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        amount_received: paymentIntent.amount_received,
        currency: paymentIntent.currency,
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
