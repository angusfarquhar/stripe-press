import { toDollars } from "../../lib/utils";
import { API_ROUTES } from "../../lib/routes";
import CheckoutCartButton from "../../components/CheckoutCartButton";

export default async function CartPage() {
  const response = await fetch(API_ROUTES.CARTS.BASE);
  const cartItems = await response.json();

  if (!cartItems)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="flex items-center">
          <LoadingSpinnerIcon />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
            <p className="text-gray-600 text-sm">
              Review the Items in your cart below.
            </p>
          </div>
          {cartItems.length === 0 && (
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">Your Cart is Empty</p>
            </div>
          )}
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="grid grid-cols-3 gap-4 mt-4 border shadow border-gray-300 rounded p-4 items-center"
              >
                {item.product.image && (
                  <div className="col-span-1">
                    <img
                      className="rounded-xl w-full h-auto object-cover"
                      src={item.product.image}
                    />
                  </div>
                )}
                <div className="col-span-2 flex flex-col justify-center">
                  <p className="text-sm text-gray-800">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-[#5167FC] text-sm">
                    Price: <span>{toDollars(item.product.price)}</span>
                  </p>
                </div>
              </div>
            ))}
          {cartItems.length > 0 && <CheckoutCartButton cartItems={cartItems} />}
        </div>
      </div>
    </div>
  );
}
