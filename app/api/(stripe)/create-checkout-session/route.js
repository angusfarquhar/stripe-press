const stripe = require("stripe");

export async function POST(request) {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "custom",
    line_items: [
      {
        // Provide the exact Price ID (e.g. price_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });
  return NextResponse.json(
    { clientSecret: session.client_secret },
    { status: 200 },
  );
}
