"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
  LoadingSpinnerIcon,
} from "../../components/Icons";
import { toDollars } from "../../lib/utils";
import { API_ROUTES } from "../../lib/routes";

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment successful!",
    icon: <SuccessIcon />,
    message:
      "Your order has been placed! We'll send you an email with your order details. Thank you for shopping with Stripe Press.",
  },
  processing: {
    text: "Processing payment...",
    icon: <InfoIcon />,
    message:
      "Hold tight, your order is being processed. We will email you when your order succeeds. Thank you for shopping with Stripe Press.",
  },
  requires_payment_method: {
    text: "Payment failed.",
    icon: <ErrorIcon />,
    message:
      "We are sorry, there was an error processing your payment. Please try again with a different payment method.",
  },
  default: {
    text: "Something went wrong.",
    icon: <ErrorIcon />,
    message:
      "An unexpected error occurred during payment. Please try again later.",
  },
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [statusContent, setStatusContent] = useState(null);

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const response = await fetch(API_ROUTES.PAYMENTS.BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId }),
        });
        const paymentDetails = await response.json();
        setPaymentDetails(paymentDetails);
        setStatusContent(STATUS_CONTENT_MAP[paymentDetails.status]);
      } catch (err) {
        console.error(err);
      }
    };

    if (paymentIntentId) getPaymentDetails();
  }, [paymentIntentId]);

  if (!paymentDetails)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="flex items-center">
          <LoadingSpinnerIcon />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        {statusContent.icon}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {statusContent.text}
        </h2>
        <p className="text-gray-600 mb-6">{statusContent.message}</p>
        {paymentIntentId && (
          <div className="mb-6 border border-gray-200 rounded-md p-4 text-left">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Payment Details
            </h3>
            <p className="text-sm text-gray-500">
              Payment Intent ID:{" "}
              <span className="font-mono">{paymentIntentId}</span>
            </p>
          </div>
        )}
        {paymentDetails?.amount && (
          <div className="mb-6 border border-gray-200 rounded-md p-4 text-left">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Amount Charged
            </h3>
            <p className="text-sm text-gray-500">
              Amount Charged:{" "}
              <span className="font-mono">
                {toDollars(paymentDetails?.amount)}
              </span>
            </p>
          </div>
        )}
        {paymentDetails?.amount_received && (
          <div className="mb-6 border border-gray-200 rounded-md p-4 text-left">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Amount Received
            </h3>
            <p className="text-sm text-gray-500">
              Amount Received:{" "}
              <span className="font-mono">
                {toDollars(paymentDetails?.amount_received)}
              </span>
            </p>
          </div>
        )}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-[#5167FC] hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md shadow"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
