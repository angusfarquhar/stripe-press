const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
require("dotenv").config();
const stripe = require("stripe");

// stripe setup
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

var app = express();

// view engine setup (Handlebars)
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

/**
 * Home route
 */
app.get("/", function (req, res) {
  res.render("index");
});

/**
 * Stripe checkout session
 */
app.post("/create-checkout-session", async (req, res) => {
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

  res.send({ clientSecret: session.client_secret });
});

// Stripe session status
app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

/**
 * Success route
 */
app.get("/success", function (req, res) {
  res.render("success");
});

/**
 * Start server
 */
const port = process.env.PORT;
app.listen(port || 4242, () => {
  console.log(`Getting served on port ${port}`);
});
