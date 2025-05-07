import Nav from "../components/Nav";
import ProductCard from "../components/ProductCard";

export default async function Home() {
  const res = await fetch(`http://localhost:3000/api/products`);
  const data = await res.json();

  return (
    <div className="bg-white">
      <Nav />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
