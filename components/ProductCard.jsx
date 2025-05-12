"use client";

import { useRouter } from "next/navigation";
import { toDollars } from "../lib/utils";

export default function ProductCard({ product }) {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push(`/checkout?productId=${product.id}`);
  };

  return (
    <a href="#" className="group relative block overflow-hidden">
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <img
        src={product.image}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <p className="text-sm text-gray-700">{toDollars(product.price)}</p>

        <p className="text-sm mt-1.5 font-medium text-gray-900">
          {product.title}
        </p>

        <form className="mt-4 flex gap-4">
          <button className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 hover:cursor-pointer">
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            type="button"
            className="block w-full rounded-sm px-4 py-3 text-sm font-medium text-white transition hover:scale-105 hover:cursor-pointer bg-[#5167FC]"
          >
            Buy Now
          </button>
        </form>
      </div>
    </a>
  );
}
