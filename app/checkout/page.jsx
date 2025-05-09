"use client";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

function PaymentForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
    });
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@email.com"
          required
        />
      </div>

      <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-3 rounded-md shadow transition"
      >
        Pay ${(amount / 100).toFixed(2)}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [clientSecret, setClientSecret] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const productRes = await fetch(
        `http://localhost:3000/api/products/${productId}`,
      );
      const product = await productRes.json();
      setProduct(product);

      const res = await fetch(
        `http://localhost:3000/api/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: product }),
        },
      );
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    if (productId) createPaymentIntent();
  }, [productId]);

  const appearance = {
    theme: "stripe",
  };

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Checkout — Stripe Press
            </h1>
            <div className="flex justify-right mt-4 border border-dashed border-gray-300 rounded">
              <img className="m-4 p-4 rounded-xl w-3xs" src={product.image} />
              <h2 className="text-lg text-gray-500 mt-2">{product.title}</h2>
              <p className="text-blue-600 font-medium text-lg">
                Total due: <span>${(product.amount / 100).toFixed(2)}</span>
              </p>
            </div>
            <PaymentForm amount={product.amount} />

            <hr className="my-6 border-gray-300" />
            <p className="text-blue-600 font-medium text-lg">
              Total due: <span>${(product.amount / 100).toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </Elements>
  );
}
