"use client";

import { useRouter } from "next/navigation";

export default function CheckoutCartButton({ cartItems }) {
  const router = useRouter();
  const handleCheckoutCart = () => {
    const checkoutPageParams = cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const query = encodeURIComponent(JSON.stringify(checkoutPageParams));
    router.push(`/checkout?cart=${query}`);
  };

  return (
    <button
      onClick={handleCheckoutCart}
      className={`mt-5 hover:cursor-pointer w-full bg-[#5167FC] hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow transition duration-150 ease-in-out`}
    >
      Checkout Your Items
    </button>
  );
}
