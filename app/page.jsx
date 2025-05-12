import ProductCard from "../components/ProductCard";
import { API_ROUTES } from "../lib/routes";

export default async function Home() {
  const productsResponse = await fetch(API_ROUTES.PRODUCTS.BASE);
  const products = await productsResponse.json();

  if (!products)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="flex items-center">
          <LoadingSpinnerIcon />
        </div>
      </div>
    );

  return (
    <div className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight mx-auto text-left justify-center text-gray-800">
            Our Latest Bestsellers
          </h1>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
