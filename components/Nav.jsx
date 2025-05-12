export default function Nav() {
  return (
    <div className="shadow-md">
      <nav className="flex items-center shadow justify-between flex-wrap h-15 bg-gradient-to-r from-[#5167FC] from-60% via-pink-500 via-80% to-purple-500 to-90% px-4 ">
        <a href="/">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src="/stripe-logo-white.svg" width="100" height="100" />
            <span className="font-semibold text-xl text-slate-100 shadow-amber-50">
              Press
            </span>
          </div>
        </a>
        <div className="ml-auto">
          <div>
            <a
              href="/cart"
              className="inline-block px-4 py-2 text-sm font-medium text-white border border-white rounded-md hover:bg-white hover:text-[#5167FC] transition duration-200 ease-in-out"
            >
              View Cart
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
