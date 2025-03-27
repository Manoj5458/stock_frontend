const Navbar = () => {
  const upstoxLogin = () => {
    window.location.href = "http://localhost:8000/upstox/login";
  };
  return (
    <>
      <nav className="bg-primary h-12 flex items-center navbar fixed top-0 w-full">
        <div className="container flex mx-auto">
          <div className="w-1/3 flex items-start">
            <a href="/">
              <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
            </a>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center">
              <a href="/" className="text-white mr-4">
                Home
              </a>
              <a href="/about" className="text-white mr-4">
                About
              </a>
              <button onClick={upstoxLogin} className="text-white">
                UpStox
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
