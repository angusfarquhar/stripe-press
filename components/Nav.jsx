export default function Nav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#5167FC] p-3 pl-6 pr-6 shadow-2xl">
      <a href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src="/stripe-logo-white.svg" width="100" height="100" />
          <span className="font-semibold text-xl text-slate-100">Press</span>
        </div>
      </a>
      <div className="ml-auto">
        <div>
          <a
            href="/api/cart"
            className="px-4 py-2 text-white bg-none rounded hover:bg-[#5167FC]"
          >
            View Cart
          </a>
        </div>
      </div>
    </nav>
  );
}
