"use client";

export default function CartButton({ product }) {
  const addToCart = async () => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };

  return (
    <button
      className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      onClick={addToCart}
    >
      Add to Cart
    </button>
  );
}
