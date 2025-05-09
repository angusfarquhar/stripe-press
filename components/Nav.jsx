export default function Nav() {
  return (
    <div className="shadow-md shadow-[#5167FC]">
      <nav className="flex items-center justify-between flex-wrap h-17 bg-gradient-to-r from-[#5167FC] from-60% via-pink-500 via-80% to-purple-500 to-90% px-4 ">
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
    </div>
  );
}
