"use client";

import { LoadingSpinnerIcon } from "../../components/Icons";
import { API_ROUTES } from "../../lib/routes";
import { toDollars } from "../../lib/utils";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

function PaymentForm({ amount, currency }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-status?",
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" className="mt-8 space-y-4" onSubmit={handleSubmit}>
      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          {message}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md"
          placeholder="example@email.com"
          required
        />
      </div>

      <div className="rounded-md">
        <label
          htmlFor="payment-element"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Shipping details
        </label>
        <div className="p-4 border border-gray-300 rounded-md">
          <AddressElement
            id={"address-element"}
            options={{ mode: "shipping" }}
          />
        </div>
      </div>

      <div className="rounded-md">
        <label
          htmlFor="payment-element"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Payment details
        </label>
        <div className="p-4 border border-gray-300 rounded-md">
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`w-full bg-[#5167FC] hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow transition duration-150 ease-in-out ${
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isLoading
          ? "Processing..."
          : `Pay ${toDollars(amount)} ${currency.toUpperCase()}`}
      </button>
    </form>
  );
}

function ProductDiv({ product }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4 border shadow border-gray-300 rounded p-4 items-center">
      {product.image && (
        <div className="col-span-1">
          <img
            className="rounded-xl w-full h-auto object-cover"
            src={product.image}
            alt={product.title}
          />
        </div>
      )}
      <div className="col-span-2 flex flex-col justify-center">
        <p className="text-sm text-gray-800">{product.title}</p>
        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
        <p className="text-[#5167FC] text-sm">
          Price: <span>{toDollars(product.price)}</span>
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  // TODO: this is just a single productId now but will need to change
  // to an encoded uri of multiple products and quanities or use a cart api
  const productId = searchParams.get("productId");

  const [clientSecret, setClientSecret] = useState(null);
  const [products, setProducts] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createCheckout = async () => {
      try {
        // create unique checkout id for stripe idempotency key
        // for creation of stripe payment intent. This prevents
        // duplicate payments from being made by the same checkout.
        const checkoutId = crypto.randomUUID();

        const response = await fetch(API_ROUTES.CHECKOUT.BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ productId: productId, quantity: 1 }],
            idempotencyKey: checkoutId,
          }),
        });
        const checkoutData = await response.json();
        setClientSecret(checkoutData.clientSecret);
        setProducts(checkoutData.products);
        setTotalAmount(checkoutData.totalAmount);
        setCurrency(checkoutData.currency);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    if (productId) createCheckout();
  }, [productId]);

  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "5px",
      colorBackground: "#F6F8FA",
      accessibleColorOnColorPrimary: "#262626",
      colorPrimary: "#5167FC",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "2px",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "2px",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };

  if (!clientSecret)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="flex items-center">
          <LoadingSpinnerIcon />
        </div>
      </div>
    );

  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Your Order
              </h1>
              <p className="text-gray-600 text-sm">
                Review your order details below.
              </p>
            </div>

            {products &&
              products.map((product) => (
                <ProductDiv key={product.id} product={product} />
              ))}

            {error && (
              <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                {error}
              </div>
            )}

            <hr className="my-8 border-gray-300" />

            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-semibold text-gray-800">Total:</p>
              <p className="text-2xl font-bold text-[#5167FC]">
                {toDollars(totalAmount)}
              </p>
            </div>

            <PaymentForm amount={totalAmount} currency={currency} />

            <div className="mt-8 text-center text-[#5167FC] text-xs">
              <p>Powered by Stripe.</p>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}
