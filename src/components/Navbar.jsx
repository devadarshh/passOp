const Navbar = () => {
  return (
    <nav className="bg-transparent  text-white w-full top-0">
      <div className="myContainer flex justify-between px-4 py-5 h-14 items-center">
        <div className="logo select-none font-bold cursor-pointer text-2xl">
          <span className="text-green-600">&lt;</span>
          Pass<span className="text-green-600">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="space-x-2 ">
            <a className="" href="/">
              Home
            </a>
            <a className="" href="#">
              About
            </a>
            <a className="" href="#">
              Contact
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
