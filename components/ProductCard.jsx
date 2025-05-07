export default function ProductCard({ product }) {
  const toDollars = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={product.image} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-700 text-base">{toDollars(product.amount)}</p>
      </div>
      <div className="px-6 pt-4 pb-4">
        <button className="bg-[#5167FC] hover:bg-[#5167CA] text-white  font-bold py-2 px-4 rounded shadow-lg hover:cursor-pointer">
          Buy Now
        </button>
      </div>
    </div>
  );
}
